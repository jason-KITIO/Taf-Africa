import "server-only";
import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { hashPassword, verifyPassword } from "./password";
import type {
  ActionResult,
  ClientProfile,
  CreditEntry,
  DemoData,
  DisputeStatus,
  Escrow,
  FreelanceProfile,
  Invoice,
  Payment,
  PaymentProvider,
  PaidPlanCode,
  Plan,
  Project,
  ProjectStatus,
  Quote,
  QuoteType,
  Report,
  Role,
  User,
} from "./types";

const DATA_FILE = join(process.cwd(), ".data", "taf-africa.json");
const globalStore = globalThis as typeof globalThis & {
  __tafAfricaStore?: DemoData;
};

const DAY = 86_400_000;

const NO_PLAN: Plan = {
  code: "none",
  name: "Sans formule",
  priceCents: 0,
  priceXaf: 0,
  monthlyCredits: 0,
  canSeeClient: false,
  isFeatured: false,
  description: "Aucune formule active.",
  features: [],
};

function now(offsetDays = 0) {
  return new Date(Date.now() + offsetDays * DAY).toISOString();
}

function newId(prefix: string) {
  return `${prefix}_${randomUUID().slice(0, 10)}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "element";
}

function makeReferralCode(name: string) {
  return `${slugify(name).slice(0, 8) || "taf"}-${randomUUID().slice(0, 4)}`.toUpperCase();
}

function buildSeed(): DemoData {
  const clientId = "user_client_demo";
  const freelanceId = "user_freelance_demo";
  const designerId = "user_designer_demo";
  const adminId = "user_admin_demo";

  const users: User[] = [
    {
      id: clientId,
      name: "Amina Diallo",
      email: "client@taf-africa.com",
      passwordHash: hashPassword("demo1234"),
      role: "client",
      banned: false,
      identityVerified: false,
      referralCode: makeReferralCode("Amina Diallo"),
      createdAt: now(-40),
    },
    {
      id: freelanceId,
      name: "Koffi Mensah",
      email: "freelance@taf-africa.com",
      passwordHash: hashPassword("demo1234"),
      role: "freelance",
      banned: false,
      identityVerified: true,
      referralCode: makeReferralCode("Koffi Mensah"),
      createdAt: now(-60),
    },
    {
      id: designerId,
      name: "Fatou Traoré",
      email: "designer@taf-africa.com",
      passwordHash: hashPassword("demo1234"),
      role: "freelance",
      banned: false,
      identityVerified: true,
      referralCode: makeReferralCode("Fatou Traore"),
      createdAt: now(-35),
    },
    {
      id: adminId,
      name: "Admin Taf",
      email: "admin@taf-africa.com",
      passwordHash: hashPassword("demo1234"),
      role: "admin",
      banned: false,
      identityVerified: true,
      referralCode: makeReferralCode("Admin Taf"),
      createdAt: now(-90),
    },
  ];

  const freelanceProfiles: FreelanceProfile[] = [
    {
      userId: freelanceId,
      slug: "koffi-mensah",
      title: "Développeur fullstack Next.js",
      bio: "Je construis des sites rapides et des applications web fiables pour les entreprises africaines qui veulent passer à l'échelle.",
      city: "Abidjan",
      country: "Côte d'Ivoire",
      phone: "+225 07 00 00 00 01",
      languages: ["Français", "Anglais"],
      dailyRate: 180000,
      rateCurrency: "XAF",
      emailAlerts: true,
      isPublic: true,
      verified: true,
      skills: ["Next.js", "React", "TypeScript", "Node.js"],
    },
    {
      userId: designerId,
      slug: "fatou-traore",
      title: "Designer produit UI/UX",
      bio: "J'aide les startups à clarifier leur produit, dessiner leurs parcours et livrer une interface que les équipes aiment utiliser.",
      city: "Dakar",
      country: "Sénégal",
      languages: ["Français", "Anglais"],
      dailyRate: 150000,
      rateCurrency: "XAF",
      emailAlerts: true,
      isPublic: true,
      verified: true,
      skills: ["UI Design", "UX Research", "Figma"],
    },
  ];

  const clientProfiles: ClientProfile[] = [
    {
      userId: clientId,
      companyName: "Teranga Digital",
      city: "Dakar",
      country: "Sénégal",
      phone: "+221 77 000 00 00",
    },
  ];

  const categories = [
    { id: "cat_dev", name: "Développement", slug: "developpement", sortOrder: 1 },
    { id: "cat_fullstack", name: "Fullstack", slug: "fullstack", parentSlug: "developpement", sortOrder: 2 },
    { id: "cat_wordpress", name: "WordPress / no-code", slug: "wordpress-no-code", parentSlug: "developpement", sortOrder: 3 },
    { id: "cat_design", name: "Design", slug: "design", sortOrder: 4 },
    { id: "cat_uiux", name: "UI/UX", slug: "ui-ux", parentSlug: "design", sortOrder: 5 },
    { id: "cat_logo", name: "Logo et identité", slug: "logo-identite", parentSlug: "design", sortOrder: 6 },
    { id: "cat_video", name: "Vidéo et motion", slug: "video-motion", sortOrder: 7 },
    { id: "cat_motion", name: "Motion design", slug: "motion-design", parentSlug: "video-motion", sortOrder: 8 },
    { id: "cat_marketing", name: "Marketing", slug: "marketing", sortOrder: 9 },
    { id: "cat_seo", name: "SEO", slug: "seo", parentSlug: "marketing", sortOrder: 10 },
  ];

  const plans: DemoData["plans"] = [
    {
      code: "pro",
      name: "Pro",
      priceCents: 3190,
      priceXaf: 21000,
      monthlyCredits: 80,
      canSeeClient: true,
      isFeatured: false,
      description: "Pour les freelances qui répondent régulièrement à des appels d'offres.",
      features: ["80 crédits / 30 jours", "Coordonnées client visibles", "Offres premium", "Factures"],
    },
    {
      code: "pro_max",
      name: "Pro Max",
      priceCents: 5990,
      priceXaf: 39300,
      monthlyCredits: 200,
      canSeeClient: true,
      isFeatured: true,
      description: "Pour aller plus vite avec un volume de réponses confortable.",
      features: ["200 crédits / 30 jours", "Coordonnées client visibles", "Offres premium", "Priorité de visibilité"],
    },
    {
      code: "agence",
      name: "Agence",
      priceCents: 10990,
      priceXaf: 72100,
      monthlyCredits: 400,
      canSeeClient: true,
      isFeatured: false,
      description: "Pour les équipes qui gèrent plusieurs profils et plusieurs projets.",
      features: ["400 crédits / 30 jours", "Profils d'équipe", "Coordonnées client visibles", "Factures illimitées"],
    },
  ];

  const projects: Project[] = [
    {
      id: "project_ecommerce",
      clientId,
      slug: "refonte-e-commerce-mode-abidjan",
      title: "Refonte e-commerce pour une marque de mode à Abidjan",
      description: "Nous voulons remplacer notre boutique actuelle par une expérience mobile-first, rapide et facile à administrer. Le projet inclut le catalogue, le panier, le paiement Mobile Money et un espace client.",
      categorySlug: "fullstack",
      budgetMin: 900000,
      budgetMax: 1500000,
      currency: "XAF",
      deadlineDays: 21,
      skills: ["Next.js", "TypeScript", "Node.js"],
      attachmentNames: ["brief-produit.pdf"],
      status: "open",
      maxQuotes: 10,
      quotesCount: 2,
      viewsCount: 128,
      publishedAt: now(-2),
      createdAt: now(-2),
    },
    {
      id: "project_fintech",
      clientId,
      slug: "identite-visuelle-fintech",
      title: "Identité visuelle et application mobile pour une fintech",
      description: "Création d'une identité complète puis déclinaison dans une application mobile de gestion de paiements. Nous cherchons un designer capable de travailler avec une équipe produit.",
      categorySlug: "logo-identite",
      budgetMin: 500000,
      budgetMax: 900000,
      currency: "XAF",
      deadlineDays: 30,
      skills: ["UI Design", "Figma", "UX Research"],
      attachmentNames: [],
      status: "open",
      maxQuotes: 10,
      quotesCount: 1,
      viewsCount: 84,
      publishedAt: now(-4),
      createdAt: now(-4),
    },
    {
      id: "project_cabinet",
      clientId,
      slug: "site-vitrine-bilingue-cabinet",
      title: "Site vitrine bilingue pour un cabinet de conseil",
      description: "Un site clair en français et en anglais, avec une page équipe, des articles et un formulaire de contact. Hébergement et formation à la mise à jour inclus.",
      categorySlug: "wordpress-no-code",
      budgetMin: 300000,
      budgetMax: 600000,
      currency: "XAF",
      deadlineDays: 14,
      skills: ["WordPress", "SEO"],
      attachmentNames: [],
      status: "open",
      maxQuotes: 10,
      quotesCount: 1,
      viewsCount: 62,
      publishedAt: now(-1),
      createdAt: now(-1),
    },
    {
      id: "project_seo",
      clientId,
      slug: "strategie-seo-social-ads",
      title: "Stratégie SEO et campagnes social ads",
      description: "Audit SEO, plan de contenu trimestriel et mise en place de campagnes Meta et TikTok Ads pour une marque de cosmétiques.",
      categorySlug: "seo",
      budgetMin: 250000,
      budgetMax: 500000,
      currency: "XAF",
      deadlineDays: 45,
      skills: ["SEO", "Marketing digital"],
      attachmentNames: [],
      status: "open",
      maxQuotes: 10,
      quotesCount: 0,
      viewsCount: 41,
      publishedAt: now(-6),
      createdAt: now(-6),
    },
  ];

  const quotes: Quote[] = [
    {
      id: "quote_dev_1",
      projectId: "project_ecommerce",
      freelanceId,
      price: 1200000,
      currency: "XAF",
      deliveryDays: 25,
      message: "Je peux livrer la boutique complète en 25 jours avec paiement Mobile Money et formation à l'administration.",
      type: "premium",
      status: "sent",
      creditsSpent: 15,
      createdAt: now(-1),
    },
    {
      id: "quote_design_1",
      projectId: "project_fintech",
      freelanceId: designerId,
      price: 750000,
      currency: "XAF",
      deliveryDays: 30,
      message: "Je propose une identité complète et un design system mobile, avec deux itérations incluses.",
      type: "simple",
      status: "studied",
      creditsSpent: 1,
      studiedAt: now(-1),
      createdAt: now(-3),
    },
    {
      id: "quote_cabinet_1",
      projectId: "project_cabinet",
      freelanceId,
      price: 450000,
      currency: "XAF",
      deliveryDays: 12,
      message: "Site bilingue prêt à l'emploi, avec formation courte pour votre équipe.",
      type: "simple",
      status: "sent",
      creditsSpent: 1,
      createdAt: now(-1),
    },
  ];

  return {
    users,
    freelanceProfiles,
    clientProfiles,
    portfolioItems: [
      {
        id: "portfolio_1",
        freelanceId,
        title: "Boutique Kossa",
        description: "Refonte e-commerce avec paiement Orange Money.",
        link: "#",
      },
      {
        id: "portfolio_2",
        freelanceId,
        title: "Dashboard logistique",
        description: "Tableau de bord temps réel pour une agence de transport.",
        link: "#",
      },
      {
        id: "portfolio_3",
        freelanceId: designerId,
        title: "Identité Niaam",
        description: "Direction artistique et design system pour une fintech.",
        link: "#",
      },
    ],
    categories,
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Python", "Laravel", "WordPress", "UI Design", "UX Research", "Figma", "Motion Design", "Vidéo", "SEO", "Marketing digital", "Data", "IA"],
    projects,
    quotes,
    plans,
    subscriptions: [
      {
        id: "sub_client",
        userId: clientId,
        planCode: "pro",
        status: "active",
        currentPeriodStart: now(-12),
        currentPeriodEnd: now(18),
        cancelAtPeriodEnd: false,
      },
      {
        id: "sub_freelance",
        userId: freelanceId,
        planCode: "pro_max",
        status: "active",
        currentPeriodStart: now(-10),
        currentPeriodEnd: now(20),
        cancelAtPeriodEnd: false,
      },
      {
        id: "sub_designer",
        userId: designerId,
        planCode: "pro",
        status: "active",
        currentPeriodStart: now(-8),
        currentPeriodEnd: now(22),
        cancelAtPeriodEnd: false,
      },
    ],
    creditLedger: [
      { id: "credit_1", userId: freelanceId, delta: 200, reason: "plan_renewal", note: "Renouvellement Pro Max", createdAt: now(-10) },
      { id: "credit_2", userId: freelanceId, delta: -15, reason: "quote_sent", note: "Offre premium · e-commerce mode", createdAt: now(-1) },
      { id: "credit_3", userId: freelanceId, delta: -1, reason: "quote_sent", note: "Offre simple · site vitrine", createdAt: now(-1) },
      { id: "credit_4", userId: designerId, delta: 80, reason: "plan_renewal", note: "Renouvellement Pro", createdAt: now(-8) },
      { id: "credit_5", userId: designerId, delta: -1, reason: "quote_sent", note: "Offre simple · fintech", createdAt: now(-3) },
    ],
    payments: [
      {
        id: "payment_client",
        userId: clientId,
        planCode: "pro",
        kind: "subscription",
        provider: "orange_money",
        phone: "+221 77 000 00 00",
        amount: 21000,
        currency: "XAF",
        status: "succeeded",
        createdAt: now(-12),
        paidAt: now(-12),
      },
      {
        id: "payment_freelance",
        userId: freelanceId,
        planCode: "pro_max",
        kind: "subscription",
        provider: "mtn_momo",
        amount: 39300,
        currency: "XAF",
        status: "succeeded",
        createdAt: now(-10),
        paidAt: now(-10),
      },
    ],
    invoices: [
      { id: "invoice_1", paymentId: "payment_client", number: "FA-2026-000001", amount: 21000, currency: "XAF", issuedAt: now(-12) },
      { id: "invoice_2", paymentId: "payment_freelance", number: "FA-2026-000002", amount: 39300, currency: "XAF", issuedAt: now(-10) },
    ],
    escrows: [],
    reviews: [],
    disputes: [],
    referrals: [
      {
        id: "referral_1",
        referrerId: clientId,
        invitedId: designerId,
        code: users[2].referralCode,
        bonus: 5,
        createdAt: now(-30),
      },
    ],
    conversations: [
      {
        id: "conv_1",
        projectId: "project_ecommerce",
        clientId,
        freelanceId,
        quoteId: "quote_dev_1",
        lastMessageAt: now(-1),
        createdAt: now(-1),
      },
      {
        id: "conv_2",
        projectId: "project_fintech",
        clientId,
        freelanceId: designerId,
        quoteId: "quote_design_1",
        lastMessageAt: now(-1),
        createdAt: now(-3),
      },
    ],
    messages: [
      {
        id: "msg_1",
        conversationId: "conv_1",
        senderId: freelanceId,
        body: "Bonjour Amina, je reste disponible pour détailler le calendrier de livraison.",
        containsContact: false,
        readAt: now(-1),
        createdAt: now(-1),
      },
      {
        id: "msg_2",
        conversationId: "conv_2",
        senderId: clientId,
        body: "Merci Fatou, nous avons bien reçu votre proposition et allons l'étudier.",
        containsContact: false,
        createdAt: now(-1),
      },
    ],
    notifications: [
      {
        id: "notif_1",
        userId: clientId,
        type: "new_quote",
        title: "Nouvelle offre reçue",
        body: "Koffi Mensah a envoyé une offre premium pour votre projet e-commerce.",
        url: "/offres",
        createdAt: now(-1),
      },
      {
        id: "notif_2",
        userId: designerId,
        type: "quote_studied",
        title: "Offre étudiée",
        body: "Votre offre pour le projet fintech a été lue par le client.",
        url: "/offres",
        createdAt: now(-1),
      },
      {
        id: "notif_3",
        userId: freelanceId,
        type: "new_project",
        title: "Nouveau projet correspondant",
        body: "Une mission Fullstack correspond à vos compétences.",
        url: "/projets/strategie-seo-social-ads",
        createdAt: now(-6),
      },
    ],
    reports: [
      {
        id: "report_1",
        reporterId: designerId,
        targetType: "project",
        targetId: "project_seo",
        reason: "Contenu dupliqué",
        details: "Le descriptif semble identique à une annonce publiée ailleurs.",
        status: "open",
        createdAt: now(-2),
      },
    ],
  };
}

function normalize(data: DemoData): DemoData {
  data.escrows ??= [];
  data.reviews ??= [];
  data.disputes ??= [];
  data.referrals ??= [];
  data.plans = data.plans.filter((plan) => (plan.code as string) !== "free");
  data.subscriptions = data.subscriptions.filter(
    (subscription) => (subscription.planCode as string) !== "free",
  );
  for (const user of data.users) {
    user.identityVerified ??= false;
    user.referralCode ??= makeReferralCode(user.name);
  }
  for (const profile of data.freelanceProfiles) {
    const owner = data.users.find((user) => user.id === profile.userId);
    profile.verified ??= owner?.identityVerified ?? false;
  }
  for (const payment of data.payments) {
    payment.kind ??= "subscription";
    if ((payment.planCode as string | undefined) === "free") delete payment.planCode;
  }
  return data;
}

function load(): DemoData {
  try {
    const raw = readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as DemoData;
    if (parsed.users?.length && parsed.projects?.length) return normalize(parsed);
  } catch {
    return buildSeed();
  }
  return buildSeed();
}

export function getStore(): DemoData {
  if (!globalStore.__tafAfricaStore) globalStore.__tafAfricaStore = load();
  return globalStore.__tafAfricaStore;
}

function persist() {
  mkdirSync(dirname(DATA_FILE), { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(getStore(), null, 2));
}

function mutate<T>(operation: (data: DemoData) => T): T {
  const data = getStore();
  const result = operation(data);
  persist();
  return result;
}

function addNotification(
  data: DemoData,
  userId: string,
  type: DemoData["notifications"][number]["type"],
  title: string,
  body: string,
  url: string,
) {
  data.notifications.unshift({
    id: newId("notif"),
    userId,
    type,
    title,
    body,
    url,
    createdAt: now(),
  });
}

export function findUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return getStore().users.find((user) => user.email.toLowerCase() === normalized);
}

export function findUserById(id: string) {
  return getStore().users.find((user) => user.id === id);
}

export function loginWithPassword(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user || user.banned || !verifyPassword(password, user.passwordHash)) return null;
  return user;
}

export function getUserPlan(userId: string) {
  const data = getStore();
  const subscription = data.subscriptions.find(
    (item) => item.userId === userId && item.status === "active",
  );
  return data.plans.find((plan) => plan.code === subscription?.planCode) ?? NO_PLAN;
}

export function getSubscription(userId: string) {
  return getStore().subscriptions.find(
    (item) => item.userId === userId && item.status === "active",
  );
}

export function getCreditBalance(userId: string) {
  return getStore()
    .creditLedger.filter((entry) => entry.userId === userId)
    .reduce((total, entry) => total + entry.delta, 0);
}

export function getFreelanceProfile(userId: string) {
  return getStore().freelanceProfiles.find((profile) => profile.userId === userId);
}

export function getClientProfile(userId: string) {
  return getStore().clientProfiles.find((profile) => profile.userId === userId);
}

export function getProjectById(idOrSlug: string) {
  return getStore().projects.find(
    (project) => project.id === idOrSlug || project.slug === idOrSlug,
  );
}

export function getQuoteById(id: string) {
  return getStore().quotes.find((quote) => quote.id === id);
}

export function getConversationById(id: string) {
  return getStore().conversations.find((conversation) => conversation.id === id);
}

export function getConversationsForUser(userId: string) {
  return getStore()
    .conversations.filter(
      (conversation) =>
        conversation.clientId === userId || conversation.freelanceId === userId,
    )
    .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
}

export function getMessagesForConversation(conversationId: string) {
  return getStore()
    .messages.filter((message) => message.conversationId === conversationId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function getNotificationsForUser(userId: string) {
  return getStore()
    .notifications.filter((notification) => notification.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPortfolioFor(userId: string) {
  return getStore().portfolioItems.filter((item) => item.freelanceId === userId);
}

export function getPublicFreelances() {
  return getStore().freelanceProfiles.filter((profile) => profile.isPublic);
}

export function getPublicProjects() {
  return getStore()
    .projects.filter((project) => project.status === "open")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getProjectsForClient(userId: string) {
  return getStore()
    .projects.filter((project) => project.clientId === userId)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getQuotesForFreelance(userId: string) {
  return getStore()
    .quotes.filter((quote) => quote.freelanceId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getQuotesForClient(userId: string) {
  const clientProjects = getProjectsForClient(userId).map((project) => project.id);
  return getStore()
    .quotes.filter((quote) => clientProjects.includes(quote.projectId))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getInvoicesForUser(userId: string) {
  const data = getStore();
  const paymentIds = data.payments
    .filter((payment) => payment.userId === userId)
    .map((payment) => payment.id);
  return data.invoices.filter((invoice) => paymentIds.includes(invoice.paymentId));
}

export function canViewClientProfile(clientId: string) {
  return getUserPlan(clientId).canSeeClient;
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
  referralCode?: string;
}): ActionResult {
  return mutate((data) => {
    if (data.users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) {
      return { ok: false, message: "Cette adresse e-mail est déjà utilisée." };
    }
    const id = newId("user");
    const user: User = {
      id,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      passwordHash: hashPassword(input.password),
      role: input.role,
      banned: false,
      identityVerified: false,
      referralCode: makeReferralCode(input.name),
      createdAt: now(),
    };
    data.users.push(user);
    if (input.role === "freelance") {
      const profile: FreelanceProfile = {
        userId: id,
        slug: `${slugify(input.name)}-${id.slice(-4)}`,
        title: "",
        bio: "",
        city: "",
        country: "",
        languages: ["Français"],
        dailyRate: 0,
        rateCurrency: "XAF",
        emailAlerts: true,
        isPublic: true,
        verified: false,
        skills: [],
      };
      data.freelanceProfiles.push(profile);
    }
    if (input.role === "client") {
      data.clientProfiles.push({
        userId: id,
        companyName: "",
        city: "",
        country: "",
      });
    }
    const code = input.referralCode?.trim().toUpperCase();
    const referrer = code
      ? data.users.find((item) => item.referralCode.toUpperCase() === code && item.id !== id)
      : undefined;
    if (referrer) {
      data.referrals.push({
        id: newId("referral"),
        referrerId: referrer.id,
        invitedId: id,
        code: code ?? "",
        bonus: 5,
        createdAt: now(),
      });
      for (const userId of [referrer.id, id]) {
        data.creditLedger.push({
          id: newId("credit"),
          userId,
          delta: 5,
          reason: "referral_bonus",
          note: "Bonus de parrainage",
          createdAt: now(),
        });
      }
      addNotification(
        data,
        referrer.id,
        "referral",
        "Parrainage validé",
        `${input.name.trim()} a rejoint Taf Africa avec votre code. 5 crédits ajoutés.`,
        "/parrainage",
      );
    }
    addNotification(
      data,
      id,
      "system",
      "Bienvenue sur Taf Africa",
      "Votre compte est prêt. Complétez votre profil pour commencer.",
      "/profil",
    );
    return { ok: true, message: "Compte créé. Vous êtes connecté." };
  });
}

export function createClientByAdmin(input: {
  name: string;
  email: string;
  password: string;
  companyName?: string;
}): ActionResult {
  return mutate((data) => {
    if (data.users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) {
      return { ok: false, message: "Cette adresse e-mail est déjà utilisée." };
    }
    const id = newId("user");
    const user: User = {
      id,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      passwordHash: hashPassword(input.password),
      role: "client",
      banned: false,
      identityVerified: false,
      referralCode: makeReferralCode(input.name),
      createdAt: now(),
    };
    data.users.push(user);
    data.clientProfiles.push({
      userId: id,
      companyName: input.companyName?.trim() ?? "",
      city: "",
      country: "",
    });
    addNotification(
      data,
      id,
      "system",
      "Compte client créé",
      "Votre compte client a été créé par l'administrateur.",
      "/tableau-de-bord",
    );
    return { ok: true, message: `Client ${user.name} créé.` };
  });
}

export function updateProfile(input: {
  userId: string;
  name: string;
  title?: string;
  bio?: string;
  city?: string;
  country?: string;
  phone?: string;
  companyName?: string;
  dailyRate?: number;
  languages?: string[];
  skills?: string[];
  emailAlerts?: boolean;
  isPublic?: boolean;
}): ActionResult {
  return mutate((data) => {
    const user = data.users.find((item) => item.id === input.userId);
    if (!user) return { ok: false, message: "Compte introuvable." };
    user.name = input.name.trim();
    const freelance = data.freelanceProfiles.find((item) => item.userId === input.userId);
    if (freelance) {
      freelance.title = input.title ?? "";
      freelance.bio = input.bio ?? "";
      freelance.city = input.city ?? "";
      freelance.country = input.country ?? "";
      freelance.phone = input.phone ?? "";
      freelance.dailyRate = input.dailyRate ?? 0;
      freelance.languages = input.languages?.length ? input.languages : ["Français"];
      freelance.skills = input.skills ?? [];
      freelance.emailAlerts = input.emailAlerts ?? true;
      freelance.isPublic = input.isPublic ?? true;
    }
    const client = data.clientProfiles.find((item) => item.userId === input.userId);
    if (client) {
      client.companyName = input.companyName ?? "";
      client.city = input.city ?? "";
      client.country = input.country ?? "";
      client.phone = input.phone ?? "";
    }
    return { ok: true, message: "Profil mis à jour." };
  });
}

export function addPortfolioItem(input: {
  userId: string;
  title: string;
  description: string;
  link?: string;
}) {
  return mutate((data) => {
    const profile = data.freelanceProfiles.find((item) => item.userId === input.userId);
    if (!profile) return null;
    const item = {
      id: newId("portfolio"),
      freelanceId: input.userId,
      title: input.title.trim(),
      description: input.description.trim(),
      link: input.link?.trim() || undefined,
    };
    data.portfolioItems.unshift(item);
    return item;
  });
}

export function createProject(input: {
  clientId: string;
  title: string;
  description: string;
  categorySlug: string;
  budgetMin: number;
  budgetMax: number;
  deadlineDays: number;
  skills: string[];
  attachmentNames: string[];
}): Project | null {
  return mutate((data) => {
    const project: Project = {
      id: newId("project"),
      clientId: input.clientId,
      slug: `${slugify(input.title)}-${newId("x").slice(-4)}`,
      title: input.title.trim(),
      description: input.description.trim(),
      categorySlug: input.categorySlug,
      budgetMin: input.budgetMin,
      budgetMax: input.budgetMax,
      currency: "XAF",
      deadlineDays: input.deadlineDays,
      skills: input.skills,
      attachmentNames: input.attachmentNames,
      status: "open",
      maxQuotes: 10,
      quotesCount: 0,
      viewsCount: 0,
      publishedAt: now(),
      createdAt: now(),
    };
    data.projects.unshift(project);
    for (const profile of data.freelanceProfiles) {
      if (profile.emailAlerts && profile.skills.some((skill) => input.skills.includes(skill))) {
        addNotification(
          data,
          profile.userId,
          "new_project",
          "Nouveau projet correspondant",
          project.title,
          `/projets/${project.slug}`,
        );
      }
    }
    return project;
  });
}

export function setProjectStatus(
  projectId: string,
  status: ProjectStatus,
  actorId: string,
): ActionResult {
  void actorId;
  return mutate((data) => {
    const project = data.projects.find((item) => item.id === projectId);
    if (!project) return { ok: false, message: "Projet introuvable." };
    project.status = status;
    project.closedAt = status === "open" ? undefined : now();
    return { ok: true, message: "Statut du projet mis à jour." };
  });
}

export function incrementProjectViews(projectId: string) {
  mutate((data) => {
    const project = data.projects.find((item) => item.id === projectId);
    if (project) project.viewsCount += 1;
  });
}

export function submitQuote(input: {
  freelanceId: string;
  projectId: string;
  price: number;
  deliveryDays: number;
  message: string;
  type: QuoteType;
}): ActionResult {
  return mutate((data) => {
    const project = data.projects.find((item) => item.id === input.projectId);
    if (!project || project.status !== "open") {
      return { ok: false, message: "Ce projet n'accepte plus d'offres." };
    }
    const existing = data.quotes.find(
      (quote) => quote.projectId === input.projectId && quote.freelanceId === input.freelanceId,
    );
    if (existing) return { ok: false, message: "Vous avez déjà envoyé une offre sur ce projet." };
    const premiumCount = data.quotes.filter(
      (quote) => quote.projectId === input.projectId && quote.type === "premium",
    ).length;
    if (input.type === "premium" && premiumCount >= 4) {
      return { ok: false, message: "Cette mission a atteint la limite de 4 offres premium." };
    }
    const cost = input.type === "premium" ? 15 : 1;
    const balance = data.creditLedger
      .filter((entry) => entry.userId === input.freelanceId)
      .reduce((total, entry) => total + entry.delta, 0);
    if (balance < cost) {
      return { ok: false, message: `Crédits insuffisants : ${cost} nécessaire${cost > 1 ? "s" : ""}.` };
    }
    const quote: Quote = {
      id: newId("quote"),
      projectId: input.projectId,
      freelanceId: input.freelanceId,
      price: input.price,
      currency: project.currency,
      deliveryDays: input.deliveryDays,
      message: input.message.trim(),
      type: input.type,
      status: "sent",
      creditsSpent: cost,
      createdAt: now(),
    };
    data.quotes.push(quote);
    data.creditLedger.push({
      id: newId("credit"),
      userId: input.freelanceId,
      delta: -cost,
      reason: "quote_sent",
      note: `Offre ${input.type} · ${project.title}`,
      createdAt: now(),
    });
    project.quotesCount += 1;
    let conversation = data.conversations.find(
      (item) => item.projectId === project.id && item.freelanceId === input.freelanceId,
    );
    if (!conversation) {
      conversation = {
        id: newId("conv"),
        projectId: project.id,
        clientId: project.clientId,
        freelanceId: input.freelanceId,
        quoteId: quote.id,
        lastMessageAt: now(),
        createdAt: now(),
      };
      data.conversations.push(conversation);
      data.messages.push({
        id: newId("msg"),
        conversationId: conversation.id,
        senderId: input.freelanceId,
        body: input.message.trim(),
        containsContact: false,
        createdAt: now(),
      });
    }
    const freelancer = data.users.find((user) => user.id === input.freelanceId);
    addNotification(
      data,
      project.clientId,
      "new_quote",
      "Nouvelle offre reçue",
      `${freelancer?.name ?? "Un freelance"} a envoyé une offre ${input.type}.`,
      "/offres",
    );
    return { ok: true, message: "Offre envoyée. La conversation avec le client est ouverte." };
  });
}

export function markQuoteStudied(clientId: string, quoteId: string): ActionResult {
  return mutate((data) => {
    const quote = data.quotes.find((item) => item.id === quoteId);
    if (!quote) return { ok: false, message: "Offre introuvable." };
    const project = data.projects.find((item) => item.id === quote.projectId);
    if (!project || project.clientId !== clientId) {
      return { ok: false, message: "Action non autorisée." };
    }
    quote.status = "studied";
    quote.studiedAt = now();
    addNotification(
      data,
      quote.freelanceId,
      "quote_studied",
      "Offre étudiée",
      `Le client a lu votre offre pour « ${project.title} ».`,
      "/offres",
    );
    return { ok: true, message: "Offre marquée comme étudiée." };
  });
}

export function acceptQuote(clientId: string, quoteId: string): ActionResult {
  return mutate((data) => {
    const quote = data.quotes.find((item) => item.id === quoteId);
    if (!quote) return { ok: false, message: "Offre introuvable." };
    const project = data.projects.find((item) => item.id === quote.projectId);
    if (!project || project.clientId !== clientId) {
      return { ok: false, message: "Action non autorisée." };
    }
    quote.status = "accepted";
    project.status = "awarded";
    project.closedAt = now();
    addNotification(
      data,
      quote.freelanceId,
      "quote_accepted",
      "Offre acceptée",
      `Votre offre pour « ${project.title} » a été acceptée.`,
      "/messagerie",
    );
    return { ok: true, message: "Offre acceptée. Le projet est attribué." };
  });
}

function containsContactDetails(body: string) {
  return /(?:[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|whatsapp|wa\.me|t[eé]l[eé]phone|\+?\d[\d\s().-]{7,}\d)/i.test(
    body,
  );
}

export function sendMessage(input: {
  conversationId: string;
  senderId: string;
  body: string;
}): ActionResult {
  return mutate((data) => {
    const conversation = data.conversations.find((item) => item.id === input.conversationId);
    if (!conversation) return { ok: false, message: "Conversation introuvable." };
    if (
      conversation.clientId !== input.senderId &&
      conversation.freelanceId !== input.senderId
    ) {
      return { ok: false, message: "Action non autorisée." };
    }
    if (containsContactDetails(input.body)) {
      return {
        ok: false,
        message: "Les coordonnées directes sont interdites pour protéger la communauté.",
      };
    }
    const message = {
      id: newId("msg"),
      conversationId: input.conversationId,
      senderId: input.senderId,
      body: input.body.trim(),
      containsContact: false,
      createdAt: now(),
    };
    data.messages.push(message);
    conversation.lastMessageAt = message.createdAt;
    const recipientId =
      input.senderId === conversation.clientId
        ? conversation.freelanceId
        : conversation.clientId;
    addNotification(
      data,
      recipientId,
      "new_message",
      "Nouveau message",
      input.body.slice(0, 90),
      `/messagerie/${conversation.id}`,
    );
    return { ok: true, message: "Message envoyé." };
  });
}

export function markConversationRead(userId: string, conversationId: string) {
  mutate((data) => {
    for (const message of data.messages) {
      if (
        message.conversationId === conversationId &&
        message.senderId !== userId &&
        !message.readAt
      ) {
        message.readAt = now();
      }
    }
  });
}

export function subscribeUser(input: {
  userId: string;
  planCode: PaidPlanCode;
  provider: PaymentProvider;
  phone?: string;
}): ActionResult {
  return mutate((data) => {
    const plan = data.plans.find((item) => item.code === input.planCode);
    if (!plan) return { ok: false, message: "Formule introuvable." };
    for (const subscription of data.subscriptions) {
      if (subscription.userId === input.userId && subscription.status === "active") {
        subscription.status = "canceled";
        subscription.cancelAtPeriodEnd = true;
      }
    }
    const subscription = {
      id: newId("sub"),
      userId: input.userId,
      planCode: input.planCode,
      status: "active" as const,
      currentPeriodStart: now(),
      currentPeriodEnd: now(30),
      cancelAtPeriodEnd: false,
    };
    data.subscriptions.push(subscription);
    const balance = data.creditLedger
      .filter((entry) => entry.userId === input.userId)
      .reduce((total, entry) => total + entry.delta, 0);
    if (balance > 0) {
      data.creditLedger.push({
        id: newId("credit"),
        userId: input.userId,
        delta: -balance,
        reason: "expiry",
        note: "Crédits non utilisés expirés",
        createdAt: now(),
      });
    }
    data.creditLedger.push({
      id: newId("credit"),
      userId: input.userId,
      delta: plan.monthlyCredits,
      reason: "plan_renewal",
      note: `Activation ${plan.name}`,
      createdAt: now(),
    });
    const payment = {
      id: newId("payment"),
      userId: input.userId,
      planCode: input.planCode,
      kind: "subscription" as const,
      provider: input.provider,
      phone: input.phone,
      amount: plan.priceXaf,
      currency: "XAF",
      status: "succeeded" as const,
      createdAt: now(),
      paidAt: now(),
    };
    data.payments.push(payment);
    const invoice: Invoice = {
      id: newId("invoice"),
      paymentId: payment.id,
      number: `FA-${new Date().getFullYear()}-${String(data.invoices.length + 1).padStart(6, "0")}`,
      amount: payment.amount,
      currency: payment.currency,
      issuedAt: now(),
    };
    data.invoices.push(invoice);
    addNotification(
      data,
      input.userId,
      "subscription",
      "Abonnement activé",
      `Votre formule ${plan.name} est active avec ${plan.monthlyCredits} crédits.`,
      "/factures",
    );
    return { ok: true, message: `Formule ${plan.name} activée. ${plan.monthlyCredits} crédits ajoutés.` };
  });
}

export function cancelSubscription(userId: string): ActionResult {
  return mutate((data) => {
    const subscription = data.subscriptions.find(
      (item) => item.userId === userId && item.status === "active",
    );
    if (!subscription) return { ok: false, message: "Aucun abonnement actif." };
    subscription.cancelAtPeriodEnd = true;
    return { ok: true, message: "Résiliation programmée à la fin de la période." };
  });
}

export function renewSubscriptions() {
  return mutate((data) => {
    let renewed = 0;
    for (const subscription of data.subscriptions) {
      if (subscription.status !== "active") continue;
      if (new Date(subscription.currentPeriodEnd).getTime() > Date.now()) continue;
      const plan = data.plans.find((item) => item.code === subscription.planCode);
      if (!plan) continue;
      const balance = data.creditLedger
        .filter((entry) => entry.userId === subscription.userId)
        .reduce((total, entry) => total + entry.delta, 0);
      if (balance > 0) {
        data.creditLedger.push({
          id: newId("credit"),
          userId: subscription.userId,
          delta: -balance,
          reason: "expiry",
          note: "Fin de période",
          createdAt: now(),
        });
      }
      data.creditLedger.push({
        id: newId("credit"),
        userId: subscription.userId,
        delta: plan.monthlyCredits,
        reason: "plan_renewal",
        note: `Renouvellement ${plan.name}`,
        createdAt: now(),
      });
      subscription.currentPeriodStart = now();
      subscription.currentPeriodEnd = now(30);
      renewed += 1;
    }
    return renewed;
  });
}

export function addReport(input: {
  reporterId: string;
  targetType: Report["targetType"];
  targetId: string;
  reason: string;
  details?: string;
}): ActionResult {
  return mutate((data) => {
    data.reports.unshift({
      id: newId("report"),
      reporterId: input.reporterId,
      targetType: input.targetType,
      targetId: input.targetId,
      reason: input.reason.trim(),
      details: input.details?.trim(),
      status: "open",
      createdAt: now(),
    });
    return { ok: true, message: "Signalement envoyé à l'équipe de modération." };
  });
}

export function resolveReport(reportId: string, status: Report["status"]): ActionResult {
  return mutate((data) => {
    const report = data.reports.find((item) => item.id === reportId);
    if (!report) return { ok: false, message: "Signalement introuvable." };
    report.status = status;
    return { ok: true, message: "Signalement traité." };
  });
}

export function setUserBanned(userId: string, banned: boolean): ActionResult {
  return mutate((data) => {
    const user = data.users.find((item) => item.id === userId);
    if (!user) return { ok: false, message: "Utilisateur introuvable." };
    user.banned = banned;
    return { ok: true, message: banned ? "Utilisateur suspendu." : "Utilisateur réactivé." };
  });
}

export function adjustCredits(userId: string, delta: number, note: string): ActionResult {
  return mutate((data) => {
    const user = data.users.find((item) => item.id === userId);
    if (!user) return { ok: false, message: "Utilisateur introuvable." };
    data.creditLedger.push({
      id: newId("credit"),
      userId,
      delta,
      reason: "admin_adjustment",
      note,
      createdAt: now(),
    });
    return { ok: true, message: "Solde ajusté." };
  });
}

export function markNotificationRead(userId: string, notificationId: string) {
  mutate((data) => {
    const notification = data.notifications.find(
      (item) => item.id === notificationId && item.userId === userId,
    );
    if (notification) notification.readAt = now();
  });
}

export function markAllNotificationsRead(userId: string) {
  mutate((data) => {
    for (const notification of data.notifications) {
      if (notification.userId === userId && !notification.readAt) notification.readAt = now();
    }
  });
}

export function getAdminStats() {
  const data = getStore();
  return {
    users: data.users.length,
    projects: data.projects.length,
    openReports: data.reports.filter((report) => report.status === "open").length,
    revenue: data.payments
      .filter((payment) => payment.status === "succeeded")
      .reduce((total, payment) => total + payment.amount, 0),
  };
}

export function getCreditEntries(userId: string) {
  return getStore()
    .creditLedger.filter((entry) => entry.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPaymentsForUser(userId: string) {
  return getStore()
    .payments.filter((payment) => payment.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPlans() {
  return getStore().plans;
}

export function getCategories() {
  return getStore().categories;
}

export function getUsers() {
  return getStore().users;
}

export const getAllUsers = getUsers;

export function getAllProjects() {
  return getStore().projects;
}

export function getAllReports() {
  return getStore().reports;
}

export function getAllPayments() {
  return getStore().payments;
}

export function getAllCreditEntries(): CreditEntry[] {
  return getStore().creditLedger;
}

function addPaymentRecord(
  data: DemoData,
  input: {
    userId: string;
    provider: PaymentProvider;
    kind: Payment["kind"];
    quoteId?: string;
    amount: number;
    currency: string;
    phone?: string;
  },
) {
    const payment: Payment = {
      id: newId("payment"),
      userId: input.userId,
      provider: input.provider,
    kind: input.kind,
    quoteId: input.quoteId,
    phone: input.phone,
    amount: input.amount,
    currency: input.currency,
    status: "succeeded",
    createdAt: now(),
    paidAt: now(),
  };
  data.payments.push(payment);
  data.invoices.push({
    id: newId("invoice"),
    paymentId: payment.id,
    number: `FA-${new Date().getFullYear()}-${String(data.invoices.length + 1).padStart(6, "0")}`,
    amount: payment.amount,
    currency: payment.currency,
    issuedAt: now(),
  });
  return payment;
}

export function getEscrowsForUser(userId: string) {
  return getStore()
    .escrows.filter((escrow) => escrow.clientId === userId || escrow.freelanceId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getEscrowForQuote(quoteId: string) {
  return getStore().escrows.find((escrow) => escrow.quoteId === quoteId);
}

export function fundEscrow(
  clientId: string,
  quoteId: string,
  provider: PaymentProvider,
  phone?: string,
): ActionResult {
  return mutate((data) => {
    const quote = data.quotes.find((item) => item.id === quoteId);
    if (!quote) return { ok: false, message: "Offre introuvable." };
    const project = data.projects.find((item) => item.id === quote.projectId);
    if (!project || project.clientId !== clientId) {
      return { ok: false, message: "Action non autorisée." };
    }
    if (quote.status !== "accepted") {
      return { ok: false, message: "Acceptez d'abord l'offre avant de sécuriser les fonds." };
    }
    if (data.escrows.some((item) => item.quoteId === quoteId)) {
      return { ok: false, message: "Cette mission est déjà financée." };
    }
    const platformFee = Math.round(quote.price * 0.04);
    const escrow: Escrow = {
      id: newId("escrow"),
      quoteId,
      projectId: project.id,
      clientId,
      freelanceId: quote.freelanceId,
      amount: quote.price,
      platformFee,
      payout: quote.price - platformFee,
      currency: quote.currency,
      status: "funded",
      createdAt: now(),
      fundedAt: now(),
    };
    data.escrows.push(escrow);
    addPaymentRecord(data, {
      userId: clientId,
      provider,
      kind: "escrow_funding",
      quoteId,
      amount: quote.price,
      currency: quote.currency,
      phone,
    });
    addNotification(
      data,
      quote.freelanceId,
      "escrow",
      "Mission financée",
      `Les fonds de « ${project.title} » sont sécurisés par Taf Africa.`,
      "/paiements",
    );
    addNotification(
      data,
      clientId,
      "escrow",
      "Paiement sécurisé",
      `Votre paiement de ${quote.price} ${quote.currency} est bloqué jusqu'à la livraison.`,
      "/paiements",
    );
    return { ok: true, message: "Fonds sécurisés. La commission de 4 % est calculée à la libération." };
  });
}

