import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageForm } from "@/components/forms";
import { DashboardShell } from "@/components/dashboard-shell";
import { Avatar, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import {
  getConversationById,
  getMessagesForConversation,
  getProjectById,
  getStore,
  markConversationRead,
} from "@/lib/demo-store";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const conversation = getConversationById(id);
  if (!conversation || (conversation.clientId !== user.id && conversation.freelanceId !== user.id)) {
    notFound();
  }
  markConversationRead(user.id, conversation.id);
  const project = getProjectById(conversation.projectId);
  const messages = getMessagesForConversation(conversation.id);
  const otherId = conversation.clientId === user.id ? conversation.freelanceId : conversation.clientId;
  const other = getStore().users.find((item) => item.id === otherId);

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/messagerie"
      title={other?.name ?? "Conversation"}
      description={project?.title ?? "Projet"}
    >
      <div className="space-y-4">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
          <Link
            href="/messagerie"
            className="action action-quiet min-h-11 px-2 text-sm text-muted hover:text-lime"
          >
            ← Toutes les conversations
          </Link>
          {project ? (
            <Link
              href={`/projets/${project.slug}`}
              className="chip min-h-11 border-line-strong px-3 text-ink-soft hover:border-teal hover:text-teal"
            >
              Voir le projet
            </Link>
          ) : null}
        </nav>

        <section aria-label={`Conversation avec ${other?.name ?? "Membre Taf Africa"}`} className="panel overflow-hidden">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar name={other?.name ?? "Membre"} />
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-ink">{other?.name ?? "Membre Taf Africa"}</p>
                <p className="truncate text-sm text-muted">{project?.title ?? "Projet"}</p>
              </div>
            </div>
            <span className="eyebrow">Conversation</span>
          </header>

          <div className="bg-matter/40 px-4 py-5 sm:px-6" aria-label="Messages">
            <div className="space-y-5">
              {messages.length === 0 ? (
                <p className="text-sm text-muted">Aucun message pour le moment.</p>
              ) : (
                messages.map((message) => {
                  const mine = message.senderId === user.id;
                  const sender = getStore().users.find((item) => item.id === message.senderId);
                  return (
                    <article
                      key={message.id}
                      className={cn("flex w-full gap-3", mine ? "justify-end" : "justify-start")}
                    >
                      {!mine ? <Avatar name={sender?.name ?? "Membre"} className="size-8" /> : null}
                      <div className={cn("min-w-0 max-w-[85%] sm:max-w-[70%]")}>
                        <div
                          className={cn(
                            "mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px] font-bold uppercase tracking-[0.12em]",
                            mine ? "justify-end text-teal" : "text-muted",
                          )}
                        >
                          <span>{mine ? "Vous" : (sender?.name ?? "Membre")}</span>
                          <time className="tnum font-semibold normal-case tracking-normal" dateTime={message.createdAt}>
                            {formatDateTime(message.createdAt)}
                          </time>
                        </div>
                        <div
                          className={cn(
                            "break-words rounded-2xl border px-4 py-3 text-sm leading-relaxed text-ink",
                            mine ? "border-teal/30 bg-teal/10" : "border-line bg-panel",
                          )}
                        >
                          <p className="whitespace-pre-wrap break-words">{message.body}</p>
                          {message.containsContact ? (
                            <p className="mt-2 border-t border-line pt-2 text-[11px] font-semibold text-clay">
                              coordonnées détectées
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          <div className="section-rule panel-quiet rounded-b-2xl px-4 py-4 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusPill tone="info">Messagerie sécurisée</StatusPill>
              <p className="max-w-xl text-xs leading-relaxed text-muted">
                Pour protéger la communauté, les e-mails, numéros de téléphone et liens WhatsApp sont bloqués dans les messages.
              </p>
            </div>
            <div className="mt-4">
              <MessageForm conversationId={conversation.id} />
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
