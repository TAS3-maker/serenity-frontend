import { useState, useRef } from "react";
import { Upload, Download } from "../../../lib/icons";
import { Button } from "../../ui/index";
import { Table } from "../../ui/Table";
import { downloadCSV } from "../../../lib/utils";

const SAMPLE = `name,email,profile,plan,country,device\nSarah M.,sarah@example.com,avoider,free,US,iOS\nMarcus T.,marcus@example.com,anxious,premium,UK,Android`;

export const CsvImportModal = ({ open, onClose, onImport }) => {
  const [text, setText]     = useState("");
  const [preview, setPreview] = useState([]);
  const [err, setErr]       = useState("");
  const fileRef             = useRef(null);

  const parse = (raw) => {
    setText(raw); setErr("");
    if (!raw.trim()) { setPreview([]); return; }
    const [header, ...lines] = raw.trim().split("\n");
    const keys = header.split(",").map(k => k.trim().toLowerCase());
    if (!keys.includes("name") || !keys.includes("email")) {
      setErr("Required columns: name, email"); setPreview([]); return;
    }
    const rows = lines
      .map(l => Object.fromEntries(keys.map((k,i)=>[k, l.split(",")[i]?.trim()||""])))
      .filter(r => r.name && r.email);
    setPreview(rows);
  };

  const handleFile = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => parse(e.target.result);
    r.readAsText(file);
  };

  const doImport = () => {
    const added = preview.map((r,i) => ({
      id: Date.now()+i, ...r,
      status:"new",
      streak:0, reliefScore:0, day:0,
      missionsComplete:0, totalMissions:7,
      joined: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),
      lastActive:"Today", payments:[], history:[],
    }));
    onImport(added);
    setText(""); setPreview([]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <div className="w-full max-w-[600px] rounded-2xl p-7 max-h-[92vh] overflow-y-auto"
        style={{ background:"var(--bgCard)", border:"1px solid var(--border)", boxShadow:"var(--shadowPop)" }}
        onClick={e=>e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-[17px] text-[var(--text)]">Bulk Import Users</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--textMuted)] hover:bg-[var(--bgMuted)] border-none cursor-pointer bg-transparent">✕</button>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between p-3 rounded-xl mb-4"
          style={{ background:"var(--tealBg)", border:"1px solid var(--tealBorder)" }}>
          <div>
            <div className="text-[13px] font-semibold text-[var(--teal)] mb-0.5">Required: name, email</div>
            <div className="text-[12px] text-[var(--textMuted)]">Optional: profile, plan, country, device</div>
          </div>
          <Button size="sm" variant="outline" icon={Download}
            onClick={()=>downloadCSV(SAMPLE,"users_sample.csv")}>
            Sample CSV
          </Button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files[0]);}}
          onClick={()=>fileRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer mb-4 transition-colors hover:border-[var(--teal)]"
          style={{ borderColor:"var(--border)", background:"var(--bgMuted)" }}>
          <Upload size={24} className="mx-auto mb-2 text-[var(--textMuted)]" />
          <div className="text-sm font-semibold text-[var(--textMuted)]">Drop CSV or click to browse</div>
          <div className="text-[11px] text-[var(--textFaint)] mt-1">Max 500 rows per import</div>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e=>handleFile(e.target.files[0])}/>
        </div>

        <textarea
          value={text} onChange={e=>parse(e.target.value)} rows={3}
          placeholder="Or paste CSV text here…"
          className="w-full rounded-xl p-3 text-[12px] font-mono bg-[var(--bgCard)] text-[var(--text)] resize-none outline-none mb-3"
          style={{ border:"1px solid var(--border)" }}/>

        {err && <p className="text-[12px] mb-3" style={{color:"var(--coral)"}}>⚠ {err}</p>}

        {preview.length > 0 && (
          <div className="rounded-xl overflow-hidden mb-4" style={{ border:"1px solid var(--border)" }}>
            <Table
              cols={[{key:"name",label:"Name"},{key:"email",label:"Email"},{key:"profile",label:"Profile"},{key:"plan",label:"Plan"}]}
              rows={preview.slice(0,5)}
            />
            {preview.length > 5 && (
              <div className="px-4 py-2 text-[12px] text-[var(--textMuted)] bg-[var(--bgMuted)]">
                …and {preview.length-5} more rows
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2.5">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button disabled={!preview.length} className="flex-1" onClick={doImport}>
            {preview.length ? `Import ${preview.length} users` : "Import Users"}
          </Button>
        </div>
      </div>
    </div>
  );
};
