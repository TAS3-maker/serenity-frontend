import { useState } from "react";
import { Plus, Pencil, Key, Shield, UserX, Trash2, Check } from "../../lib/icons";
import { C } from "../../tokens";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { ALL_PERMISSIONS, ROLE_PRESETS_IDS, STATUS_VARIANT } from "../../lib/constants";
import { Button, Badge, Toggle, Modal, Confirm, Card, Input, Select, Row, AvatarUpload, PwStrength, Pager } from "../ui/index";
import { Table } from "../ui/Table";

// API admin doc → existing UI shape
const apiAdminToUi = (a) => ({
  id:      a._id || a.id,
  name:    a.name || "",
  email:   a.email || "",
  role:    a.role === "superadmin" ? "Super Admin" : (a.role === "admin" ? "Content Editor" : (a.role || "Read Only")),
  status:  a.isActive === false ? "inactive" : "active",
  twoFA:   !!a.twoFA,
  lastLogin: a.lastActiveDate ? new Date(a.lastActiveDate).toLocaleString() : "—",
  joined:  a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "",
  avatar:  (a.name || "").split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase() || "AD",
  permissions: a.permissions || [],
  phone:   a.phone || "",
  timezone: a.timezone || "UTC",
});

const ROLES = ["Super Admin","Content Editor","Support","Read Only"];
const ROLE_COLOR = { "Super Admin":"navy","Content Editor":"teal","Support":"gold","Read Only":"grey" };
const BLANK = { name:"",email:"",role:"Content Editor",phone:"",timezone:"UTC" };
const BLANK_PW = { newPw:"",confirm:"" };

