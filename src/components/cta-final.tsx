import Link from "next/link";
import { ArrowRight, Briefcase, Users } from "@/components/icons";

const sides = [
  {
    icon: Users,
    title: "Vous avez un besoin",
    copy: "Publiez votre besoin gratuitement et recevez des offres clairement tarifées, sans échange de coordonnées hors plateforme.",
    cta: "Publier un besoin",
    href: "/projets/nouveau",
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
    <section className="section-rule">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="border border-line bg-panel p-6 sm:p-10">
          <p className="eyebrow">Commencer</p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
            Rejoignez le marché du travail freelance africain
          </h2>

          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {sides.map(({ icon: Icon, title, copy, cta, href, primary }) => (
              <div key={title} className="flex flex-col bg-matter p-6">
                <span className="grid size-10 place-items-center border border-line bg-panel text-teal">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">
                  {copy}
                </p>
                <Link
                  href={href}
                  className={
                    primary
                      ? "action action-primary mt-6 w-full sm:w-fit"
                      : "action action-secondary mt-6 w-full sm:w-fit"
                  }
                >
                  {cta}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
