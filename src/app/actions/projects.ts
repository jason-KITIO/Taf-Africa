"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, requireUser } from "@/lib/auth";
import { addReport, createProject, setProjectStatus } from "@/lib/demo-store";
import type { ActionResult } from "@/lib/types";
import { fieldErrors, projectSchema, reportSchema } from "@/lib/validators";

export async function createProjectAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireRole("client");
  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    categorySlug: formData.get("categorySlug"),
    budgetMin: formData.get("budgetMin"),
    budgetMax: formData.get("budgetMax"),
    deadlineDays: formData.get("deadlineDays"),
    skills: formData.get("skills"),
    attachmentNames: formData.get("attachmentNames"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez les champs du formulaire.", fieldErrors: fieldErrors(parsed.error) };
  }
  const data = parsed.data;
  if (data.budgetMax < data.budgetMin) {
    return { ok: false, message: "Le budget maximum doit être supérieur au minimum." };
  }
  const project = createProject({
    clientId: user.id,
    title: data.title,
    description: data.description,
    categorySlug: data.categorySlug,
    budgetMin: data.budgetMin,
    budgetMax: data.budgetMax,
    deadlineDays: data.deadlineDays,
    skills: data.skills?.split(",").map((item) => item.trim()).filter(Boolean) ?? [],
    attachmentNames: data.attachmentNames
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [],
  });
  if (!project) return { ok: false, message: "Impossible de créer le projet." };
  revalidatePath("/projets");
  redirect(`/projets/${project.slug}`);
}

export async function closeProjectAction(formData: FormData) {
  const user = await requireUser();
  const projectId = String(formData.get("projectId") ?? "");
  const status = String(formData.get("status") ?? "closed") as "closed" | "cancelled";
  const result = setProjectStatus(projectId, status, user.id);
  revalidatePath("/projets");
  return result;
}

export async function reportProjectAction(
  _state: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = reportSchema.safeParse({
    reason: formData.get("reason"),
    details: formData.get("details"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Vérifiez le motif du signalement.", fieldErrors: fieldErrors(parsed.error) };
  }
  const result = addReport({
    reporterId: user.id,
    targetType: "project",
    targetId: String(formData.get("projectId") ?? ""),
    ...parsed.data,
  });
  if (result.ok) revalidatePath("/admin/reports");
  return result;
}
