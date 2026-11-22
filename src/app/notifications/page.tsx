import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { markAllNotificationsReadAction, markNotificationReadAction } from "@/app/actions/notifications";
import { Card, EmptyState, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getNotificationsForUser } from "@/lib/demo-store";
import { formatDateTime } from "@/lib/format";

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
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          <strong className="tnum text-ink">{unread}</strong> non lue{unread > 1 ? "s" : ""}
        </p>
        {unread > 0 ? (
          <form action={markAllNotificationsReadAction}>
            <button type="submit" className="rounded-full border border-line-strong px-4 py-2 text-sm font-bold text-ink transition hover:border-ink/40">
              Tout marquer comme lu
            </button>
          </form>
        ) : null}
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="Aucune notification" description="Vos alertes de projets, offres et messages apparaîtront ici." />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.readAt ? "opacity-75" : ""}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {!notification.readAt ? <StatusPill tone="warning">Nouveau</StatusPill> : null}
                    <p className="font-bold text-ink">{notification.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{notification.body}</p>
                  <p className="mt-2 text-xs text-muted">{formatDateTime(notification.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={notification.url} className="rounded-full border border-line-strong px-3.5 py-2 text-sm font-bold text-ink transition hover:border-ink/40">
                    Ouvrir
                  </Link>
                  {!notification.readAt ? (
                    <form action={markNotificationReadAction}>
                      <input type="hidden" name="notificationId" value={notification.id} />
                      <button type="submit" className="rounded-full px-3.5 py-2 text-sm font-semibold text-amber-deep transition hover:bg-ink/5">
                        Marquer comme lu
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
