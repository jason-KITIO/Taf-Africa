import { DashboardShell } from "@/components/dashboard-shell";
import { Card, EmptyState, SectionHeading, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getInvoicesForUser, getPaymentsForUser } from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

const paymentStatus: Record<string, { label: string; tone: StatusTone }> = {
  pending: { label: "En attente", tone: "warning" },
  succeeded: { label: "Payé", tone: "success" },
  failed: { label: "Échec du paiement", tone: "danger" },
  refunded: { label: "Remboursé", tone: "neutral" },
};

const providerLabel: Record<string, string> = {
  orange_money: "Orange Money",
  mtn_momo: "MTN MoMo",
  wave: "Wave",
  moov_money: "Moov Money",
  card: "Carte bancaire",
};

export default async function FacturesPage() {
  const user = await requireUser();
  const invoices = getInvoicesForUser(user.id);
  const payments = getPaymentsForUser(user.id);

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/factures"
      title="Factures et paiements"
      description="Chaque abonnement donne lieu à une facture, même en mode démonstration."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0 space-y-4">
          <SectionHeading title="Factures" description="Une facture par abonnement activé." />
          {invoices.length === 0 ? (
            <EmptyState title="Aucune facture" description="Activez une formule pour générer votre première facture." />
          ) : (
            <Card>
              <div className="divide-y divide-line">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="min-w-0">
                      <p className="tnum font-bold text-ink">{invoice.number}</p>
                      <p className="tnum mt-1 text-sm text-muted">Émise le {formatDate(invoice.issuedAt)}</p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="tnum font-extrabold text-ink">{formatMoney(invoice.amount, invoice.currency)}</p>
                      <p className="mt-1 text-xs text-muted">PDF disponible après connexion opérateur</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </section>

        <section className="min-w-0 space-y-4">
          <SectionHeading title="Paiements" description="Statut et moyen de paiement de chaque opération." />
          {payments.length === 0 ? (
            <Card>
              <p className="text-sm text-muted">Aucun paiement enregistré.</p>
            </Card>
          ) : (
            <Card>
              <div className="divide-y divide-line">
                {payments.map((payment) => {
                  const status = paymentStatus[payment.status] ?? { label: "Paiement", tone: "neutral" as StatusTone };
                  return (
                    <div key={payment.id} className="min-w-0 py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <StatusPill tone={status.tone}>{status.label}</StatusPill>
                        <p className="tnum font-bold text-ink">{formatMoney(payment.amount, payment.currency)}</p>
                      </div>
                      <p className="mt-3 break-words text-sm text-muted">
                        {providerLabel[payment.provider] ?? payment.provider.replace("_", " ")} ·{" "}
                        <span className="tnum">{formatDate(payment.createdAt)}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
