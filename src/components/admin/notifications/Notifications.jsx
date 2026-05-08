import { useState } from "react";
import { api } from "../../../lib/api";
import {
  useApi,
  useMutation,
} from "../../../lib/useApi";

export const ANotifications = ({
  showToast,
}) => {
  // =====================================
  // API DATA
  // =====================================

  const {
    data: items = [],
    loading,
    reload,
    setData,
  } = useApi(
    api.scheduler.cronList,
    {
      initial: [],
    }
  );

  const mutate = useMutation(
    showToast,
    reload
  );

  // =====================================
  // UI STATE
  // =====================================

  const [modalOpen, setModalOpen] =
    useState(false);

  const [mode, setMode] =
    useState("create");

  const [selected, setSelected] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  const emptyForm = {
    name: "",
    description: "",

    trigger: "",
    channel: "inapp",

    audience: "all",

    template: "",

    offsetDays: 0,

    direction: "before",

    timezone: "Asia/Kolkata",

    time: "09:00",

    active: true,
  };

  const [form, setForm] =
    useState(emptyForm);

  // =====================================
  // HELPERS
  // =====================================

  const sf = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

  const closeModal = () => {
    setModalOpen(false);

    setSelected(null);

    setForm(emptyForm);
  };

  // =====================================
  // CREATE
  // =====================================

  const openCreate = () => {
    setMode("create");

    setSelected(null);

    setForm(emptyForm);

    setModalOpen(true);
  };

  // =====================================
  // EDIT
  // =====================================

  const openEdit = (item) => {
    setMode("edit");

    setSelected(item);

    setForm({
      name: item.name || "",
      description:
        item.description || "",

      trigger: item.trigger || "",

      channel:
        item.channel || "inapp",

      audience:
        item.audience || "all",

      template:
        item.template || "",

      offsetDays:
        item.offsetDays || 0,

      direction:
        item.direction || "before",

      timezone:
        item.timezone ||
        "Asia/Kolkata",

      time: item.time || "09:00",

      active:
        item.active ?? true,
    });

    setModalOpen(true);
  };

  // =====================================
  // SAVE
  // =====================================

  const saveScheduler = async () => {
    try {
      setSaving(true);

      if (mode === "create") {
        await mutate(
          api.scheduler.cronCreate(
            form
          ),
          "Scheduler created"
        );
      } else {
        await mutate(
          api.scheduler.cronUpdate(
            selected._id,
            form
          ),
          "Scheduler updated"
        );
      }

      closeModal();
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // DELETE
  // =====================================

  const removeScheduler = async (
    id
  ) => {
    const ok = window.confirm(
      "Delete this scheduler?"
    );

    if (!ok) return;

    await mutate(
      api.scheduler.cronDelete(id),
      "Scheduler deleted"
    );
  };

  // =====================================
  // TOGGLE ACTIVE
  // =====================================

  const toggleActive = async (
    item
  ) => {
    // optimistic update
    setData((prev) =>
      prev.map((x) =>
        x._id === item._id
          ? {
              ...x,
              active: !x.active,
            }
          : x
      )
    );

    try {
      await mutate(
        api.scheduler.cronUpdate(
          item._id,
          {
            active: !item.active,
          }
        ),
        item.active
          ? "Scheduler disabled"
          : "Scheduler enabled"
      );
    } catch {
      reload();
    }
  };

  // =====================================
  // RUN NOW
  // =====================================

  const runNow = async (item) => {
    await mutate(
      api.scheduler.cronRun(item._id),
      "Scheduler triggered"
    );
  };

  return (
    <div className="p-6 bg-[#f4f6f6] min-h-screen relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">
            Notification Scheduler
          </h1>

          <p className="text-xs text-gray-500">
            Automated emails and push notifications
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
        >
          New Scheduler
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {loading ? (
          <div className="bg-white p-6 rounded-xl border text-sm text-gray-500">
            Loading schedulers...
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white p-6 rounded-xl border text-sm text-gray-500">
            No schedulers found.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow-sm border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {
                      item.description
                    }
                  </p>
                </div>

                {/* toggle */}
                <button
                  onClick={() =>
                    toggleActive(item)
                  }
                  className={`w-12 h-6 rounded-full transition ${
                    item.active
                      ? "bg-teal-600"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition ${
                      item.active
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* meta */}
              <div className="flex gap-3 mt-3 text-xs flex-wrap">

                <span className="bg-gray-200 px-2 py-1 rounded">
                  Trigger:{" "}
                  {item.trigger ||
                    "—"}
                </span>

                <span className="bg-gray-200 px-2 py-1 rounded">
                  Channel:{" "}
                  {item.channel}
                </span>

                <span className="bg-gray-200 px-2 py-1 rounded">
                  Audience:{" "}
                  {item.audience}
                </span>

                <span className="bg-teal-100 px-2 py-1 rounded">
                  Time: {item.time}
                </span>
              </div>

              {/* actions */}
              <div className="flex gap-2 mt-4">

                <button
                  onClick={() =>
                    openEdit(item)
                  }
                  className="px-3 py-1 border rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    runNow(item)
                  }
                  className="px-3 py-1 bg-teal-700 text-white rounded text-sm"
                >
                  Send now
                </button>

                <button
                  onClick={() =>
                    removeScheduler(
                      item._id
                    )
                  }
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ===================================== */}
      {/* MODAL */}
      {/* ===================================== */}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {mode === "create"
                ? "New Scheduler"
                : "Edit Scheduler"}
            </h2>

            <div className="space-y-4">

              <input
                value={form.name}
                onChange={(e) =>
                  sf(
                    "name",
                    e.target.value
                  )
                }
                placeholder="Scheduler name"
                className="w-full border px-3 py-2 rounded"
              />

              <textarea
                value={
                  form.description
                }
                onChange={(e) =>
                  sf(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Description"
                className="w-full border px-3 py-2 rounded"
              />

              <div className="grid grid-cols-2 gap-3">

                <select
                  value={form.trigger}
                  onChange={(e) =>
                    sf(
                      "trigger",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option value="">
                    Trigger Event
                  </option>

                  <option value="subscription_expiry">
                    Subscription Expiry
                  </option>

                  <option value="streak_reminder">
                    Streak Reminder
                  </option>

                  <option value="inactive_users">
                    Inactive Users
                  </option>
                </select>

                <select
                  value={form.channel}
                  onChange={(e) =>
                    sf(
                      "channel",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option value="inapp">
                    In App
                  </option>

                  <option value="push">
                    Push
                  </option>

                  <option value="email">
                    Email
                  </option>
                </select>

                <select
                  value={form.audience}
                  onChange={(e) =>
                    sf(
                      "audience",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option value="all">
                    All Users
                  </option>

                  <option value="premium">
                    Premium
                  </option>

                  <option value="free">
                    Free
                  </option>
                </select>

                <input
                  value={
                    form.template
                  }
                  onChange={(e) =>
                    sf(
                      "template",
                      e.target.value
                    )
                  }
                  placeholder="Template"
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  value={
                    form.offsetDays
                  }
                  onChange={(e) =>
                    sf(
                      "offsetDays",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Offset days"
                  className="border p-2 rounded"
                />

                <select
                  value={
                    form.direction
                  }
                  onChange={(e) =>
                    sf(
                      "direction",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option value="before">
                    Before
                  </option>

                  <option value="after">
                    After
                  </option>
                </select>

                <input
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    sf(
                      "time",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded col-span-2"
                />
              </div>

              <div className="flex justify-between mt-6">

                <button
                  onClick={
                    closeModal
                  }
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    saveScheduler
                  }
                  disabled={saving}
                  className="px-4 py-2 bg-teal-700 text-white rounded"
                >
                  {saving
                    ? "Saving..."
                    : "Save Scheduler"}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};