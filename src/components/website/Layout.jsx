import { useState, useEffect } from "react";
import { useTheme } from "../../ThemeContext";
import { ThemeToggle } from "../ui/index";
import { C } from "../../tokens";
import finalLogo from "../../assets/logoFooter.svg";
import headerLogo from "../../assets/finalLogo.svg";

export const WebNav = ({ active, onNav }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    const el = document.querySelector("[data-scroll]");
    const target = el || window;
    target.addEventListener("scroll", handler);
    return () => target.removeEventListener("scroll", handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { l: "How It Works", n: "howitworks" },
    { l: "Programs", n: "programs" },
    { l: "Blog", n: "blog" },
    { l: "About", n: "about" },
  ];

  const handleNav = (n) => {
    onNav(n);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-[200] bg-white flex items-center justify-between transition-all duration-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        style={{
          padding: "12px 5%",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-start justify-start gap-2.5 cursor-pointer"
          onClick={() => handleNav("home")}
        >
          <img
            src={headerLogo}
            alt="SerenityDecoded"
            className="object-contain flex-shrink-0"
            style={{ width: 80, height: 80 }}
          />
        </div>

        {/* Desktop Center links */}
        <div className="hidden lg:flex gap-8 items-center font-jost text-xl font-medium justify-center">
          {links.map(({ l, n }) => (
            <button
              key={n}
              onClick={() => handleNav(n)}
              className={`web-nav-link${active === n ? " active" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Desktop Right side */}
       <div className="hidden lg:flex items-center justify-end">
          {/* <button
            onClick={() => handleNav("admin")}
            className="bg-[#0D7377] hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold font-jost text-sm transition-all duration-300"
          >
            Sign In
          </button> */}
        </div>

        {/* Mobile/Tablet Hamburger */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-md focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-[2px] bg-gray-700 rounded transition-all duration-300"
              style={{
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-5 h-[2px] bg-gray-700 rounded transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[2px] bg-gray-700 rounded transition-all duration-300"
              style={{
                transform: menuOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Dropdown Menu */}
      <div
        className={`lg:hidden fixed top-[84px] left-0 right-0 z-[199] bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden`}
        style={{
          maxHeight: menuOpen ? "400px" : "0px",
          borderBottom: menuOpen ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="flex flex-col px-6 md:px-10 pt-6 gap-1">
          {links.map(({ l, n }) => (
            <button
              key={n}
              onClick={() => handleNav(n)}
              className={`text-left px-3 py-2 rounded-lg text-[15px] font-medium transition-colors duration-150 ${
                active === n
                  ? "bg-[rgba(13,115,119,0.08)] text-[rgba(13,115,119,1)]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {l}
            </button>
          ))}
          <div className=" py-1 border-t border-gray-100">
            <button
              onClick={() => handleNav("admin")}
              className="w-full text-left px-3 py-2 rounded-lg text-[15px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors duration-150"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[198] bg-black/20"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

const footerColumns = [
  {
    h: "Product",
    links: [
      { l: "How It Works", n: "howitworks" },
      { l: "Programs", n: "programs" },
      { l: "Assessment", n: "home" },
      { l: "The Book", n: "book" },
    ],
  },
  {
    h: "Company",
    links: [
      { l: "About", n: "about" },
      { l: "Blog", n: "blog" },
      { l: "Careers", n: null },
      { l: "Press", n: null },
    ],
  },
  {
    h: "Support",
    links: [
      { l: "Help Center", n: null },
      { l: "Privacy Policy", n: null },
      { l: "Terms", n: null },
      { l: "Contact", n: "contact" },
    ],
  },
];

export const WebFooter = ({ onNav, showToast }) => (
  <footer className="bg-[rgba(13,115,119,1)]">
    {/* ── MOBILE (default, < md) ─────────────────── */}

    <div className="flex flex-col items-center text-center gap-4 px-3 py-4 md:hidden">
      {/* Brand */}
      <div className="flex flex-col items-center gap-2">
        <img
          src={finalLogo}
          alt="SerenityDecoded"
          className="object-cover w-16 h-16 cursor-pointer"
          onClick={() => onNav("home")}
        />

        <p className="text-white font-jost text-xs leading-relaxed">
          Behavioral psychology tools for financial calm.
          <br />
          Not another budgeting app.
        </p>

        <div className="flex gap-2 flex-wrap justify-center">
          {["App Store", "Google Play"].map((s) => (
            <button
              key={s}
              onClick={() => showToast(`${s} — coming soon`)}
              className="text-white border border-white"
              style={{
                borderRadius: 9,
                padding: "4px 10px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter',sans-serif",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-3 gap-4 w-full pt-2">
        {footerColumns.map(({ h, links }) => (
          <div key={h} className="flex flex-col items-center gap-2">
            <p className="text-white font-bold font-jost text-sm">{h}</p>

            {links.map(({ l, n }) => (
              <span
                key={l}
                onClick={() => (n ? onNav(n) : showToast(`${l} — coming soon`))}
                className="text-white text-xs cursor-pointer text-center leading-relaxed"
                style={{ transition: "color .15s" }}
              >
                {l}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <p
        className="text-white text-center w-full pt-4"
        style={{
          fontSize: 13,
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        © 2026 SerenityDecoded. All rights reserved.
      </p>
    </div>

    {/* ── TABLET (md, < lg) ─────────────────────── */}
    <div className="hidden md:flex lg:hidden flex-col items-center gap-8 px-10 py-6">
      {/* Brand row */}
      <div className="flex flex-col items-center text-center gap-3">
        <img
          src={finalLogo}
          alt="SerenityDecoded"
          className="object-cover w-20 h-20 cursor-pointer"
          onClick={() => onNav("home")}
        />
        <p className="text-white font-jost text-sm leading-relaxed max-w-xs">
          Behavioral psychology tools for financial calm.
          <br />
          Not another budgeting app.
        </p>
        <div className="flex gap-5 flex-wrap justify-center">
          {["App Store", "Google Play"].map((s) => (
            <button
              key={s}
              onClick={() => showToast(`${s} — coming soon`)}
              className="text-white border border-white"
              style={{
                borderRadius: 9,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Jost',sans-serif",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 3 link columns in one row */}
      <div className="grid grid-cols-3 gap-28 w-full max-w-lg">
        {footerColumns.map(({ h, links }) => (
          <div key={h} className="flex flex-col items-center text-center gap-3">
            <p className="text-white font-bold font-jost text-base">{h}</p>
            {links.map(({ l, n }) => (
              <span
                key={l}
                onClick={() => (n ? onNav(n) : showToast(`${l} — coming soon`))}
                className="text-white text-sm cursor-pointer"
                style={{ transition: "color .15s" }}
              >
                {l}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <p
        className="text-white text-center w-full pt-8"
        style={{ fontSize: 13, borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        © 2026 SerenityDecoded. All rights reserved.
      </p>
    </div>

    {/* ── DESKTOP (lg+) — original layout ──────── */}
    <div className="hidden lg:block" style={{ padding: "60px 50px 40px" }}>
      <div className="web-container">
        <div
          className="grid gap-12 mb-16"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
        >
          {/* Brand */}
          <div>
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => onNav("home")}
            >
              <img
                src={finalLogo}
                alt="SerenityDecoded"
                className="object-cover w-24 h-24"
              />
            </div>
            <p className="text-white font-jost lg:py-3">
              Behavioral psychology tools for financial calm.
              <br />
              Not another budgeting app.
            </p>
            <div className="flex gap-2.5 mt-2">
              {["App Store", "Google Play"].map((s) => (
                <button
                  key={s}
                  onClick={() => showToast(`${s} — coming soon`)}
                  className="text-white border border-white"
                  style={{
                    borderRadius: 9,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map(({ h, links }) => (
            <div key={h}>
              <div
                className="text-white font-bold font-jost"
                style={{ marginBottom: 18 }}
              >
                {h}
              </div>
              {links.map(({ l, n }) => (
                <div
                  key={l}
                  onClick={() =>
                    n ? onNav(n) : showToast(`${l} — coming soon`)
                  }
                  className="text-white"
                  style={{
                    fontSize: 14,
                    marginBottom: 12,
                    cursor: "pointer",
                    transition: "color .15s",
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-center pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-white" style={{ fontSize: 13 }}>
            © 2026 SerenityDecoded. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);
