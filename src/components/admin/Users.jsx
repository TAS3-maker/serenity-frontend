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
  plan:         u.plan === "premium" ? "premium" : "free",
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
    const user = users.find(u => u.id === viewId);
    if (user) return (
      <UserDetail
        user={user}
        users={users}
        setUsers={setUsers}
        onBack={() => setViewId(null)}
        showToast={showToast}
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
      onViewUser={setViewId}
      showToast={showToast}
    />
  );
};
