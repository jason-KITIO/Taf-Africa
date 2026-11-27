---
name: Taf Africa
description: La marketplace qui réunit les clients et les freelances d'Afrique francophone.
colors:
  matter: "#121113"
  panel: "#1a191c"
  raised: "#222124"
  line: "#2c2b30"
  line-strong: "#414046"
  ink: "#f4f2ed"
  ink-soft: "#d1cfc9"
  muted: "#a09fa6"
  teal: "#74b9b6"
  teal-deep: "#026466"
  lime: "#cfdc00"
  lime-hover: "#e2f000"
  lime-soft: "#262a08"
  clay: "#e78a53"
  success: "#7fd1a5"
  danger: "#f08a8a"
  info: "#8fb8e8"
typography:
  display:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-compact:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.18em"
  caption:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
  micro:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.3
  logo:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.05em"
  hero-mobile:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.045em"
rounded:
  focus: "3px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "24px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.matter}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.lime-hover}"
    textColor: "{colors.matter}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.matter}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  status-pill:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

# Design System: Taf Africa

## Overview

**Creative North Star : « L'atelier de confiance, version nuit ».** seed:918cd4be8c57c633

Le système précédent était trop « papier startup ». La nouvelle direction emprunte à XING sa clarté moderniste — hiérarchie typographique forte, structure visible, poignée de couleurs, visages en superellipse — et à Darkmatter son sol presque noir, ses lignes fines et ses accents minéraux. Le résultat doit lire comme un outil de travail professionnel, pas comme une interface IA générique : moins de cartes empilées, plus de hiérarchie, de règles, de chiffres alignés et d'états explicites.

Le site public persuade par la clarté et le mécanisme ; le dashboard opère avec densité maîtrisée. Les deux mondes partagent la même grille et le même vocabulaire. Le citron est le signal d'action, le teal la structure, l'argile l'alerte. Quand tout est accent, plus rien ne guide.

**Key Characteristics :**
- Fond `matter` quasi noir, panneaux `panel`, séparateurs `line` d'un pixel.
- Citron `#cfdc00` : une seule action principale par écran, jamais un fond décoratif.
- Teal `#74b9b6` : axes, labels, liens, états neutres-actifs.
- Argile `#e78a53` : alertes et informations importantes, jamais la navigation.
- Typographie courte, dense, très lisible ; chiffres en `tnum`, statuts toujours écrits.

## Colors

La palette vient du preset Darkmatter (sol, panneaux, argile) croisé avec les couleurs de marque XING (teal profond, citron). Les tokens historiques `paper`, `surface`, `sand`, `amber-*`, `ink`, `line` sont conservés comme alias pour ne pas casser les écrans existants ; le code nouveau utilise les noms ci-dessous.

### Signal
- **Citron** `#cfdc00` : action principale, focus, point final du logo. Survol `#e2f000`.
- **Citron doux** `#262a08` : aplat de sélection et pastille d'action secondaire.
- **Teal** `#74b9b6` : labels, liens, repères de structure, succès discret.
- **Teal profond** `#026466` : ancrage de marque XING, utilisé en accent rare.
- **Argile** `#e78a53` : alertes, avertissements, montants à régler.

### Neutres
- **Matière** `#121113` : fond global, champs, creux.
- **Panneau** `#1a191c` : cartes, barres, surfaces posées.
- **Surélevé** `#222124` : sous-panneaux, pastilles, états creux.
- **Ligne** `#2c2b30` / **Ligne forte** `#414046` : séparateurs et bordures.
- **Encre** `#f4f2ed`, **Encre douce** `#d1cfc9`, **Muette** `#a09fa6` : trois niveaux de lecture seulement.

### Named Rules
**The One Accent Rule.** Une seule action citron par écran. Les autres actions sont contondantes, bordées ou textuelles.

**The Status Rule.** Un statut n'est jamais seulement une couleur : il porte toujours un libellé explicite (`Vérifié`, `À vérifier`, `Payé`, `En litige`, `Lu`, `Non lu`).

