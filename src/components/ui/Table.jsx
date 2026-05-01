/**
 * Table.jsx
 * Reusable admin data table — eliminates 14 duplicate table patterns.
 * Usage:
 *   <Table cols={cols} rows={rows} empty="No data." />
 *   cols = [{ key, label, width?, render? }]
 */
export const Table = ({ cols, rows = [], empty = "No data found.", loading = false }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse" style={{ minWidth: cols.length * 80 }}>
      <thead>
        <tr style={{ background: "var(--bgMuted)" }}>
          {cols.map(c => (
            <th key={c.key}
              className="text-left text-[11px] font-bold text-[var(--textMuted)] uppercase tracking-[.6px] whitespace-nowrap"
              style={{ padding: "10px 14px", width: c.width }}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={cols.length} className="text-center py-12 text-[13px] text-[var(--textMuted)]">
              <div className="inline-flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-[var(--teal)] border-t-transparent animate-spin" />
                Loading…
              </div>
            </td>
          </tr>
        ) : rows.length === 0 ? (
          <tr>
            <td colSpan={cols.length} className="text-center py-12 text-[13px] text-[var(--textMuted)]">
              {empty}
            </td>
          </tr>
        ) : rows.map((row, i) => (
          <tr key={row.id ?? i} className="transition-colors hover:bg-[var(--bgMuted)]/40"
            style={{ borderBottom: "1px solid var(--border)" }}>
            {cols.map(c => (
              <td key={c.key} className="text-[13px] text-[var(--text)]" style={{ padding: "11px 14px" }}>
                {c.render ? c.render(row[c.key], row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
