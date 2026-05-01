/**
 * Scheduler.jsx — orchestrator only.
 * Each tab is its own component in ./scheduler/
 */
import { useState } from "react";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { ActionLibrary }   from "./scheduler/ActionLibrary";
import { CronSchedulers }  from "./scheduler/CronSchedulers";
import { SendNow }         from "./scheduler/SendNow";
import { DeliveryHistory } from "./scheduler/DeliveryHistory";

const TABS = [
  { id:"library", label:"Action Library"  },
  { id:"crons",   label:"Cron Schedulers" },
  { id:"send",    label:"Send Now"        },
  { id:"history", label:"Delivery History"},
];

// Adapt API shapes to what the existing tab components expect
const apiActionToUi = (a) => ({
  id: a._id || a.id,
  day: a.day ?? 0,
  title: a.name || a.title || "",
  profile: a.audience || a.profile || "all",
  plan: a.plan || "all",
  channel: a.channel || "both",
  active: a.active !== false,
  ...a,
});
const apiCronToUi = (c) => ({
  id: c._id || c.id,
  name: c.name || "",
  active: c.active !== false,
  cron: c.cron || c.expression || "",
  ...c,
});

export const AScheduler = ({ showToast }) => {
  const [tab, setTab]   = useState("library");
  const actionsApi = useApi(api.scheduler.actionList, { initial: [] });
  const cronsApi   = useApi(api.scheduler.cronList,   { initial: [] });
  const historyApi = useApi(api.scheduler.history,    { initial: [] });

  const actions = (actionsApi.data || []).map(apiActionToUi);
  const crons   = (cronsApi.data   || []).map(apiCronToUi);
  const history = historyApi.data || [];

  const setActions = (next) => actionsApi.setData(typeof next === "function" ? next(actions) : next);
  const setCrons   = (next) => cronsApi.setData(typeof next === "function" ? next(crons)   : next);
  const setHistory = (next) => historyApi.setData(typeof next === "function" ? next(history) : next);

  const shared = { actions, setActions, crons, setCrons, history, setHistory, showToast };

  return (
    <div data-testid="admin-scheduler">
      <div className="mb-5">
        <h1 className="font-display font-bold text-xl text-[var(--text)]">Mission Actions</h1>
        <p className="text-[13px] text-[var(--textMuted)] mt-0.5">
          {actionsApi.loading ? "Loading…" : `${actions.length} action${actions.length === 1 ? "" : "s"}, ${crons.length} cron${crons.length === 1 ? "" : "s"}, ${history.length} deliveries`}
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex bg-[var(--bgCard)] rounded-xl border border-[var(--border)] mb-5 overflow-hidden">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            data-testid={`scheduler-tab-${t.id}`}
            className="flex-1 py-2.5 text-[13px] font-semibold border-none cursor-pointer font-sans transition-all"
            style={{ background:"transparent", color:tab===t.id?"var(--teal)":"var(--textMuted)", borderBottom:tab===t.id?"2px solid var(--teal)":"2px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "library" && <ActionLibrary   {...shared}/>}
      {tab === "crons"   && <CronSchedulers  {...shared}/>}
      {tab === "send"    && <SendNow         {...shared}/>}
      {tab === "history" && <DeliveryHistory {...shared}/>}
    </div>
  );
};
