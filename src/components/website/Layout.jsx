import { useState, useEffect } from "react";
import { useTheme } from "../../ThemeContext";
import { ThemeToggle } from "../ui/index";
import { C } from "../../tokens";
import finalLogo from "../../../public/assets/finalLogo.png"
export const WebNav = ({ active, onNav }) => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    const el = document.querySelector('[data-scroll]');
    const target = el || window;
    target.addEventListener("scroll", handler);
    return () => target.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { l: "How It Works", n: "howitworks" },
    { l: "Programs", n: "programs" },
    { l: "Blog", n: "blog" },
    { l: "About", n: "about" },
  ];

  return (
    <nav
      className="sticky top-0 z-[200] h-[68px] flex items-center justify-between transition-all duration-300 shadow-2xl"
      style={{
        padding: "0 52px",
        background: "var(--bgNav)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-start justify-start gap-2.5 cursor-pointer"
        onClick={() => onNav("home")}
      >
        <img
          src={finalLogo}
          alt="SerenityDecoded"
          className="object-contain flex-shrink-0"
          style={{ width: 60, height: 60 }}
        />
  
      </div>

      {/* Center links */}
      <div className="flex gap-8 items-center justify-center">
        {links.map(({ l, n }) => (
          <button
            key={n}
            onClick={() => onNav(n)}
            className={`web-nav-link${active === n ? " active" : ""}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center justify-end">
        <span
          onClick={() => onNav("signin")}
          className="cursor-pointer font-semibold text-[14px]"
          style={{ color: "var(--text)" }}
        >
          Sign In
        </span>
      </div>
    </nav>
  );
};
export const WebFooter = ({ onNav, showToast }) => (
  <footer style={{ background: C.navy, padding: "72px 52px 48px" }}>
    <div className="web-container">
      <div className="grid gap-12 mb-16" style={{ gridTemplateColumns:"2fr 1fr 1fr 1fr" }}>
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4 cursor-pointer" onClick={() => onNav("home")}>
            <img src="/assets/logo-mark.png" alt="SerenityDecoded" className="object-contain flex-shrink-0" style={{ width:44, height:44 }} />
            <span className="font-display font-bold text-[18px] text-white tracking-tight">
              Serenity<span style={{ color:C.teal }}>Decoded</span>
            </span>
          </div>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.8, maxWidth:280, marginBottom:24 }}>
            Behavioral psychology tools for financial calm.<br/>Not another budgeting app.
          </p>
          <div className="flex gap-2.5">
            {["App Store","Google Play"].map(s=>(
              <button key={s} onClick={()=>showToast(`${s} — coming soon`)}
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:9, padding:"8px 14px", color:"rgba(255,255,255,0.6)", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          { h:"Product", links:[{l:"How It Works",n:"howitworks"},{l:"Programs",n:"programs"},{l:"Assessment",n:"home"},{l:"The Book",n:null}] },
          { h:"Company", links:[{l:"About",n:"about"},{l:"Blog",n:"blog"},{l:"Careers",n:null},{l:"Press",n:null}] },
          { h:"Support",  links:[{l:"Help Center",n:null},{l:"Privacy Policy",n:null},{l:"Terms",n:null},{l:"Contact",n:null}] },
        ].map(({h,links})=>(
          <div key={h}>
            <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.28)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:18 }}>{h}</div>
            {links.map(({l,n})=>(
              <div key={l} onClick={()=>n?onNav(n):showToast(`${l} — coming soon`)}
                style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:12, cursor:"pointer", transition:"color .15s" }}
                onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.5)"}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between pt-8" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.22)" }}>© 2026 SerenityDecoded. All rights reserved.</p>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.22)" }}>Your data is never sold. Ever.</p>
      </div>
    </div>
  </footer>
);
