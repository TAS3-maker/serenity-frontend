import { useState } from "react";
import { Plus, Pencil, Check, X } from "../../../lib/icons";
import { C } from "../../../tokens";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi";
import { intervalSuffix } from "../../../lib/constants";
import { Button, Badge, Toggle, Modal, Card, Input, Textarea, Select, Row } from "../../ui/index";

export const AMemberships = ({ showToast }) => {
  const plansApi = useApi(api.content.adminPlanList, { initial: [] });
  const plans = (plansApi.data || []).map(p => ({
    id: p.id || p._id,
    name: p.name || "",
    price: Number(p.price || 0),
    interval: p.interval || "one_time",
    active: p.active !== false,
    highlighted: p.highlighted || false,
    tagline: p.tagline || "",
    desc: p.desc || p.description || "",
    features: p.features || [],
    stripePriceId: p.stripePriceId || "",
    stripeProductId: p.stripeProductId || "",
    stripeSubPriceId: p.stripeSubPriceId || "",
    stripeTrial: p.stripeTrial || 0,
    badge: p.badge || "",
  }));
  const setPlans = (next) => plansApi.setData(typeof next === "function" ? next(plans) : next);
  const [pop, setPop]     = useState(false);
  const [editId, setEd]   = useState(null);
  const BLANK_PLAN = {
    name:"", price:0, interval:"one_time", active:true, highlighted:false,
    tagline:"", desc:"", features:[""],
    stripePriceId:"", stripeProductId:"",
    stripeSubPriceId:"", stripeTrial:0,
    badge:"",
  };
  const [form, setForm] = useState(BLANK_PLAN);
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openEdit = p => {
    setEd(p.id);
    setForm({
      name:p.name, price:p.price, interval:p.interval||"one_time",
      active:p.active, highlighted:p.highlighted||false,
      tagline:p.tagline, desc:p.desc, features:[...p.features],
      stripePriceId:p.stripePriceId||"", stripeProductId:p.stripeProductId||"",
      stripeSubPriceId:p.stripeSubPriceId||"", stripeTrial:p.stripeTrial||0,
      badge:p.badge||"",
    });
    setPop(true);
  };
  const save = async () => {
    if (!form.name.trim()) { showToast("Plan name required.", "error"); return; }
    try {
      if (editId) { await api.content.adminPlanUpdate(editId, form); showToast("Plan updated."); }
      else        { await api.content.adminPlanCreate({ ...form, id: "plan_"+Date.now() }); showToast("Plan created."); }
      plansApi.reload();
    } catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    setPop(false); setEd(null);
  };

  const isSubscription = ["monthly","yearly"].includes(form.interval);

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Memberships & Pricing</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Changes sync to the website pricing page and app paywall.</p>
        </div>
        <div className="flex gap-2">
          <Button icon={Plus} variant="ghost" onClick={() => { setEd(null); setForm(BLANK_PLAN); setPop(true); }}>New Plan</Button>
          <Button onClick={() => showToast("Pricing published to website.")}>Publish Pricing</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {plans.map(plan => (
          <Card key={plan.id} accent={plan.highlighted ? C.teal : undefined}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-display font-bold text-[16px] text-[var(--text)]">{plan.name}</div>
                  {plan.badge && <Badge label={plan.badge} variant="gold"/>}
                </div>
                <div className="text-[12px] text-[var(--textMuted)]">ID: {plan.id} · {plan.interval}</div>
              </div>
              <div className="flex items-center gap-2">
                <Toggle checked={plan.active} onChange={v => setPlans(ps => ps.map(p => p.id===plan.id ? {...p,active:v} : p))}/>
                <Button size="sm" variant="ghost" icon={Pencil} onClick={() => openEdit(plan)}>Edit</Button>
              </div>
            </div>

            <div className="flex items-end gap-2 mb-3">
              <span className="font-display font-black text-3xl text-[var(--text)]">{plan.price===0?"Free":`$${plan.price}`}</span>
              {plan.price>0 && <span className="text-[13px] text-[var(--textMuted)] mb-1">{intervalSuffix(plan.interval)}</span>}
            </div>

            <p className="text-[13px] text-[var(--textMuted)] mb-4">{plan.tagline}</p>

            <div className="space-y-2 mb-4">
              {plan.features.map((f, i) => (
                <div key={`feat-${plan.id}-${i}`} className="flex items-center gap-2.5 text-[13px] text-[var(--text)]">
                  <Check size={14} color="var(--teal)"/>{f}
                </div>
              ))}
            </div>

            {plan.price > 0 && (
              <div className="pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 flex-wrap">
                  {plan.stripePriceId   ? <Badge label="Price ID connected"           variant="green"/> : <Badge label="No Stripe Price ID"           variant="coral"/>}
                  {plan.stripeProductId ? <Badge label="Product ID connected"         variant="green"/> : <Badge label="No Product ID"                 variant="coral"/>}
                  {["monthly","yearly"].includes(plan.interval) && (
                    plan.stripeSubPriceId ? <Badge label="Subscription ID connected" variant="green"/> : <Badge label="No Subscription Price ID" variant="gold"/>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Modal open={pop} onClose={() => { setPop(false); setEd(null); }} title={editId?"Edit Plan":"New Plan"} width={580}>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Plan Name *"         value={form.name}     onChange={e => sf("name",     e.target.value)}/>
          <Input label="Price (USD)" type="number" value={form.price} onChange={e => sf("price", parseFloat(e.target.value)||0)}/>
          <Select label="Billing Interval" value={form.interval} onChange={e => sf("interval", e.target.value)}>
            <option value="free">Free forever</option>
            <option value="one_time">One-time payment</option>
            <option value="monthly">Monthly subscription</option>
            <option value="yearly">Yearly subscription</option>
          </Select>
          <Input label="Badge (optional)" value={form.badge} onChange={e => sf("badge", e.target.value)} placeholder="Most popular"/>
        </div>
        <Input   label="Tagline"     value={form.tagline} onChange={e => sf("tagline", e.target.value)}/>
        <Textarea label="Description" value={form.desc}    onChange={e => sf("desc",    e.target.value)} rows={2}/>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <Row label="Active">             <Toggle checked={form.active}      onChange={v => sf("active",      v)}/></Row>
          <Row label="Highlighted (featured)"><Toggle checked={form.highlighted} onChange={v => sf("highlighted", v)}/></Row>
        </div>

        {form.price > 0 && (
          <div className="rounded-xl p-4 mb-3" style={{ background:"var(--bgMuted)", border:"1px solid var(--border)" }}>
            <div className="text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-widest mb-3">Stripe Configuration</div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Product ID"  value={form.stripeProductId}  onChange={e => sf("stripeProductId",  e.target.value)} placeholder="prod_xxxxxxxxxxxx"  hint="From Stripe → Products"/>
              <Input label="Price ID"    value={form.stripePriceId}    onChange={e => sf("stripePriceId",    e.target.value)} placeholder="price_xxxxxxxxxxxx" hint="From Stripe → Products → Prices"/>
            </div>
            {isSubscription && <>
              <Input label="Subscription Price ID" value={form.stripeSubPriceId} onChange={e => sf("stripeSubPriceId", e.target.value)} placeholder="price_xxxxxxxxxxxx" hint="Recurring price ID"/>
              <Input label="Trial Period (days)" type="number" value={form.stripeTrial} onChange={e => sf("stripeTrial", parseInt(e.target.value)||0)} placeholder="0 = no trial"/>
            </>}
            <div className="p-3 rounded-lg mt-2 text-[12px]" style={{ background:"var(--tealBg)", color:"var(--teal)" }}>
              Find these in Stripe Dashboard → Products → [your product] → Pricing
            </div>
          </div>
        )}

        <div className="mb-3">
          <div className="text-[13px] font-semibold text-[var(--text)] mb-2">Features</div>
          {form.features.map((ft, i) => (
            <div key={`form-feat-${i}`} className="flex gap-2 mb-2">
              <input value={ft} onChange={e => { const ff=[...form.features]; ff[i]=e.target.value; sf("features",ff); }}
                className="flex-1 h-10 rounded-xl px-3 text-[13px] font-sans bg-[var(--bgCard)] text-[var(--text)] outline-none"
                style={{ border:"1.5px solid var(--border)" }}/>
              <Button size="sm" variant="danger" icon={X} onClick={() => sf("features", form.features.filter((_,j) => j!==i))}/>
            </div>
          ))}
          <Button size="sm" variant="ghost" icon={Plus} onClick={() => sf("features", [...form.features, ""])}>Add feature</Button>
        </div>

        <div className="flex gap-2.5 mt-2">
          <Button variant="ghost" onClick={() => { setPop(false); setEd(null); }}>Cancel</Button>
          <Button className="flex-1" onClick={save}>{editId ? "Update Plan" : "Create Plan"}</Button>
        </div>
      </Modal>
    </div>
  );
};
