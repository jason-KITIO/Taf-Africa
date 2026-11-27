import { DashboardShell } from "@/components/dashboard-shell";
import { SubscribeForm } from "@/components/forms";
import { cancelSubscriptionAction } from "@/app/actions/billing";
import { Card, SectionHeading, Stat, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getCreditBalance, getCreditEntries, getPlans, getSubscription, getUserPlan } from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AbonnementsPage() {
  const user = await requireUser();
  if (user.role !== "freelance") redirect("/tableau-de-bord");

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
      <Card>
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3">
          <Stat label="Formule actuelle" value={currentPlan.name} />
          <Stat label="Crédits disponibles" value={<span className="tnum">{credits}</span>} />
          <Stat
            label="Renouvellement"
            value={<span className="tnum text-2xl sm:text-3xl">{subscription ? formatDate(subscription.currentPeriodEnd) : "—"}</span>}
          />
        </div>
      </Card>

      <section className="mt-8 space-y-4">
        <SectionHeading title="Choisir une formule" description="Trois paliers renouvelés tous les 30 jours." />
        <Card>
          <div className="grid gap-y-6 sm:grid-cols-3 sm:gap-x-6">
            {plans.map((plan) => (
              <div
                key={plan.code}
                className={`min-w-0 border-t border-line pt-6 first:border-t-0 first:pt-0 sm:border-l sm:border-t-0 sm:pt-0 sm:pl-6 sm:first:border-l-0 sm:first:pl-0 ${plan.isFeatured ? "sm:border-l-teal" : ""}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold tracking-[-0.02em] text-ink">{plan.name}</h2>
                  {plan.code === currentPlan.code ? <StatusPill tone="success">Actuelle</StatusPill> : null}
                  {plan.isFeatured ? <StatusPill tone="warning">Populaire</StatusPill> : null}
                </div>
                <p className="tnum mt-4 text-2xl font-extrabold tracking-[-0.03em] text-ink">
                  {formatMoney(plan.priceXaf, "XAF")}
                  <span className="ml-1 text-sm font-medium text-muted">/ 30 jours</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{plan.description}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="shrink-0 text-teal">—</span>
                      <span className="min-w-0 break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionHeading title="Activer une formule" description="Paiement simulé en mode démonstration, facture générée immédiatement." />
          <div className="section-rule mt-4 pt-4">
            <SubscribeForm plans={plans} />
            {subscription && currentPlan.code !== "none" && !subscription.cancelAtPeriodEnd ? (
              <form action={cancelSubscriptionAction} className="mt-4 border-t border-line pt-4">
                <button type="submit" className="action action-quiet text-danger hover:text-danger">
                  Résilier à la fin de la période
                </button>
              </form>
            ) : null}
          </div>
        </Card>

        <Card>
          <SectionHeading title="Journal de crédit" description="Entrées et dépenses de votre solde." />
          <div className="section-rule mt-4 pt-2">
            {entries.length ? (
              <div className="divide-y divide-line">
                {entries.slice(0, 8).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 text-sm">
                    <div className="min-w-0">
                      <p className="break-words font-semibold text-ink">{entry.note}</p>
                      <p className="tnum mt-0.5 text-xs text-muted">{formatDate(entry.createdAt)}</p>
                    </div>
                    <span className={`tnum shrink-0 font-bold ${entry.delta > 0 ? "text-success" : "text-danger"}`}>
                      {entry.delta > 0 ? "+" : ""}{entry.delta}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-sm text-muted">Aucun mouvement de crédit pour le moment.</p>
            )}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
