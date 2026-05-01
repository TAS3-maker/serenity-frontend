import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Image, Video, Users, Settings, Trash2, Pin, MoreHorizontal, ShieldCheck, UserX, Lock, X, Check } from "../../lib/icons";
import { C } from "../../tokens";
import { useCommunity } from "./CommunityContext";

const REACTIONS = ["❤️","👏","😄","🔥","💡","🙌","👍","💪"];
const AVATAR_COLORS = [C.teal, C.navy, C.green, C.gold, C.coral, "#7c3aed", "#0891b2"];

const avatar = (user) => user.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
const avatarBg = (id) => AVATAR_COLORS[Math.abs(id||0) % AVATAR_COLORS.length];

// ─── Reaction bar ───────────────────────────────────────────────
const ReactionBar = ({ onPick, onClose }) => (
  <div className="absolute bottom-full mb-2 left-0 flex gap-1 p-2 rounded-2xl shadow-2xl z-50"
    style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
    {REACTIONS.map(e => (
      <button key={e} onClick={()=>{ onPick(e); onClose(); }}
        className="w-8 h-8 text-lg rounded-xl cursor-pointer border-none transition-all hover:scale-125"
        style={{ background:"transparent" }}>
        {e}
      </button>
    ))}
  </div>
);

// ─── Single message bubble ──────────────────────────────────────
const Bubble = ({ msg, group }) => {
  const { currentUser, getUserById, isAdmin, deleteMessage, togglePin, addReaction } = useCommunity();
  const user      = getUserById(msg.userId);
  const isMe      = msg.userId === currentUser.id;
  const iAmAdmin  = isAdmin(group);
  const canDelete = isMe || iAmAdmin;
  const [menu, setMenu]   = useState(false);
  const [react, setReact] = useState(false);

  const reactions = Object.entries(msg.reactions||{}).filter(([,c])=>c>0);

  return (
    <div className={`flex gap-2.5 mb-4 group/msg ${isMe?"flex-row-reverse":""}`}>
      {/* Avatar */}
      {!isMe && (
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 mt-1"
          style={{ background:avatarBg(user.id) }}>
          {avatar(user)}
        </div>
      )}

      <div className={`flex flex-col max-w-[70%] ${isMe?"items-end":"items-start"}`}>
        {/* Sender name + admin badge */}
        {!isMe && (
          <div className="flex items-center gap-1.5 mb-1 px-1">
            <span className="text-[12px] font-semibold text-[var(--text)]">{user.name}</span>
            {group.admins?.includes(user.id) && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background:`${C.gold}18`, color:C.gold }}>👑 Admin</span>
            )}
          </div>
        )}

        {/* Pin indicator */}
        {msg.pinned && (
          <div className="flex items-center gap-1 text-[10px] mb-1 px-1" style={{ color:C.gold }}>
            📌 Pinned
          </div>
        )}

        <div className="relative">
          {/* Bubble */}
          <div className={`px-4 py-2.5 rounded-2xl ${isMe?"rounded-tr-sm":"rounded-tl-sm"}`}
            style={{
              background: isMe ? `linear-gradient(135deg,${C.teal},${C.green})` : "var(--bgCard)",
              color: isMe ? "#fff" : "var(--text)",
              border: isMe ? "none" : "1px solid var(--border)",
            }}>
            {/* Image */}
            {msg.imageUrl && (
              <img src={msg.imageUrl} alt="shared" className="max-w-full max-h-48 rounded-xl mb-2 object-cover"/>
            )}
            {/* Video */}
            {msg.videoUrl && (
              <video src={msg.videoUrl} controls className="max-w-full max-h-48 rounded-xl mb-2"/>
            )}
            {/* Text */}
            {msg.text && <p className="text-[14px] leading-relaxed break-words">{msg.text}</p>}
            {/* Time */}
            <span className={`block text-[10px] mt-1 text-right ${isMe?"text-white/50":"text-[var(--textFaint)]"}`}>
              {msg.ts}
            </span>
          </div>

          {/* Hover action buttons */}
          <div className={`absolute top-1 ${isMe?"right-full pr-2":"left-full pl-2"} opacity-0 group-hover/msg:opacity-100 transition-opacity flex items-center gap-1`}>
            {/* Reaction picker */}
            <div className="relative">
              <button onClick={()=>setReact(v=>!v)}
                className="w-7 h-7 rounded-xl flex items-center justify-center text-base cursor-pointer border-none hover:scale-110 transition-transform"
                style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                😊
              </button>
              {react && <ReactionBar onPick={e=>addReaction(group.id, msg.id, e)} onClose={()=>setReact(false)}/>}
            </div>
            {/* More menu */}
            <div className="relative">
              <button onClick={()=>setMenu(v=>!v)}
                className="w-7 h-7 rounded-xl flex items-center justify-center cursor-pointer border-none hover:scale-110 transition-transform"
                style={{ background:"var(--bgCard)", border:"1px solid var(--border)", color:"var(--textMuted)" }}>
                <MoreHorizontal size={13}/>
              </button>
              {menu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={()=>setMenu(false)}/>
                  <div className={`absolute top-full mt-1 ${isMe?"right-0":"left-0"} w-40 rounded-xl overflow-hidden z-50`}
                    style={{ background:"var(--bgCard)", border:"1px solid var(--border)", boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
                    {iAmAdmin && (
                      <button onClick={()=>{ togglePin(group.id, msg.id); setMenu(false); }}
                        className="w-full px-4 py-2.5 text-left text-[13px] flex items-center gap-2 cursor-pointer border-none hover:bg-[var(--bgMuted)] transition-colors font-sans"
                        style={{ background:"transparent", color:"var(--text)" }}>
                        📌 {msg.pinned ? "Unpin" : "Pin"}
                      </button>
                    )}
                    {canDelete && (
                      <button onClick={()=>{ deleteMessage(group.id, msg.id); setMenu(false); }}
                        className="w-full px-4 py-2.5 text-left text-[13px] flex items-center gap-2 cursor-pointer border-none hover:bg-[var(--bgMuted)] transition-colors font-sans"
                        style={{ background:"transparent", color:"var(--coral)" }}>
                        <Trash2 size={13}/> Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-1 ${isMe?"justify-end":""}`}>
            {reactions.map(([em, count]) => (
              <button key={em} onClick={()=>addReaction(group.id, msg.id, em)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] cursor-pointer border-none hover:scale-110 transition-transform"
                style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}>
                {em}<span className="text-[11px] text-[var(--textMuted)]">{count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Members panel ──────────────────────────────────────────────
const MembersPanel = ({ group, onClose }) => {
  const { getUserById, currentUser, isAdmin, toggleAdmin, removeMember } = useCommunity();
  const iAmAdmin = isAdmin(group);
  const sections = [
    { label:"Admins",  ids: group.admins },
    { label:"Members", ids: group.members.filter(id => !group.admins.includes(id)) },
  ];

  return (
    <div className="w-64 flex flex-col border-l" style={{ background:"var(--bgCard)", borderColor:"var(--border)" }}>
      <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor:"var(--border)" }}>
        <span className="font-display font-bold text-[14px] text-[var(--text)]">Members ({group.members.length})</span>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center border-none cursor-pointer text-[var(--textMuted)] hover:bg-[var(--bgMuted)] transition-colors" style={{ background:"transparent" }}>
          <X size={14}/>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3" style={{ scrollbarWidth:"none" }}>
        {sections.map(({ label, ids }) => ids.length === 0 ? null : (
          <div key={label} className="mb-4">
            <div className="text-[10px] font-bold text-[var(--textMuted)] uppercase tracking-widest mb-2 px-1">{label} ({ids.length})</div>
            {ids.map(uid => {
              const u = getUserById(uid);
              const isSelf = uid === currentUser.id;
              const isGroupAdmin = group.admins.includes(uid);
              return (
                <div key={uid} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[var(--bgMuted)] transition-colors group/member">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                    style={{ background:avatarBg(uid) }}>
                    {avatar(u)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium text-[var(--text)] truncate">{u.name}</span>
                      {isSelf && <span className="text-[10px] text-[var(--textMuted)]">(you)</span>}
                    </div>
                    {isGroupAdmin && <span className="text-[10px]" style={{ color:C.gold }}>👑 Admin</span>}
                  </div>
                  {/* Admin actions (shown on hover, only for admins, not self) */}
                  {iAmAdmin && !isSelf && (
                    <div className="opacity-0 group-hover/member:opacity-100 transition-opacity flex gap-1">
                      <button title={isGroupAdmin?"Remove admin":"Make admin"}
                        onClick={()=>toggleAdmin(group.id, uid)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all hover:scale-110"
                        style={{ background:isGroupAdmin?"var(--goldBg)":"var(--tealBg)", color:isGroupAdmin?C.gold:"var(--teal)" }}>
                        <ShieldCheck size={11}/>
                      </button>
                      <button title="Remove from group" onClick={()=>removeMember(group.id, uid)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all hover:scale-110"
                        style={{ background:"var(--coralBg)", color:"var(--coral)" }}>
                        <UserX size={11}/>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Group settings modal ───────────────────────────────────────
const GroupSettingsModal = ({ group, onClose, showToast }) => {
  const { updateGroup, deleteGroup, leaveGroup, isAdmin } = useCommunity();
  const [form, setForm] = useState({ name:group.name, description:group.description, type:group.type, messaging:group.messaging });
  const sf = (k,v) => setForm(f=>({...f,[k]:v}));
  const iAmAdmin = isAdmin(group);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-[440px] rounded-2xl p-7"
        style={{ background:"var(--bgCard)", border:"1px solid var(--border)", boxShadow:"0 24px 72px rgba(0,0,0,0.3)" }}
        onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-xl text-[var(--text)]">Group settings</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center border-none cursor-pointer text-[var(--textMuted)] hover:bg-[var(--bgMuted)]" style={{ background:"transparent" }}>
            <X size={16}/>
          </button>
        </div>

        {iAmAdmin ? (
          <>
            <div className="mb-3">
              <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Group Name</label>
              <input value={form.name} onChange={e=>sf("name",e.target.value)} className="w-full h-11 rounded-xl px-3 text-[13px] font-sans outline-none" style={{ background:"var(--bgMuted)",border:"1.5px solid var(--border)",color:"var(--text)" }}/>
            </div>
            <div className="mb-4">
              <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Description</label>
              <textarea value={form.description} onChange={e=>sf("description",e.target.value)} rows={2} className="w-full rounded-xl px-3 py-2.5 text-[13px] font-sans outline-none resize-none" style={{ background:"var(--bgMuted)",border:"1.5px solid var(--border)",color:"var(--text)" }}/>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Visibility</label>
                {[["public","🌐 Public"],["private","🔒 Private"]].map(([v,l])=>(
                  <button key={v} onClick={()=>sf("type",v)}
                    className="w-full mb-1.5 h-9 px-3 rounded-xl text-[12px] font-semibold text-left border-none cursor-pointer font-sans"
                    style={{ background:form.type===v?"var(--tealBg)":"var(--bgMuted)", color:form.type===v?"var(--teal)":"var(--textMuted)", border:`1.5px solid ${form.type===v?"var(--teal)":"transparent"}` }}>
                    {l}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Who can post</label>
                {[["all","✍️ Everyone"],["admins_only","👑 Admins only"]].map(([v,l])=>(
                  <button key={v} onClick={()=>sf("messaging",v)}
                    className="w-full mb-1.5 h-9 px-3 rounded-xl text-[12px] font-semibold text-left border-none cursor-pointer font-sans"
                    style={{ background:form.messaging===v?"var(--tealBg)":"var(--bgMuted)", color:form.messaging===v?"var(--teal)":"var(--textMuted)", border:`1.5px solid ${form.messaging===v?"var(--teal)":"transparent"}` }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2.5 mb-3">
              <button onClick={onClose} className="flex-1 h-11 rounded-xl text-[13px] font-semibold border-none cursor-pointer font-sans" style={{ background:"var(--bgMuted)",color:"var(--textMuted)" }}>Cancel</button>
              <button onClick={()=>{ updateGroup(group.id,form); showToast("Group updated."); onClose(); }} className="flex-1 h-11 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer font-sans" style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>Save</button>
            </div>
            <button onClick={()=>{ deleteGroup(group.id); onClose(); }}
              className="w-full h-9 rounded-xl text-[12px] font-semibold border-none cursor-pointer font-sans transition-colors"
              style={{ background:"var(--coralBg)", color:"var(--coral)" }}>
              Delete this group
            </button>
          </>
        ) : (
          <>
            <p className="text-[13px] text-[var(--textMuted)] mb-5">You're a member of <strong>{group.name}</strong>.</p>
            <button onClick={()=>{ leaveGroup(group.id); showToast("Left group."); onClose(); }}
              className="w-full h-11 rounded-xl text-[13px] font-semibold border-none cursor-pointer font-sans"
              style={{ background:"var(--coralBg)", color:"var(--coral)" }}>
              Leave group
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Main chat view ─────────────────────────────────────────────
export const GroupChat = ({ groupId, onBack }) => {
  const { groups, messages, currentUser, sendMessage, isAdmin, isMember, canChat, getUserById } = useCommunity();

  const group      = groups.find(g => g.id === groupId);
  const msgs       = messages[groupId] || [];
  const iAmAdmin   = isAdmin(group);
  const canWrite   = canChat(group);
  const pinnedMsgs = msgs.filter(m => m.pinned);

  const [text, setText]           = useState("");
  const [showMembers, setMembers] = useState(false);
  const [showSettings, setSettings] = useState(false);
  const [mediaPreview, setMedia]  = useState(null); // {url, type}
  const bottomRef  = useRef(null);
  const imgRef     = useRef(null);
  const vidRef     = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs.length, bottomRef]);

  if (!group) return null;

  const doSend = () => {
    const hasContent = text.trim() || mediaPreview;
    if (!hasContent || !canWrite) return;
    sendMessage(groupId, {
      text:     text.trim(),
      imageUrl: mediaPreview?.type==="image" ? mediaPreview.url : null,
      videoUrl: mediaPreview?.type==="video" ? mediaPreview.url : null,
      type:     mediaPreview ? mediaPreview.type : "text",
    });
    setText(""); setMedia(null);
  };

  const handleFile = (file, type) => {
    if (!file) return;
    setMedia({ url:URL.createObjectURL(file), type });
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Chat column */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Topbar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
          style={{ background:"var(--bgCard)", borderColor:"var(--border)" }}>
          <button onClick={onBack}
            className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer border-none hover:bg-[var(--bgMuted)] transition-colors"
            style={{ background:"transparent", color:"var(--textMuted)" }}>
            <ArrowLeft size={18}/>
          </button>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background:`${group.coverColor}22` }}>
            {group.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-[15px] text-[var(--text)] truncate">{group.name}</span>
              {group.type==="private" && <Lock size={12} color="var(--textMuted)"/>}
            </div>
            <div className="text-[11px] text-[var(--textMuted)]">
              {group.members.length} members
              {group.messaging==="admins_only" && " · admins post only"}
              {iAmAdmin && " · you're admin"}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={()=>setMembers(v=>!v)}
              className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer border-none transition-all"
              style={{ background:showMembers?"var(--tealBg)":"transparent", color:showMembers?"var(--teal)":"var(--textMuted)" }}>
              <Users size={16}/>
            </button>
            <button onClick={()=>setSettings(true)}
              className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer border-none transition-all hover:bg-[var(--bgMuted)]"
              style={{ background:"transparent", color:"var(--textMuted)" }}>
              <Settings size={16}/>
            </button>
          </div>
        </div>

        {/* Pinned message strip */}
        {pinnedMsgs.length > 0 && (
          <div className="flex items-center gap-2.5 px-4 py-2 border-b flex-shrink-0 text-[12px]"
            style={{ background:"var(--tealBg)", borderColor:"var(--tealBorder)" }}>
            <span>📌</span>
            <span className="text-[var(--teal)] font-medium flex-1 truncate">
              {pinnedMsgs[pinnedMsgs.length-1].text || "[Media]"}
            </span>
            {pinnedMsgs.length > 1 && <span className="text-[var(--textMuted)]">+{pinnedMsgs.length-1} more</span>}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5"
          style={{ scrollbarWidth:"thin", scrollbarColor:"var(--border) transparent" }}>
          {msgs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-6xl mb-4">{group.emoji}</span>
              <div className="font-display font-bold text-xl text-[var(--text)] mb-2">Welcome to {group.name}</div>
              <p className="text-[14px] text-[var(--textMuted)] max-w-[320px] mb-2">{group.description}</p>
              {canWrite && <p className="text-[13px] font-medium" style={{ color:"var(--teal)" }}>Be the first to say something ↓</p>}
            </div>
          ) : (
            msgs.map(msg => <Bubble key={msg.id} msg={msg} group={group}/>)
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Composer */}
        <div className="px-4 py-3 border-t flex-shrink-0" style={{ borderColor:"var(--border)", background:"var(--bgCard)" }}>
          {!canWrite ? (
            <div className="flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] text-[var(--textMuted)]"
              style={{ background:"var(--bgMuted)" }}>
              {!isMember(group)
                ? "🔒 Join this group to participate"
                : "👑 Only admins can post in this group"}
            </div>
          ) : (
            <>
              {/* Media preview */}
              {mediaPreview && (
                <div className="mb-3 relative inline-block">
                  {mediaPreview.type==="image"
                    ? <img src={mediaPreview.url} alt="" className="h-20 rounded-xl object-cover"/>
                    : <video src={mediaPreview.url} className="h-20 rounded-xl" controls/>
                  }
                  <button onClick={()=>setMedia(null)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center border-none cursor-pointer"
                    style={{ background:"var(--coral)" }}>✕</button>
                </div>
              )}
              <div className="flex items-end gap-2">
                {/* Media attach buttons */}
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={()=>imgRef.current?.click()}
                    className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none hover:bg-[var(--bgMuted)] transition-colors"
                    style={{ background:"transparent", color:"var(--textMuted)" }} title="Send image">
                    <Image size={17}/>
                  </button>
                  <button onClick={()=>vidRef.current?.click()}
                    className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none hover:bg-[var(--bgMuted)] transition-colors"
                    style={{ background:"transparent", color:"var(--textMuted)" }} title="Send video">
                    <Video size={17}/>
                  </button>
                </div>
                {/* Text area */}
                <div className="flex-1 flex items-end rounded-2xl px-4 py-2.5"
                  style={{ background:"var(--bgMuted)", border:"1.5px solid var(--border)" }}>
                  <textarea
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    onKeyDown={e=>{ if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); doSend(); } }}
                    placeholder="Message…"
                    rows={1}
                    className="flex-1 bg-transparent border-none outline-none text-[14px] font-sans resize-none"
                    style={{ color:"var(--text)", maxHeight:120, lineHeight:"1.6" }}
                  />
                </div>
                {/* Send button */}
                <button onClick={doSend} disabled={!text.trim() && !mediaPreview}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border-none cursor-pointer transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                  style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>
                  <Send size={16} color="#fff"/>
                </button>
              </div>
              <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={e=>handleFile(e.target.files[0],"image")}/>
              <input ref={vidRef} type="file" accept="video/*" className="hidden" onChange={e=>handleFile(e.target.files[0],"video")}/>
            </>
          )}
        </div>
      </div>

      {/* Members sidebar */}
      {showMembers && <MembersPanel group={group} onClose={()=>setMembers(false)}/>}

      {/* Settings modal */}
      {showSettings && <GroupSettingsModal group={group} onClose={()=>setSettings(false)} showToast={()=>{}}/>}
    </div>
  );
};
