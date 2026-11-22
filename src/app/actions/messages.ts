"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { markConversationRead, sendMessage } from "@/lib/demo-store";
import type { ActionResult } from "@/lib/types";
import { fieldErrors, messageSchema } from "@/lib/validators";

export async function sendMessageAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = messageSchema.safeParse({ body: formData.get("body") });
  if (!parsed.success) {
    return { ok: false, message: "Message invalide.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = sendMessage({
    conversationId: String(formData.get("conversationId") ?? ""),
    senderId: user.id,
    body: parsed.data.body,
  });
  if (result.ok) revalidatePath(`/messagerie/${formData.get("conversationId")}`);
  return result;
}

export async function markConversationReadAction(formData: FormData) {
  const user = await requireUser();
  const conversationId = String(formData.get("conversationId") ?? "");
  markConversationRead(user.id, conversationId);
  revalidatePath(`/messagerie/${conversationId}`);
}

export async function openConversationAction(formData: FormData) {
  const user = await requireUser();
  const conversationId = String(formData.get("conversationId") ?? "");
  markConversationRead(user.id, conversationId);
  redirect(`/messagerie/${conversationId}`);
}
