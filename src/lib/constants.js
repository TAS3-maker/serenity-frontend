// ─── Shared constants, maps, and helpers ───────────────────────
import { C } from "../tokens";

export const PROFILE_MAP = {
  avoider: { label: "The Avoider",        color: C.teal,  bg: "var(--tealBg)",  border: "var(--tealBorder)" },
  anxious: { label: "Anxious Manager",    color: C.gold,  bg: "var(--goldBg)",  border: "rgba(183,134,11,0.2)" },
  silent:  { label: "Silent Stressor",    color: C.green, bg: "var(--greenBg)", border: "rgba(30,113,69,0.2)" },
  all:     { label: "All Profiles",       color: C.teal,  bg: "var(--tealBg)",  border: "var(--tealBorder)" },
};
export const profileLabel = k => PROFILE_MAP[k]?.label ?? k;
export const profileColor = k => PROFILE_MAP[k]?.color ?? "var(--textMuted)";

// Maps a profile key to a Badge variant, replacing nested ternaries scattered
// across the admin/community UIs (UserList, UserDetail, etc.)
export const PROFILE_VARIANT = { avoider: "teal", anxious: "gold", silent: "green" };
export const profileVariant = k => PROFILE_VARIANT[k] ?? "grey";

// Maps a plan key to {label, variant} for Badge usage.
export const PLAN_VARIANT = { premium: "gold", free: "grey" };
export const planLabel    = k => (k === "premium" ? "Premium" : "Free");
export const planVariant  = k => PLAN_VARIANT[k] ?? "grey";

// Membership interval suffix (e.g. "/mo", "/yr", "one-time")
export const intervalSuffix = (interval) => {
  if (interval === "monthly") return "/mo";
  if (interval === "yearly")  return "/yr";
  return "one-time";
};

export const PLAN_MAP = {
  free:    { label: "Free",    color: C.teal  },
  premium: { label: "Premium", color: C.gold  },
  all:     { label: "All",     color: C.teal  },
};

export const STATUS_VARIANT = {
  active:    "green",
  inactive:  "coral",
  suspended: "coral",
  new:       "gold",
  delivered: "green",
  scheduled: "gold",
  draft:     "grey",
  published: "green",
  pending:   "gold",
  approved:  "green",
  visible:   "green",
  flagged:   "coral",
  live:      "green",
  paused:    "coral",
};

export const TRIGGERS = [
  "on_signup","daily_9am","subscription_minus_3","subscription_minus_2",
  "subscription_minus_1","subscription_expired","payment_success",
  "streak_7","program_complete","inactive_7d","manual",
];
export const SCHEDULE_TYPES = [
  ["event_trigger","Instant trigger"],["event_offset","Offset from event"],
  ["recurring_daily","Recurring daily"],["recurring_weekly","Recurring weekly"],
];
export const OFFSET_FROM = [
  "subscription_end","signup","payment","last_activity","streak_milestone","program_complete",
];
export const EMAIL_VARS = {
  first_name:"Sarah", stress_profile:"The Avoider", app_link:"https://serenitydecoded.com/app",
  day_number:"3", program_name:"7-Day Relief Program", mission_title:"Naming the Feeling",
  streak_count:"7", relief_score:"62", expiry_date:"Mar 22, 2026",
  renewal_link:"https://serenitydecoded.com/renew", amount:"$19.00",
  payment_date:"Mar 19, 2026", receipt_id:"RCP-001",
  daily_quote:"Awareness is the beginning of transformation.",
};
export const fillVars = s =>
  Object.entries(EMAIL_VARS).reduce((acc,[k,v])=>acc.replace(new RegExp(`{{${k}}}`,"g"),v), s);

