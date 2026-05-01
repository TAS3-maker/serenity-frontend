# SerenityDecoded — Website + Admin Panel

## Routes

### Website
| Path | Page |
|------|------|
| `/` | Home |
| `/how-it-works` | How It Works |
| `/programs` | Programs & Pricing |
| `/blog` | Blog |
| `/about` | About |

### Admin
| Path | Page |
|------|------|
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Dashboard |
| `/admin/users` | Users |
| `/admin/programs` | Programs |
| `/admin/questions` | Assessment Questions |
| `/admin/blog` | Blog & Comments |
| `/admin/memberships` | Memberships & Pricing |
| `/admin/community` | Community Moderation |
| `/admin/templates` | Email Templates |
| `/admin/scheduler` | Mission Actions |
| `/admin/push` | Push Notifications |
| `/admin/notifications` | Admin Notifications |
| `/admin/profile` | My Profile |
| `/admin/email_cfg` | Email / SMTP Config |
| `/admin/stripe` | Stripe Config |
| `/admin/general` | General Settings |

**Demo credentials:** `admin@serenitydecoded.com` / `Admin@2026`

Auth is stored in `sessionStorage` — refreshing keeps you logged in for the session. Closing the tab logs you out.

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Routing: how it works

Uses `react-router-dom` v6 `BrowserRouter`. Vite automatically serves `index.html` for all routes in development. For production:

| Host | Config file |
|------|-------------|
| Netlify | `public/_redirects` — already included |
| Vercel | `vercel.json` — already included |
| Nginx | `nginx.conf` — already included |
| Apache | `public/.htaccess` — already included |

## Project structure

```
src/
├── App.jsx                        Root router (BrowserRouter + Routes)
├── tokens.js                      Design tokens + CSS strings
├── data/index.js                  Shared data
├── hooks/index.js                 useToast, Icon
└── components/
    ├── website/
    │   ├── Layout.jsx             WebNav, WebFooter
    │   ├── HomePage.jsx
    │   ├── Pages.jsx              HowItWorks, Programs, About
    │   └── Blog.jsx
    └── admin/
        ├── AdminPanel.jsx         AdminLogin, AdminPanel, AdminSidebar
        ├── AdminShared.jsx        Shared helpers
        ├── Dashboard.jsx
        ├── Users.jsx              User list + AUserDetail (5 tabs)
        ├── Programs.jsx
        ├── Content.jsx            Questions, Blog, Memberships, Community
        ├── Communications.jsx     Templates, Scheduler, Push
        ├── Config.jsx             Email, Stripe, General
        └── Scheduler.jsx          Action Library + Cron + Send Now + History
```

## Design system

Colors and global CSS in `src/tokens.js`. The `C` object holds all brand colors.
