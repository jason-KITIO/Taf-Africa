"use server";

import { revalidatePath } from "next/cache";
import { requireRole, requireUser } from "@/lib/auth";
import {
  fundEscrow,
  openDispute,
  releaseEscrow,
  resolveDispute,
  setIdentityVerified,
  submitReview,
} from "@/lib/demo-store";
import type { ActionResult } from "@/lib/types";
import {
  disputeSchema,
  disputeStatusSchema,
  escrowSchema,
  fieldErrors,
  reviewSchema,
} from "@/lib/validators";

export async function fundEscrowAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = escrowSchema.safeParse({
    quoteId: formData.get("quoteId"),
    provider: formData.get("provider"),
    phone: formData.get("phone") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les champs du paiement.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = fundEscrow(
    user.id,
    parsed.data.quoteId,
    parsed.data.provider,
    parsed.data.phone,
  );
  if (result.ok) {
    revalidatePath("/paiements");
    revalidatePath("/factures");
  }
  return result;
}

export async function releaseEscrowAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const result = releaseEscrow(user.id, String(formData.get("escrowId") ?? ""));
  if (result.ok) {
    revalidatePath("/paiements");
    revalidatePath("/factures");
    revalidatePath("/avis");
  }
  return result;
}

export async function submitReviewAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = reviewSchema.safeParse({
    quoteId: formData.get("quoteId"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez votre avis.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = submitReview(
    user.id,
    parsed.data.quoteId,
    parsed.data.rating,
    parsed.data.comment,
  );
  if (result.ok) {
    revalidatePath("/avis");
    revalidatePath("/freelances");
  }
  return result;
}

export async function openDisputeAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = disputeSchema.safeParse({
    quoteId: formData.get("quoteId"),
    reason: formData.get("reason"),
    details: formData.get("details") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez le motif du litige.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = openDispute(
    user.id,
    parsed.data.quoteId,
    parsed.data.reason,
    parsed.data.details,
  );
  if (result.ok) revalidatePath("/litiges");
  return result;
}

export async function resolveDisputeAction(formData: FormData) {
  const admin = await requireRole("admin");
  const parsed = disputeStatusSchema.safeParse(formData.get("status"));
  resolveDispute(
    admin.id,
    String(formData.get("disputeId") ?? ""),
    parsed.success ? parsed.data : "resolved",
  );
  revalidatePath("/admin/disputes");
  revalidatePath("/litiges");
}

export async function verifyProfileAction(formData: FormData) {
  const admin = await requireRole("admin");
  setIdentityVerified(
    admin.id,
    String(formData.get("userId") ?? ""),
    String(formData.get("verified") ?? "false") === "true",
  );
  revalidatePath("/admin/verifications");
  revalidatePath("/freelances");
}
