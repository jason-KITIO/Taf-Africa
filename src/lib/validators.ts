import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide."),
  password: z.string().min(8, "Utilisez au moins 8 caractères."),
  role: z.enum(["client", "freelance"]),
  referralCode: z.string().trim().max(40).optional(),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom."),
  title: z.string().trim().max(120).optional(),
  bio: z.string().trim().max(1200).optional(),
  city: z.string().trim().max(80).optional(),
  country: z.string().trim().max(80).optional(),
  phone: z.string().trim().max(40).optional(),
  companyName: z.string().trim().max(120).optional(),
  dailyRate: z.coerce.number().int().min(0).optional(),
  languages: z.string().trim().optional(),
  skills: z.string().trim().optional(),
  emailAlerts: z.string().optional(),
  isPublic: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(8, "Le titre doit contenir au moins 8 caractères."),
  description: z.string().trim().min(30, "Décrivez le projet en au moins 30 caractères."),
  categorySlug: z.string().min(1, "Choisissez une catégorie."),
  budgetMin: z.coerce.number().int().min(0),
  budgetMax: z.coerce.number().int().min(0),
  deadlineDays: z.coerce.number().int().min(1).max(365),
  skills: z.string().trim().optional(),
  attachmentNames: z.string().trim().optional(),
});

export const adminClientSchema = z.object({
  name: z.string().trim().min(2, "Indiquez le nom du client."),
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide."),
  password: z.string().min(8, "Utilisez au moins 8 caractères."),
  companyName: z.string().trim().max(120).optional(),
});

export const adminProjectSchema = projectSchema.extend({
  clientId: z.string().min(1, "Choisissez un client."),
});

export const quoteSchema = z.object({
  price: z.coerce.number().int().min(1000, "Indiquez un prix réaliste."),
  deliveryDays: z.coerce.number().int().min(1).max(365),
  message: z.string().trim().min(20, "Présentez votre offre en au moins 20 caractères."),
  type: z.enum(["simple", "premium"]),
});

export const messageSchema = z.object({
  body: z.string().trim().min(1, "Écrivez un message.").max(2000),
});

export const subscriptionSchema = z.object({
  planCode: z.enum(["pro", "pro_max", "agence"]),
  provider: z.enum(["orange_money", "mtn_momo", "wave", "moov_money", "card"]),
  phone: z.string().trim().max(40).optional(),
});

export const reportSchema = z.object({
  reason: z.string().trim().min(5, "Précisez le motif."),
  details: z.string().trim().max(1000).optional(),
});

export const escrowSchema = z.object({
  quoteId: z.string().min(1),
  provider: z.enum(["orange_money", "mtn_momo", "wave", "moov_money", "card"]),
  phone: z.string().trim().max(40).optional(),
});

export const reviewSchema = z.object({
  quoteId: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().min(10, "Décrivez votre expérience en au moins 10 caractères.").max(1000),
});

export const disputeSchema = z.object({
  quoteId: z.string().min(1),
  reason: z.string().trim().min(5, "Précisez le motif."),
  details: z.string().trim().max(1000).optional(),
});

export const disputeStatusSchema = z.enum(["open", "reviewing", "resolved", "rejected"]);

export function fieldErrors(error: z.ZodError) {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
