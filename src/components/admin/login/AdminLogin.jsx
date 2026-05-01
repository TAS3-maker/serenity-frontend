import { useState } from "react";
import { Eye, EyeOff } from "../../../lib/icons";
import { C } from "../../../tokens";
import { AInp } from "../AdminShared";
import { api } from "../../../lib/api";

// Demo credentials are read from Vite env vars so they're never hard-coded
// in the bundle. In production set VITE_DEMO_ADMIN_EMAIL / VITE_DEMO_ADMIN_PASSWORD
// to empty strings to hide the auto-fill helper entirely.
const DEMO_EMAIL    = import.meta.env.VITE_DEMO_ADMIN_EMAIL    || "";
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "";
const DEMO_CREDS_AVAILABLE = !!(DEMO_EMAIL && DEMO_PASSWORD);

export const AdminLogin = ({ onSuccess, onBack }) => {
  const [email, setEmail]   = useState("");
  const [pw, setPw]         = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr]       = useState("");
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    setErr("");
    if (!email || !pw) { setErr("Email and password required."); return; }
    setLoading(true);
    try {
      const data = await api.auth.adminLogin(email.trim(), pw);
      const token = data.token || data.accessToken;
      if (!token) throw new Error(data.message || "Login failed");
      // The backend has set an httpOnly cookie. We also keep the token
      // in-memory as a fallback for cookie-blocked environments — but never
      // persist it to sessionStorage / localStorage (XSS-safe).
      api.setToken(token);
      onSuccess();
    } catch (e) {
      setErr(e?.data?.message || e?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: `linear-gradient(160deg,${C.navy},#0a1628)` }}
      data-testid="admin-login-screen">
      <div className="w-full max-w-[400px] rounded-2xl p-9"
        style={{ background: "var(--adminCard)", boxShadow: "0 32px 72px rgba(0,0,0,0.35)" }}>

        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/assets/logo-mark.png"
            alt="SerenityDecoded"
            className="object-contain mx-auto mb-4"
            style={{ width:80, height:80, filter:"drop-shadow(0 4px 16px rgba(13,115,119,0.35))" }}
          />
          <div className="font-display font-bold text-xl text-[var(--text)] mb-1">SerenityDecoded</div>
          <div className="text-sm text-[var(--textMuted)]">Admin Portal</div>
        </div>

        <AInp
          label="Email" type="email" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && doLogin()}
          placeholder="admin@serenitydecoded.com"
          data-testid="admin-login-email"
        />

        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"} value={pw}
              onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === "Enter" && doLogin()}
              placeholder="••••••••"
              data-testid="admin-login-password"
              className="w-full h-11 rounded-xl px-4 pr-11 text-[13px] font-sans bg-[var(--bgCard)] text-[var(--text)] outline-none transition-all"
              style={{ border:"1.5px solid var(--border)" }}
              onFocus={e => (e.target.style.borderColor = "var(--teal)")}
              onBlur={e  => (e.target.style.borderColor = "var(--border)")}
            />
            <button type="button" onClick={() => setShowPw(v => !v)}
              data-testid="admin-login-toggle-password"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--textMuted)] hover:text-[var(--text)] transition-colors p-0">
              {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
        </div>

        {err && (
          <div className="rounded-xl px-4 py-3 mb-4 text-[13px] font-medium"
            data-testid="admin-login-error"
            style={{ background:"var(--coralBg)", color:"var(--coral)" }}>
            {err}
          </div>
        )}

        <button onClick={doLogin} disabled={loading}
          data-testid="admin-login-submit"
          className="w-full h-12 rounded-xl font-bold text-[15px] text-white border-none cursor-pointer font-sans transition-opacity disabled:opacity-70"
          style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>
          {loading ? "Signing in…" : "Sign in →"}
        </button>

        {onBack && (
          <button onClick={onBack}
            data-testid="admin-login-back"
            className="w-full mt-3 h-10 rounded-xl text-[13px] font-semibold text-[var(--textMuted)] bg-transparent border border-[var(--border)] cursor-pointer font-sans hover:bg-[var(--bgMuted)] transition-colors">
            ← Back to website
          </button>
        )}

        {DEMO_CREDS_AVAILABLE && (
          <div className="mt-5 p-4 rounded-xl" style={{ background:"var(--bgMuted)" }}>
            <div className="text-[11px] text-[var(--textMuted)] mb-2.5 font-medium">Demo credentials</div>
            <div className="text-[11px] font-mono text-[var(--textMuted)] mb-2.5">
              {DEMO_EMAIL} / {DEMO_PASSWORD}
            </div>
            <button
              onClick={() => { setEmail(DEMO_EMAIL); setPw(DEMO_PASSWORD); }}
              data-testid="admin-login-autofill"
              className="w-full h-8 rounded-lg text-[12px] font-bold font-sans cursor-pointer border transition-colors"
              style={{ background:"var(--tealBg)", borderColor:"var(--tealBorder)", color:"var(--teal)" }}>
              Auto-fill credentials
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
