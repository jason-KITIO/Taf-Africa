---
version: 1
slug: "src-app-connexion-page-tsx"
primary_target: "src/app/connexion/page.tsx"
related_targets: ["src/app/inscription/page.tsx","src/components/forms.tsx"]
---

# Surface brief — Comptes Taf Africa

## Scope and mode

Operate. Routes `/connexion` (`src/app/connexion/page.tsx`) and `/inscription`
(`src/app/inscription/page.tsx`). Shared client form in `src/components/forms.tsx`.
Reference screen: 390px phone; desktop composition at 1440px.

## Audience, job, action

- **Audience:** clients and freelances of francophone Africa, mostly on a phone.
- **Job:** enter the product with the least hesitation; know which account type
  applies and that credentials are handled in one clear place.
- **Action:** sign in or create an account, then continue to `/tableau-de-bord`.
- **Proof / content:** the real account form, the two roles, the working Google
  fallback, and the existing demo accounts on the login screen. No invented
  statistics, testimonials, partner logos, or guarantees.

## Constraints

- French UI. Keep `getCurrentUser` redirect, `role`, `ref`, Google route, and
  server actions unchanged.
- Preserve amber/Hanken paper system. One primary action, no decorative color.
- No kicker/eyebrow above a heading, no nested cards, no icon-card grid, no
  gradient text, no decorative glass, no hard offset shadow, no emoji icons.
- Keyboard focus, field errors, pending state, and long labels must stay usable.

## Chosen direction and memorable moment

**Atelier éditorial.** A large margin title sets the voice; the form sits in one
white panel with a hairline border. The memorable moment is the offset editorial
title block against the single calm work panel — no centered generic auth card.

## Unresolved decisions

- No password-reset flow exists; do not add a link to one.
- Google OAuth remains a demo fallback until credentials are configured.

## Direction contract

THESIS: These pages are a working threshold, not a marketing card. They refuse
the centered generic auth box by giving the task an editorial margin: the title
speaks first, the form works immediately.

OWN-WORLD: Warm paper ground, white work panel, near-black ink, hairline sand
borders, soft grounded shadow, Hanken Grotesk, pill primary button, amber only
for the active signal and the small margin mark.

STORY: The visitor understands they are entering Taf Africa, chooses or confirms
their side, and completes one obvious form to reach the dashboard.

FIRST VIEWPORT: On mobile, title and one-line promise above one white panel;
fields, single amber action, divider, Google fallback, and cross-link inside it.
On desktop, a two-column composition: large title and product cues on the left,
form panel on the right, primary action inside the panel.

FORM: Pinned whole. seed: none (pinned). "Grand titre, formulaire en colonne
nette, repères ambre discrets, fond papier chaud et cartes blanches."

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
