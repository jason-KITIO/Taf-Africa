"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import {
  adjustCredits,
  renewSubscriptions,
  resolveReport,
  setProjectStatus,
  setUserBanned,
} from "@/lib/demo-store";
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
