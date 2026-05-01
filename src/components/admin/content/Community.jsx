import { useState, useMemo } from "react";
import { Users, MessageSquare, Flag, Trash2, Settings, Eye, Plus, ShieldCheck, UserX, Search } from "../../../lib/icons";
import { C } from "../../../tokens";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi";
import { Button, Badge, Card, Modal, Confirm, Toggle, Input, Select, SearchBar, Pager } from "../../ui/index";
import { Table } from "../../ui/Table";

const PER = 10;

// ─── helpers ─────────────────────────────────────────────────────
const getUserById = (u) =>
  !u || u === 0
    ? { id:0, name:"SerenityDecoded (Platform)", email:"team@serenitydecoded.com" }
    : (typeof u === "object" ? { id: u._id || u.id, name: u.name || "Member", email: u.email || "" }
                             : { id: u, name: "Member", email: "" });

const totalReactions = (msgs) =>
  msgs.reduce((sum, m) => sum + Object.values(m.reactions||{}).reduce((a,b) => a+b, 0), 0);

const reportedMsgs = (msgs) => msgs.filter(m => (m.reports||0) > 0);

// ─── Overview stats strip ────────────────────────────────────────
const StatPill = ({ label, value, color }) => (
  <div className="rounded-2xl p-5 border" style={{ background:"var(--adminCard)", borderColor:"var(--border)", borderTop:`3px solid ${color}` }}>
    <div className="font-display font-bold text-[28px] leading-none mb-1" style={{ color }}>{value}</div>
    <div className="text-[12px] text-[var(--textMuted)]">{label}</div>
  </div>
);

