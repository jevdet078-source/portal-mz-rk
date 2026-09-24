# AlignUI Design System

A comprehensive, neutral-grounded UI system rebuilt from the **AlignUI Design System v1.0** Figma library and applied here to a **Медпортал** (medical-portal) product context. It provides low-level foundations (color, type, spacing, shadow), a broad set of reusable React component primitives, foundation specimen cards, and a full clinic-portal UI kit.

> **Source:** "AlignUI Design System_v1.0.fig" (attached Figma file). Tokens, type scale, shadow language and the RemixIcon set are taken from that file. The example pages in the original file cover HR & Finance; here we recreate a medical-portal product on top of the same foundations, per the brief ("Медицинский портал").

---

## 1. Product context
AlignUI is a general-purpose product design system: a quiet, neutral canvas with a confident indigo (blue) primary, an eight-family accent palette, and tightly-specified typography. It is built for **data-dense SaaS dashboards** — finance, HR, healthcare. This project applies it to **Медпортал**, a cardiology clinic portal where clinicians manage appointments, patient records, vitals and messaging.

The system ships two themeable primaries (Blue default, Purple via `:root[data-mode="purple"]`).

---

## 2. Content fundamentals
How copy is written across the system:
- **Voice:** clear, calm, clinical-professional. Short, factual labels over marketing flourish. "Today's schedule", "Pending lab results", "Schedule visit".
- **Person:** product/UI copy is impersonal and action-led ("Add patient", "Export", "Sign in"). Helper text addresses the user as *you* ("As shown on your medical record").
- **Casing:** **Sentence case** everywhere — buttons, headings, menu items ("New appointment", not "New Appointment"). The only uppercase is the **Subheading** type role (eyebrows / section labels / table headers), which is uppercase with open tracking.
- **Tone:** reassuring and precise. Status is stated plainly ("Records up to date", "Medication interaction flagged").
- **Numbers & units:** values and units are visually separated (value in label weight/colour, unit muted — `128/84 mmHg`). Deltas use +/- with an arrow icon.
- **Emoji:** none. Meaning is carried by RemixIcon glyphs, never emoji.
- **Localisation:** patient-facing content here is Russian (Cyrillic names, "Медпортал"); chrome/labels are English. Inter covers both scripts.

---

