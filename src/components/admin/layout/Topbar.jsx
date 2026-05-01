import { useState } from "react";
import { Bell, Menu, X, AlertCircle, Flag, Users } from "../../../lib/icons";
import { ThemeToggle } from "../AdminShared";
import { useTheme } from "../../../ThemeContext";
import { C } from "../../../tokens";

const INIT_NOTIFS = [
  { id:1, type:"alert", title:"Sub expiring",    msg:"Elena V. expires in 2 days.",  time:"1h ago",  read:false },
  { id:2, type:"alert", title:"Sub expiring",    msg:"Aisha B. expires today.",       time:"3h ago",  read:false },
  { id:3, type:"flag",  title:"Content flagged", msg:"4-report post needs review.",  time:"5h ago",  read:false },
  { id:4, type:"user",  title:"New Premium",     msg:"Marcus upgraded to Premium.",  time:"6h ago",  read:true  },
];

export const AdminTopbar = ({ sec, secLabels, setSec, mobileNav, setMobileNav }) => {
  const { theme, toggle } = useTheme();
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [notifs, setNotifs]         = useState(INIT_NOTIFS);
  const unread = notifs.filter(n => !n.read).length;

  const TYPE_ICON = { alert: AlertCircle, flag: Flag, user: Users };
  const TYPE_COL  = { alert: "var(--coral)", flag: "var(--gold)", user: "var(--teal)" };

  return (
    <div
      className="h-[54px] flex items-center px-4 gap-3 flex-shrink-0 z-[200] border-b"
      style={{ background: "var(--bgCard)", borderColor: "var(--border)", boxShadow: "var(--shadowNav)" }}>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileNav(v => !v)}
        className="show-sm w-8 h-8 rounded-xl flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--text)] hover:bg-[var(--bgMuted)] transition-colors">
        {mobileNav ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-[var(--textMuted)]">Admin</span>
        <span className="text-[var(--border)]">/</span>
        <span className="text-[13px] font-bold text-[var(--text)]">
          {secLabels[sec] || "Dashboard"}
        </span>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle theme={theme} onToggle={toggle} size="sm" />

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 border"
          style={{ background: "var(--greenBg)", borderColor: "rgba(30,113,69,0.2)" }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--green)" }} />
          <span className="text-[11px] font-bold" style={{ color: "var(--green)" }}>347 live</span>
        </div>

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifsOpen(v => !v)}
            className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer relative transition-all hover:bg-[var(--bgMuted)] border"
            style={{
              background: notifsOpen ? "var(--tealBg)" : "transparent",
              borderColor: notifsOpen ? "var(--teal)" : "var(--border)",
              color: notifsOpen ? "var(--teal)" : "var(--textMuted)",
            }}>
            <Bell size={16} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center"
                style={{ background: "var(--coral)" }}>
                {unread}
              </span>
            )}
          </button>

          {notifsOpen && (
            <>
              <div onClick={() => setNotifsOpen(false)} className="fixed inset-0 z-[400]" />
              <div className="absolute top-10 right-0 w-80 rounded-2xl z-[500] overflow-hidden"
                style={{ background: "var(--bgCard)", border: "1px solid var(--border)", boxShadow: "0 12px 40px rgba(0,0,0,0.14)" }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                  <div className="font-semibold text-sm text-[var(--text)]">
                    Notifications
                    {unread > 0 && <span className="text-[11px] ml-1.5" style={{ color: "var(--coral)" }}>{unread} new</span>}
                  </div>
                  <button
                    onClick={() => setNotifs(ns => ns.map(n => ({ ...n, read: true })))}
                    className="text-[11px] font-semibold bg-transparent border-none cursor-pointer font-sans"
                    style={{ color: "var(--teal)" }}>
                    Mark all read
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifs.map((n, i) => {
                    const Ico = TYPE_ICON[n.type] || Bell;
                    const col = TYPE_COL[n.type] || "var(--teal)";
                    return (
                      <div key={n.id}
                        onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))}
                        className="flex gap-2.5 px-4 py-3 cursor-pointer hover:bg-[var(--bgMuted)] transition-colors"
                        style={{ borderBottom: i < notifs.length - 1 ? "1px solid var(--border)" : "none", background: n.read ? "transparent" : "var(--tealBg)" }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: col + "18" }}>
                          <Ico size={13} color={col} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-[13px] text-[var(--text)] flex items-center gap-1.5 ${n.read ? "font-medium" : "font-bold"}`}>
                            {n.title}
                            {!n.read && <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ background: "var(--teal)" }} />}
                          </div>
                          <p className="text-[11px] text-[var(--textMuted)] leading-tight truncate">{n.msg}</p>
                          <span className="text-[10px] text-[var(--textMuted)]">{n.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-2.5 border-t text-center" style={{ borderColor: "var(--border)" }}>
                  <button
                    onClick={() => { setNotifsOpen(false); setSec("notifications"); }}
                    className="text-xs font-semibold bg-transparent border-none cursor-pointer font-sans"
                    style={{ color: "var(--teal)" }}>
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Avatar */}
        <button
          onClick={() => setSec("profile")}
          className="w-8 h-8 rounded-xl border-none font-bold text-[12px] text-white cursor-pointer transition-transform hover:scale-105"
          style={{ background: `linear-gradient(135deg,${C.teal},#1E7145)` }}>
          A
        </button>
      </div>
    </div>
  );
};
