import type { ComponentType, SVGProps } from "react";
import {
  Brain,
  Camera,
  Cart,
  Code,
  Globe,
  Megaphone,
  Palette,
  Pen,
  Phone,
  Shield,
  Users,
} from "@/components/icons";

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export const paymentProviders = [
  "Orange Money",
  "Wave",
  "MTN MoMo",
  "Moov Money",
  "Visa",
  "Mastercard",
  "Stripe",
];

export const valueProps: {
  icon: Icon;
  title: string;
  description: string;
}[] = [
  {
    icon: Users,
    title: "Candidatures plafonnées",
    description:
      "Chaque mission reçoit 5 à 10 propositions au maximum. Côté client, moins de bruit à trier. Côté freelance, une vraie chance d'être lu.",
  },
  {
    icon: Shield,
    title: "Paiement local et sécurisé",
    description:
      "Mobile Money (Orange, Wave, MTN, Moov) ou carte bancaire via Stripe. Les fonds sont sécurisés jusqu'à la validation de la livraison.",
  },
  {
    icon: Globe,
    title: "Aucune société requise",
    description:
      "Pas besoin d'être une entreprise pour travailler. Une vérification d'identité légère suffit à publier ton profil et à candidater.",
  },
  {
    icon: Palette,
    title: "Consulter reste gratuit",
    description:
      "Parcourir les missions, les budgets, les délais et les profils ne coûte rien. Seule la candidature se débloque avec des crédits ou un abonnement.",
  },
];

export const categories: { icon: Icon; label: string }[] = [
  { icon: Code, label: "Développement web" },
  { icon: Phone, label: "Applications mobiles" },
  { icon: Palette, label: "Design & UI/UX" },
  { icon: Pen, label: "Rédaction & traduction" },
  { icon: Megaphone, label: "Marketing & SEO" },
  { icon: Cart, label: "E-commerce" },
  { icon: Brain, label: "Data & IA" },
  { icon: Users, label: "Community management" },
  { icon: Camera, label: "Vidéo & motion design" },
  { icon: Globe, label: "Support & admin" },
];

export type Mission = {
  slug: string;
  title: string;
  excerpt: string;
  details: string[];
  category: string;
  budget: string;
  delay: string;
  proposals: number;
  cap: number;
  views: number;
  tags: string[];
  posted: string;
  applicants: string[];
};

