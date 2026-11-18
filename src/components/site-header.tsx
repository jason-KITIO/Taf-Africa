"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Close, Menu } from "@/components/icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Comment ça marche", href: "/#comment-ca-marche" },
  { label: "Projets", href: "/projets" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="Taf Africa, accueil">
          <Logo className="text-xl sm:text-[22px]" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition hover:bg-ink/5 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink/5 sm:inline-flex"
          >
            Connexion
          </a>
          <a
            href="#"
            className="hidden rounded-full bg-amber-strong px-4 py-2 text-sm font-bold text-paper shadow-soft transition hover:bg-amber-strong-hover sm:inline-flex"
          >
            Publier un besoin
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="mx-4 mb-4 rounded-2xl border border-line bg-surface p-3 shadow-lift">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink-soft transition hover:bg-ink/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="rounded-full border border-line-strong px-4 py-3 text-center text-sm font-semibold text-ink"
              >
                Connexion
              </a>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="rounded-full bg-amber-strong px-4 py-3 text-center text-sm font-bold text-paper"
              >
                Publier un besoin
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
