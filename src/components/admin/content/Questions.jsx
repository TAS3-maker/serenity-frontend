import { useState } from "react";
import { Plus, Pencil, Trash2 } from "../../../lib/icons";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi";
import { Button, Toggle, Modal, Confirm, Card, Input, Textarea, Row, Pager } from "../../ui/index";
import { Table } from "../../ui/Table";

const PER = 10;

export const AQuestions = ({ showToast }) => {
  const qApi = useApi(api.content.adminQuestionList, { initial: [] });
  const qs = (qApi.data || []).map(q => ({
    id: q._id || q.id,
    q: q.question || q.q || "",
    opts: (q.options || q.opts || []).map(o => o.text || o.label || o),
    active: q.active !== false,
  }));
  const setQs = (next) => qApi.setData(typeof next === "function" ? next(qs) : next);
  const [pop, setPop]   = useState(false);
  const [del, setDel]   = useState(null);
  const [editId, setEd] = useState(null);
  const [page, setPage] = useState(1);
  const BLANK = { q:"", opts:["","","",""], active:true };
  const [form, setForm] = useState(BLANK);
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const open = (q = null) => {
    setEd(q?.id || null);
    setForm(q ? { q:q.q, opts:[...q.opts], active:q.active } : BLANK);
    setPop(true);
  };
  const save = async () => {
    if (!form.q.trim()) { showToast("Question text required.", "error"); return; }
    const payload = { question: form.q, options: form.opts.map(t => ({ text: t })), active: form.active };
    try {
      if (editId) { await api.content.adminQuestionUpdate(editId, payload); showToast("Updated."); }
      else        { await api.content.adminQuestionCreate(payload);          showToast("Added."); }
      qApi.reload();
    } catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    setPop(false);
  };

  const COLS = [
    { key:"q", label:"Question",
      render:(_,q) => (
        <div>
          <div className="text-[13px] text-[var(--text)] font-medium">{q.q}</div>
          <div className="text-[11px] text-[var(--textMuted)] mt-0.5">{q.opts.slice(0,2).map((o,i)=>`${i+1}. ${o}`).join(" · ")}…</div>
        </div>
      )
    },
    { key:"active", label:"Active",
      render:(v,q) => <Toggle checked={v} onChange={() => setQs(xs => xs.map(x => x.id===q.id ? {...x,active:!x.active} : x))}/>
    },
    { key:"id", label:"",
      render:(_,q) => (
        <div className="flex gap-1.5">
          <Button size="xs" variant="ghost" icon={Pencil} onClick={() => open(q)}>Edit</Button>
          <Button size="xs" variant="danger" icon={Trash2} onClick={() => setDel(q.id)}>Del</Button>
        </div>
      )
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Assessment Questions</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Option order: 1=Avoider · 2=Anxious · 3=Silent · 4=Healthy</p>
        </div>
        <Button icon={Plus} onClick={() => open()}>Add Question</Button>
      </div>

      <Card noPad><Table cols={COLS} rows={qs.slice((page-1)*PER,page*PER)} empty="No questions yet."/><div className="px-4"><Pager page={page} total={qs.length} perPage={PER} onChange={setPage}/></div></Card>

      <Modal open={pop} onClose={() => setPop(false)} title={editId ? "Edit Question" : "Add Question"} width={540}>
        <Textarea label="Question Text *" value={form.q} onChange={e => sf("q", e.target.value)} rows={2}/>
        <div className="p-3 rounded-xl mb-3 text-[12px] font-medium text-[var(--teal)]"
          style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
          Option order: <strong>1=Avoider</strong> · <strong>2=Anxious Manager</strong> · <strong>3=Silent Stressor</strong> · <strong>4=Healthy</strong>
        </div>
        {form.opts.map((o, i) => (
          <Input key={`opt-${i}`}
            label={`Option ${i+1} — ${["Avoider","Anxious Manager","Silent Stressor","Healthy"][i]}`}
            value={o}
            onChange={e => { const opts=[...form.opts]; opts[i]=e.target.value; sf("opts",opts); }}
          />
        ))}
        <Row label="Active in assessment"><Toggle checked={form.active} onChange={v => sf("active", v)}/></Row>
        <div className="flex gap-2.5 mt-4">
          <Button variant="ghost" onClick={() => setPop(false)}>Cancel</Button>
          <Button className="flex-1" onClick={save}>{editId ? "Update" : "Add Question"}</Button>
        </div>
      </Modal>

      <Confirm open={!!del} onClose={() => setDel(null)} title="Delete Question?"
        message="Removes this question from future assessments." danger confirmLabel="Delete"
        onConfirm={async () => {
          try { await api.content.adminQuestionDelete(del); setQs(xs => xs.filter(x => x.id !== del)); showToast("Deleted."); }
          catch (e) { showToast(e?.data?.message || "Delete failed.", "error"); }
        }}/>
    </div>
  );
};
