/**
 * Scheduler.jsx
 * Simplified Mission Management Page
 * Only mission CRUD + CSV import/export
 */

import { useState, useEffect,useRef  } from "react";
import { Plus, Download, Upload, Pencil, Trash2 } from "../../lib/icons";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { profileLabel, MISSION_TYPES } from "../../lib/constants";

import {
  Button,
  Badge,
  Toggle,
  Modal,
  Confirm,
  Card,
  Input,
  Select,
  Pager,
} from "../ui/index";

import { Table } from "../ui/Table";
import { downloadCSV } from "../../lib/utils";

const PER = 10;

const SAMPLE_CSV = `day,title,profile,body
1,Understanding Your Pattern,all,reflection,3,Today we begin by simply noticing how money feels.
3,The Avoidance Map,avoider,mapping,3,We map exactly what you avoid and when.`;

/* ───────────────────────────────────────────── */
/* CSV IMPORT POPUP */
/* ───────────────────────────────────────────── */

const CsvPop = ({ open, onClose, existing, onImport }) => {
  const [text, setText] = useState("");
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  const parse = (raw) => {
    setText(raw);
    setErr("");
    setRows([]);

    if (!raw.trim()) return;

    const [header, ...lines] = raw.trim().split("\n");

    const keys = header
      .split(",")
      .map((k) => k.trim().toLowerCase());
console.log(keys);
    if (!keys.includes("day") || !keys.includes("title")) {
      setErr("Columns required: day, title");
      return;
    }

    const parsed = lines
      .map((l) => {
        const vals = l.split(",").map((v) => v.trim());

        return Object.fromEntries(
          keys.map((k, i) => [k, vals[i] || ""])
        );
      })
      .filter((r) => r.day && r.title);

    setRows(parsed);
  };
const fileRef = useRef(null);
const handleFileUpload = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.name.toLowerCase().endsWith(".csv")) {
    setErr("Please upload a CSV file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    parse(event.target.result);
  };

  reader.readAsText(file);
};
  const doImport = () => {
    const dups = rows.filter((r) =>
      existing.some(
        (e) =>
          e.day === Number(r.day) &&
          e.profile === (r.profile || "all")
      )
    );

    const newRows = rows
      .filter((r) => !dups.includes(r))
      .map((r, i) => ({
        id: Date.now() + i,
        day: Number(r.day),
        title: r.title,
        profile: r.profile || "all",
     
        body: r.body || "",
        active: true,
      }));

    onImport(newRows);

    setText("");
    setRows([]);
  };

  if (!open) return null;

 return (
  <div
    className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 bg-black/50"
    onClick={onClose}
  >
    <div
      className="w-full max-w-[560px] rounded-2xl p-4 sm:p-6 lg:p-7 max-h-[92vh] overflow-y-auto"
      style={{
        background: "var(--bgCard)",
        border: "1px solid var(--border)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        
        <h3 className="font-display font-bold text-[15px] sm:text-[17px] leading-snug text-[var(--text)] break-words">
          Import Missions from CSV
        </h3>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--textMuted)] hover:bg-[var(--bgMuted)] border-none cursor-pointer bg-transparent flex-shrink-0"
        >
          ✕
        </button>
      </div>

      {/* Info */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-xl mb-4"
        style={{
          background: "var(--tealBg)",
          border: "1px solid var(--tealBorder)",
        }}
      >
        <div className="text-[12px] leading-relaxed text-[var(--teal)] break-words">
          Required columns: <strong>day, title</strong>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            downloadCSV(
              SAMPLE_CSV,
              "missions_sample.csv"
            )
          }
          className="w-full sm:w-auto"
        >
          Sample CSV
        </Button>
      </div>
<div className="mb-3">
  <input
    ref={fileRef}
    type="file"
    accept=".csv"
    className="hidden"
    onChange={handleFileUpload}
  />

  <Button
    variant="outline"
    className="w-full"
    onClick={() => fileRef.current?.click()}
  >
    Choose CSV File
  </Button>
</div>
    

      {/* Errors */}
      {err && (
        <p className="text-[12px] leading-relaxed text-[var(--coral)] mb-3 break-words">
          ⚠ {err}
        </p>
      )}

      {/* Success */}
      {rows.length > 0 && (
        <p className="text-[12px] leading-relaxed text-[var(--teal)] mb-3 break-words">
          ✓ {rows.length} missions ready to import
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
        
        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>

        <Button
          disabled={!rows.length}
          className="w-full sm:flex-1"
          onClick={() => {
            doImport();
            onClose();
          }}
        >
          Import {rows.length || ""} Missions
        </Button>
      </div>
    </div>
  </div>
);
};

/* ───────────────────────────────────────────── */
/* ADD / EDIT POPUP */
/* ───────────────────────────────────────────── */

const MissionPop = ({
  open,
  onClose,
  initial,
  onSave,
}) => {
  const BLANK = {
    day: "",
    title: "",
    profile: "all",

    body: "",
  };

  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    if (initial) {
      setForm({
        day:
          initial.meta?.day !== undefined
            ? String(initial.meta.day)
            : "",

        title: initial.name || "",
        profile:
          initial.meta?.profile || "all",


        body: initial.body || "",
      });
    } else {
      setForm(BLANK);
    }
  }, [initial, open]);

  const set = (k, v) =>
    setForm((f) => ({ ...f, [k]: v }));

  if (!open) return null;

  return (
  <Modal
    open={open}
    onClose={onClose}
    title={initial ? "Edit Mission" : "Add Mission"}
    width={520}
  >
    {/* Form Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      
      <Input
        label="Day *"
        type="number"
        value={form.day}
        onChange={(e) =>
          set("day", e.target.value)
        }
      />

      <Select
        label="Profile"
        value={form.profile}
        onChange={(e) =>
          set("profile", e.target.value)
        }
      >
        <option value="all">
          All Profiles
        </option>

        <option value="avoider">
          Avoider
        </option>

        <option value="anxious">
          Anxious Manager
        </option>

        <option value="silent">
          Silent Stressor
        </option>
      </Select>

   
    </div>

    {/* Title */}
    <div className="mt-3">
      <Input
        label="Mission Title *"
        value={form.title}
        onChange={(e) =>
          set("title", e.target.value)
        }
      />
    </div>

    {/* Body */}
    <div className="mt-3">
      <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">
        Mission Body
      </label>

      <textarea
        rows={4}
        value={form.body}
        onChange={(e) =>
          set("body", e.target.value)
        }
        className="w-full rounded-xl p-3 text-[13px] font-sans bg-[var(--bgCard)] text-[var(--text)] resize-y outline-none"
        style={{
          border:
            "1.5px solid var(--border)",
        }}
      />
    </div>

    {/* Actions */}
    <div className="flex flex-col-reverse sm:flex-row gap-2.5 mt-5">
      
      <Button
        variant="ghost"
        onClick={onClose}
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>

      <Button
        className="w-full sm:flex-1"
        onClick={() => {
          if (
            !form.day ||
            !form.title
          )
            return;

          onSave(form);
          onClose();
        }}
      >
        {initial
          ? "Update Mission"
          : "Add Mission"}
      </Button>
    </div>
  </Modal>
);
};

