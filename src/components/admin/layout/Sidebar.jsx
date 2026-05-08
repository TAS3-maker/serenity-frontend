import { LogOut } from "../../../lib/icons";
import { ANAV, NavIcon } from "../AdminShared";

import { C } from "../../../tokens";
import dashboardLogo from "../../../assets/dashboardLogo.png"

export const AdminSidebar = ({ sec, setSec, onLogout, onCloseMobile ,admin}) => {
  
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[rgba(13,115,119,1)]" >

      {/* Logo */}
      <div className="px-4 py-4 flex justify-center items-center ">
       
          <img
            src={dashboardLogo}
            alt="SerenityDecoded"
            className="object-cover rounded-3xl"
           
          />
      

      </div>
<div className="w-full h-[1px] bg-white/30 mt-4"></div>
      {/* Nav */}
      <div className="flex-1 py-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {ANAV.map((item, i) => item.g
          ? <div key={`group-${i}-${item.g}`} className="px-5 pt-4 pb-1 text-[9px] font-extrabold text-white/20 uppercase tracking-[1.5px]">{item.g}</div>
          : <div
              key={item.id}
              onClick={() => { setSec(item.id); onCloseMobile?.(); }}
              className={`a-item flex items-center gap-3 px-4 py-2 cursor-pointer ${
  sec === item.id ?
sec === item.id
  ? "text-[rgba(255,182,0,1)]"
  : "text-white hover:text-white/80"
  
  
  : "text-white"
}`}>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
               style={{
  background: sec === item.id
    ? "rgba(255,182,0,0.2)"
    : "rgba(255,255,255,0.06)"
}}>
                <NavIcon name={item.i} size={14}
             color={sec === item.id ? "rgba(255,182,0,1)" : "#fff"}
                 
                 />
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
           {admin?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-white/80 truncate">
  {admin?.name || "Admin User"}
</div>

<div className="text-[10px] text-white/30">
  {admin?.role === "superadmin"
    ? "Super Admin"
    : admin?.role === "admin"
    ? "Admin"
    : admin?.role || "Staff"}
</div>
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
