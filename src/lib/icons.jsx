/**
 * lib/icons.jsx — inline SVG icon library, zero external deps.
 */
import { createElement as h } from "react";

// Base wrapper — only handles <path> children
const Ic = ({ size = 16, color = "currentColor", strokeWidth = 2, viewBox = "0 0 24 24", className = "", children }) =>
  h("svg", { width:size, height:size, viewBox, fill:"none", stroke:color, strokeWidth, strokeLinecap:"round", strokeLinejoin:"round", "aria-hidden":"true", className }, children);

const P  = (d) => h("path", { d });
const C  = (cx, cy, r) => h("circle", { cx, cy, r });
const L  = (x1, y1, x2, y2) => h("line", { x1, y1, x2, y2 });
const PL = (pts) => h("polyline", { points: pts });
const R  = (x, y, w, ht) => h("rect", { x, y, width:w, height:ht });

// ─── Navigation ────────────────────────────────────────────────
export const Menu         = (p) => h(Ic,p, P("M3 12h18"), P("M3 6h18"), P("M3 18h18"));
export const X            = (p) => h(Ic,p, P("M18 6 6 18"), P("M6 6l12 12"));
export const ChevronLeft  = (p) => h(Ic,p, P("M15 18l-6-6 6-6"));
export const ChevronRight = (p) => h(Ic,p, P("M9 18l6-6-6-6"));
export const ChevronDown  = (p) => h(Ic,p, P("M6 9l6 6 6-6"));
export const ChevronUp    = (p) => h(Ic,p, P("M18 15l-6-6-6 6"));
export const ArrowLeft    = (p) => h(Ic,p, P("M19 12H5"), P("M12 19l-7-7 7-7"));
export const ArrowUpRight = (p) => h(Ic,p, P("M7 17L17 7"), P("M7 7h10v10"));
export const ExternalLink = (p) => h(Ic,p, P("M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"), P("M15 3h6v6"), P("M10 14L21 3"));
export const LogOut       = (p) => h(Ic,p, P("M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"), P("M16 17l5-5-5-5"), P("M21 12H9"));

// ─── Actions ──────────────────────────────────────────────────
export const Plus         = (p) => h(Ic,p, P("M12 5v14"), P("M5 12h14"));
export const Pencil       = (p) => h(Ic,p, P("M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"), P("M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"));
export const Trash2       = (p) => h(Ic,p, P("M3 6h18"), P("M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"), P("M10 11v6"), P("M14 11v6"));
export const Copy         = (p) => h(Ic,p, P("M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z"), P("M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"));
export const Download     = (p) => h(Ic,p, P("M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"), P("M7 10l5 5 5-5"), P("M12 15V3"));
export const Upload       = (p) => h(Ic,p, P("M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"), P("M17 8l-5-5-5 5"), P("M12 3v12"));
export const RefreshCw    = (p) => h(Ic,p, P("M23 4v6h-6"), P("M1 20v-6h6"), P("M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"));
export const Send         = (p) => h(Ic,p, P("M22 2L11 13"), P("M22 2l-7 20-4-9-9-4 20-7z"));
export const Filter       = (p) => h(Ic,p, P("M22 3H2l8 9.46V19l4 2v-8.54L22 3"));
export const Play         = (p) => h("svg",{ width:p.size||16, height:p.size||16, viewBox:"0 0 24 24", fill:p.color||"currentColor", "aria-hidden":"true", className:p.className||"" }, P("M5 3l14 9-14 9V3z"));
export const Key          = (p) => h(Ic,p, P("M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"));
export const Link         = (p) => h(Ic,p, P("M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"), P("M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"));
export const Check        = (p) => h(Ic,p, P("M20 6L9 17l-5-5"));
export const Lock         = (p) => h(Ic,p, P("M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z"), P("M7 11V7a5 5 0 0110 0v4"));
export const Unlock       = (p) => h(Ic,p, P("M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z"), P("M7 11V7a5 5 0 019.9-1"));

