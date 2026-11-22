"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { addPortfolioItem, updateProfile } from "@/lib/demo-store";
import type { ActionResult } from "@/lib/types";
import { fieldErrors, profileSchema } from "@/lib/validators";

export async function updateProfileAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    title: formData.get("title"),
    bio: formData.get("bio"),
    city: formData.get("city"),
    country: formData.get("country"),
    phone: formData.get("phone"),
    companyName: formData.get("companyName"),
    dailyRate: formData.get("dailyRate") || 0,
    languages: formData.get("languages"),
    skills: formData.get("skills"),
    emailAlerts: formData.get("emailAlerts"),
    isPublic: formData.get("isPublic"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les champs du formulaire.", fieldErrors: fieldErrors(parsed.error) };
  }
  const data = parsed.data;
  const result = updateProfile({
    userId: user.id,
    name: data.name,
    title: data.title,
    bio: data.bio,
    city: data.city,
    country: data.country,
    phone: data.phone,
    companyName: data.companyName,
    dailyRate: data.dailyRate,
    languages: data.languages?.split(",").map((item) => item.trim()).filter(Boolean),
    skills: data.skills?.split(",").map((item) => item.trim()).filter(Boolean),
    emailAlerts: data.emailAlerts === "on",
    isPublic: data.isPublic === "on",
  });
  if (result.ok) revalidatePath("/profil");
  return result;
}

export async function addPortfolioAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!title || !description) return { ok: false, message: "Renseignez un titre et une description." };
  const item = addPortfolioItem({
    userId: user.id,
    title,
    description,
    link: String(formData.get("link") ?? ""),
  });
  if (!item) return { ok: false, message: "Profil freelance introuvable." };
  revalidatePath("/profil");
  return { ok: true, message: "Réalisateur ajouté au portfolio." };
}
