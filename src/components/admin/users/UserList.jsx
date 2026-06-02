import { useState, useMemo } from "react";
import { Upload, Download, Trash2, Mail, UserX } from "../../../lib/icons";
import { profileLabel, profileColor, profileVariant, planLabel, planVariant, STATUS_VARIANT } from "../../../lib/constants";
import { Button, Badge, Toggle, Card, SearchBar, Select, Pager, Confirm } from "../../ui/index";
import { Table } from "../../ui/Table";
import { CsvImportModal } from "./CsvImport";
import { AddUserModal } from "./AddUserModal";
const PER = 10;

const downloadCSV = (rows) => {
  const header = "name,email,profile,plan,country,status,streak,reliefScore";
  const lines = rows.map(u => [u.name,u.email,u.profile,u.plan,u.country,u.status,u.streak,u.reliefScore].join(","));
  const blob = new Blob([[header,...lines].join("\n")], { type:"text/csv" });
  const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="users_export.csv"; a.click();
};

export const UserList = ({ users, setUsers, onViewUser, showToast ,reload }) => {
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [page, setPage]         = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [csvOpen, setCsvOpen]   = useState(false);
  const [bulkAction, setBulkAction] = useState(null);
const [addOpen, setAddOpen] = useState(false);
const filtered = useMemo(() => {
  let list = users;

  if (filter === "active") list = list.filter(u => u.status === "active");
  if (filter === "inactive") list = list.filter(u => u.status === "inactive");
 
  if (filter === "new") {
    const now = Date.now();
    list = list.filter(u => u.joinDate && (now - new Date(u.joinDate)) < 7 * 86400000);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
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
    key: "_sel",
    label: (
      <input
        type="checkbox"
        checked={allOnPage && paged.length > 0}
        onChange={toggleAll}
        className="w-4 h-4 accent-[var(--teal)]"
      />
    ),
    width: 40,
    render: (_, u) => (
      <input
        type="checkbox"
        checked={selected.has(u.id)}
        onChange={() => toggleOne(u.id)}
        onClick={(e) => e.stopPropagation()}
        className="w-4 h-4 accent-[var(--teal)]"
      />
    ),
  },

  {
    key: "name",
    label: "Name",
    render: (_, u) => (
      <div>
        <div className="font-semibold text-[13px] text-[var(--text)]">
          {u.name}
        </div>
        <div className="text-[11px] text-[var(--textMuted)]">
          {u.email}
        </div>
      </div>
    ),
  },

  {
    key: "profile",
    label: "Profile",
    render: (v) => (
      <Badge label={profileLabel(v)} variant={profileVariant(v)} />
    ),
  },

  {
    key: "plan",
    label: "Plan",
    render: (v) => (
   <div className="font-semibold capitalize text-[13px] ">
    {v}
   </div>
    ),
  },

  {
    key: "end",
    label: "Subscription End",
    render: (_, u) => (
      <span className="text-[13px] text-[var(--textMuted)]">
        {u.raw?.subscriptionEnd
          ? new Date(u.raw.subscriptionEnd).toLocaleDateString()
          : "—"}
      </span>
    ),
  },

  {
    key: "status",
    label: "Status",
    render: (v) => (
      <Badge label={v} variant={STATUS_VARIANT[v] || "grey"} />
    ),
  },

  {
    key: "actions",
    label: "Actions",
    render: (_, u) => (
      <div className="flex gap-2">
        <Button size="xs" variant="ghost" onClick={() => onViewUser(u.id)}>
          View
        </Button>
        <Button size="xs" variant="ghost">
          Email
        </Button>
      </div>
    ),
  },
];
const FILTER_TABS = ["all", "premium", "active", "new", "inactive"];
 return (
  <div className="w-full overflow-hidden">

    {/* Header */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-5 gap-3">
      
      <div className="min-w-0">
        <h1 className="font-display font-bold text-lg sm:text-xl text-[var(--text)] break-words">
          Users
        </h1>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2 flex-wrap">
        
        <Button
          size="sm"
          variant="ghost"
          icon={Download}
          onClick={() => downloadCSV(filtered)}
        >
          Export CSV
        </Button>

        <Button
          size="sm"
          variant="ghost"
          icon={Upload}
          onClick={() => setCsvOpen(true)}
        >
          Import CSV
        </Button>

        <Button
          size="sm"
          onClick={() => setAddOpen(true)}
        >
          + Add User
        </Button>
      </div>
    </div>

    {/* Bulk action bar */}
    {anySelected && (
      <div
        className="flex flex-col lg:flex-row lg:items-center gap-3 px-4 sm:px-5 py-3 rounded-xl mb-4"
        style={{
          background: "var(--tealBg)",
          border: "1px solid var(--tealBorder)",
        }}
      >
        <span className="text-[13px] font-semibold text-[var(--teal)]">
          {selected.size} selected
        </span>

        <div className="flex flex-wrap gap-2">
          
          <Button
            size="sm"
            icon={Mail}
            onClick={() => bulkDo("email")}
          >
            Email selected
          </Button>

          <Button
            size="sm"
            variant="secondary"
            icon={UserX}
            onClick={() => setBulkAction("deactivate")}
          >
            Deactivate
          </Button>

          <Button
            size="sm"
            variant="danger"
            icon={Trash2}
            onClick={() => setBulkAction("delete")}
          >
            Delete
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelected(new Set())}
          >
            Clear
          </Button>
        </div>
      </div>
    )}

    {/* FILTER BAR */}
    <div className="flex flex-col gap-3 p-4 border-b border-[var(--border)]">

      {/* SEARCH FULL WIDTH IN MOBILE */}
      <SearchBar
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        placeholder="Search users…"
        className="w-full"
      />

      {/* TABS + RESULT */}
      <div className="flex items-center justify-between gap-3 flex-wrap">

        {/* NAV TABS */}
        <div className="flex gap-2.5 flex-wrap">
          {FILTER_TABS.map((t) => (
            <button
              key={t}
              onClick={() => {
                setFilter(t);
                setPage(1);
              }}
              className="px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold capitalize whitespace-nowrap"
              style={{
                background:
                  filter === t
                    ? "var(--teal)"
                    : "var(--bgMuted)",

                color:
                  filter === t
                    ? "#fff"
                    : "var(--textMuted)",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="text-[12px] text-[var(--textMuted)] whitespace-nowrap">
          {filtered.length} results
        </div>
      </div>
    </div>

    {/* TABLE */}
    <Card noPad>
      
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table
            cols={COLS}
            rows={paged}
            empty="No users match this filter."
          />
        </div>
      </div>

      <div className="px-3 sm:px-4 overflow-x-auto">
        <Pager
          page={page}
          total={filtered.length}
          perPage={PER}
          onChange={setPage}
        />
      </div>
    </Card>

    <CsvImportModal
      open={csvOpen}
      onClose={() => setCsvOpen(false)}
      onImport={(rows) => {
        setUsers((u) => [...u, ...rows]);
        showToast(`${rows.length} users imported.`);
      }}
    />

    <Confirm
      open={bulkAction === "delete"}
      onClose={() => setBulkAction(null)}
      title={`Delete ${selected.size} users?`}
      message="This permanently deletes all selected user accounts and their data."
      danger
      confirmLabel="Delete All"
      onConfirm={() => bulkDo("delete")}
    />

    <Confirm
      open={bulkAction === "deactivate"}
      onClose={() => setBulkAction(null)}
      title={`Deactivate ${selected.size} users?`}
      message="These users will lose access until reactivated."
      confirmLabel="Deactivate"
      onConfirm={() => bulkDo("deactivate")}
    />

    <AddUserModal
      open={addOpen}
      onClose={() => setAddOpen(false)}
      showToast={showToast}
      reload={reload}
    />
  </div>
);
};
