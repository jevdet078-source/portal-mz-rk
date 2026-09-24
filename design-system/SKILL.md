---
name: alignui-design
description: Use this skill to generate well-branded interfaces and assets for the AlignUI design system (used here for a Медпортал / medical-portal product), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, RemixIcon iconography, and a full set of UI-kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file at the root of this skill first — it is the design guide and manifest. Then explore the other files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick start
- **Global CSS:** link `styles.css` (imports all tokens, type, shadows, fonts).
- **Icons:** RemixIcon via CDN — `<link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet">`, then `<i class="ri-heart-pulse-line"></i>`.
- **Components:** load `_ds_bundle.js` and read primitives from `window.AlignUIDesignSystem_6ff166` (e.g. `const { Button, Card, Avatar } = window.AlignUIDesignSystem_6ff166`). See component `.d.ts` / `.prompt.md` files for props.
- **Type:** use the `.text-title-h*`, `.text-label-*`, `.text-paragraph-*`, `.text-subheading-*` utility classes.
- **Full product example:** `ui_kits/medical-portal/` shows the components composed into a real clinic portal.
