import { useMemo, useState } from "react";
import { api } from "../../../lib/api";
import { profileLabel } from "../../../lib/constants";
import { Button, Badge, Card, Select } from "../../ui/index";
import { calcAud } from "./CronSchedulers";

export const SendNow = ({ actions, history, setHistory, showToast }) => {
  const [form, setForm] = useState({ day:"", profile:"all", plan:"all", channel:"both" });
  const [busy, setBusy] = useState(false);
  const sf = (k,v) => setForm(f=>({...f,[k]:v}));

  // Memoised so we don't filter on every keystroke / render
  const activeActions = useMemo(() => actions.filter(a => a.active), [actions]);
  const recentHistory = useMemo(() => history.slice(0, 6), [history]);

  const selAct   = actions.find(a => a.day===Number(form.day) && (a.profile===form.profile||a.profile==="all"||form.profile==="all"));
  const audCount = calcAud(form.profile, form.plan);

  const doSend = async () => {
    if (!selAct) { showToast("No active action for this day/profile.","error"); return; }
    setBusy(true);
    try {
      const r = await api.scheduler.sendNow({
        audience: form.profile === "all" && form.plan === "all" ? "all" : (form.plan === "premium" ? "premium" : (form.plan === "free" ? "free" : form.profile)),
        subject: selAct.title,
        body:    selAct.body || "",
        channel: form.channel === "both" ? "inapp" : form.channel,
      });
      const delivered = r?.delivered ?? audCount;
      setHistory(h => [{
        id: Date.now(),
        day: Number(form.day),
        title: selAct.title,
        profile: form.profile,
        plan: form.plan,
        channel: form.channel,
        sent: delivered, opened: 0, completed: 0,
        cron: "Manual",
        date: "Just now",
        status: "delivered",
      }, ...h]);
      showToast(`Day ${form.day} sent to ${delivered.toLocaleString()} users.`);
      setForm({ day:"", profile:"all", plan:"all", channel:"both" });
    } catch (e) {
      showToast(e?.data?.message || "Send failed.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Send Action Now" sub="Manually trigger a day's action to a segment">
        <Select label="Day / Action *" value={form.day} onChange={e=>sf("day",e.target.value)}>
          <option value="">— Select a day —</option>
          {activeActions.map(a=>(
            <option key={a.id} value={a.day}>Day {a.day} — {a.title} ({a.profile==="all"?"All":profileLabel(a.profile)})</option>
          ))}
        </Select>

        {selAct && (
          <div className="p-3 rounded-xl mb-3 text-[13px]" style={{ background:"var(--bgMuted)" }}>
            <div className="font-semibold text-[var(--text)] mb-1">{selAct.title}</div>
            <div className="text-[var(--textMuted)]">{selAct.body}</div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Select label="Profile" value={form.profile} onChange={e=>sf("profile",e.target.value)}>
            <option value="all">All Profiles</option>
            <option value="avoider">Avoider</option>
            <option value="anxious">Anxious Manager</option>
            <option value="silent">Silent Stressor</option>
          </Select>
          <Select label="Plan" value={form.plan} onChange={e=>sf("plan",e.target.value)}>
            <option value="all">All Plans</option>
            <option value="free">Free only</option>
            <option value="premium">Premium only</option>
          </Select>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl mb-4"
          style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
          <span className="text-[12px] text-[var(--teal)]">Audience</span>
          <span className="font-display font-bold text-xl text-[var(--teal)]">{audCount.toLocaleString()} <span className="text-[13px] font-normal">users</span></span>
        </div>

        <Button className="w-full" disabled={!form.day || busy} onClick={doSend}>
          {busy ? "Sending…" : `Send to ${audCount.toLocaleString()} users now`}
        </Button>
      </Card>

      <Card title="Recent Sends">
        {recentHistory.map((m,i) => (
          <div key={m.id} className="py-3" style={{ borderBottom:i<recentHistory.length-1?"1px solid var(--border)":"none" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ background:"var(--teal)" }}>D{m.day}</div>
              <span className="font-medium text-[13px] text-[var(--text)] flex-1 truncate">{m.title}</span>
              <Badge label={m.status} variant={m.status==="delivered"?"green":"gold"}/>
            </div>
            <div className="text-[11px] text-[var(--textMuted)] pl-8">{m.date} · {m.sent.toLocaleString()} sent</div>
          </div>
        ))}
        {history.length === 0 && (
          <div className="text-center py-8 text-[13px] text-[var(--textMuted)]">No sends yet.</div>
        )}
      </Card>
    </div>
  );
};
