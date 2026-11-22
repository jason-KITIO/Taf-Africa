"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { cancelSubscription, subscribeUser } from "@/lib/demo-store";
import type { ActionResult } from "@/lib/types";
import { fieldErrors, subscriptionSchema } from "@/lib/validators";

export async function subscribeAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = subscriptionSchema.safeParse({
    planCode: formData.get("planCode"),
    provider: formData.get("provider"),
    phone: formData.get("phone"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les informations de paiement.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = subscribeUser({ userId: user.id, ...parsed.data });
  if (result.ok) {
    revalidatePath("/abonnements");
    revalidatePath("/factures");
    revalidatePath("/profil");
  }
  return result;
}

export async function cancelSubscriptionAction() {
  const user = await requireUser();
  cancelSubscription(user.id);
  revalidatePath("/abonnements");
}
