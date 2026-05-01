import { createContext, useContext, useState } from "react";
import { COMMUNITY_GROUPS, COMMUNITY_MESSAGES, USERS } from "../../data/index";

const CommunityCtx = createContext(null);

// Demo: logged-in user is Sarah M. (id=1)
const CURRENT_USER = USERS[0];

export const CommunityProvider = ({ children }) => {
  const [groups,   setGroups]   = useState(COMMUNITY_GROUPS);
  const [messages, setMessages] = useState(COMMUNITY_MESSAGES);

  const createGroup = (data) => {
    const id = "grp_" + Date.now();
    const g  = {
      id, name:data.name, description:data.description,
      emoji:data.emoji||"💬", coverColor:data.coverColor||"#0D7377",
      type:data.type||"public", messaging:data.messaging||"all",
      createdBy:CURRENT_USER.id, admins:[CURRENT_USER.id],
      members:[CURRENT_USER.id], pinned:[],
      createdAt:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),
      lastActivity:"Just now", messageCount:0,
    };
    setGroups(gs => [g, ...gs]);
    setMessages(m => ({ ...m, [id]: [] }));
    return id;
  };

  const joinGroup   = (gid) => setGroups(gs => gs.map(g =>
    g.id===gid && !g.members.includes(CURRENT_USER.id)
      ? {...g, members:[...g.members, CURRENT_USER.id]} : g));

  const leaveGroup  = (gid) => setGroups(gs => gs.map(g =>
    g.id===gid ? {...g,
      members: g.members.filter(id=>id!==CURRENT_USER.id),
      admins:  g.admins.filter(id=>id!==CURRENT_USER.id),
    } : g));

  const sendMessage = (gid, content) => {
    const msg = {
      id:"msg_"+Date.now(), userId:CURRENT_USER.id,
      text:content.text||"", imageUrl:content.imageUrl||null,
      videoUrl:content.videoUrl||null, type:content.type||"text",
      pinned:false, reactions:{}, reports:0,
      ts:new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),
    };
    setMessages(m => ({...m, [gid]:[...(m[gid]||[]), msg]}));
    setGroups(gs => gs.map(g => g.id===gid ? {...g,lastActivity:"Just now",messageCount:g.messageCount+1} : g));
    return msg;
  };

  const deleteMessage = (gid, mid)  => setMessages(m => ({...m, [gid]:(m[gid]||[]).filter(x=>x.id!==mid)}));

  const togglePin = (gid, mid) => {
    setMessages(m => ({...m, [gid]:(m[gid]||[]).map(x=>x.id===mid?{...x,pinned:!x.pinned}:x)}));
    setGroups(gs => gs.map(g => {
      if (g.id!==gid) return g;
      const pinned = g.pinned.includes(mid) ? g.pinned.filter(id=>id!==mid) : [...g.pinned, mid];
      return {...g, pinned};
    }));
  };

  const addReaction = (gid, mid, emoji) => setMessages(m => ({
    ...m, [gid]:(m[gid]||[]).map(x => x.id===mid
      ? {...x, reactions:{...x.reactions, [emoji]:(x.reactions[emoji]||0)+1}} : x)
  }));

  const toggleAdmin  = (gid, uid) => setGroups(gs => gs.map(g => {
    if (g.id!==gid) return g;
    const admins = g.admins.includes(uid) ? g.admins.filter(id=>id!==uid) : [...g.admins, uid];
    return {...g, admins};
  }));

  const removeMember = (gid, uid) => setGroups(gs => gs.map(g =>
    g.id===gid ? {...g,
      members:g.members.filter(id=>id!==uid),
      admins:g.admins.filter(id=>id!==uid),
    } : g));

  const updateGroup  = (gid, patch) => setGroups(gs => gs.map(g => g.id===gid ? {...g,...patch} : g));

  const deleteGroup  = (gid) => {
    setGroups(gs => gs.filter(g => g.id!==gid));
    setMessages(m => { const n={...m}; delete n[gid]; return n; });
  };

  const isAdmin     = (g) => g?.admins?.includes(CURRENT_USER.id) || CURRENT_USER.id===0;
  const isMember    = (g) => g?.members?.includes(CURRENT_USER.id);
  const canChat     = (g) => isMember(g) && (g.messaging==="all" || isAdmin(g));
  const getUserById = (id) => id===0
    ? {id:0,name:"SerenityDecoded",email:"team@serenitydecoded.com"}
    : USERS.find(u=>u.id===id) || {id,name:"Unknown",email:""};

  return (
    <CommunityCtx.Provider value={{
      groups, messages, currentUser:CURRENT_USER,
      createGroup, joinGroup, leaveGroup, sendMessage, deleteMessage,
      togglePin, addReaction, toggleAdmin, removeMember, updateGroup, deleteGroup,
      isAdmin, isMember, canChat, getUserById,
    }}>
      {children}
    </CommunityCtx.Provider>
  );
};

export const useCommunity = () => useContext(CommunityCtx);
