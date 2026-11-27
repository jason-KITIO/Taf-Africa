---
name: taf-dashboard-review
description: >-
  Use when building, redesigning, polishing, or reviewing any Taf Africa authenticated dashboard,
  admin panel, settings page, offer flow, credit ledger, or app shell. Enforces the "Atelier de
  confiance" visual system, mobile-first Operate layout, real credit mechanics, explicit status
  labels, accessibility, and zero invented proof.
---

# Taf dashboard review

This skill exists because a generic dashboard skill would produce an interchangeable SaaS screen.
The user said: "ça ne vas pas me faire des truc generique ?" The reason: Taf Africa must look and read like this product, not like a category template.

## Scope

Use for every authenticated or operational surface, including:

- `src/app/tableau-de-bord/`
- `src/app/admin/`
- `src/app/abonnements/`
- `src/app/parrainage/`
- `src/app/projets/`
- `src/app/offres/`
- `src/components/dashboard-shell.tsx`
- `src/components/ui.tsx`
- `src/lib/demo-store.ts`

Do not use it for public marketing pages; those are Persuade surfaces with their own surface briefs.

## Source of truth

Read these before changing anything:

1. `PRODUCT.md` for the mechanism, users, and evidence constraints.
2. `DESIGN.md` for tokens, type, layout, elevation, and component vocabulary.
3. The matching `.impeccable/surfaces/*.md` brief when one exists.
4. `src/lib/demo-store.ts` and the target page for the real data shape.

If a generic dashboard convention conflicts with these files, these files win.

## Non-negotiables

### Product truth

- Never invent statistics, testimonials, client logos, partner names, revenue, growth, or verification claims.
- Use only data exposed by `src/lib/demo-store.ts` or an explicitly labelled placeholder.
- Show the mechanism instead of fake proof: consultation is free, postulating is unlocked by credits or subscription, payment supports Mobile Money and Stripe, no company is required.
- Credit rules are exact: one simple offer costs `1` credit, one premium offer costs `15` credits, premium offers are capped at `4` per mission, and there is no free plan.
- Plan rules are exact: `Pro` 31,90 €, `Pro Max` 59,90 €, `Agence` 109,90 €, platform commission `4 %`.
- Role rules are exact: clients never see credit balance or subscription CTAs; freelances see credits, plan, and offer mechanics; admins see moderation and platform stats.
- The assistant is keyword-based, not real AI.

### Visual system

- Use the tokens from `DESIGN.md`: `paper`, `surface`, `sand`, `ink`, `muted`, `line`, `line-strong`, `amber`, `amber-strong`, `amber-strong-hover`, `amber-soft`.
- Use `Hanken Grotesk` everywhere. Do not introduce a display font for labels, buttons, tables, or data.
- Use `tnum` / `font-variant-numeric: tabular-nums` for prices, credits, budgets, ratings, counters, and ledger deltas.
- One primary action per screen uses `amber-strong`; all other actions are neutral, secondary, or textual.
- Amber is a signal, never a page background or decorative wash.
- No indigo, violet, neon, cyber gradients, faux 3D, glassmorphism, or generic chart palettes.
- Cards are `surface`, `rounded-2xl`, thin `line` border, `20px` padding, low lift. No strong shadows at rest.
- Status never relies on color alone: every pill carries an explicit word such as `Vérifié`, `À vérifier`, `Payé`, `En litige`, `Lu`, `Non lu`.

### Layout and mobile

- Design at `390px` first, then check `1440px`. A screen is not done until both pass.
- Dashboard shell uses a `min-w-0` content column, horizontal scrollable nav on mobile, and `lg:grid-cols-[220px_minmax(0,1fr)]` on desktop.
- Container rhythm: `px-5` mobile, `sm:px-8` desktop, `gap-3`/`gap-4` for dense groups, `24px` minimum breathing room on mobile.
- No horizontal overflow, including long emails, tables, badge stacks, and French labels.
- Group choices in chunks of four or fewer. If a screen needs more, create sections or progressive disclosure.
- Keep one primary CTA above the fold on mobile; move secondary actions into a grouped block.

### States and accessibility

- Every data block has loading, empty, error, and populated states. Loading uses skeletons, not center spinners.
- Every interactive component has default, hover, focus, active, disabled, loading, and error states.
- Touch targets are at least `44px`; primary buttons use `min-h-12`.
- Focus ring: `2px solid amber-strong`, `2px` offset.
- All copy is French, direct, confident, and not condescending.
- Use `aria-live` for credit changes, submission results, and async status changes.
- Never use `href="#"` as a navigation link.
- Motion only communicates state and stays in `150–250ms`. No orchestrated page-load sequences.

## Workflow

1. Read the source-of-truth files.
2. Name the role state being designed: client, freelance, or admin.
3. List the exact product facts that must appear on the screen; remove anything not grounded in `PRODUCT.md` or `demo-store.ts`.
4. Draft the information order: status first, next action second, supporting detail third, decoration last.
5. Apply the visual and layout rules above.
6. Run `impeccable detect --json <changed targets>` once after the UI is finished, then fix every finding.
7. Verify at `390px` and `1440px`: no overflow, visible focus, explicit statuses, one primary action.

## Anti-generic gate

Before declaring the work done, answer:

- Could the exact screen be shipped unchanged by Upwork, Malt, or a generic SaaS template? If yes, replace generic labels and cards with Taf Africa's credit, status, verification, or Mobile Money mechanics.
- Is any number present without a source? If yes, delete it or mark it as an explicit placeholder.
- Is a status shown only by color? If yes, add the French label.
- Is the primary action competing with a second amber button? If yes, demote the second action.
- Would a user on a phone in one hand reach the primary action without scrolling through decoration? If no, restructure the mobile order.

## Failure modes to reject

- `Revenue`, `Active users`, `Conversion rate`, or `MRR` cards copied from analytics templates.
- Fake `+24.8%` deltas, charts with invented data, or `Lorem ipsum`.
- Purple/indigo sidebars, white-on-gradient dashboards, oversized illustrations, or emoji KPIs.
- A credit balance shown to a client.
- A subscription plan called `Gratuit` or `Free`.
- A status pill with only a dot or only a color.
- Data tables that collapse into horizontal scrolling without a stacked mobile alternative.
- Decorative animation that delays access to the task.
