import { useState } from "react";
import { Plus, Download, Upload, Pencil, Trash2 } from "../../../lib/icons";
import { api } from "../../../lib/api";
import { profileLabel, MISSION_TYPES } from "../../../lib/constants";
import { Button, Badge, Toggle, Modal, Confirm, Card, Input, Select, Row, Pager } from "../../ui/index";
import { Table } from "../../ui/Table";
import { downloadCSV } from "../../../lib/utils";

const PER = 10;
const SAMPLE_CSV = `day,title,profile,type,duration,body\n1,Understanding Your Pattern,all,reflection,3,Today we begin by simply noticing how money feels.\n3,The Avoidance Map,avoider,mapping,3,We map exactly what you avoid and when.`;

// ─── CSV import popup ──────────────────────────────────────────
const CsvPop = ({ open, onClose, existing, onImport }) => {
  const [text, setText] = useState("");
  const [rows, setRows] = useState([]);
  const [err, setErr]   = useState("");

  const parse = (raw) => {
    setText(raw); setErr(""); setRows([]);
    if (!raw.trim()) return;
    const [header, ...lines] = raw.trim().split("\n");
    const keys = header.split(",").map(k => k.trim().toLowerCase());
    if (!keys.includes("day") || !keys.includes("title")) { setErr("Columns required: day, title"); return; }
    const parsed = lines.map(l => {
      const vals = l.split(",").map(v => v.trim());
      return Object.fromEntries(keys.map((k,i) => [k, vals[i]||""]));
    }).filter(r => r.day && r.title);
    setRows(parsed);
  };

  const doImport = () => {
    const dups = rows.filter(r => existing.some(e => e.day===Number(r.day) && e.profile===(r.profile||"all")));
    const newRows = rows.filter(r => !dups.includes(r)).map((r,i) => ({
      id: Date.now()+i, day:Number(r.day), title:r.title, profile:r.profile||"all",
      type:r.type||"reflection", duration:Number(r.duration)||3, body:r.body||"",
      active:true, sentCount:0,
    }));
    onImport(newRows);
    setText(""); setRows([]);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="w-full max-w-[560px] rounded-2xl p-7" style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }} onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-[17px] text-[var(--text)]">Import Actions from CSV</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--textMuted)] hover:bg-[var(--bgMuted)] border-none cursor-pointer bg-transparent">✕</button>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl mb-4" style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
          <div className="text-[12px] text-[var(--teal)]">Required columns: <strong>day, title</strong> · Optional: profile, type, duration, body</div>
          <Button size="sm" variant="outline" onClick={() => downloadCSV(SAMPLE_CSV,"actions_sample.csv")}>Sample CSV</Button>
        </div>
        <textarea value={text} onChange={e => parse(e.target.value)} rows={5}
          placeholder="Paste CSV here…"
          className="w-full rounded-xl p-3 text-[12px] font-mono bg-[var(--bgCard)] text-[var(--text)] resize-none outline-none mb-3"
          style={{ border:"1px solid var(--border)" }}/>
        {err && <p className="text-[12px] text-[var(--coral)] mb-3">⚠ {err}</p>}
        {rows.length > 0 && <p className="text-[12px] text-[var(--teal)] mb-3">✓ {rows.length} actions ready to import</p>}
        <div className="flex gap-2.5">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button disabled={!rows.length} className="flex-1" onClick={() => { doImport(); onClose(); }}>
            Import {rows.length || ""} actions
          </Button>
        </div>
      </div>
    </div>
  );
};

// ─── Action form popup ─────────────────────────────────────────
const ActionPop = ({ open, onClose, initial, actions, onSave }) => {
  const BLANK = { day:"", title:"", profile:"all", type:"reflection", duration:"3", body:"" };
  const [form, setForm] = useState(initial ? {...initial, day:String(initial.day), duration:String(initial.duration)} : BLANK);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose} title={initial?"Edit Action":"Add Action"} width={520}>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Day *"    type="number" value={form.day}      onChange={e=>set("day",e.target.value)}  placeholder="1–30"/>
        <Select label="Profile" value={form.profile} onChange={e=>set("profile",e.target.value)}>
          <option value="all">All Profiles</option><option value="avoider">Avoider</option><option value="anxious">Anxious Manager</option><option value="silent">Silent Stressor</option>
        </Select>
        <Select label="Type" value={form.type} onChange={e=>set("type",e.target.value)}>
          {MISSION_TYPES.map(t=><option key={t} value={t} className="capitalize">{t}</option>)}
        </Select>
        <Input label="Duration (min)" type="number" value={form.duration} onChange={e=>set("duration",e.target.value)}/>
      </div>
      <Input label="Mission Title *" value={form.title} onChange={e=>set("title",e.target.value)}/>
      <div className="mb-3.5">
        <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">Mission Body</label>
        <textarea value={form.body} onChange={e=>set("body",e.target.value)} rows={4}
          className="w-full rounded-xl p-3 text-[13px] font-sans bg-[var(--bgCard)] text-[var(--text)] resize-y outline-none"
          style={{ border:"1.5px solid var(--border)" }}/>
      </div>
      <div className="flex gap-2.5 mt-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button className="flex-1" onClick={()=>{ if(!form.day||!form.title){return;} onSave(form); onClose(); }}>
          {initial?"Update":"Add Action"}
        </Button>
      </div>
    </Modal>
  );
};

