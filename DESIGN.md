---
name: Taf Africa
description: La marketplace qui réunit les clients et les freelances d'Afrique francophone.
colors:
  paper: "#fafaf7"
  surface: "#ffffff"
  sand: "#f4efe3"
  ink: "#14171c"
  ink-soft: "#333941"
  muted: "#4b525c"
  line: "#e4dfd2"
  line-strong: "#cdc5b3"
  amber: "#e0900e"
  amber-deep: "#b4700a"
  amber-strong: "#9a5f08"
  amber-strong-hover: "#7f4d06"
  amber-soft: "#fbeccb"
typography:
  display:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
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
    fontSize: "0.75rem"
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
    letterSpacing: "-0.02em"
  hero-mobile:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.4rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
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
    backgroundColor: "{colors.amber-strong}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.amber-strong-hover}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  status-pill:
    backgroundColor: "{colors.amber-soft}"
    textColor: "{colors.amber-strong}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

# Design System: Taf Africa

## Overview

**Creative North Star: "L'atelier de confiance".** seed:918cd4be8c57c633

Taf Africa ressemble à un atelier de travail soigné plus qu'à une place de marché bruyante : fond papier chaud, encre nette, ambre rare et décisif, cartes calmes, chiffres alignés. Le système refuse le spectacle inutile et laisse la confiance venir de la précision des informations : prix, statuts, délais, vérifications et responsables sont toujours lisibles avant toute décoration.

Le site public persuade par la clarté et la preuve ; le dashboard opère avec densité maîtrisée. Les deux mondes partagent la même grille, le même vocabulaire de composants et la même hiérarchie. L'ambre est le signal d'action, pas un fond général ; quand tout est accent, plus rien ne guide.

**Key Characteristics:**
- Papier chaud, surface blanche, ambre utilisé comme signal rare.
- Hiérarchie typographique courte, dense et très lisible.
- Cartes à bords fins, ombres douces, aucun faux effet de profondeur.
- État visible partout : statut, crédit, vérification, paiement, litige.
- Mobile d'abord : navigation horizontale dans le dashboard, jamais de débordement.

## Colors

La palette oppose un fond papier légèrement crème à une encre quasi noire, avec un ambre artisanal réservé aux actions et aux repères de marque.

