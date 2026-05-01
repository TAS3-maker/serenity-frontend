import { LogOut } from "../../../lib/icons";
import { ANAV, NavIcon } from "../AdminShared";
import { useTheme } from "../../../ThemeContext";
import { C } from "../../../tokens";

export const AdminSidebar = ({ sec, setSec, onLogout, onCloseMobile }) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "var(--adminSide)" }}>

      {/* Logo */}
      <div className="px-4 py-4 flex-shrink-0 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo-mark.png"
            alt="SerenityDecoded"
            className="object-contain flex-shrink-0"
            style={{ width: 40, height: 40, filter: "drop-shadow(0 2px 8px rgba(13,115,119,0.4))" }}
          />
          <div>
            <div className="font-display font-bold text-[14px] text-white leading-tight tracking-tight">
              SerenityDecoded
            </div>
            <div className="text-[10px] text-white/30 mt-px tracking-wide">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {ANAV.map((item, i) => item.g
          ? <div key={`group-${i}-${item.g}`} className="px-5 pt-4 pb-1 text-[9px] font-extrabold text-white/20 uppercase tracking-[1.5px]">{item.g}</div>
          : <div
              key={item.id}
              onClick={() => { setSec(item.id); onCloseMobile?.(); }}
              className={`a-item${sec === item.id ? " on" : ""}`}>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: sec === item.id ? "rgba(13,115,119,0.35)" : "rgba(255,255,255,0.06)" }}>
                <NavIcon name={item.i} size={14} color={sec === item.id ? "#fff" : "rgba(255,255,255,0.4)"} />
              </div>
              <span className="flex-1 text-[13px]">{item.l}</span>
              {item.badge && (
                <span className="text-[10px] font-extrabold rounded-md px-1.5 py-0.5"
                  style={{
                    background: ["2","1"].includes(item.badge) ? C.coral+"33" : C.teal+"33",
                    color: ["2","1"].includes(item.badge) ? C.coral : C.teal,
                  }}>
                  {item.badge}
                </span>
              )}
            </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 flex-shrink-0 border-t border-white/[0.07]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg,${C.teal},#1E7145)` }}>
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white/80 truncate">Admin User</div>
            <div className="text-[10px] text-white/30">Super Admin</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full h-8 rounded-lg border border-white/10 bg-transparent text-white/40 font-sans text-[12px] font-semibold cursor-pointer flex items-center justify-center gap-2 hover:bg-white/[0.06] transition-colors">
          <LogOut size={13} color="rgba(255,255,255,0.4)" /> Sign out
        </button>
      </div>
    </div>
  );
};
