import { useState } from "react";

const dummyData = [
  {
    id: 1,
    name: "Sub Expiry → 3 Days",
    desc: "Sends 3 days before Premium subscription expires",
    lastRun: "Mar 16, 2026 09:00",
    nextRun: "Mar 19, 2026 09:00",
    active: true,
  },
];

export const ANotifications=()=> {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [selected, setSelected] = useState(null);

  const openCreate = () => {
    setMode("create");
    setSelected(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setMode("edit");
    setSelected(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
  };

  return (
    <div className="p-6 bg-[#f4f6f6] min-h-screen relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">Notification Scheduler</h1>
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
        {dummyData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow-sm border"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{item.name}</h3>
              <div className="w-10 h-5 bg-teal-600 rounded-full" />
            </div>

            <p className="text-sm text-gray-500 mt-2">{item.desc}</p>

            <div className="flex gap-3 mt-3 text-xs">
              <span className="bg-gray-200 px-2 py-1 rounded">
                Last run: {item.lastRun}
              </span>
              <span className="bg-teal-100 px-2 py-1 rounded">
                Next run: {item.nextRun}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEdit(item)}
                className="px-3 py-1 border rounded text-sm"
              >
                Edit
              </button>

              <button className="px-3 py-1 bg-teal-700 text-white rounded text-sm">
                Send now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== */}
      {/* MODAL */}
      {/* ===================== */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          {/* Modal Card */}
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {mode === "create" ? "New Scheduler" : "Edit Scheduler"}
            </h2>

            <div className="space-y-4">

              <div>
                <label className="text-xs text-gray-500">Name</label>
                <input
                  defaultValue={selected?.name || ""}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Description</label>
                <textarea
                  defaultValue={selected?.desc || ""}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Schedule Box */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-semibold text-teal-700 mb-3">
                  Schedule Timing
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <select className="border p-2 rounded">
                    <option>Offset from event</option>
                  </select>

                  <select className="border p-2 rounded">
                    <option>Before</option>
                    <option>After</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Days"
                    className="border p-2 rounded"
                  />

                  <select className="border p-2 rounded">
                    <option>Timezone</option>
                  </select>

                  <input
                    type="time"
                    className="border p-2 rounded col-span-2"
                  />
                </div>
              </div>

              {/* More fields */}
              <div className="grid grid-cols-2 gap-3">
                <select className="border p-2 rounded">
                  <option>Trigger Event</option>
                </select>

                <select className="border p-2 rounded">
                  <option>Channel</option>
                </select>

                <select className="border p-2 rounded">
                  <option>Audience</option>
                </select>

                <select className="border p-2 rounded">
                  <option>Email Template</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button className="px-4 py-2 bg-teal-700 text-white rounded">
                  Save Scheduler
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}