**The No-Glow Rule.** Pas de halo flou, pas de dégradé décoratif, pas de faux 3D, pas de verre dépoli. La profondeur vient des aplats et des lignes.

## Typography

**Display Font :** Hanken Grotesk. Une seule famille, du logo aux tableaux. Aucune fonte display d'appoint.

### Hierarchy
- **Display** (800, `clamp(2.5rem, 6vw, 4.5rem)`, tracking `-0.045em`) : promesses d'accueil et titres de page.
- **Headline** (700, `1.5rem`) : titres de sections et noms de personnes.
- **Title** (700, `1.0625rem`) : cartes, champs d'action, sous-titres.
- **Body** (400, `15–16px`, line-height `1.6`) : descriptions, tableaux.
- **Label** (700, `11px`, tracking `0.18em`, uppercase) : eyebrows et métadonnées.

### Named Rules
**The Numeric Rule.** Prix, crédits, budgets, notes et compteurs utilisent toujours `tnum` avec `font-variant-numeric: tabular-nums`.

## Layout

Container `max-w-6xl`, `px-5` mobile / `sm:px-8` desktop. Header sticky `64px`, bordure fine dès le scroll. Dashboard : `lg:grid-cols-[220px_minmax(0,1fr)]`, navigation horizontale scrollable sur mobile, colonne de contenu `min-w-0`. Sur téléphone, une seule action principale accessible avant le pli.

Rythme de 8 px : `gap-3`, `gap-4`, `p-5`, `py-8` puis `sm:py-10`. Les sections sont séparées par `section-rule`, pas par des ombres. Aucun débordement horizontal, y compris tableaux, emails longs et badges.

## Elevation & Depth

- **Repos :** pas d'ombre sur les cartes, seulement `1px` de bordure `line`.
- **Survol :** la bordure passe à `line-strong` ou `teal`, le fond reste stable.
- **Temporaire :** menus et panneaux flottants utilisent `shadow-lift`.

## Shapes

Actions et pastilles : `rounded-full`. Cartes et panneaux : `16px`. Champs : `12px`. Focus : `2px` citron, offset `2px`. Avatars : superellipse (`rounded-[30%]`), pas des cercles parfaits.

## Components

### Buttons
- **Primary** : fond citron, texte matière, `min-h-11`, `px-4.5`.
- **Secondary** : fond transparent, bord `line-strong`, texte encre.
- **Quiet** : texte encre douce, survol citron.
- **Danger** : fond `danger-soft`, texte `danger`, uniquement pour les actions destructives.
- **Focus** : `outline: 2px solid #cfdc00`, `outline-offset: 2px`.

### Cards / Containers
- Fond `panel`, bord `line`, radius `16px`, padding `20px`, aucune ombre au repos.
- Un titre, une métadonnée, puis le contenu. État vide : bordure dashed et fond matière.

### Inputs
- Fond `matter`, bord `line`, radius `12px`, focus bord citron et caret citron.
- Label au-dessus, aide en `muted`, erreur en `danger`.

### Status Pills
- Fond `raised`, texte `ink-soft`, libellé explicite. Teal pour succès, argile pour attention, rouille pour danger, bleu pour info.

### Navigation
- **Public** : liens textuels, un seul bouton citron à droite, menu mobile en panneau `panel`.
- **Dashboard** : nav horizontale sur mobile, colonne verticale sur desktop ; élément actif en fond encre / texte matière, sinon `muted`.

## Do's and Don'ts

- Faire apparaître les chiffres avec `tnum` et un libellé explicite.
- Garder 16 px de respiration autour des blocs denses sur mobile.
- Utiliser le citron pour guider l'action, jamais comme fond de page.
- Tester chaque écran à 390 px et 1440 px.
- Ne pas remplacer les libellés d'état par des couleurs seules.
- Ne pas ajouter de halos, gradients décoratifs ou faux effets 3D.
- Ne pas annoncer de chiffres ou garanties absents de `PRODUCT.md`.
- Ne pas utiliser `href="#"` comme lien de navigation.