// Eye / EyeOff need circles — use full JSX-style
export const Eye    = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, P("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"), C(12,12,3));
export const EyeOff = (p) => h(Ic,p, P("M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"), P("M1 1l22 22"));

// Search — has circle
export const Search = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, C(11,11,8), P("M21 21l-4.35-4.35"));

// ─── Status / Feedback ─────────────────────────────────────────
export const AlertCircle  = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, C(12,12,10), L(12,8,12,12), L(12,16,12.01,16));
export const AlertTriangle= (p) => h(Ic,p, P("M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"), P("M12 9v4"), P("M12 17h.01"));
export const ShieldCheck  = (p) => h(Ic,p, P("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"), P("M9 12l2 2 4-4"));
export const Info         = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, C(12,12,10), L(12,16,12,12), L(12,8,12.01,8));

// ─── Content / Media ──────────────────────────────────────────
export const BookOpen     = (p) => h(Ic,p, P("M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"), P("M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"));
export const FileText     = (p) => h(Ic,p, P("M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"), P("M14 2v6h6"), P("M16 13H8"), P("M16 17H8"), P("M10 9H8"));
export const Image        = (p) => h(Ic,p, P("M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"), C(8.5,8.5,2.5), P("M21 15l-5-5L5 21"));
export const Tag          = (p) => h(Ic,p, P("M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"), P("M7 7h.01"));
export const MessageSquare= (p) => h(Ic,p, P("M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"));
export const Sparkles     = (p) => h(Ic,p, P("M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"));
export const Flag         = (p) => h(Ic,p, P("M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"), P("M4 22v-7"));
export const ThumbsUp     = (p) => h(Ic,p, P("M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"), P("M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"));

// ─── Dashboard / Analytics ────────────────────────────────────
export const LayoutDashboard = (p) => h(Ic,p, R(3,3,7,9), R(14,3,7,5), R(14,12,7,9), R(3,16,7,6));
export const BarChart2    = (p) => h(Ic,p, P("M18 20V10"), P("M12 20V4"), P("M6 20v-6"));
export const TrendingUp   = (p) => h(Ic,p, P("M23 6l-9.5 9.5-5-5L1 18"), P("M17 6h6v6"));
export const TrendingDown = (p) => h(Ic,p, P("M23 18l-9.5-9.5-5 5L1 6"), P("M17 18h6v-6"));
export const Activity     = (p) => h(Ic,p, P("M22 12h-4l-3 9L9 3l-3 9H2"));
export const Layers       = (p) => h(Ic,p, P("M12 2L2 7l10 5 10-5-10-5z"), P("M2 17l10 5 10-5"), P("M2 12l10 5 10-5"));
export const Zap          = (p) => h(Ic,p, P("M13 2L3 14h9l-1 8 10-12h-9l1-8z"));

// Target — three concentric circles
export const Target = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, C(12,12,10), C(12,12,6), C(12,12,2));

// ─── People / User ────────────────────────────────────────────
export const User    = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, P("M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"), C(12,7,4));
export const Users   = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, P("M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"), P("M23 21v-2a4 4 0 00-3-3.87"), P("M16 3.13a4 4 0 010 7.75"), C(9,7,4));
export const UserX   = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, P("M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"), P("M17 11l5 5m0-5l-5 5"), C(8.5,7,4));
export const Brain   = (p) => h(Ic,p, P("M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7H4a2 2 0 00-2 2v2a2 2 0 002 2h.5A2.5 2.5 0 017 15.5v0A2.5 2.5 0 019.5 18h5A2.5 2.5 0 0117 15.5v0a2.5 2.5 0 012.5-2.5H20a2 2 0 002-2V9a2 2 0 00-2-2h-.5A2.5 2.5 0 0117 4.5v0A2.5 2.5 0 0114.5 2h-5z"));

