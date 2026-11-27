"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { MissionCard } from "@/components/mission-card";
import { ArrowRight } from "@/components/icons";
import { categories, missions } from "@/lib/content";
import { cn } from "@/lib/utils";

const filters = ["Tous", ...categories.map((c) => c.label)];

function PromoBlock() {
  return (
    <div className="flex flex-col gap-4 border border-line bg-matter p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">Déposer un besoin</p>
        <h3 className="mt-3 text-lg font-bold text-ink">
          Vous avez un projet similaire ?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Déposez votre besoin gratuitement et recevez des offres simples à 1
          crédit ou premium à 15 crédits, 4 au maximum par mission.
        </p>
      </div>
      <Link href="/projets/nouveau" className="action action-primary shrink-0">
        Publier un besoin
        <ArrowRight className="size-4" />
      </Link>
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
              "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
              active === filter
                ? "border-lime bg-lime-soft text-lime"
                : "border-line bg-panel text-ink-soft hover:border-line-strong hover:text-ink",
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
        <div className="mt-6 border border-dashed border-line-strong bg-matter p-10 text-center">
          <p className="text-base font-bold text-ink">
            Aucun projet dans cette catégorie pour l&apos;instant.
          </p>
          <p className="mt-2 text-sm text-muted">
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
