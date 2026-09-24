# Медпортал — Clinic Portal UI kit

A high-fidelity, click-through recreation of a medical clinic portal, built entirely from the AlignUI component primitives in this design system (`window.AlignUIDesignSystem_6ff166`). It demonstrates the system's app chrome (sidebar + topbar), data-dense surfaces, and form/feedback patterns in a real product context.

## Run
Open `index.html`. It loads React + Babel + RemixIcon + the compiled `_ds_bundle.js`, then mounts `App`.

## Flow
1. **Login** (`LoginView.jsx`) — split brand panel + sign-in form. Click **Sign in** to enter.
2. **Dashboard** (`DashboardView.jsx`) — stat widgets, today's schedule (pill tabs), patient vitals.
3. **Patients** (`PatientsView.jsx`) — searchable table with filters, risk badges, pagination. Click a row →
4. **Patient record** (`PatientDetailView.jsx`) — record header, tabs, vitals grid, history accordions, interaction alert.

Navigate via the sidebar; **Patients** row → opens the detail view; the back arrow returns.

## Files
| File | Role |
|------|------|
| `index.html` | Shell — loads deps + bundle, mounts `App` |
| `data.js` | Mock clinic data (`window.MP_DATA`) |
| `Sidebar.jsx` | Left navigation + user footer |
| `Topbar.jsx` | Page title, search, quick actions |
| `DashboardView.jsx` | Overview screen |
| `PatientsView.jsx` | Patient table |
| `PatientDetailView.jsx` | Single patient record |
| `LoginView.jsx` | Auth screen |
| `App.jsx` | State routing |

## Notes
- Every screen composes design-system primitives (Button, Card, Avatar, Badge, Tabs, Alert, Input, …) — no bespoke re-implementations.
- Cross-file JSX components are shared via `window.*` because each `<script type="text/babel">` is transpiled in its own scope.
- Content is illustrative (a Russian-language cardiology clinic) to match the "Медицинский портал" brief.
