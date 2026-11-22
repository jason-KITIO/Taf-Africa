import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import { Avatar, ButtonLink, Card, SectionHeading, StatusPill } from "@/components/ui";
import { getPortfolioFor, getPublicFreelances, getReviewsForFreelance, getStore } from "@/lib/demo-store";
import { formatMoney } from "@/lib/format";

export default async function FreelanceProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getPublicFreelances().find((item) => item.slug === slug);
  if (!profile) notFound();
  const user = getStore().users.find((item) => item.id === profile.userId);
  const portfolio = getPortfolioFor(profile.userId);
  const reviews = getReviewsForFreelance(profile.userId);
  const rating = reviews.length
    ? Math.round((reviews.reduce((total, review) => total + review.rating, 0) / reviews.length) * 10) / 10
    : null;

  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <Link href="/freelances" className="text-sm font-semibold text-muted hover:text-amber-deep">
          ← Annuaire des freelances
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div className="flex flex-wrap items-start gap-4">
              <Avatar name={user?.name ?? "Freelance"} className="size-16 text-lg" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-ink">{user?.name ?? "Freelance"}</h1>
                  {profile.verified ? <StatusPill tone="success">Identité vérifiée</StatusPill> : null}
                  {rating !== null ? <StatusPill tone="info">{rating}/5 · {reviews.length} avis</StatusPill> : null}
                </div>
                <p className="mt-1 text-lg text-muted">{profile.title}</p>
                <p className="mt-2 text-sm text-muted">
                  {profile.city}{profile.country ? `, ${profile.country}` : ""} · {profile.languages.join(" · ")}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <SectionHeading title="À propos" />
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{profile.bio}</p>
            </div>

            <div className="mt-8">
              <SectionHeading title="Compétences" />
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink-soft">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SectionHeading title="Réalisations" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {portfolio.map((item) => (
                  <Card key={item.id}>
                    <p className="font-bold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                    {item.link ? (
                      <a href={item.link} className="mt-3 inline-flex text-sm font-bold text-amber-deep hover:underline">
                        Voir le projet
                      </a>
                    ) : null}
                  </Card>
                ))}
              </div>
            </div>

            {reviews.length ? (
              <div className="mt-8">
                <SectionHeading title="Avis clients" description="Publiés après une mission financée et livrée." />
                <div className="mt-4 space-y-3">
                  {reviews.map((review) => {
                    const client = getStore().users.find((item) => item.id === review.clientId);
                    return (
                      <Card key={review.id}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-bold text-ink">{client?.name ?? "Client"}</p>
                          <StatusPill tone="info">{review.rating}/5</StatusPill>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{review.comment}</p>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Tarif journalier</p>
              <p className="tnum mt-2 text-2xl font-extrabold text-ink">
                {formatMoney(profile.dailyRate, profile.rateCurrency)}
              </p>
              <p className="mt-5 text-sm text-muted">
                Pour discuter d&apos;une mission, publiez votre besoin ou répondez à un projet existant.
              </p>
              <div className="mt-4 grid gap-2">
                <ButtonLink href="/projets/nouveau" className="w-full">Publier un besoin</ButtonLink>
                <ButtonLink href="/projets" variant="secondary" className="w-full">Voir les projets</ButtonLink>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </SiteFrame>
  );
}
