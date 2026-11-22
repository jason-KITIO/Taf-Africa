import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  uuid,
  uniqueIndex,
  index,
  primaryKey,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

const createdAt = () =>
  timestamp("created_at", { withTimezone: true }).defaultNow().notNull();

const updatedAt = () =>
  timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull();

export const userRole = pgEnum("user_role", ["client", "freelance", "admin"]);
export const teamRole = pgEnum("team_role", ["owner", "manager", "member"]);
export const projectStatus = pgEnum("project_status", [
  "open",
  "closed",
  "awarded",
  "cancelled",
  "hidden",
]);
export const quoteType = pgEnum("quote_type", ["simple", "premium"]);
export const quoteStatus = pgEnum("quote_status", [
  "sent",
  "studied",
  "accepted",
  "rejected",
  "withdrawn",
]);
export const subscriptionStatus = pgEnum("subscription_status", [
  "pending",
  "active",
  "canceled",
  "expired",
]);
export const creditReason = pgEnum("credit_reason", [
  "plan_renewal",
  "quote_sent",
  "quote_refund",
  "expiry",
  "admin_adjustment",
  "referral_bonus",
]);
export const paymentKind = pgEnum("payment_kind", [
  "subscription",
  "escrow_funding",
  "escrow_release",
  "commission",
  "refund",
  "referral",
]);
export const escrowStatus = pgEnum("escrow_status", [
  "funded",
  "released",
  "refunded",
  "disputed",
]);
export const disputeStatus = pgEnum("dispute_status", [
  "open",
  "reviewing",
  "resolved",
  "rejected",
]);
export const paymentProvider = pgEnum("payment_provider", [
  "orange_money",
  "mtn_momo",
  "wave",
  "moov_money",
  "stripe",
  "card",
]);
export const paymentStatus = pgEnum("payment_status", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
]);
export const reportTargetType = pgEnum("report_target_type", [
  "project",
  "profile",
  "message",
  "quote",
]);
export const reportStatus = pgEnum("report_status", [
  "open",
  "reviewing",
  "resolved",
  "dismissed",
]);
export const notificationType = pgEnum("notification_type", [
  "new_project",
  "new_quote",
  "new_message",
  "quote_studied",
  "quote_accepted",
  "subscription",
  "escrow",
  "review",
  "dispute",
  "referral",
  "system",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: userRole("role").default("client").notNull(),
  banned: boolean("banned").default(false).notNull(),
  identityVerified: boolean("identity_verified").default(false).notNull(),
  referralCode: text("referral_code").unique(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("session_user_idx").on(t.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      withTimezone: true,
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("account_user_idx").on(t.userId)],
);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const teams = pgTable(
  "teams",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("teams_owner_idx").on(t.ownerId)],
);

export const teamMembers = pgTable(
  "team_members",
  {
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: teamRole("role").default("member").notNull(),
  },
  (t) => [primaryKey({ columns: [t.teamId, t.userId] })],
);

export const freelanceProfiles = pgTable("freelance_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  title: text("title"),
  bio: text("bio"),
  country: text("country"),
  city: text("city"),
  phone: text("phone"),
  languages: text("languages")
    .array()
    .default(sql`'{}'::text[]`)
    .notNull(),
  dailyRate: integer("daily_rate"),
  rateCurrency: text("rate_currency").default("XAF").notNull(),
  emailAlerts: boolean("email_alerts").default(true).notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  verified: boolean("verified").default(false).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const clientProfiles = pgTable("client_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  companyName: text("company_name"),
  country: text("country"),
  city: text("city"),
  phone: text("phone"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const portfolioItems = pgTable(
  "portfolio_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    freelanceId: text("freelance_id")
      .notNull()
      .references(() => freelanceProfiles.userId, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    imageUrl: text("image_url"),
    link: text("link"),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("portfolio_freelance_idx").on(t.freelanceId)],
);

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  parentId: uuid("parent_id").references((): AnyPgColumn => categories.id, {
    onDelete: "set null",
  }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const freelanceSkills = pgTable(
  "freelance_skills",
  {
    freelanceId: text("freelance_id")
      .notNull()
      .references(() => freelanceProfiles.userId, { onDelete: "cascade" }),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.freelanceId, t.skillId] }),
    index("freelance_skills_skill_idx").on(t.skillId),
  ],
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: text("client_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    budgetMin: integer("budget_min"),
    budgetMax: integer("budget_max"),
    currency: text("currency").default("XAF").notNull(),
    deadlineDays: integer("deadline_days"),
    status: projectStatus("status").default("open").notNull(),
    maxQuotes: integer("max_quotes").default(10).notNull(),
    quotesCount: integer("quotes_count").default(0).notNull(),
    viewsCount: integer("views_count").default(0).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    closedAt: timestamp("closed_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("projects_status_published_idx").on(t.status, t.publishedAt),
    index("projects_category_idx").on(t.categoryId),
    index("projects_client_idx").on(t.clientId),
  ],
);

export const projectSkills = pgTable(
  "project_skills",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.projectId, t.skillId] }),
    index("project_skills_skill_idx").on(t.skillId),
  ],
);

