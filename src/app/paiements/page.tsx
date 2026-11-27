import { DashboardShell } from "@/components/dashboard-shell";
import { FundEscrowForm, ReleaseEscrowForm } from "@/components/v2-forms";
import { Card, EmptyState, SectionHeading, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getEscrowsForUser, getStore } from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

const escrowStatus: Record<string, { label: string; tone: StatusTone }> = {
  funded: { label: "Fonds séquestrés", tone: "warning" },
  released: { label: "Fonds libérés", tone: "success" },
  refunded: { label: "Remboursée", tone: "neutral" },
  disputed: { label: "En litige", tone: "danger" },
};

export default async function PaiementsPage() {
  const user = await requireUser();
  const data = getStore();
  const escrows = getEscrowsForUser(user.id);
  const pendingQuotes = user.role === "client"
    ? data.quotes.filter(
        (quote) =>
          quote.status === "accepted" &&
          !data.escrows.some((escrow) => escrow.quoteId === quote.id) &&
          data.projects.find((project) => project.id === quote.projectId)?.clientId === user.id,
      )
    : [];

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/paiements"
      title="Paiements sécurisés"
      description="Les fonds de la mission sont bloqués par Taf Africa puis libérés après validation. Commission de 4 %."
    >
      {pendingQuotes.length ? (
        <section className="space-y-4">
          <SectionHeading title="Missions à financer" description="Acceptez d'abord l'offre, puis sécurisez le paiement." />
          <Card>
            <div className="divide-y divide-line">
              {pendingQuotes.map((quote) => {
                const project = data.projects.find((item) => item.id === quote.projectId);
                return (
                  <div key={quote.id} className="min-w-0 py-4 first:pt-0 last:pb-0">
                    <h2 className="break-words text-base font-bold text-ink">{project?.title ?? "Mission"}</h2>
                    <p className="tnum mt-1 text-sm leading-relaxed text-muted">
                      Offre acceptée · {formatMoney(quote.price, quote.currency)} · commission {formatMoney(Math.round(quote.price * 0.04), quote.currency)}
                    </p>
                    <div className="mt-4">
                      <FundEscrowForm quote={quote} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>
      ) : null}

      <section className="mt-8 space-y-4">
        <SectionHeading title="Mes séquestrations" />
        {escrows.length === 0 ? (
          <EmptyState
            title="Aucun paiement séquestré"
            description="Les paiements de mission apparaîtront ici dès qu'une offre sera acceptée et financée."
          />
        ) : (
          <Card>
            <div className="divide-y divide-line">
              {escrows.map((escrow) => {
                const project = data.projects.find((item) => item.id === escrow.projectId);
                const otherId = user.id === escrow.clientId ? escrow.freelanceId : escrow.clientId;
                const other = data.users.find((item) => item.id === otherId);
                const status = escrowStatus[escrow.status] ?? { label: "Séquestration", tone: "neutral" as StatusTone };
                return (
                  <article key={escrow.id} className="min-w-0 py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h2 className="break-words text-base font-bold text-ink">{project?.title ?? "Mission"}</h2>
                        <p className="mt-1 break-words text-sm text-muted">
                          {user.role === "client" ? "Freelance" : "Client"} : {other?.name ?? "Membre"} ·{" "}
                          <span className="tnum">{formatDate(escrow.createdAt)}</span>
                        </p>
                      </div>
                      <StatusPill tone={status.tone}>{status.label}</StatusPill>
                    </div>
                    <div className="mt-4 grid gap-4 border-t border-line pt-4 text-sm sm:grid-cols-3">
                      <div className="min-w-0">
                        <p className="text-xs text-muted">Montant</p>
                        <p className="tnum mt-1 font-bold text-ink">{formatMoney(escrow.amount, escrow.currency)}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-clay">Commission · 4 %</p>
                        <p className="tnum mt-1 font-bold text-ink">{formatMoney(escrow.platformFee, escrow.currency)}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted">Versement</p>
                        <p className="tnum mt-1 font-bold text-ink">{formatMoney(escrow.payout, escrow.currency)}</p>
                      </div>
                    </div>
                    {user.role === "client" && escrow.status === "funded" ? (
                      <div className="mt-4">
                        <ReleaseEscrowForm escrowId={escrow.id} />
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </Card>
        )}
      </section>
    </DashboardShell>
  );
}
