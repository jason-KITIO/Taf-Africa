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
      <main className="flex-1 bg-paper/70">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-deep">
              Espace {user.role === "freelance" ? "freelance" : user.role === "client" ? "client" : "administrateur"}
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">
              {title}
            </h1>
            {description ? <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p> : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <nav className="flex w-full min-w-0 gap-1.5 overflow-x-auto rounded-2xl border border-line bg-surface p-2 shadow-soft lg:flex-col lg:overflow-visible">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-semibold transition",
                      active === item.href
                        ? "bg-ink text-paper"
                        : "text-muted hover:bg-ink/5 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <form action={logoutAction} className="mt-3 hidden lg:block">
                <button
                  type="submit"
                  className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left text-sm font-semibold text-muted transition hover:border-ink/30 hover:text-ink"
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