// ─── Message view modal ──────────────────────────────────────────
const ChatModal = ({ open, onClose, group, messages, onDeleteMsg, onPinMsg, onWarnUser, showToast }) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const msgs = messages[group?.id] || [];
  const filterMessages = (f) => {
    if (f === "reported") return msgs.filter(m => (m.reports || 0) > 0);
    if (f === "pinned")   return msgs.filter(m => m.pinned);
    return msgs;
  };
  const shown = filterMessages(filter);
  const paged = shown.slice((page-1)*8, page*8);

  if (!open || !group) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-[680px] max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background:"var(--bgCard)", border:"1px solid var(--border)", boxShadow:"0 24px 72px rgba(0,0,0,0.25)" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0" style={{ borderColor:"var(--border)" }}>
          <span className="text-2xl">{group.emoji}</span>
          <div className="flex-1">
            <div className="font-display font-bold text-[16px] text-[var(--text)]">{group.name}</div>
            <div className="text-[12px] text-[var(--textMuted)]">{msgs.length} messages · {group.members.length} members</div>
          </div>
          <div className="flex gap-2">
            {["all","reported","pinned"].map(f => (
              <button key={f} onClick={() => { setFilter(f); setPage(1); }}
                className="h-7 px-3 rounded-lg text-[11px] font-semibold border-none cursor-pointer font-sans capitalize"
                style={{ background:filter===f?"var(--teal)":"var(--bgMuted)", color:filter===f?"#fff":"var(--textMuted)" }}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--textMuted)] hover:bg-[var(--bgMuted)] border-none cursor-pointer bg-transparent">✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ scrollbarWidth:"thin" }}>
          {paged.length === 0 ? (
            <div className="text-center py-10 text-[13px] text-[var(--textMuted)]">No {filter} messages.</div>
          ) : paged.map(msg => {
            const user = getUserById(msg.userId);
            const reactions = Object.entries(msg.reactions||{});
            return (
              <div key={msg.id} className="rounded-xl p-4 group"
                style={{ background: (msg.reports||0)>0 ? "var(--coralBg)" : "var(--bgMuted)", border:`1px solid ${(msg.reports||0)>0?"var(--coral)20":"var(--border)"}` }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                      style={{ background:[C.teal,C.navy,C.green,C.gold,C.coral][msg.userId%5||0] }}>
                      {user.name.slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[13px] text-[var(--text)]">{user.name}</span>
                        {(msg.reports||0) > 0 && <Badge label={`${msg.reports} reports`} variant="coral"/>}
                        {msg.pinned && <Badge label="Pinned" variant="gold"/>}
                        <span className="text-[11px] text-[var(--textMuted)]">{msg.ts}</span>
                      </div>
                      <p className="text-[13px] text-[var(--text)] mt-1 leading-relaxed">{msg.text}</p>
                      {reactions.length > 0 && (
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {reactions.map(([em, count]) => (
                            <span key={em} className="text-[12px] px-2 py-0.5 rounded-full"
                              style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                              {em} {count}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button onClick={() => { onPinMsg(group.id, msg.id); showToast(msg.pinned?"Unpinned.":"Pinned."); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] cursor-pointer border-none"
                      style={{ background:"var(--goldBg)", color:C.gold }} title={msg.pinned?"Unpin":"Pin"}>
                      📌
                    </button>
                    <button onClick={() => { onWarnUser(user); showToast(`Warning sent to ${user.name}.`); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-none"
                      style={{ background:"var(--tealBg)", color:"var(--teal)" }} title="Warn user">
                      <ShieldCheck size={12}/>
                    </button>
                    <button onClick={() => { onDeleteMsg(group.id, msg.id); showToast("Message deleted."); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-none"
                      style={{ background:"var(--coralBg)", color:"var(--coral)" }} title="Delete message">
                      <Trash2 size={12}/>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {shown.length > 8 && (
          <div className="px-5 py-3 border-t" style={{ borderColor:"var(--border)" }}>
            <Pager page={page} total={shown.length} perPage={8} onChange={setPage}/>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Group settings modal ─────────────────────────────────────────
const GroupSettingsModal = ({ open, onClose, group, onSave, showToast }) => {
  const [form, setForm] = useState(group ? { name:group.name, description:group.description, type:group.type, messaging:group.messaging, active:group.active!==false } : {});
  const sf = (k,v) => setForm(f => ({...f,[k]:v}));
  if (!open || !group) return null;
  return (
    <Modal open={open} onClose={onClose} title={`Settings — ${group.name}`} width={480}>
      <div className="mb-3">
        <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Group Name</label>
        <input value={form.name||""} onChange={e=>sf("name",e.target.value)} className="w-full h-11 rounded-xl px-3 text-[13px] font-sans outline-none" style={{ background:"var(--bgMuted)",border:"1.5px solid var(--border)",color:"var(--text)" }}/>
      </div>
      <div className="mb-4">
        <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Description</label>
        <textarea value={form.description||""} onChange={e=>sf("description",e.target.value)} rows={2} className="w-full rounded-xl px-3 py-2.5 text-[13px] font-sans outline-none resize-none" style={{ background:"var(--bgMuted)",border:"1.5px solid var(--border)",color:"var(--text)" }}/>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Select label="Visibility" value={form.type||"public"} onChange={e=>sf("type",e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </Select>
        <Select label="Who can post" value={form.messaging||"all"} onChange={e=>sf("messaging",e.target.value)}>
          <option value="all">All members</option>
          <option value="admins_only">Admins only</option>
        </Select>
      </div>
      <div className="flex items-center justify-between p-3 rounded-xl mb-4" style={{ background:"var(--bgMuted)" }}>
        <div>
          <div className="text-[13px] font-semibold text-[var(--text)]">Group active</div>
          <div className="text-[11px] text-[var(--textMuted)]">Inactive groups are hidden from users</div>
        </div>
        <Toggle checked={form.active!==false} onChange={v=>sf("active",v)}/>
      </div>
      <div className="flex gap-2.5">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button className="flex-1" onClick={()=>{ onSave(group.id, form); showToast("Group updated."); onClose(); }}>Save Changes</Button>
      </div>
    </Modal>
  );
};

// ─── Main component ───────────────────────────────────────────────
// ─── Live Feed sub-component ─────────────────────────────────────
const LiveFeed = ({ groups, messages, onDelete, showToast }) => {
  const [feedPage, setFeedPage] = useState(1);
  const [feedGroup, setFeedGroup] = useState("all");
  const feedMsgs = Object.entries(messages)
    .flatMap(([gid, msgs]) => msgs.map(m => ({
      ...m,
      groupId:    gid,
      groupName:  groups.find(g=>g.id===gid)?.name  || gid,
      groupEmoji: groups.find(g=>g.id===gid)?.emoji || "💬",
    })))
    .filter(m => feedGroup === "all" || m.groupId === feedGroup)
    .sort((a,b) => b.id.localeCompare(a.id));
  const pagedFeed = feedMsgs.slice((feedPage-1)*PER, feedPage*PER);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Select value={feedGroup} onChange={e=>{setFeedGroup(e.target.value);setFeedPage(1);}} className="!mb-0 w-auto">
          <option value="all">All groups</option>
          {groups.map(g=><option key={g.id} value={g.id}>{g.emoji} {g.name}</option>)}
        </Select>
        <span className="text-[12px] text-[var(--textMuted)]">{feedMsgs.length} messages</span>
      </div>
      <Card noPad>
        <Table
          cols={[
            { key:"groupEmoji", label:"Group",
              render:(_,m)=>(<div className="flex items-center gap-2"><span>{m.groupEmoji}</span><span className="text-[12px] text-[var(--textMuted)]">{m.groupName}</span></div>)
            },
            { key:"userId", label:"User",
              render:(_,m)=>{ const u=getUserById(m.userId); return <span className="font-medium text-[13px] text-[var(--text)]">{u.name}</span>; }
            },
            { key:"text", label:"Message",
              render:v=><span className="text-[12px] text-[var(--textMuted)] truncate block max-w-[280px]">{v||"[Media]"}</span>
            },
            { key:"reactions", label:"Reactions",
              render:v=>{ const t=Object.values(v||{}).reduce((a,b)=>a+b,0); return <span className="text-[12px] text-[var(--textMuted)]">{t>0?`${t} reactions`:"—"}</span>; }
            },
            { key:"pinned",  label:"Pinned",  render:v=>v?<Badge label="Pinned" variant="gold"/>:<span className="text-[var(--textFaint)]">—</span> },
            { key:"reports", label:"Reports", render:v=>v>0?<Badge label={`${v} reports`} variant="coral"/>:<span className="text-[var(--textFaint)]">—</span> },
            { key:"ts",      label:"Time",    render:v=><span className="text-[12px] text-[var(--textMuted)] whitespace-nowrap">{v}</span> },
            { key:"id",      label:"",
              render:(_,m)=>(<Button size="xs" variant="danger" icon={Trash2} onClick={()=>{ onDelete(m.groupId,m.id); showToast("Message deleted."); }}>Del</Button>)
            },
          ]}
          rows={pagedFeed}
          empty="No messages."
        />
        <div className="px-4"><Pager page={feedPage} total={feedMsgs.length} perPage={PER} onChange={setFeedPage}/></div>
      </Card>
    </div>
  );
};

export const ACommunityMod = ({ showToast }) => {
  const groupsApi = useApi(api.community.list, { initial: [] });
  const groups = (groupsApi.data || []).map(g => ({
    id: g._id || g.id,
    slug: g.slug || "",
    name: g.name || "",
    type: g.type || "public",
    description: g.description || "",
    members: g.members || [],
    active: g.active !== false,
    reportCount: g.reportCount || 0,
    pinned: g.pinned || false,
  }));
  const setGroups = (next) => groupsApi.setData(typeof next === "function" ? next(groups) : next);

  const allMsgsApi = useApi(api.community.adminAll, { initial: [] });
  const messagesByGroup = (allMsgsApi.data || []).reduce((acc, m) => {
    const gid = m.group || m.groupId || (m.group && m.group._id) || "_none";
    const ui = {
      id: m._id || m.id,
      gid,
      authorId: m.author?._id || m.author?.id || m.author || 0,
      author: m.author?.name || "Member",
      content: m.content || "",
      reports: m.reports?.length || m.reportCount || 0,
      pinned: m.pinned || false,
      createdAt: m.createdAt,
    };
    (acc[gid] = acc[gid] || []).push(ui);
    return acc;
  }, {});
  const messages = messagesByGroup;
  const setMessages = (next) => {
    // Local-only convenience updates (the underlying live data refreshes via reload())
    if (typeof next === "function") {
      const newMap = next(messages);
      const flat = Object.values(newMap).flat().map(m => ({ ...m, group: m.gid }));
      allMsgsApi.setData(flat);
    }
  };
  const [tab, setTab]             = useState("overview");
  const [search, setSearch]       = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [chatGroup, setChatGroup] = useState(null);
  const [settingsGroup, setSettingsGroup] = useState(null);
  const [deleteId, setDeleteId]   = useState(null);
  const [page, setPage]           = useState(1);

  // ── derived stats ──────────────────────────────────────────────
  const allMsgs  = Object.values(messages).flat();
  const reported = allMsgs.filter(m => (m.reports||0) > 0);
  const totalMembers = groups.reduce((s,g) => s + g.members.length, 0);
  const activeGroups = groups.filter(g => g.active !== false);

  // ── filtered groups for table ──────────────────────────────────
  const filteredGroups = useMemo(() => {
    let list = groups;
    if (typeFilter !== "all") list = list.filter(g => g.type === typeFilter || (typeFilter==="inactive" && g.active===false) || (typeFilter==="active" && g.active!==false));
    if (search) list = list.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [groups, typeFilter, search]);

  const pagedGroups = filteredGroups.slice((page-1)*PER, page*PER);

  // ── reported messages across all groups ───────────────────────
  const reportedWithGroup = allMsgs
    .filter(m => (m.reports||0) > 0)
    .map(m => ({
      ...m,
      groupId: Object.entries(messages).find(([,msgs]) => msgs.some(x=>x.id===m.id))?.[0],
      groupName: groups.find(g => Object.keys(messages).find(k=>k===g.id && messages[k].some(x=>x.id===m.id)))?.name || "Unknown",
      user: getUserById(m.userId),
    }))
    .sort((a,b) => (b.reports||0) - (a.reports||0));

  // ── actions ───────────────────────────────────────────────────
  const deleteMessage = (groupId, msgId) => {
    setMessages(m => ({...m, [groupId]: (m[groupId]||[]).filter(msg => msg.id !== msgId)}));
  };
  const pinMessage = (groupId, msgId) => {
    setMessages(m => ({...m, [groupId]: (m[groupId]||[]).map(msg => msg.id===msgId ? {...msg, pinned:!msg.pinned} : msg)}));
  };
  const dismissReport = (msgId) => {
    setMessages(m => {
      const next = {};
      Object.entries(m).forEach(([k,msgs]) => { next[k] = msgs.map(msg => msg.id===msgId ? {...msg, reports:0} : msg); });
      return next;
    });
    showToast("Report dismissed.");
  };
  const deleteGroup = (id) => {
    setGroups(gs => gs.filter(g => g.id !== id));
    setMessages(m => { const n={...m}; delete n[id]; return n; });
    showToast("Group deleted.");
  };
  const updateGroup = (id, patch) => setGroups(gs => gs.map(g => g.id===id ? {...g,...patch} : g));

  // ── tabs ──────────────────────────────────────────────────────
  const TABS = [
    { id:"overview",  label:"Overview"                                 },
    { id:"groups",    label:`All Groups (${groups.length})`            },
    { id:"reported",  label:`Reported${reported.length>0?` (${reported.length})`:""}`},
    { id:"messages",  label:"Live Feed"                                },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Community Management</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Monitor groups, review reports, manage members and messages.</p>
        </div>
        {reported.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold animate-pulse"
            style={{ background:"var(--coralBg)", color:"var(--coral)", border:"1px solid rgba(192,57,43,0.2)" }}>
            ⚠ {reported.length} reported message{reported.length>1?"s":""} need review
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex bg-[var(--bgCard)] rounded-xl border border-[var(--border)] mb-5 overflow-hidden">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 text-[13px] font-semibold border-none cursor-pointer font-sans transition-all"
            style={{ background:"transparent", color:tab===t.id?"var(--teal)":"var(--textMuted)", borderBottom:tab===t.id?"2px solid var(--teal)":"2px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Overview ─────────────────────────────────────────── */}
      {tab === "overview" && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            <StatPill label="Total Groups"    value={groups.length}        color={C.teal}/>
            <StatPill label="Active Groups"   value={activeGroups.length}  color={C.green}/>
            <StatPill label="Total Members"   value={totalMembers}         color={C.navy}/>
            <StatPill label="Reported Msgs"   value={reported.length}      color={reported.length > 0 ? C.coral : C.green}/>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-5">
            <StatPill label="Total Messages"  value={allMsgs.length}       color={C.teal}/>
            <StatPill label="Total Reactions" value={totalReactions(allMsgs)} color={C.gold}/>
            <StatPill label="Pinned Messages" value={allMsgs.filter(m=>m.pinned).length} color={C.gold}/>
            <StatPill label="Admins-only Groups" value={groups.filter(g=>g.messaging==="admins_only").length} color={C.navy}/>
          </div>

          {/* Group health cards */}
          <div className="grid grid-cols-3 gap-4">
            {groups.map(g => {
              const msgs = messages[g.id] || [];
              const rpts = msgs.filter(m => (m.reports||0)>0).length;
              return (
                <div key={g.id} className="rounded-2xl p-5 border cursor-pointer hover:-translate-y-0.5 transition-all"
                  style={{ background:"var(--adminCard)", borderColor:rpts>0?"var(--coral)":"var(--border)", borderLeft:`4px solid ${g.coverColor}` }}
                  onClick={() => { setChatGroup(g); }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{g.emoji}</span>
                      <div>
                        <div className="font-display font-bold text-[14px] text-[var(--text)] leading-tight">{g.name}</div>
                        <div className="text-[11px] text-[var(--textMuted)] mt-0.5">{g.type} · {g.messaging==="admins_only"?"Admins post":"Open"}</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {g.active===false && <Badge label="Inactive" variant="coral"/>}
                      {rpts > 0 && <Badge label={`${rpts} reported`} variant="coral"/>}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      [g.members.length, "members"],
                      [msgs.length,       "messages"],
                      [totalReactions(msgs), "reactions"],
                    ].map(([v,l]) => (
                      <div key={l} className="py-2 rounded-xl" style={{ background:"var(--bgMuted)" }}>
                        <div className="font-display font-bold text-[16px] text-[var(--text)]">{v}</div>
                        <div className="text-[10px] text-[var(--textMuted)]">{l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-[11px] text-[var(--textMuted)]">Last activity: {g.lastActivity}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── All Groups table ──────────────────────────────────── */}
      {tab === "groups" && (
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1);}} placeholder="Search groups…" className="max-w-[280px] flex-1"/>
            <Select value={typeFilter} onChange={e=>{setTypeFilter(e.target.value);setPage(1);}} className="!mb-0 w-auto">
              <option value="all">All groups</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            <span className="text-[12px] text-[var(--textMuted)] ml-auto">{filteredGroups.length} groups</span>
          </div>

          <Card noPad>
            <Table
              cols={[
                { key:"name", label:"Group",
                  render:(_,g) => (
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">{g.emoji}</span>
                      <div>
                        <div className="font-semibold text-[13px] text-[var(--text)]">{g.name}</div>
                        <div className="text-[11px] text-[var(--textMuted)] truncate max-w-[200px]">{g.description}</div>
                      </div>
                    </div>
                  )
                },
                { key:"type",      label:"Type",      render:v=><Badge label={v} variant={v==="public"?"teal":"grey"}/> },
                { key:"messaging", label:"Posting",   render:v=><Badge label={v==="admins_only"?"Admins only":"Open"} variant={v==="admins_only"?"gold":"green"}/> },
                { key:"members",   label:"Members",   render:(_,g)=><span className="font-semibold text-[13px] text-[var(--text)]">{g.members.length}</span> },
                { key:"messageCount", label:"Messages", render:(_,g)=>{
                    const msgs = messages[g.id]||[];
                    const rpts = msgs.filter(m=>(m.reports||0)>0).length;
                    return (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[13px] text-[var(--text)]">{msgs.length}</span>
                        {rpts>0 && <Badge label={`${rpts} flagged`} variant="coral"/>}
                      </div>
                    );
                  }
                },
                { key:"active", label:"Status",
                  render:(v,g)=><Toggle checked={g.active!==false} onChange={act=>updateGroup(g.id,{active:act})}/>
                },
                { key:"lastActivity", label:"Last Active", render:v=><span className="text-[12px] text-[var(--textMuted)] whitespace-nowrap">{v}</span> },
                { key:"id", label:"",
                  render:(_,g) => (
                    <div className="flex gap-1">
                      <Button size="xs" variant="ghost" icon={Eye}      onClick={()=>setChatGroup(g)}>View</Button>
                      <Button size="xs" variant="ghost" icon={Settings} onClick={()=>setSettingsGroup(g)}>Edit</Button>
                      <Button size="xs" variant="danger" icon={Trash2}  onClick={()=>setDeleteId(g.id)}>Del</Button>
                    </div>
                  )
                },
              ]}
              rows={pagedGroups}
              empty="No groups found."
            />
            <div className="px-4"><Pager page={page} total={filteredGroups.length} perPage={PER} onChange={setPage}/></div>
          </Card>
        </div>
      )}

      {/* ── Reported Messages ─────────────────────────────────── */}
      {tab === "reported" && (
        <div>
          {reportedWithGroup.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">✅</div>
              <div className="font-display font-bold text-lg text-[var(--text)] mb-2">No reported messages</div>
              <p className="text-[14px] text-[var(--textMuted)]">All messages are within community guidelines.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reportedWithGroup.map(m => (
                <div key={m.id} className="rounded-2xl p-5 border-l-4"
                  style={{ background:"var(--adminCard)", border:"1px solid var(--border)", borderLeftColor:"var(--coral)" }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      {/* Meta */}
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                          style={{ background:[C.teal,C.navy,C.green,C.gold,C.coral][m.userId%5||0] }}>
                          {m.user.name.slice(0,2)}
                        </div>
                        <span className="font-bold text-[13px] text-[var(--text)]">{m.user.name}</span>
                        <Badge label={`${m.reports} reports`} variant="coral"/>
                        <span className="text-[11px] px-2 py-0.5 rounded-lg" style={{ background:"var(--bgMuted)", color:"var(--textMuted)" }}>
                          in {m.groupName}
                        </span>
                        <span className="text-[11px] text-[var(--textMuted)]">{m.ts}</span>
                      </div>
                      {/* Content */}
                      <div className="p-3 rounded-xl text-[13px] text-[var(--text)] leading-relaxed mb-2"
                        style={{ background:"var(--bgMuted)" }}>
                        {m.text || <em className="text-[var(--textFaint)]">[Media message]</em>}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0 flex-wrap">
                      <Button size="sm" variant="ghost" onClick={()=>dismissReport(m.id)}>Dismiss</Button>
                      <Button size="sm" variant="ghost" icon={ShieldCheck}
                        onClick={()=>showToast(`Warning sent to ${m.user.name}.`)}>Warn</Button>
                      <Button size="sm" variant="danger" icon={Trash2}
                        onClick={()=>{ deleteMessage(m.groupId, m.id); showToast("Message deleted."); }}>
                        Delete
                      </Button>
                      <Button size="sm" variant="secondary" icon={UserX}
                        onClick={()=>showToast(`${m.user.name} removed from group.`)}>
                        Remove User
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Live Feed ─────────────────────────────────────────── */}
      {tab === "messages" && (
        <LiveFeed groups={groups} messages={messages} onDelete={deleteMessage} showToast={showToast}/>
      )}

      {/* ── Modals ──────────────────────────────────────────────── */}
      <ChatModal
        open={!!chatGroup}
        onClose={()=>setChatGroup(null)}
        group={chatGroup}
        messages={messages}
        onDeleteMsg={deleteMessage}
        onPinMsg={pinMessage}
        onWarnUser={u=>showToast(`Warning sent to ${u.name}.`)}
        showToast={showToast}
      />
      <GroupSettingsModal
        open={!!settingsGroup}
        onClose={()=>setSettingsGroup(null)}
        group={settingsGroup}
        onSave={updateGroup}
        showToast={showToast}
      />
      <Confirm
        open={!!deleteId}
        onClose={()=>setDeleteId(null)}
        title="Delete Group?"
        message="This permanently deletes the group and all its messages. This cannot be undone."
        danger
        confirmLabel="Delete Group"
        onConfirm={()=>deleteGroup(deleteId)}
      />
    </div>
  );
};
