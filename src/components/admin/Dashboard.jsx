import { useState, useMemo } from "react";
import { C } from "../../tokens";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import {
  KPICard,
  FunnelWidget,
  StressProfileCard,
  MissionCompletionCard,
  ChartCard
} from "./dashboard/widgets";
const fmtCount = (n) => (n ?? 0).toLocaleString();
const fmtMoney = (n) =>
  `$${(n ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
  })}`;

export const ADashboard = () => {
  const [period, setPeriod] = useState("7d");

  const { data, loading } = useApi(api.admin.dashboardStats, {
    select: (raw) => raw,
    initial: null,
  });

  const overview = data?.overview || {};
  const charts = data?.charts || {};
  const engagement = data?.engagement || {};
  const profileSplit = data?.profileSplit || [];
  const missions = data?.missions || [];

  /* =========================
     🔥 BUILD FUNNEL FROM API
  ========================== */
  const funnelData = useMemo(() => {
    const steps = [
      { label: "App installs", key: "app_install" },
      { label: "Assessment started", key: "assessment_started" },
      { label: "Assessment completed", key: "assessment_completed" },
      { label: "Program started", key: "program_started" },
      { label: "Day completed", key: "day_completed" },
      { label: "Program completed", key: "program_completed" },
      { label: "Checkout started", key: "checkout_started" },
      { label: "Checkout completed", key: "checkout_completed" },
      { label: "Converted to Premium", key: "premium_activated" },
    ];

    const base = engagement?.app_install?.unique || 1;

    return steps.map((s) => {
      const value = engagement?.[s.key]?.unique || 0;
      return {
        label: s.label,
        value,
        pct: Math.round((value / base) * 100),
      };
    });
  }, [engagement]);

  return (
    <div className="p-5">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500">
            {new Date().toDateString()} ·{" "}
            {loading ? "Loading…" : "All times in UTC"}
          </p>
        </div>

   
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <KPICard
          label="Total Users"
          value={fmtCount(overview.totalUsers)}
          accent={C.teal}
          sparkData={charts.signups7}
        />

        <KPICard
          label="Active Today"
          value={fmtCount(overview.activeToday)}
          accent={C.green}
          sparkData={charts.active7}
        />

        <KPICard
          label="Avg Progress"
          value={`${overview.avgProgress} days`}
          accent={C.gold}
        />

        <KPICard
          label="MRR / Revenue"
          value={fmtMoney(overview.mrr)}
          accent={C.navy}
          sparkData={charts.revenue7}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2  w-full h-full  gap-5  flex-row">
        {/* LEFT COLUMN */}
        <div className=" grid-cols-1 ">
      <ChartCard
  title="User Growth"
  value={`${overview.userGrowth}%`}
  data={charts.signups7 || []}
  color={C.teal}
/>

        </div>
              <div className="grid-cols-1 ">
      <ChartCard
  title="Revenue"
  value={fmtMoney(overview.mrr)}
  data={charts.revenue7 || []}
  color={C.green}
/>

        </div>

        {/* RIGHT COLUMN */}
            <div className="grid-cols-1 ">
     <ChartCard
  title="Daily Active Users"
  value={fmtCount(overview.activeToday)}
  data={charts.active7 || []}
  color={C.gold}
/>
        </div>

<div className="grid-cols-1 ">
          <FunnelWidget data={funnelData} />




</div>

    <div className="grid-cols-1 ">



          <StressProfileCard data={profileSplit} />



      </div>
    <div className="grid-cols-1 ">

          <MissionCompletionCard data={missions} />



      
      </div>
      </div>
    </div>
  );
};