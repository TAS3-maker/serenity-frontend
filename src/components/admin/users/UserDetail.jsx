import { useState,useEffect  } from "react";
import { ArrowLeft, Trash2, UserX } from "../../../lib/icons";
import {profileLabel, profileColor, profileVariant, planLabel, planVariant, STATUS_VARIANT,} from "../../../lib/constants";
import { api } from "../../../lib/api";
import {Button, Badge, Card, Confirm, Table,Modal ,Input ,Select} from "../../ui/index";

const TABS = [
  "Overview",
  "Missions",
  "Subscription",
  "Journal",
  "Activity",
];

export const UserDetail = ({
  user = {},
  users,
  setUsers,
  setSelectedUser,
    refreshUser,
  onBack,
  showToast,
}) => {
  const [tab, setTab] =
    useState("Overview");

  const [delOpen, setDelOpen] =
    useState(false);
const [editOpen, setEditOpen] = useState(false);

const [editForm, setEditForm] = useState({
  name: user.name || "",
  email: user.email || "",
  phone: user.phone || "",
  status: user.status || "active",
  plan: user.plan || "free",
});
  const [refundLoading, setRefundLoading] =
    useState(false);

  const isInactive =
    user.status === "inactive";

  const safe = (
    v,
    fallback = "-"
  ) =>
    v || v === 0
      ? v
      : fallback;

  const mutate = (patch) =>
    setUsers((us) =>
      us.map((u) =>
        u.id === user.id
          ? {
              ...u,
              ...patch,
            }
          : u
      )
    );

  const subscription =
    user.subscription ||
    null;

  const formatDate = (
    d
  ) => {
    if (!d) return "-";

    try {
      return new Date(
        d
      ).toLocaleString();
    } catch {
      return "-";
    }
  };

  const formatMoney = (
    amount,
    currency = "usd"
  ) => {
    if (
      amount == null
    )
      return "-";

    return `${currency.toUpperCase()} ${amount}`;
  };

  const handleRefund =
    async () => {
      try {
        if (
          !subscription?._id
        ) {
          showToast(
            "Subscription not found",
            "error"
          );
          return;
        }

        setRefundLoading(
          true
        );

        await api.admin.refundSubscription(
          subscription._id
        );

        showToast(
          "Refund initiated successfully"
        );

        // update local UI
        user.subscription =
          null;
        user.plan =
          "free";
      } catch (e) {
        showToast(
          e?.data
            ?.message ||
            "Refund failed",
          "error"
        );
      } finally {
        setRefundLoading(
          false
        );
      }
    };
useEffect(() => {
  setEditForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    status: user.status || "active",
    plan: user.plan || "free",
  });
}, [user]);
const handleSaveUser = async () => {
  try {
    const userId = user.id || user._id;

    await api.users.update(userId, {
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      plan: editForm.plan,

      // IMPORTANT
      isActive:
        editForm.status === "active",
    });

    await refreshUser(userId);

    showToast(
      "User updated successfully"
    );

    setEditOpen(false);
  } catch (e) {
    showToast(
      e?.data?.message ||
        "Update failed",
      "error"
    );
  }
};


  return (
    <div>
      {/* Back */}
      <button
        onClick={
          onBack
        }
        className="mb-5 flex items-center gap-2 text-sm"
      >
        <ArrowLeft
          size={15}
        />
        Back to Users
      </button>

      {/* HERO */}
      <div className="rounded-2xl p-6 mb-4 border">
        <div className="flex gap-5 flex-wrap mb-5">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold overflow-hidden"
            style={{
              background: `linear-gradient(135deg,${profileColor(
                user.profile
              )},${profileColor(
                user.profile
              )}99)`,
            }}
          >
            {user.avatarUrl ? (
              <img
                src={
                  user.avatarUrl
                }
                alt={
                  user.name
                }
                className="w-full h-full object-cover"
              />
            ) : (
              user.name?.[0] ||
              "U"
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex gap-2 flex-wrap mb-2">
              <h2 className="text-xl font-bold">
                {safe(
                  user.name
                )}
              </h2>

              <Badge
                label={profileLabel(
                  user.profile
                )}
                variant={profileVariant(
                  user.profile
                )}
              />

              <Badge
                label={planLabel(
                  user.plan
                )}
                variant={planVariant(
                  user.plan
                )}
              />

              <Badge
                label={
                  user.status
                }
                variant={
                  STATUS_VARIANT[
                    user.status
                  ] ||
                  "grey"
                }
              />
            </div>

            <div className="text-sm text-gray-500">
              {safe(
                user.email
              )}{" "}
              ·{" "}
              {safe(
                user.country
              )}{" "}
              ·{" "}
              {safe(
                user.device
              )}{" "}
              · Joined{" "}
              {safe(
                user.joined
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
              <Button
    size="sm"
    variant="primary"
    onClick={() => setEditOpen(true)}
  >
    Edit
  </Button>

            

            <Button
              size="sm"
              variant="danger"
              icon={
                Trash2
              }
              onClick={() =>
                setDelOpen(
                  true
                )
              }
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-6 text-center border-t pt-4">
          <div>
            <b>
              {safe(
                user.reliefScore,
                0
              )}
            </b>
            <div>
              Relief
            </div>
          </div>

          <div>
            <b>
              {safe(
                user.streak,
                0
              )}
            </b>
            <div>
              Streak
            </div>
          </div>

          <div>
            <b>
              {safe(
                user.day,
                0
              )}
            </b>
            <div>
              Day
            </div>
          </div>

          <div>
            <b>
              {user.missionsComplete ||
                0}
              /
              {user.totalMissions ||
                0}
            </b>
            <div>
              Missions
            </div>
          </div>

          <div>
            <b>
              {safe(
                user.lastActive
              )}
            </b>
            <div>
              Last Active
            </div>
          </div>

          <div>
            <b>
              {subscription?.amount
                ? formatMoney(
                    subscription.amount,
                    subscription.currency
                  )
                : 0}
            </b>
            <div>
              Revenue
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex mb-4">
        {TABS.map(
          (t) => (
            <button
              key={t}
              onClick={() =>
                setTab(
                  t
                )
              }
              className={`flex-1 p-2 ${
                tab ===
                t
                  ? "bg-teal-500 text-white"
                  : ""
              }`}
            >
              {t}
            </button>
          )
        )}
      </div>

      <Card>
        {/* OVERVIEW */}
        {/* OVERVIEW */}
{tab === "Overview" && (
  <div className="grid grid-cols-2 gap-4">

    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-3">
        Basic Info
      </h3>

      <div className="space-y-2 text-sm">
        <p><b>Name:</b> {safe(user.name)}</p>
        <p><b>Email:</b> {safe(user.email)}</p>
        <p><b>Phone:</b> {safe(user.phone)}</p>
        <p><b>Role:</b> {safe(user.role)}</p>
        <p><b>Status:</b> {safe(user.status)}</p>
        <p><b>Plan:</b> {safe(user.plan)}</p>
      </div>
    </div>

    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-3">
        Progress
      </h3>

      <div className="space-y-2 text-sm">
        <p><b>Program Day:</b> {safe(user.programDay, 0)}</p>
        <p><b>Total Missions:</b> {safe(user.totalMissions, 30)}</p>
        <p><b>Missions Completed:</b> {safe(user.missionsComplete, 0)}</p>
        <p><b>Streak:</b> {safe(user.streak, 0)}</p>
        <p><b>Last Streak:</b> {safe(user.lastStreak, 0)}</p>
        <p><b>Relief Score:</b> {safe(user.reliefScore, 0)}</p>
        <p><b>Weekly Calm Score:</b> {safe(user.weeklyCalmScore, 0)}</p>
      </div>
    </div>

    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-3">
        Mental Profile
      </h3>

      <div className="space-y-2 text-sm">
        <p><b>Stress Profile:</b> {safe(user.stressProfile)}</p>
        <p><b>FCL:</b> {safe(user.fcl)}</p>
        <p><b>Aarav Tone:</b> {safe(user.aaravTone)}</p>
        <p>
          <b>Assessment Done:</b>{" "}
          {user.assessmentDone
            ? "Yes"
            : "No"}
        </p>
      </div>
    </div>

    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-3">
        Account Details
      </h3>

      <div className="space-y-2 text-sm">
        <p><b>Timezone:</b> {safe(user.timezone)}</p>
        <p><b>Language:</b> {safe(user.language)}</p>
        <p><b>Joined:</b> {safe(user.joined)}</p>
        <p><b>Last Active:</b> {safe(user.lastActive)}</p>
        <p><b>Updated At:</b> {safe(user.updatedAt)}</p>
      </div>
    </div>

    <div className="col-span-2 p-4 border rounded-lg">
      <h3 className="font-semibold mb-3">
        Notification Preferences
      </h3>

      <div className="grid grid-cols-4 gap-3 text-sm">
        <p>📧 Email: {user.notifPrefs?.emailEnabled ? "On" : "Off"}</p>
        <p>📱 Push: {user.notifPrefs?.pushEnabled ? "On" : "Off"}</p>
        <p>📩 SMS: {user.notifPrefs?.smsEnabled ? "On" : "Off"}</p>
        <p>🎯 Daily Mission: {user.notifPrefs?.dailyMission ? "On" : "Off"}</p>
        <p>🔥 Streak Reminder: {user.notifPrefs?.streakReminder ? "On" : "Off"}</p>
        <p>🤖 Aarav Nudges: {user.notifPrefs?.aaravNudges ? "On" : "Off"}</p>
        <p>💬 Community Replies: {user.notifPrefs?.communityReplies ? "On" : "Off"}</p>
        <p>⏰ Progress Reminder: {user.notifPrefs?.progressReminder ? "On" : "Off"}</p>
      </div>
    </div>

  </div>
)}

        {/* MISSIONS */}
        {tab ===
          "Missions" && (
          <Table
            cols={[
              {
                key: "dayNumber",
                label:
                  "Day",
              },
              {
                key: "completed",
                label:
                  "Status",
                render:
                  (
                    v
                  ) => (
                    <Badge
                      label={
                        v
                          ? "Completed"
                          : "Pending"
                      }
                      variant={
                        v
                          ? "green"
                          : "grey"
                      }
                    />
                  ),
              },
              {
                key: "response",
                label:
                  "Response",
                render:
                  (
                    v
                  ) =>
                    v ||
                    "-",
              },
              {
                key: "completedDate",
                label:
                  "Completed Date",
                render:
                  (
                    v
                  ) =>
                    v ||
                    "-",
              },
            ]}
            rows={
              user.history ||
              []
            }
            empty="No missions found"
          />
        )}

        {/* SUBSCRIPTION */}
        {tab ===
          "Subscription" && (
          <div className="space-y-4">
            {!subscription ? (
              <div className="text-center text-gray-500 py-6">
                No active
                subscription
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded">
                    <b>
                      Status
                    </b>
                    <div>
                      {subscription.status ||
                        "-"}
                    </div>
                  </div>

                  <div className="p-3 border rounded">
                    <b>
                      Plan ID
                    </b>
                    <div>
                      {subscription.planId ||
                        "-"}
                    </div>
                  </div>

                  <div className="p-3 border rounded">
                    <b>
                      Amount
                    </b>
                    <div>
                      {formatMoney(
                        subscription.amount,
                        subscription.currency
                      )}
                    </div>
                  </div>

                  <div className="p-3 border rounded">
                    <b>
                      Stripe
                      Subscription
                    </b>
                    <div className="text-xs break-all">
                      {subscription.stripeSubscriptionId ||
                        "-"}
                    </div>
                  </div>

                  <div className="p-3 border rounded">
                    <b>
                      Start
                      Date
                    </b>
                    <div>
                      {formatDate(
                        subscription.startDate
                      )}
                    </div>
                  </div>

                  <div className="p-3 border rounded">
                    <b>
                      End
                      Date
                    </b>
                    <div>
                      {formatDate(
                        subscription.endDate
                      )}
                    </div>
                  </div>
                </div>

                {/* {subscription.status ===
                  "active" && (
                  <div className="flex justify-end pt-4">
                    <Button
                      variant="danger"
                      loading={
                        refundLoading
                      }
                      onClick={
                        handleRefund
                      }
                    >
                      {refundLoading
                        ? "Processing..."
                        : "Refund Subscription"}
                    </Button>
                  </div>
                )} */}
              </>
            )}
          </div>
        )}

        {/* JOURNAL */}
        {tab ===
          "Journal" && (
          <Table
            cols={[
              {
                key: "mood",
                label:
                  "Mood",
                render:
                  (
                    v
                  ) => (
                    <Badge
                      label={
                        v ||
                        "-"
                      }
                      variant="grey"
                    />
                  ),
              },
              {
                key: "prompt",
                label:
                  "Prompt",
              },
              {
                key: "content",
                label:
                  "Content",
              },
              {
                key: "createdAt",
                label:
                  "Created At",
                render:
                  (
                    v
                  ) =>
                    formatDate(
                      v
                    ),
              },
            ]}
            rows={
              user.journal ||
              []
            }
            empty="No journal entries"
          />
        )}

        {/* ACTIVITY */}
        {tab ===
          "Activity" && (
          <div className="p-6 text-center text-gray-500">
            Coming soon
          </div>
        )}
      </Card>
<Modal
  open={editOpen}
  onClose={() => setEditOpen(false)}
  title="Edit User"
>
  <div className="space-y-3">

    <Input
      label="Name"
      value={editForm.name}
      onChange={(e) =>
        setEditForm((p) => ({
          ...p,
          name: e.target.value,
        }))
      }
    />

    <Input
      label="Email"
      value={editForm.email}
      onChange={(e) =>
        setEditForm((p) => ({
          ...p,
          email: e.target.value,
        }))
      }
    />

    <Input
      label="Phone"
      value={editForm.phone}
      onChange={(e) =>
        setEditForm((p) => ({
          ...p,
          phone: e.target.value,
        }))
      }
    />

    <Select
      label="Status"
      value={editForm.status}
      onChange={(e) =>
        setEditForm((p) => ({
          ...p,
          status: e.target.value,
        }))
      }
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </Select>

    <Select
      label="Plan"
      value={editForm.plan}
      onChange={(e) =>
        setEditForm((p) => ({
          ...p,
          plan: e.target.value,
        }))
      }
    >
      <option value="annually">Annually</option>
      <option value="monthly">Monthly</option>
    </Select>

    <div className="flex justify-end gap-2 pt-3">
      <Button
        variant="ghost"
        onClick={() => setEditOpen(false)}
      >
        Cancel
      </Button>

      <Button onClick={handleSaveUser}>
        Save Changes
      </Button>
    </div>
  </div>
</Modal>
      {/* DELETE */}
      <Confirm
        open={
          delOpen
        }
        onClose={() =>
          setDelOpen(
            false
          )
        }
        title="Delete User?"
        message="This will permanently delete the user."
        danger
        onConfirm={() => {
          showToast(
            "User deleted"
          );
          onBack();
        }}
      />
    </div>
  );
};
