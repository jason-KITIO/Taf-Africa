import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { EmptyState, StatusPill } from "@/components/ui";
import { formatDate, formatMoney } from "@/lib/format";
import { getCategories, getPublicProjects } from "@/lib/demo-store";
import { cn } from "@/lib/utils";

export default async function ProjetsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const projects = getPublicProjects();
  const categories = getCategories();
  const filtered = category ? projects.filter((project) => project.categorySlug === category) : projects;
  const activeCategory = categories.find((item) => item.slug === category);

  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="min-w-0">
          <p className="eyebrow">Appels d&apos;offres</p>
          <h1 className="display mt-4 text-[2rem] text-ink sm:text-[2.5rem]">
            Trouvez votre prochaine mission
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Des projets publiés par des clients d&apos;Afrique francophone. Consultez librement, répondez avec une offre claire.
          </p>
          <div className="mt-6">
            <Link href="/projets/nouveau" className="action action-primary">
              Publier un besoin
            </Link>
          </div>
        </header>

        <nav aria-label="Filtrer par catégorie" className="-mx-5 mt-9 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2">
            <Link
              href="/projets"
              className={cn(
                "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition",
                !category ? "border-teal bg-teal text-matter" : "border-line bg-panel text-muted hover:border-line-strong hover:text-ink",
              )}
              aria-current={!category ? "page" : undefined}
            >
              Tous les projets
            </Link>
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/projets?category=${item.slug}`}
                className={cn(
                  "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition",
                  category === item.slug ? "border-teal bg-teal text-matter" : "border-line bg-panel text-muted hover:border-line-strong hover:text-ink",
                )}
                aria-current={category === item.slug ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="section-rule mt-6 pt-5">
          <p className="text-sm text-muted">
            <strong className="tnum text-ink">{filtered.length}</strong> projet{filtered.length > 1 ? "s" : ""}
            {activeCategory ? ` · ${activeCategory.name}` : ""}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="Aucun projet dans cette catégorie"
              description="Revenez bientôt ou publiez votre propre besoin pour attirer les bons freelances."
              action={<Link href="/projets" className="action action-secondary">Voir tous les projets</Link>}
            />
          </div>
        ) : (
          <ul className="divide-y divide-line border-t border-line">
            {filtered.map((project) => (
              <li key={project.id}>
                <Link href={`/projets/${project.slug}`} className="group block py-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill tone="success">Ouvert</StatusPill>
                    {project.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-lg font-bold leading-snug tracking-[-0.02em] text-ink transition group-hover:text-teal">
                    {project.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
                    <p className="tnum text-sm font-bold text-ink">
                      {formatMoney(project.budgetMin, project.currency)} – {formatMoney(project.budgetMax, project.currency)}
                    </p>
                    <p className="tnum text-sm text-muted">
                      {project.deadlineDays} jours · {project.quotesCount} offres
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-muted">Publié le {formatDate(project.publishedAt)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SiteFrame>
  );
}
