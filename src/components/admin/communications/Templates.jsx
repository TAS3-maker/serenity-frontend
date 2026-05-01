import { useState, useEffect } from "react";
import { Eye, Pencil, Send, Plus } from "../../../lib/icons";
import { C } from "../../../tokens";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi";
import { TRIGGERS, fillVars } from "../../../lib/constants";
import { Button, Badge, Toggle, Modal, Card, Pager, Input, Textarea, Select, Row } from "../../ui/index";
import { Table } from "../../ui/Table";

const PER = 10;

// ─── Email preview ────────────────────────────────────────────
const EmailPreview = ({ tmpl }) => (
  <div className="rounded-xl overflow-hidden border border-[var(--border)]">
    <div className="px-4 py-2.5 text-[12px] bg-[var(--bgMuted)] border-b border-[var(--border)]">
      <span className="text-[var(--textMuted)]">Subject: </span>
      <span className="font-semibold text-[var(--text)]">{fillVars(tmpl.subject||"(no subject)")}</span>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
          style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>S</div>
        <div>
          <div className="font-display font-semibold text-[13px] text-[var(--text)]">SerenityDecoded</div>
          <div className="text-[11px] text-[var(--textMuted)]">hello@serenitydecoded.com</div>
        </div>
      </div>
      <div className="whitespace-pre-wrap text-[14px] leading-[1.85] text-[var(--text)]">
        {fillVars(tmpl.body||"(empty)")}
      </div>
      <div className="mt-5 pt-4 border-t border-[var(--border)] text-[11px] text-[var(--textMuted)]">
        SerenityDecoded · <span className="underline cursor-pointer">Unsubscribe</span> · <span className="underline cursor-pointer">Privacy Policy</span>
      </div>
    </div>
  </div>
);

// ─── Template edit popup ──────────────────────────────────────
const BLANK_TEMPLATE = { name:"", trigger:"manual", active:false, subject:"", body:"Hi {{first_name}},\n\n" };

const TemplatePop = ({ open, onClose, initial, onSave }) => {
  const [form, setForm] = useState(initial ?? BLANK_TEMPLATE);
  const [tab, setTab]   = useState("edit");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { setForm(initial ?? BLANK_TEMPLATE); }, [open, initial, setForm, BLANK_TEMPLATE]);

  return (
    <Modal open={open} onClose={onClose} title={initial ? `Edit — ${initial.name}` : "New Template"} width={680}>
      <div className="flex bg-[var(--bgMuted)] rounded-xl p-1 gap-1 mb-5">
        {[["edit","Edit"],["preview","Preview"]].map(([v,l]) => (
          <button key={v} onClick={() => setTab(v)}
            className="flex-1 py-2 rounded-lg text-[13px] font-semibold font-sans border-none cursor-pointer transition-all"
            style={{ background:tab===v?"var(--bgCard)":"transparent", color:tab===v?"var(--teal)":"var(--textMuted)" }}>
            {l}
          </button>
        ))}
      </div>
      {tab === "edit"
        ? <>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Template Name *" value={form.name}    onChange={e => set("name",    e.target.value)}/>
              <Select label="Trigger"        value={form.trigger} onChange={e => set("trigger", e.target.value)}>
                {TRIGGERS.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <Input label="Subject Line *" value={form.subject} onChange={e => set("subject", e.target.value)}/>
            <Row label="Active"><Toggle checked={form.active} onChange={v => set("active", v)}/></Row>
            <div className="p-3 rounded-xl my-3 text-[12px] text-[var(--teal)]"
              style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
              Variables: {`{{first_name}}`}, {`{{program_name}}`}, {`{{mission_title}}`}, {`{{app_link}}`}, {`{{expiry_date}}`}…
            </div>
            <Textarea label="Body" value={form.body} onChange={e => set("body", e.target.value)} rows={9} className="font-mono text-[12px]"/>
          </>
        : <EmailPreview tmpl={form}/>
      }
      <div className="flex gap-2.5 mt-5">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button className="flex-1"
          onClick={() => { if (!form.name || !form.subject) return; onSave(form); onClose(); }}>
          {initial ? "Update Template" : "Create Template"}
        </Button>
      </div>
    </Modal>
  );
};

