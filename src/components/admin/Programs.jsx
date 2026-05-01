import { useState } from "react";
import { Plus, Pencil } from "../../lib/icons";
import { C } from "../../tokens";
import { PLANS } from "../../data/index";
import { Button, Badge, Toggle, Modal, Card, Input, Textarea, Select, Row } from "../ui/index";

export const APrograms = ({ showToast }) => {
  const [programs, setPrograms] = useState([
    { id:"7day",  name:"7-Day Relief Program",        days:7,  profiles:"All",       active:true,  enrolled:1284, completion:43 },
    { id:"30day", name:"30-Day Financial Calm Sprint", days:30, profiles:"All (paid)", active:true, enrolled:221,  completion:38 },
  ]);
  const [pop, setPop]   = useState(false);
  const [editId, setEd] = useState(null);
  const BLANK = { name:"", days:7, profiles:"All", active:true };
  const [form, setForm] = useState(BLANK);
  const sf = (k,v) => setForm(f=>({...f,[k]:v}));

  const openEdit = p => { setEd(p.id); setForm({name:p.name,days:p.days,profiles:p.profiles,active:p.active}); setPop(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-xl text-[var(--text)]">Programs</h1>
          <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Manage behavioral mission programs and enrollment.</p>
        </div>
        <Button icon={Plus} onClick={()=>{setEd(null);setForm(BLANK);setPop(true);}}>New Program</Button>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {programs.map(p => (
          <Card key={p.id} accent={p.active ? C.teal : "var(--textMuted)"}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="font-display font-bold text-[16px] text-[var(--text)] mb-1">{p.name}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge label={`${p.days} days`} variant="teal" />
                  <Badge label={p.profiles} variant="grey" />
                  {!p.active && <Badge label="Inactive" variant="coral"/>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Toggle checked={p.active} onChange={v=>setPrograms(ps=>ps.map(x=>x.id===p.id?{...x,active:v}:x))}/>
                <Button size="sm" variant="ghost" icon={Pencil} onClick={()=>openEdit(p)}>Edit</Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[["Enrolled",p.enrolled.toLocaleString(),C.teal],["Completion",`${p.completion}%`,C.green],["Days",p.days,C.navy]].map(([l,v,c])=>(
                <div key={l} className="p-3 rounded-xl text-center" style={{ background:"var(--bgMuted)" }}>
                  <div className="font-display font-bold text-xl leading-none mb-1" style={{ color:c }}>{v}</div>
                  <div className="text-[11px] text-[var(--textMuted)]">{l}</div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-[var(--textMuted)]">Completion rate</span>
                <span className="font-bold" style={{color:C.teal}}>{p.completion}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-[var(--bgMuted)]">
                <div className="h-full rounded-full transition-all duration-500" style={{ width:`${p.completion}%`, background:`linear-gradient(90deg,${C.teal},${C.green})` }}/>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={pop} onClose={()=>{setPop(false);setEd(null);}} title={editId?"Edit Program":"New Program"} width={480}>
        <Input label="Program Name *" value={form.name} onChange={e=>sf("name",e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Duration (days)" type="number" value={form.days} onChange={e=>sf("days",parseInt(e.target.value)||7)}/>
          <Select label="Target Profiles" value={form.profiles} onChange={e=>sf("profiles",e.target.value)}>
            <option value="All">All Profiles</option>
            <option value="Avoider">Avoider only</option>
            <option value="Anxious Manager">Anxious Manager only</option>
            <option value="Silent Stressor">Silent Stressor only</option>
            <option value="All (paid)">All — Premium only</option>
          </Select>
        </div>
        <Row label="Active"><Toggle checked={form.active} onChange={v=>sf("active",v)}/></Row>
        <div className="flex gap-2.5 mt-4">
          <Button variant="ghost" onClick={()=>{setPop(false);setEd(null);}}>Cancel</Button>
          <Button className="flex-1" onClick={()=>{
            if(!form.name){showToast("Name required.","error");return;}
            if(editId) setPrograms(ps=>ps.map(p=>p.id===editId?{...p,...form}:p));
            else setPrograms(ps=>[...ps,{id:"prog_"+Date.now(),...form,enrolled:0,completion:0}]);
            showToast(editId?"Updated.":"Created."); setPop(false);setEd(null);
          }}>{editId?"Update":"Create Program"}</Button>
        </div>
      </Modal>
    </div>
  );
};
