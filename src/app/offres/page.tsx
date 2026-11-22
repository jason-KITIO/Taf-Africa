import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { acceptQuoteAction, markQuoteStudiedAction } from "@/app/actions/quotes";
import { Avatar, Card, EmptyState, StatusPill } from "@/components/ui";
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
            <Link href="/projets" className="text-sm font-bold text-amber-deep hover:underline">
              Voir les projets disponibles
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
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

            return (
              <Card key={quote.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill tone={quote.status === "accepted" ? "success" : quote.status === "studied" ? "info" : "warning"}>
                        {quote.status === "studied" ? "Offre étudiée" : quote.status}
                      </StatusPill>
                      <StatusPill tone={quote.type === "premium" ? "warning" : "neutral"}>
                        {quote.type === "premium" ? "Premium · 15 crédits" : "Simple · 1 crédit"}
                      </StatusPill>
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-ink">
                      {project?.title ?? "Projet"}
                    </h2>
                    <p className="mt-1 text-sm text-muted">Envoyée le {formatDate(quote.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="tnum text-lg font-extrabold text-ink">
                      {formatMoney(quote.price, quote.currency)}
                    </p>
                    <p className="text-sm text-muted">{quote.deliveryDays} jours</p>
                  </div>
                </div>

                <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-sm leading-relaxed text-ink-soft">
                  {quote.message}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.role === "client" ? freelancerUser?.name ?? "Freelance" : clientUser?.name ?? "Client"} />
                    <div>
                      <p className="text-sm font-bold text-ink">
                        {user.role === "client"
                          ? freelancerUser?.name ?? "Freelance"
                          : revealClient
                            ? clientUser?.name ?? "Client"
                            : "Client masqué"}
                      </p>
                      <p className="text-xs text-muted">
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
                      <span className="text-xs font-semibold text-sky-700">
                        Lue par le client le {formatDate(quote.studiedAt)}
                      </span>
                    ) : null}
                    {conversation ? (
                      <Link
                        href={`/messagerie/${conversation.id}`}
                        className="rounded-full border border-line-strong px-4 py-2 text-sm font-bold text-ink transition hover:border-ink/40"
                      >
                        Ouvrir le chat
                      </Link>
                    ) : null}
                    {user.role === "client" && quote.status === "sent" ? (
                      <form action={markQuoteStudiedAction}>
                        <input type="hidden" name="quoteId" value={quote.id} />
                        <button
                          type="submit"
                          className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-paper transition hover:bg-ink-soft"
                        >
                          Marquer comme étudiée
                        </button>
                      </form>
                    ) : null}
                    {user.role === "client" && project?.status === "open" && quote.status !== "rejected" ? (
                      <form action={acceptQuoteAction}>
                        <input type="hidden" name="quoteId" value={quote.id} />
                        <button
                          type="submit"
                          className="rounded-full bg-amber-strong px-4 py-2 text-sm font-bold text-paper transition hover:bg-amber-strong-hover"
                        >
                          Accepter l&apos;offre
                        </button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}
