import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, PageHeader, Stat } from "@/components/ui";
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

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/tableau-de-bord"
      title={`Bonjour ${user.name.split(" ")[0]}`}
      description="Votre espace de travail Taf Africa, à jour et sans détour."
    >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {plan && credits !== null ? (
            <>
              <Stat label="Formule" value={plan.name} hint={`${plan.monthlyCredits} crédits / 30 jours`} />
              <Stat label="Crédits disponibles" value={credits} hint="1 simple · 15 premium" />
            </>
          ) : null}
          {user.role === "admin" && adminStats ? (
            <Stat label="Utilisateurs" value={adminStats.users} />
          ) : user.role === "client" ? (
            <Stat label="Projets publiés" value={projects} />
          ) : (
            <Stat label="Offres envoyées" value={quotes} />
          )}
          {user.role === "admin" && adminStats ? (
            <Stat label="Projets" value={adminStats.projects} />
          ) : user.role === "client" ? (
            <Stat label="Offres reçues" value={quotes} />
          ) : null}
          <Stat label="Notifications non lues" value={unread} />
        </div>

      <div className="mt-6">
        <PageHeader
          eyebrow="Accès rapides"
          title="Ce que vous pouvez faire maintenant"
          description="Chaque action garde le même niveau de soin que le site public."
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {user.role === "client" ? (
            <>
              <Card>
                <h2 className="text-base font-bold text-ink">Publier un besoin</h2>
                <p className="mt-2 text-sm text-muted">Décrivez votre projet et recevez des offres de freelances vérifiés.</p>
                <Link href="/projets/nouveau" className="mt-4 inline-flex text-sm font-bold text-amber-deep hover:underline">
                  Créer un projet →
                </Link>
              </Card>
              <Card>
                <h2 className="text-base font-bold text-ink">Étudier les offres</h2>
                <p className="mt-2 text-sm text-muted">Marquez une offre comme étudiée : le freelance voit que vous l&apos;avez lue.</p>
                <Link href="/offres" className="mt-4 inline-flex text-sm font-bold text-amber-deep hover:underline">
                  Voir les offres →
                </Link>
              </Card>
            </>
          ) : user.role === "freelance" ? (
            <>
              <Card>
                <h2 className="text-base font-bold text-ink">Trouver une mission</h2>
                <p className="mt-2 text-sm text-muted">Filtrez par catégorie, budget et compétence.</p>
                <Link href="/projets" className="mt-4 inline-flex text-sm font-bold text-amber-deep hover:underline">
                  Parcourir les projets →
                </Link>
              </Card>
              <Card>
                <h2 className="text-base font-bold text-ink">Gérer vos crédits</h2>
                <p className="mt-2 text-sm text-muted">Offre simple : 1 crédit. Offre premium : 15 crédits, 4 maximum.</p>
                <Link href="/abonnements" className="mt-4 inline-flex text-sm font-bold text-amber-deep hover:underline">
                  Voir les formules →
                </Link>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <h2 className="text-base font-bold text-ink">Modérer la plateforme</h2>
                <p className="mt-2 text-sm text-muted">Utilisateurs, projets, signalements et paiements.</p>
                <Link href="/admin/users" className="mt-4 inline-flex text-sm font-bold text-amber-deep hover:underline">
                  Ouvrir l&apos;administration →
                </Link>
              </Card>
              <Card>
                <h2 className="text-base font-bold text-ink">Renouvellements</h2>
                <p className="mt-2 text-sm text-muted">Renouveler les périodes de 30 jours et créditer les comptes.</p>
                <Link href="/admin/payments" className="mt-4 inline-flex text-sm font-bold text-amber-deep hover:underline">
                  Voir les paiements →
                </Link>
              </Card>
            </>
          )}
        </div>
      </div>

      {user.role === "freelance" ? (
        <div className="mt-6">
          <Card>
            <h2 className="text-base font-bold text-ink">Derniers mouvements de crédits</h2>
            <div className="mt-4 divide-y divide-line">
              {getCreditEntries(user.id).slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <div>
                    <p className="font-semibold text-ink">{entry.note}</p>
                    <p className="text-xs text-muted">{entry.reason}</p>
                  </div>
                  <span className={`tnum font-bold ${entry.delta > 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {entry.delta > 0 ? "+" : ""}{entry.delta}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}
    </DashboardShell>
  );
}
