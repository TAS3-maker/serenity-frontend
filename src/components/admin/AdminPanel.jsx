/**
 * AdminPanel.jsx — shell / router only.
 * All page components live in dedicated subfolders.
 */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../hooks/index";
import { useTheme } from "../../ThemeContext";

// Layout
import { AdminSidebar } from "./layout/Sidebar";
import { AdminTopbar }  from "./layout/Topbar";

// Auth + profile + notifications
import { AdminLogin }     from "./login/AdminLogin";
import { AProfile }       from "./profile/Profile";
import { ANotifications } from "./notifications/Notifications";

// Pages
import { ADashboard }  from "./Dashboard";
import { AUsers }      from "./Users";
import { APrograms }   from "./Programs";
import { AScheduler }  from "./Scheduler";
import { AAdminManage } from "./AdminManage";

// Content pages (barrel)
import { AQuestions, ABlog, AMemberships, ACommunityMod } from "./Content";

// Communications pages (barrel)
import { ATemplates, APush } from "./Communications";

// Config pages (barrel)
import { AEmailConfig, AStripeConfig, AGeneral, AFaqManager, AQRManager, APagePermissions } from "./Config";

// ─── Section labels (breadcrumb) ────────────────────────────────
const SEC_LABELS = {
  dashboard:    "Dashboard",
  users:        "Users",
  programs:     "Programs",
  questions:    "Assessment Questions",
  blog:         "Blog & Comments",
  memberships:  "Memberships & Pricing",
  community:    "Community Moderation",
  templates:    "Email Templates",
  scheduler:    "Mission Actions",
  push:         "Push Notifications",
  notifications:"Notifications",
  profile:      "My Profile",
  admin_manage: "Admin Accounts",
  email_cfg:    "Email / SMTP Config",
  stripe:       "Stripe Config",
  general:      "General Settings",
  faq:          "FAQ Manager",
  qr:           "QR & App Links",
  page_perms:   "Page Permissions",
};

// ─── Admin Panel shell ──────────────────────────────────────────
export const AdminPanel = ({ onLogout }) => {
  const { theme }    = useTheme();
  const { section }  = useParams();
  const navigate     = useNavigate();
  const [toast, showToast] = useToast();
  const [mobileNav, setMobileNav] = useState(false);

  const sec    = section || "dashboard";
  const setSec = (s) => navigate(`/admin/${s}`);

  const p = { showToast };

  const renderSection = () => {
    switch (sec) {
      case "dashboard":     return <ADashboard />;
      case "users":         return <AUsers {...p} />;
      case "programs":      return <APrograms {...p} />;
      case "questions":     return <AQuestions {...p} />;
      case "blog":          return <ABlog {...p} />;
      case "memberships":   return <AMemberships {...p} />;
      case "community":     return <ACommunityMod {...p} />;
      case "templates":     return <ATemplates {...p} />;
      case "scheduler":     return <AScheduler {...p} />;
      case "push":          return <APush {...p} />;
      case "notifications": return <ANotifications {...p} />;
      case "profile":       return <AProfile {...p} onLogout={onLogout} />;
      case "admin_manage":  return <AAdminManage {...p} />;
      case "email_cfg":     return <AEmailConfig {...p} />;
      case "stripe":        return <AStripeConfig {...p} />;
      case "general":       return <AGeneral {...p} />;
      case "faq":           return <AFaqManager {...p} />;
      case "qr":            return <AQRManager {...p} />;
      case "page_perms":    return <APagePermissions {...p} />;
      default:              return <ADashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background:"var(--adminBg)" }}>
      {/* Toast */}
      <div className={`toast${toast.show?" show":""}${toast.type==="error"?" err":""}`}>{toast.msg}</div>

      {/* Topbar */}
      <AdminTopbar
        sec={sec}
        secLabels={SEC_LABELS}
        setSec={setSec}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
      />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="w-[215px] flex-shrink-0 overflow-hidden flex flex-col admin-side">
          <AdminSidebar sec={sec} setSec={setSec} onLogout={onLogout}/>
        </div>

        {/* Mobile overlay */}
        {mobileNav && (
          <>
            <div onClick={() => setMobileNav(false)} className="fixed inset-0 bg-black/50 z-[500]"/>
            <div className="fixed top-0 left-0 bottom-0 w-60 z-[600] flex flex-col overflow-hidden">
              <AdminSidebar sec={sec} setSec={setSec} onLogout={onLogout} onCloseMobile={() => setMobileNav(false)}/>
            </div>
          </>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-[clamp(14px,2.5vw,28px)]"
          style={{ scrollbarWidth:"none", background:"var(--adminBg)" }}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

// Re-export AdminLogin so App.jsx import still works
export { AdminLogin } from "./login/AdminLogin";
