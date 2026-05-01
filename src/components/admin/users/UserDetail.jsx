import { useState } from "react";
import { ArrowLeft, Trash2, UserX } from "../../../lib/icons";
import { C } from "../../../tokens";
import { profileLabel, profileColor, profileVariant, planLabel, planVariant, STATUS_VARIANT } from "../../../lib/constants";
import { Button, Badge, Card, Input, PwStrength, Confirm, Modal, Pager } from "../../ui/index";
import { Table } from "../../ui/Table";

const TABS = ["Overview","Missions","Payments","Journal","Activity"];

const ChangePwModal = ({ open, onClose, userName, onSave }) => {
  const [pw, setPw] = useState({ n:"", c:"" });
  return (
    <Modal open={open} onClose={onClose} title={`Change Password — ${userName}`} width={440}>
      <div className="p-3 rounded-xl mb-4 text-[13px] font-medium text-[var(--teal)]"
        style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
        Setting a new password for <strong>{userName}</strong>.
      </div>
      <Input label="New Password *" type="password" value={pw.n} onChange={e=>setPw(p=>({...p,n:e.target.value}))} placeholder="Min. 8 characters"/>
      <PwStrength password={pw.n}/>
      <Input label="Confirm Password *" type="password" value={pw.c} onChange={e=>setPw(p=>({...p,c:e.target.value}))} placeholder="Re-enter"/>
      {pw.c && pw.c !== pw.n && <p className="text-[12px] -mt-2 mb-3" style={{color:"var(--coral)"}}>⚠ Passwords do not match.</p>}
      <div className="flex gap-2.5 mt-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button className="flex-1"
          disabled={pw.n.length<8||pw.n!==pw.c}
          onClick={()=>{ onSave(); onClose(); setPw({n:"",c:""}); }}>
          Update Password
        </Button>
      </div>
    </Modal>
  );
};

const PER = 8;

