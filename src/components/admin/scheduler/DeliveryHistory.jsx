import { useState } from "react";
import { Badge, Card, Pager } from "../../ui/index";
import { Table } from "../../ui/Table";

const PER = 10;

export const DeliveryHistory = ({ history }) => {
  const [page, setPage] = useState(1);
  const COLS = [
    { key:"day",     label:"Day",
      render:(_,m) => <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white" style={{background:"var(--teal)"}}>D{m.day}</div>
    },
    { key:"title",   label:"Mission",  render:v => <span className="text-[13px] font-medium text-[var(--text)]">{v}</span> },
    { key:"profile", label:"Profile",  render:v => <Badge label={v==="all"?"All":v} variant="grey"/> },
    { key:"sent",    label:"Sent",     render:v => <span className="font-semibold">{v.toLocaleString()}</span> },
    { key:"opened",  label:"Open %",   render:(v,m) => <span style={{color:"var(--teal)"}}>{m.sent>0?`${Math.round(v/m.sent*100)}%`:"—"}</span> },
    { key:"completed",label:"Done %",  render:(v,m) => <span style={{color:"var(--green)"}}>{m.sent>0?`${Math.round(v/m.sent*100)}%`:"—"}</span> },
    { key:"cron",    label:"Source",   render:v => <span className="text-[12px] text-[var(--textMuted)]">{v}</span> },
    { key:"date",    label:"Date",     render:v => <span className="text-[12px] text-[var(--textMuted)] whitespace-nowrap">{v}</span> },
    { key:"status",  label:"Status",   render:v => <Badge label={v} variant={v==="delivered"?"green":"gold"}/> },
  ];

  return (
    <Card title="Delivery History" sub="All mission sends from cron schedulers and manual triggers" noPad>
      <Table cols={COLS} rows={history.slice((page-1)*PER,page*PER)} empty="No delivery history yet."/>
      <div className="px-4"><Pager page={page} total={history.length} perPage={PER} onChange={p=>{setPage(p);}}/></div>
    </Card>
  );
};