// Données de démonstration : contenu authored, à remplacer par de vraies
// missions une fois le produit en ligne. Aucune preuve commerciale inventée.
export const missions: Mission[] = [
  {
    slug: "refonte-boutique-shopify",
    title: "Refonte d'une boutique e-commerce Shopify",
    excerpt:
      "Nous relançons notre boutique de cosmétiques naturels. Besoin d'un thème sur-mesure, plus rapide et pensé mobile, avec un tunnel d'achat simplifié.",
    details: [
      "Thème Shopify sur-mesure, chargement prioritaire sur mobile.",
      "Tunnel d'achat simplifié et paiement Mobile Money en option.",
      "Reprise du catalogue existant et de la charte actuelle.",
    ],
    category: "E-commerce",
    budget: "1 500 – 3 000 €",
    delay: "3 à 4 semaines",
    proposals: 6,
    cap: 8,
    views: 412,
    tags: ["Shopify", "UI/UX", "Thème sur-mesure"],
    posted: "il y a 2 h",
    applicants: ["AK", "MD", "SL", "FB"],
  },
  {
    slug: "app-suivi-livraison",
    title: "Application mobile de suivi de livraison",
    excerpt:
      "Développement d'une app Flutter pour suivre les colis en temps réel, avec notifications et back-office Node.js. API logistique déjà documentée.",
    details: [
      "Application Flutter iOS et Android, notifications push.",
      "API logistique documentée, back-office Node.js à adapter.",
      "Suivi temps réel des colis et historique des livraisons.",
    ],
    category: "Applications mobiles",
    budget: "4 000 – 8 000 €",
    delay: "2 à 3 mois",
    proposals: 8,
    cap: 10,
    views: 587,
    tags: ["Flutter", "Node.js", "API"],
    posted: "il y a 5 h",
    applicants: ["YT", "NB", "KR", "OD", "PM"],
  },
  {
    slug: "identite-visuelle-cosmetiques",
    title: "Identité visuelle pour une marque de cosmétiques",
    excerpt:
      "Création du logo, de la charte graphique et des packagings pour un lancement de gamme. Univers chaleureux, ancré dans l'artisanat ouest-africain.",
    details: [
      "Logo, palette, typographies et déclinaisons print.",
      "Packagings pour une gamme de six références.",
      "Guide de marque livré pour l'équipe interne.",
    ],
    category: "Design & UI/UX",
    budget: "800 – 1 500 €",
    delay: "2 semaines",
    proposals: 4,
    cap: 8,
    views: 318,
    tags: ["Logo", "Charte graphique", "Packaging"],
    posted: "il y a 9 h",
    applicants: ["AG", "CD", "LM"],
  },
  {
    slug: "campagne-seo-google-ads",
    title: "Campagne SEO + Google Ads pour un cabinet",
    excerpt:
      "Un cabinet de conseil souhaite gagner en visibilité locale. Audit technique, contenu optimisé et pilotage d'une campagne d'acquisition sur 3 mois.",
    details: [
      "Audit technique et sémantique du site existant.",
      "Rédaction de contenus optimisés et suivi mensuel.",
      "Pilotage d'une campagne d'acquisition avec budget défini.",
    ],
    category: "Marketing & SEO",
    budget: "600 – 1 200 €/mois",
    delay: "Mission récurrente",
    proposals: 5,
    cap: 8,
    views: 246,
    tags: ["SEO", "Google Ads", "Analytics"],
    posted: "il y a 1 j",
    applicants: ["SB", "EK"],
  },
  {
    slug: "plateforme-saas-gestion-scolaire",
    title: "Plateforme SaaS de gestion scolaire",
    excerpt:
      "Concevoir une plateforme web multi-établissements : notes, présences, facturation et espace parents. Stack moderne, architecture à valider ensemble.",
    details: [
      "Gestion des notes, présences et facturation.",
      "Espaces distincts pour l'administration, les enseignants et les parents.",
      "Architecture multi-établissements à valider ensemble.",
    ],
    category: "Développement web",
    budget: "8 000 – 15 000 €",
    delay: "4 à 6 mois",
    proposals: 7,
    cap: 10,
    views: 721,
    tags: ["Next.js", "PostgreSQL", "SaaS"],
    posted: "il y a 1 j",
    applicants: ["MB", "RS", "TD", "HA"],
  },
  {
    slug: "site-vitrine-hotel-multilingue",
    title: "Site vitrine multilingue pour un hôtel",
    excerpt:
      "Site de présentation avec réservation directe, version française et anglaise, photos de chambres et intégration d'un moteur de disponibilité.",
    details: [
      "Site français et anglais, contenus modifiables par l'hôtel.",
      "Réservation directe et calendrier de disponibilité.",
      "Galerie photo optimisée et référencement local.",
    ],
    category: "Développement web",
    budget: "2 000 – 3 500 €",
    delay: "4 semaines",
    proposals: 3,
    cap: 8,
    views: 189,
    tags: ["WordPress", "Réservation", "i18n"],
    posted: "il y a 2 j",
    applicants: ["NA", "JC"],
  },
  {
    slug: "tableau-de-bord-data-ong",
    title: "Tableau de bord data pour une ONG",
    excerpt:
      "Visualiser les indicateurs terrain de plusieurs projets : collecte, nettoyage et restitution dans un tableau de bord clair pour les bailleurs.",
    details: [
      "Consolidation des données de plusieurs projets terrain.",
      "Nettoyage et fiabilisation des indicateurs.",
      "Tableau de bord de restitution pour les bailleurs.",
    ],
    category: "Data & IA",
    budget: "3 000 – 5 000 €",
    delay: "6 semaines",
    proposals: 2,
    cap: 8,
    views: 143,
    tags: ["Python", "Data viz", "Power BI"],
    posted: "il y a 3 j",
    applicants: ["KZ"],
  },
  {
    slug: "motion-design-campagne-sensibilisation",
    title: "Motion design pour une campagne de sensibilisation",
    excerpt:
      "Une série de trois vidéos animées de 30 secondes pour une campagne santé publique, déclinables en format vertical pour les réseaux sociaux.",
    details: [
      "Trois vidéos animées de 30 secondes.",
      "Storyboards et voix off, déclinaisons verticales.",
      "Charte graphique de la campagne déjà fournie.",
    ],
    category: "Vidéo & motion design",
    budget: "1 200 – 2 000 €",
    delay: "3 semaines",
    proposals: 4,
    cap: 8,
    views: 205,
    tags: ["After Effects", "Storyboard", "Animation"],
    posted: "il y a 3 j",
    applicants: ["FM", "OK"],
  },
  {
    slug: "redaction-fiches-produits",
    title: "Rédaction de fiches produits et traductions",
    excerpt:
      "Rédiger 120 fiches produits en français puis les traduire en anglais. Ton éditorial déjà défini, guide de style fourni.",
    details: [
      "120 fiches produits rédigées en français.",
      "Traduction en anglais avec guide de style fourni.",
      "Relecture et intégration au back-office.",
    ],
    category: "Rédaction & traduction",
    budget: "500 – 900 €",
    delay: "2 semaines",
    proposals: 6,
    cap: 8,
    views: 167,
    tags: ["Rédaction", "Traduction", "E-commerce"],
    posted: "il y a 4 j",
    applicants: ["PL", "GB", "SN"],
  },
  {
    slug: "animation-communaute-reseaux",
    title: "Animation d'une communauté sur les réseaux",
    excerpt:
      "Prendre en charge la ligne éditoriale et l'animation quotidienne d'une communauté Instagram et Facebook pour une marque de mode locale.",
    details: [
      "Ligne éditoriale et calendrier de publication.",
      "Animation quotidienne d'Instagram et Facebook.",
      "Suivi des performances et ajustements mensuels.",
    ],
    category: "Community management",
    budget: "400 – 800 €/mois",
    delay: "Mission récurrente",
    proposals: 5,
    cap: 8,
    views: 231,
    tags: ["Instagram", "Facebook", "Contenu"],
    posted: "il y a 5 j",
    applicants: ["DB", "RN"],
  },
];

