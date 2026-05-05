/**
 * dashboard/widgets.jsx
 * All dashboard widget components + the WIDGET_REGISTRY that controls
 * which widgets are visible per role.
 */
import { Activity } from "../../../lib/icons";
import { C } from "../../../tokens";
import { Card } from "../../ui/index";

// ─── Mini sparkline ────────────────────────────────────────────
export const Spark = ({ data, color }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-[2px]" style={{ height:36 }}>
      {data.map((v, i) => (
        <div key={`spark-${i}-${v}`} className="flex-1 rounded-sm min-h-[2px] transition-all"
          style={{ height:`${Math.round((v/max)*100)}%`, background:i===data.length-1?color:color+"66", opacity:i===data.length-1?1:0.7+i*0.04 }}/>
      ))}
    </div>
  );
};
export const ChartCard = ({ title, value, data = [], color }) => {
  if (!data.length) return null;

  const max = Math.max(...data, 1);

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x},${y}`;
  });

  const path = `M ${points.join(" L ")}`;

  return (
    <div className="rounded-2xl p-5 border bg-[var(--adminCard)] border-[var(--border)]">
      <div className="text-sm text-[var(--textMuted)] mb-1">
        {title}
      </div>

      <div className="text-2xl font-bold text-[var(--text)] mb-4">
        {value}
      </div>

      <svg viewBox="0 0 100 40" className="w-full h-28">
        {/* AREA */}
        <path
          d={`${path} L 100 40 L 0 40 Z`}
          fill={color}
          opacity="0.08"
        />

        {/* LINE */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
// ─── KPI card ──────────────────────────────────────────────────
export const KPICard = ({ label, value, delta, deltaDir="up", sub, accent, sparkData }) => (
  <div className="rounded-2xl p-5 border" style={{ background:"var(--adminCard)", borderColor:"var(--border)", borderTop:`3px solid ${accent}` }}>
    <div className="text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-[.7px] mb-2.5">{label}</div>
    <div className="font-display font-bold text-[30px] leading-none text-[var(--text)] mb-1.5">{value}</div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {delta && <span className="text-[12px] font-semibold" style={{ color:deltaDir==="up"?"var(--green)":"var(--coral)" }}>{deltaDir==="up"?"↑":"↓"} {delta}</span>}
        {sub   && <span className="text-[12px] text-[var(--textMuted)]">{sub}</span>}
      </div>
      {sparkData && <Spark data={sparkData} color={accent}/>}
    </div>
  </div>
);

// ─── Conversion Funnel ─────────────────────────────────────────
export const FunnelWidget = ({ data = [] }) => {
  return (
    <div className="rounded-2xl p-5 border bg-[var(--adminCard)] border-[var(--border)]">
      <h3 className="text-sm font-semibold text-[var(--text)] mb-1">
        Conversion Funnel
      </h3>
      <p className="text-xs text-[var(--textMuted)] mb-4">
        Last 7 days
      </p>

      <div className="space-y-3">
        {data.map((f, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--textMuted)]">
                {f.label}
              </span>
              <span className="font-semibold text-[var(--text)]">
                {f.pct}%{" "}
                <span className="text-[var(--textMuted)]">
                  {f.value}
                </span>
              </span>
            </div>

            {/* THIN BAR (important) */}
            <div className="h-[6px] bg-[var(--bgMuted)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${f.pct}%`,
                  background: "linear-gradient(90deg,#2F7E79,#3FA39A)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StressProfileCard = ({ data = [] }) => {
  const colors = {
    avoider: "#2F7E79",
    anxious: "#D6A94C",
    silent: "#7FB3B0",
  };

  let cumulative = 0;

  return (
    <div className="rounded-2xl p-5 border bg-[var(--adminCard)] border-[var(--border)]">
      <h3 className="text-sm font-semibold text-[var(--text)] mb-4">
        Stress Profile Distribution
      </h3>

      <div className="flex items-center gap-6">
        {/* CLEAN DONUT */}
        <svg viewBox="0 0 36 36" className="w-28 h-28 rotate-[-90deg]">
          {data.map((d, i) => {
            const dash = `${d.pct} ${100 - d.pct}`;
            const circle = (
              <circle
                key={i}
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke={colors[d.label]}
                strokeWidth="3"
                strokeDasharray={dash}
                strokeDashoffset={-cumulative}
              />
            );
            cumulative += d.pct;
            return circle;
          })}
        </svg>

        {/* LEGEND */}
        <div className="flex-1 space-y-2 text-sm">
          {data.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: colors[d.label] }}
              />
              <span className="capitalize text-[var(--text)]">
                {d.label}
              </span>
              <span className="ml-auto text-[var(--textMuted)]">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* COUNTS */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((d) => (
          <div
            key={d.label}
            className="text-center py-2 rounded-lg bg-[var(--bgMuted)]"
          >
            <div className="font-semibold text-[var(--text)]">
              {d.count}
            </div>
            <div className="text-xs text-[var(--textMuted)] capitalize">
              {d.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// ─── Live Activity Feed ────────────────────────────────────────
export const ActivityFeedWidget = () => {
  const FEED = [
    { msg:"Elena V. started the 7-Day program",       time:"2m ago",  c:C.teal  },
    { msg:"Marcus T. upgraded to Premium — $19",       time:"14m ago", c:C.green },
    { msg:"Priya R. hit a 7-day streak",               time:"31m ago", c:C.gold  },
    { msg:"Community post flagged — 4 reports",        time:"1h ago",  c:C.coral },
    { msg:"Expiry sequence sent to 142 users",         time:"2h ago",  c:C.navy  },
    { msg:"Aisha B. completed the 30-Day Sprint",      time:"3h ago",  c:C.green },
    { msg:"James K. signed up from organic search",    time:"4h ago",  c:C.teal  },
    { msg:"Push notification sent to 1,147 users",     time:"5h ago",  c:C.navy  },
  ];
  return (
    <Card title="Live Activity" sub="Real-time events">
      {FEED.map((item, i) => (
        <div key={`feed-${i}-${item.time}`} className="flex gap-2.5 py-2.5" style={{ borderBottom:i<FEED.length-1?"1px solid var(--border)":"none" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:item.c+"18" }}>
            <Activity size={14} color={item.c}/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-[var(--text)] leading-snug">{item.msg}</div>
            <div className="text-[11px] text-[var(--textMuted)] mt-0.5">{item.time}</div>
          </div>
        </div>
      ))}
    </Card>
  );
};

// ─── Mission Completion Table ──────────────────────────────────
export const MissionCompletionCard = ({ data = [] }) => {
  return (
    <div className="rounded-2xl p-5 border bg-[var(--adminCard)] border-[var(--border)]">
      <h3 className="text-sm font-semibold text-[var(--text)] mb-4">
        Mission Completion Rate by Day
      </h3>

      <div className="space-y-3">
        {data.map((m, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--textMuted)] truncate">
                Day {i + 1} — {m.label}
              </span>
              <span className="text-[var(--text)] font-semibold">
                {m.rate}%
                <span className="text-[var(--textMuted)] ml-1">
                  {m.completed}
                </span>
              </span>
            </div>

            {/* THIN PROGRESS BAR */}
            <div className="h-[6px] bg-[var(--bgMuted)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${m.rate}%`,
                  background: "#2F7E79",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// ─── Users by Country ──────────────────────────────────────────
export const CountryWidget = () => {
  const TOP_COUNTRIES = [
    { c:"United States", users:612, pct:48 },
    { c:"United Kingdom",users:243, pct:19 },
    { c:"India",          users:192, pct:15 },
    { c:"Canada",         users:128, pct:10 },
    { c:"Australia",      users:109, pct:8  },
  ];
  return (
    <Card title="Users by Country" sub="Top 5 markets">
      <div className="space-y-3">
        {TOP_COUNTRIES.map((c) => (
          <div key={c.c} className="flex items-center gap-3">
            <span style={{ fontSize:13, color:"var(--text)", flex:1 }}>{c.c}</span>
            <div style={{ flex:2, height:6, background:"var(--bgMuted)", borderRadius:3, overflow:"hidden" }}>
              <div style={{ width:`${c.pct}%`, height:"100%", background:C.teal, borderRadius:3 }}/>
            </div>
            <span style={{ fontSize:12, fontWeight:600, color:"var(--text)", minWidth:32, textAlign:"right" }}>{c.pct}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ─── Revenue Breakdown ─────────────────────────────────────────
export const RevenueWidget = () => (
  <Card title="Revenue Breakdown">
    <div className="space-y-3">
      {[
        { label:"30-Day Sprint (one-time)", amount:"$4,199", pct:100, color:C.teal  },
        { label:"Premium renewals",         amount:"$722",   pct:17,  color:C.gold  },
        { label:"Refunds issued",           amount:"-$57",   pct:1,   color:C.coral },
      ].map((r) => (
        <div key={r.label}>
          <div className="flex justify-between mb-1.5">
            <span style={{ fontSize:12, color:"var(--text)" }}>{r.label}</span>
            <span style={{ fontSize:13, fontWeight:700, color:r.amount.startsWith("-")?C.coral:"var(--text)" }}>{r.amount}</span>
          </div>
          <div style={{ height:5, background:"var(--bgMuted)", borderRadius:3, overflow:"hidden" }}>
            <div style={{ width:`${r.pct}%`, height:"100%", background:r.color, borderRadius:3 }}/>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// ─── Email Performance ─────────────────────────────────────────
export const EmailStatsWidget = () => (
  <Card title="Email Performance" sub="Last 7 days across all sequences">
    <div className="grid grid-cols-5 gap-4">
      {[
        { l:"Sent",         v:"9,847", c:C.teal  },
        { l:"Delivered",    v:"9,621", c:C.green },
        { l:"Open rate",    v:"68.4%", c:C.teal  },
        { l:"Click rate",   v:"24.1%", c:C.gold  },
        { l:"Unsubscribes", v:"0.3%",  c:C.coral },
      ].map(({l,v,c}) => (
        <div key={l} className="text-center py-4 rounded-xl" style={{ background:"var(--bgMuted)" }}>
          <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:22, fontWeight:700, color:c, lineHeight:1 }}>{v}</div>
          <div style={{ fontSize:11, color:"var(--textMuted)", marginTop:5 }}>{l}</div>
        </div>
      ))}
    </div>
  </Card>
);

// ─── Widget registry — role-based visibility ───────────────────
// Each widget has an id, label, and minimum role to show it.
// roles: "all" = everyone, "editor" = Content Editor+, "support" = Support+, "super" = Super Admin only
export const WIDGET_REGISTRY = [
  { id:"kpi_primary",    label:"Primary KPIs",           roles:["Super Admin","Content Editor","Support","Read Only"], component:null }, // assembled in Dashboard
  { id:"kpi_secondary",  label:"Secondary KPIs",         roles:["Super Admin","Content Editor","Support"],             component:null },
  { id:"funnel",         label:"Conversion Funnel",      roles:["Super Admin","Content Editor"],                       component:FunnelWidget },
  { id:"profiles",       label:"Stress Profile Split",   roles:["Super Admin","Content Editor","Support"],             component:StressProfileCard },
  { id:"activity",       label:"Live Activity Feed",     roles:["Super Admin","Content Editor","Support"],             component:ActivityFeedWidget },
  { id:"missions",       label:"Mission Completion",     roles:["Super Admin","Content Editor"],                       component:MissionCompletionCard },
  { id:"countries",      label:"Users by Country",       roles:["Super Admin","Content Editor"],                       component:CountryWidget },
  { id:"revenue",        label:"Revenue Breakdown",      roles:["Super Admin"],                                        component:RevenueWidget },
  { id:"email",          label:"Email Performance",      roles:["Super Admin","Content Editor"],                       component:EmailStatsWidget },
];

export const widgetsForRole = (role) =>
  WIDGET_REGISTRY.filter(w => w.roles.includes(role));
