"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import {
  adjustCredits,
  createClientByAdmin,
  createProject,
  getAllUsers,
  renewSubscriptions,
  resolveReport,
  setProjectStatus,
  setUserBanned,
} from "@/lib/demo-store";
import type { ActionResult } from "@/lib/types";
import { adminClientSchema, adminProjectSchema, fieldErrors } from "@/lib/validators";
export async function resolveReportAction(formData: FormData) {
  await requireRole("admin");
  resolveReport(
    String(formData.get("reportId") ?? ""),
    String(formData.get("status") ?? "resolved") as "resolved" | "dismissed" | "reviewing",
  );
  revalidatePath("/admin/reports");
}

export async function toggleBanAction(formData: FormData) {
  const admin = await requireRole("admin");
  const userId = String(formData.get("userId") ?? "");
  if (userId === admin.id) return;
  setUserBanned(userId, String(formData.get("banned") ?? "true") === "true");
  revalidatePath("/admin/users");
}

export async function moderateProjectAction(formData: FormData) {
  await requireRole("admin");
  setProjectStatus(
    String(formData.get("projectId") ?? ""),
    String(formData.get("status") ?? "hidden") as "hidden" | "open",
    "",
  );
  revalidatePath("/admin/projects");
  revalidatePath("/projets");
}

export async function adjustCreditsAction(formData: FormData) {
  await requireRole("admin");
  adjustCredits(
    String(formData.get("userId") ?? ""),
    Number(formData.get("delta") ?? 0),
    String(formData.get("note") ?? "Ajustement administrateur"),
  );
  revalidatePath("/admin/users");
}

export async function renewSubscriptionsAction() {
  await requireRole("admin");
  renewSubscriptions();
  revalidatePath("/admin/payments");
  revalidatePath("/abonnements");
}

export async function createClientByAdminAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireRole("admin");
  const parsed = adminClientSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    companyName: String(formData.get("companyName") ?? "") || undefined,
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les champs du client.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = createClientByAdmin(parsed.data);
  if (result.ok) {
    revalidatePath("/admin/users");
    revalidatePath("/admin/creation");
  }
  return result;
}

export async function createProjectByAdminAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireRole("admin");
  const parsed = adminProjectSchema.safeParse({
    clientId: formData.get("clientId"),
    title: formData.get("title"),
    description: formData.get("description"),
    categorySlug: formData.get("categorySlug"),
    budgetMin: formData.get("budgetMin"),
    budgetMax: formData.get("budgetMax"),
    deadlineDays: formData.get("deadlineDays"),
    skills: formData.get("skills"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les champs du projet.", fieldErrors: fieldErrors(parsed.error) };
  }
  const data = parsed.data;
  if (data.budgetMax < data.budgetMin) {
    return { ok: false, message: "Le budget maximum doit être supérieur au minimum." };
  }
  const client = getAllUsers().find((user) => user.id === data.clientId && user.role === "client");
  if (!client) return { ok: false, message: "Client introuvable." };

  const project = createProject({
    clientId: client.id,
    title: data.title,
    description: data.description,
    categorySlug: data.categorySlug,
    budgetMin: data.budgetMin,
    budgetMax: data.budgetMax,
    deadlineDays: data.deadlineDays,
    skills: data.skills?.split(",").map((item) => item.trim()).filter(Boolean) ?? [],
    attachmentNames: [],
  });
  if (!project) return { ok: false, message: "Impossible de créer le projet." };

  revalidatePath("/admin/projects");
  revalidatePath("/admin/creation");
  revalidatePath("/projets");
  return { ok: true, message: `Projet ${project.title} créé.` };
}
