import Link from "next/link";
import { ArrowRight, Briefcase, Users } from "@/components/icons";

const sides = [
  {
    icon: Users,
    title: "Vous avez un besoin",
    copy: "Publiez votre projet gratuitement et recevez jusqu'à 10 propositions qualifiées.",
    cta: "Publier un besoin",
    href: "#",
    primary: true,
  },
  {
    icon: Briefcase,
    title: "Vous cherchez du travail",
    copy: "Créez votre profil, consultez les missions et candidatez avec des crédits ou un abonnement.",
    cta: "Parcourir les projets",
    href: "/projets",
    primary: false,
  },
];

export function CtaFinal() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-ink px-6 py-12 sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-amber/20 blur-3xl"
        />
        <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl">
          Rejoignez le marché du travail freelance africain
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {sides.map(({ icon: Icon, title, copy, cta, href, primary }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-amber">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-paper">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/70">
                {copy}
              </p>
              <Link
                href={href}
                className={
                  primary
                    ? "mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-amber px-5 py-3 text-sm font-bold text-ink transition hover:bg-amber-soft"
                    : "mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-paper transition hover:border-white/60"
                }
              >
                {cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