// ─── Action Library page ───────────────────────────────────────
export const ActionLibrary = ({ actions, setActions, showToast }) => {
  const [actPop, setActPop]   = useState(false);
  const [csvPop, setCsvPop]   = useState(false);
  const [delId, setDelId]     = useState(null);
  const [target, setTarget]   = useState(null);
  const [page, setPage]       = useState(1);

  const apiPayload = (form) => ({
    name:     form.title,
    title:    form.title,
    body:     form.body,
    profile:  form.profile,
    audience: form.profile,
    channel:  "push",
    type:     form.type,
    duration: Number(form.duration) || 3,
    day:      Number(form.day),
    active:   true,
  });

  const saveAction = async (form) => {
    try {
      if (target) {
        const r = await api.scheduler.actionUpdate(target.id, apiPayload(form));
        const updated = r?.item || r?.data;
        setActions(aa => aa.map(a => a.id === target.id ? { ...a, ...form, day: Number(form.day), duration: Number(form.duration), id: updated?._id || a.id } : a));
        showToast("Action updated.");
      } else {
        const r = await api.scheduler.actionCreate(apiPayload(form));
        const created = r?.item || r?.data || r;
        setActions(aa => [...aa, {
          id: created?._id || Date.now(),
          ...form,
          day: Number(form.day),
          duration: Number(form.duration),
          active: true,
          sentCount: 0,
        }].sort((a, b) => a.day - b.day));
        showToast("Action added.");
      }
    } catch (e) {
      showToast(e?.data?.message || "Save failed.", "error");
    }
    setTarget(null);
  };

  const deleteAction = async (id) => {
    try {
      await api.scheduler.actionDelete(id);
      setActions(aa => aa.filter(a => a.id !== id));
      showToast("Deleted.");
    } catch (e) {
      showToast(e?.data?.message || "Delete failed.", "error");
    }
  };

  const toggleActive = async (a) => {
    try {
      await api.scheduler.actionUpdate(a.id, { active: !a.active });
      setActions(aa => aa.map(x => x.id === a.id ? { ...x, active: !x.active } : x));
    } catch (e) { showToast(e?.data?.message || "Update failed.", "error"); }
  };

  const importRows = async (rows) => {
    try {
      await api.scheduler.actionImport(rows.map(r => ({
        name: r.title, title: r.title, body: r.body || "",
        profile: r.profile || "all", audience: r.profile || "all",
        type: r.type || "reflection", duration: Number(r.duration) || 3,
        day: Number(r.day), active: true,
      })));
      setActions(aa => [...aa, ...rows.map((r, i) => ({
        id: Date.now() + i, day: Number(r.day), title: r.title, profile: r.profile || "all",
        type: r.type || "reflection", duration: Number(r.duration) || 3, body: r.body || "",
        active: true, sentCount: 0,
      }))].sort((a, b) => a.day - b.day));
      showToast(`${rows.length} actions imported.`);
    } catch (e) { showToast(e?.data?.message || "Import failed.", "error"); }
  };

  const ACT_COLS = [
    { key:"day",   label:"Day",     width:60,  render:(_,a)=><div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] text-white" style={{background:"var(--teal)"}}>D{a.day}</div> },
    { key:"title", label:"Mission", render:(_,a)=><div><div className="font-medium text-[13px] text-[var(--text)]">{a.title}</div>{a.body&&<div className="text-[11px] text-[var(--textMuted)] truncate max-w-[200px]">{a.body}</div>}</div> },
    { key:"profile",label:"Profile",render:v=><Badge label={v==="all"?"All":profileLabel(v)} variant={v==="all"?"grey":"teal"}/> },
    { key:"type",  label:"Type",    render:v=><span className="text-[12px] text-[var(--textMuted)] capitalize">{v}</span> },
    { key:"sentCount",label:"Sent", render:v=><span className="font-semibold text-[13px]" style={{color:v>0?"var(--teal)":"var(--textMuted)"}}>{v.toLocaleString()}</span> },
    { key:"active",label:"Active",  render:(v,a)=><Toggle checked={v} onChange={()=>toggleActive(a)}/> },
    { key:"id",    label:"",        render:(_,a)=>(
      <div className="flex gap-1">
        <Button size="xs" variant="ghost" icon={Pencil} onClick={()=>{setTarget(a);setActPop(true);}}>Edit</Button>
        <Button size="xs" variant="danger" icon={Trash2} onClick={()=>setDelId(a.id)}>Del</Button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-[13px] text-[var(--textMuted)]"><strong className="text-[var(--text)]">{actions.length}</strong> actions in library</span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" icon={Download} onClick={()=>downloadCSV(SAMPLE_CSV,"actions_sample.csv")}>Sample CSV</Button>
          <Button size="sm" variant="ghost" icon={Upload} onClick={()=>setCsvPop(true)}>Import CSV</Button>
          <Button size="sm" icon={Plus} onClick={()=>{setTarget(null);setActPop(true);}}>Add Action</Button>
        </div>
      </div>
      <Card noPad>
        <Table cols={ACT_COLS} rows={actions.slice((page-1)*PER, page*PER)} empty="No actions yet. Add one or import from CSV."/>
        <div className="px-4"><Pager page={page} total={actions.length} perPage={PER} onChange={setPage}/></div>
      </Card>
      <ActionPop open={actPop} onClose={()=>{setActPop(false);setTarget(null);}} initial={target} actions={actions} onSave={saveAction}/>
      <CsvPop open={csvPop} onClose={()=>setCsvPop(false)} existing={actions} onImport={importRows}/>
      <Confirm open={!!delId} onClose={()=>setDelId(null)} title="Delete Action?" message="This removes the action from the library and all schedulers that reference it." danger confirmLabel="Delete"
        onConfirm={()=>deleteAction(delId)}/>
    </div>
  );
};
