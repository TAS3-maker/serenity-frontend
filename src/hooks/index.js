import { useState } from "react";

// ─── Toast hook ─────────────────────────────────────────────────
export const useToast = () => {
  const [t, setT] = useState({ msg: "", show: false, type: "success" });
  const show = (msg, type = "success") => {
    setT({ msg, show: true, type });
    setTimeout(() => setT(x => ({ ...x, show: false })), 2800);
  };
  return [t, show];
};

// ─── Icons re-exported for convenience ─────────────────────────
export * from "../lib/icons";