export const MISSION_TYPES = ["reflection","exercise","journal","mapping","milestone"];
export const PLAN_INTERVALS = [
  ["free","Free"],["one_time","One-time payment"],["monthly","Monthly subscription"],["yearly","Yearly subscription"],
];
export const TIMEZONES = ["UTC","America/New_York","America/Los_Angeles","Asia/Kolkata","Europe/London","Asia/Singapore"];
export const CHANNELS = [["both","Push + Email"],["push","Push only"],["email","Email only"]];
export const PROGRAMS  = [["7day","7-Day Relief Program"],["30day","30-Day Sprint"],["all","All Programs"]];
export const FAQ_CATS  = ["General","Pricing","Product","Technical"];
export const ROLE_PRESETS_IDS = {
  "Super Admin":    ["view_dashboard","manage_users","manage_programs","manage_blog","manage_community","send_push","manage_templates","manage_scheduler","manage_memberships","view_payments","manage_admins","manage_config","view_logs"],
  "Content Editor": ["view_dashboard","manage_programs","manage_blog","manage_community","manage_templates","manage_scheduler"],
  "Support":        ["view_dashboard","manage_users","manage_community","send_push"],
  "Read Only":      ["view_dashboard","view_payments","view_logs"],
};
export const ALL_PERMISSIONS = [
  { group:"Content",        perms:[{id:"view_dashboard",label:"View Dashboard & Analytics"},{id:"manage_users",label:"Manage Users"},{id:"manage_programs",label:"Manage Programs"},{id:"manage_blog",label:"Manage Blog & Comments"},{id:"manage_community",label:"Moderate Community"}]},
  { group:"Communications", perms:[{id:"send_push",label:"Send Push Notifications"},{id:"manage_templates",label:"Manage Email Templates"},{id:"manage_scheduler",label:"Manage Schedulers"}]},
  { group:"Commerce",       perms:[{id:"manage_memberships",label:"Manage Memberships & Pricing"},{id:"view_payments",label:"View Payment Records"}]},
  { group:"Administration", perms:[{id:"manage_admins",label:"Manage Admin Accounts"},{id:"manage_config",label:"Manage Configuration"},{id:"view_logs",label:"View Audit Logs"}]},
];

// ─── Page-wise permission map ─────────────────────────────────
// Each page has view/edit/hide access levels per role
export const ADMIN_PAGES = [
  { id:"dashboard",    label:"Dashboard",          group:"Overview"       },
  { id:"users",        label:"Users",              group:"Overview"       },
  { id:"programs",     label:"Programs",           group:"Content"        },
  { id:"questions",    label:"Assessment Q's",     group:"Content"        },
  { id:"blog",         label:"Blog & Comments",    group:"Content"        },
  { id:"memberships",  label:"Memberships",        group:"Content"        },
  { id:"community",    label:"Community Mod",      group:"Content"        },
  { id:"templates",    label:"Email Templates",    group:"Communications" },
  { id:"scheduler",    label:"Mission Actions",    group:"Communications" },
  { id:"push",         label:"Push Notifs",        group:"Communications" },
  { id:"notifications",label:"Notifications",      group:"Admin"          },
  { id:"admin_manage", label:"Admin Accounts",     group:"Admin"          },
  { id:"email_cfg",    label:"Email Config",       group:"Configuration"  },
  { id:"stripe",       label:"Stripe Config",      group:"Configuration"  },
  { id:"general",      label:"General Settings",   group:"Configuration"  },
  { id:"faq",          label:"FAQ Manager",        group:"Configuration"  },
  { id:"qr",           label:"QR & App Links",     group:"Configuration"  },
];

// Default page access per role: "view" | "edit" | "hide"
export const DEFAULT_PAGE_ACCESS = {
  "Super Admin":    Object.fromEntries(ADMIN_PAGES.map(p => [p.id, "edit"])),
  "Content Editor": Object.fromEntries(ADMIN_PAGES.map(p => {
    if (["dashboard","programs","questions","blog","community","templates","scheduler","memberships"].includes(p.id)) return [p.id,"edit"];
    if (["notifications"].includes(p.id)) return [p.id,"view"];
    return [p.id,"hide"];
  })),
  "Support": Object.fromEntries(ADMIN_PAGES.map(p => {
    if (["dashboard","users","community","notifications","push"].includes(p.id)) return [p.id,"edit"];
    return [p.id,"hide"];
  })),
  "Read Only": Object.fromEntries(ADMIN_PAGES.map(p => {
    if (["dashboard"].includes(p.id)) return [p.id,"view"];
    return [p.id,"hide"];
  })),
};
