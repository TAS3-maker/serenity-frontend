/**
 * components/ui/index.jsx
 * Global reusable primitives — all Tailwind, all lucide icons.
 * Import: import { Button, Badge, Toggle, Input, ... } from "../ui"
 */
import { useState, useRef } from "react";
import { X, Check, Eye, EyeOff, Search, ChevronLeft, ChevronRight, Sun, Moon, Upload } from "../../lib/icons";
import { C } from "../../tokens";

// ─── Theme Toggle ──────────────────────────────────────────────
export const ThemeToggle = ({ theme, onToggle, size = "md" }) => {
  const isD = theme === "dark";
  const sz = size === "sm" ? "w-8 h-8 text-sm" : "w-9 h-9";
  return (
    <button
      onClick={onToggle}
      title={isD ? "Switch to light mode" : "Switch to dark mode"}
      className={`${sz} rounded-xl flex items-center justify-center border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-sm`}
      style={{
        background: isD ? "rgba(255,255,255,0.08)" : "var(--bgMuted)",
        borderColor: isD ? "rgba(255,255,255,0.12)" : "var(--border)",
        color: "var(--textMuted)",
      }}>
      {isD ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

// ─── Popup / Modal ─────────────────────────────────────────────
export const Modal = ({ open, onClose, title, children, width = 560 }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="relative w-full rounded-2xl p-7 max-h-[92vh] overflow-y-auto"
        style={{ maxWidth: width, background: "var(--bgCard)", border: "1px solid var(--border)", boxShadow: "var(--shadowPop)" }}
        onClick={e => e.stopPropagation()}>
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-[17px] text-[var(--text)]">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--bgMuted)] text-[var(--textMuted)] border-none cursor-pointer"
              style={{ background: "transparent" }}>
              <X size={16} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

// ─── Confirm dialog ────────────────────────────────────────────
export const Confirm = ({ open, onClose, title, message, confirmLabel = "Confirm", danger = false, onConfirm }) => (
  <Modal open={open} onClose={onClose} title={title} width={420}>
    {danger && (
      <div className="flex items-start gap-3 p-3 rounded-xl mb-4 text-[13px] font-medium" style={{ background: "var(--coralBg)", color: "var(--coral)" }}>
        <span>⚠ This action cannot be undone.</span>
      </div>
    )}
    <p className="text-[14px] text-[var(--textMuted)] leading-relaxed mb-6">{message}</p>
    <div className="flex gap-2.5">
      <Button variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
      <Button variant={danger ? "danger" : "primary"} onClick={() => { onConfirm(); onClose(); }} className="flex-1">
        {confirmLabel}
      </Button>
    </div>
  </Modal>
);

// ─── Button ────────────────────────────────────────────────────
const VARIANTS = {
  primary:  "bg-[var(--teal)] text-white hover:opacity-90",
  secondary:"bg-[var(--bgMuted)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--border)]",
  ghost:    "bg-transparent text-[var(--textMuted)] hover:bg-[var(--bgMuted)] border border-[var(--border)]",
  danger:   "bg-[var(--coral)] text-white hover:opacity-90",
  gold:     "text-white hover:opacity-90",
  outline:  "bg-transparent border border-[var(--tealBorder)] text-[var(--teal)] hover:bg-[var(--tealBg)]",
};
const SIZES = {
  xs: "h-7 px-2.5 text-[11px] rounded-lg",
  sm: "h-8 px-3 text-[12px] rounded-lg",
  md: "h-10 px-4 text-[13px] rounded-xl",
  lg: "h-12 px-6 text-[15px] rounded-xl",
};

export const Button = ({
  children, onClick, variant = "primary", size = "md",
  disabled = false, loading = false, icon: Icon, className = "", style: sx = {},
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`inline-flex items-center justify-center gap-2 font-semibold font-sans border-none cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    style={{ ...(variant === "gold" ? { background: `linear-gradient(135deg, ${C.gold}, #d4a012)` } : {}), ...sx }}>
    {loading ? <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : Icon ? <Icon size={14} /> : null}
    {children}
  </button>
);

// ─── Badge ─────────────────────────────────────────────────────
const BADGE_V = {
  teal:   { bg: "var(--tealBg)",  color: "var(--teal)",   border: "var(--tealBorder)" },
  green:  { bg: "var(--greenBg)", color: "var(--green)",  border: "rgba(30,113,69,0.2)" },
  gold:   { bg: "var(--goldBg)",  color: "var(--gold)",   border: "rgba(183,134,11,0.2)" },
  coral:  { bg: "var(--coralBg)", color: "var(--coral)",  border: "rgba(192,57,43,0.2)" },
  navy:   { bg: "rgba(26,26,46,0.08)", color: C.navy,     border: "rgba(26,26,46,0.15)" },
  grey:   { bg: "var(--bgMuted)", color: "var(--textMuted)", border: "var(--border)" },
};

export const Badge = ({ label, variant = "grey", icon: Icon }) => {
  const s = BADGE_V[variant] || BADGE_V.grey;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {Icon && <Icon size={10} />}{label}
    </span>
  );
};

// ─── Toggle switch ─────────────────────────────────────────────
export const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className="relative w-11 h-6 rounded-full border-none cursor-pointer flex-shrink-0 transition-colors duration-200"
    style={{ background: checked ? "var(--teal)" : "var(--border)" }}>
    <div
      className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
      style={{ left: checked ? 22 : 2, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
  </button>
);

// ─── Input ─────────────────────────────────────────────────────
export const Input = ({ label, hint, prefix: Prefix, suffix: Suffix, className = "", ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-3.5">
      {label && <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">{label}</label>}
      <div
        className={`flex items-center h-11 rounded-xl border transition-all duration-150 ${className}`}
        style={{
          background: "var(--bgCard)",
          borderColor: focused ? "var(--teal)" : "var(--border)",
          boxShadow: focused ? "0 0 0 3px var(--tealBg)" : "none",
        }}>
        {Prefix && <span className="pl-3 text-[var(--textMuted)] flex-shrink-0"><Prefix size={14} /></span>}
        <input
          {...props}
          onFocus={e => { setFocused(true); props.onFocus?.(e); }}
          onBlur={e  => { setFocused(false); props.onBlur?.(e); }}
          className="flex-1 h-full px-3 text-[13px] font-sans bg-transparent outline-none text-[var(--text)] placeholder-[var(--textFaint)]"
        />
        {Suffix && <span className="pr-3 text-[var(--textMuted)] flex-shrink-0"><Suffix size={14} /></span>}
      </div>
      {hint && <p className="text-[11px] text-[var(--textMuted)] mt-1.5">{hint}</p>}
    </div>
  );
};

// ─── Password input ────────────────────────────────────────────
export const PasswordInput = ({ label, hint, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      label={label}
      hint={hint}
      type={show ? "text" : "password"}
      suffix={() => (
        <button onClick={() => setShow(v => !v)} className="bg-transparent border-none cursor-pointer text-[var(--textMuted)] p-0">
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      )}
    />
  );
};

// ─── Textarea ──────────────────────────────────────────────────
export const Textarea = ({ label, hint, rows = 4, className = "", ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-3.5">
      {label && <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">{label}</label>}
      <textarea
        {...props}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-xl p-3 text-[13px] font-sans bg-[var(--bgCard)] text-[var(--text)] placeholder-[var(--textFaint)] outline-none resize-y leading-relaxed transition-all duration-150 ${className}`}
        style={{
          border: `1.5px solid ${focused ? "var(--teal)" : "var(--border)"}`,
          boxShadow: focused ? "0 0 0 3px var(--tealBg)" : "none",
        }}
      />
      {hint && <p className="text-[11px] text-[var(--textMuted)] mt-1.5">{hint}</p>}
    </div>
  );
};

// ─── Select ────────────────────────────────────────────────────
export const Select = ({ label, hint, children, ...props }) => (
  <div className="mb-3.5">
    {label && <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">{label}</label>}
    <select
      {...props}
      className="w-full h-11 rounded-xl px-3 text-[13px] font-sans cursor-pointer outline-none transition-all duration-150"
      style={{ background: "var(--bgCard)", border: "1.5px solid var(--border)", color: "var(--text)" }}
      onFocus={e => (e.target.style.borderColor = "var(--teal)")}
      onBlur={e  => (e.target.style.borderColor = "var(--border)")}>
      {children}
    </select>
    {hint && <p className="text-[11px] text-[var(--textMuted)] mt-1.5">{hint}</p>}
  </div>
);

// ─── Row (label + control) ─────────────────────────────────────
export const Row = ({ label, sub, children }) => (
  <div className="flex items-center justify-between py-3 gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
    <div className="flex-1">
      <div className="text-[14px] text-[var(--text)] font-medium">{label}</div>
      {sub && <div className="text-[12px] text-[var(--textMuted)] mt-0.5">{sub}</div>}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

// ─── Card ──────────────────────────────────────────────────────
export const Card = ({ title, sub, action, accent, children, className = "", noPad = false }) => (
  <div
    className={`rounded-2xl mb-4 ${noPad ? "overflow-hidden" : "p-5"} ${className}`}
    style={{
      background: "var(--adminCard)",
      border: "1px solid var(--border)",
      ...(accent ? { borderTop: `3px solid ${accent}` } : {}),
    }}>
    {(title || action) && (
      <div
        className={`flex items-start justify-between gap-3 ${noPad ? "px-5 pt-5 pb-4" : "mb-4 pb-4"}`}
        style={{ borderBottom: (title && children) ? "1px solid var(--border)" : "none" }}>
        <div>
          <div className="font-display font-semibold text-[14px] text-[var(--text)]">{title}</div>
          {sub && <div className="text-[12px] text-[var(--textMuted)] mt-0.5">{sub}</div>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    )}
    <div className={noPad && title ? "" : ""}>{children}</div>
  </div>
);

// ─── Search bar ────────────────────────────────────────────────
export const SearchBar = ({ value, onChange, placeholder = "Search…", className = "" }) => (
  <div className={`relative ${className}`}>
    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--textMuted)]" />
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-9 pl-9 pr-4 rounded-xl text-[13px] font-sans outline-none transition-all w-full"
      style={{ background: "var(--bgCard)", border: "1px solid var(--border)", color: "var(--text)" }}
      onFocus={e => (e.target.style.borderColor = "var(--teal)")}
      onBlur={e  => (e.target.style.borderColor = "var(--border)")}
    />
  </div>
);

// ─── Pagination ────────────────────────────────────────────────
export const Pager = ({ page, total, perPage, onChange }) => {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  const from = (page - 1) * perPage + 1;
  const to   = Math.min(page * perPage, total);
  return (
    <div className="flex items-center justify-between py-3 border-t border-[var(--border)] gap-2 flex-wrap">
      <span className="text-[12px] text-[var(--textMuted)]">{from}–{to} of {total}</span>
      <div className="flex gap-1">
        <button onClick={() => onChange(page - 1)} disabled={page === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bgCard)] text-[var(--textMuted)] disabled:opacity-30 hover:bg-[var(--bgMuted)] cursor-pointer transition-colors">
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: Math.min(pages, 7) }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onChange(p)}
            className="w-8 h-8 rounded-lg text-[13px] font-sans cursor-pointer border transition-colors"
            style={{
              background: p === page ? "var(--teal)" : "var(--bgCard)",
              color:      p === page ? "#fff" : "var(--text)",
              borderColor: p === page ? "var(--teal)" : "var(--border)",
              fontWeight: p === page ? 700 : 400,
            }}>
            {p}
          </button>
        ))}
        <button onClick={() => onChange(page + 1)} disabled={page === pages}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bgCard)] text-[var(--textMuted)] disabled:opacity-30 hover:bg-[var(--bgMuted)] cursor-pointer transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

// ─── Empty state ───────────────────────────────────────────────
export const Empty = ({ icon: Icon, title, sub, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    {Icon && (
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "var(--tealBg)", border: "1px solid var(--tealBorder)" }}>
        <Icon size={24} className="text-[var(--teal)]" />
      </div>
    )}
    <div className="font-display font-bold text-[16px] text-[var(--text)] mb-2">{title}</div>
    {sub && <p className="text-[13px] text-[var(--textMuted)] mb-5 max-w-[280px]">{sub}</p>}
    {action}
  </div>
);

// ─── Image upload ──────────────────────────────────────────────
export const ImageUpload = ({ value, onChange, label = "Cover Image", aspect = "16/9" }) => {
  const [drag, setDrag] = useState(false);
  const ref = useRef(null);

  const handle = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-3.5">
      {label && <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">{label}</label>}
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
        onClick={() => ref.current?.click()}
        className="relative rounded-xl border-2 border-dashed overflow-hidden cursor-pointer transition-all"
        style={{
          aspectRatio: aspect,
          borderColor: drag ? "var(--teal)" : "var(--border)",
          background: drag ? "var(--tealBg)" : "var(--bgMuted)",
        }}>
        {value
          ? <>
              <img src={value} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Change image</span>
              </div>
            </>
          : <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--textMuted)]">
              <Upload size={24} />
              <div className="font-semibold text-sm">{drag ? "Drop it here" : "Click or drag image"}</div>
              <div className="text-[11px] text-[var(--textFaint)]">PNG, JPG, WebP · Max 5MB</div>
            </div>
        }
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => handle(e.target.files[0])} />
      {value && (
        <button onClick={() => onChange("")} className="mt-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer" style={{ color: "var(--coral)" }}>
          Remove image
        </button>
      )}
    </div>
  );
};

// ─── Password strength ─────────────────────────────────────────
export const PwStrength = ({ password }) => {
  if (!password) return null;
  const checks = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)];
  const score = checks.filter(Boolean).length;
  const [label, color] = score <= 1 ? ["Weak", "var(--coral)"] : score === 2 ? ["Fair", "var(--gold)"] : score === 3 ? ["Good", "var(--teal)"] : ["Strong", "var(--green)"];
  return (
    <div className="mb-3.5">
      <div className="flex justify-between mb-1.5">
        <span className="text-[12px] text-[var(--textMuted)]">Password strength</span>
        <span className="text-[12px] font-bold" style={{ color }}>{label}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden bg-[var(--bgMuted)]">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${score * 25}%`, background: color }} />
      </div>
      <div className="flex gap-3 mt-1.5 flex-wrap">
        {[["8+ chars", checks[0]], ["Uppercase", checks[1]], ["Number", checks[2]], ["Symbol", checks[3]]].map(([l, ok]) => (
          <span key={l} className="text-[11px] flex items-center gap-1" style={{ color: ok ? "var(--green)" : "var(--textFaint)" }}>
            {ok ? <Check size={10} /> : "○"} {l}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Avatar upload ─────────────────────────────────────────────
export const AvatarUpload = ({ initials, size = 72, gradient, onChange }) => {
  const [img, setImg] = useState(null);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  const handle = (file) => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => { setImg(e.target.result); onChange?.(e.target.result); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div
        style={{ width: size, height: size, borderRadius: Math.round(size * 0.26), background: img ? "transparent" : (gradient || `linear-gradient(135deg,${C.teal},#1E7145)`), fontSize: size * 0.32, border: `2px solid ${hover ? "var(--teal)" : "transparent"}` }}
        className="flex items-center justify-center font-black text-white overflow-hidden cursor-pointer transition-all duration-200 relative"
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={() => ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setHover(true); }}
        onDragLeave={() => setHover(false)}
        onDrop={e => { e.preventDefault(); setHover(false); handle(e.dataTransfer.files[0]); }}>
        {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span>{initials}</span>}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-opacity duration-200 bg-black/40"
          style={{ opacity: hover ? 1 : 0 }}>
          <Upload size={Math.round(size * 0.22)} color="#fff" />
          <span className="text-white font-semibold" style={{ fontSize: size * 0.13 }}>Upload</span>
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => handle(e.target.files[0])} />
    </div>
  );
};

// ─── Stat bar ──────────────────────────────────────────────────
export const StatBar = ({ label, value, max, color = "var(--teal)", suffix = "%" }) => {
  const pct = max ? Math.round((value / max) * 100) : value;
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1.5">
        <span className="text-[13px] text-[var(--text)]">{label}</span>
        <span className="text-[13px] font-bold" style={{ color }}>{pct}{suffix}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-[var(--bgMuted)]">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
};

// ─── FAQ accordion ─────────────────────────────────────────────
export const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border cursor-pointer transition-all overflow-hidden"
      style={{ borderColor: open ? "var(--tealBorder)" : "var(--border)", background: "var(--bgCard)" }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-transparent border-none cursor-pointer font-sans gap-4">
        <span className="font-semibold text-[15px] text-[var(--text)]">{q}</span>
        <div className={`flex-shrink-0 transition-transform duration-200 text-[var(--textMuted)] ${open ? "rotate-45" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-[14px] text-[var(--textMuted)] leading-[1.75]">{a}</p>
        </div>
      )}
    </div>
  );
};

// ─── Plan card ─────────────────────────────────────────────────
export const PlanCard = ({ plan, onSelect, showToast }) => {
  const isFree = plan.price === 0;
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: plan.highlighted ? C.navy : "var(--bgCard)",
        border: plan.highlighted ? "1px solid rgba(13,115,119,0.3)" : "1px solid var(--border)",
        boxShadow: plan.highlighted ? "0 24px 64px rgba(13,115,119,0.18)" : "var(--shadow)",
      }}>
      {plan.badge && (
        <div className="px-6 py-2.5 text-center text-[11px] font-bold tracking-[2px] uppercase text-white"
          style={{ background: C.teal }}>
          {plan.badge}
        </div>
      )}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-display font-bold text-[22px] leading-tight mb-2"
          style={{ color: plan.highlighted ? "#fff" : "var(--text)" }}>{plan.name}</h3>
        <p className="text-sm mb-6" style={{ color: plan.highlighted ? "rgba(255,255,255,0.5)" : "var(--textMuted)" }}>
          {plan.tagline}
        </p>
        <div className="flex items-end gap-2 mb-8">
          <span className="font-display font-black leading-none" style={{ fontSize: 52, color: plan.highlighted ? "#fff" : "var(--text)" }}>
            {isFree ? "Free" : `$${plan.price}`}
          </span>
          {!isFree && <span className="text-sm mb-2" style={{ color: plan.highlighted ? "rgba(255,255,255,0.4)" : "var(--textMuted)" }}>
            {plan.interval === "monthly" ? "/mo" : "one-time"}
          </span>}
        </div>
        <ul className="space-y-3 mb-8 flex-1">
          {(plan.features || []).map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: plan.highlighted ? "rgba(13,115,119,0.3)" : "var(--tealBg)", border: `1px solid ${plan.highlighted ? "rgba(13,115,119,0.5)" : "var(--tealBorder)"}` }}>
                <Check size={11} color={C.teal} />
              </div>
              <span className="text-sm leading-[1.7]" style={{ color: plan.highlighted ? "rgba(255,255,255,0.72)" : "var(--text)" }}>{f}</span>
            </li>
          ))}
        </ul>
        <button onClick={() => onSelect ? onSelect(plan) : showToast?.(`${plan.name} selected`)}
          className="w-full h-12 rounded-xl font-sans font-bold text-sm border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:opacity-90"
          style={{ background: plan.highlighted ? C.teal : "var(--bgMuted)", color: plan.highlighted ? "#fff" : "var(--text)", border: plan.highlighted ? "none" : "1px solid var(--border)" }}>
          {isFree ? "Start free — no card needed" : `Get ${plan.name} →`}
        </button>
      </div>
    </div>
  );
};

// ─── Blog card ─────────────────────────────────────────────────
export const BlogCard = ({ post, onClick }) => {
  const TAG_MAP = {
    "Behavioral Psychology": { bg: "var(--tealBg)", text: "var(--teal)", border: "var(--tealBorder)" },
    "Behavioral Science":    { bg: "rgba(26,26,46,0.07)", text: C.navy,   border: "rgba(26,26,46,0.15)" },
    "Stress Profiles":       { bg: "var(--greenBg)", text: C.green,       border: "rgba(30,113,69,0.2)" },
    "Research":              { bg: "var(--goldBg)",  text: "var(--gold)",  border: "rgba(183,134,11,0.2)" },
  };
  const tc = TAG_MAP[post.tag] || TAG_MAP["Behavioral Psychology"];
  return (
    <article onClick={() => onClick?.(post.id)}
      className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadowHover)]"
      style={{ background: "var(--bgCard)", border: "1px solid var(--border)" }}>
      {post.coverImage
        ? <img src={post.coverImage} alt={post.title} className="w-full h-44 object-cover" />
        : <div className="w-full h-44 flex items-center justify-center" style={{ background: `${post.coverColor || C.teal}14` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${post.coverColor || C.teal}20`, border: `1.5px solid ${post.coverColor || C.teal}30` }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={post.coverColor || C.teal} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
      }
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>{post.tag}</span>
          <span className="text-[11px] text-[var(--textMuted)]">{post.date} · {post.readTime || "5 min"}</span>
        </div>
        <h2 className="font-display font-bold text-[17px] leading-[1.3] mb-2.5 group-hover:text-[var(--teal)] transition-colors text-[var(--text)]">{post.title}</h2>
        <p className="text-sm text-[var(--textMuted)] leading-[1.65] mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg,${C.teal},#1E7145)` }}>
              {(post.author || "S")[0]}
            </div>
            <span className="text-[12px] text-[var(--textMuted)]">{post.author || "SerenityDecoded"}</span>
          </div>
          <span className="text-[12px] font-semibold text-[var(--teal)]">Read →</span>
        </div>
      </div>
    </article>
  );
};
