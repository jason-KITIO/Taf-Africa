export type Role = "client" | "freelance" | "admin";
export type ProjectStatus = "open" | "closed" | "awarded" | "cancelled" | "hidden";
export type QuoteType = "simple" | "premium";
export type QuoteStatus = "sent" | "studied" | "accepted" | "rejected" | "withdrawn";
export type PlanCode = "none" | "pro" | "pro_max" | "agence";
export type PaidPlanCode = Exclude<PlanCode, "none">;
export type PaymentProvider = "orange_money" | "mtn_momo" | "wave" | "moov_money" | "card";
export type PaymentKind =
  | "subscription"
  | "escrow_funding"
  | "escrow_release"
  | "commission"
  | "refund"
  | "referral";
export type ReportStatus = "open" | "reviewing" | "resolved" | "dismissed";
export type EscrowStatus = "funded" | "released" | "refunded" | "disputed";
export type DisputeStatus = "open" | "reviewing" | "resolved" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  image?: string;
  banned: boolean;
  identityVerified: boolean;
  referralCode: string;
  createdAt: string;
}

export interface FreelanceProfile {
  userId: string;
  slug: string;
  title: string;
  bio: string;
  city: string;
  country: string;
  phone?: string;
  languages: string[];
  dailyRate: number;
  rateCurrency: string;
  emailAlerts: boolean;
  isPublic: boolean;
  verified: boolean;
  skills: string[];
}

export interface ClientProfile {
  userId: string;
  companyName: string;
  city: string;
  country: string;
  phone?: string;
}

export interface PortfolioItem {
  id: string;
  freelanceId: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentSlug?: string;
  sortOrder: number;
}

export interface Project {
  id: string;
  clientId: string;
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  deadlineDays: number;
  skills: string[];
  attachmentNames: string[];
  status: ProjectStatus;
  maxQuotes: number;
  quotesCount: number;
  viewsCount: number;
  publishedAt: string;
  closedAt?: string;
  createdAt: string;
}

export interface Quote {
  id: string;
  projectId: string;
  freelanceId: string;
  price: number;
  currency: string;
  deliveryDays: number;
  message: string;
  type: QuoteType;
  status: QuoteStatus;
  creditsSpent: number;
  studiedAt?: string;
  createdAt: string;
}

export interface Plan {
  code: PlanCode;
  name: string;
  priceCents: number;
  priceXaf: number;
  monthlyCredits: number;
  canSeeClient: boolean;
  isFeatured: boolean;
  description: string;
  features: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  planCode: PaidPlanCode;
  status: "active" | "canceled" | "expired" | "pending";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface CreditEntry {
  id: string;
  userId: string;
  delta: number;
  reason:
    | "plan_renewal"
    | "quote_sent"
    | "quote_refund"
    | "expiry"
    | "admin_adjustment"
    | "referral_bonus";
  note: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  planCode?: PaidPlanCode;
  provider: PaymentProvider;
  kind: PaymentKind;
  quoteId?: string;
  phone?: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "refunded";
  createdAt: string;
  paidAt?: string;
}

export interface Invoice {
  id: string;
  paymentId: string;
  number: string;
  amount: number;
  currency: string;
  issuedAt: string;
}

export interface Escrow {
  id: string;
  quoteId: string;
  projectId: string;
  clientId: string;
  freelanceId: string;
  amount: number;
  platformFee: number;
  payout: number;
  currency: string;
  status: EscrowStatus;
  createdAt: string;
  fundedAt?: string;
  releasedAt?: string;
}

export interface Review {
  id: string;
  quoteId: string;
  projectId: string;
  clientId: string;
  freelanceId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  quoteId: string;
  projectId: string;
  openedBy: string;
  reason: string;
  details?: string;
  status: DisputeStatus;
  createdAt: string;
  resolvedAt?: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  invitedId: string;
  code: string;
  bonus: number;
  createdAt: string;
}

export interface Conversation {
  id: string;
  projectId: string;
  clientId: string;
  freelanceId: string;
  quoteId?: string;
  lastMessageAt: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  containsContact: boolean;
  readAt?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type:
    | "new_project"
    | "new_quote"
    | "new_message"
    | "quote_studied"
    | "quote_accepted"
    | "subscription"
    | "escrow"
    | "review"
    | "dispute"
    | "referral"
    | "system";
  title: string;
  body: string;
  url: string;
  readAt?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: "project" | "profile" | "message" | "quote";
  targetId: string;
  reason: string;
  details?: string;
  status: ReportStatus;
  createdAt: string;
}

export interface DemoData {
  users: User[];
  freelanceProfiles: FreelanceProfile[];
  clientProfiles: ClientProfile[];
  portfolioItems: PortfolioItem[];
  categories: Category[];
  skills: string[];
  projects: Project[];
  quotes: Quote[];
  plans: Plan[];
  subscriptions: Subscription[];
  creditLedger: CreditEntry[];
  payments: Payment[];
  invoices: Invoice[];
  escrows: Escrow[];
  reviews: Review[];
  disputes: Dispute[];
  referrals: Referral[];
  conversations: Conversation[];
  messages: Message[];
  notifications: NotificationItem[];
  reports: Report[];
}

export interface ActionResult {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}
