import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { acceptQuoteAction, markQuoteStudiedAction } from "@/app/actions/quotes";
import { Avatar, ButtonLink, Card, EmptyState, SectionHeading, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import {
  getClientProfile,
  getFreelanceProfile,
  getProjectById,
  getQuotesForClient,
  getQuotesForFreelance,
  getStore,
  getUserPlan,
} from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

const quoteStatus: Record<string, { label: string; tone: StatusTone }> = {
  sent: { label: "Offre envoyée", tone: "neutral" },
  studied: { label: "Offre étudiée", tone: "info" },
  accepted: { label: "Offre acceptée", tone: "success" },
  rejected: { label: "Offre refusée", tone: "danger" },
  withdrawn: { label: "Offre retirée", tone: "neutral" },
};

export default async function OffresPage() {
  const user = await requireUser();
  const quotes = user.role === "client" ? getQuotesForClient(user.id) : getQuotesForFreelance(user.id);

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/offres"
      title={user.role === "client" ? "Offres reçues" : "Mes offres"}
      description={
        user.role === "client"
          ? "Étudiez chaque proposition. Le freelance voit quand son offre a été lue."
          : "Suivez vos offres simples et premium, et les réponses des clients."
      }
    >
      {quotes.length === 0 ? (
        <EmptyState
          title="Aucune offre pour le moment"
          description="Quand une proposition sera envoyée, elle apparaîtra ici avec son statut et ses détails."
          action={
            <ButtonLink href="/projets" variant="secondary">
              Voir les projets disponibles
            </ButtonLink>
          }
        />
      ) : (
        <section className="space-y-4">
          <SectionHeading
            title="Détail des offres"
            description={user.role === "client" ? "Une lecture peut être signalée au freelance." : "Statut et visibilité du client par offre."}
          />
          <Card>
            <div className="divide-y divide-line">
              {quotes.map((quote) => {
                const project = getProjectById(quote.projectId);
                const freelance = getFreelanceProfile(quote.freelanceId);
                const freelancerUser = getStore().users.find((item) => item.id === quote.freelanceId);
                const clientUser = project ? getStore().users.find((item) => item.id === project.clientId) : undefined;
                const clientProfile = project ? getClientProfile(project.clientId) : undefined;
                const revealClient = project ? getUserPlan(project.clientId).canSeeClient : false;
                const conversation = getStore().conversations.find(
                  (item) => item.projectId === quote.projectId && item.freelanceId === quote.freelanceId,
                );
                const status = quoteStatus[quote.status] ?? { label: "Offre", tone: "neutral" as StatusTone };

                return (
                  <article key={quote.id} className="min-w-0 py-5 first:pt-0 last:pb-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusPill tone={status.tone}>{status.label}</StatusPill>
                          <span className="tnum">
                            <StatusPill tone={quote.type === "premium" ? "warning" : "neutral"}>
                              {quote.type === "premium" ? "Premium · 15 crédits" : "Simple · 1 crédit"}
                            </StatusPill>
                          </span>
                        </div>
                        <h2 className="mt-3 break-words text-lg font-bold tracking-[-0.02em] text-ink">
                          {project?.title ?? "Projet"}
                        </h2>
                        <p className="tnum mt-1 text-xs text-muted">Envoyée le {formatDate(quote.createdAt)}</p>
                      </div>
                      <div className="shrink-0 sm:text-right">
                        <p className="tnum text-lg font-extrabold text-ink">
                          {formatMoney(quote.price, quote.currency)}
                        </p>
                        <p className="mt-2 sm:mt-1">
                          <span className="chip chip-solid tnum">{quote.deliveryDays} jours</span>
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 break-words rounded-xl border-l-2 border-teal bg-matter px-4 py-3 text-sm leading-relaxed text-ink-soft">
                      {quote.message}
                    </p>

                    <div className="mt-4 flex flex-col gap-4 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar name={user.role === "client" ? freelancerUser?.name ?? "Freelance" : clientUser?.name ?? "Client"} />
                        <div className="min-w-0">
                          <p className="break-words text-sm font-bold text-ink">
                            {user.role === "client"
                              ? freelancerUser?.name ?? "Freelance"
                              : revealClient
                                ? clientUser?.name ?? "Client"
                                : "Client masqué"}
                          </p>
                          <p className="mt-0.5 break-words text-xs text-muted">
                            {user.role === "client"
                              ? freelance?.title || "Freelance Taf Africa"
                              : revealClient
                                ? clientProfile?.companyName || "Client Taf Africa"
                                : "Abonnement requis pour voir le client"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {quote.studiedAt ? (
                          <StatusPill tone="info">
                            <span className="tnum">Lue par le client le {formatDate(quote.studiedAt)}</span>
                          </StatusPill>
                        ) : null}
                        {conversation ? (
                          <Link href={`/messagerie/${conversation.id}`} className="action action-secondary">
                            Ouvrir le chat
                          </Link>
                        ) : null}
                        {user.role === "client" && quote.status === "sent" ? (
                          <form action={markQuoteStudiedAction}>
                            <input type="hidden" name="quoteId" value={quote.id} />
                            <button type="submit" className="action action-secondary">
                              Marquer comme étudiée
                            </button>
                          </form>
                        ) : null}
                        {user.role === "client" && project?.status === "open" && quote.status !== "rejected" ? (
                          <form action={acceptQuoteAction}>
                            <input type="hidden" name="quoteId" value={quote.id} />
                            <button
                              type="submit"
                              className="action action-secondary border-teal/50 text-teal hover:border-teal hover:text-lime"
                            >
                              Accepter l&apos;offre
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </Card>
        </section>
      )}
    </DashboardShell>
  );
}
