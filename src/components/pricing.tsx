import Link from "next/link";
import { Check } from "@/components/icons";
import { plans, pricingNote } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="tarifs" className="section-rule">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Tarifs</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
            Des tarifs clairs, côté freelance
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Publier un besoin et consulter le marché est gratuit. Côté freelance,
            les candidatures se débloquent par crédits ou abonnement.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "flex flex-col bg-panel p-6",
                plan.featured && "bg-lime-soft/40",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">{plan.featured ? "Recommandé" : "Plan"}</p>
                  <h3 className="mt-3 text-lg font-bold text-ink">{plan.name}</h3>
                </div>
                {plan.featured ? (
                  <span className="chip chip-solid border border-lime/30 text-lime">
                    Populaire
                  </span>
                ) : null}
              </div>

              <p className="tnum mt-6 text-3xl font-extrabold tracking-tight text-ink">
                {plan.price}
              </p>
              <p className="mt-1 text-sm text-muted">{plan.period}</p>

              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {plan.description}
              </p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal" />
                    <span className="text-ink-soft">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/inscription?role=freelance"
                className={cn(
                  "action mt-6 w-full",
                  plan.featured ? "action-primary" : "action-secondary",
                )}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          {pricingNote}
        </p>
      </div>
    </section>
  );
}
