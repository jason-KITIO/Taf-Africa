import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  adjustCreditsAction,
  moderateProjectAction,
  renewSubscriptionsAction,
  resolveReportAction,
  toggleBanAction,
} from "@/app/actions/admin";
import { resolveDisputeAction, verifyProfileAction } from "@/app/actions/v2";
import { Avatar, Card, EmptyState, Stat, StatusPill } from "@/components/ui";
import { requireRole } from "@/lib/auth";
import {
  getAllCreditEntries,
  getAllDisputes,
  getAllPayments,
  getAllProjects,
  getAllReports,
  getAllUsers,
  getAdminStats,
  getStore,
} from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

const sections = {
  users: { title: "Utilisateurs", description: "Comptes, rôles, suspension et solde de crédits." },
  projects: { title: "Projets", description: "Visibility, clos et modération des annonces." },
  reports: { title: "Signalements", description: "Traitement des alertes de la communauté." },
  payments: { title: "Paiements", description: "Abonnements, factures et renouvellements." },
  verifications: { title: "Vérifications", description: "Badges d'identité des freelances." },
  disputes: { title: "Litiges", description: "Désaccords sur livraisons et paiements séquestrés." },
} as const;

type Section = keyof typeof sections;

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!(section in sections)) notFound();
  const activeSection = section as Section;
  const user = await requireRole("admin");
  const stats = getAdminStats();

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active={`/admin/${activeSection}`}
      title={sections[activeSection].title}
      description={sections[activeSection].description}
    >
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Utilisateurs" value={stats.users} />
        <Stat label="Projets" value={stats.projects} />
        <Stat label="Signalements ouverts" value={stats.openReports} />
        <Stat label="Volume encaissé" value={formatMoney(stats.revenue, "XAF")} />
      </div>

      <div className="mt-6">
        {activeSection === "users" ? <UsersSection currentAdminId={user.id} /> : null}
        {activeSection === "projects" ? <ProjectsSection /> : null}
        {activeSection === "reports" ? <ReportsSection /> : null}
        {activeSection === "payments" ? <PaymentsSection /> : null}
        {activeSection === "verifications" ? <VerificationsSection /> : null}
        {activeSection === "disputes" ? <DisputesSection /> : null}
      </div>
    </DashboardShell>
  );
}