## 3. Visual foundations
- **Palette:** white & neutral-grounded. Surfaces are `--bg-white-0` on a `--bg-weak-100` (#F6F8FA) app background. Text is near-black `--neutral-900` (#0A0D14) down through a 0–900 neutral ramp. **Primary** is indigo `#4D42E9`. Eight accent families (orange, yellow, green, teal, blue, purple, pink, red), each with `base / light / lighter / dark / darker` steps, drive badges, alerts and charts.
- **Typography:** **Inter** for all UI text; **Inter Display** for large titles (optical size, tighter tracking). Four roles — **Title** (display, medium, −1% tracking), **Label** (Inter medium), **Paragraph** (Inter regular), **Subheading** (Inter medium, UPPERCASE, +2–6% tracking). Body sizes 12/14/16/18; titles 20→56.
- **Spacing:** 4px base unit. Component padding is tight and consistent (e.g. buttons 8–14px horizontal; cards 16–20px).
- **Radius:** a deliberate ramp — inputs/buttons `8–12px`, cards `12–16px`, modals `20px`, pills/avatars `full`. Larger surfaces get larger radii.
- **Backgrounds:** flat. No photographic hero backgrounds in chrome; the only gradient is the login brand panel (`primary → primary-darker`) and the glossy inset on FancyButton / the app mark. No textures, no noise.
- **Borders:** hairline `1px` strokes in `--stroke-soft-200` (#E2E4E9) define every card, input, table row and divider. Borders do the structural work; shadows stay subtle.
- **Shadows:** quiet and layered — `xs/sm` for resting cards and controls, `md/lg` for hover lift, `xl` for modals, `2xl` rare. Component-specific shadows for toggle thumbs and tooltips. Strong shadows are avoided by design.
- **Focus rings:** two-step ring — 2px white gap + 4px tinted halo (`--ring-primary` / `--ring-error`). Inputs also shift their border to the primary/red on focus.
- **Hover states:** fills darken one step (`base → dark`); ghost/stroke controls gain a `--bg-weak-100` wash; cards lift with `translateY(-2px)` + `shadow-md`. Transitions ~150ms ease.
- **Press / active states:** primarily colour-driven (darker fill); the switch thumb and radio dot animate via transform.
- **Transparency & blur:** sparing. Overlays use `rgba(14,18,27,0.5)`; on-image badges use translucent white. No frosted-glass blur in the core system.
- **Imagery vibe:** clinical, neutral, cool. Avatars are circular with optional status dots; placeholders use tinted initials, not photos.
- **Cards:** white, `12–16px` radius, hairline `--stroke-soft-200` border, `shadow-xs` at rest, optional hover lift. This is the dominant container.
- **Animation:** restrained — fades, 150ms colour/shadow transitions, small transforms. No bounces, no decorative looping motion.

---

## 4. Iconography
- **Set:** **RemixIcon** (2500+ icons, Apache-licensed) — the icon system AlignUI is built on. Loaded from CDN: `https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css`.
- **Usage:** `<i class="ri-{name}-line">` for default UI weight, `ri-{name}-fill` for active/emphasis states. Components take an `icon` / `leadingIcon` prop = the RemixIcon name **without** the `ri-` prefix (e.g. `leadingIcon="add-line"`).
- **Sizing:** 18px alongside 14px text, 20px standalone in controls, 22–24px in feature/stat badges. Colour via `--icon-strong-900` (active), `--icon-sub-500`, `--icon-soft-400` (muted).
- **Emoji / unicode:** not used as iconography. The brand "app mark" is a RemixIcon `heart-pulse` glyph in a rounded primary badge.
- **Logos:** the original file's generic "Apex" placeholder mark is copied to `assets/logos/`. The Медпортал wordmark/lockups (mark + "Медпортал") are specimen'd in `guidelines/brand-logo.card.html`.

---

## 5. Index / manifest
**Root**
- `styles.css` — global entry point (imports only).
- `tokens/` — `fonts.css`, `primitives.css` (Figma color + radius variables), `typography.css`, `shadows.css`, `spacing.css`.
- `assets/logos/` — copied Apex placeholder mark SVGs.
- `readme.md` (this file), `SKILL.md`.

**Components** (`window.AlignUIDesignSystem_6ff166`)
- `components/buttons/` — Button, IconButton, FancyButton, LinkButton
- `components/forms/` — Input, Textarea, Select, Checkbox, Radio, Switch, Label, Hint
- `components/feedback/` — Badge, Tag, StatusBadge, Alert, Banner, ProgressBar, Tooltip
- `components/data-display/` — Avatar, AvatarGroup, Card, Divider, Tabs, Accordion, Breadcrumbs, Pagination, Rating, Modal

Each component directory has `<Name>.jsx` + `<Name>.d.ts` and one `@dsCard`-tagged `*.card.html` thumbnail.

**Foundation cards** (`guidelines/`) — Type (titles, body, subheadings), Colors (primary, neutrals, accents, states), Spacing (radius, spacing, shadows), Brand (logo, iconography).

**UI kit** (`ui_kits/medical-portal/`) — full clinic-portal app: Login → Dashboard → Patients → Patient record. See its `README.md`.

---

## 6. Known substitutions / caveats
- **Inter Display** is not published as a standalone Google Fonts family; it is Inter's display optical size. We load **Inter** (variable) from Google Fonts and alias `--font-display` to it. Drop licensed Inter Display binaries into `tokens/fonts.css` to restore exact display metrics.
- Components are clean, faithful re-authorings of the AlignUI primitives against the real extracted tokens — not verbatim copies of the Figma auto-layout nodes.
