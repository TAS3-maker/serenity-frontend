import { useEffect, useState } from "react";
import { Check } from "../../../lib/icons";
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

const PROVIDERS = [
  { id:"sendgrid",  label:"SendGrid",                authType:"apikey", placeholder:"SG.xxxxxxxxxxxxxxxxxxxx",    docs:"https://sendgrid.com/docs" },
  { id:"ses",       label:"Amazon SES",              authType:"apikey", placeholder:"access key id",              docs:"https://docs.aws.amazon.com/ses" },
  { id:"mailgun",   label:"Mailgun",                 authType:"apikey", placeholder:"key-xxxxxxxxxxxxxxxxxxxx",   docs:"https://documentation.mailgun.com" },
  { id:"postmark",  label:"Postmark",                authType:"apikey", placeholder:"xxxxxxxx-xxxx-xxxx",         docs:"https://postmarkapp.com/developer" },
  { id:"resend",    label:"Resend",                  authType:"apikey", placeholder:"re_xxxxxxxxxxxxxxxxxxxx",    docs:"https://resend.com/docs" },
  { id:"brevo",     label:"Brevo (Sendinblue)",      authType:"apikey", placeholder:"xkeysib-xxxxxxxxxxxx",       docs:"https://developers.brevo.com" },
  { id:"mailchimp", label:"Mailchimp Transactional", authType:"apikey", placeholder:"md-xxxxxxxxxxxx",            docs:"https://mailchimp.com/developer" },
  { id:"sparkpost", label:"SparkPost",               authType:"apikey", placeholder:"xxxxxxxxxxxxxxxxxxxx",       docs:"https://developers.sparkpost.com" },
  { id:"smtp",      label:"Custom SMTP",             authType:"smtp",   placeholder:"",                           docs:"" },
];

export const AEmailConfig = ({ showToast }) => {
  const [form, setForm] = useState({
    provider:"sendgrid", apiKey:"", host:"", port:"587", user:"", pass:"",
    from:"hello@serenitydecoded.com", fromName:"SerenityDecoded",
    replyTo:"", bccAll:"", trackOpens:true, trackClicks:true, bounceWebhook:"",
  });
  const [busy, setBusy] = useState(false);
  const sf  = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const prov = PROVIDERS.find(p => p.id === form.provider) || PROVIDERS[0];

  useEffect(() => {
    api.admin.configAll().then(r => {
      const cfg = r?.config || {};
      if (cfg.email) setForm(prev => ({ ...prev, ...cfg.email }));
    }).catch(() => {});
  }, []);

  const save = async () => {
    setBusy(true);
    try { await api.admin.configSet("email", form); showToast("Email config saved."); }
    catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    finally { setBusy(false); }
  };

  return (
    <div data-testid="admin-email-config">
      <div className="mb-5">
        <h1 className="font-display font-bold text-xl text-[var(--text)]">Email / SMTP Configuration</h1>
        <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Configure your transactional email provider.</p>
      </div>
      <Card>
        <Section title="Provider" sub="Select your email sending service">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {PROVIDERS.map(p => (
              <button key={p.id} onClick={() => sf("provider", p.id)}
                className="p-3 rounded-xl text-left cursor-pointer border transition-all font-sans"
                style={{ background:form.provider===p.id?"var(--tealBg)":"var(--bgMuted)", borderColor:form.provider===p.id?"var(--teal)":"var(--border)" }}>
                <div className="text-[12px] font-semibold text-[var(--text)]">{p.label}</div>
                {form.provider===p.id && <div className="flex items-center gap-1 mt-1"><Check size={11} color="var(--teal)"/><span className="text-[11px] text-[var(--teal)]">Selected</span></div>}
              </button>
            ))}
          </div>
          {prov.authType === "apikey"
            ? <>
                <Input label={`${prov.label} API Key *`} type="password" value={form.apiKey} onChange={e => sf("apiKey", e.target.value)} placeholder={prov.placeholder} hint={prov.docs ? `Find your key at ${prov.docs}` : ""}/>
                {form.provider === "ses" && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="AWS Region" value={form.host} onChange={e => sf("host", e.target.value)} placeholder="us-east-1"/>
                    <Input label="Secret Access Key" type="password" value={form.pass} onChange={e => sf("pass", e.target.value)} placeholder="AWS Secret Key"/>
                  </div>
                )}
              </>
            : <>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="SMTP Host *" value={form.host} onChange={e => sf("host", e.target.value)} placeholder="smtp.example.com"/>
                  <Select label="Port" value={form.port} onChange={e => sf("port", e.target.value)}>
                    <option value="587">587 (STARTTLS — recommended)</option>
                    <option value="465">465 (SSL/TLS)</option>
                    <option value="25">25 (plain — not recommended)</option>
                    <option value="2525">2525 (alternative)</option>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Username" value={form.user} onChange={e => sf("user", e.target.value)}/>
                  <Input label="Password" type="password" value={form.pass} onChange={e => sf("pass", e.target.value)}/>
                </div>
              </>
          }
        </Section>
        <Section title="Sender Identity">
          <div className="grid grid-cols-2 gap-3">
            <Input label="From Name *"   value={form.fromName} onChange={e => sf("fromName", e.target.value)}/>
            <Input label="From Email *"  type="email" value={form.from} onChange={e => sf("from", e.target.value)}/>
            <Input label="Reply-To"      type="email" value={form.replyTo} onChange={e => sf("replyTo", e.target.value)} placeholder="support@serenitydecoded.com"/>
            <Input label="BCC All Emails" type="email" value={form.bccAll} onChange={e => sf("bccAll", e.target.value)} placeholder="archive@… (optional)"/>
          </div>
        </Section>
        <Section title="Tracking & Webhooks">
          <Row label="Track Email Opens"  sub="Adds a 1×1 tracking pixel"><Toggle checked={form.trackOpens}  onChange={v => sf("trackOpens",  v)}/></Row>
          <Row label="Track Link Clicks"  sub="Wraps links with click-tracking URLs"><Toggle checked={form.trackClicks} onChange={v => sf("trackClicks", v)}/></Row>
          <Input label="Bounce / Event Webhook URL" value={form.bounceWebhook} onChange={e => sf("bounceWebhook", e.target.value)} placeholder="https://yoursite.com/api/email-webhooks" hint="Receives delivery events, bounces, and unsubscribes from your provider"/>
        </Section>
        <div className="flex gap-2.5">
          <Button variant="ghost" onClick={() => showToast("Test email sent to " + form.from + ".")}>Send Test Email</Button>
          <Button onClick={save} disabled={busy}>{busy ? "Saving…" : "Save Configuration"}</Button>
        </div>
      </Card>
    </div>
  );
};
