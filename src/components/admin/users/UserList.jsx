import { useState, useMemo } from "react";
import { Upload, Download, Trash2, Mail, UserX } from "../../../lib/icons";
import { profileLabel, profileColor, profileVariant, planLabel, planVariant, STATUS_VARIANT } from "../../../lib/constants";
import { Button, Badge, Toggle, Card, SearchBar, Select, Pager, Confirm } from "../../ui/index";
import { Table } from "../../ui/Table";
import { CsvImportModal } from "./CsvImport";

const PER = 10;

const downloadCSV = (rows) => {
  const header = "name,email,profile,plan,country,status,streak,reliefScore";
  const lines = rows.map(u => [u.name,u.email,u.profile,u.plan,u.country,u.status,u.streak,u.reliefScore].join(","));
  const blob = new Blob([[header,...lines].join("\n")], { type:"text/csv" });
  const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="users_export.csv"; a.click();
};

export const UserList = ({ users, setUsers, onViewUser, showToast }) => {
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [page, setPage]         = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [csvOpen, setCsvOpen]   = useState(false);
  const [bulkAction, setBulkAction] = useState(null);

  const filtered = useMemo(() => {
    let list = users;
    if (filter !== "all") list = list.filter(u => u.status===filter || u.plan===filter || u.profile===filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return list;
  }, [users, filter, search]);

  const paged    = filtered.slice((page-1)*PER, page*PER);
  const allOnPage = paged.every(u => selected.has(u.id));
  const anySelected = selected.size > 0;

  const toggleAll = () => {
    if (allOnPage) setSelected(s => { const n=new Set(s); paged.forEach(u=>n.delete(u.id)); return n; });
    else setSelected(s => { const n=new Set(s); paged.forEach(u=>n.add(u.id)); return n; });
  };
  const toggleOne = (id) => setSelected(s => { const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; });

  const bulkDo = (action) => {
    const ids = [...selected];
    if (action === "delete")    setUsers(us => us.filter(u => !ids.includes(u.id)));
    if (action === "deactivate")setUsers(us => us.map(u => ids.includes(u.id)?{...u,status:"inactive"}:u));
    if (action === "activate")  setUsers(us => us.map(u => ids.includes(u.id)?{...u,status:"active"}:u));
    if (action === "email")     showToast(`Email sent to ${ids.length} users.`);
    setSelected(new Set()); setBulkAction(null);
  };

  const COLS = [
    {
      key:"_sel", label: (
        <input type="checkbox" checked={allOnPage && paged.length>0} onChange={toggleAll}
          className="w-4 h-4 rounded cursor-pointer accent-[var(--teal)]"/>
      ), width:40,
      render:(_,u) => (
        <input type="checkbox" checked={selected.has(u.id)} onChange={()=>toggleOne(u.id)}
          onClick={e=>e.stopPropagation()}
          className="w-4 h-4 rounded cursor-pointer accent-[var(--teal)]"/>
      )
    },
    {
      key:"name", label:"User",
      render:(_,u) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background:`linear-gradient(135deg,${profileColor(u.profile)},${profileColor(u.profile)}99)` }}>
            {u.name[0]}
          </div>
          <div>
            <div className="font-semibold text-[13px] text-[var(--text)]">{u.name}</div>
            <div className="text-[11px] text-[var(--textMuted)]">{u.email}</div>
          </div>
        </div>
      )
    },
    { key:"profile", label:"Profile",  render:v=><Badge label={profileLabel(v)} variant={profileVariant(v)}/> },
    { key:"plan",    label:"Plan",     render:v=><Badge label={planLabel(v)}    variant={planVariant(v)}/> },
    { key:"country", label:"Country",  render:v=><span className="text-[13px] text-[var(--textMuted)]">{v}</span> },
    {
      key:"reliefScore", label:"Score",
      render:v=>(
        <div className="flex items-center gap-2 min-w-[80px]">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--bgMuted)]">
            <div className="h-full rounded-full" style={{ width:`${v}%`, background:"var(--teal)" }}/>
          </div>
          <span className="text-[11px] font-bold text-[var(--teal)] w-8 text-right">{v}</span>
        </div>
      )
    },
    { key:"streak",  label:"Streak",  render:v=><span className="text-[13px] font-semibold" style={{color:"var(--green)"}}>{v}d</span> },
    { key:"status",  label:"Status",  render:v=><Badge label={v} variant={STATUS_VARIANT[v]||"grey"}/> },
    { key:"id",      label:"",
      render:(_,u) => (
        <Button size="xs" variant="ghost" onClick={()=>onViewUser(u.id)}>View →</Button>
      )
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Users</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">
            {users.length.toLocaleString()} total users
            {anySelected && <span className="ml-2 font-semibold text-[var(--teal)]">· {selected.size} selected</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" icon={Download} onClick={()=>downloadCSV(filtered)}>Export CSV</Button>
          <Button size="sm" variant="ghost" icon={Upload} onClick={()=>setCsvOpen(true)}>Import CSV</Button>
          <Button size="sm" onClick={()=>showToast("Add user form — coming soon.")}>+ Add User</Button>
        </div>
      </div>

      {/* Bulk action bar */}
      {anySelected && (
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl mb-4 flex-wrap"
          style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
          <span className="text-[13px] font-semibold text-[var(--teal)]">{selected.size} selected</span>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" icon={Mail} onClick={()=>bulkDo("email")}>Email selected</Button>
            <Button size="sm" variant="secondary" icon={UserX} onClick={()=>setBulkAction("deactivate")}>Deactivate</Button>
            <Button size="sm" variant="danger" icon={Trash2} onClick={()=>setBulkAction("delete")}>Delete</Button>
            <Button size="sm" variant="ghost" onClick={()=>setSelected(new Set())}>Clear</Button>
          </div>
        </div>
      )}

      <Card noPad>
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-[var(--border)] flex-wrap">
          <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1);}} placeholder="Search users…" className="flex-1 min-w-[180px] max-w-[280px]" />
          <Select value={filter} onChange={e=>{setFilter(e.target.value);setPage(1);}} className="!mb-0 w-auto">
            <option value="all">All users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="new">New signups</option>
            <option value="premium">Premium</option>
            <option value="free">Free</option>
            <option value="avoider">Avoiders</option>
            <option value="anxious">Anxious Managers</option>
            <option value="silent">Silent Stressors</option>
          </Select>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[12px] text-[var(--textMuted)]">{filtered.length} results</span>
            {/* Stats pills */}
            {[
              ["Active", users.filter(u=>u.status==="active").length, "var(--green)"],
              ["Premium", users.filter(u=>u.plan==="premium").length, "var(--gold)"],
            ].map(([l,v,c])=>(
              <div key={l} className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold"
                style={{ background:"var(--bgMuted)" }}>
                <span className="w-2 h-2 rounded-full" style={{background:c}}/>
                <span className="text-[var(--textMuted)]">{l}: <strong style={{color:c}}>{v}</strong></span>
              </div>
            ))}
          </div>
        </div>

        <Table cols={COLS} rows={paged} empty="No users match this filter." />
        <div className="px-4"><Pager page={page} total={filtered.length} perPage={PER} onChange={setPage}/></div>
      </Card>

      <CsvImportModal
        open={csvOpen}
        onClose={()=>setCsvOpen(false)}
        onImport={rows=>{
          setUsers(u=>[...u,...rows]);
          showToast(`${rows.length} users imported.`);
        }}
      />

      <Confirm
        open={bulkAction==="delete"}
        onClose={()=>setBulkAction(null)}
        title={`Delete ${selected.size} users?`}
        message="This permanently deletes all selected user accounts and their data."
        danger
        confirmLabel="Delete All"
        onConfirm={()=>bulkDo("delete")}
      />
      <Confirm
        open={bulkAction==="deactivate"}
        onClose={()=>setBulkAction(null)}
        title={`Deactivate ${selected.size} users?`}
        message="These users will lose access until reactivated."
        confirmLabel="Deactivate"
        onConfirm={()=>bulkDo("deactivate")}
      />
    </div>
  );
};
