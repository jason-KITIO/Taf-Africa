import { DashboardShell } from "@/components/dashboard-shell";
import { FundEscrowForm, ReleaseEscrowForm } from "@/components/v2-forms";
import { Card, EmptyState, SectionHeading, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getEscrowsForUser, getStore } from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

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
        <section>
          <SectionHeading title="Missions à financer" description="Acceptez d'abord l'offre, puis sécurisez le paiement." />
          <div className="mt-4 space-y-3">
            {pendingQuotes.map((quote) => {
              const project = data.projects.find((item) => item.id === quote.projectId);
              return (
                <Card key={quote.id}>
                  <p className="font-bold text-ink">{project?.title ?? "Mission"}</p>
                  <p className="mt-1 text-sm text-muted">
                    Offre acceptée · {formatMoney(quote.price, quote.currency)} · commission {formatMoney(Math.round(quote.price * 0.04), quote.currency)}
                  </p>
                  <div className="mt-4 max-w-sm">
                    <FundEscrowForm quote={quote} />
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className={pendingQuotes.length ? "mt-10" : ""}>
        <SectionHeading title="Mes séquestrations" />
        {escrows.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Aucun paiement séquestré"
              description="Les paiements de mission apparaîtront ici dès qu'une offre sera acceptée et financée."
            />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {escrows.map((escrow) => {
              const project = data.projects.find((item) => item.id === escrow.projectId);
              const otherId = user.id === escrow.clientId ? escrow.freelanceId : escrow.clientId;
              const other = data.users.find((item) => item.id === otherId);
              const tone = escrow.status === "released" ? "success" : escrow.status === "disputed" ? "danger" : escrow.status === "refunded" ? "neutral" : "warning";
              return (
                <Card key={escrow.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-ink">{project?.title ?? "Mission"}</p>
                      <p className="mt-1 text-sm text-muted">
                        {user.role === "client" ? "Freelance" : "Client"} : {other?.name ?? "Membre"} · {formatDate(escrow.createdAt)}
                      </p>
                    </div>
                    <StatusPill tone={tone}>{escrow.status}</StatusPill>
                  </div>
                  <div className="mt-4 grid gap-2 border-t border-line pt-4 text-sm sm:grid-cols-3">
                    <p className="text-muted">Montant <strong className="tnum text-ink">{formatMoney(escrow.amount, escrow.currency)}</strong></p>
                    <p className="text-muted">Commission <strong className="tnum text-ink">{formatMoney(escrow.platformFee, escrow.currency)}</strong></p>
                    <p className="text-muted">Versement <strong className="tnum text-ink">{formatMoney(escrow.payout, escrow.currency)}</strong></p>
                  </div>
                  {user.role === "client" && escrow.status === "funded" ? (
                    <div className="mt-4">
                      <ReleaseEscrowForm escrowId={escrow.id} />
                    </div>
                  ) : null}
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
