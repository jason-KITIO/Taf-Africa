"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";
import { loginWithPassword, registerUser } from "@/lib/demo-store";
import type { ActionResult } from "@/lib/types";
import { fieldErrors, loginSchema, registerSchema } from "@/lib/validators";

export async function loginAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les champs du formulaire.", fieldErrors: fieldErrors(parsed.error) };
  }
  const user = loginWithPassword(parsed.data.email, parsed.data.password);
  if (!user) return { ok: false, message: "E-mail ou mot de passe incorrect." };
  await createSession(user.id);
  revalidatePath("/");
  redirect("/tableau-de-bord");
}

export async function registerAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    referralCode: formData.get("referralCode") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les champs du formulaire.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = registerUser(parsed.data);
  if (!result.ok) return result;
  const user = loginWithPassword(parsed.data.email, parsed.data.password);
  if (!user) return { ok: false, message: "Inscription terminée, connectez-vous." };
  await createSession(user.id);
  revalidatePath("/");
  redirect("/tableau-de-bord");
}

export async function logoutAction() {
  await destroySession();
  revalidatePath("/");
  redirect("/");
}
