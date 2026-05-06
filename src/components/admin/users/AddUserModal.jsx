import { useState } from "react";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi.js";
import { useMutation } from "../../../lib/useApi";
export const AddUserModal = ({
  open,
  onClose,
  onSuccess,
  showToast,
  reload, // optional if you want auto refresh
}) => {
const mutate = useMutation(showToast, reload);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    plan: "free",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      return showToast("Name, email and password required.", "error");
    }

    try {
      setLoading(true);

      const res = await mutate(
        api.admin.createUser(form),
        "User created successfully."
      );

      const newUser = res?.user || res?.item;

      if (newUser) {
        onSuccess?.(newUser); // update UI instantly
      }

      await reload()
      onClose();
      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
        plan: "free",
        phone: "",
      });

    } catch (err) {
      // already handled by useMutation
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Add User</h2>

        <div className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
            value={form.name}
            onChange={e => update("name", e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={e => update("email", e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={e => update("password", e.target.value)}
          />

          <input
            placeholder="Phone (optional)"
            className="w-full border px-3 py-2 rounded"
            value={form.phone}
            onChange={e => update("phone", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              className="border p-2 rounded"
              value={form.role}
              onChange={e => update("role", e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>

            <select
              className="border p-2 rounded"
              value={form.plan}
              onChange={e => update("plan", e.target.value)}
            >
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              onClick={submit}
              disabled={loading}
              className="px-4 py-2 bg-teal-700 text-white rounded"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};