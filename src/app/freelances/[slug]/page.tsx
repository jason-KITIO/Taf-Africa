import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import { Avatar, ButtonLink, StatusPill } from "@/components/ui";
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
        <Link href="/freelances" className="text-sm font-bold text-teal hover:text-ink">
          ← Annuaire des freelances
        </Link>

        <header className="mt-6 min-w-0">
          <p className="eyebrow">Profil freelance</p>
          <div className="mt-4 flex min-w-0 flex-wrap items-start gap-4">
            <Avatar name={user?.name ?? "Freelance"} className="size-16 text-lg" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="display text-[2rem] text-ink sm:text-[2.5rem]">
                  {user?.name ?? "Freelance"}
                </h1>
                {profile.verified ? <StatusPill tone="success">Identité vérifiée</StatusPill> : null}
                {rating !== null ? <StatusPill tone="info">{rating}/5 · {reviews.length} avis</StatusPill> : null}
              </div>
              <p className="mt-2 text-lg text-ink-soft">{profile.title}</p>
              <p className="mt-1 text-sm text-muted">
                {profile.city}{profile.country ? `, ${profile.country}` : ""} · {profile.languages.join(" · ")}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <section>
              <p className="eyebrow">À propos</p>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{profile.bio}</p>
            </section>

            <section className="section-rule mt-10 pt-8">
              <p className="eyebrow">Compétences</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <li key={skill} className="chip chip-solid px-3 py-1.5 text-sm font-semibold text-ink-soft">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            <section className="section-rule mt-10 pt-8">
              <p className="eyebrow">Réalisations</p>
              <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-ink">Projets présentés</h2>
              <ul className="mt-5 divide-y divide-line border-t border-line">
                {portfolio.map((item) => (
                  <li key={item.id} className="py-5">
                    <p className="font-bold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                    {item.link ? (
                      <a href={item.link} className="mt-3 inline-flex text-sm font-bold text-teal hover:text-ink">
                        Voir le projet
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>

            {reviews.length ? (
              <section className="section-rule mt-10 pt-8">
                <p className="eyebrow">Avis clients</p>
                <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-ink">
                  Retours après mission
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Publiés après une mission financée et livrée.
                </p>
                <ul className="mt-5 divide-y divide-line border-t border-line">
                  {reviews.map((review) => {
                    const client = getStore().users.find((item) => item.id === review.clientId);
                    return (
                      <li key={review.id} className="py-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-bold text-ink">{client?.name ?? "Client"}</p>
                          <StatusPill tone="info">{review.rating}/5</StatusPill>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{review.comment}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="panel min-w-0 self-start p-5 lg:sticky lg:top-24">
            <p className="eyebrow">Tarif journalier</p>
            <p className="tnum mt-3 text-2xl font-extrabold tracking-[-0.03em] text-ink">
              {formatMoney(profile.dailyRate, profile.rateCurrency)}
            </p>
            <div className="section-rule mt-5 pt-5">
              <p className="text-sm leading-relaxed text-muted">
                Pour discuter d&apos;une mission, publiez votre besoin ou répondez à un projet existant.
              </p>
              <div className="mt-5 grid gap-2">
                <ButtonLink href="/projets/nouveau" className="w-full">Publier un besoin</ButtonLink>
                <ButtonLink href="/projets" variant="secondary" className="w-full">Voir les projets</ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteFrame>
  );
}
