// ─── Class name utility ────────────────────────────────────────
export const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Format numbers ────────────────────────────────────────────
export const fmtNum = (n) => n?.toLocaleString() ?? "0";
export const fmtPct = (n) => `${Math.round(n)}%`;
export const fmtUSD = (n) => `$${fmtNum(n)}`;

// ─── Date helpers ──────────────────────────────────────────────
export const today = () =>
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ─── Truncate ──────────────────────────────────────────────────
export const truncate = (str, n = 60) =>
  str && str.length > n ? str.slice(0, n) + "…" : str;

// ─── Color helpers ─────────────────────────────────────────────
export const withAlpha = (hex, pct) => {
  const val = Math.round(pct * 255).toString(16).padStart(2, "0");
  return hex + val;
};

// ─── CSV download ──────────────────────────────────────────────
export const downloadCSV = (content, filename) => {
  const blob = new Blob([content], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

// ─── Debounce ──────────────────────────────────────────────────
export const debounce = (fn, ms = 300) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};
