import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Play } from "../../../lib/icons";
import { C } from "../../../tokens";
import { api } from "../../../lib/api";
import { CHANNELS, TIMEZONES, PROGRAMS } from "../../../lib/constants";
import {
  Button,
  Badge,
  Toggle,
  Modal,
  Confirm,
  Input,
  Select,
} from "../../ui/index";

const TOTAL = 1284;
const PREM = 221;
const FREE = 1063;

const PROFILE_PCT = {
  avoider: 0.48,
  anxious: 0.32,
  silent: 0.2,
};

const planBase = (plan) => {
  if (plan === "premium") return PREM;
  if (plan === "free") return FREE;
  return TOTAL;
};

export const calcAud = (profile, plan) => {
  const base = planBase(plan);
  return PROFILE_PCT[profile] ? Math.round(base * PROFILE_PCT[profile]) : base;
};

// ─── Helpers ───────────────────────────────────────────────────
const mapCronFromApi = (item) => ({
  id: item?._id,

  name: item?.name || "",

  profile: item?.profile || item?.audience || "all",

  plan: item?.plan || "all",

  channel: item?.channel || "email",

  time: item?.runTime || "09:00",

  tz: item?.timezone || "UTC",

  program: item?.program || "7day",

  active: item?.active ?? true,

  sentToday: item?.sentToday || 0,

  totalDelivered: item?.sent || item?.totalDelivered || 0,

  progress: item?.progress || 0,

  nextRun: item?.active ? `Tomorrow ${item?.runTime || "09:00"}` : "Paused",

  trigger: item?.trigger || "manual",

  scheduleType: item?.scheduleType || "cron",

  offsetDays: item?.offsetDays || 0,
});

