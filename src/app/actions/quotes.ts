"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { acceptQuote, markQuoteStudied, submitQuote } from "@/lib/demo-store";
import type { ActionResult } from "@/lib/types";
import { fieldErrors, quoteSchema } from "@/lib/validators";

export async function submitQuoteAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireRole("freelance");
  const parsed = quoteSchema.safeParse({
    price: formData.get("price"),
    deliveryDays: formData.get("deliveryDays"),
    message: formData.get("message"),
    type: formData.get("type"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les champs de votre offre.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = submitQuote({
    freelanceId: user.id,
    projectId: String(formData.get("projectId") ?? ""),
    ...parsed.data,
  });
  if (result.ok) {
    revalidatePath("/offres");
    revalidatePath("/messagerie");
    revalidatePath("/projets");
  }
  return result;
}

export async function markQuoteStudiedAction(formData: FormData) {
  const user = await requireRole("client");
  markQuoteStudied(user.id, String(formData.get("quoteId") ?? ""));
  revalidatePath("/offres");
}

export async function acceptQuoteAction(formData: FormData) {
  const user = await requireRole("client");
  acceptQuote(user.id, String(formData.get("quoteId") ?? ""));
  revalidatePath("/offres");
  revalidatePath("/projets");
}