function UsersSection({ currentAdminId }: { currentAdminId: string }) {
  const users = getAllUsers();
  const ledger = getAllCreditEntries();
  return (
    <div className="space-y-3">
      {users.map((user) => {
        const balance = ledger.filter((entry) => entry.userId === user.id).reduce((total, entry) => total + entry.delta, 0);
        return (
          <Card key={user.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar name={user.name} />
                <div>
                  <p className="font-bold text-ink">{user.name}</p>
                  <p className="text-sm text-muted">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill tone={user.role === "admin" ? "info" : "neutral"}>{user.role}</StatusPill>
                {user.banned ? <StatusPill tone="danger">Suspendu</StatusPill> : null}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
              <p className="tnum text-sm text-muted">
                Solde : <strong className="text-ink">{balance} crédits</strong>
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <form action={adjustCreditsAction} className="flex flex-wrap items-center gap-2">
                  <input type="hidden" name="userId" value={user.id} />
                  <input name="delta" type="number" className="w-20 rounded-lg border border-line bg-paper px-2.5 py-1.5 text-sm" defaultValue={10} />
                  <button type="submit" className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-bold text-ink">
                    Ajuster
                  </button>
                </form>
                {user.id !== currentAdminId ? (
                  <form action={toggleBanAction}>
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="banned" value={user.banned ? "false" : "true"} />
                    <button type="submit" className="rounded-full border border-red-200 px-3.5 py-1.5 text-sm font-bold text-red-700">
                      {user.banned ? "Réactiver" : "Suspendre"}
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function ProjectsSection() {
  const projects = getAllProjects();
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-bold text-ink">{project.title}</p>
              <p className="mt-1 text-sm text-muted">
                Publié le {formatDate(project.publishedAt)} · {project.quotesCount} offres · {project.viewsCount} vues
              </p>
            </div>
            <StatusPill tone={project.status === "open" ? "success" : "neutral"}>{project.status}</StatusPill>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <form action={moderateProjectAction}>
              <input type="hidden" name="projectId" value={project.id} />
              <input type="hidden" name="status" value={project.status === "hidden" ? "open" : "hidden"} />
              <button type="submit" className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-bold text-ink">
                {project.status === "hidden" ? "Réouvrir" : "Masquer"}
              </button>
            </form>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ReportsSection() {
  const reports = getAllReports();
  if (reports.length === 0) {
    return <EmptyState title="Aucun signalement" description="Les signalements de la communauté apparaîtront ici." />;
  }
  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <Card key={report.id}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold text-ink">{report.reason}</p>
                <StatusPill tone={report.status === "open" ? "warning" : "success"}>{report.status}</StatusPill>
              </div>
              <p className="mt-1 text-sm text-muted">
                {report.targetType} · {report.targetId} · {formatDate(report.createdAt)}
              </p>
              {report.details ? <p className="mt-2 text-sm text-ink-soft">{report.details}</p> : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <form action={resolveReportAction}>
                <input type="hidden" name="reportId" value={report.id} />
                <input type="hidden" name="status" value="resolved" />
                <button type="submit" className="rounded-full bg-ink px-3.5 py-1.5 text-sm font-bold text-paper">
                  Résoudre
                </button>
              </form>
              <form action={resolveReportAction}>
                <input type="hidden" name="reportId" value={report.id} />
                <input type="hidden" name="status" value="dismissed" />
                <button type="submit" className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-bold text-ink">
                  Rejeter
                </button>
              </form>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function VerificationsSection() {
  const users = getAllUsers().filter((user) => user.role === "freelance");
  const profiles = getStore().freelanceProfiles;
  return (
    <div className="space-y-3">
      {users.map((user) => {
        const profile = profiles.find((item) => item.userId === user.id);
        return (
          <Card key={user.id}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar name={user.name} />
                <div>
                  <p className="font-bold text-ink">{user.name}</p>
                  <p className="text-sm text-muted">{profile?.title || "Profil incomplet"}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {user.identityVerified ? <StatusPill tone="success">Vérifié</StatusPill> : <StatusPill tone="warning">À vérifier</StatusPill>}
                <form action={verifyProfileAction}>
                  <input type="hidden" name="userId" value={user.id} />
                  <input type="hidden" name="verified" value={user.identityVerified ? "false" : "true"} />
                  <button type="submit" className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-bold text-ink">
                    {user.identityVerified ? "Retirer le badge" : "Vérifier"}
                  </button>
                </form>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function DisputesSection() {
  const disputes = getAllDisputes();
  const data = getStore();
  if (disputes.length === 0) {
    return <EmptyState title="Aucun litige" description="Les litiges ouverts apparaîtront ici." />;
  }
  return (
    <div className="space-y-3">
      {disputes.map((dispute) => {
        const project = data.projects.find((item) => item.id === dispute.projectId);
        const tone = dispute.status === "open" ? "warning" : dispute.status === "resolved" ? "success" : "neutral";
        return (
          <Card key={dispute.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-ink">{dispute.reason}</p>
                  <StatusPill tone={tone}>{dispute.status}</StatusPill>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {project?.title ?? "Mission"} · {formatDate(dispute.createdAt)}
                </p>
                {dispute.details ? <p className="mt-2 text-sm text-ink-soft">{dispute.details}</p> : null}
              </div>
              {dispute.status === "open" || dispute.status === "reviewing" ? (
                <div className="flex flex-wrap gap-2">
                  <form action={resolveDisputeAction}>
                    <input type="hidden" name="disputeId" value={dispute.id} />
                    <input type="hidden" name="status" value="resolved" />
                    <button type="submit" className="rounded-full bg-ink px-3.5 py-1.5 text-sm font-bold text-paper">
                      Libérer le paiement
                    </button>
                  </form>
                  <form action={resolveDisputeAction}>
                    <input type="hidden" name="disputeId" value={dispute.id} />
                    <input type="hidden" name="status" value="rejected" />
                    <button type="submit" className="rounded-full border border-red-200 px-3.5 py-1.5 text-sm font-bold text-red-700">
                      Rembourser
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function PaymentsSection() {
  const payments = getAllPayments();
  return (
    <div>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-ink">Renouvellements de 30 jours</h2>
            <p className="mt-1 text-sm text-muted">Crédite les comptes dont la période est terminée.</p>
          </div>
          <form action={renewSubscriptionsAction}>
            <button type="submit" className="rounded-full bg-amber-strong px-4 py-2 text-sm font-bold text-paper">
              Lancer le renouvellement
            </button>
          </form>
        </div>
      </Card>
      <div className="mt-4 space-y-3">
        {payments.map((payment) => (
          <Card key={payment.id}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="tnum font-bold text-ink">{formatMoney(payment.amount, payment.currency)}</p>
                <p className="mt-1 text-sm text-muted">
                  {payment.planCode} · {payment.provider.replace("_", " ")} · {formatDate(payment.createdAt)}
                </p>
              </div>
              <StatusPill tone={payment.status === "succeeded" ? "success" : "warning"}>{payment.status}</StatusPill>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
