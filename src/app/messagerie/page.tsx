import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Avatar, EmptyState } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getConversationsForUser, getMessagesForConversation, getProjectById, getStore } from "@/lib/demo-store";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

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
        <section aria-label="Conversations" className="panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
            <div className="min-w-0">
              <p className="eyebrow">Fils de discussion</p>
              <p className="mt-1 text-sm text-muted">
                <span className="tnum text-ink-soft">{conversations.length}</span> conversation
                {conversations.length > 1 ? "s" : ""}
              </p>
            </div>
            <span className="chip">Triées par dernier message</span>
          </div>
          <ul className="divide-y divide-line">
            {conversations.map((conversation) => {
              const project = getProjectById(conversation.projectId);
              const otherId = conversation.clientId === user.id ? conversation.freelanceId : conversation.clientId;
              const other = getStore().users.find((item) => item.id === otherId);
              const messages = getMessagesForConversation(conversation.id);
              const last = messages[messages.length - 1];
              const unread = messages.filter((message) => message.senderId !== user.id && !message.readAt).length;

              return (
                <li key={conversation.id}>
                  <Link
                    href={`/messagerie/${conversation.id}`}
                    className="flex min-h-[92px] items-start gap-3 px-4 py-4 transition hover:bg-raised/60 focus-visible:bg-raised sm:gap-4 sm:px-5"
                  >
                    <Avatar name={other?.name ?? "Membre"} className="hidden sm:inline-flex" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="min-w-0 truncate text-[15px] font-bold text-ink">
                          {other?.name ?? "Membre Taf Africa"}
                        </p>
                        <time className="tnum shrink-0 text-xs text-muted" dateTime={conversation.lastMessageAt}>
                          {formatDateTime(conversation.lastMessageAt)}
                        </time>
                      </div>
                      <p className="mt-1 truncate text-sm font-semibold text-teal">
                        {project?.title ?? "Projet"}
                      </p>
                      <p className="mt-1 truncate text-sm leading-relaxed text-ink-soft">
                        {last?.body ?? "Aucun message"}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "chip",
                            unread > 0 ? "border-clay/40 text-clay" : "text-muted",
                          )}
                        >
                          {unread > 0 ? "Non lu" : "Lu"}
                        </span>
                        {unread > 0 ? (
                          <span className="chip tnum border-clay/40 bg-clay/10 text-clay">
                            {unread} message{unread > 1 ? "s" : ""} non lu{unread > 1 ? "s" : ""}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span aria-hidden="true" className="mt-1 shrink-0 text-teal">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </DashboardShell>
  );
}
