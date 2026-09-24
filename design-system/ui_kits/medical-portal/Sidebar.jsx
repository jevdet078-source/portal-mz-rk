// Sidebar — clinic portal left navigation.
const { Avatar, Badge } = window.AlignUIDesignSystem_6ff166;

const NAV = [
  { section: 'Clinic', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard-line' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar-line', badge: '14' },
    { id: 'patients', label: 'Patients', icon: 'group-line' },
    { id: 'labs', label: 'Lab results', icon: 'test-tube-line', dot: true },
  ]},
  { section: 'Care', items: [
    { id: 'messages', label: 'Messages', icon: 'chat-3-line', badge: '5' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'capsule-line' },
    { id: 'records', label: 'Medical records', icon: 'folder-3-line' },
  ]},
];

function NavItem({ item, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  const on = active === item.id;
  return (
    <button type="button" onClick={() => onClick(item.id)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%',
        padding: '9px 12px', borderRadius: 'var(--r-8)', border: 'none',
        background: on ? 'var(--bg-weak-100)' : (hover ? 'var(--bg-weak-100)' : 'transparent'),
        cursor: 'pointer', textAlign: 'left', position: 'relative',
      }}>
      {on && <span style={{ position: 'absolute', left: -16, top: 8, bottom: 8, width: 3, borderRadius: 3, background: 'var(--primary-base)' }} />}
      <i className={`ri-${item.icon}`} style={{ fontSize: 20, color: on ? 'var(--primary-base)' : 'var(--icon-soft-400)', lineHeight: 1 }} />
      <span className="text-label-sm" style={{ flex: 1, color: on ? 'var(--text-main-900)' : 'var(--text-sub-500)' }}>{item.label}</span>
      {item.badge && <Badge color={on ? 'blue' : 'gray'} variant="light" size="small">{item.badge}</Badge>}
      {item.dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red-base)' }} />}
    </button>
  );
}

function Sidebar({ active, onNavigate }) {
  const u = window.MP_DATA.user;
  return (
    <aside style={{
      width: 264, flex: '0 0 264px', height: '100%', background: 'var(--bg-white-0)',
      borderRight: '1px solid var(--stroke-soft-200)', display: 'flex', flexDirection: 'column',
      padding: '20px 16px', boxSizing: 'border-box',
    }}>
      {/* brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px 18px' }}>
        <span style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary-base)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 -4px 8px rgba(255,255,255,.24)' }}>
          <i className="ri-heart-pulse-fill" style={{ fontSize: 22 }} />
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, letterSpacing: '-0.02em', color: 'var(--text-main-900)' }}>
          Мед<span style={{ color: 'var(--primary-base)' }}>портал</span>
        </span>
      </div>

      {/* nav */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {NAV.map((grp) => (
          <div key={grp.section}>
            <div className="text-subheading-2xs" style={{ color: 'var(--text-soft-400)', padding: '0 12px 6px' }}>{grp.section}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {grp.items.map((it) => <NavItem key={it.id} item={it} active={active} onClick={onNavigate} />)}
            </div>
          </div>
        ))}
      </div>

      {/* footer / user */}
      <div style={{ borderTop: '1px solid var(--stroke-soft-200)', paddingTop: 12, marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={u.initials} color={u.color} size={40} status="online" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="text-label-sm" style={{ color: 'var(--text-main-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
          <div className="text-paragraph-xs" style={{ color: 'var(--text-soft-400)' }}>{u.role}</div>
        </div>
        <i className="ri-more-2-fill" style={{ fontSize: 20, color: 'var(--icon-soft-400)', cursor: 'pointer' }} />
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