export function getMission(slug: string): Mission | undefined {
  return missions.find((m) => m.slug === slug);
}

export type Step = { title: string; description: string };

export const clientSteps: Step[] = [
  {
    title: "Décris ton besoin",
    description:
      "Publie ton projet gratuitement : budget, délai, compétences recherchées. Ton annonce part directement aux talents pertinents.",
  },
  {
    title: "Reçois jusqu'à 10 propositions",
    description:
      "Compare les profils, les réalisations et les devis. Les candidatures sont plafonnées pour garder le meilleur du choix.",
  },
  {
    title: "Choisis et paie en sécurité",
    description:
      "Échange par messagerie, valide ton freelance, puis paie par Mobile Money ou carte. Les fonds sont libérés à la livraison.",
  },
];

export const freelanceSteps: Step[] = [
  {
    title: "Crée ton profil",
    description:
      "Mets en avant tes compétences, ton portfolio et tes tarifs. Consulter les missions et les budgets reste gratuit.",
  },
  {
    title: "Débloque tes candidatures",
    description:
      "Achète des crédits à l'unité ou abonne-toi pour postuler. Un crédit = une proposition. Sans engagement, résiliable à tout moment.",
  },
  {
    title: "Envoie ta proposition et sois payé",
    description:
      "Propose ton prix et ton délai, décroche la mission et reçois ton paiement, où que tu sois.",
  },
];

