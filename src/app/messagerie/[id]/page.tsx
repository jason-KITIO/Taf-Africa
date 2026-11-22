import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageForm } from "@/components/forms";
import { DashboardShell } from "@/components/dashboard-shell";
import { Avatar, Card, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import {
  getConversationById,
  getMessagesForConversation,
  getProjectById,
  getStore,
  markConversationRead,
} from "@/lib/demo-store";
import { formatDateTime } from "@/lib/format";

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
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link href="/messagerie" className="text-sm font-semibold text-muted hover:text-amber-deep">
          ← Toutes les conversations
        </Link>
        {project ? (
          <Link href={`/projets/${project.slug}`} className="text-sm font-bold text-amber-deep hover:underline">
            Voir le projet
          </Link>
        ) : null}
      </div>

      <Card className="p-4 sm:p-5">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-sm text-muted">Aucun message pour le moment.</p>
          ) : (
            messages.map((message) => {
              const mine = message.senderId === user.id;
              const sender = getStore().users.find((item) => item.id === message.senderId);
              return (
                <div key={message.id} className={`flex gap-3 ${mine ? "justify-end" : "justify-start"}`}>
                  {!mine ? <Avatar name={sender?.name ?? "Membre"} className="size-8" /> : null}
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${mine ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
                    <p className="text-sm leading-relaxed">{message.body}</p>
                    <p className={`mt-2 text-[11px] ${mine ? "text-paper/60" : "text-muted"}`}>
                      {formatDateTime(message.createdAt)}
                      {message.containsContact ? " · coordonnées détectées" : ""}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6 border-t border-line pt-5">
          <StatusPill tone="info">Messagerie sécurisée</StatusPill>
          <p className="mt-2 text-xs text-muted">
            Pour protéger la communauté, les e-mails, numéros de téléphone et liens WhatsApp sont bloqués dans les messages.
          </p>
          <div className="mt-4">
            <MessageForm conversationId={conversation.id} />
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
