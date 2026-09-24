// Dashboard view — stat widgets, today's schedule, quick panels.
const { Card, Badge, Avatar, StatusBadge, Button, LinkButton, ProgressBar, Tabs } = window.AlignUIDesignSystem_6ff166;

function StatCard({ s }) {
  const tint = { blue: ['var(--blue-lighter)','var(--blue-base)'], green: ['var(--green-lighter)','var(--green-base)'], orange: ['var(--orange-lighter)','var(--orange-base)'], purple: ['var(--purple-lighter)','var(--purple-base)'] }[s.color];
  return (
    <Card padding={18} hover>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: 40, height: 40, borderRadius: 'var(--r-10)', background: tint[0], color: tint[1], display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className={`ri-${s.icon}`} style={{ fontSize: 22 }} />
        </span>
        <Badge color={s.up ? 'green' : 'red'} variant="light" size="small" leadingIcon={s.up ? 'arrow-up-line' : 'arrow-down-line'}>{s.delta}</Badge>
      </div>
      <div className="text-title-h4" style={{ color: 'var(--text-main-900)', marginTop: 14 }}>{s.value}</div>
      <div className="text-paragraph-sm" style={{ color: 'var(--text-soft-400)', marginTop: 2 }}>{s.label}</div>
    </Card>
  );
}

function ScheduleRow({ a, onOpen }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--stroke-soft-200)' }}>
      <div className="text-label-sm" style={{ width: 48, color: 'var(--text-sub-500)' }}>{a.time}</div>
      <Avatar initials={a.initials} color={a.color} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="text-label-sm" style={{ color: 'var(--text-main-900)', display: 'flex', alignItems: 'center', gap: 6 }}>
          {a.name}
          {a.video && <i className="ri-vidicon-line" style={{ fontSize: 16, color: 'var(--primary-base)' }} />}
        </div>
        <div className="text-paragraph-xs" style={{ color: 'var(--text-soft-400)' }}>{a.reason} · {a.dur}</div>
      </div>
      <StatusBadge status={a.status} />
      <Button size="xsmall" variant="neutral" mode="stroke" onClick={() => onOpen && onOpen()}>Open</Button>
    </div>
  );
}

function DashboardView({ onOpenPatient }) {
  const d = window.MP_DATA;
  const [tab, setTab] = React.useState('today');
  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {d.stats.map((s) => <StatCard key={s.id} s={s} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, alignItems: 'start' }}>
        <Card padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="text-label-lg" style={{ color: 'var(--text-main-900)' }}>Today's schedule</div>
            <LinkButton trailingIcon="arrow-right-s-line">Full calendar</LinkButton>
          </div>
          <Tabs value={tab} onChange={setTab} variant="pill" items={[
            { value: 'today', label: 'Today', badge: d.schedule.length },
            { value: 'week', label: 'This week' },
            { value: 'tele', label: 'Telemedicine' },
          ]} />
          <div style={{ marginTop: 6 }}>
            {d.schedule.map((a, i) => <ScheduleRow key={i} a={a} onOpen={onOpenPatient} />)}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card padding={20}>
            <div className="text-label-md" style={{ color: 'var(--text-main-900)', marginBottom: 14 }}>Patient vitals · A. Иванова</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {d.vitals.map((v, i) => {
                const c = { red: 'var(--red-base)', primary: 'var(--primary-base)', orange: 'var(--orange-base)', green: 'var(--green-base)' }[v.color];
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <i className={`ri-${v.icon}`} style={{ fontSize: 18, color: c }} />
                      <span className="text-paragraph-sm" style={{ flex: 1, color: 'var(--text-sub-500)' }}>{v.label}</span>
                      <span className="text-label-sm" style={{ color: 'var(--text-main-900)' }}>{v.value} <span className="text-paragraph-xs" style={{ color: 'var(--text-soft-400)' }}>{v.unit}</span></span>
                    </div>
                    <ProgressBar value={v.trend} color={v.color} size="small" />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card padding={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: 'var(--r-10)', background: 'var(--green-lighter)', color: 'var(--green-base)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ri-shield-check-line" style={{ fontSize: 22 }} />
              </span>
              <div style={{ flex: 1 }}>
                <div className="text-label-sm" style={{ color: 'var(--text-main-900)' }}>Records up to date</div>
                <div className="text-paragraph-xs" style={{ color: 'var(--text-soft-400)' }}>Last synced 4 minutes ago</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

window.DashboardView = DashboardView;
