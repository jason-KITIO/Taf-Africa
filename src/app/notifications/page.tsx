import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { markAllNotificationsReadAction, markNotificationReadAction } from "@/app/actions/notifications";
import { EmptyState } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getNotificationsForUser } from "@/lib/demo-store";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const user = await requireUser();
  const notifications = getNotificationsForUser(user.id);
  const unread = notifications.filter((item) => !item.readAt).length;

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/notifications"
      title="Notifications"
      description="Tout ce qui demande votre attention, au même endroit."
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">File d&apos;attention</span>
          <span className="chip tnum">
            <span className="text-ink-soft">{unread}</span> non lue{unread > 1 ? "s" : ""}
          </span>
        </div>
        {unread > 0 ? (
          <form action={markAllNotificationsReadAction}>
            <button type="submit" className="action action-secondary">
              Tout marquer comme lu
            </button>
          </form>
        ) : null}
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="Aucune notification" description="Vos alertes de projets, offres et messages apparaîtront ici." />
      ) : (
        <ul className="panel divide-y divide-line overflow-hidden">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={cn(
                "min-w-0 px-4 py-4 sm:px-5",
                !notification.readAt && "border-l-2 border-clay",
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "chip",
                        notification.readAt ? "text-muted" : "border-clay/40 text-clay",
                      )}
                    >
                      {notification.readAt ? "Lu" : "Non lu"}
                    </span>
                    <p className="text-[15px] font-bold text-ink">{notification.title}</p>
                  </div>
                  <p className="mt-1 break-words text-sm leading-relaxed text-ink-soft">
                    {notification.body}
                  </p>
                  <p className="tnum mt-2 text-xs text-muted">
                    <time dateTime={notification.createdAt}>
                      {formatDateTime(notification.createdAt)}
                    </time>
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Link href={notification.url} className="action action-secondary">
                    Ouvrir
                  </Link>
                  {!notification.readAt ? (
                    <form action={markNotificationReadAction}>
                      <input type="hidden" name="notificationId" value={notification.id} />
                      <button type="submit" className="action action-quiet">
                        Marquer comme lu
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardShell>
  );
}
