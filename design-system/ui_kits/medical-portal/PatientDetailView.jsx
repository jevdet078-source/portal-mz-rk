// Patient detail — record header, tabs, vitals, history.
const { Card, Avatar, Badge, StatusBadge, Button, IconButton, Tabs, Accordion, Alert, Breadcrumbs, ProgressBar, Divider, LinkButton } = window.AlignUIDesignSystem_6ff166;

function InfoCell({ label, value }) {
  return (
    <div>
      <div className="text-subheading-2xs" style={{ color: 'var(--text-soft-400)', marginBottom: 4 }}>{label}</div>
      <div className="text-label-sm" style={{ color: 'var(--text-main-900)' }}>{value}</div>
    </div>
  );
}

function PatientDetailView({ patient, onBack }) {
  const p = patient || window.MP_DATA.patients[0];
  const d = window.MP_DATA;
  const [tab, setTab] = React.useState('overview');
  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <IconButton icon="arrow-left-line" variant="neutral" mode="stroke" onClick={onBack} />
        <Breadcrumbs items={[{ label: 'Patients', icon: 'group-line' }, { label: p.name }]} />
      </div>

      {/* header card */}
      <Card padding={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar initials={p.initials} color={p.color} size={64} status={p.status} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="text-title-h5" style={{ color: 'var(--text-main-900)' }}>{p.name}</span>
              <Badge color="teal" variant="light" leadingIcon="verified-badge-fill">Verified</Badge>
            </div>
            <div className="text-paragraph-sm" style={{ color: 'var(--text-soft-400)', marginTop: 2 }}>{p.id} · {p.age} years · {p.condition}</div>
          </div>
          <Button variant="neutral" mode="stroke" leadingIcon="message-3-line">Message</Button>
          <Button variant="primary" leadingIcon="calendar-line">Schedule visit</Button>
        </div>
        <Divider style={{ margin: '18px 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          <InfoCell label="Risk level" value={<StatusBadge color="var(--orange-base)">Moderate</StatusBadge>} />
          <InfoCell label="Blood type" value="A+ (Rh positive)" />
          <InfoCell label="Primary physician" value="Dr. E. Petrova" />
          <InfoCell label="Insurance" value="Active · MED-4471" />
        </div>
      </Card>

      <Tabs value={tab} onChange={setTab} items={[
        { value: 'overview', label: 'Overview', icon: 'profile-line' },
        { value: 'visits', label: 'Visits', icon: 'calendar-line', badge: 8 },
        { value: 'labs', label: 'Lab results', icon: 'test-tube-line' },
        { value: 'rx', label: 'Prescriptions', icon: 'capsule-line' },
      ]} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Alert state="warning" title="Medication interaction flagged" variant="light">
            Atorvastatin may interact with current Amiodarone dosage. Review before next prescription.
          </Alert>
          <Card padding={20}>
            <div className="text-label-md" style={{ color: 'var(--text-main-900)', marginBottom: 14 }}>Latest vitals</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {d.vitals.map((v, i) => {
                const c = { red: 'var(--red-base)', primary: 'var(--primary-base)', orange: 'var(--orange-base)', green: 'var(--green-base)' }[v.color];
                return (
                  <div key={i} style={{ border: '1px solid var(--stroke-soft-200)', borderRadius: 'var(--r-12)', padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <i className={`ri-${v.icon}`} style={{ fontSize: 18, color: c }} />
                      <span className="text-paragraph-sm" style={{ color: 'var(--text-soft-400)' }}>{v.label}</span>
                    </div>
                    <div className="text-title-h6" style={{ color: 'var(--text-main-900)' }}>{v.value} <span className="text-paragraph-xs" style={{ color: 'var(--text-soft-400)' }}>{v.unit}</span></div>
                    <ProgressBar value={v.trend} color={v.color} size="small" style={{ marginTop: 10 }} />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Accordion title="Medical history" icon="file-list-3-line" defaultOpen>
            Hypertension diagnosed 2019. Myocardial infarction 2021, stent placed. No known drug allergies.
          </Accordion>
          <Accordion title="Current medications" icon="capsule-line">
            Amiodarone 200mg · Lisinopril 10mg · Aspirin 75mg daily.
          </Accordion>
          <Accordion title="Family history" icon="parent-line">
            Father — coronary artery disease. Mother — type 2 diabetes.
          </Accordion>
        </div>
      </div>
    </div>
  );
}

window.PatientDetailView = PatientDetailView;