export function releaseEscrow(
  clientId: string,
  escrowId: string,
): ActionResult {
  return mutate((data) => {
    const escrow = data.escrows.find((item) => item.id === escrowId);
    if (!escrow || escrow.clientId !== clientId) {
      return { ok: false, message: "Action non autorisée." };
    }
    if (escrow.status !== "funded") {
      return { ok: false, message: "Cette mission ne peut plus être libérée." };
    }
    const dispute = data.disputes.find(
      (item) => item.quoteId === escrow.quoteId && item.status === "open",
    );
    if (dispute) return { ok: false, message: "Résolvez le litige avant de libérer les fonds." };
    escrow.status = "released";
    escrow.releasedAt = now();
    const project = data.projects.find((item) => item.id === escrow.projectId);
    addPaymentRecord(data, {
      userId: escrow.freelanceId,
      provider: "card",
      kind: "escrow_release",
      quoteId: escrow.quoteId,
      amount: escrow.payout,
      currency: escrow.currency,
    });
    addNotification(
      data,
      escrow.freelanceId,
      "escrow",
      "Paiement libéré",
      `${escrow.payout} ${escrow.currency} vous ont été versés pour « ${project?.title ?? "la mission"} ».`,
      "/factures",
    );
    addNotification(
      data,
      clientId,
      "review",
      "Mission terminée",
      "Laissez un avis au freelance pour clôturer la mission.",
      "/avis",
    );
    return { ok: true, message: "Fonds libérés au freelance, commission de 4 % retenue." };
  });
}

