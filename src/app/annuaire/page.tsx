import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { Avatar, ButtonLink, Card, EmptyState, StatusPill, inputClass } from "@/components/ui";
import { getDirectoryFreelances } from "@/lib/demo-store";
import { formatMoney } from "@/lib/format";

export const metadata = {
  title: "Annuaire des freelances francophones",
  description: "Trouvez un freelance vérifié par ville, compétence et langue sur Taf Africa.",
};

export const dynamic = "force-dynamic";

export default async function AnnuairePage({
  searchParams,
}: {
  searchParams: Promise<{ ville?: string; competence?: string; langue?: string; q?: string }>;
}) {
  const { ville = "", competence = "", langue = "", q = "" } = await searchParams;
  const freelances = getDirectoryFreelances({
    city: ville,
    skill: competence,
    language: langue,
    query: q,
  });

  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-deep">Annuaire</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
          Trouvez le bon freelance
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Profils publics, classés par vérification, réputation et pertinence. Aucune donnée de contact n&apos;est exposée.
        </p>

        <form method="get" className="mt-8 grid gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="text-sm font-bold text-ink">Ville</span>
            <input name="ville" className={`${inputClass} mt-1.5`} defaultValue={ville} placeholder="Abidjan" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink">Compétence</span>
            <input name="competence" className={`${inputClass} mt-1.5`} defaultValue={competence} placeholder="Next.js" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink">Langue</span>
            <input name="langue" className={`${inputClass} mt-1.5`} defaultValue={langue} placeholder="Anglais" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink">Recherche</span>
            <input name="q" className={`${inputClass} mt-1.5`} defaultValue={q} placeholder="Design, mobile, SEO…" />
          </label>
          <div className="sm:col-span-2 lg:col-span-4">
            <button type="submit" className="rounded-full bg-amber-strong px-5 py-2.5 text-sm font-bold text-paper transition hover:bg-amber-strong-hover">
              Filtrer les profils
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-muted">
          <span className="tnum font-bold text-ink">{freelances.length}</span> profil(s) correspondant(s)
        </p>

        {freelances.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Aucun profil trouvé"
              description="Élargissez vos critères ou publiez votre besoin pour recevoir des offres ciblées."
              action={<ButtonLink href="/projets/nouveau">Publier un besoin</ButtonLink>}
            />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {freelances.map(({ profile, name, rating, reviewCount }) => (
              <Card key={profile.userId} className="flex flex-col">
                <div className="flex items-start gap-3">
                  <Avatar name={name} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/freelances/${profile.slug}`} className="font-bold text-ink hover:text-amber-deep">
                        {name}
                      </Link>
                      {profile.verified ? <StatusPill tone="success">Vérifié</StatusPill> : null}
                    </div>
                    <p className="mt-1 text-sm text-muted">{profile.title || "Freelance"}</p>
                    <p className="mt-1 text-sm text-muted">
                      {profile.city || "Afrique"}{profile.country ? `, ${profile.country}` : ""}
                    </p>
                  </div>
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">{profile.bio || "Profil en cours de complétion."}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {profile.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-full bg-sand/60 px-2.5 py-1 text-xs font-semibold text-ink-soft">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
                  <span className="text-muted">
                    {reviewCount ? <><strong className="tnum text-ink">{rating}/5</strong> · {reviewCount} avis</> : "Nouveau profil"}
                  </span>
                  <Link href={`/freelances/${profile.slug}`} className="font-bold text-amber-deep hover:underline">
                    Voir →
                  </Link>
                </div>
                {profile.dailyRate > 0 ? (
                  <p className="mt-2 text-xs text-muted">Tarif indicatif : {formatMoney(profile.dailyRate, profile.rateCurrency)} / jour</p>
                ) : null}
              </Card>
            ))}
          </div>
        )}
      </div>
    </SiteFrame>
  );
}
