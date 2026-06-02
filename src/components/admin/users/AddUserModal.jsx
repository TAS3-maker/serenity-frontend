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
    plan: "monthly",
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
        plan: "monthly",
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
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4">
    
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 text-sm sm:text-base"
      >
        ✕
      </button>

      <h2 className="text-base sm:text-lg font-semibold mb-4 pr-6">
        Add User
      </h2>

      <div className="space-y-4">

        <input
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
        />

        <input
          placeholder="Phone (optional)"
          className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <select
            className="border p-2 rounded text-sm sm:text-base w-full"
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>

          <select
            className="border p-2 rounded text-sm sm:text-base w-full"
            value={form.plan}
            onChange={(e) => update("plan", e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-4">
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border rounded text-sm sm:text-base"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 bg-teal-700 text-white rounded text-sm sm:text-base"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </div>

      </div>
    </div>
  </div>
);
};