export type Plan = {
  name: string;
  price: string;
  period: string;
  highlight?: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Pro",
    price: "31,90 €",
    period: "par mois",
    highlight: "Le choix des freelances",
    description: "Pour décrocher des missions régulières.",
    features: [
      "Consulter toutes les offres",
      "Candidatures débloquées chaque mois",
      "Badge « Pro » sur le profil",
      "Meilleur positionnement à l'annuaire",
      "Alertes missions personnalisées",
    ],
    cta: "Passer au plan Pro",
    featured: true,
  },
  {
    name: "Pro Max",
    price: "59,90 €",
    period: "par mois",
    description: "Pour ceux qui candidatent beaucoup.",
    features: [
      "Tout le plan Pro",
      "Un volume de candidatures plus large",
      "Coordonnées clients visibles",
      "Profil mis en avant dans les recherches",
      "Support prioritaire",
    ],
    cta: "Choisir Pro Max",
  },
  {
    name: "Agence",
    price: "109,90 €",
    period: "par mois",
    description: "Pour les agences et les équipes.",
    features: [
      "Tout le plan Pro Max",
      "Plusieurs profils sous un même compte",
      "Candidatures illimitées",
      "Profil suggéré en tête de liste",
      "Support dédié",
    ],
    cta: "Choisir Agence",
  },
];

export const pricingNote =
  "Taf Africa prélève une commission de 4 % sur chaque mission réglée. Les abonnements sont mensuels et résiliables à tout moment.";

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "L'inscription est-elle vraiment gratuite ?",
    answer:
      "Oui. Créer un compte est gratuit et permet de parcourir toutes les offres, de consulter les budgets, les délais et le nombre de candidats. Seule la candidature nécessite des crédits ou un abonnement.",
  },
  {
    question: "Faut-il créer une société pour être freelance sur Taf Africa ?",
    answer:
      "Non. C'est l'une de nos différences majeures avec les plateformes classiques. Tu peux postuler sans société, avec une simple vérification d'identité.",
  },
  {
    question: "Comment fonctionnent les crédits ?",
    answer:
      "Un crédit correspond à une candidature envoyée. Tu peux acheter des crédits à l'unité ou souscrire un abonnement mensuel qui en inclut un certain nombre. Les crédits non utilisés restent disponibles.",
  },
  {
    question: "Pourquoi limiter le nombre de candidatures par projet ?",
    answer:
      "Pour protéger la qualité. En plafonnant à 5–10 propositions, les clients reçoivent moins de spam et les freelances ont une réelle chance d'être sélectionnés.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Le Mobile Money (Orange Money, Wave, MTN MoMo, Moov Money) pour l'Afrique de l'Ouest et centrale, et la carte bancaire via Stripe pour les paiements internationaux.",
  },
  {
    question: "Comment suis-je payé après une mission ?",
    answer:
      "Le client règle la mission sur Taf Africa. Les fonds sont sécurisés puis libérés vers ton compte Mobile Money ou bancaire une fois la livraison validée.",
  },
  {
    question: "Puis-je travailler avec des clients à l'étranger ?",
    answer:
      "Oui. C'est tout l'intérêt de Taf Africa : connecter les talents africains à des clients locaux comme internationaux, sans barrière de paiement.",
  },
  {
    question: "Y a-t-il un engagement ?",
    answer:
      "Non. Les abonnements sont mensuels et résiliables à tout moment depuis ton espace personnel.",
  },
];

export const footerNav = [
  {
    title: "Plateforme",
    links: [
      { label: "Comment ça marche", href: "#comment-ca-marche" },
      { label: "Projets", href: "/projets" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Freelances",
    links: [
      { label: "Devenir freelance", href: "#" },
      { label: "Trouver des missions", href: "/projets" },
      { label: "Crédits & abonnements", href: "#" },
      { label: "Aide et support", href: "#faq" },
    ],
  },
  {
    title: "Clients",
    links: [
      { label: "Publier un projet", href: "#" },
      { label: "Trouver un talent", href: "/projets" },
      { label: "Paiement sécurisé", href: "#" },
      { label: "Questions fréquentes", href: "#faq" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Mentions légales", href: "#" },
    ],
  },
];
