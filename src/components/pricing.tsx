import Link from "next/link";
import { Check } from "@/components/icons";
import { plans, pricingNote } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section
      id="tarifs"
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="max-w-2xl">
        <h2 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
          Des tarifs clairs, côté freelance
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Publier un besoin et consulter le marché est gratuit. Côté freelance,
          les candidatures se débloquent par crédits ou abonnement.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "flex flex-col rounded-2xl border bg-surface p-6",
              plan.featured
                ? "border-amber-deep shadow-lift"
                : "border-line shadow-soft",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
              {plan.featured && (
                <span className="rounded-full bg-amber-soft px-2.5 py-1 text-[11px] font-bold text-amber-deep">
                  Populaire
                </span>
              )}
            </div>

            <p className="tnum mt-4 text-3xl font-extrabold tracking-tight text-ink">
              {plan.price}
            </p>
            <p className="mt-1 text-sm text-muted">{plan.period}</p>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {plan.description}
            </p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-amber-deep" />
                  <span className="text-ink-soft">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/inscription?role=freelance"
              className={cn(
                "mt-6 inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-bold transition",
                plan.featured
                  ? "bg-amber-strong text-paper hover:bg-amber-strong-hover"
                  : "border border-line-strong text-ink hover:border-ink",
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
    </section>
  );
}
