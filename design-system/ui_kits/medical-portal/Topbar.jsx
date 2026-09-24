// Topbar — page title, search, quick actions.
const { Input, IconButton, Button, Avatar } = window.AlignUIDesignSystem_6ff166;

const TITLES = {
  dashboard: { title: 'Dashboard', sub: 'Thursday, 13 June 2026' },
  appointments: { title: 'Appointments', sub: 'Manage your schedule' },
  patients: { title: 'Patients', sub: '328 active records' },
  patientDetail: { title: 'Patient record', sub: 'Cardiology' },
  labs: { title: 'Lab results', sub: '7 awaiting review' },
  messages: { title: 'Messages', sub: '5 unread' },
  prescriptions: { title: 'Prescriptions', sub: '' },
  records: { title: 'Medical records', sub: '' },
};

function Topbar({ view, onNewAppointment }) {
  const t = TITLES[view] || TITLES.dashboard;
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px',
      borderBottom: '1px solid var(--stroke-soft-200)', background: 'var(--bg-white-0)',
      flex: '0 0 auto',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="text-label-lg" style={{ color: 'var(--text-main-900)' }}>{t.title}</div>
        {t.sub && <div className="text-paragraph-sm" style={{ color: 'var(--text-soft-400)' }}>{t.sub}</div>}
      </div>
      <div style={{ width: 280, maxWidth: '32vw' }}>
        <Input size="medium" leadingIcon="search-line" placeholder="Search patients, records…" />
      </div>
      <IconButton icon="notification-3-line" variant="neutral" mode="stroke" />
      <IconButton icon="question-line" variant="neutral" mode="stroke" />
      <Button variant="primary" leadingIcon="add-line" onClick={onNewAppointment}>New appointment</Button>
    </header>
  );
}

window.Topbar = Topbar;