/* ───────────────────────────────────────────── */
/* MAIN PAGE */
/* ───────────────────────────────────────────── */

export const AScheduler = ({ showToast }) => {
  const actionsApi = useApi(
    api.scheduler.actionList,
    { initial: [] }
  );

  const actions = actionsApi.data || [];

  const setActions = (next) =>
    actionsApi.setData(
      typeof next === "function"
        ? next(actions)
        : next
    );

  const [page, setPage] = useState(1);

  const [actPop, setActPop] = useState(false);

  const [csvPop, setCsvPop] = useState(false);

  const [target, setTarget] = useState(null);

  const [delId, setDelId] = useState(null);

  const apiPayload = (form) => ({
    name: form.title,
    body: form.body,

    trigger: "manual",

    channel: "push",

    audience: form.profile,

    active: true,

    meta: {
      day: Number(form.day),

      reflectionPrompt: form.body,

      profile: form.profile,

    },
  });

  const saveMission = async (form) => {
    try {
      if (target) {
        const r =
          await api.scheduler.actionUpdate(
            target._id,
            apiPayload(form)
          );

        const updated = r?.item;

        setActions((aa) =>
          aa.map((a) =>
            a._id === target._id
              ? updated
              : a
          )
        );

        showToast("Mission updated.");
      } else {
        const r =
          await api.scheduler.actionCreate(
            apiPayload(form)
          );

        const created = r?.item;

        setActions((aa) =>
          [...aa, created].sort(
            (a, b) =>
              (a.meta?.day || 0) -
              (b.meta?.day || 0)
          )
        );

        showToast("Mission created.");
      }
    } catch (e) {
      showToast(
        e?.data?.message ||
          "Save failed.",
        "error"
      );
    }

    setTarget(null);
  };

  const deleteMission = async (id) => {
    try {
      await api.scheduler.actionDelete(id);

      setActions((aa) =>
        aa.filter((a) => a._id !== id)
      );

      showToast("Mission deleted.");
    } catch (e) {
      showToast(
        e?.data?.message ||
          "Delete failed.",
        "error"
      );
    }
  };

  const toggleActive = async (a) => {
    try {
      await api.scheduler.actionUpdate(
        a._id,
        {
          active: !a.active,
        }
      );

      setActions((aa) =>
        aa.map((x) =>
          x._id === a._id
            ? {
                ...x,
                active: !x.active,
              }
            : x
        )
      );
    } catch (e) {
      showToast(
        e?.data?.message ||
          "Update failed.",
        "error"
      );
    }
  };

  const importRows = async (rows) => {
    try {
      await api.scheduler.actionImport(
        rows.map((r) => ({
          name: r.title,
          body: r.body || "",

          audience:
            r.profile || "all",

          channel: "push",

          meta: {
            day: Number(r.day),

            profile:
              r.profile || "all",

          
          },
        }))
      );

  await actionsApi.reload();

      showToast(
        `${rows.length} missions imported.`
      );
    } catch (e) {
      showToast(
        e?.data?.message ||
          "Import failed.",
        "error"
      );
    }
  };

  const COLS = [
    {
      key: "day",
      label: "Day",
      width: 60,

      render: (_, a) => (
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] text-white"
          style={{
            background: "var(--teal)",
          }}
        >
          D{a.meta?.day}
        </div>
      ),
    },

    {
      key: "name",
      label: "Mission",

      render: (_, a) => (
        <div>
          <div className="font-medium text-[13px] text-[var(--text)]">
            {a.name}
          </div>

          {a.body && (
            <div className="text-[11px] text-[var(--textMuted)] truncate max-w-[240px]">
              {a.body}
            </div>
          )}
        </div>
      ),
    },

    {
      key: "profile",
      label: "Profile",

      render: (_, a) => (
        <Badge
          label={
            a.meta?.profile === "all"
              ? "All"
              : profileLabel(
                  a.meta?.profile
                )
          }
          variant={
            a.meta?.profile === "all"
              ? "grey"
              : "teal"
          }
        />
      ),
    },

  

    {
      key: "active",
      label: "Active",

      render: (v, a) => (
        <Toggle
          checked={a.active}
          onChange={() =>
            toggleActive(a)
          }
        />
      ),
    },

    {
      key: "id",
      label: "",

      render: (_, a) => (
        <div className="flex gap-1">
          <Button
            size="xs"
            variant="ghost"
            icon={Pencil}
            onClick={() => {
              setTarget(a);
              setActPop(true);
            }}
          >
            Edit
          </Button>

          <Button
            size="xs"
            variant="danger"
            icon={Trash2}
            onClick={() =>
              setDelId(a._id)
            }
          >
            Del
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div data-testid="admin-scheduler">
      <div className="mb-5">
        <h1 className="font-display font-bold text-xl text-[var(--text)]">
          Missions Actions
        </h1>

      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-[13px] text-[var(--textMuted)]">
          <strong className="text-[var(--text)]">
            {actions.length}
          </strong>{" "}
          missions
        </span>

        <div className="flex gap-2">
      <Button
  size="sm"
  variant="ghost"
  icon={Download}
  onClick={() => {
    const csv = [
      [
        "day",
        "title",
        "profile",
 
        "body",
      ],

      ...actions.map((a) => [
        a.meta?.day || "",
        `"${a.name || ""}"`,
        a.meta?.profile || "all",
     
        `"${(a.body || "").replace(/"/g, '""')}"`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    downloadCSV(csv, "missions.csv");
  }}
>
  Export CSV
</Button>

          <Button
            size="sm"
            variant="ghost"
            icon={Upload}
            onClick={() => setCsvPop(true)}
          >
            Import CSV
          </Button>

          <Button
            size="sm"
            icon={Plus}
            onClick={() => {
              setTarget(null);
              setActPop(true);
            }}
          >
            Add Mission
          </Button>
        </div>
      </div>

      <Card noPad>
        <Table
          cols={COLS}
          rows={actions.slice(
            (page - 1) * PER,
            page * PER
          )}
          empty="No missions yet."
        />

        <div className="px-4">
          <Pager
            page={page}
            total={actions.length}
            perPage={PER}
            onChange={setPage}
          />
        </div>
      </Card>

      <MissionPop
        open={actPop}
        onClose={() => {
          setActPop(false);
          setTarget(null);
        }}
        initial={target}
        onSave={saveMission}
      />

      <CsvPop
        open={csvPop}
        onClose={() => setCsvPop(false)}
        existing={actions}
        onImport={importRows}
      />

      <Confirm
        open={!!delId}
        onClose={() => setDelId(null)}
        title="Delete Mission?"
        message="This mission will be permanently removed."
        danger
        confirmLabel="Delete"
        onConfirm={() =>
          deleteMission(delId)
        }
      />
    </div>
  );
};