export const UserDetail = ({ user, users, setUsers, onBack, showToast }) => {
  const [tab, setTab]       = useState("Overview");
  const [msnPage, setMsnPage] = useState(1);
  const [payPage, setPayPage] = useState(1);
  const [pwOpen, setPwOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const isInactive = user.status === "inactive";
  const pct = user.totalMissions ? Math.round((user.missionsComplete/user.totalMissions)*100) : 0;

  const mutate = patch => setUsers(us => us.map(u => u.id===user.id ? {...u,...patch} : u));

  return (
    <div>
      {/* Back */}
      <button onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--textMuted)] hover:text-[var(--text)] transition-colors mb-5 bg-transparent border-none cursor-pointer font-sans">
        <ArrowLeft size={15}/> Back to Users
      </button>

      {/* Hero card */}
      <div className="rounded-2xl p-6 mb-4" style={{ background:"var(--adminCard)", border:"1px solid var(--border)" }}>
        <div className="flex items-start gap-5 flex-wrap mb-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white flex-shrink-0"
            style={{ background:`linear-gradient(135deg,${profileColor(user.profile)},${profileColor(user.profile)}99)` }}>
            {user.name[0]}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <h2 className="font-display font-bold text-xl text-[var(--text)]">{user.name}</h2>
              <Badge label={profileLabel(user.profile)} variant={profileVariant(user.profile)}/>
              <Badge label={planLabel(user.plan)}        variant={planVariant(user.plan)}/>
              <Badge label={user.status} variant={STATUS_VARIANT[user.status]||"grey"}/>
            </div>
            <div className="text-sm text-[var(--textMuted)]">
              {user.email} · {user.country} · {user.device} · Joined {user.joined}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="ghost" onClick={()=>setPwOpen(true)}>Change Password</Button>
            <Button size="sm" variant={isInactive?"outline":"secondary"} icon={UserX}
              onClick={()=>{ mutate({status:isInactive?"active":"inactive"}); showToast(`${user.name} ${isInactive?"reactivated":"deactivated"}.`); }}>
              {isInactive?"Reactivate":"Deactivate"}
            </Button>
            <Button size="sm" variant="danger" icon={Trash2} onClick={()=>setDelOpen(true)}>Delete</Button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-6 gap-0 pt-5 border-t border-[var(--border)]">
          {[
            ["Relief Score", `${user.reliefScore}/100`, "var(--teal)"],
            ["Streak",       `${user.streak} days`,     "var(--green)"],
            ["Day",          `Day ${user.day}`,          "var(--text)"],
            ["Missions",     `${user.missionsComplete}/${user.totalMissions}`, "var(--text)"],
            ["Last Active",  user.lastActive,            "var(--textMuted)"],
            ["Revenue",      `$${user.payments?.reduce((a,p)=>a+(parseFloat(p.amount?.replace("$",""))||0),0)||0}`, "var(--gold)"],
          ].map(([l,v,c],i) => (
            <div key={l} className="text-center px-2 py-1" style={{ borderRight:i<5?"1px solid var(--border)":"none" }}>
              <div className="font-display font-bold text-base leading-none" style={{color:c}}>{v}</div>
              <div className="text-[11px] text-[var(--textMuted)] mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-[12px] mb-1.5">
            <span className="text-[var(--textMuted)]">Program progress</span>
            <span className="font-bold" style={{color:"var(--teal)"}}>{pct}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--bgMuted)]">
              <div className="h-full rounded-full transition-all duration-700" style={{ width:`${pct}%`, background:`linear-gradient(90deg,${C.teal},${C.green})` }}/>
            </div>
            <span className="text-[11px] font-bold w-8 text-right" style={{color:"var(--teal)"}}>{pct}%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[var(--bgCard)] rounded-xl border border-[var(--border)] mb-4 overflow-hidden">
        {TABS.map(t => (
          <button key={t} onClick={()=>setTab(t)}
            className="flex-1 py-2.5 text-[13px] font-semibold border-none cursor-pointer transition-all font-sans"
            style={{ background:tab===t?"var(--teal)":"transparent", color:tab===t?"#fff":"var(--textMuted)", borderBottom:tab===t?"2px solid var(--teal)":"none" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <Card>
        {tab === "Overview" && (
          <div className="grid grid-cols-2 gap-4">
            {[["Email",user.email],["Country",user.country],["Device",user.device],["Profile",profileLabel(user.profile)],["Plan",user.plan==="premium"?"Premium":"Free"],["Joined",user.joined],["Last Active",user.lastActive],["Streak",`${user.streak} days`],["Relief Score",`${user.reliefScore}/100`],["Day",`Day ${user.day}`]].map(([l,v])=>(
              <div key={l} className="flex justify-between py-2.5 border-b border-[var(--border)]">
                <span className="text-[13px] text-[var(--textMuted)]">{l}</span>
                <span className="text-[13px] font-medium text-[var(--text)]">{v}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "Missions" && (
          <Table
            cols={[
              {key:"day",label:"Day",width:50,render:(_,r)=><div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] text-white" style={{background:"var(--teal)"}}>D{r.day}</div>},
              {key:"title",label:"Mission"},
              {key:"sent",label:"Sent"},
              {key:"opened",label:"Opened",render:v=><Badge label={v?"Yes":"No"} variant={v?"green":"grey"}/>},
              {key:"completed",label:"Done",render:v=><Badge label={v?"Yes":"No"} variant={v?"green":"coral"}/>},
            ]}
            rows={(user.history||[]).slice((msnPage-1)*PER,msnPage*PER)}
            empty="No mission history yet."
          />
        )}
        {tab === "Missions" && (user.history||[]).length > PER && (
          <div className="px-4 pb-2"><Pager page={msnPage} total={(user.history||[]).length} perPage={PER} onChange={setMsnPage}/></div>
        )}

        {tab === "Payments" && (
          <Table
            cols={[
              {key:"id",label:"ID",render:v=><span className="text-[12px] font-mono text-[var(--textMuted)]">{v}</span>},
              {key:"date",label:"Date"},
              {key:"amount",label:"Amount",render:v=><span className="font-semibold" style={{color:"var(--green)"}}>{v}</span>},
              {key:"method",label:"Method"},
              {key:"status",label:"Status",render:v=><Badge label={v} variant={STATUS_VARIANT[v]||"grey"}/>},
            ]}
            rows={(user.payments||[]).slice((payPage-1)*PER,payPage*PER)}
            empty="No payment records."
          />
        )}
        {tab === "Payments" && (user.payments||[]).length > PER && (
          <div className="px-4 pb-2"><Pager page={payPage} total={(user.payments||[]).length} perPage={PER} onChange={setPayPage}/></div>
        )}

        {tab === "Journal" && (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{background:"var(--bgMuted)"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--textMuted)" strokeWidth={1.5} width={24} height={24}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div className="font-semibold text-[14px] text-[var(--text)] mb-2">No journal entries yet</div>
            <p className="text-[13px] text-[var(--textMuted)]">Journal entries appear here after the user completes Day 4.</p>
          </div>
        )}

        {tab === "Activity" && (
          <div className="py-12 text-center text-[13px] text-[var(--textMuted)]">
            Activity log coming soon.
          </div>
        )}
      </Card>

      <ChangePwModal open={pwOpen} onClose={()=>setPwOpen(false)} userName={user.name}
        onSave={()=>showToast(`Password updated for ${user.name}.`)}/>

      <Confirm open={delOpen} onClose={()=>setDelOpen(false)}
        title="Delete User?"
        message={`This permanently deletes ${user.name}'s account and all their data. This cannot be undone.`}
        danger confirmLabel="Delete Permanently"
        onConfirm={()=>{ setUsers(us=>us.filter(u=>u.id!==user.id)); onBack(); showToast("User deleted."); }}/>
    </div>
  );
};
