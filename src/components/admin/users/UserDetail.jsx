import { useState } from "react";
import { ArrowLeft, Trash2, UserX } from "../../../lib/icons";
import { C } from "../../../tokens";
import {
  profileLabel,
  profileColor,
  profileVariant,
  planLabel,
  planVariant,
  STATUS_VARIANT
} from "../../../lib/constants";

import {
  Button,
  Badge,
  Card,
  Input,
  PwStrength,
  Confirm,
  Modal,
  Pager
} from "../../ui/index";

import { Table } from "../../ui/Table";

const TABS = ["Overview", "Missions", "Payments", "Journal", "Activity"];
const PER = 8;

export const UserDetail = ({ user = {}, users, setUsers, onBack, showToast }) => {
  const [tab, setTab] = useState("Overview");
  const [msnPage, setMsnPage] = useState(1);
  const [payPage, setPayPage] = useState(1);
  const [pwOpen, setPwOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

  const isInactive = user.status === "inactive";

  const pct = user.totalMissions
    ? Math.round((user.missionsComplete / user.totalMissions) * 100)
    : 0;

  const safe = (v, fallback = "-") => (v || v === 0 ? v : fallback);

  const mutate = (patch) =>
    setUsers((us) => us.map((u) => (u.id === user.id ? { ...u, ...patch } : u)));

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} className="mb-5 flex items-center gap-2 text-sm">
        <ArrowLeft size={15} /> Back to Users
      </button>

      {/* Hero */}
      <div className="rounded-2xl p-6 mb-4 border">
        <div className="flex gap-5 flex-wrap mb-5">

          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
            style={{
              background: `linear-gradient(135deg,${profileColor(user.profile)},${profileColor(user.profile)}99)`
            }}
          >
            {user.name?.[0] || "U"}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex gap-2 flex-wrap mb-2">
              <h2 className="text-xl font-bold">{safe(user.name)}</h2>

              <Badge label={profileLabel(user.profile)} variant={profileVariant(user.profile)} />
              <Badge label={planLabel(user.plan)} variant={planVariant(user.plan)} />
              <Badge label={user.status} variant={STATUS_VARIANT[user.status] || "grey"} />
            </div>

            <div className="text-sm text-gray-500">
              {safe(user.email)} · {safe(user.country)} · {safe(user.device)} · Joined {safe(user.joined)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setPwOpen(true)}>Change Password</Button>

            <Button
              size="sm"
              variant={isInactive ? "outline" : "secondary"}
              icon={UserX}
              onClick={() => {
                mutate({ status: isInactive ? "active" : "inactive" });
                showToast(`${user.name} ${isInactive ? "reactivated" : "deactivated"}`);
              }}
            >
              {isInactive ? "Reactivate" : "Deactivate"}
            </Button>

            <Button size="sm" variant="danger" icon={Trash2} onClick={() => setDelOpen(true)}>
              Delete
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-6 text-center border-t pt-4">
          <div><b>{safe(user.reliefScore, 0)}</b><div>Relief</div></div>
          <div><b>{safe(user.streak, 0)}</b><div>Streak</div></div>
          <div><b>{safe(user.day, 0)}</b><div>Day</div></div>
          <div><b>{user.missionsComplete || 0}/{user.totalMissions || 0}</b><div>Missions</div></div>
          <div><b>{safe(user.lastActive)}</b><div>Last Active</div></div>
          <div><b>${user.payments?.length || 0}</b><div>Revenue</div></div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div>Progress: {pct}%</div>
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-2 bg-green-400 rounded" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 p-2 ${tab === t ? "bg-teal-500 text-white" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card>
        {tab === "Overview" && (
          <div>
            <p>Email: {safe(user.email)}</p>
            <p>Plan: {safe(user.plan)}</p>
            <p>FCL: {safe(user.fcl)}</p>
            <p>Timezone: {safe(user.timezone)}</p>
          </div>
        )}

        {tab === "Missions" && (
          <Table
            cols={[
              { key: "dayNumber", label: "Day" },
              { key: "status", label: "Status" },
              {
                key: "completed",
                label: "Done",
                render: (v) => <Badge label={v ? "Yes" : "No"} variant={v ? "green" : "grey"} />
              }
            ]}
            rows={user.history || []}
            empty="No missions"
          />
        )}

        {tab === "Payments" && (
          <Table
            cols={[
              { key: "plan", label: "Plan" },
              { key: "status", label: "Status" }
            ]}
            rows={user.payments || []}
            empty="No subscription"
          />
        )}

        {tab === "Journal" && (
          <Table
            cols={[
              { key: "prompt", label: "Title" },
              { key: "content", label: "Content" }
            ]}
            rows={user.journal || []}
            empty="No journal entries"
          />
        )}

        {tab === "Activity" && (
          <div className="p-6 text-center text-gray-500">Coming soon</div>
        )}
      </Card>

      {/* Delete */}
      <Confirm
        open={delOpen}
        onClose={() => setDelOpen(false)}
        title="Delete User?"
        message="This will permanently delete the user."
        danger
        onConfirm={() => {
          showToast("User deleted");
          onBack();
        }}
      />
    </div>
  );
};