// ─── Misc ─────────────────────────────────────────────────────
export const Bell     = (p) => h(Ic,p, P("M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"), P("M13.73 21a2 2 0 01-3.46 0"));
export const Mail     = (p) => h(Ic,p, P("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"), P("M22 6l-10 7L2 6"));
export const Settings = (p) => h(Ic,p, P("M12 15a3 3 0 100-6 3 3 0 000 6z"), P("M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"));
export const Globe    = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, C(12,12,10), L(2,12,22,12), P("M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"));
export const CreditCard=(p) => h(Ic,p, R(1,4,22,16), L(1,10,23,10));
export const Star     = (p) => h(Ic,p, P("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"));
export const Hash     = (p) => h(Ic,p, P("M4 9h16"), P("M4 15h16"), P("M10 3L8 21"), P("M16 3l-2 18"));
export const Shield   = (p) => h(Ic,p, P("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"));
export const Clock    = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, C(12,12,10), PL("12 6 12 12 16 14"));
export const Sun      = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, C(12,12,5), L(12,1,12,3), L(12,21,12,23), L(4.22,4.22,5.64,5.64), L(18.36,18.36,19.78,19.78), L(1,12,3,12), L(21,12,23,12), L(4.22,19.78,5.64,18.36), L(18.36,5.64,19.78,4.22));
export const Moon     = (p) => h(Ic,p, P("M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"));
export const Smartphone=(p) => h(Ic,p, P("M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2z"), L(12,18,12.01,18));

// MoreHorizontal — three dots
export const MoreHorizontal = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, C(12,12,1), C(19,12,1), C(5,12,1));

// ToggleLeft — rect + circle
export const ToggleLeft = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className}, R(1,6,22,12), C(8,12,3));

// QrCode
export const QrCode = ({ size=16, color="currentColor", strokeWidth=2, className="" }) =>
  h(Ic,{size,color,strokeWidth,className},
    R(3,3,7,7), R(14,3,7,7), R(14,14,7,7), R(3,14,7,7),
    R(6,6,1,1), R(17,6,1,1), R(17,17,1,1), R(6,17,1,1)
  );

export const Pin   = (p) => h(Ic,p, P("M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"), P("M12 16v6"));
export const Video = (p) => h(Ic,p, P("M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14v-4z"), P("M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"));
// ─── Aliases ──────────────────────────────────────────────────
export const IconDashboard = LayoutDashboard;
export const IconUsers     = Users;
export const IconBook      = BookOpen;
export const IconStar      = Star;
export const IconBrain     = Brain;
export const IconFlag      = Flag;
export const IconMail      = Mail;
export const IconClock     = Clock;
export const IconSend      = Send;
export const IconBell      = Bell;
export const IconUser      = User;
export const IconSettings  = Settings;
export const IconGlobe     = Globe;
export const IconCard      = CreditCard;
export const IconChart     = BarChart2;
export const IconBack      = ChevronLeft;
export const IconNext      = ChevronRight;
export const IconX         = X;
export const IconMenu      = Menu;
export const IconSearch    = Search;
export const IconPlus      = Plus;
export const IconEdit      = Pencil;
export const IconTrash     = Trash2;
export const IconEye       = Eye;
export const IconEyeOff    = EyeOff;
export const IconCheck     = Check;
export const IconAlert     = AlertCircle;
export const IconWarning   = AlertTriangle;
export const IconLogout    = LogOut;
export const IconSun       = Sun;
export const IconMoon      = Moon;
export const IconUpload    = Upload;
export const IconDownload  = Download;

export const NavIcon = ({ name, size=15, color="currentColor" }) => {
  const MAP = {
    dashboard: LayoutDashboard, users: Users, book: BookOpen, star: Star,
    brain: Brain, flag: Flag, mail: Mail, clock: Clock, send: Send,
    bell: Bell, user: User, settings: Settings, globe: Globe,
    card: CreditCard, hash: Hash, qr: QrCode,
  };
  const Comp = MAP[name] || Hash;
  return h(Comp, { size, color });
};
