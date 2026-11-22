"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/demo-store";

export async function markNotificationReadAction(formData: FormData) {
  const user = await requireUser();
  markNotificationRead(user.id, String(formData.get("notificationId") ?? ""));
  revalidatePath("/notifications");
}

export async function markAllNotificationsReadAction() {
  const user = await requireUser();
  markAllNotificationsRead(user.id);
  revalidatePath("/notifications");
}
