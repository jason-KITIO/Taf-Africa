import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { ButtonLink, Card, SectionHeading, Stat } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import {
  getAdminStats,
  getCreditBalance,
  getCreditEntries,
  getNotificationsForUser,
  getProjectsForClient,
  getQuotesForClient,
  getQuotesForFreelance,
  getUserPlan,
} from "@/lib/demo-store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const unread = getNotificationsForUser(user.id).filter((item) => !item.readAt).length;
  const projects = user.role === "client" ? getProjectsForClient(user.id).length : 0;
  const quotes = user.role === "client" ? getQuotesForClient(user.id).length : getQuotesForFreelance(user.id).length;
  const adminStats = user.role === "admin" ? getAdminStats() : null;
  const plan = user.role === "freelance" ? getUserPlan(user.id) : null;
  const credits = user.role === "freelance" ? getCreditBalance(user.id) : null;

  const quickLinks =
    user.role === "client"
      ? [
          {
            title: "Publier un besoin",
            description: "Décrivez votre projet et recevez des offres de freelances vérifiés.",
            href: "/projets/nouveau",
            cta: "Créer un projet",
          },
          {
            title: "Étudier les offres",
            description: "Marquez une offre comme étudiée : le freelance voit que vous l'avez lue.",
            href: "/offres",
            cta: "Voir les offres",
          },
        ]
      : user.role === "freelance"
        ? [
            {
              title: "Trouver une mission",
              description: "Filtrez par catégorie, budget et compétence.",
              href: "/projets",
              cta: "Parcourir les projets",
            },
            {
              title: "Gérer vos crédits",
              description: "Offre simple : 1 crédit. Offre premium : 15 crédits, 4 maximum.",
              href: "/abonnements",
              cta: "Voir les formules",
            },
          ]
        : [
            {
              title: "Modérer la plateforme",
              description: "Utilisateurs, projets, signalements et paiements.",
              href: "/admin/users",
              cta: "Ouvrir l'administration",
            },
            {
              title: "Renouvellements",
              description: "Renouveler les périodes de 30 jours et créditer les comptes.",
              href: "/admin/payments",
              cta: "Voir les paiements",
            },
          ];

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/tableau-de-bord"
      title={`Bonjour ${user.name.split(" ")[0]}`}
      description="Votre espace de travail Taf Africa, à jour et sans détour."
    >
      <Card>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
          {plan && credits !== null ? (
            <>
              <Stat label="Formule" value={plan.name} hint={`${plan.monthlyCredits} crédits / 30 jours`} />
              <Stat label="Crédits disponibles" value={<span className="tnum">{credits}</span>} hint="1 simple · 15 premium" />
            </>
          ) : null}
          {user.role === "admin" && adminStats ? (
            <Stat label="Utilisateurs" value={<span className="tnum">{adminStats.users}</span>} />
          ) : user.role === "client" ? (
            <Stat label="Projets publiés" value={<span className="tnum">{projects}</span>} />
          ) : (
            <Stat label="Offres envoyées" value={<span className="tnum">{quotes}</span>} />
          )}
          {user.role === "admin" && adminStats ? (
            <Stat label="Projets" value={<span className="tnum">{adminStats.projects}</span>} />
          ) : user.role === "client" ? (
            <Stat label="Offres reçues" value={<span className="tnum">{quotes}</span>} />
          ) : null}
          <Stat label="Notifications non lues" value={<span className="tnum">{unread}</span>} />
        </div>
      </Card>

      <section className="mt-8 space-y-4">
        <SectionHeading
          title="Accès rapides"
          description="Chaque action garde le même niveau de soin que le site public."
          action={
            <ButtonLink href={quickLinks[0].href} className="w-full sm:w-auto">
              {quickLinks[0].cta}
            </ButtonLink>
          }
        />
        <Card>
          <div className="divide-y divide-line">
            {quickLinks.map((link) => (
              <div
                key={link.href}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-ink">{link.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{link.description}</p>
                </div>
                <Link
                  href={link.href}
                  className="action action-quiet w-fit shrink-0 text-teal hover:text-lime"
                >
                  {link.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {user.role === "freelance" ? (
        <section className="mt-8 space-y-4">
          <SectionHeading title="Derniers mouvements de crédits" />
          <Card>
            <div className="divide-y divide-line">
              {getCreditEntries(user.id).slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{entry.note}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{entry.reason}</p>
                  </div>
                  <span className={`tnum shrink-0 font-bold ${entry.delta > 0 ? "text-success" : "text-danger"}`}>
                    {entry.delta > 0 ? "+" : ""}{entry.delta}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      ) : null}
    </DashboardShell>
  );
}