export function submitReview(
  clientId: string,
  quoteId: string,
  rating: number,
  comment: string,
): ActionResult {
  return mutate((data) => {
    const quote = data.quotes.find((item) => item.id === quoteId);
    if (!quote) return { ok: false, message: "Offre introuvable." };
    const project = data.projects.find((item) => item.id === quote.projectId);
    if (!project || project.clientId !== clientId) {
      return { ok: false, message: "Action non autorisée." };
    }
    if (data.reviews.some((item) => item.quoteId === quoteId)) {
      return { ok: false, message: "Vous avez déjà laissé un avis sur cette mission." };
    }
    const validRating = Math.min(5, Math.max(1, Math.round(rating)));
    data.reviews.unshift({
      id: newId("review"),
      quoteId,
      projectId: quote.projectId,
      clientId,
      freelanceId: quote.freelanceId,
      rating: validRating,
      comment: comment.trim(),
      createdAt: now(),
    });
    addNotification(
      data,
      quote.freelanceId,
      "review",
      "Nouvel avis",
      `Un client vous a attribué ${validRating}/5 sur « ${project.title} ».`,
      "/avis",
    );
    return { ok: true, message: "Merci, votre avis est publié." };
  });
}

export function getReviewsForFreelance(freelanceId: string) {
  return getStore()
    .reviews.filter((review) => review.freelanceId === freelanceId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function openDispute(
  actorId: string,
  quoteId: string,
  reason: string,
  details?: string,
): ActionResult {
  return mutate((data) => {
    const quote = data.quotes.find((item) => item.id === quoteId);
    if (!quote) return { ok: false, message: "Offre introuvable." };
    const project = data.projects.find((item) => item.id === quote.projectId);
    if (!project || (project.clientId !== actorId && quote.freelanceId !== actorId)) {
      return { ok: false, message: "Action non autorisée." };
    }
    if (data.disputes.some((item) => item.quoteId === quoteId && item.status === "open")) {
      return { ok: false, message: "Un litige est déjà ouvert sur cette mission." };
    }
    data.disputes.unshift({
      id: newId("dispute"),
      quoteId,
      projectId: quote.projectId,
      openedBy: actorId,
      reason: reason.trim(),
      details: details?.trim(),
      status: "open",
      createdAt: now(),
    });
    const escrow = data.escrows.find((item) => item.quoteId === quoteId);
    if (escrow) escrow.status = "disputed";
    for (const admin of data.users.filter((user) => user.role === "admin")) {
      addNotification(
        data,
        admin.id,
        "dispute",
        "Litige ouvert",
        `${reason.trim()} · ${project.title}`,
        "/admin/disputes",
      );
    }
    return { ok: true, message: "Litige transmis à la modération." };
  });
}

export function getDisputesForUser(userId: string) {
  const data = getStore();
  const quoteIds = new Set(
    data.quotes
      .filter((quote) => quote.freelanceId === userId)
      .map((quote) => quote.id),
  );
  const projectIds = new Set(
    data.projects.filter((project) => project.clientId === userId).map((project) => project.id),
  );
  return data.disputes
    .filter((dispute) => dispute.openedBy === userId || quoteIds.has(dispute.quoteId) || projectIds.has(dispute.projectId))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getAllDisputes() {
  return getStore().disputes;
}

export function resolveDispute(
  adminId: string,
  disputeId: string,
  status: DisputeStatus,
): ActionResult {
  return mutate((data) => {
    const admin = data.users.find((user) => user.id === adminId);
    if (!admin || admin.role !== "admin") return { ok: false, message: "Action réservée aux administrateurs." };
    const dispute = data.disputes.find((item) => item.id === disputeId);
    if (!dispute) return { ok: false, message: "Litige introuvable." };
    dispute.status = status;
    dispute.resolvedAt = now();
    const escrow = data.escrows.find((item) => item.quoteId === dispute.quoteId);
    if (escrow && status === "resolved") {
      escrow.status = "released";
      escrow.releasedAt = now();
      addPaymentRecord(data, {
        userId: escrow.freelanceId,
        provider: "card",
        kind: "escrow_release",
        quoteId: escrow.quoteId,
        amount: escrow.payout,
        currency: escrow.currency,
      });
    }
    if (escrow && status === "rejected") {
      escrow.status = "refunded";
      addPaymentRecord(data, {
        userId: escrow.clientId,
        provider: "card",
        kind: "refund",
        quoteId: escrow.quoteId,
        amount: escrow.amount,
        currency: escrow.currency,
      });
    }
    addNotification(
      data,
      dispute.openedBy,
      "dispute",
      "Litige traité",
      `Votre litige a été classé : ${status}.`,
      "/litiges",
    );
    return { ok: true, message: "Litige traité." };
  });
}

export function setIdentityVerified(adminId: string, userId: string, verified: boolean): ActionResult {
  return mutate((data) => {
    const admin = data.users.find((item) => item.id === adminId);
    if (!admin || admin.role !== "admin") return { ok: false, message: "Action réservée aux administrateurs." };
    const target = data.users.find((item) => item.id === userId);
    if (!target) return { ok: false, message: "Utilisateur introuvable." };
    target.identityVerified = verified;
    const profile = data.freelanceProfiles.find((item) => item.userId === userId);
    if (profile) profile.verified = verified;
    addNotification(
      data,
      userId,
      "system",
      verified ? "Identité vérifiée" : "Vérification retirée",
      verified ? "Votre badge de profil vérifié est actif." : "Votre badge de profil vérifié a été retiré.",
      "/profil",
    );
    return { ok: true, message: verified ? "Profil vérifié." : "Vérification retirée." };
  });
}

export function getReferralStats(userId: string) {
  const data = getStore();
  const user = data.users.find((item) => item.id === userId);
  const referrals = data.referrals.filter((item) => item.referrerId === userId);
  return {
    code: user?.referralCode ?? "",
    invited: referrals.length,
    bonus: referrals.reduce((total, item) => total + item.bonus, 0),
    referrals,
  };
}

function directoryEntry(profile: FreelanceProfile, data: DemoData) {
  const user = data.users.find((item) => item.id === profile.userId);
  const reviews = data.reviews.filter((item) => item.freelanceId === profile.userId);
  const rating = reviews.length
    ? reviews.reduce((total, item) => total + item.rating, 0) / reviews.length
    : 0;
  return {
    profile,
    name: user?.name ?? "Freelance",
    rating: Math.round(rating * 10) / 10,
    reviewCount: reviews.length,
  };
}

export function getDirectoryFreelances(filters: {
  city?: string;
  skill?: string;
  language?: string;
  query?: string;
}) {
  const data = getStore();
  const city = filters.city?.trim().toLowerCase();
  const skill = filters.skill?.trim().toLowerCase();
  const language = filters.language?.trim().toLowerCase();
  const query = filters.query?.trim().toLowerCase();
  return data.freelanceProfiles
    .filter((profile) => {
      if (!profile.isPublic) return false;
      if (city && !profile.city.toLowerCase().includes(city)) return false;
      if (skill && !profile.skills.some((item) => item.toLowerCase().includes(skill))) return false;
      if (language && !profile.languages.some((item) => item.toLowerCase().includes(language))) return false;
      if (query) {
        const haystack = [
          profile.title,
          profile.bio,
          profile.city,
          profile.country,
          ...profile.skills,
        ].join(" ").toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    })
    .map((profile) => directoryEntry(profile, data))
    .sort((a, b) => {
      if (a.profile.verified !== b.profile.verified) return a.profile.verified ? -1 : 1;
      return b.rating - a.rating;
    });
}

export function getRecommendedFreelancers(projectId: string) {
  const data = getStore();
  const project = data.projects.find((item) => item.id === projectId);
  if (!project) return [];
  const clientProfile = data.clientProfiles.find((item) => item.userId === project.clientId);
  return data.freelanceProfiles
    .filter((profile) => profile.isPublic)
    .map((profile) => {
      const entry = directoryEntry(profile, data);
      const skillMatches = profile.skills.filter((skill) => project.skills.includes(skill)).length;
      const cityMatch = clientProfile && profile.city === clientProfile.city ? 2 : 0;
      const score = skillMatches * 5 + cityMatch + entry.rating + (profile.verified ? 3 : 0);
      return { ...entry, score, reason: skillMatches > 0 ? `${skillMatches} compétence(s) correspondante(s)` : "Profil vérifié" };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
