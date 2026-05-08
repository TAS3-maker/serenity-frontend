import { useRef, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "./hooks/index";
import { WebNav, WebFooter } from "./components/website/Layout";
import { WebHome } from "./components/website/HomePage";
import { WebHowItWorks, WebPrograms, WebAbout } from "./components/website/Pages";
import { WebBlog } from "./components/website/Blog";
import { WebCommunity } from "./components/community/index";
import { AdminLogin, AdminPanel,ForgetPassword,NewPassword,ResetPassword } from "./components/admin/AdminPanel";
import { api } from "./lib/api";
import WaitListLayout from "./components/website/waitlist/WaitListLayout";
import ContactLayout from "./components/website/ContactUs/ContactLayout";
import Paymentpage from "./components/website/Payment";
// ─── Auth ──────────────────────────────────────────────────────
// We avoid storing any auth-related data in sessionStorage / localStorage to
// stay XSS-safe. The actual auth token lives in an httpOnly cookie (`sd_token`)
// set by the backend; presence of a logged-in admin is determined by calling
// /api/auth/admin/me on mount. The `authedRef` below is just an in-memory
// optimistic flag set right after a successful login so the first render
// after navigation doesn't bounce back to /admin/login.

let _adminAuthed = false;
const setAuthed  = (v) => { _adminAuthed = !!v; };
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [phase, setPhase] = useState("checking");

  useEffect(() => {
    let alive = true;

    api.auth.adminMe()
      .then(() => {
        if (alive) setPhase("ok");
      })
      .catch(() => {
        if (alive) setPhase("nope");
      });

    return () => { alive = false; };
  }, []);

  // 🔥 IMPORTANT: never render children until verified
  if (phase !== "ok") {
    if (phase === "nope") {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <div className="text-center mt-10">Loading...</div>;
  }

  return children;
};
// ─── Website layout ────────────────────────────────────────────
const WebsiteLayout = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [toast, showToast] = useToast();
  const location = useLocation();

  const pathMap = { "/how-it-works": "howitworks", "/programs": "programs", "/blog": "blog", "/about": "about", "/community": "community", "/book":"book", "/contact":"contact" };
  const active = pathMap[location.pathname] || "home";

  const onNav = (key) => {
    const routeMap = { home: "/", howitworks: "/how-it-works", programs: "/programs", blog: "/blog", about: "/about", admin: "/admin/login", book:"/book", contact:"/contact"};
    navigate(routeMap[key] || "/");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const renderPage = () => {
    switch (active) {
      case "howitworks": return <WebHowItWorks showToast={showToast} />;
      case "programs":   return <WebPrograms showToast={showToast} />;
      case "blog":       return <WebBlog showToast={showToast} />;
      case "about":      return <WebAbout showToast={showToast} />;
      case "community":  return <WebCommunity showToast={showToast} />;
      case "book":  return <WaitListLayout  />;
      case "contact": return <ContactLayout />;

      default:           return <WebHome onNav={onNav} showToast={showToast} />;
    }
  };

  return (
    <div ref={scrollRef} className="w-full h-screen overflow-y-auto flex flex-col" data-scroll="" style={{ scrollbarWidth:"none", background:"var(--bg)" }}>
      {/* Toast */}
      <div className={`toast${toast.show ? " show" : ""}${toast.type === "error" ? " err" : ""}`}>
        {toast.msg}
      </div>
      <WebNav active={active} onNav={onNav} />
      <div className="flex-1">{renderPage()}</div>
      <WebFooter onNav={onNav} showToast={showToast} />
    </div>
  );
};

// ─── Admin login page ───────────────────────────────────────────
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";
  return (
    <AdminLogin
      onSuccess={() => { setAuthed(true); navigate(from, { replace: true }); }}
      onBack={() => navigate("/")}
    />
  );
};

// ─── Admin panel page ───────────────────────────────────────────
const AdminRoute = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
  try {
    await api.auth.logout();
  } catch (err) {
    console.warn("[AdminRoute] logout request failed:", err);
  }

  api.clearToken();
  setAuthed(false);


  window.location.href = "/";
};
  return (
    <RequireAuth>
      <AdminPanel onLogout={handleLogout} />
    </RequireAuth>
  );
};


// ─── Community page (full-screen, own nav) ──────────────────────
const CommunityRoute = () => {
  const navigate = useNavigate();
  const [toast, showToast] = useToast();
  return (
    <div className="fixed inset-0 flex flex-col" style={{ background:"var(--bg)" }}>
      <div className={`toast${toast.show?" show":""}${toast.type==="error"?" err":""}`}>{toast.msg}</div>
      <WebCommunity showToast={showToast} onGoHome={() => navigate("/")}/>
    </div>
  );
};

// ─── Root router ────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <div className="fixed inset-0">
        <Routes>
          <Route path="/"               element={<WebsiteLayout />} />
          <Route path="/how-it-works"   element={<WebsiteLayout />} />
          <Route path="/programs"       element={<WebsiteLayout />} />
          <Route path="/blog"           element={<WebsiteLayout />} />
          <Route path="/about"          element={<WebsiteLayout />} />
          <Route path="/book"           element={<WebsiteLayout />} />
          <Route path="/contact"        element={<WebsiteLayout />} />
          <Route path="/community"      element={<CommunityRoute />} />
          <Route path="/admin/login"    element={<AdminLoginPage />} />
          <Route path="/admin"          element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/:section" element={<AdminRoute />} />
          <Route path="*"               element={<Navigate to="/" replace />} />
          <Route path="/payment"        element={<Paymentpage />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}
