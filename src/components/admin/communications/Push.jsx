import { useState } from "react";
import { Pencil, Trash2, Send, RefreshCw } from "../../../lib/icons";
import { C } from "../../../tokens";
import { api } from "../../../lib/api";
import { useApi } from "../../../lib/useApi";
import { Button, Badge, Card, Input, Textarea, Select, Modal, Pager } from "../../ui/index";
import { Table } from "../../ui/Table";

const SEGMENTS = [
  { value:"all",     label:"All users"             },
  { value:"premium", label:"Premium only"          },
  { value:"free",    label:"Free only"             },
  { value:"avoider", label:"Avoiders"              },
  { value:"anxious", label:"Anxious Managers"      },
  { value:"silent",  label:"Silent Stressors"      },
];

const PER = 10;

export const APush = ({ showToast }) => {
  const [title, setTitle]         = useState("");
  const [body, setBody]           = useState("");
  const [segment, setSegment]     = useState("all");
  const histApi = useApi(api.communications.pushList, { initial: [] });
  const history = (histApi.data || []).map(h => ({
    id: h._id || h.id,
    title: h.title || "",
    body: h.body || "",
    segment: h.audience || h.segment || "all",
    sent: h.delivered ?? h.sent ?? 0,
    opened: h.opened ?? 0,
    clicked: h.clicked ?? 0,
    status: h.status || "sent",
    date: h.sentAt ? new Date(h.sentAt).toLocaleString() : "",
  }));
  const setHistory = (next) => histApi.setData(typeof next === "function" ? next(history) : next);
  const [histPage, setHistPage]   = useState(1);
  const [tab, setTab]             = useState("send");
  const [editPop, setEditPop]     = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [delId, setDelId]         = useState(null);

  const send = async () => {
    if (!title || !body) { showToast("Title and body required.", "error"); return; }
    try {
      const r = await api.communications.pushCreate({ title, body, audience: segment });
      const item = r?.item || r;
      showToast(`Push sent to ${(item?.delivered ?? 0).toLocaleString()} users.`);
      setTitle(""); setBody("");
      histApi.reload();
    } catch (e) { showToast(e?.data?.message || "Send failed.", "error"); }
  };

  const resend = (n) => {
    setTitle(n.title); setBody(n.body); setSegment(n.segment); setTab("send");
    showToast("Loaded in composer — edit and resend.");
  };

  const HIST_COLS = [
    { key:"title",   label:"Notification",
      render:(_,n) => (
        <div>
          <div className="font-semibold text-[13px] text-[var(--text)]">{n.title}</div>
          <div className="text-[11px] text-[var(--textMuted)] truncate max-w-[200px]">{n.body}</div>
        </div>
      )
    },
    { key:"segment", label:"Audience", render:v  => <Badge label={v} variant="grey"/> },
    { key:"sent",    label:"Sent",     render:v  => <span className="font-semibold text-[13px] text-[var(--text)]">{v.toLocaleString()}</span> },
    { key:"opened",  label:"Open %",   render:(v,n) => <span className="text-[var(--teal)] font-semibold text-[12px]">{n.sent>0?`${Math.round(v/n.sent*100)}%`:"—"}</span> },
    { key:"clicked", label:"Click %",  render:(v,n) => <span className="text-[var(--gold)] font-semibold text-[12px]">{n.sent>0?`${Math.round(v/n.sent*100)}%`:"—"}</span> },
    { key:"date",    label:"Sent at",  render:v  => <span className="text-[12px] text-[var(--textMuted)] whitespace-nowrap">{v}</span> },
    { key:"status",  label:"Status",   render:v  => <Badge label={v} variant={v==="delivered"?"green":"gold"}/> },
    { key:"id",      label:"",
      render:(_,n) => (
        <div className="flex gap-1">
          <Button size="xs" variant="ghost" icon={RefreshCw} onClick={() => resend(n)}>Resend</Button>
          <Button size="xs" variant="ghost" icon={Pencil}    onClick={() => { setEditTarget({...n}); setEditPop(true); }}>Edit</Button>
          <Button size="xs" variant="danger" icon={Trash2}   onClick={() => setDelId(n.id)}>Del</Button>
        </div>
      )
    },
  ];

  return (
    <div>
      {/* Header + tab switch */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h1 className="font-display font-bold text-xl text-[var(--text)]">Push Notifications</h1>
        <div className="flex bg-[var(--bgCard)] rounded-xl border border-[var(--border)] overflow-hidden">
          {[["send","Compose"], ["history",`History (${history.length})`]].map(([v,l]) => (
            <button key={v} onClick={() => setTab(v)}
              className="px-5 py-2 text-[13px] font-semibold font-sans border-none cursor-pointer transition-all"
              style={{ background:tab===v?"var(--teal)":"transparent", color:tab===v?"#fff":"var(--textMuted)" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Compose tab */}
      {tab === "send" && (
        <div className="grid grid-cols-2 gap-5">
          <Card title="Send Push Notification">
            <Input label="Title *" value={title} onChange={e => setTitle(e.target.value)} placeholder="Day 4 mission is ready"/>
            <Textarea label="Body *" value={body} onChange={e => setBody(e.target.value)} rows={3} placeholder="Your mission for today is waiting…"/>
            <Select label="Audience" value={segment} onChange={e => setSegment(e.target.value)}>
              {SEGMENTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </Select>

            {/* Character limit bars */}
            <div className="p-3 rounded-xl mb-4" style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
              <div className="text-[11px] text-[var(--teal)] font-semibold mb-1.5">Character limits</div>
              <div className="flex items-center justify-between text-[11px] text-[var(--textMuted)] mb-1">
                <span>Title: {title.length}/65</span>
                <span>Body: {body.length}/240</span>
              </div>
              <div className="flex gap-2">
                <div className="h-1 rounded-full overflow-hidden flex-1 bg-[var(--bgMuted)]">
                  <div className="h-full rounded-full transition-all" style={{ width:`${Math.min(100,title.length/65*100)}%`, background:title.length>65?"var(--coral)":"var(--teal)" }}/>
                </div>
                <div className="h-1 rounded-full overflow-hidden flex-1 bg-[var(--bgMuted)]">
                  <div className="h-full rounded-full transition-all" style={{ width:`${Math.min(100,body.length/240*100)}%`, background:body.length>240?"var(--coral)":"var(--teal)" }}/>
                </div>
              </div>
            </div>
            <Button onClick={send} className="w-full">Send Push Notification</Button>
          </Card>

          <Card title="Live Preview">
            <div className="rounded-2xl p-5 bg-[var(--bgMuted)] border border-[var(--border)] mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background:`linear-gradient(135deg,${C.teal},#1E7145)` }}>S</div>
                <div>
                  <div className="font-semibold text-[13px] text-[var(--text)]">SerenityDecoded</div>
                  <div className="text-[11px] text-[var(--textMuted)]">now</div>
                </div>
              </div>
              <div className="font-semibold text-[14px] text-[var(--text)] mb-1.5">{title || "Notification title"}</div>
              <div className="text-[13px] text-[var(--textMuted)] leading-relaxed">{body || "Notification body text will appear here."}</div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Sent today", history.length],
                ["Avg open",   `${Math.round(history.reduce((a,n) => a+(n.sent>0?n.opened/n.sent:0),0)/Math.max(history.length,1)*100)}%`],
                ["Avg click",  `${Math.round(history.reduce((a,n) => a+(n.sent>0?n.clicked/n.sent:0),0)/Math.max(history.length,1)*100)}%`],
              ].map(([l,v]) => (
                <div key={l} className="p-3 rounded-xl text-center bg-[var(--bgMuted)]">
                  <div className="font-display font-bold text-lg leading-none text-[var(--teal)]">{v}</div>
                  <div className="text-[10px] text-[var(--textMuted)] mt-1">{l}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* History tab */}
      {tab === "history" && (
        <Card noPad title="Send History" sub="All push notifications — Resend to reuse, Edit to modify, Del to remove">
          <Table cols={HIST_COLS} rows={history.slice((histPage-1)*PER,histPage*PER)} empty="No push notifications sent yet."/>
          <div className="px-4"><Pager page={histPage} total={history.length} perPage={PER} onChange={setHistPage}/></div>
        </Card>
      )}

      {/* Edit popup */}
      <Modal open={editPop} onClose={() => setEditPop(false)} title="Edit Notification" width={480}>
        {editTarget && <>
          <Input label="Title" value={editTarget.title} onChange={e => setEditTarget(t => ({...t, title:e.target.value}))}/>
          <Textarea label="Body" value={editTarget.body} onChange={e => setEditTarget(t => ({...t, body:e.target.value}))} rows={3}/>
          <div className="flex gap-2.5 mt-3">
            <Button variant="ghost" onClick={() => setEditPop(false)}>Cancel</Button>
            <Button className="flex-1" onClick={async () => {
              try { await api.communications.pushUpdate(editTarget.id, { title: editTarget.title, body: editTarget.body }); setHistory(h => h.map(n => n.id===editTarget.id ? {...n, ...editTarget} : n)); showToast("Updated."); }
              catch (e) { showToast(e?.data?.message || "Update failed.", "error"); }
              setEditPop(false);
            }}>Save</Button>
          </div>
        </>}
      </Modal>

      {/* Delete confirm */}
      {delId && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setDelId(null)}>
          <div className="w-full max-w-[380px] rounded-2xl p-7"
            style={{ background:"var(--bgCard)", border:"1px solid var(--border)" }}
            onClick={e => e.stopPropagation()}>
            <h3 className="font-display font-bold text-[17px] text-[var(--text)] mb-2">Delete notification?</h3>
            <p className="text-[13px] text-[var(--textMuted)] mb-5">This removes it from your history.</p>
            <div className="flex gap-2.5">
              <Button variant="ghost" onClick={() => setDelId(null)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={async () => {
                try { await api.communications.pushDelete(delId); setHistory(h => h.filter(n => n.id !== delId)); showToast("Deleted."); }
                catch (e) { showToast(e?.data?.message || "Delete failed.", "error"); }
                setDelId(null);
              }}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
