import { useState } from "react";
import { C } from "../../tokens";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import {
  KPICard,
  FunnelWidget, ProfileSplitWidget, ActivityFeedWidget,
  MissionTableWidget, CountryWidget, RevenueWidget, EmailStatsWidget,
  widgetsForRole,
} from "./dashboard/widgets";

const signups7 = [12,19,8,24,31,18,27];
const active7  = [820,891,934,978,1021,1098,1147];
const relief7  = [55,57,58,61,62,63,65];
const rev7     = [0,19,38,0,57,19,38];
const prem7    = [199,201,205,208,212,218,221];
const comp7    = [38,39,39,40,41,42,43];

// Demo: in production, read from auth context
const CURRENT_ROLE = "Super Admin";

const fmtCount = (n) => (n ?? 0).toLocaleString();
const fmtMoney = (n) => `$${((n ?? 0) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const ADashboard = () => {
  const [period, setPeriod] = useState("7d");
  const visible = new Set(widgetsForRole(CURRENT_ROLE).map(w => w.id));

  // Live KPIs from /api/admin/dashboard/stats
  const { data: stats, loading } = useApi(api.admin.dashboardStats, {
    select: (raw) => raw,           // keep the raw envelope
    initial: null,
  });

  const totalUsers   = stats?.totalUsers   ?? 0;
  const premiumUsers = stats?.premiumUsers ?? 0;
  const activeToday  = stats?.activeToday  ?? 0;
  const revenue      = stats?.revenue      ?? 0;

  return (
    <div data-testid="admin-dashboard">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Dashboard</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">
            {new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})}
            {" · "}{loading ? "Loading…" : "Live data"}
          </p>
        </div>
        <div className="flex gap-2">
          {[["7d","7 days"],["30d","30 days"],["all","All time"]].map(([v,l]) => (
            <button key={v} onClick={() => setPeriod(v)}
              data-testid={`dashboard-period-${v}`}
              className="h-8 px-3.5 rounded-lg border-none font-sans text-xs font-semibold cursor-pointer transition-all"
              style={{ background:period===v?C.teal:"var(--bgMuted)", color:period===v?"#fff":"var(--textMuted)" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {visible.has("kpi_primary") && (
        <div className="kpi-grid mb-4" data-testid="kpi-primary-grid">
          <KPICard label="Total Users"    value={fmtCount(totalUsers)}              accent={C.teal}  sparkData={signups7} testId="kpi-total-users"/>
          <KPICard label="Active Today"   value={fmtCount(activeToday)}             sub={totalUsers ? `${stats?.dau ?? 0}% of total` : ""} accent={C.green} sparkData={active7} testId="kpi-active-today"/>
          <KPICard label="Premium Users"  value={fmtCount(premiumUsers)}            sub={totalUsers ? `of ${fmtCount(totalUsers)}` : ""}   accent={C.gold}  sparkData={prem7} testId="kpi-premium-users"/>
          <KPICard label="Revenue (MTD)"  value={fmtMoney(revenue)}                 sub="from active subs" accent={C.navy}  sparkData={rev7} testId="kpi-revenue"/>
        </div>
      )}

      {visible.has("kpi_secondary") && (
        <div className="kpi-grid mb-4">
          <KPICard label="Avg Relief Score"   value="65/100"                 delta="3 pts this week" accent={C.teal}  sparkData={relief7}/>
          <KPICard label="Mission Completion" value="43%"                    delta="1% this week"    accent={C.green} sparkData={comp7}/>
          <KPICard label="Assessment Rate"    value={`${stats?.assessmentRate ?? 0}%`} sub="of users finished quiz" accent={C.gold}/>
          <KPICard label="DAU %"              value={`${stats?.dau ?? 0}%`}            sub="active in last 24h"     accent={C.coral}/>
        </div>
      )}

      {(visible.has("funnel") || visible.has("profiles") || visible.has("activity")) && (
        <div className="dash-grid mb-4">
          {visible.has("funnel")   && <FunnelWidget/>}
          {visible.has("profiles") && <ProfileSplitWidget/>}
          {visible.has("activity") && <ActivityFeedWidget/>}
        </div>
      )}

      {(visible.has("missions") || visible.has("countries") || visible.has("revenue")) && (
        <div className="col2 mb-4">
          {visible.has("missions") && <MissionTableWidget/>}
          <div className="space-y-4">
            {visible.has("countries") && <CountryWidget/>}
            {visible.has("revenue")   && <RevenueWidget/>}
          </div>
        </div>
      )}

      {visible.has("email") && <EmailStatsWidget/>}
    </div>
  );
};
