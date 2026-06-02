/**
 * Users.jsx — fetches the user list from the live API and wires
 * mutations (delete / activate / deactivate) back to the backend.
 */
import { useState } from "react";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { UserList } from "./users/UserList";
import { UserDetail } from "./users/UserDetail";

// Map an API user document to the shape the existing UI expects.
const apiUserToUi = (u) => ({
  id:           u._id || u.id,
  name:         u.name || "",
  email:        u.email || "",
  profile:      u.stressProfile || u.profile || "avoider",
  plan:         u.plan||"",
  country:      u.country || "—",
  status:       u.isActive === false ? "inactive" : "active",
  streak:       u.streak ?? 0,
  reliefScore:  u.reliefScore ?? Math.round(45 + (u.streak ?? 0) * 2),
  joinDate:     u.createdAt || null,
  lastActive:   u.lastActiveDate || u.lastActive || null,
  raw:          u,    // preserve original for detail view
});

export const AUsers = ({ showToast }) => {
const [viewId, setViewId] = useState(null);
const [selectedUser, setSelectedUser] = useState(null);
const [loadingUser, setLoadingUser] = useState(false);  
  const { data: rawUsers, loading, reload, setData } = useApi(
    () => api.users.list({ perPage: 200 }),
    { initial: [] }
  );
  const users = (rawUsers || []).map(apiUserToUi);

  // Optimistic local update wrapper — mutates UI immediately, then calls API,
  // and rolls back / refetches on failure.
  const mutate = async (updater, apiCall, successMsg) => {
    const prev = rawUsers;
    setData(updater(prev));
    try {
      await apiCall;
      if (successMsg) showToast?.(successMsg);
    } catch (e) {
      setData(prev);
      showToast?.(e?.data?.message || "Update failed", "error");
      reload();
    }
  };
const handleViewUser = async (id) => {
  
  try {
    setLoadingUser(true);

    const res = await api.admin.getUserById(id);
console.log("subscription =>", res.user);
    if (!res?.user) throw new Error("Invalid response");

    const u = res.user;

   const formattedUser = {
   // Basic
  id: u._id,
  name: u.name || "-",
  email: u.email || "-",
  phone: u.phone || "-",
  avatarUrl: u.avatarUrl || "",

  // Profile / Account
  profile: u.stressProfile || "avoider",
  stressProfile: u.stressProfile || "-",
  plan: u.plan || "",
  role: u.role || "user",
  status: u.isActive ? "active" : "inactive",
  isAdmin: u.isAdmin ?? false,
  assessmentDone: u.assessmentDone ?? false,

  // Progress
  streak: u.streak ?? 0,
  lastStreak: u.lastStreak ?? 0,
  reliefScore: u.reliefScore ?? 0,
  weeklyCalmScore: u.weeklyCalmScore ?? 0,
  day: u.programDay ?? 0,
  programDay: u.programDay ?? 0,
  missionsComplete: u.missionsComplete ?? 0,
  totalMissions: 30, // fixed program days

  // Mental Health Data
  fcl: u.fcl || "-",
  aaravTone: u.aaravTone || "-",
  aaravLastInteraction:
    u.aaravLastInteraction || null,

  // Locale / Preferences
  timezone: u.timezone || "-",
  language: u.language || "en",
  pusherInterests:
    u.pusherInterests || [],

  // Notification Preferences
  notifPrefs: {
    emailEnabled:
      u.notifPrefs?.emailEnabled ??
      false,
    pushEnabled:
      u.notifPrefs?.pushEnabled ??
      false,
    smsEnabled:
      u.notifPrefs?.smsEnabled ??
      false,
    dailyMission:
      u.notifPrefs?.dailyMission ??
      false,
    streakReminder:
      u.notifPrefs?.streakReminder ??
      false,
    aaravNudges:
      u.notifPrefs?.aaravNudges ??
      false,
    communityReplies:
      u.notifPrefs
        ?.communityReplies ??
      false,
    progressReminder:
      u.notifPrefs
        ?.progressReminder ??
      false,
  },


  // Dates
  joined: u.createdAt
    ? new Date(
        u.createdAt
      ).toLocaleDateString()
    : "-",

  createdAt: u.createdAt || null,

  updatedAt: u.updatedAt
    ? new Date(
        u.updatedAt
      ).toLocaleString()
    : "-",

  lastActive: u.lastActiveDate
    ? new Date(
        u.lastActiveDate
      ).toLocaleDateString()
    : "-",

  lastActiveDate:
    u.lastActiveDate || null,

  // Raw data if needed later
  raw: u,
  history: res.missions || [],
  journal: res.journals || [],

  // ✅ THIS IS THE FIX
  subscription: res.subscription || null,
};

    setSelectedUser(formattedUser);
    setViewId(id);

  } catch (e) {
    showToast("Failed to load user", "error");
  } finally {
    setLoadingUser(false);
  }
};
  // Wrappers that match the (setUsers) signature the children expect.
  const setUsers = (next) => {
    if (typeof next === "function") {
      const updated = next(users);
      // Diff to figure out what changed
      const removed = users.filter(u => !updated.some(x => x.id === u.id));
      const statusChanged = updated.filter(u => {
        const prev = users.find(x => x.id === u.id);
        return prev && prev.status !== u.status;
      });
      // Persist mutations
      removed.forEach(u => api.users.delete(u.id).catch(()=>{}));
      statusChanged.forEach(u => api.users.update(u.id, { isActive: u.status === "active" }).catch(()=>{}));
      // Optimistic local update
      setData(rawUsers.filter(u => !removed.some(r => r.id === (u._id || u.id)))
                       .map(u => {
                         const id = u._id || u.id;
                         const change = statusChanged.find(c => c.id === id);
                         return change ? { ...u, isActive: change.status === "active" } : u;
                       }));
    }
  };

if (viewId !== null) {
  return (
    <UserDetail
      user={selectedUser || {}}   // ✅ always render
      users={users}
      setUsers={setUsers}
      onBack={() => {
        setViewId(null);
        setSelectedUser(null);
      }}
      showToast={showToast}
      loading={loadingUser} // optional
    />
  );
}
  if (loading && users.length === 0) {
    return (
      <div className="p-8 text-center text-[var(--textMuted)]" data-testid="users-loading">
        Loading users…
      </div>
    );
  }

  return (
<UserList
  users={users}
  setUsers={setUsers}
  onViewUser={handleViewUser} 
  showToast={showToast}
  reload={reload}
/>
  );
};
