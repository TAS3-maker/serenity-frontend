import { useState } from "react";
import { QrCode, Link, Download, RefreshCw, Pencil } from "../../../lib/icons";
import { Button, Toggle, Modal, Card, Input, Row } from "../../ui/index";

export const AQRManager = ({ showToast }) => {
  const [links, setLinks] = useState([
    { id:"ios",     label:"iOS App Store",  url:"https://apps.apple.com/app/serenitydecoded",          qr:"/assets/qr-ios.svg",     active:true  },
    { id:"android", label:"Google Play",    url:"https://play.google.com/store/apps/serenitydecoded",   qr:"/assets/qr-android.svg", active:true  },
    { id:"web",     label:"Web App",        url:"https://app.serenitydecoded.com",                      qr:"/assets/qr-app.svg",     active:true  },
    { id:"promo",   label:"Promotional QR", url:"https://serenitydecoded.com/start",                    qr:"/assets/qr-app.svg",     active:false },
  ]);
  const [editPop, setEditPop] = useState(false);
  const [target, setTarget]   = useState(null);
  const [form, setForm]       = useState({ label:"", url:"", active:true });
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const open = l => { setTarget(l); setForm({ label:l.label, url:l.url, active:l.active }); setEditPop(true); };
  const save = () => {
    if (!form.url.trim()) { showToast("URL required.", "error"); return; }
    setLinks(ls => ls.map(l => l.id === target.id ? { ...l, ...form } : l));
    showToast("Link updated."); setEditPop(false);
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display font-bold text-xl text-[var(--text)]">QR Code & App Links</h1>
        <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Manage download links and QR codes shown on the website and marketing materials.</p>
      </div>

      <div className="rounded-2xl p-4 mb-5 flex items-center gap-4" style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
        <QrCode size={20} color="var(--teal)"/>
        <div className="flex-1">
          <div className="font-semibold text-[13px] text-[var(--teal)]">QR codes are live on the website</div>
          <div className="text-[12px] text-[var(--textMuted)] mt-0.5">Changing a URL automatically regenerates its QR code.</div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[var(--textMuted)]">
          <div className="w-2 h-2 rounded-full" style={{ background:"var(--green)" }}/>
          {links.filter(l => l.active).length} active
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {links.map(link => (
          <div key={link.id} className="rounded-2xl p-5 border transition-all"
            style={{ background:"var(--adminCard)", borderColor:link.active?"var(--tealBorder)":"var(--border)", opacity:link.active?1:0.6 }}>
            <div className="flex items-start gap-4">
              <img src={link.qr} alt="QR" className="w-20 h-20 rounded-xl flex-shrink-0" style={{ border:"1px solid var(--border)", background:"#fff" }}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-display font-bold text-[14px] text-[var(--text)]">{link.label}</span>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:link.active?"var(--green)":"var(--border)" }}/>
                </div>
                <div className="flex items-center gap-1.5 mb-3 bg-[var(--bgMuted)] rounded-lg px-2.5 py-1.5">
                  <Link size={11} color="var(--textMuted)"/>
                  <span className="text-[11px] text-[var(--textMuted)] truncate font-mono">{link.url}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <Button size="xs" variant="ghost" icon={Pencil}    onClick={() => open(link)}>Edit URL</Button>
                  <Button size="xs" variant="ghost" icon={RefreshCw} onClick={() => showToast("QR regenerated.")}>Regen QR</Button>
                  <Button size="xs" variant="ghost" icon={Download}  onClick={() => { const a=document.createElement("a");a.href=link.qr;a.download=`${link.label.replace(/\s+/g,"-").toLowerCase()}-qr.svg`;a.click();showToast("Downloaded."); }}>Download</Button>
                  <Toggle checked={link.active} onChange={v => setLinks(ls => ls.map(l => l.id===link.id ? {...l,active:v} : l))}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={editPop} onClose={() => setEditPop(false)} title={`Edit — ${target?.label}`} width={480}>
        <Input label="Label" value={form.label} onChange={e => sf("label", e.target.value)}/>
        <Input label="Destination URL *" type="url" value={form.url} onChange={e => sf("url", e.target.value)} placeholder="https://…" hint="Changing the URL regenerates the QR code automatically."/>
        {target && (
          <div className="rounded-xl p-4 mb-4 flex items-center gap-4" style={{ background:"var(--bgMuted)" }}>
            <img src={target.qr} alt="QR" className="w-16 h-16 rounded-xl" style={{ background:"#fff", border:"1px solid var(--border)" }}/>
            <div>
              <div className="text-[12px] font-semibold text-[var(--text)] mb-1">Current QR code</div>
              <div className="text-[11px] text-[var(--textMuted)]">Will update on save if URL changed.</div>
            </div>
          </div>
        )}
        <Row label="Show on website"><Toggle checked={form.active} onChange={v => sf("active", v)}/></Row>
        <div className="flex gap-2.5 mt-4">
          <Button variant="ghost" onClick={() => setEditPop(false)}>Cancel</Button>
          <Button className="flex-1" onClick={save}>Save & Regenerate QR</Button>
        </div>
      </Modal>
    </div>
  );
};
