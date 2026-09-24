// App shell — ties views together with simple state routing.
const { Banner, Button } = window.AlignUIDesignSystem_6ff166;

function App() {
  const [authed, setAuthed] = React.useState(false);
  const [view, setView] = React.useState('dashboard');
  const [patient, setPatient] = React.useState(null);
  const [showBanner, setShowBanner] = React.useState(true);

  if (!authed) return <LoginView onSignIn={() => setAuthed(true)} />;

  const openPatient = (p) => { setPatient(p || window.MP_DATA.patients[0]); setView('patientDetail'); };
  const navigate = (id) => { setView(id); setPatient(null); };

  let content;
  if (view === 'dashboard') content = <DashboardView onOpenPatient={() => openPatient()} />;
  else if (view === 'patients') content = <PatientsView onOpenPatient={openPatient} />;
  else if (view === 'patientDetail') content = <PatientDetailView patient={patient} onBack={() => setView('patients')} />;
  else content = <PatientsView onOpenPatient={openPatient} />;

  const topbarView = view === 'patientDetail' ? 'patientDetail' : view;

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-weak-100)' }}>
      <Sidebar active={view === 'patientDetail' ? 'patients' : view} onNavigate={navigate} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Topbar view={topbarView} onNewAppointment={() => {}} />
        {showBanner && (
          <Banner state="feature" onClose={() => setShowBanner(false)}
            action={<Button size="xsmall" variant="primary" mode="lighter">Try it</Button>}>
            New: AI-assisted triage summaries are now available on patient records.
          </Banner>
        )}
        <div style={{ flex: 1, overflowY: 'auto' }}>{content}</div>
      </div>
    </div>
  );
}

window.App = App;
