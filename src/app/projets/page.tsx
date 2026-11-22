import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { Card, EmptyState, PageHeader, StatusPill } from "@/components/ui";
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
        <PageHeader
          eyebrow="Appels d'offres"
          title="Trouvez votre prochaine mission"
          description="Des projets publiés par des clients d'Afrique francophone. Consultez librement, répondez avec une offre claire."
          actions={<Link href="/projets/nouveau" className="rounded-full bg-amber-strong px-4 py-2 text-sm font-bold text-paper">Publier un besoin</Link>}
        />

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          <Link
            href="/projets"
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition",
              !category ? "border-ink bg-ink text-paper" : "border-line bg-surface text-muted hover:text-ink",
            )}
          >
            Tous les projets
          </Link>
          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/projets?category=${item.slug}`}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition",
                category === item.slug ? "border-ink bg-ink text-paper" : "border-line bg-surface text-muted hover:text-ink",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
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
              action={<Link href="/projets" className="text-sm font-bold text-amber-deep hover:underline">Voir tous les projets</Link>}
            />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {filtered.map((project) => (
              <Link key={project.id} href={`/projets/${project.slug}`} className="group block">
                <Card className="h-full transition group-hover:border-line-strong group-hover:shadow-lift">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill tone="success">Ouvert</StatusPill>
                    {project.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-ink-soft">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-lg font-bold leading-snug tracking-tight text-ink">{project.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm">
                    <span className="tnum font-bold text-ink">
                      {formatMoney(project.budgetMin, project.currency)} – {formatMoney(project.budgetMax, project.currency)}
                    </span>
                    <span className="text-muted">
                      {project.deadlineDays} jours · {project.quotesCount} offres
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted">Publié le {formatDate(project.publishedAt)}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </SiteFrame>
  );
}
