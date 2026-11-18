import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectList } from "@/components/project-list";
import { ArrowRight, Briefcase, Users } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tous les projets",
  description:
    "Parcourez les projets freelance ouverts en Afrique francophone : développement, design, marketing, data et plus. Consulter est gratuit.",
};

const entryPoints = [
  {
    icon: Users,
    title: "Vous recrutez ?",
    copy: "Publiez votre projet gratuitement et recevez jusqu'à 10 propositions qualifiées.",
    cta: "Publier un projet",
    primary: true,
  },
  {
    icon: Briefcase,
    title: "Vous êtes freelance ?",
    copy: "Créez votre profil, consultez les missions et candidatez avec des crédits ou un abonnement.",
    cta: "Créer mon profil",
    primary: false,
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-line bg-sand">
          <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
              Tous les projets
              <span className="text-amber-deep">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Consulter une mission, son budget et son délai est gratuit.
              Candidater se débloque avec un crédit ou un abonnement.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {entryPoints.map(
                ({ icon: Icon, title, copy, cta, primary }) => (
                  <div
                    key={title}
                    className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft sm:flex-row sm:items-center sm:gap-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-soft text-amber-deep">
                      <Icon className="size-5" />
                    </span>
                    <div className="mt-4 flex-1 sm:mt-0">
                      <h2 className="text-base font-bold text-ink">{title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {copy}
                      </p>
                    </div>
                    <a
                      href="#"
                      className={
                        primary
                          ? "mt-4 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-amber-strong px-4 py-2.5 text-sm font-bold text-paper transition hover:bg-amber-strong-hover sm:mt-0"
                          : "mt-4 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-line-strong px-4 py-2.5 text-sm font-bold text-ink transition hover:border-ink sm:mt-0"
                      }
                    >
                      {cta}
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <ProjectList />
          <p className="mt-10 rounded-2xl border border-dashed border-line-strong bg-surface px-5 py-4 text-center text-sm text-muted">
            Projets de démonstration — données authored, à remplacer par de
            vraies missions une fois le produit en ligne.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