// ─── Permissions popup ──────────────────────────────────────────
const PermModal = ({ open, onClose, admin, onSave }) => {
  const [perms, setPerms] = useState(admin?.permissions ?? []);
  // sync when popup opens
  if (open && perms !== (admin?.permissions ?? []) && perms.length === 0 && admin?.permissions?.length > 0) {
    setPerms(admin.permissions);
  }
  const toggle = id => setPerms(ps => ps.includes(id) ? ps.filter(p=>p!==id) : [...ps,id]);

  return (
    <Modal open={open} onClose={onClose} title={`Permissions — ${admin?.name}`} width={580}>
      {/* Role presets */}
      <div className="mb-5">
        <div className="text-[13px] font-semibold text-[var(--text)] mb-2.5">Apply role preset</div>
        <div className="flex gap-2 flex-wrap">
          {ROLES.map(role => (
            <Button key={role} size="sm" variant="ghost" onClick={()=>setPerms([...(ROLE_PRESETS_IDS[role]||[])])}>
              {role}
            </Button>
          ))}
        </div>
      </div>

      {ALL_PERMISSIONS.map(g => (
        <div key={g.group} className="mb-5">
          <div className="text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-[1px] mb-2.5 pb-2 border-b border-[var(--border)]">
            {g.group}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {g.perms.map(p => {
              const on = perms.includes(p.id);
              return (
                <div key={p.id} onClick={()=>toggle(p.id)}
                  className="flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all"
                  style={{ border:`1.5px solid ${on?"var(--teal)":"var(--border)"}`, background:on?"var(--tealBg)":"var(--bgCard)" }}>
                  <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ background:on?"var(--teal)":"var(--bgMuted)", border:`1.5px solid ${on?"var(--teal)":"var(--border)"}` }}>
                    {on && <Check size={10} color="#fff"/>}
                  </div>
                  <span className="text-[13px]" style={{ color:on?"var(--teal)":"var(--text)" }}>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <span className="text-[13px] text-[var(--textMuted)]">
          {perms.length} of {ALL_PERMISSIONS.flatMap(g=>g.perms).length} enabled
        </span>
        <div className="flex gap-2.5">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={()=>{ onSave(perms); onClose(); }}>Save Permissions</Button>
        </div>
      </div>
    </Modal>
  );
};

// ─── Admin Manage ───────────────────────────────────────────────
const PER = 10;

export const AAdminManage = ({ showToast, currentAdminId }) => {
  const adminsApi = useApi(api.admin.list, { initial: [] });
  const admins    = (adminsApi.data || []).map(apiAdminToUi);
  const setAdmins = (next) => adminsApi.setData(typeof next === "function" ? next(admins) : next);
  const [page, setPage]       = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const [pwOpen, setPwOpen]   = useState(false);
  const [permOpen, setPermOpen] = useState(false);
  const [delId, setDelId]     = useState(null);
  const [target, setTarget]   = useState(null);
  const [form, setForm]       = useState(BLANK);
  const [pw, setPw]           = useState(BLANK_PW);
  const sf = (k,v) => setForm(f=>({...f,[k]:v}));

  // The currently logged-in admin (so we can hide destructive actions on self)
  const currentId = currentAdminId ?? admins[0]?.id;

  const mutate = (id, patch) => setAdmins(as => as.map(a => a.id===id ? {...a,...patch} : a));

  const openEdit = (a) => {
    setTarget(a);
    setForm(a ? {name:a.name,email:a.email,role:a.role,phone:a.phone||"",timezone:a.timezone||"UTC"} : BLANK);
    setEditOpen(true);
  };

  const saveEdit = async () => {
    if (!form.name||!form.email) { showToast("Name and email required.","error"); return; }
    try {
      if (target) {
        const patch = { name: form.name, email: form.email, phone: form.phone, timezone: form.timezone, role: form.role === "Super Admin" ? "superadmin" : "admin" };
        await api.admin.update(target.id, patch);
        showToast("Admin updated.");
      } else {
        const password = form.email.split('@')[0] + 'Temp1!'; // temporary password — admin should reset
        await api.admin.create({
          name: form.name, email: form.email, password,
          role: form.role === "Super Admin" ? "superadmin" : "admin",
          permissions: ROLE_PRESETS_IDS[form.role] || [],
        });
        showToast(`Admin added. Temporary password: ${password}`);
      }
      adminsApi.reload();
    } catch (e) {
      showToast(e?.data?.message || "Save failed.", "error");
    }
    setEditOpen(false); setTarget(null);
  };

  const COLS = [
    {
      key:"name", label:"Admin",
      render:(_,a) => (
        <div className="flex items-center gap-3">
          <AvatarUpload initials={a.avatar} size={36} gradient={`linear-gradient(135deg,${C.teal},#1E7145)`}/>
          <div>
            <div className="font-semibold text-[13px] text-[var(--text)] flex items-center gap-1.5">
              {a.name}
              {a.id===currentId && <Badge label="You" variant="green"/>}
            </div>
            <div className="text-[11px] text-[var(--textMuted)]">{a.email}</div>
          </div>
        </div>
      )
    },
    { key:"role",      label:"Role",       render:v=><Badge label={v} variant={ROLE_COLOR[v]||"grey"}/> },
    { key:"status",    label:"Status",     render:v=><Badge label={v} variant={STATUS_VARIANT[v]||"grey"}/> },
    { key:"twoFA",     label:"2FA",        render:v=><Badge label={v?"Enabled":"Off"} variant={v?"green":"grey"}/> },
    { key:"lastLogin", label:"Last Login", render:v=><span className="text-[12px] text-[var(--textMuted)]">{v}</span> },
    {
      key:"id", label:"",
      render:(_,a) => (
        <div className="flex gap-1">
          <Button size="xs" variant="ghost" icon={Pencil} onClick={()=>openEdit(a)}>Edit</Button>
          <Button size="xs" variant="ghost" icon={Key}    onClick={()=>{ setTarget(a); setPw(BLANK_PW); setPwOpen(true); }}>Pwd</Button>
          <Button size="xs" variant="ghost" icon={Shield} onClick={()=>{ setTarget(a); setPermOpen(true); }}>Perms</Button>
          {a.id!==currentId && <>
            <Button size="xs" variant="ghost" icon={UserX}
              onClick={async ()=>{
                const newStatus = a.status==="active" ? false : true;
                try { await api.admin.update(a.id, { isActive: newStatus }); mutate(a.id,{status: newStatus ? "active" : "inactive"}); showToast(newStatus?"Reactivated.":"Deactivated."); }
                catch (e) { showToast(e?.data?.message || "Failed.", "error"); }
              }}>
              {a.status==="active"?"Disable":"Enable"}
            </Button>
            <Button size="xs" variant="danger" icon={Trash2} onClick={()=>setDelId(a.id)}>Del</Button>
          </>}
        </div>
      )
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Admin Accounts</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Manage admin users, roles, and permissions.</p>
        </div>
        <Button icon={Plus} onClick={()=>openEdit(null)}>Add Admin</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          ["Total",        admins.length,                                  C.teal  ],
          ["Active",       admins.filter(a=>a.status==="active").length,   C.green ],
          ["Inactive",     admins.filter(a=>a.status!=="active").length,   "var(--textMuted)"],
          ["Super Admins", admins.filter(a=>a.role==="Super Admin").length, C.navy  ],
        ].map(([l,v,c])=>(
          <div key={l} className="rounded-2xl p-4 border" style={{ background:"var(--adminCard)", borderColor:"var(--border)", borderTop:`3px solid ${c}` }}>
            <div className="font-display font-bold text-2xl leading-none mb-1" style={{color:c}}>{v}</div>
            <div className="text-[12px] text-[var(--textMuted)]">{l}</div>
          </div>
        ))}
      </div>

      <Card noPad>
        <Table cols={COLS} rows={admins.slice((page-1)*PER, page*PER)} />
        <div className="px-4"><Pager page={page} total={admins.length} perPage={PER} onChange={setPage}/></div>
      </Card>

      {/* Edit / Add */}
      <Modal open={editOpen} onClose={()=>{ setEditOpen(false); setTarget(null); }} title={target?"Edit Admin":"Add Admin"}>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Full Name *"    value={form.name}     onChange={e=>sf("name",e.target.value)}/>
          <Input label="Email *"        type="email" value={form.email} onChange={e=>sf("email",e.target.value)}/>
          <Select label="Role" value={form.role} onChange={e=>sf("role",e.target.value)}>
            {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
          </Select>
          <Select label="Timezone" value={form.timezone} onChange={e=>sf("timezone",e.target.value)}>
            {["UTC","America/New_York","America/Los_Angeles","Asia/Kolkata","Europe/London"].map(tz=>(
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </Select>
        </div>
        <Input label="Phone" value={form.phone} onChange={e=>sf("phone",e.target.value)} placeholder="+1 555 000 0000"/>
        {!target && (
          <div className="p-3 rounded-xl text-[12px] font-medium text-[var(--teal)]"
            style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
            Permissions will be set to the <strong>{form.role}</strong> preset. Edit later via Perms.
          </div>
        )}
        <div className="flex gap-2.5 mt-4">
          <Button variant="ghost" onClick={()=>{ setEditOpen(false); setTarget(null); }}>Cancel</Button>
          <Button className="flex-1" onClick={saveEdit}>{target?"Update Admin":"Add Admin"}</Button>
        </div>
      </Modal>

      {/* Change password */}
      <Modal open={pwOpen} onClose={()=>setPwOpen(false)} title={`Change Password — ${target?.name}`} width={440}>
        <div className="p-3 rounded-xl mb-4 text-[13px] font-medium text-[var(--teal)]"
          style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
          Setting a new password for <strong>{target?.name}</strong>.
        </div>
        <Input label="New Password *" type="password" value={pw.newPw} onChange={e=>setPw(p=>({...p,newPw:e.target.value}))} placeholder="Min. 8 characters"/>
        <PwStrength password={pw.newPw}/>
        <Input label="Confirm *"      type="password" value={pw.confirm} onChange={e=>setPw(p=>({...p,confirm:e.target.value}))} placeholder="Re-enter"/>
        {pw.confirm && pw.confirm!==pw.newPw && (
          <p className="text-[12px] -mt-2 mb-3" style={{color:"var(--coral)"}}>⚠ Passwords do not match.</p>
        )}
        <div className="flex gap-2.5 mt-2">
          <Button variant="ghost" onClick={()=>setPwOpen(false)}>Cancel</Button>
          <Button className="flex-1"
            disabled={pw.newPw.length<8||pw.newPw!==pw.confirm}
            onClick={async ()=>{
              try { await api.admin.resetPassword(target.id, pw.newPw); showToast(`Password updated for ${target?.name}.`); setPwOpen(false); }
              catch (e) { showToast(e?.data?.message || "Update failed.", "error"); }
            }}>
            Update Password
          </Button>
        </div>
      </Modal>

      <PermModal open={permOpen} onClose={()=>setPermOpen(false)} admin={target}
        onSave={perms=>{ mutate(target.id,{permissions:perms}); showToast("Permissions updated."); }}/>

      <Confirm open={!!delId} onClose={()=>setDelId(null)}
        title="Delete Admin?"
        message="This will permanently revoke their access to the admin panel."
        danger confirmLabel="Delete"
        onConfirm={async ()=>{
          try { await api.admin.delete(delId); setAdmins(as=>as.filter(a=>a.id!==delId)); showToast("Admin deleted."); }
          catch (e) { showToast(e?.data?.message || "Delete failed.", "error"); }
        }}/>
    </div>
  );
};