// ─── Cron form popup ───────────────────────────────────────────
const CronPop = ({ open, onClose, initial, actions, onSave }) => {
  const BLANK = {
    name: "",
    profile: "all",
    plan: "all",
    channel: "email",
    time: "09:00",
    tz: "UTC",
    program: "7day",
  };

  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial?.name || "",

        profile: initial?.profile || "all",

        plan: initial?.plan || "all",

        channel: initial?.channel || "email",

        time: initial?.time || initial?.runTime || "09:00",

        tz: initial?.tz || initial?.timezone || "UTC",

        program: initial?.program || "7day",
      });
    } else {
      setForm(BLANK);
    }
  }, [initial, open]);

  const set = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit Cron" : "New Cron Scheduler"}
      width={500}
    >
      <Input
        label="Scheduler Name *"
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
        placeholder="e.g. 7-Day Avoiders"
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Profile"
          value={form.profile}
          onChange={(e) => set("profile", e.target.value)}
        >
          <option value="all">All Profiles</option>
          <option value="avoider">Avoider</option>
          <option value="anxious">Anxious Manager</option>
          <option value="silent">Silent Stressor</option>
        </Select>

        <Select
          label="Plan"
          value={form.plan}
          onChange={(e) => set("plan", e.target.value)}
        >
          <option value="all">All Plans</option>
          <option value="free">Free only</option>
          <option value="premium">Premium only</option>
        </Select>

        <Select
          label="Channel"
          value={form.channel}
          onChange={(e) => set("channel", e.target.value)}
        >
          {CHANNELS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </Select>

        <Select
          label="Program"
          value={form.program}
          onChange={(e) => set("program", e.target.value)}
        >
          {PROGRAMS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </Select>

        <Input
          label="Send Time"
          type="time"
          value={form.time}
          onChange={(e) => set("time", e.target.value)}
        />

        <Select
          label="Timezone"
          value={form.tz}
          onChange={(e) => set("tz", e.target.value)}
        >
          <option value="user">User's local timezone</option>

          {TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </Select>
      </div>

      <div
        className="mt-3 p-3 rounded-xl text-[12px] text-[var(--teal)]"
        style={{
          background: "var(--tealBg)",
          border: "1px solid var(--tealBorder)",
        }}
      >
        Estimated audience:{" "}
        <strong>
          {calcAud(form.profile, form.plan).toLocaleString()} users
        </strong>
      </div>

      <div className="flex gap-2.5 mt-4">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>

        <Button
          className="flex-1"
          onClick={() => {
            if (!form.name) return;

            onSave(form);

            onClose();
          }}
        >
          {initial ? "Update Cron" : "Create Cron"}
        </Button>
      </div>
    </Modal>
  );
};

// ─── Cron Schedulers page ──────────────────────────────────────
export const CronSchedulers = ({ actions, crons, setCrons, showToast }) => {
  const [cronPop, setCronPop] = useState(false);

  const [target, setTarget] = useState(null);

  const [delId, setDelId] = useState(null);

  // ─── Save cron ───────────────────────────────────────────────
  const saveCron = async (form) => {
    try {
      const payload = {
        name: form.name,

        audience: form.profile,

        profile: form.profile,

        plan: form.plan,

        channel: form.channel,

        runTime: form.time,

        timezone: form.tz,

        trigger: "manual",

        scheduleType: "cron",

        active: true,

        offsetDays: 0,
      };

      if (target) {
        const r = await api.scheduler.cronUpdate(target.id, payload);

        const updated = r?.item || r?.data || payload;

        setCrons((cs) =>
          cs.map((c) =>
            c.id === target.id
              ? {
                  ...c,
                  ...mapCronFromApi(updated),
                }
              : c,
          ),
        );

        showToast("Cron updated.");
      } else {
        const r = await api.scheduler.cronCreate(payload);

        const created = r?.item || r?.data || r;

        setCrons((cs) => [...cs, mapCronFromApi(created)]);

        showToast("Cron created.");
      }
    } catch (e) {
      showToast(e?.data?.message || "Save failed.", "error");
    }

    setTarget(null);
  };

  // ─── Toggle active ───────────────────────────────────────────
  const toggleCronActive = async (cr) => {
    try {
      await api.scheduler.cronUpdate(cr.id, {
        active: !cr.active,
      });

      setCrons((cs) =>
        cs.map((x) =>
          x.id === cr.id
            ? {
                ...x,

                active: !x.active,

                nextRun: !x.active ? `Tomorrow ${x.time}` : "Paused",
              }
            : x,
        ),
      );
    } catch (e) {
      showToast(e?.data?.message || "Update failed.", "error");
    }
  };

  // ─── Run now ────────────────────────────────────────────────
  const runCron = async (cr) => {
    try {
      await api.scheduler.cronRun(cr.id);

      showToast(`"${cr.name}" triggered.`);
    } catch (e) {
      showToast(e?.data?.message || "Run failed.", "error");
    }
  };

  // ─── Delete ─────────────────────────────────────────────────
  const deleteCron = async (id) => {
    try {
      await api.scheduler.cronDelete(id);

      setCrons((cs) => cs.filter((c) => c.id !== id));

      showToast("Deleted.");
    } catch (e) {
      showToast(e?.data?.message || "Delete failed.", "error");
    }
  };

  return (
    <div>
      {/* How it works banner */}
      <div
        className="rounded-2xl p-5 mb-4 flex gap-5 flex-wrap"
        style={{ background: C.navy }}
      >
        <div className="flex-1 min-w-[200px]">
          <div className="font-display font-semibold text-white text-sm mb-3">
            How Cron Schedulers work
          </div>

          {[
            "Runs at your set time every day",
            "Finds each user's next unsent action",
            "Sends push and/or email — never repeats",
            "New users automatically start from Day 1",
          ].map((s) => (
            <div key={s} className="flex gap-2 mb-2 text-[13px] text-white/60">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mt-1.5 flex-shrink-0" />

              {s}
            </div>
          ))}
        </div>

        <div
          className="p-4 rounded-xl"
          style={{
            background: "rgba(13,115,119,0.25)",

            border: "1px solid rgba(13,115,119,0.4)",

            minWidth: 180,
          }}
        >
          {[
            ["Total actions", actions.length],

            ["Active actions", actions.filter((a) => a.active).length],

            ["Max day", `Day ${Math.max(...actions.map((a) => a.day), 0)}`],
          ].map(([l, v]) => (
            <div
              key={l}
              className="flex justify-between py-1.5 border-b border-white/10"
            >
              <span className="text-[12px] text-white/50">{l}</span>

              <span className="text-[13px] font-bold text-white">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          icon={Plus}
          onClick={() => {
            setTarget(null);

            setCronPop(true);
          }}
        >
          New Cron Scheduler
        </Button>
      </div>

      {crons.map((cr) => (
        <div
          key={cr.id}
          className="rounded-2xl p-5 mb-3"
          style={{
            background: "var(--adminCard)",

            border: `1px solid var(--border)`,

            borderLeft: `4px solid ${
              cr.active ? "var(--teal)" : "var(--border)"
            }`,

            opacity: cr.active ? 1 : 0.65,
          }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className="font-display font-bold text-[15px] text-[var(--text)]">
                  {cr.name}
                </span>

                <Badge
                  label={
                    CHANNELS.find(([v]) => v === cr.channel)?.[1] || cr.channel
                  }
                  variant="grey"
                />

                {!cr.active && <Badge label="Paused" variant="coral" />}
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-3">
                {[
                  [
                    "Audience",

                    `${calcAud(cr?.profile, cr?.plan).toLocaleString()} users`,

                    "var(--teal)",
                  ],

                  [
                    "Runs at",

                    `${cr?.time} ${cr?.tz === "user" ? "user TZ" : cr?.tz}`,

                    "var(--text)",
                  ],

                  [
                    "Next run",

                    cr?.nextRun,

                    cr?.active ? "var(--green)" : "var(--textMuted)",
                  ],

                  [
                    "Total sent",

                    cr?.totalDelivered?.toLocaleString(),

                    "var(--text)",
                  ],

                  [
                    "Sent today",

                    cr?.sentToday?.toLocaleString(),

                    "var(--teal)",
                  ],

                  ["Progress", `${cr?.progress}%`, "var(--green)"],
                ].map(([l, v, col]) => (
                  <div
                    key={l}
                    className="p-2.5 rounded-xl"
                    style={{
                      background: "var(--bgMuted)",
                    }}
                  >
                    <div className="text-[10px] font-bold text-[var(--textMuted)] uppercase tracking-wide mb-0.5">
                      {l}
                    </div>

                    <div
                      className="text-[13px] font-bold"
                      style={{ color: col }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-1.5 rounded-full overflow-hidden bg-[var(--bgMuted)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${cr.progress}%`,

                    background: `linear-gradient(90deg,${C.teal},${C.green})`,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <Toggle
                checked={cr.active}
                onChange={() => toggleCronActive(cr)}
              />

              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant="ghost"
                  icon={Pencil}
                  onClick={() => {
                    setTarget(cr);

                    setCronPop(true);
                  }}
                >
                  Edit
                </Button>

                <Button size="sm" icon={Play} onClick={() => runCron(cr)}>
                  Run Now
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  icon={Trash2}
                  onClick={() => setDelId(cr.id)}
                >
                  Del
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <CronPop
        open={cronPop}
        onClose={() => {
          setCronPop(false);

          setTarget(null);
        }}
        initial={target}
        actions={actions}
        onSave={saveCron}
      />

      <Confirm
        open={!!delId}
        onClose={() => setDelId(null)}
        title="Delete Cron?"
        message="This permanently removes the scheduler. Users currently in-sequence won't receive further missions."
        danger
        confirmLabel="Delete"
        onConfirm={() => deleteCron(delId)}
      />
    </div>
  );
};