// ─── Email Templates page ─────────────────────────────────────
export const ATemplates = ({ showToast }) => {
  const tmplApi = useApi(api.communications.templateList, { initial: [] });
  const tmpls = (tmplApi.data || []).map(t => ({
    id: t._id || t.id,
    slug: t.slug || t.name?.toLowerCase().replace(/\s+/g, '_') || "",
    name: t.name || "",
    trigger: t.trigger || "manual",
    active: t.active !== false,
    subject: t.subject || "",
    body: t.body || t.html || "",
  }));
  const setTmpls = (next) => tmplApi.setData(typeof next === "function" ? next(tmpls) : next);
  const [editPop, setEditPop] = useState(false);
  const [viewPop, setViewPop] = useState(false);
  const [testPop, setTestPop] = useState(false);
  const [target, setTarget]   = useState(null);
  const [testEmail, setTestEmail] = useState("");
  const [page, setPage]       = useState(1);

  const openEdit = t => { setTarget(t);    setEditPop(true); };
  const openView = t => { setTarget(t);    setViewPop(true); };
  const save = async (form) => {
    try {
      if (target) { await api.communications.templateUpdate(target.id, form); showToast("Template updated."); }
      else        { await api.communications.templateCreate({ ...form, slug: "custom_" + Date.now() }); showToast("Template created."); }
      tmplApi.reload();
    } catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    setTarget(null);
  };

  const COLS = [
    { key:"name", label:"Template",
      render:(_,t) => (
        <div>
          <div className="font-semibold text-[13px] text-[var(--text)]">{t.name}</div>
          <div className="text-[11px] text-[var(--textMuted)] font-mono">{t.slug}</div>
        </div>
      )
    },
    { key:"subject", label:"Subject",  render:v => <span className="text-[12px] text-[var(--textMuted)] truncate block max-w-[220px]">{v}</span> },
    { key:"trigger", label:"Trigger",  render:v => <Badge label={v} variant="teal"/> },
    { key:"active",  label:"Status",   render:(v,t) => <Toggle checked={v} onChange={nv => setTmpls(ts => ts.map(x => x.id===t.id ? {...x,active:nv} : x))}/> },
    { key:"id",      label:"",
      render:(_,t) => (
        <div className="flex gap-1.5">
          <Button size="xs" variant="ghost" icon={Eye}    onClick={() => openView(t)}>View</Button>
          <Button size="xs" variant="ghost" icon={Pencil} onClick={() => openEdit(t)}>Edit</Button>
          <Button size="xs" variant="ghost" icon={Send}   onClick={() => { setTarget(t); setTestPop(true); }}>Test</Button>
        </div>
      )
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Email Templates</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">All transactional and lifecycle emails.</p>
        </div>
        <Button icon={Plus} onClick={() => { setTarget(null); setEditPop(true); }}>New Template</Button>
      </div>

      <Card noPad>
        <Table cols={COLS} rows={tmpls.slice((page-1)*PER, page*PER)}/>
        <div className="px-4"><Pager page={page} total={tmpls.length} perPage={PER} onChange={setPage}/></div>
      </Card>

      <TemplatePop open={editPop} onClose={() => { setEditPop(false); setTarget(null); }} initial={target} onSave={save}/>

      <Modal open={viewPop} onClose={() => setViewPop(false)} title={`Preview — ${target?.name}`} width={640}>
        {target && <>
          <EmailPreview tmpl={target}/>
          <div className="flex gap-2.5 mt-5">
            <Button variant="ghost" onClick={() => { setViewPop(false); openEdit(target); }}>Edit</Button>
            <Button icon={Send} variant="secondary" onClick={() => setTestPop(true)}>Send Test</Button>
            <Button className="flex-1" onClick={() => setViewPop(false)}>Close</Button>
          </div>
        </>}
      </Modal>

      <Modal open={testPop} onClose={() => setTestPop(false)} title="Send Test Email" width={380}>
        <p className="text-[13px] text-[var(--textMuted)] mb-4">Variables filled with sample data.</p>
        <Input label="Send to" type="email" value={testEmail} onChange={e => setTestEmail(e.target.value)} placeholder="test@example.com"/>
        <div className="flex gap-2.5 mt-2">
          <Button variant="ghost" onClick={() => setTestPop(false)}>Cancel</Button>
          <Button className="flex-1" onClick={async () => {
            try { await api.communications.templateTest(target.id, testEmail); showToast(`Test sent to ${testEmail || "your email"}.`); }
            catch (e) { showToast(e?.data?.message || "Test send failed.", "error"); }
            setTestPop(false); setTestEmail("");
          }}>Send Test</Button>
        </div>
      </Modal>
    </div>
  );
};
