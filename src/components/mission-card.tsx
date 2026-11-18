import Link from "next/link";
import { ArrowRight, Clock, Eye, Lock, Users } from "@/components/icons";
import { Monogram } from "@/components/monogram";
import type { Mission } from "@/lib/content";

export function MissionCard({ mission }: { mission: Mission }) {
  const ratio = Math.min(100, Math.round((mission.proposals / mission.cap) * 100));
  const shown = mission.applicants.slice(0, 4);
  const rest = mission.proposals - shown.length;

  return (
    <article className="group rounded-2xl border border-line bg-surface p-5 shadow-soft transition hover:border-line-strong hover:shadow-lift sm:p-6">
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
          {mission.posted}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold leading-snug text-ink">
        <Link
          href={`/projets/${mission.slug}`}
          className="transition group-hover:text-amber-deep"
        >
          {mission.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">
        {mission.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {mission.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-medium text-ink-soft"
          >
            {tag}
          </span>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-muted">Budget</dt>
          <dd className="tnum text-sm font-bold text-ink">{mission.budget}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Délai</dt>
          <dd className="text-sm font-bold text-ink">{mission.delay}</dd>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-muted">
              <Users className="size-3.5" />
              Candidats
            </dt>
            <dd className="tnum text-sm font-bold text-ink">
              {mission.proposals} / {mission.cap}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-muted">
              <Eye className="size-3.5" />
              Vues
            </dt>
            <dd className="tnum text-sm font-bold text-ink">{mission.views}</dd>
          </div>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {shown.map((initials) => (
              <Monogram
                key={initials}
                initials={initials}
                className="size-8"
              />
            ))}
            {rest > 0 && (
              <span className="grid size-8 place-items-center rounded-full bg-sand text-[10px] font-bold text-ink-soft ring-2 ring-surface">
                +{rest}
              </span>
            )}
          </div>
          <div className="w-24 sm:w-32">
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-amber"
                style={{ width: `${ratio}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] font-medium text-muted">
              Places limitées
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/projets/${mission.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:text-amber-deep"
          >
            Voir le projet
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={`/projets/${mission.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong bg-paper px-4 py-2 text-sm font-bold text-ink-soft transition hover:border-amber-deep hover:text-amber-deep"
          >
            <Lock className="size-4" />
            Postuler
          </Link>
        </div>
      </div>
    </article>
  );
}
