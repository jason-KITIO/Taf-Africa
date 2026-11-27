"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Close, Menu } from "@/components/icons";
import { cn } from "@/lib/utils";

type HeaderUser = { name: string; role: "client" | "freelance" | "admin" } | null;

export function SiteHeader({ user = null }: { user?: HeaderUser }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  const navLinks = user
    ? [
        { label: "Tableau de bord", href: "/tableau-de-bord" },
        { label: "Projets", href: "/projets" },
        { label: "Freelances", href: "/freelances" },
        { label: "Messagerie", href: "/messagerie" },
      ]
    : [
        { label: "Comment ça marche", href: "/#comment-ca-marche" },
        { label: "Projets", href: "/projets" },
        { label: "Freelances", href: "/freelances" },
      ];

  const primaryHref = !user
    ? "/inscription?role=client"
    : user.role === "client"
      ? "/projets/nouveau"
      : "/projets";
  const primaryLabel = !user
    ? "Publier un besoin"
    : user.role === "client"
      ? "Nouveau projet"
      : "Trouver des projets";

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return href === pathname || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-matter transition-colors duration-200",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-matter"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center" aria-label="Taf Africa, accueil">
          <Logo className="text-xl sm:text-[22px]" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                isActive(link.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              {link.label}
              {isActive(link.href) ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3.5 -bottom-px h-px bg-lime"
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={user ? "/profil" : "/connexion"}
            className="hidden min-h-11 items-center rounded-full px-3.5 text-sm font-semibold text-ink-soft transition-colors hover:text-lime sm:inline-flex"
          >
            {user ? user.name.split(" ")[0] : "Connexion"}
          </Link>
          <Link
            href={primaryHref}
            className="action action-primary hidden sm:inline-flex"
          >
            {primaryLabel}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-line-strong lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-panel lg:hidden">
          <nav aria-label="Navigation mobile" className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3 sm:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center border-b border-line py-3 text-base font-semibold text-ink-soft transition-colors hover:text-lime"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 pb-3">
              <Link
                href={user ? "/profil" : "/connexion"}
                onClick={() => setOpen(false)}
                className="action action-secondary"
              >
                {user ? "Mon profil" : "Connexion"}
              </Link>
              <Link
                href={primaryHref}
                onClick={() => setOpen(false)}
                className="action action-primary"
              >
                {primaryLabel}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
