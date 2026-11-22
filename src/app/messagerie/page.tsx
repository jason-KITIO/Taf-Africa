import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Avatar, Card, EmptyState } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getConversationsForUser, getMessagesForConversation, getProjectById, getStore } from "@/lib/demo-store";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function MessageriePage() {
  const user = await requireUser();
  const conversations = getConversationsForUser(user.id);

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/messagerie"
      title="Messagerie"
      description="Une conversation s'ouvre dès qu'une offre est envoyée. Les coordonnées directes y sont bloquées."
    >
      {conversations.length === 0 ? (
        <EmptyState
          title="Aucune conversation"
          description="Envoyez une offre ou recevez une proposition pour ouvrir un fil de discussion sécurisé."
        />
      ) : (
        <div className="space-y-3">
          {conversations.map((conversation) => {
            const project = getProjectById(conversation.projectId);
            const otherId = conversation.clientId === user.id ? conversation.freelanceId : conversation.clientId;
            const other = getStore().users.find((item) => item.id === otherId);
            const messages = getMessagesForConversation(conversation.id);
            const last = messages[messages.length - 1];
            const unread = messages.filter((message) => message.senderId !== user.id && !message.readAt).length;

            return (
              <Link key={conversation.id} href={`/messagerie/${conversation.id}`} className="block">
                <Card className="transition hover:border-line-strong hover:shadow-lift">
                  <div className="flex items-start gap-4">
                    <Avatar name={other?.name ?? "Membre"} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-bold text-ink">{other?.name ?? "Membre Taf Africa"}</p>
                        <p className="text-xs text-muted">{formatDateTime(conversation.lastMessageAt)}</p>
                      </div>
                      <p className="mt-1 truncate text-sm font-semibold text-ink-soft">{project?.title ?? "Projet"}</p>
                      <p className="mt-1 truncate text-sm text-muted">{last?.body ?? "Aucun message"}</p>
                    </div>
                    {unread > 0 ? (
                      <span className="tnum inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-strong text-xs font-bold text-paper">
                        {unread}
                      </span>
                    ) : null}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}
