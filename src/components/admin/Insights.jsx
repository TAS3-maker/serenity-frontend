import { useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
} from "../../lib/icons";

import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";

import {
  Button,
  Card,
  Modal,
  Confirm,
  Input,
  Pager,
} from "../ui";

import { Table } from "../ui/Table";

const PER_PAGE = 10;

const BLANK = {
  quote: "",
  author: "",
  scheduledFor: "",
  order: 0,
};

function Insights({ showToast }) {
const insightsApi = useApi(
  () => api.insights.list({ page: 1, perPage: 200 }),
  { initial: [] }
);

const rows = insightsApi.data || [];

  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState(BLANK);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return rows.slice(start, start + PER_PAGE);
  }, [rows, page]);

  const setField = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
  };

  const openCreate = () => {
    setEditing(null);
    setForm(BLANK);
    setOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);

    setForm({
      quote: item.quote || "",
      author: item.author || "",
      scheduledFor: item.scheduledFor
        ? new Date(item.scheduledFor).toISOString().slice(0, 10)
        : "",
      order: item.order || 0,
    });

    setOpen(true);
  };

  const saveInsight = async () => {
    if (!form.quote.trim()) {
      showToast?.("Quote is required.", "error");
      return;
    }

    try {
      const payload = {
        quote: form.quote,
        author: form.author,
        order: Number(form.order) || 0,
        scheduledFor: form.scheduledFor || null,
      };

      if (editing) {
        await api.insights.update(editing._id, payload);
        showToast?.("Insight updated.");
      } else {
        await api.insights.create(payload);
        showToast?.("Insight created.");
      }

      insightsApi.reload();

      setOpen(false);
      setEditing(null);
      setForm(BLANK);
    } catch (e) {
      showToast?.(
        e?.data?.message || "Failed to save insight.",
        "error"
      );
    }
  };

  const rotateInsights = async () => {
    try {
      const res = await api.insights.rotate();

      showToast?.(
        res?.message || res?.data?.message || "Insights rotated."
      );

      insightsApi.reload();
    } catch (e) {
      showToast?.(
        e?.data?.message || "Rotation failed.",
        "error"
      );
    }
  };

  const COLS = [
    {
      key: "quote",
      label: "Quote",
      render: (v) => (
        <div className="max-w-[500px]">
          <div className="font-medium text-[13px] text-[var(--text)] line-clamp-2">
            {v}
          </div>
        </div>
      ),
    },

    {
      key: "author",
      label: "Author",
      render: (v) => (
        <span className="text-[12px] text-[var(--textMuted)]">
          {v || "—"}
        </span>
      ),
    },

    {
      key: "scheduledFor",
      label: "Scheduled",
      render: (v) => (
        <span className="text-[12px] text-[var(--textMuted)]">
          {v
            ? new Date(v).toLocaleDateString()
            : "Not Scheduled"}
        </span>
      ),
    },

    {
      key: "usedOn",
      label: "Used",
      render: (v) => (
        <span className="text-[12px] text-[var(--textMuted)]">
          {v
            ? new Date(v).toLocaleDateString()
            : "No"}
        </span>
      ),
    },

    {
      key: "order",
      label: "Order",
      render: (v) => (
        <span className="text-[12px] font-medium">
          {v || 0}
        </span>
      ),
    },

    {
      key: "_id",
      label: "",
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            size="xs"
            variant="ghost"
            icon={Pencil}
            onClick={() => openEdit(row)}
          >
            Edit
          </Button>

          <Button
            size="xs"
            variant="danger"
            icon={Trash2}
            onClick={() => setDeleteId(row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">
            Daily Insights
          </h1>

          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">
            Manage daily quotes and rotating insights.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            icon={RefreshCw}
            onClick={rotateInsights}
          >
            Rotate Tomorrow
          </Button>

          <Button
            icon={Plus}
            onClick={openCreate}
          >
            Add Insight
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card noPad>
        <Table
          cols={COLS}
          rows={paginated}
          loading={insightsApi.loading}
        />

        <div className="px-4">
          <Pager
            page={page}
            total={rows.length}
            perPage={PER_PAGE}
            onChange={setPage}
          />
        </div>
      </Card>

      {/* Create / Edit */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        title={editing ? "Edit Insight" : "Add Insight"}
      >
        <div className="space-y-3">
          <Input
            label="Quote *"
            value={form.quote}
            onChange={(e) =>
              setField("quote", e.target.value)
            }
            placeholder="Enter insight quote"
          />

          <Input
            label="Author"
            value={form.author}
            onChange={(e) =>
              setField("author", e.target.value)
            }
            placeholder="Author name"
          />

          <Input
            label="Schedule Date"
            type="date"
            value={form.scheduledFor}
            onChange={(e) =>
              setField("scheduledFor", e.target.value)
            }
          />

          <Input
            label="Order"
            type="number"
            value={form.order}
            onChange={(e) =>
              setField("order", e.target.value)
            }
          />
        </div>

        <div className="flex gap-2 mt-5">
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              setEditing(null);
            }}
          >
            Cancel
          </Button>

          <Button
            className="flex-1"
            onClick={saveInsight}
          >
            {editing ? "Update Insight" : "Create Insight"}
          </Button>
        </div>
      </Modal>

      {/* Delete */}
      <Confirm
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Insight?"
        message="This insight will be permanently removed."
        danger
        confirmLabel="Delete"
        onConfirm={async () => {
          try {
            await api.insights.delete(deleteId);

            showToast?.("Insight deleted.");

            insightsApi.reload();
          } catch (e) {
            showToast?.(
              e?.data?.message || "Delete failed.",
              "error"
            );
          }
        }}
      />
    </div>
  );
}

export default Insights;