import { useEffect, useState } from "react";
import { AlertCircle, Flag, Users } from "../../../lib/icons";
import { api } from "../../../lib/api";
import { ACard, ABtn } from "../AdminShared";

const TIME_AGO = (date) => {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  if (diff < 60_000)        return `${Math.max(1, Math.floor(diff / 1000))}s ago`;
  if (diff < 3_600_000)     return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000)    return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
};

export const ANotifications = ({ showToast }) => {
  const [notifs, setNotifs]   = useState([]);
  const [filter, setFilter]   = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.notifications.list().then(r => {
      const list = r?.notifications || r?.items || [];
      setNotifs(list.map(n => ({
        id:    n._id || n.id,
        type:  n.type === "push" ? "user" : (n.severity || n.type || "alert"),
        title: n.title || "",
        msg:   n.body  || n.message || "",
        time:  TIME_AGO(n.createdAt),
        read:  !!n.isRead || !!n.readAt,
      })));
    }).catch(() => {/* keep empty list */}).finally(() => setLoading(false));
  }, []);

  const TYPE_ICON = { alert:AlertCircle, flag:Flag, user:Users };
  const TYPE_COL  = { alert:"var(--coral)", flag:"var(--gold)", user:"var(--teal)" };
  const shown     = filter === "unread" ? notifs.filter(n => !n.read) : notifs;
  const unread    = notifs.filter(n => !n.read).length;

  const markAllRead = async () => {
    try { await api.notifications.readAll(); }
    catch { /* still update locally */ }
    setNotifs(ns => ns.map(n => ({ ...n, read: true })));
    showToast("All marked read.");
  };

  const markRead = async (id) => {
    try { await api.notifications.read(id); } catch { /* ignore */ }
    setNotifs(ns => ns.map(x => x.id === id ? { ...x, read: true } : x));
  };

  return (
    <div data-testid="admin-notifications">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Notifications</h1>
          {unread > 0 && <p className="text-[13px] mt-0.5" style={{ color:"var(--coral)" }}>{unread} unread</p>}
        </div>
        <div className="flex gap-2">
          {["all","unread"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="h-8 px-4 rounded-xl text-[12px] font-semibold border-none cursor-pointer font-sans capitalize"
              style={{ background:filter===f?"var(--teal)":"var(--bgMuted)", color:filter===f?"#fff":"var(--textMuted)" }}>
              {f}
            </button>
          ))}
          <ABtn size="sm" variant="ghost" onClick={markAllRead}>Mark all read</ABtn>
        </div>
      </div>

      <ACard noPad>
        {loading
          ? <div className="text-center py-12 text-[13px] text-[var(--textMuted)]">Loading…</div>
          : shown.length === 0
            ? <div className="text-center py-12 text-[13px] text-[var(--textMuted)]">
                No {filter === "unread" ? "unread " : ""}notifications.
              </div>
            : shown.map((n, i) => {
                const Ico = TYPE_ICON[n.type] || AlertCircle;
                const col = TYPE_COL[n.type]  || "var(--teal)";
                return (
                  <div key={n.id}
                    onClick={() => markRead(n.id)}
                    className="flex gap-3 px-5 py-4 cursor-pointer transition-colors hover:bg-[var(--bgMuted)]"
                    style={{ borderBottom:i<shown.length-1?"1px solid var(--border)":"none", background:n.read?"transparent":"var(--tealBg)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background:col+"18" }}>
                      <Ico size={15} color={col}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[13px] text-[var(--text)] ${n.read?"font-medium":"font-bold"}`}>{n.title}</span>
                        {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:"var(--teal)" }}/>}
                      </div>
                      <p className="text-[12px] text-[var(--textMuted)] mt-0.5">{n.msg}</p>
                      <span className="text-[11px] text-[var(--textFaint)] mt-0.5 block">{n.time}</span>
                    </div>
                  </div>
                );
              })
        }
      </ACard>
    </div>
  );
};
