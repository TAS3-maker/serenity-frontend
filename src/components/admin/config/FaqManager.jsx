import { useState } from "react";
import { Plus, Pencil, Trash2 } from "../../../lib/icons";
import { FAQ_CATS } from "../../../lib/constants";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi";
import { Button, Badge, Toggle, Modal, Confirm, Card, Textarea, Select, Pager } from "../../ui/index";
import { Table } from "../../ui/Table";

const PER = 10;

const apiFaqToUi = (f) => ({
  id: f._id || f.id,
  q: f.question || f.q || "",
  a: f.answer   || f.a || "",
  category: f.category || "General",
  order: f.order || 0,
  published: f.published !== false,
});

export const AFaqManager = ({ showToast }) => {
  const faqApi = useApi(api.content.adminFaqList, { initial: [] });
  const faqs = (faqApi.data || []).map(apiFaqToUi);
  const setFaqs = (next) => faqApi.setData(typeof next === "function" ? next(faqs) : next);

  const [pop, setPop]   = useState(false);
  const [del, setDel]   = useState(null);
  const [editId, setEd] = useState(null);
  const [page, setPage] = useState(1);
  const BLANK = { q:"", a:"", category:"General", published:true };
  const [form, setForm] = useState(BLANK);
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const open = (faq = null) => {
    setEd(faq?.id || null);
    setForm(faq ? { q:faq.q, a:faq.a, category:faq.category, published:faq.published } : BLANK);
    setPop(true);
  };
  const save = async () => {
    if (!form.q.trim() || !form.a.trim()) { showToast("Question and answer required.", "error"); return; }
    const payload = { question: form.q, answer: form.a, category: form.category, published: form.published };
    try {
      if (editId) { await api.content.adminFaqUpdate(editId, payload); showToast("Updated."); }
      else        { await api.content.adminFaqCreate(payload);          showToast("Added."); }
      faqApi.reload();
    } catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    setPop(false);
  };

  const togglePublished = async (f, nv) => {
    try {
      await api.content.adminFaqUpdate(f.id, { published: nv });
      setFaqs(fs => fs.map(x => x.id === f.id ? { ...x, published: nv } : x));
      showToast(nv ? "Published." : "Unpublished.");
    } catch (e) { showToast(e?.data?.message || "Update failed.", "error"); }
  };

  const remove = async () => {
    try { await api.content.adminFaqDelete(del); setFaqs(fs => fs.filter(f => f.id !== del)); showToast("Deleted."); }
    catch (e) { showToast(e?.data?.message || "Delete failed.", "error"); }
    setDel(null);
  };

  const COLS = [
    { key:"q", label:"Question", render:(_,f) => (
        <div>
          <div className="font-medium text-[13px] text-[var(--text)]">{f.q}</div>
          <div className="text-[11px] text-[var(--textMuted)] mt-0.5 truncate max-w-[280px]">{f.a}</div>
        </div>
      )
    },
    { key:"category",  label:"Category",  render:v  => <Badge label={v} variant="teal"/> },
    { key:"published", label:"Published", render:(v,f) => (
        <Toggle checked={v} onChange={nv => togglePublished(f, nv)}/>
      )
    },
    { key:"id", label:"", render:(_,f) => (
        <div className="flex gap-1.5">
          <Button size="xs" variant="ghost" icon={Pencil} onClick={() => open(f)}>Edit</Button>
          <Button size="xs" variant="danger" icon={Trash2} onClick={() => setDel(f.id)}>Del</Button>
        </div>
      )
    },
  ];

  return (
    <div data-testid="admin-faq-manager">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">FAQ Manager</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">
            {faqApi.loading ? "Loading…" : `${faqs.length} FAQ${faqs.length === 1 ? "" : "s"}.`}
          </p>
        </div>
        <Button icon={Plus} onClick={() => open()}>Add FAQ</Button>
      </div>

      <Card noPad><Table cols={COLS} rows={faqs.slice((page-1)*PER,page*PER)}/><div className="px-4"><Pager page={page} total={faqs.length} perPage={PER} onChange={setPage}/></div></Card>

      <Modal open={pop} onClose={() => setPop(false)} title={editId ? "Edit FAQ" : "Add FAQ"} width={540}>
        <Textarea label="Question *" value={form.q} onChange={e => sf("q", e.target.value)} rows={2}/>
        <Textarea label="Answer *"   value={form.a} onChange={e => sf("a", e.target.value)} rows={4}/>
        <div className="grid grid-cols-2 gap-3">
          <Select label="Category" value={form.category} onChange={e => sf("category", e.target.value)}>
            {FAQ_CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <div className="flex items-center gap-2.5 pt-6">
            <Toggle checked={form.published} onChange={v => sf("published", v)}/>
            <span className="text-[13px] text-[var(--text)]">{form.published ? "Published" : "Draft"}</span>
          </div>
        </div>
        <div className="flex gap-2.5 mt-4">
          <Button variant="ghost" onClick={() => setPop(false)}>Cancel</Button>
          <Button className="flex-1" onClick={save}>{editId ? "Update" : "Add FAQ"}</Button>
        </div>
      </Modal>

      <Confirm open={!!del} onClose={() => setDel(null)} title="Delete FAQ?" message="Removes the FAQ from the website." danger confirmLabel="Delete"
        onConfirm={remove}/>
    </div>
  );
};
