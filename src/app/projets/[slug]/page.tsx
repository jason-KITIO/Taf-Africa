import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MissionCard } from "@/components/mission-card";
import { Monogram } from "@/components/monogram";
import {
  ArrowRight,
  Check,
  Clock,
  Eye,
  Lock,
  Users,
} from "@/components/icons";
import { getMission, missions } from "@/lib/content";

export function generateStaticParams() {
  return missions.map((mission) => ({ slug: mission.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const mission = getMission(slug);
  if (!mission) return { title: "Projet introuvable" };
  return { title: mission.title, description: mission.excerpt };
}

export default async function MissionPage({
  params,
}: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const mission = getMission(slug);
  if (!mission) notFound();

  const ratio = Math.min(
    100,
    Math.round((mission.proposals / mission.cap) * 100),
  );
  const similar = missions
    .filter((m) => m.category === mission.category && m.slug !== mission.slug)
    .slice(0, 3);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
            <Link href="/projets" className="transition hover:text-amber-deep">
              Projets
            </Link>
            <span className="px-2 text-line-strong">/</span>
            <span className="font-medium text-ink-soft">{mission.category}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Ouvert
                </span>
                <span className="rounded-full border border-line px-2.5 py-1 text-muted">
                  {mission.category}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-muted">
                  <Clock className="size-3.5" />
                  Publié {mission.posted}
                </span>
              </div>

              <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-4xl">
                {mission.title}
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-muted">
                {mission.excerpt}
              </p>

              <section className="mt-10">
                <h2 className="text-lg font-bold text-ink">Le projet</h2>
                <ul className="mt-4 space-y-3">
                  {mission.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                      <Check className="mt-1 size-4 shrink-0 text-amber-deep" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-10">
                <h2 className="text-lg font-bold text-ink">
                  Compétences recherchées
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mission.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-lg font-bold text-ink">Candidatures</h2>
                <div className="mt-4 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                  <div className="flex -space-x-2">
                    {mission.applicants.map((initials) => (
                      <Monogram
                        key={initials}
                        initials={initials}
                        className="size-9"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    <span className="tnum font-bold text-ink">
                      {mission.proposals}
                    </span>{" "}
                    candidature{mission.proposals > 1 ? "s" : ""} déjà reçue
                    {mission.proposals > 1 ? "s" : ""} sur un maximum de{" "}
                    <span className="tnum font-bold text-ink">{mission.cap}</span>.
                    Les profils restent privés jusqu&apos;à l&apos;ouverture de
                    votre candidature.
                  </p>
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Budget indicatif
                </p>
                <p className="tnum mt-1 text-2xl font-extrabold tracking-tight text-ink">
                  {mission.budget}
                </p>

                <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted">Délai</dt>
                    <dd className="font-bold text-ink">{mission.delay}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1.5 text-muted">
                      <Users className="size-4" />
                      Candidats
                    </dt>
                    <dd className="tnum font-bold text-ink">
                      {mission.proposals} / {mission.cap}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1.5 text-muted">
                      <Eye className="size-4" />
                      Vues
                    </dt>
                    <dd className="tnum font-bold text-ink">{mission.views}</dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <div className="h-1.5 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-amber"
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-muted">
                    Places limitées à {mission.cap} candidatures
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-dashed border-line-strong bg-paper p-4 text-center">
                  <span className="mx-auto grid size-10 place-items-center rounded-full bg-amber-soft text-amber-deep">
                    <Lock className="size-5" />
                  </span>
                  <p className="mt-2 text-sm font-bold text-ink">
                    Candidature verrouillée
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Consulter ce projet est gratuit. La candidature se débloque
                    avec un crédit ou un abonnement.
                  </p>
                </div>

                <a
                  href="#"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-strong px-5 py-3 text-sm font-bold text-paper transition hover:bg-amber-strong-hover"
                >
                  Débloquer avec un crédit
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-line-strong px-5 py-3 text-sm font-bold text-ink transition hover:border-ink"
                >
                  Créer un compte gratuit
                </a>
              </div>
            </aside>
          </div>

          {similar.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-ink">
                Projets similaires
              </h2>
              <div className="mt-6 space-y-4">
                {similar.map((m) => (
                  <MissionCard key={m.slug} mission={m} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
