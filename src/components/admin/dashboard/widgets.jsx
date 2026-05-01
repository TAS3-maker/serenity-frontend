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
export const FunnelWidget = () => {
  const FUNNEL = [
    { label:"Visitors (7d)",       v:8420, pct:100 },
    { label:"Started assessment",  v:2814, pct:33  },
    { label:"Completed Day 1",     v:1284, pct:15  },
    { label:"Active Day 3+",       v:892,  pct:11  },
    { label:"Upgraded Premium",    v:221,  pct:3   },
  ];
  return (
    <Card title="Conversion Funnel" sub="Last 7 days">
      <div className="space-y-3">
        {FUNNEL.map((f) => (
          <div key={f.label}>
            <div className="flex justify-between mb-1" style={{ fontSize:13 }}>
              <span style={{ color:"var(--text)" }}>{f.label}</span>
              <span style={{ fontWeight:700, color:"var(--text)" }}>{f.v.toLocaleString()} <span style={{ color:"var(--textMuted)", fontWeight:400 }}>({f.pct}%)</span></span>
            </div>
            <div style={{ height:8, background:"var(--bgMuted)", borderRadius:4, overflow:"hidden" }}>
              <div style={{ width:`${f.pct}%`, height:"100%", background:`linear-gradient(90deg,${C.teal},${C.green})`, borderRadius:4, transition:"width .5s" }}/>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ─── Stress Profile Split ──────────────────────────────────────
export const ProfileSplitWidget = () => {
  const PROFILES = [
    { label:"The Avoider",     pct:48, color:C.teal  },
    { label:"Anxious Manager", pct:32, color:C.gold  },
    { label:"Silent Stressor", pct:20, color:C.green },
  ];
  return (
    <Card title="Stress Profile Split" sub="All users">
      <div className="flex h-4 rounded-full overflow-hidden mb-4">
        {PROFILES.map((p) => <div key={`bar-${p.label}`} style={{ width:`${p.pct}%`, background:p.color, transition:"width .5s" }}/>)}
      </div>
      <div className="space-y-2.5 mb-4">
        {PROFILES.map((p) => (
          <div key={p.label} className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background:p.color }}/>
            <span style={{ flex:1, fontSize:13, color:"var(--text)" }}>{p.label}</span>
            <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:14, color:p.color }}>{p.pct}%</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 pt-3" style={{ borderTop:"1px solid var(--border)" }}>
        {[["Churn rate","3.1%"],["30-day conv.","17.2%"]].map(([l,v]) => (
          <div key={l} className="text-center py-2 rounded-xl" style={{ background:"var(--bgMuted)" }}>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:"var(--text)" }}>{v}</div>
            <div style={{ fontSize:11, color:"var(--textMuted)", marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
    </Card>
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
export const MissionTableWidget = () => {
  const MISSIONS = [
    { day:1, label:"Understanding Your Pattern", sent:1738, completed:1492, rate:86 },
    { day:2, label:"Naming the Feeling",         sent:1605, completed:1316, rate:82 },
    { day:3, label:"The Avoidance Map",          sent:1459, completed:1139, rate:78 },
    { day:4, label:"Your Money Origin Story",    sent:1255, completed:929,  rate:74 },
    { day:5, label:"The Guilt Cycle",            sent:1102, completed:793,  rate:72 },
  ];
  return (
    <Card title="Mission Completion by Day" sub="Top 5 missions">
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"var(--bgMuted)" }}>
              {["Day","Mission","Sent","Completed","Rate"].map(h => (
                <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:10, fontWeight:700, color:"var(--textMuted)", textTransform:"uppercase", letterSpacing:".6px", whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MISSIONS.map(m => (
              <tr key={m.day} style={{ borderBottom:"1px solid var(--border)" }}>
                <td style={{ padding:"10px 12px" }}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs text-white" style={{ background:C.teal }}>D{m.day}</div>
                </td>
                <td style={{ padding:"10px 12px", fontSize:12, color:"var(--text)", maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.label}</td>
                <td style={{ padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--text)" }}>{m.sent.toLocaleString()}</td>
                <td style={{ padding:"10px 12px", fontSize:12, color:"var(--textMuted)" }}>{m.completed.toLocaleString()}</td>
                <td style={{ padding:"10px 12px" }}>
                  {(() => {
                    const rateColor = m.rate > 80 ? C.green : m.rate > 70 ? C.teal : C.gold;
                    return (
                      <div className="flex items-center gap-2">
                        <div style={{ flex:1, height:5, background:"var(--bgMuted)", borderRadius:3, overflow:"hidden", minWidth:40 }}>
                          <div style={{ width:`${m.rate}%`, height:"100%", background:rateColor, borderRadius:3 }}/>
                        </div>
                        <span style={{ fontSize:11, fontWeight:700, color:rateColor, minWidth:28 }}>{m.rate}%</span>
                      </div>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
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
  { id:"profiles",       label:"Stress Profile Split",   roles:["Super Admin","Content Editor","Support"],             component:ProfileSplitWidget },
  { id:"activity",       label:"Live Activity Feed",     roles:["Super Admin","Content Editor","Support"],             component:ActivityFeedWidget },
  { id:"missions",       label:"Mission Completion",     roles:["Super Admin","Content Editor"],                       component:MissionTableWidget },
  { id:"countries",      label:"Users by Country",       roles:["Super Admin","Content Editor"],                       component:CountryWidget },
  { id:"revenue",        label:"Revenue Breakdown",      roles:["Super Admin"],                                        component:RevenueWidget },
  { id:"email",          label:"Email Performance",      roles:["Super Admin","Content Editor"],                       component:EmailStatsWidget },
];

export const widgetsForRole = (role) =>
  WIDGET_REGISTRY.filter(w => w.roles.includes(role));
