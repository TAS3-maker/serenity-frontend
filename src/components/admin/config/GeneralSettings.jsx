import { useEffect, useState } from "react";
import { TIMEZONES } from "../../../lib/constants";
import { api } from "../../../lib/api";
import { Button, Toggle, Card, Input, Select, Row } from "../../ui/index";

const Section = ({ title, sub, children }) => (
  <div className="mb-6 pb-6 border-b border-[var(--border)] last:border-none last:mb-0 last:pb-0">
    <div className="mb-4">
      <div className="text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-widest">{title}</div>
      {sub && <div className="text-[12px] text-[var(--textMuted)] mt-0.5">{sub}</div>}
    </div>
    {children}
  </div>
);

const DEFAULTS = {
  appName: "",
  tagline: "",

  supportEmail: "",
  appUrl: "",

  iosAppUrl: "",
  androidAppUrl: "",

  defaultTimezone: "",

  notifTimezoneMode: "",
  notifFixedTz: "",
  notifDefaultTime: "",

  gdprEnabled: false,
  coppaEnabled: false,
  maintenanceMode: false,

  regions: [],

  language: "",

  dateFormat: "",
};

export const AGeneral = ({ showToast }) => {
  const [form, setForm] = useState(DEFAULTS);
  const [busy, setBusy] = useState(false);
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    api.admin.configAll().then(r => {
  const general =
  r?.config?.general ||
  r?.settings?.general ||
  {};

setForm(prev => ({
  ...prev,

  appName: general.appName ?? "",
  tagline: general.tagline ?? "",

  supportEmail: general.supportEmail ?? "",
  appUrl: general.appUrl ?? "",

  defaultTimezone:
  general.defaultTimezone ?? "",

notifTimezoneMode:
  general.notifTimezoneMode ?? "",


notifDefaultTime:
  general.notifDefaultTime ?? "",

  gdprEnabled:
    general.gdprEnabled ?? false,
notifFixedTz:
  general.notifFixedTz ?? "",
  maintenanceMode:
    general.maintenanceMode ?? false,

regions:
  general.regions ?? [],

language:
  general.language ?? "",

coppaEnabled:
  general.coppaEnabled ?? false,

dateFormat:
  general.dateFormat ?? "",

iosAppUrl:
  general.iosAppUrl ?? "",

androidAppUrl:
  general.androidAppUrl ?? "",
}));
    }).catch(() => {});
  }, []);

  const save = async () => {
    setBusy(true);
    try { await api.admin.configSet("general", form); showToast("Settings saved."); }
    catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    finally { setBusy(false); }
  };

 return (
  <div
    data-testid="admin-general-settings"
    className="max-w-[1200px]"
  >
    <div className="mb-5">
      <h1 className="font-display font-bold text-xl text-[var(--text)]">
        Settings
      </h1>
    </div>

    <Card className="p-6 rounded-2xl">
      {/* APP IDENTITY */}
      <Section title="App Identity">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="App Name"
            value={form.appName || ""}
            onChange={(e) =>
              sf("appName", e.target.value)
            }
          />

          <Input
            label="Tagline"
            value={form.tagline || ""}
            onChange={(e) =>
              sf("tagline", e.target.value)
            }
          />

          <Input
            label="Support Email"
            value={form.supportEmail || ""}
            onChange={(e) =>
              sf("supportEmail", e.target.value)
            }
          />

          <Input
            label="App URL"
            value={form.appUrl || ""}
            onChange={(e) =>
              sf("appUrl", e.target.value)
            }
          />

        <Input
  label="iOS App Store URL"
  value={form.iosAppUrl || ""}
  onChange={(e) =>
    sf("iosAppUrl", e.target.value)
  }
  placeholder="https://apps.apple.com"
/>

        <Input
  label="Android Play Store URL"
  value={form.androidAppUrl || ""}
  onChange={(e) =>
    sf("androidAppUrl", e.target.value)
  }
  placeholder="https://play.google.com"
/>
        </div>
      </Section>

      {/* TIMEZONE */}
      <Section title="Timezone & Region Settings">
        <div
          className="rounded-xl px-4 py-3 mb-4 text-[12px]"
          style={{
            background: "rgba(20,184,166,.12)",
            color: "var(--teal)",
          }}
        >
          These settings control timezone behavior,
          how date/time displays to users, and
          which regional compliance rules apply.
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Server / Default Timezone"
            value={form.defaultTimezone}
            onChange={(e) =>
              sf(
                "defaultTimezone",
                e.target.value
              )
            }
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </Select>

       <Select
  label="Default Language"
value={form.language || ""}
  onChange={(e) =>
    sf("language", e.target.value)
  }
>
  <option value="">
  Select Language
</option>
<option value="en">English</option>
<option value="hi">Hindi</option>
</Select>

          <Input
            type="time"
            label="Default Notification Send Time"
            value={form.notifDefaultTime}
            onChange={(e) =>
              sf(
                "notifDefaultTime",
                e.target.value
              )
            }
          />

     <Input
  label="Date Display Format"
  value={form.dateFormat || ""}
  onChange={(e) =>
    sf("dateFormat", e.target.value)
  }
  placeholder="MM/DD/YYYY"
/>

          <Select
            label="Notification Timezone Mode"
          value={
  form.notifTimezoneMode || ""
}
            onChange={(e) =>
              sf(
                "notifTimezoneMode",
                e.target.value
              )
            }
          >
        <option value="">
  Select Mode
</option>

<option value="user">
  User Local Time
</option>

<option value="fixed">
  Fixed Timezone
</option>
          </Select>
        </div>

        {/* REGIONS */}
        <div className="mt-5">
          <div className="text-[13px] font-semibold mb-2">
            Target Regions
          </div>

          <div className="text-[12px] text-[var(--textMuted)] mb-3">
            Select the regions your app serves.
            This activates the relevant
            compliance settings below.
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              "Global (no restriction)",
              "United States",
              "United Kingdom",
              "European Union",
              "India",
              "Australia",
              "Canada",
              "Singapore",
              "UAE / Middle East",
              "Rest of World",
            ].map((r) => (
              <label
                key={r}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px]"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                <input
                  type="checkbox"
                  checked={(
                    form.regions || []
                  ).includes(r)}
                  onChange={(e) => {
                    const arr = [
                      ...(form.regions || []),
                    ];

                if (e.target.checked) {
  if (!arr.includes(r)) arr.push(r);
}
                    
                    else {
                      const idx =
                        arr.indexOf(r);

                      if (idx > -1)
                        arr.splice(idx, 1);
                    }

                    sf("regions", arr);
                  }}
                />

                {r}
              </label>
            ))}
          </div>
        </div>
      </Section>

      {/* COMPLIANCE */}
      <Section title="Compliance">
        <div className="space-y-3">
          <Row
            label="Enable GDPR compliance (EU users — cookie consent, data deletion rights)"
          >
            <Toggle
              checked={form.gdprEnabled}
              onChange={(v) =>
                sf("gdprEnabled", v)
              }
            />
          </Row>

          <Row
            label="Enable COPPA compliance (kids < 13 users)"
          >
           <Toggle
  checked={form.coppaEnabled || false}
  onChange={(v) =>
    sf("coppaEnabled", v)
  }
/>
          </Row>
        </div>
      </Section>

      {/* MAINTENANCE */}
      <Section title="Maintenance">
        <Row
          label="Maintenance Mode — disable the app for all users"
        >
          <Toggle
            checked={form.maintenanceMode}
            onChange={(v) =>
              sf("maintenanceMode", v)
            }
          />
        </Row>
      </Section>

   

      <div className="pt-2">
        <Button
          onClick={save}
          disabled={busy}
        >
          {busy
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>
    </Card>
  </div>
);
};
