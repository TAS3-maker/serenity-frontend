/**
 * RichEditor.jsx
 * Lightweight rich text editor using contentEditable + execCommand.
 * Zero external dependencies.
 */
import { useRef, useState, useEffect } from "react";

const TOOLS = [
  { cmd:"bold",          label:"B",   title:"Bold",         style:{ fontWeight:700 } },
  { cmd:"italic",        label:"I",   title:"Italic",       style:{ fontStyle:"italic" } },
  { cmd:"underline",     label:"U",   title:"Underline",    style:{ textDecoration:"underline" } },
  { cmd:"insertUnorderedList", label:"• List", title:"Bullet list" },
  { cmd:"insertOrderedList",   label:"1. List", title:"Numbered list" },
  { cmd:"formatBlock",   label:"H2",  title:"Heading 2",    arg:"h2" },
  { cmd:"formatBlock",   label:"H3",  title:"Heading 3",    arg:"h3" },
  { cmd:"formatBlock",   label:"P",   title:"Paragraph",    arg:"p" },
  { cmd:"removeFormat",  label:"Tx",  title:"Clear format" },
];

const DIVIDER = { divider: true };

export const RichEditor = ({ label, value, onChange, minHeight = 240 }) => {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);

  // Sync value → editor on mount only
  useEffect(() => {
    if (ref.current && value && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, []); // eslint-disable-line

  const exec = (cmd, arg) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg || null);
    onChange(ref.current?.innerHTML || "");
  };

  const handleInput = () => onChange(ref.current?.innerHTML || "");

  return (
    <div className="mb-3.5">
      {label && <label className="block text-[13px] font-semibold text-[var(--text)] mb-1.5">{label}</label>}
      <div
        className="rounded-xl overflow-hidden transition-all"
        style={{
          border: `1.5px solid ${focused ? "var(--teal)" : "var(--border)"}`,
          boxShadow: focused ? "0 0 0 3px var(--tealBg)" : "none",
        }}>
        {/* Toolbar */}
        <div className="flex flex-wrap gap-0.5 p-1.5 border-b border-[var(--border)] bg-[var(--bgMuted)]">
          {[...TOOLS.slice(0,3), DIVIDER, ...TOOLS.slice(3,5), DIVIDER, ...TOOLS.slice(5)].map((t, i) => {
            if (t.divider) return <div key={i} className="w-px h-6 bg-[var(--border)] mx-1 self-center"/>;
            return (
              <button
                key={i}
                type="button"
                title={t.title}
                onMouseDown={e => { e.preventDefault(); exec(t.cmd, t.arg); }}
                className="h-7 px-2.5 rounded-lg text-[12px] font-sans font-semibold cursor-pointer border-none transition-colors hover:bg-[var(--bgCard)] text-[var(--text)]"
                style={{ background:"transparent", ...t.style }}>
                {t.label}
              </button>
            );
          })}
          {/* Link */}
          <button type="button" title="Insert link" onMouseDown={e => {
            e.preventDefault();
            const url = window.prompt("URL:");
            if (url) exec("createLink", url);
          }} className="h-7 px-2.5 rounded-lg text-[12px] font-sans cursor-pointer border-none transition-colors hover:bg-[var(--bgCard)] text-[var(--textMuted)]"
            style={{ background:"transparent" }}>
            Link
          </button>
          <button type="button" title="Horizontal rule" onMouseDown={e => { e.preventDefault(); exec("insertHorizontalRule"); }}
            className="h-7 px-2.5 rounded-lg text-[12px] font-sans cursor-pointer border-none transition-colors hover:bg-[var(--bgCard)] text-[var(--textMuted)]"
            style={{ background:"transparent" }}>
            HR
          </button>
        </div>

        {/* Editor */}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="px-4 py-3 text-[14px] leading-[1.85] outline-none text-[var(--text)] bg-[var(--bgCard)]"
          style={{
            minHeight,
            fontFamily: "Inter, sans-serif",
          }}
          data-placeholder="Start writing…"
        />
      </div>
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: var(--textFaint);
          pointer-events: none;
        }
        [contenteditable] h2 { font-size:20px; font-weight:700; margin:16px 0 8px; color:var(--text); }
        [contenteditable] h3 { font-size:17px; font-weight:600; margin:14px 0 6px; color:var(--text); }
        [contenteditable] p  { margin:0 0 10px; }
        [contenteditable] ul, [contenteditable] ol { padding-left:24px; margin:8px 0; }
        [contenteditable] li { margin:4px 0; }
        [contenteditable] a  { color:var(--teal); text-decoration:underline; }
        [contenteditable] hr { border:none; border-top:1px solid var(--border); margin:16px 0; }
      `}</style>
    </div>
  );
};