export const projectAttachments = pgTable(
  "project_attachments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    fileName: text("file_name").notNull(),
    url: text("url").notNull(),
    sizeBytes: integer("size_bytes"),
    createdAt: createdAt(),
  },
  (t) => [index("project_attachments_project_idx").on(t.projectId)],
);

export const quotes = pgTable(
  "quotes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    freelanceId: text("freelance_id")
      .notNull()
      .references(() => freelanceProfiles.userId, { onDelete: "cascade" }),
    price: integer("price").notNull(),
    currency: text("currency").default("XAF").notNull(),
    deliveryDays: integer("delivery_days").notNull(),
    message: text("message").notNull(),
    type: quoteType("type").default("simple").notNull(),
    status: quoteStatus("status").default("sent").notNull(),
    creditsSpent: integer("credits_spent").default(1).notNull(),
    studiedAt: timestamp("studied_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("quotes_one_per_freelance_idx").on(t.projectId, t.freelanceId),
    index("quotes_freelance_idx").on(t.freelanceId),
  ],
);

export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  priceCents: integer("price_cents").default(0).notNull(),
  currency: text("currency").default("EUR").notNull(),
  priceXaf: integer("price_xaf").default(0).notNull(),
  monthlyCredits: integer("monthly_credits").default(0).notNull(),
  canSeeClient: boolean("can_see_client").default(false).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: createdAt(),
});

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    planId: uuid("plan_id")
      .notNull()
      .references(() => plans.id),
    status: subscriptionStatus("status").default("pending").notNull(),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
    }).notNull(),
    currentPeriodEnd: timestamp("current_period_end", {
      withTimezone: true,
    }).notNull(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("subscriptions_one_active_per_user_idx")
      .on(t.userId)
      .where(sql`${t.status} = 'active'`),
    index("subscriptions_period_end_idx").on(t.status, t.currentPeriodEnd),
  ],
);

export const creditLedger = pgTable(
  "credit_ledger",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    subscriptionId: uuid("subscription_id").references(() => subscriptions.id, {
      onDelete: "set null",
    }),
    quoteId: uuid("quote_id").references(() => quotes.id, {
      onDelete: "set null",
    }),
    delta: integer("delta").notNull(),
    reason: creditReason("reason").notNull(),
    idempotencyKey: text("idempotency_key").unique(),
    note: text("note"),
    createdAt: createdAt(),
  },
  (t) => [index("credit_ledger_user_idx").on(t.userId, t.createdAt)],
);

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    subscriptionId: uuid("subscription_id").references(() => subscriptions.id),
    quoteId: uuid("quote_id").references(() => quotes.id),
    kind: paymentKind("kind").default("subscription").notNull(),
    provider: paymentProvider("provider").notNull(),
    providerRef: text("provider_ref").unique(),
    phone: text("phone"),
    amount: integer("amount").notNull(),
    currency: text("currency").default("XAF").notNull(),
    status: paymentStatus("status").default("pending").notNull(),
    rawPayload: jsonb("raw_payload"),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("payments_user_idx").on(t.userId, t.createdAt),
    index("payments_status_idx").on(t.status),
  ],
);

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  paymentId: uuid("payment_id")
    .notNull()
    .unique()
    .references(() => payments.id, { onDelete: "cascade" }),
  number: text("number").notNull().unique(),
  pdfUrl: text("pdf_url"),
  issuedAt: timestamp("issued_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const escrows = pgTable(
  "escrows",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quoteId: uuid("quote_id")
      .notNull()
      .unique()
      .references(() => quotes.id, { onDelete: "cascade" }),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    clientId: text("client_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    freelanceId: text("freelance_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
    platformFee: integer("platform_fee").notNull(),
    payout: integer("payout").notNull(),
    currency: text("currency").default("XAF").notNull(),
    status: escrowStatus("status").default("funded").notNull(),
    createdAt: createdAt(),
    fundedAt: timestamp("funded_at", { withTimezone: true }),
    releasedAt: timestamp("released_at", { withTimezone: true }),
  },
  (t) => [
    index("escrows_client_idx").on(t.clientId),
    index("escrows_freelance_idx").on(t.freelanceId),
  ],
);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quoteId: uuid("quote_id")
      .notNull()
      .unique()
      .references(() => quotes.id, { onDelete: "cascade" }),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    clientId: text("client_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    freelanceId: text("freelance_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    comment: text("comment").notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("reviews_freelance_idx").on(t.freelanceId, t.createdAt)],
);

