"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Search } from "@/components/icons";
import { categories, missions } from "@/lib/content";
import { cn } from "@/lib/utils";

type Side = "talent" | "mission";

export function MarketEntry() {
  const router = useRouter();
  const [side, setSide] = useState<Side>("talent");
  const [query, setQuery] = useState("");

  const isTalent = side === "talent";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/projets");
  }

  const talentRows = categories.slice(0, 3);
  const missionRows = missions.slice(0, 3);

  return (
    <div className="min-w-0">
      <div
        role="tablist"
        aria-label="Choisir un côté du marché"
        className="grid grid-cols-2 gap-px border border-line bg-line"
      >
        {(
          [
            { id: "talent", label: "Je cherche un talent" },
            { id: "mission", label: "Je cherche une mission" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            role="tab"
            type="button"
            aria-selected={side === opt.id}
            onClick={() => setSide(opt.id)}
            className={cn(
              "min-h-11 px-3 py-3 text-sm font-semibold transition-colors",
              side === opt.id
                ? "bg-lime-soft text-lime"
                : "bg-panel text-muted hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <label htmlFor="market-search" className="eyebrow mt-4 block">
        {isTalent
          ? "Décrire le talent recherché"
          : "Décrire la mission recherchée"}
      </label>
      <form
        onSubmit={onSubmit}
        className="mt-2 flex items-center gap-2 border border-line bg-panel p-2 focus-within:border-line-strong"
      >
        <Search className="ml-2 size-5 shrink-0 text-muted" />
        <input
          id="market-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isTalent
              ? "Développeur, graphiste, rédacteur…"
              : "Développement web, design, marketing…"
          }
          className="min-h-11 min-w-0 flex-1 bg-transparent px-1 py-2 text-base text-ink outline-none placeholder:text-muted"
        />
        <button type="submit" className="action action-primary shrink-0 px-4 sm:px-5">
          <span className="hidden sm:inline">
            {isTalent ? "Trouver un talent" : "Trouver une mission"}
          </span>
          <span className="sm:hidden">Chercher</span>
          <ArrowRight className="size-4" />
        </button>
      </form>

      <ul className="mt-px divide-y divide-line border border-line bg-panel">
        {isTalent
          ? talentRows.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Link
                  href="/projets"
                  className="flex min-h-11 items-center gap-3 px-4 py-3 transition-colors hover:bg-raised"
                >
                  <span className="grid size-9 shrink-0 place-items-center border border-line bg-matter text-teal">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-ink">
                    {label}
                  </span>
                  <span className="text-xs font-medium text-muted">
                    Voir les profils
                  </span>
                </Link>
              </li>
            ))
          : missionRows.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/projets/${m.slug}`}
                  className="flex min-h-11 items-center gap-3 px-4 py-3 transition-colors hover:bg-raised"
                >
                  <span className="grid size-9 shrink-0 place-items-center border border-line bg-matter text-muted">
                    <Lock className="size-[17px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {m.title}
                    </span>
                    <span className="tnum block text-xs text-muted">
                      {m.budget} · {m.proposals}/{m.cap} candidats
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-bold text-teal">
                    Postuler
                  </span>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
