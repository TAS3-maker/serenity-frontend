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
  siteName:"SerenityDecoded", timezone:"UTC", region:"global",
  gdpr:true, analytics:true, maintenance:false,
};

export const AGeneral = ({ showToast }) => {
  const [form, setForm] = useState(DEFAULTS);
  const [busy, setBusy] = useState(false);
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    api.admin.configAll().then(r => {
      const cfg = r?.config || {};
      if (cfg.general) setForm(prev => ({ ...prev, ...cfg.general }));
    }).catch(() => {});
  }, []);

  const save = async () => {
    setBusy(true);
    try { await api.admin.configSet("general", form); showToast("Settings saved."); }
    catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    finally { setBusy(false); }
  };

  return (
    <div data-testid="admin-general-settings">
      <div className="mb-5">
        <h1 className="font-display font-bold text-xl text-[var(--text)]">General Settings</h1>
        <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Global platform configuration.</p>
      </div>
      <Card>
        <Section title="Platform">
          <Input label="Site Name" value={form.siteName} onChange={e => sf("siteName", e.target.value)}/>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Default Timezone" value={form.timezone} onChange={e => sf("timezone", e.target.value)}>
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </Select>
            <Select label="Region" value={form.region} onChange={e => sf("region", e.target.value)}>
              <option value="global">Global</option>
              <option value="us">United States</option>
              <option value="eu">European Union</option>
            </Select>
          </div>
        </Section>
        <Section title="Compliance & Privacy">
          <Row label="GDPR Consent Collection" sub="Show consent prompt on signup"><Toggle checked={form.gdpr}      onChange={v => sf("gdpr",      v)}/></Row>
          <Row label="Analytics Tracking"      sub="Anonymous usage analytics">   <Toggle checked={form.analytics} onChange={v => sf("analytics", v)}/></Row>
        </Section>
        <Section title="Maintenance">
          <Row label="Maintenance Mode" sub="Temporarily disable public access"><Toggle checked={form.maintenance} onChange={v => sf("maintenance", v)}/></Row>
        </Section>
        <Button onClick={save} disabled={busy}>{busy ? "Saving…" : "Save Settings"}</Button>
      </Card>
    </div>
  );
};