export const disputes = pgTable(
  "disputes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quoteId: uuid("quote_id")
      .notNull()
      .references(() => quotes.id, { onDelete: "cascade" }),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    openedBy: text("opened_by")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    reason: text("reason").notNull(),
    details: text("details"),
    status: disputeStatus("status").default("open").notNull(),
    createdAt: createdAt(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  },
  (t) => [index("disputes_status_idx").on(t.status, t.createdAt)],
);

export const referrals = pgTable(
  "referrals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    referrerId: text("referrer_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    invitedId: text("invited_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),
    code: text("code").notNull(),
    bonus: integer("bonus").default(5).notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("referrals_referrer_idx").on(t.referrerId)],
);

export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    clientId: text("client_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    freelanceId: text("freelance_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    quoteId: uuid("quote_id").references(() => quotes.id, {
      onDelete: "set null",
    }),
    lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("conversations_project_freelance_idx").on(
      t.projectId,
      t.freelanceId,
    ),
    index("conversations_client_idx").on(t.clientId),
    index("conversations_freelance_idx").on(t.freelanceId),
  ],
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    senderId: text("sender_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    containsContact: boolean("contains_contact").default(false).notNull(),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("messages_conversation_idx").on(t.conversationId, t.createdAt)],
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: notificationType("type").notNull(),
    title: text("title").notNull(),
    body: text("body"),
    url: text("url"),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("notifications_user_idx").on(t.userId, t.readAt, t.createdAt)],
);

export const reports = pgTable(
  "reports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    reporterId: text("reporter_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    targetType: reportTargetType("target_type").notNull(),
    targetId: text("target_id").notNull(),
    reason: text("reason").notNull(),
    details: text("details"),
    status: reportStatus("status").default("open").notNull(),
    resolvedBy: text("resolved_by").references(() => user.id),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("reports_status_idx").on(t.status, t.createdAt)],
);

export const userRelations = relations(user, ({ one, many }) => ({
  freelanceProfile: one(freelanceProfiles, {
    fields: [user.id],
    references: [freelanceProfiles.userId],
  }),
  clientProfile: one(clientProfiles, {
    fields: [user.id],
    references: [clientProfiles.userId],
  }),
  projects: many(projects),
  subscriptions: many(subscriptions),
  escrows: many(escrows),
  reviews: many(reviews),
  referrals: many(referrals),
  notifications: many(notifications),
}));

export const freelanceProfilesRelations = relations(
  freelanceProfiles,
  ({ one, many }) => ({
    user: one(user, {
      fields: [freelanceProfiles.userId],
      references: [user.id],
    }),
    skills: many(freelanceSkills),
    portfolio: many(portfolioItems),
    quotes: many(quotes),
    reviews: many(reviews),
  }),
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(user, { fields: [projects.clientId], references: [user.id] }),
  skills: many(projectSkills),
  attachments: many(projectAttachments),
  quotes: many(quotes),
  conversations: many(conversations),
}));

export const quotesRelations = relations(quotes, ({ one }) => ({
  project: one(projects, {
    fields: [quotes.projectId],
    references: [projects.id],
  }),
  freelance: one(freelanceProfiles, {
    fields: [quotes.freelanceId],
    references: [freelanceProfiles.userId],
  }),
  escrow: one(escrows),
  review: one(reviews),
}));

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [conversations.projectId],
      references: [projects.id],
    }),
    client: one(user, {
      fields: [conversations.clientId],
      references: [user.id],
      relationName: "conversation_client",
    }),
    freelance: one(user, {
      fields: [conversations.freelanceId],
      references: [user.id],
      relationName: "conversation_freelance",
    }),
    messages: many(messages),
  }),
);

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(user, { fields: [messages.senderId], references: [user.id] }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(user, { fields: [payments.userId], references: [user.id] }),
  subscription: one(subscriptions, {
    fields: [payments.subscriptionId],
    references: [subscriptions.id],
  }),
  invoice: one(invoices, {
    fields: [payments.id],
    references: [invoices.paymentId],
  }),
}));
