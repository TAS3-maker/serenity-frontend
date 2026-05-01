import { useState } from "react";
import { Search, Plus, Users, Lock, ArrowLeft } from "../../lib/icons";
import { C } from "../../tokens";
import { useCommunity } from "./CommunityContext";

const EMOJIS = ["💬","🛡️","🚀","📢","💡","🌱","🔥","💪","🎯","❤️","🧠","📖"];
const COLORS  = [C.teal, C.navy, C.green, C.gold, C.coral, "#7c3aed", "#0891b2", "#db2777"];

// ─── Create Group Modal ─────────────────────────────────────────
export const CreateGroupModal = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState({ name:"", description:"", emoji:"💬", coverColor:C.teal, type:"public", messaging:"all" });
  const sf    = (k,v) => setForm(f => ({...f,[k]:v}));
  const valid = form.name.trim().length >= 3;
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-[520px] rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ background:"var(--bgCard)", border:"1px solid var(--border)", boxShadow:"0 32px 80px rgba(0,0,0,0.3)" }}
        onClick={e => e.stopPropagation()}>
        {/* Preview banner */}
        <div className="h-20 flex items-center justify-center relative flex-shrink-0"
          style={{ background:`linear-gradient(135deg,${form.coverColor}22,${form.coverColor}55)` }}>
          <span className="text-4xl">{form.emoji}</span>
          <div className="absolute bottom-2 right-3 text-sm font-bold" style={{ color:form.coverColor }}>{form.name||"Group name"}</div>
        </div>
        <div className="p-6 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
          <h2 className="font-display font-bold text-xl text-[var(--text)] mb-5">Create a group</h2>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Group name *</label>
            <input value={form.name} onChange={e=>sf("name",e.target.value)} maxLength={60} autoFocus placeholder="e.g. Avoiders Anonymous"
              className="w-full h-11 rounded-xl px-3 text-[13px] font-sans outline-none"
              style={{ background:"var(--bgMuted)", border:"1.5px solid var(--border)", color:"var(--text)" }}
              onFocus={e=>(e.target.style.borderColor="var(--teal)")} onBlur={e=>(e.target.style.borderColor="var(--border)")}/>
            <div className="text-[11px] text-[var(--textMuted)] mt-1 text-right">{form.name.length}/60</div>
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Description</label>
            <textarea value={form.description} onChange={e=>sf("description",e.target.value)} rows={2} maxLength={200} placeholder="What's this group about?"
              className="w-full rounded-xl px-3 py-2.5 text-[13px] font-sans outline-none resize-none"
              style={{ background:"var(--bgMuted)", border:"1.5px solid var(--border)", color:"var(--text)" }}
              onFocus={e=>(e.target.style.borderColor="var(--teal)")} onBlur={e=>(e.target.style.borderColor="var(--border)")}/>
          </div>
          {/* Emoji */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[var(--text)] mb-2">Icon</label>
            <div className="flex gap-2 flex-wrap">
              {EMOJIS.map(em => (
                <button key={em} onClick={()=>sf("emoji",em)}
                  className="w-9 h-9 rounded-xl text-xl cursor-pointer border-none transition-all hover:scale-110"
                  style={{ background:form.emoji===em?"var(--tealBg)":"var(--bgMuted)", border:`2px solid ${form.emoji===em?"var(--teal)":"transparent"}` }}>
                  {em}
                </button>
              ))}
            </div>
          </div>
          {/* Colour */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[var(--text)] mb-2">Cover colour</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button key={c} onClick={()=>sf("coverColor",c)}
                  className="w-8 h-8 rounded-xl cursor-pointer transition-all hover:scale-110"
                  style={{ background:c, border:`3px solid ${form.coverColor===c?"var(--text)":"transparent"}` }}/>
              ))}
            </div>
          </div>
          {/* Settings grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Visibility</label>
              {[["public","🌐 Public"],["private","🔒 Private"]].map(([v,l]) => (
                <button key={v} onClick={()=>sf("type",v)}
                  className="w-full mb-1.5 h-9 px-3 rounded-xl text-[12px] font-semibold text-left border-none cursor-pointer font-sans"
                  style={{ background:form.type===v?"var(--tealBg)":"var(--bgMuted)", color:form.type===v?"var(--teal)":"var(--textMuted)", border:`1.5px solid ${form.type===v?"var(--teal)":"transparent"}` }}>
                  {l}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Who can post</label>
              {[["all","✍️ Everyone"],["admins_only","👑 Admins only"]].map(([v,l]) => (
                <button key={v} onClick={()=>sf("messaging",v)}
                  className="w-full mb-1.5 h-9 px-3 rounded-xl text-[12px] font-semibold text-left border-none cursor-pointer font-sans"
                  style={{ background:form.messaging===v?"var(--tealBg)":"var(--bgMuted)", color:form.messaging===v?"var(--teal)":"var(--textMuted)", border:`1.5px solid ${form.messaging===v?"var(--teal)":"transparent"}` }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2.5">
            <button onClick={onClose} className="flex-1 h-11 rounded-xl text-[14px] font-semibold border-none cursor-pointer font-sans"
              style={{ background:"var(--bgMuted)", color:"var(--textMuted)" }}>Cancel</button>
            <button onClick={()=>{ if (!valid) return; onCreate(form); }} disabled={!valid}
              className="flex-1 h-11 rounded-xl text-[14px] font-bold text-white border-none cursor-pointer font-sans disabled:opacity-40"
              style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>
              Create group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Group List ─────────────────────────────────────────────────
export const GroupList = ({ onOpenGroup, onCreateGroup, onGoHome }) => {
  const { groups, currentUser, isMember, joinGroup } = useCommunity();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = groups.filter(g => {
    const q = search.toLowerCase();
    const ok = !q || g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
    if (filter==="joined") return ok && isMember(g);
    if (filter==="public") return ok && g.type==="public";
    return ok;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="px-5 pt-5 pb-4 border-b border-[var(--border)] flex-shrink-0" style={{ background:"var(--bgCard)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {onGoHome && (
              <button onClick={onGoHome}
                className="w-8 h-8 rounded-xl flex items-center justify-center border-none cursor-pointer hover:bg-[var(--bgMuted)] transition-colors"
                style={{ background:"transparent", color:"var(--textMuted)" }}>
                <ArrowLeft size={18}/>
              </button>
            )}
            <div>
              <h1 className="font-display font-bold text-xl text-[var(--text)]">Community</h1>
              <p className="text-[13px] text-[var(--textMuted)]">Connect with others on the same journey</p>
            </div>
          </div>
          <button onClick={onCreateGroup}
            className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer font-sans hover:opacity-90 transition-opacity"
            style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>
            <Plus size={14} color="#fff"/> New group
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={14} color="var(--textMuted)" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search groups…"
              className="w-full h-9 pl-9 pr-3 rounded-xl text-[13px] font-sans outline-none"
              style={{ background:"var(--bgMuted)", border:"1px solid var(--border)", color:"var(--text)" }}/>
          </div>
          {["all","joined","public"].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              className="h-9 px-3.5 rounded-xl text-[12px] font-semibold border-none cursor-pointer font-sans capitalize transition-all"
              style={{ background:filter===f?"var(--teal)":"var(--bgMuted)", color:filter===f?"#fff":"var(--textMuted)" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Groups */}
      <div className="flex-1 overflow-y-auto p-5" style={{ scrollbarWidth:"none" }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <div className="font-display font-bold text-lg text-[var(--text)] mb-2">No groups found</div>
            <p className="text-sm text-[var(--textMuted)] mb-5">Try a different search or be the first to create one.</p>
            <button onClick={onCreateGroup} className="h-10 px-6 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer font-sans"
              style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>
              Create a group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[860px] mx-auto">
            {filtered.map(g => {
              const joined  = isMember(g);
              const isAdmin = g.admins?.includes(currentUser.id);
              return (
                <div key={g.id}
                  className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                  style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                  {/* Cover bar */}
                  <div className="h-16 relative flex items-center justify-center"
                    style={{ background:`linear-gradient(135deg,${g.coverColor}18,${g.coverColor}38)` }}>
                    <span className="text-3xl">{g.emoji}</span>
                    <div className="absolute top-2 right-2 flex gap-1">
                      {g.type==="private" && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md" style={{ background:"rgba(0,0,0,0.35)" }}>
                          <Lock size={9} color="rgba(255,255,255,0.7)"/>
                          <span className="text-[9px] text-white/70 font-semibold">Private</span>
                        </div>
                      )}
                      {g.messaging==="admins_only" && (
                        <div className="px-1.5 py-0.5 rounded-md" style={{ background:"rgba(0,0,0,0.35)" }}>
                          <span className="text-[9px] text-white/70 font-semibold">👑 Admins post</span>
                        </div>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[9px] font-bold"
                        style={{ background:`${C.gold}25`, color:C.gold, border:`1px solid ${C.gold}44` }}>
                        👑 Admin
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-display font-bold text-[14px] text-[var(--text)] leading-tight">{g.name}</h3>
                      {joined && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background:"var(--tealBg)", color:"var(--teal)" }}>Joined</span>}
                    </div>
                    <p className="text-[12px] text-[var(--textMuted)] leading-relaxed mb-3 line-clamp-2">{g.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-[var(--textMuted)]">
                        <Users size={11}/>
                        <span>{g.members.length}</span>
                        <span className="mx-1">·</span>
                        <span>{g.messageCount} msgs</span>
                      </div>
                      {(() => {
                        if (joined) {
                          return (
                            <button onClick={()=>onOpenGroup(g.id)}
                              className="h-7 px-3 rounded-lg text-[12px] font-bold border-none cursor-pointer font-sans"
                              style={{ background:"var(--tealBg)", color:"var(--teal)" }}>
                              Open →
                            </button>
                          );
                        }
                        if (g.type === "public") {
                          return (
                            <button onClick={()=>{ joinGroup(g.id); onOpenGroup(g.id); }}
                              className="h-7 px-3 rounded-lg text-[12px] font-bold text-white border-none cursor-pointer font-sans"
                              style={{ background:C.teal }}>
                              Join
                            </button>
                          );
                        }
                        return <span className="text-[11px] text-[var(--textMuted)]">Invite only</span>;
                      })()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
