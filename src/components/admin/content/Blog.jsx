import { useState } from "react";
import { Plus, Pencil, Trash2 } from "../../../lib/icons";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi";
import { Button, Badge, Toggle, Modal, Confirm, Card, Input, Textarea, Row, ImageUpload, Pager } from "../../ui/index";
import { RichEditor } from "../../ui/RichEditor";
import { Table } from "../../ui/Table";

const apiBlogToUi = (p) => ({
  id:         p._id || p.id,
  title:      p.title || "",
  excerpt:    p.excerpt || "",
  body:       p.body || p.content || "",
  tag:        p.tag || (p.tags || [])[0] || "General",
  date:       p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""),
  author:     p.author || "—",
  readTime:   p.readTime || "5 min read",
  coverImage: p.coverImage || p.image || "",
  published:  p.published !== false,

});

export const ABlog = ({ showToast }) => {
  const blogApi = useApi(api.content.adminBlogList, {
    initial: [],
    select: (raw) => raw?.posts ?? raw?.items ?? raw,   // backend returns { posts: [...] }
  });
  const posts   = (blogApi.data || []).map(apiBlogToUi);
  const setPosts = (next) => blogApi.setData(typeof next === "function" ? next(posts) : next);
  const [tab, setTab]             = useState("posts");
  const [editorTab, setEditorTab] = useState("visual");
  const [pop, setPop]             = useState(false);
  const [del, setDel]             = useState(null);
  const [editId, setEd]           = useState(null);
 
  const [postPage, setPostPage] = useState(1);
const PER = 10;
  const BLANK = {
    tag:"General",
    date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),
    title:"", excerpt:"", body:"", coverImage:"", author:"", readTime:"5 min read", published:false,
  };
  const [form, setForm] = useState(BLANK);
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openEdit = p => {
    setEd(p.id);
    setForm({ tag:p.tag, date:p.date, title:p.title, excerpt:p.excerpt,
      body:p.body||"", coverImage:p.coverImage||"", author:p.author||"",
      readTime:p.readTime||"5 min read", published:p.published });
    setEditorTab("visual"); setPop(true);
  };
  const save = async () => {
    if (!form.title.trim()) { showToast("Title required.", "error"); return; }
    try {
      if (editId) { await api.content.adminBlogUpdate(editId, form); showToast("Post updated."); }
      else        { await api.content.adminBlogCreate(form);          showToast("Post created."); }
      blogApi.reload();
    } catch (e) { showToast(e?.data?.message || "Save failed.", "error"); }
    setPop(false); setEd(null);
  };



  const POST_COLS = [
    { key:"title", label:"Title",
      render:(_,p) => (
        <div>
          <div className="font-semibold text-[13px] text-[var(--text)]">{p.title || <em className="text-[var(--textFaint)]">Untitled</em>}</div>
          <div className="text-[11px] text-[var(--textMuted)] truncate max-w-[220px]">{p.excerpt}</div>
        </div>
      )
    },
    { key:"tag",       label:"Tag",       render:v => <Badge label={v} variant="teal"/> },
    { key:"author",    label:"Author",    render:v => <span className="text-[12px] text-[var(--textMuted)]">{v||"—"}</span> },
    { key:"date",      label:"Date",      render:v => <span className="text-[12px] text-[var(--textMuted)] whitespace-nowrap">{v}</span> },
    { key:"published", label:"Published", render:(v,p) => <Toggle checked={v} onChange={async nv => {
      try { await api.content.adminBlogUpdate(p.id, { published: nv }); setPosts(ps => ps.map(x => x.id===p.id ? {...x,published:nv} : x)); }
      catch (e) { showToast(e?.data?.message || "Update failed.", "error"); }
    }}/> },
    { key:"id",        label:"",
      render:(_,p) => (
        <div className="flex gap-1.5">
          <Button size="xs" variant="ghost" icon={Pencil} onClick={() => openEdit(p)}>Edit</Button>
          <Button size="xs" variant="danger" icon={Trash2} onClick={() => setDel(p.id)}>Del</Button>
        </div>
      )
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Blog</h1>
        </div>
        <Button icon={Plus} onClick={() => { setEd(null); setForm(BLANK); setEditorTab("visual"); setPop(true); }}>New Post</Button>
      </div>

   
      {tab==="posts" && <Card noPad><Table cols={POST_COLS} rows={posts.slice((postPage-1)*PER,postPage*PER)}/><div className="px-4"><Pager page={postPage} total={posts.length} perPage={PER} onChange={setPostPage}/></div></Card>}

   

      {/* Blog editor popup */}
      <Modal open={pop} onClose={() => { setPop(false); setEd(null); }} title={editId?"Edit Post":"New Post"} width={760}>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <Input label="Tag / Category" value={form.tag}      onChange={e => sf("tag",      e.target.value)} placeholder="Behavioral Psychology"/>
          <Input label="Author"         value={form.author}   onChange={e => sf("author",   e.target.value)} placeholder="Dr. Aisha Bell"/>
          <Input label="Read Time"      value={form.readTime} onChange={e => sf("readTime", e.target.value)} placeholder="5 min read"/>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Input label="Title *" value={form.title} onChange={e => sf("title", e.target.value)}/>
          <Input label="Date"    value={form.date}  onChange={e => sf("date",  e.target.value)}/>
        </div>
        <Textarea label="Excerpt (shown in card)" value={form.excerpt} onChange={e => sf("excerpt", e.target.value)} rows={2}/>
        <ImageUpload label="Cover Image" value={form.coverImage} onChange={v => sf("coverImage", v)} aspect="16/6"/>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[13px] font-semibold text-[var(--text)]">Body *</label>
            <div className="flex bg-[var(--bgMuted)] rounded-lg p-0.5 gap-0.5">
              {["visual","html"].map(t => (
                <button key={t} onClick={() => setEditorTab(t)}
                  className="px-3 py-1 rounded-md text-[11px] font-semibold font-sans border-none cursor-pointer transition-all"
                  style={{ background:editorTab===t?"var(--bgCard)":"transparent", color:editorTab===t?"var(--teal)":"var(--textMuted)" }}>
                  {t==="visual" ? "Visual Editor" : "HTML / Markdown"}
                </button>
              ))}
            </div>
          </div>
          {editorTab==="visual"
            ? <RichEditor value={form.body} onChange={v => sf("body", v)} minHeight={280}/>
            : <Textarea value={form.body} onChange={e => sf("body", e.target.value)} rows={12} className="font-mono text-[12px]" placeholder="<p>Write HTML…</p>"/>
          }
        </div>

        <Row label="Published"><Toggle checked={form.published} onChange={v => sf("published", v)}/></Row>
        <div className="flex gap-2.5 mt-4">
          <Button variant="ghost" onClick={() => { setPop(false); setEd(null); }}>Cancel</Button>
          <Button className="flex-1" onClick={save}>{editId ? "Update Post" : "Create Post"}</Button>
        </div>
      </Modal>

      <Confirm open={!!del} onClose={() => setDel(null)} title="Delete Post?" message="Permanently deletes the post and all its comments." danger confirmLabel="Delete Post"
        onConfirm={async () => {
          try { await api.content.adminBlogDelete(del); setPosts(ps => ps.filter(p => p.id !== del)); showToast("Deleted."); }
          catch (e) { showToast(e?.data?.message || "Delete failed.", "error"); }
        }}/>
    </div>
  );
};
