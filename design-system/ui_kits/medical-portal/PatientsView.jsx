// Patients view — searchable table with filters & pagination.
const { Card, Avatar, Badge, StatusBadge, Button, IconButton, Input, Select, Pagination, Checkbox, Tag } = window.AlignUIDesignSystem_6ff166;

function RiskBadge({ risk }) {
  const map = { High: 'red', Moderate: 'orange', Low: 'green' };
  return <Badge color={map[risk] || 'gray'} variant="light" size="medium" dot>{risk}</Badge>;
}

function PatientsView({ onOpenPatient }) {
  const rows = window.MP_DATA.patients;
  const [page, setPage] = React.useState(1);
  return (
    <div style={{ padding: 28 }}>
      <Card padding={0}>
        {/* toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderBottom: '1px solid var(--stroke-soft-200)' }}>
          <div style={{ width: 280 }}><Input leadingIcon="search-line" placeholder="Search by name or ID…" /></div>
          <div style={{ width: 170 }}><Select leadingIcon="filter-3-line" defaultValue="all" options={[{value:'all',label:'All conditions'},{value:'htn',label:'Hypertension'},{value:'cad',label:'Coronary'}]} /></div>
          <Tag variant="gray" leadingIcon="user-heart-line" onDismiss={() => {}}>High risk</Tag>
          <div style={{ flex: 1 }} />
          <Button variant="neutral" mode="stroke" leadingIcon="download-2-line">Export</Button>
          <Button variant="primary" leadingIcon="user-add-line">Add patient</Button>
        </div>

        {/* table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead>
              <tr style={{ background: 'var(--bg-weak-100)' }}>
                {['', 'Patient', 'Patient ID', 'Condition', 'Risk', 'Last visit', 'Status', ''].map((h, i) => (
                  <th key={i} className="text-subheading-2xs" style={{ textAlign: i === 0 ? 'center' : 'left', color: 'var(--text-soft-400)', padding: '10px 16px', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--stroke-soft-200)', cursor: 'pointer' }}
                  onClick={() => onOpenPatient && onOpenPatient(p)}>
                  <td style={{ textAlign: 'center', padding: '12px 16px' }} onClick={(e) => e.stopPropagation()}><Checkbox /></td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar initials={p.initials} color={p.color} size={36} status={p.status} />
                      <div>
                        <div className="text-label-sm" style={{ color: 'var(--text-main-900)' }}>{p.name}</div>
                        <div className="text-paragraph-xs" style={{ color: 'var(--text-soft-400)' }}>{p.age} yrs</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-paragraph-sm" style={{ padding: '12px 16px', color: 'var(--text-sub-500)', whiteSpace: 'nowrap' }}>{p.id}</td>
                  <td className="text-paragraph-sm" style={{ padding: '12px 16px', color: 'var(--text-main-900)' }}>{p.condition}</td>
                  <td style={{ padding: '12px 16px' }}><RiskBadge risk={p.risk} /></td>
                  <td className="text-paragraph-sm" style={{ padding: '12px 16px', color: 'var(--text-soft-400)', whiteSpace: 'nowrap' }}>{p.last}</td>
                  <td style={{ padding: '12px 16px' }}><StatusBadge status={p.status} /></td>
                  <td style={{ padding: '12px 16px' }} onClick={(e) => e.stopPropagation()}><IconButton icon="more-2-fill" variant="neutral" mode="ghost" size="small" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
          <span className="text-paragraph-sm" style={{ color: 'var(--text-soft-400)' }}>Showing 1–6 of 328 patients</span>
          <Pagination page={page} total={55} onChange={setPage} />
        </div>
      </Card>
    </div>
  );
}

window.PatientsView = PatientsView;
