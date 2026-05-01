import { useEffect, useState } from "react";
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

export const AStripeConfig = ({ showToast }) => {
  const [form, setForm] = useState({
    mode:"test", testPk:"", testSk:"", livePk:"", liveSk:"", webhook:"",
    freeProductId:"", freePriceId:"",
    premiumProductId:"", premiumPriceId:"", premiumSubPriceId:"", premiumTrial:0,
    portalUrl:"", portalEnabled:true,
    taxEnabled:false, taxBehavior:"exclusive", currency:"usd",
  });
  const [busy, setBusy] = useState(false);
  const sf     = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isTest = form.mode === "test";

  useEffect(() => {
    api.admin.configAll().then(r => {
      const cfg = r?.config || {};
      if (cfg.stripe) setForm(prev => ({ ...prev, ...cfg.stripe }));
    }).catch(() => {});
  }, []);

  const save = async () => {
    setBusy(true);
    try { await api.admin.configSet("stripe", form); showToast("Stripe config saved."); }
    catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    finally { setBusy(false); }
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display font-bold text-xl text-[var(--text)]">Stripe Configuration</h1>
        <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Connect Stripe for payments and subscription management.</p>
      </div>
      <Card>
        <Section title="Environment">
          <div className="flex gap-2 mb-4">
            {["test","live"].map(m => (
              <button key={m} onClick={() => sf("mode", m)}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold border-none cursor-pointer font-sans capitalize transition-all"
                style={{ background:form.mode===m?"var(--teal)":"var(--bgMuted)", color:form.mode===m?"#fff":"var(--textMuted)" }}>
                {m} mode
              </button>
            ))}
          </div>
          {!isTest && <div className="p-3 rounded-xl mb-4 text-[13px] font-semibold" style={{ background:"var(--coralBg)", border:"1px solid rgba(192,57,43,0.2)", color:"var(--coral)" }}>⚠ Live mode — real payments will be processed.</div>}
        </Section>

        <Section title={`${isTest ? "Test" : "Live"} API Keys`} sub="Stripe Dashboard → Developers → API keys">
          <Input label="Publishable Key" value={isTest?form.testPk:form.livePk} onChange={e => sf(isTest?"testPk":"livePk", e.target.value)} placeholder={`pk_${isTest?"test":"live"}_…`}/>
          <Input label="Secret Key" type="password" value={isTest?form.testSk:form.liveSk} onChange={e => sf(isTest?"testSk":"liveSk", e.target.value)} placeholder={`sk_${isTest?"test":"live"}_…`}/>
        </Section>

        <Section title="Webhook" sub="Stripe Dashboard → Developers → Webhooks">
          <Input label="Endpoint Signing Secret" type="password" value={form.webhook} onChange={e => sf("webhook", e.target.value)} placeholder="whsec_…" hint="Required to verify webhook authenticity"/>
        </Section>

        <Section title="Free Plan IDs" sub="Stripe → Products → [Free Plan] → Pricing">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Product ID" value={form.freeProductId} onChange={e => sf("freeProductId", e.target.value)} placeholder="prod_xxxxxxxxxxxx"/>
            <Input label="Price ID"   value={form.freePriceId}   onChange={e => sf("freePriceId",   e.target.value)} placeholder="price_xxxxxxxxxxxx"/>
          </div>
        </Section>

        <Section title="Premium Plan IDs" sub="Stripe → Products → [Premium] → Pricing — add both one-time and subscription prices">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Product ID *"            value={form.premiumProductId}   onChange={e => sf("premiumProductId",   e.target.value)} placeholder="prod_xxxxxxxxxxxx"  hint="Stripe Product ID"/>
            <Input label="One-time Price ID"        value={form.premiumPriceId}     onChange={e => sf("premiumPriceId",     e.target.value)} placeholder="price_xxxxxxxxxxxx" hint="e.g. $19 one-time"/>
            <Input label="Subscription Price ID"    value={form.premiumSubPriceId}  onChange={e => sf("premiumSubPriceId",  e.target.value)} placeholder="price_xxxxxxxxxxxx" hint="e.g. $12/mo recurring"/>
            <Input label="Free Trial Days" type="number" value={form.premiumTrial} onChange={e => sf("premiumTrial", parseInt(e.target.value)||0)} placeholder="0" hint="0 = no trial"/>
          </div>
          <div className="p-3 rounded-xl mt-2 text-[12px]" style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)", color:"var(--teal)" }}>
            Stripe Dashboard → Products → [your product] → Pricing → copy each Price ID
          </div>
        </Section>

        <Section title="Customer Portal" sub="Lets users manage subscriptions and view invoices">
          <Row label="Enable Customer Portal"><Toggle checked={form.portalEnabled} onChange={v => sf("portalEnabled", v)}/></Row>
          <Input label="Portal URL" value={form.portalUrl} onChange={e => sf("portalUrl", e.target.value)} placeholder="https://billing.stripe.com/p/login/…" hint="Stripe → Settings → Billing → Customer portal"/>
        </Section>

        <Section title="Tax & Currency">
          <div className="grid grid-cols-2 gap-3">
            <Select label="Default Currency" value={form.currency} onChange={e => sf("currency", e.target.value)}>
              {[["usd","USD — US Dollar"],["gbp","GBP — British Pound"],["eur","EUR — Euro"],["inr","INR — Indian Rupee"],["aud","AUD — Australian Dollar"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </Select>
            <Select label="Tax Behavior" value={form.taxBehavior} onChange={e => sf("taxBehavior", e.target.value)}>
              <option value="exclusive">Exclusive (added on top)</option>
              <option value="inclusive">Inclusive (included in price)</option>
            </Select>
          </div>
          <Row label="Enable Automatic Tax" sub="Requires Stripe Tax to be configured in your account"><Toggle checked={form.taxEnabled} onChange={v => sf("taxEnabled", v)}/></Row>
        </Section>

        <Button onClick={save} disabled={busy}>{busy ? "Saving…" : "Save Configuration"}</Button>
      </Card>
    </div>
  );
};
