/**
 * AdminShared.jsx
 * Re-exports all shared UI from ui/index so admin components
 * can import from one place: import { Button, Card, Badge } from "./AdminShared"
 */
export {
  Button   as ABtn,
  Badge    as ABadge,
  Toggle   as AToggle,
  Input    as AInp,
  Textarea as ATxt,
  Select   as ASel,
  Row      as ARow,
  Card     as ACard,
  Pager,
  SearchBar,
  Modal    as Pop,
  Confirm  as ConfirmPop,
  Empty    as EmptyState,
  ImageUpload,
  AvatarUpload,
  PwStrength,
  FAQItem,
  PlanCard,
  BlogCard,
  ThemeToggle,
} from "../ui/index";

// ─── Admin nav config ──────────────────────────────────────────
export const ANAV = [
  { g: "Overview" },
  { id: "dashboard",    l: "Dashboard",        i: "dashboard" },
  { id: "users",        l: "Users",             i: "users",    badge: "1,284" },
  { g: "Content" },
  { id: "programs",     l: "Programs",          i: "star"    },
  { id: "questions",    l: "Assessment Q's",    i: "brain"   },
  { id: "blog",         l: "Blog & Comments",   i: "book",     badge: "2" },
  { id: "memberships",  l: "Memberships",       i: "card"    },
  { id: "community",    l: "Community Mod",     i: "flag",     badge: "1" },
  { g: "Communications" },
  { id: "templates",    l: "Email Templates",   i: "mail"    },
  { id: "scheduler",    l: "Mission Actions",   i: "clock"   },
  { id: "push",         l: "Push Notifs",       i: "send"    },
  { g: "Admin" },
  { id: "notifications",l: "Notifications",     i: "bell"    },
  { id: "profile",      l: "My Profile",        i: "user"    },
  { id: "admin_manage", l: "Admin Accounts",    i: "users"   },
  { g: "Configuration" },
  { id: "email_cfg",    l: "Email / SMTP",      i: "settings"},
  { id: "stripe",       l: "Stripe",            i: "card"    },
  { id: "general",      l: "General",           i: "globe"   },
  { id: "faq",          l: "FAQ Manager",       i: "book"    },
];

// ─── Sidebar icon map (lucide) ─────────────────────────────────
import {
  LayoutDashboard, Users, BookOpen, Star, Brain, Flag,
  Mail, Clock, Send, Bell, User, Settings, Globe,
  CreditCard, Hash, QrCode, Shield,
} from "../../lib/icons";

const ICON_MAP = {
  dashboard: LayoutDashboard,
  users:     Users,
  book:      BookOpen,
  star:      Star,
  brain:     Brain,
  flag:      Flag,
  mail:      Mail,
  clock:     Clock,
  send:      Send,
  bell:      Bell,
  user:      User,
  settings:  Settings,
  globe:     Globe,
  card:      CreditCard,
  hash:      Hash,
  qr:        QrCode,
  shield:    Shield,
};

export const NavIcon = ({ name, size = 15, color = "currentColor" }) => {
  const Comp = ICON_MAP[name] || Hash;
  return <Comp size={size} color={color} />;
};
