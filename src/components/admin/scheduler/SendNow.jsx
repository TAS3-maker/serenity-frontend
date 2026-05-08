import { useMemo, useState } from "react";
import { api } from "../../../lib/api";
import { profileLabel } from "../../../lib/constants";
import {
  Button,
  Badge,
  Card,
  Select,
} from "../../ui/index";
import { calcAud } from "./CronSchedulers";

export const SendNow = ({
  actions,
  history,
  setHistory,
  showToast,
}) => {
  const [form, setForm] = useState({
    day: "",
    profile: "all",
    plan: "all",
    channel: "inapp",
  });

  const [busy, setBusy] = useState(false);

  const sf = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

  // ✅ only valid active actions
  const activeActions = useMemo(
    () =>
      actions.filter(
        (a) =>
          a.active &&
          a.meta?.day !== undefined &&
          a.meta?.day !== null
      ),
    [actions]
  );

  // ✅ latest history first
  const recentHistory = useMemo(
    () =>
      [...history]
        .sort((a, b) => b.id - a.id)
        .slice(0, 6),
    [history]
  );

  // ✅ selected action
const selAct = useMemo(() => {
  if (!form.day) return null;

  return activeActions.find(
    (a) =>
      Number(a.meta?.day) === Number(form.day) &&
      (
        form.profile === "all" ||
        a.profile === "all" ||
        a.profile === form.profile
      )
  );
}, [form.day, form.profile, activeActions]);

  const audCount = calcAud(
    form.profile,
    form.plan
  );

  // ✅ manual trigger
  const doSend = async () => {
    if (!selAct) {
      showToast(
        "No active mission found for this selection.",
        "error"
      );
      return;
    }

    setBusy(true);

    try {
      const audience =
        form.profile === "all" &&
        form.plan === "all"
          ? "all"
          : form.plan === "premium"
          ? "premium"
          : form.plan === "free"
          ? "free"
          : form.profile;

      const r = await api.scheduler.sendNow({
        audience,
     actionId: selAct._id,
      
        channel: form.channel,
      });

      const delivered =
        r?.delivered ?? audCount;

      // ✅ update recent sends UI instantly
      setHistory((h) => [
        {
          id: Date.now(),
     day: Number(selAct.meta?.day),
          title: selAct.title,
          profile: form.profile,
          plan: form.plan,
          channel: form.channel,
          sent: delivered,
          opened: 0,
          completed: 0,
          cron: "Manual",
          date: "Just now",
          status: "delivered",
        },
        ...h,
      ]);

      showToast(
        `Mission sent to ${delivered.toLocaleString()} users.`
      );

      // ✅ reset form
      setForm({
        day: "",
        profile: "all",
        plan: "all",
        channel: "inapp",
      });
    } catch (e) {
      showToast(
        e?.data?.message || "Send failed.",
        "error"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* LEFT */}
      <Card
        title="Send Mission Now"
        sub="Manually trigger a mission instantly"
      >
        <Select
          label="Mission *"
          value={form.day}
          onChange={(e) =>
            sf("day", e.target.value)
          }
        >
          <option value="">
            — Select a mission —
          </option>

       {activeActions.map((a) => (
  <option
    key={a._id}
    value={a.meta?.day}
  >
    Day {a.meta?.day} — {a.title} (
    {a.profile === "all"
      ? "All"
      : profileLabel(a.profile)}
    )
  </option>
))}
        </Select>

        {/* mission preview */}
        {selAct && (
          <div
            className="p-3 rounded-xl mb-3 text-[13px]"
            style={{
              background:
                "var(--bgMuted)",
            }}
          >
            <div className="font-semibold text-[var(--text)] mb-1">
              {selAct.title}
            </div>

            <div className="text-[var(--textMuted)]">
              {selAct.body}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Profile"
            value={form.profile}
            onChange={(e) =>
              sf(
                "profile",
                e.target.value
              )
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

          <Select
            label="Plan"
            value={form.plan}
            onChange={(e) =>
              sf("plan", e.target.value)
            }
          >
            <option value="all">
              All Plans
            </option>

            <option value="free">
              Free only
            </option>

            <option value="premium">
              Premium only
            </option>
          </Select>

          <Select
            label="Channel"
            value={form.channel}
            onChange={(e) =>
              sf(
                "channel",
                e.target.value
              )
            }
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
          </Select>
        </div>

        {/* audience */}
        <div
          className="flex items-center justify-between p-3.5 rounded-xl mb-4 mt-3"
          style={{
            background:
              "var(--tealBg)",
            border:
              "1px solid var(--tealBorder)",
          }}
        >
          <span className="text-[12px] text-[var(--teal)]">
            Audience
          </span>

          <span className="font-display font-bold text-xl text-[var(--teal)]">
            {audCount.toLocaleString()}

            <span className="text-[13px] font-normal ml-1">
              users
            </span>
          </span>
        </div>

        <Button
          className="w-full"
          disabled={!selAct || busy}
          onClick={doSend}
        >
          {busy
            ? "Sending…"
            : `Send to ${audCount.toLocaleString()} users now`}
        </Button>
      </Card>

      {/* RIGHT */}
      <Card title="Recent Sends">
        {recentHistory.length > 0 ? (
          recentHistory.map((m, i) => (
            <div
              key={m.id}
              className="py-3"
              style={{
                borderBottom:
                  i <
                  recentHistory.length - 1
                    ? "1px solid var(--border)"
                    : "none",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{
                    background:
                      "var(--teal)",
                  }}
                >
                  D{m?.day}
                </div>

                <span className="font-medium text-[13px] text-[var(--text)] flex-1 truncate">
                  {m?.title}
                </span>

                <Badge
                  label={
                    m?.status ||
                    "delivered"
                  }
                  variant={
                    m?.status ===
                    "delivered"
                      ? "green"
                      : "gold"
                  }
                />
              </div>

              <div className="text-[11px] text-[var(--textMuted)] pl-8">
                {m?.date} ·{" "}
                {m?.sent?.toLocaleString()}{" "}
                sent
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[13px] text-[var(--textMuted)]">
            No sends yet.
          </div>
        )}
      </Card>
    </div>
  );
};