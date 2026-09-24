// Login — split brand panel + sign-in form.
const { Input, Button, FancyButton, Checkbox, Label, Divider, Badge } = window.AlignUIDesignSystem_6ff166;

function LoginView({ onSignIn }) {
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-white-0)' }}>
      {/* brand panel */}
      <div style={{
        flex: '0 0 44%', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, var(--primary-base), var(--primary-darker))',
        color: '#fff', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.16)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ri-heart-pulse-fill" style={{ fontSize: 22 }} />
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, letterSpacing: '-0.02em' }}>Медпортал</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 36, lineHeight: '44px', letterSpacing: '-0.01em' }}>
            Care, coordinated.
          </div>
          <p className="text-paragraph-lg" style={{ color: 'rgba(255,255,255,.78)', marginTop: 12, maxWidth: 360 }}>
            One secure workspace for appointments, records and patient communication.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <Badge color="teal" variant="filled" leadingIcon="shield-check-line">HIPAA compliant</Badge>
            <Badge color="green" variant="filled" leadingIcon="lock-2-line">End-to-end encrypted</Badge>
          </div>
        </div>
        <div className="text-paragraph-sm" style={{ color: 'rgba(255,255,255,.6)' }}>© 2026 Медпортал Clinic Systems</div>
        <i className="ri-pulse-line" style={{ position: 'absolute', right: -40, bottom: -30, fontSize: 280, color: 'rgba(255,255,255,.06)' }} />
      </div>

      {/* form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: 360, maxWidth: '100%' }}>
          <div className="text-title-h4" style={{ color: 'var(--text-main-900)' }}>Welcome back</div>
          <p className="text-paragraph-md" style={{ color: 'var(--text-soft-400)', marginTop: 6 }}>Sign in to your clinician account.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" leadingIcon="mail-line" defaultValue="e.petrova@medportal.ru" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" leadingIcon="lock-2-line" trailingIcon="eye-off-line" defaultValue="••••••••" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <Checkbox defaultChecked /><span className="text-paragraph-sm" style={{ color: 'var(--text-sub-500)' }}>Remember me</span>
              </label>
              <a href="#" className="text-label-sm" style={{ color: 'var(--primary-base)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <FancyButton variant="primary" fullWidth onClick={onSignIn}>Sign in</FancyButton>
            <Divider>or</Divider>
            <Button variant="neutral" mode="stroke" fullWidth leadingIcon="government-line">Continue with clinic SSO</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.LoginView = LoginView;