### Primary
- **Ambre profond** (#9a5f08) : action principale, focus, liens internes importants.
- **Ambre de survol** (#7f4d06) : état survol des actions principales.
- **Ambre clair** (#e0900e) : sélection, liserés de marque, points d'accent.
- **Ambre doux** (#fbeccb) : pastilles d'état et aplats d'alerte non critiques.

### Secondary
- **Sable** (#f4efe3) : avatars, pastilles neutres, aplats de section discrets.
- **Papier** (#fafaf7) : fond global, champs, zones de contenu calmes.

### Neutral
- **Surface** (#ffffff) : cartes, panneaux, en-têtes, zones surélevées.
- **Encre** (#14171c) : titres, texte fort, barre de navigation active.
- **Encre douce** (#333941) : corps de texte secondaire.
- **Muette** (#4b525c) : descriptions, légendes, métadonnées.
- **Ligne** (#e4dfd2) : séparateurs et bordures par défaut.
- **Ligne forte** (#cdc5b3) : bordures de champs, boutons secondaires, barres d'outils.

### Named Rules
**The One Accent Rule.** Une seule action principale par écran porte l'ambre profond en aplat. Les autres actions sont neutres ou textuelles.

**The Status Rule.** Un statut n'est jamais seulement une couleur : il porte toujours un libellé explicite.

## Typography

**Display Font:** Hanken Grotesk (fallback système sans-serif)  
**Body Font:** Hanken Grotesk (fallback système sans-serif)

**Character:** Une grotesque contemporaine, légèrement compacte, assez neutre pour disparaître devant les données mais assez affirmée dans les graisses 700–800 pour structurer l'écran.

### Hierarchy
- **Display** (800, `text-3xl` puis `text-4xl`, tracking `-0.03em`, line-height ~1.05) : titres de pages publiques et promesses d'accueil.
- **Headline** (700, `text-lg` à `text-2xl`) : titres de cartes, sections de dashboard, noms de freelances.
- **Title** (700, `text-base`) : sous-titres, libellés de formulaire, actions fortes.
- **Body** (400, `text-sm` à `text-base`, line-height 1.6) : descriptions, paragraphes, tableaux.
- **Label** (700, `text-xs`, tracking `0.18em`, uppercase) : eyebrows, métadonnées, catégories.

### Named Rules
**The Numeric Rule.** Prix, crédits, budgets, notes et compteurs utilisent toujours `tnum` avec `font-variant-numeric: tabular-nums`.

## Layout

Le contenu public et le dashboard partagent un container `max-w-6xl`, avec `px-5` sur mobile et `sm:px-8` à partir de `640px`. Le header est sticky, haut de `64px`, avec un état translucide au scroll ; le dashboard ajoute une grille `lg:grid-cols-[220px_minmax(0,1fr)]`, une navigation horizontale scrollable sur mobile et une colonne de contenu `min-w-0`.

Les sections utilisent un rythme de 8 px : `gap-3`, `gap-4`, `p-5`, `py-8` puis `sm:py-10`, et des séparations plus fortes de `32px` à `40px` entre blocs. Les cartes seules portent l'aplats blanc ; le fond reste papier. Aucun écran ne doit dépasser la largeur viewport, y compris avec des tableaux, des emails longs et des accumulations de badges.

## Elevation & Depth

Le système est peu profond : profondeur par aplats et bordures d'abord, ombre seulement pour séparer une carte du fond papier.

### Shadow Vocabulary
- **Soft** (`0 1px 2px rgba(20, 23, 28, 0.05), 0 10px 26px -14px rgba(20, 23, 28, 0.16)`) : cartes, barres de navigation, petits panneaux.
- **Lift** (`0 2px 4px rgba(20, 23, 28, 0.06), 0 22px 46px -20px rgba(20, 23, 28, 0.26)`) : menus mobiles et surfaces temporaires au-dessus du contenu.

### Named Rules
**The Flat-By-Default Rule.** Une carte est plate au repos ; l'ombre ne devient plus forte que pour un menu ou un état temporaire.

## Shapes

Les formes sont arrondies mais jamais jouets : `rounded-full` pour les actions et pastilles, `rounded-2xl` (16 px) pour les cartes, `rounded-xl` (12 px) pour les champs et navigation, `rounded-xs` (4 px) pour le focus. Les bordures sont fines, en `line`, et deviennent `line-strong` sur les champs et boutons secondaires. Le dotted grid reste un fond de rupture de section, pas une texture permanente.

## Components

### Buttons
- **Shape:** pillée (`999px`), bord visible, une ligne de texte, `px-4 py-2`, `text-sm font-bold`.
- **Primary:** fond `amber-strong`, texte `paper`, ombre douce au header ; survol `amber-strong-hover`.
- **Secondary:** fond `surface`, bord `line-strong`, texte `ink`, survol par bord plus sombre.
- **Ghost:** bord transparent, texte `ink`, survol `ink/5`.
- **Danger:** fond rouge pâle, texte rouge foncé, uniquement pour les actions destructives.
- **Focus:** `outline: 2px solid amber-strong`, `outline-offset: 2px`.

### Cards / Containers
- **Corner Style:** `16px`, bord `line`, fond `surface`, padding `20px`.
- **Density:** titre, métadonnée, puis contenu. Espacement interne de 4 à 16 px.
- **States:** une carte peut être dashed et papier pour un empty state ; sinon elle ne change pas de fond.

### Inputs
- **Shape:** `12px`, bord `line`, fond `paper`, padding `10px 14px`.
- **Focus:** bord `amber-strong`, fond `surface`, caret `amber-strong`.
- **Labels:** au-dessus du champ, `text-sm font-bold`, aide en `text-xs muted`, erreur en rouge.

### Status Pills
- **Shape:** pillée, `px-2.5 py-1`, `text-xs font-bold`.
- **Tone:** neutre `ink/5`, succès vert pâle, avertissement `amber-soft`, danger rouge pâle, info bleu pâle.
- **Rule:** toujours accompagnées d'un mot : `funded`, `released`, `Vérifié`, `À vérifier`.

### Navigation
- **Public:** container `max-w-6xl`, liens textuels arrondis, action principale ambre à droite, menu mobile en panneau blanc ombré.
- **Dashboard:** nav horizontale sur mobile, colonne verticale sur desktop ; élément actif en `bg-ink text-paper`, sinon `text-muted`.
- **Rule:** pas de logo d'action répété : une seule CTA primaire par en-tête.

## Do's and Don'ts

- Faire apparaître les chiffres avec `tnum` et un libellé explicite.
- Garder au moins 16 px de respiration autour des blocs denses sur mobile.
- Utiliser l'ambre pour guider l'action et la validation, jamais comme fond de page.
- Tester chaque nouvelle page à 390 px et 1440 px avant de la considérer terminée.
- Ne pas remplacer les libellés d'état par des couleurs seules.
- Ne pas ajouter d'ombres fortes, de gradients décoratifs ou de faux effets 3D.
- Ne pas utiliser `href="#"` comme lien de navigation.
- Ne pas annoncer des chiffres ou des garanties absents de `PRODUCT.md`.
