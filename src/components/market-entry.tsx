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
    <div className="mx-auto mt-9 w-full max-w-2xl">
      <div
        role="tablist"
        aria-label="Choisir un côté du marché"
        className="mx-auto flex w-full max-w-md rounded-full border border-line bg-surface p-1 shadow-soft"
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
              "flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition",
              side === opt.id
                ? "bg-ink text-paper"
                : "text-muted hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-3 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 shadow-soft focus-within:border-amber-deep"
      >
        <Search className="ml-2.5 size-5 shrink-0 text-muted" />
        <label htmlFor="market-search" className="sr-only">
          {isTalent
            ? "Décrire le talent recherché"
            : "Décrire la mission recherchée"}
        </label>
        <input
          id="market-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isTalent
              ? "Développeur, graphiste, rédacteur…"
              : "Développement web, design, marketing…"
          }
          className="min-w-0 flex-1 bg-transparent px-1 py-2 text-base text-ink outline-none placeholder:text-muted/80"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-strong px-4 py-2.5 text-sm font-bold text-paper transition hover:bg-amber-strong-hover sm:px-5"
        >
          <span className="hidden sm:inline">
            {isTalent ? "Trouver un talent" : "Trouver une mission"}
          </span>
          <span className="sm:hidden">Chercher</span>
          <ArrowRight className="size-4" />
        </button>
      </form>

      <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface text-left">
        {isTalent
          ? talentRows.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Link
                  href="/projets"
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-paper"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-soft text-amber-deep">
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
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-paper"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ink/5 text-ink">
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
                  <span className="shrink-0 text-xs font-bold text-amber-deep">
                    Postuler
                  </span>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
