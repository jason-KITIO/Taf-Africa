"use client";

import { Fragment, useMemo, useState } from "react";
import { MissionCard } from "@/components/mission-card";
import { ArrowRight } from "@/components/icons";
import { categories, missions } from "@/lib/content";
import { cn } from "@/lib/utils";

const filters = ["Tous", ...categories.map((c) => c.label)];

function PromoBlock() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-amber-deep/30 bg-amber-soft/60 p-6 sm:flex-row sm:items-center">
      <div>
        <h3 className="text-lg font-bold text-ink">
          Vous avez un projet similaire ?
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          Déposez votre projet gratuitement et recevez jusqu&apos;à 10
          propositions qualifiées en quelques minutes.
        </p>
      </div>
      <a
        href="#"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-strong px-5 py-3 text-sm font-bold text-paper transition hover:bg-amber-strong-hover"
      >
        Publier un projet
        <ArrowRight className="size-4" />
      </a>
    </div>
  );
}

export function ProjectList() {
  const [active, setActive] = useState("Tous");

  const list = useMemo(
    () =>
      active === "Tous"
        ? missions
        : missions.filter((m) => m.category === active),
    [active],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-semibold transition",
              active === filter
                ? "bg-ink text-paper"
                : "border border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm font-medium text-muted">
        <span className="tnum font-bold text-ink">{list.length}</span>{" "}
        {list.length > 1 ? "projets ouverts" : "projet ouvert"}
        {active !== "Tous" && ` en ${active}`}
      </p>

      {list.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
          <p className="text-base font-bold text-ink">
            Aucun projet dans cette catégorie pour l&apos;instant.
          </p>
          <p className="mt-1 text-sm text-muted">
            Revenez bientôt ou explorez toutes les catégories.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {list.map((mission, i) => (
            <Fragment key={mission.slug}>
              <MissionCard mission={mission} />
              {i === 3 && list.length > 5 && <PromoBlock />}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
