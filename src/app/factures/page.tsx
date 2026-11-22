import { DashboardShell } from "@/components/dashboard-shell";
import { Card, EmptyState, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getInvoicesForUser, getPaymentsForUser } from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

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
        <div>
          <h2 className="text-lg font-bold text-ink">Factures</h2>
          {invoices.length === 0 ? (
            <div className="mt-4">
              <EmptyState title="Aucune facture" description="Activez une formule pour générer votre première facture." />
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="tnum font-bold text-ink">{invoice.number}</p>
                    <p className="mt-1 text-sm text-muted">Émise le {formatDate(invoice.issuedAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="tnum font-extrabold text-ink">{formatMoney(invoice.amount, invoice.currency)}</p>
                    <p className="text-xs text-muted">PDF disponible après connexion opérateur</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold text-ink">Paiements</h2>
          <div className="mt-4 space-y-3">
            {payments.length === 0 ? (
              <Card>
                <p className="text-sm text-muted">Aucun paiement enregistré.</p>
              </Card>
            ) : (
              payments.map((payment) => (
                <Card key={payment.id}>
                  <div className="flex items-center justify-between gap-3">
                    <StatusPill tone={payment.status === "succeeded" ? "success" : "warning"}>
                      {payment.status}
                    </StatusPill>
                    <p className="tnum font-bold text-ink">{formatMoney(payment.amount, payment.currency)}</p>
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    {payment.provider.replace("_", " ")} · {formatDate(payment.createdAt)}
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
