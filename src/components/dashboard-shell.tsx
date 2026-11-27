import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeaderAuth } from "@/components/site-header-auth";
import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";

type NavItem = { label: string; href: string };

const common: NavItem[] = [
  { label: "Vue d'ensemble", href: "/tableau-de-bord" },
  { label: "Mon profil", href: "/profil" },
  { label: "Messagerie", href: "/messagerie" },
  { label: "Notifications", href: "/notifications" },
];

const byRole: Record<Role, NavItem[]> = {
  client: [
    { label: "Mes projets", href: "/projets" },
    { label: "Publier un besoin", href: "/projets/nouveau" },
    { label: "Offres reçues", href: "/offres" },
    { label: "Factures", href: "/factures" },
    { label: "Paiements sécurisés", href: "/paiements" },
    { label: "Avis", href: "/avis" },
    { label: "Litiges", href: "/litiges" },
    { label: "Parrainage", href: "/parrainage" },
  ],
  freelance: [
    { label: "Trouver des projets", href: "/projets" },
    { label: "Mes offres", href: "/offres" },
    { label: "Crédits", href: "/abonnements" },
    { label: "Factures", href: "/factures" },
    { label: "Paiements sécurisés", href: "/paiements" },
    { label: "Avis", href: "/avis" },
    { label: "Litiges", href: "/litiges" },
    { label: "Parrainage", href: "/parrainage" },
  ],
  admin: [
    { label: "Création", href: "/admin/creation" },
    { label: "Utilisateurs", href: "/admin/users" },
    { label: "Projets", href: "/admin/projects" },
    { label: "Signalements", href: "/admin/reports" },
    { label: "Paiements", href: "/admin/payments" },
    { label: "Vérifications", href: "/admin/verifications" },
    { label: "Litiges", href: "/admin/disputes" },
  ],
};

const roleLabel: Record<Role, string> = {
  client: "Espace client",
  freelance: "Espace freelance",
  admin: "Administration",
};

export function DashboardShell({
  user,
  active,
  title,
  description,
  children,
}: {
  user: { name: string; role: Role };
  active?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const items = [...common, ...byRole[user.role]];

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeaderAuth />
      <main className="flex-1 bg-matter">
        <div className="border-b border-line bg-panel/40">
          <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
            <div className="flex items-center gap-3">
              <span className="eyebrow">{roleLabel[user.role]}</span>
              <span className="h-px w-8 bg-teal" aria-hidden="true" />
              <span className="text-xs font-medium text-muted">{user.name}</span>
            </div>
            <h1 className="display mt-3 text-[2rem] text-ink sm:text-[2.5rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <div className="hidden border-b border-line pb-4 lg:block">
                <p className="eyebrow">Navigation</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {items.length} sections disponibles
                </p>
              </div>
              <nav
                aria-label="Navigation de l'espace"
                className="flex w-full min-w-0 gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0 lg:pt-4"
              >
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active === item.href ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-3.5 text-sm font-semibold transition-colors",
                      active === item.href
                        ? "bg-ink text-matter"
                        : "text-muted hover:bg-raised hover:text-ink",
                    )}
                  >
                    {item.label}
                    {active === item.href ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 hidden h-4 w-0.5 -translate-y-1/2 bg-lime lg:block"
                      />
                    ) : null}
                  </Link>
                ))}
              </nav>
              <form action={logoutAction} className="mt-4 hidden lg:block">
                <button
                  type="submit"
                  className="action action-secondary w-full justify-start"
                >
                  Se déconnecter
                </button>
              </form>
            </aside>

            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
