import { useState } from "react";
import { Check } from "../../../lib/icons";
import { ADMIN_PAGES, DEFAULT_PAGE_ACCESS } from "../../../lib/constants";
import { Button, Card, Select } from "../../ui/index";

const ROLES = ["Super Admin","Content Editor","Support","Read Only"];

const ACCESS_LEVELS = [
  { id:"edit", label:"Edit",   color:"var(--green)",  desc:"Full access"  },
  { id:"view", label:"View",   color:"var(--teal)",   desc:"Read only"    },
  { id:"hide", label:"Hidden", color:"var(--coral)",  desc:"Not visible"  },
];

export const APagePermissions = ({ showToast }) => {
  const [role, setRole] = useState("Content Editor");
  const [access, setAccess] = useState(() => {
    const a = {};
    ROLES.forEach(r => { a[r] = { ...(DEFAULT_PAGE_ACCESS[r] || {}) }; });
    return a;
  });

  const setPageAccess = (r, pageId, level) =>
    setAccess(a => ({ ...a, [r]: { ...a[r], [pageId]: level } }));

  const applyPreset = (r) =>
    setAccess(a => ({ ...a, [role]: { ...(DEFAULT_PAGE_ACCESS[r] || {}) } }));

  const roleAccess = access[role] || {};
  const GROUPS = [...new Set(ADMIN_PAGES.map(p => p.group))];

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display font-bold text-xl text-[var(--text)]">Page Permissions</h1>
        <p className="text-[13px] text-[var(--textMuted)] mt-0.5">Control which pages each role can see and edit.</p>
      </div>

      {/* Role selector */}
      <div className="flex gap-3 mb-6 flex-wrap items-center">
        {ROLES.map(r => (
          <button key={r} onClick={() => setRole(r)}
            className="px-5 py-2.5 rounded-xl text-[13px] font-semibold border-none cursor-pointer font-sans transition-all"
            style={{ background:role===r?"var(--teal)":"var(--bgCard)", color:role===r?"#fff":"var(--text)", border:`1px solid ${role===r?"var(--teal)":"var(--border)"}` }}>
            {r}
          </button>
        ))}
        <div className="flex-1"/>
        <div className="flex gap-2">
          <Select value="" onChange={e => applyPreset(e.target.value)} className="!mb-0 w-auto">
            <option value="">Apply preset…</option>
            {ROLES.map(r => <option key={r} value={r}>{r} preset</option>)}
          </Select>
          <Button onClick={() => showToast(`Permissions saved for ${role}.`)}>Save {role}</Button>
        </div>
      </div>

      {/* Page access grid */}
      {GROUPS.map(group => {
        const pages = ADMIN_PAGES.filter(p => p.group === group);
        return (
          <Card key={group} title={group} className="mb-4">
            <div className="space-y-1">
              {pages.map(page => {
                const current = roleAccess[page.id] || "hide";
                return (
                  <div key={page.id} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-none">
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-[var(--text)]">{page.label}</div>
                      <div className="text-[11px] text-[var(--textMuted)]">/{page.id}</div>
                    </div>
                    <div className="flex gap-1.5">
                      {ACCESS_LEVELS.map(level => (
                        <button key={level.id} onClick={() => setPageAccess(role, page.id, level.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold border-none cursor-pointer font-sans transition-all"
                          style={{
                            background: current===level.id ? level.color+"18" : "var(--bgMuted)",
                            color:      current===level.id ? level.color : "var(--textMuted)",
                            border:     `1.5px solid ${current===level.id ? level.color+"40" : "transparent"}`,
                          }}>
                          {current===level.id && <Check size={11} color={level.color}/>}
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}

      {/* Legend */}
      <div className="rounded-xl p-4" style={{ background:"var(--bgMuted)" }}>
        <div className="text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-widest mb-3">Access Levels</div>
        <div className="grid grid-cols-3 gap-3">
          {ACCESS_LEVELS.map(l => (
            <div key={l.id} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] flex-shrink-0" style={{ background:l.color+"18", color:l.color }}>✓</div>
              <div>
                <div className="text-[12px] font-semibold text-[var(--text)]">{l.label}</div>
                <div className="text-[11px] text-[var(--textMuted)]">{l.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
