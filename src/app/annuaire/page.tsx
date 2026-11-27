import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { Avatar, ButtonLink, EmptyState, StatusPill, inputClass } from "@/components/ui";
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
        <header className="min-w-0">
          <p className="eyebrow">Annuaire</p>
          <h1 className="display mt-4 text-[2rem] text-ink sm:text-[2.5rem]">
            Trouvez le bon freelance
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Profils publics, classés par vérification, réputation et pertinence. Aucune donnée de contact n&apos;est exposée.
          </p>
        </header>

        <form method="get" className="panel mt-9 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="text-sm font-bold text-ink">Ville</span>
            <input name="ville" className={`${inputClass} mt-1.5`} defaultValue={ville} placeholder="Abidjan" />
            <span className="mt-1 block text-xs text-muted">Filtre sur la ville du profil.</span>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink">Compétence</span>
            <input name="competence" className={`${inputClass} mt-1.5`} defaultValue={competence} placeholder="Next.js" />
            <span className="mt-1 block text-xs text-muted">Une compétence ou un outil.</span>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink">Langue</span>
            <input name="langue" className={`${inputClass} mt-1.5`} defaultValue={langue} placeholder="Anglais" />
            <span className="mt-1 block text-xs text-muted">Langue parlée par le freelance.</span>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink">Recherche</span>
            <input name="q" className={`${inputClass} mt-1.5`} defaultValue={q} placeholder="Design, mobile, SEO…" />
            <span className="mt-1 block text-xs text-muted">Mot-clé libre.</span>
          </label>
          <div className="section-rule pt-5 sm:col-span-2 lg:col-span-4">
            <button type="submit" className="action action-primary">
              Filtrer les profils
            </button>
          </div>
        </form>

        <div className="section-rule mt-8 pt-5">
          <p className="text-sm text-muted">
            <span className="tnum font-bold text-ink">{freelances.length}</span> profil(s) correspondant(s)
          </p>
        </div>

        {freelances.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="Aucun profil trouvé"
              description="Élargissez vos critères ou publiez votre besoin pour recevoir des offres ciblées."
              action={<ButtonLink href="/projets/nouveau" variant="secondary">Publier un besoin</ButtonLink>}
            />
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-line border-t border-line">
            {freelances.map(({ profile, name, rating, reviewCount }) => (
              <li key={profile.userId} className="py-6">
                <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <Avatar name={name} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/freelances/${profile.slug}`} className="break-words font-bold text-ink hover:text-teal">
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
                  <Link href={`/freelances/${profile.slug}`} className="action action-quiet -mt-1 shrink-0">
                    Voir →
                  </Link>
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {profile.bio || "Profil en cours de complétion."}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.slice(0, 4).map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="section-rule mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-2 pt-4 text-sm">
                  <p className="text-muted">
                    {reviewCount ? <><strong className="tnum text-ink">{rating}/5</strong> · {reviewCount} avis</> : "Nouveau profil"}
                  </p>
                  {profile.dailyRate > 0 ? (
                    <p className="tnum text-xs text-muted">
                      Tarif indicatif : {formatMoney(profile.dailyRate, profile.rateCurrency)} / jour
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SiteFrame>
  );
}
