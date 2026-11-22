import { DashboardShell } from "@/components/dashboard-shell";
import { SubscribeForm } from "@/components/forms";
import { cancelSubscriptionAction } from "@/app/actions/billing";
import { Card, Stat, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getCreditBalance, getCreditEntries, getPlans, getSubscription, getUserPlan } from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AbonnementsPage() {
  const user = await requireUser();
  const plans = getPlans();
  const currentPlan = getUserPlan(user.id);
  const subscription = getSubscription(user.id);
  const credits = getCreditBalance(user.id);
  const entries = getCreditEntries(user.id);

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/abonnements"
      title="Abonnement et crédits"
      description="Des crédits renouvelés tous les 30 jours. Une offre simple coûte 1 crédit, une offre premium 15."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Formule actuelle" value={currentPlan.name} />
        <Stat label="Crédits disponibles" value={credits} />
        <Stat label="Renouvellement" value={subscription ? formatDate(subscription.currentPeriodEnd) : "—"} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <h2 className="text-lg font-bold text-ink">Choisir une formule</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {plans.map((plan) => (
              <Card key={plan.code} className={plan.isFeatured ? "border-amber-strong" : ""}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-extrabold text-ink">{plan.name}</h3>
                  {plan.code === currentPlan.code ? <StatusPill tone="success">Actuelle</StatusPill> : null}
                  {plan.isFeatured ? <StatusPill tone="warning">Populaire</StatusPill> : null}
                </div>
                <p className="tnum mt-3 text-2xl font-extrabold text-ink">
                  {plan.priceXaf === 0 ? "Gratuit" : formatMoney(plan.priceXaf, "XAF")}
                  <span className="ml-1 text-sm font-medium text-muted">/ 30 jours</span>
                </p>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-amber-deep">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-bold text-ink">Activer une formule</h2>
            <p className="mt-2 text-sm text-muted">Paiement simulé en mode démonstration, facture générée immédiatement.</p>
            <div className="mt-4">
              <SubscribeForm plans={plans} />
            </div>
            {subscription && currentPlan.code !== "free" && !subscription.cancelAtPeriodEnd ? (
              <form action={cancelSubscriptionAction} className="mt-4 border-t border-line pt-4">
                <button type="submit" className="text-sm font-semibold text-red-700 hover:underline">
                  Résilier à la fin de la période
                </button>
              </form>
            ) : null}
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-ink">Journal des crédits</h2>
            <div className="mt-3 divide-y divide-line">
              {entries.slice(0, 8).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <div>
                    <p className="font-semibold text-ink">{entry.note}</p>
                    <p className="text-xs text-muted">{formatDate(entry.createdAt)}</p>
                  </div>
                  <span className={`tnum font-bold ${entry.delta > 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {entry.delta > 0 ? "+" : ""}{entry.delta}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
