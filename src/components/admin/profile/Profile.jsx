import { useEffect, useState } from "react";
import { ACard, ABtn, AInp, ASel, AvatarUpload, PwStrength } from "../AdminShared";
import { api } from "../../../lib/api";

export const AProfile = ({ showToast, onLogout }) => {
  const [form, setForm]   = useState({ name:"", email:"", role:"Super Admin", phone:"", timezone:"UTC" });
  const [pw, setPw]       = useState({ current:"", next:"", confirm:"" });
  const [busy, setBusy]   = useState(false);
  const [pwBusy, setPwBusy] = useState(false);
  const [meta, setMeta]   = useState({ lastLogin:"—", joined:"—" });
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    api.auth.adminMe().then(r => {
      const u = r?.user || r?.data || r;
      if (!u) return;
      setForm({
        name: u.name || "",
        email: u.email || "",
        role: u.role === "superadmin" ? "Super Admin" : (u.role === "admin" ? "Content Editor" : "Support"),
        phone: u.phone || "",
        timezone: u.timezone || "UTC",
      });
      setMeta({
        lastLogin: u.lastActiveDate ? new Date(u.lastActiveDate).toLocaleString() : "—",
        joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
      });
    }).catch(() => {});
  }, []);

  const saveProfile = async () => {
    setBusy(true);
    try {
      const role = form.role === "Super Admin" ? "superadmin" : (form.role === "Support" ? "support" : "admin");
      await api.admin.profileUpdate({ name: form.name, email: form.email, phone: form.phone, timezone: form.timezone, role });
      showToast("Profile saved.");
    } catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    finally { setBusy(false); }
  };

  const updatePassword = async () => {
    if (!pw.current || pw.next.length < 8 || pw.next !== pw.confirm) { showToast("Check all fields.", "error"); return; }
    setPwBusy(true);
    try {
      await api.auth.changePassword(pw.current, pw.next);
      showToast("Password updated.");
      setPw({ current:"", next:"", confirm:"" });
    } catch (e) { showToast(e?.data?.message || "Password update failed.", "error"); }
    finally { setPwBusy(false); }
  };

  return (
    <div data-testid="admin-profile">
      <h1 className="font-display font-bold text-xl text-[var(--text)] mb-5">My Profile</h1>
      <div className="grid grid-cols-2 gap-5">
        <ACard title="Account Information">
          <div className="flex items-center gap-3.5 p-4 rounded-xl mb-5" style={{ background:"var(--bgMuted)" }}>
            <AvatarUpload initials={(form.name || "AD").split(" ").map(n => n[0]).join("").slice(0,2)} size={52}/>
            <div>
              <div className="font-display font-bold text-[16px] text-[var(--text)]">{form.name || "Admin"}</div>
              <div className="text-[13px] text-[var(--textMuted)]">{form.role}</div>
            </div>
          </div>
          <AInp label="Full Name"     value={form.name}  onChange={e => sf("name",  e.target.value)}/>
          <AInp label="Email Address" type="email" value={form.email} onChange={e => sf("email", e.target.value)}/>
          <AInp label="Phone"         value={form.phone} onChange={e => sf("phone", e.target.value)}/>
          <ASel label="Role" value={form.role} onChange={e => sf("role", e.target.value)}>
            <option>Super Admin</option>
            <option>Content Editor</option>
            <option>Support</option>
          </ASel>
          <ASel label="Timezone" value={form.timezone} onChange={e => sf("timezone", e.target.value)}>
            {["UTC","America/New_York","America/Los_Angeles","Asia/Kolkata","Europe/London"].map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </ASel>
          <ABtn onClick={saveProfile} disabled={busy} className="w-full mt-2">{busy ? "Saving…" : "Save Profile"}</ABtn>
        </ACard>

        <div className="space-y-4">
          <ACard title="Change Password">
            <AInp label="Current Password" type="password" value={pw.current} onChange={e => setPw(p => ({...p,current:e.target.value}))} placeholder="••••••••"/>
            <AInp label="New Password"     type="password" value={pw.next}    onChange={e => setPw(p => ({...p,next:e.target.value}))}    placeholder="Min. 8 characters"/>
            {pw.next.length > 0 && <PwStrength password={pw.next}/>}
            <AInp label="Confirm Password" type="password" value={pw.confirm} onChange={e => setPw(p => ({...p,confirm:e.target.value}))} placeholder="Re-enter"/>
            {pw.confirm && pw.confirm !== pw.next && (
              <p className="text-[12px] text-[var(--coral)] -mt-2 mb-2">⚠ Passwords do not match.</p>
            )}
            <ABtn onClick={updatePassword} disabled={pwBusy} className="w-full mt-2">{pwBusy ? "Updating…" : "Update Password"}</ABtn>
          </ACard>

          <ACard title="Session & Security">
            {[["Last login", meta.lastLogin], ["Joined", meta.joined], ["2FA", "Not enabled"]].map(([l, v]) => (
              <div key={l} className="flex justify-between py-2.5 border-b border-[var(--border)]">
                <span className="text-[13px] text-[var(--textMuted)]">{l}</span>
                <span className="text-[13px] font-medium text-[var(--text)]">{v}</span>
              </div>
            ))}
            <button onClick={onLogout}
              data-testid="profile-logout-btn"
              className="w-full mt-4 h-9 rounded-xl text-[13px] font-semibold font-sans cursor-pointer border transition-colors"
              style={{ background:"var(--coralBg)", color:"var(--coral)", borderColor:"rgba(192,57,43,0.2)" }}>
              Sign Out of All Sessions
            </button>
          </ACard>
        </div>
      </div>
    </div>
  );
};
