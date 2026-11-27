import Link from "next/link";
import { ArrowRight, Clock, Eye, Lock, Users } from "@/components/icons";
import { Monogram } from "@/components/monogram";
import type { Mission } from "@/lib/content";

export function MissionCard({ mission }: { mission: Mission }) {
  const ratio = Math.min(100, Math.round((mission.proposals / mission.cap) * 100));
  const shown = mission.applicants.slice(0, 4);
  const rest = mission.proposals - shown.length;

  return (
    <article className="group border border-line bg-panel p-5 transition-colors hover:border-line-strong sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold">
        <span className="chip chip-solid border border-teal/30 text-teal">
          <span className="size-1.5 rounded-full bg-teal" />
          Statut&nbsp;: Ouvert
        </span>
        <span className="chip">{mission.category}</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-muted">
          <Clock className="size-3.5" />
          {mission.posted}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-ink">
        <Link
          href={`/projets/${mission.slug}`}
          className="transition-colors hover:text-lime"
        >
          {mission.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-soft">
        {mission.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {mission.tags.map((tag) => (
          <span key={tag} className="chip chip-solid">
            {tag}
          </span>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4">
        <div>
          <dt className="text-xs text-muted">Budget</dt>
          <dd className="tnum mt-1 text-sm font-bold text-ink">{mission.budget}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Délai</dt>
          <dd className="mt-1 text-sm font-bold text-ink">{mission.delay}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-muted">
            <Users className="size-3.5" />
            Candidats
          </dt>
          <dd className="tnum mt-1 text-sm font-bold text-ink">
            {mission.proposals} / {mission.cap}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-muted">
            <Eye className="size-3.5" />
            Vues
          </dt>
          <dd className="tnum mt-1 text-sm font-bold text-ink">{mission.views}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex -space-x-2">
            {shown.map((initials) => (
              <Monogram key={initials} initials={initials} className="size-8" />
            ))}
            {rest > 0 && (
              <span className="grid size-8 place-items-center rounded-[30%] border border-line bg-raised text-[10px] font-bold text-ink-soft ring-2 ring-panel">
                +{rest}
              </span>
            )}
          </div>
          <div className="min-w-[7rem]">
            <div className="h-px bg-line-strong">
              <div className="h-px bg-teal" style={{ width: `${ratio}%` }} />
            </div>
            <p className="mt-2 text-[11px] font-medium text-muted">
              Places limitées
            </p>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <Link
            href={`/projets/${mission.slug}`}
            className="action action-quiet min-h-11 px-0 text-sm"
          >
            Voir le projet
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={`/projets/${mission.slug}`}
            className="action action-secondary min-h-11"
          >
            <Lock className="size-4" />
            Postuler
          </Link>
        </div>
      </div>
    </article>
  );
}
