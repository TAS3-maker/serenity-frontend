import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const THEMES = {
  light: {
    name: "light",
    bg:         "#F9F9F7",
    bgCard:     "#FFFFFF",
    bgMuted:    "#F0F0EE",
    bgNav:      "rgba(249,249,247,0.96)",
    border:     "#E8E8E6",
    text:       "#2C2C2C",
    textMuted:  "#666666",
    textFaint:  "#999999",
    teal:       "#0D7377",
    tealBg:     "rgba(13,115,119,0.08)",
    coral:      "#C0392B",
    green:      "#1E7145",
    gold:       "#B7860B",
    navy:       "#1A1A2E",
    adminBg:    "#EEEEED",
    adminCard:  "#FFFFFF",
    adminSide:  "linear-gradient(180deg,#0f1e2e,#0d1a26)",
    shadow:     "0 2px 8px rgba(0,0,0,0.06)",
    shadowPop:  "0 32px 80px rgba(0,0,0,0.22)",
  },
  dark: {
    name: "dark",
    bg:         "#0f1117",
    bgCard:     "#1a1d27",
    bgMuted:    "#242736",
    bgNav:      "rgba(15,17,23,0.97)",
    border:     "#2a2d3e",
    text:       "#e8e8f0",
    textMuted:  "#8888a0",
    textFaint:  "#55556a",
    teal:       "#14a8ae",
    tealBg:     "rgba(20,168,174,0.1)",
    coral:      "#e05a4a",
    green:      "#29a05e",
    gold:       "#d4a012",
    navy:       "#0d1526",
    adminBg:    "#0c0e14",
    adminCard:  "#1a1d27",
    adminSide:  "linear-gradient(180deg,#070c14,#0a1020)",
    shadow:     "0 2px 8px rgba(0,0,0,0.3)",
    shadowPop:  "0 32px 80px rgba(0,0,0,0.6)",
  },
};

// Inject CSS variables onto :root
const applyTheme = (t) => {
  const r = document.documentElement;
  Object.entries(t).forEach(([k, v]) => {
    if (k !== "name") r.style.setProperty(`--${k}`, v);
  });
  r.setAttribute("data-theme", t.name);
};

export const ThemeProvider = ({ children }) => {
  const saved  = typeof window !== "undefined" ? localStorage.getItem("sd_theme") : null;
  const [theme, setTheme] = useState(saved || "light");
  const t = THEMES[theme] || THEMES.light;

  useEffect(() => { applyTheme(t); }, [theme, t, applyTheme]);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("sd_theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle, t }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
