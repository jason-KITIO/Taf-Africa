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
import { AdminClientForm, AdminProjectForm } from "@/components/admin-forms";
import { Avatar, Card, EmptyState, Stat, StatusPill } from "@/components/ui";
import { requireRole } from "@/lib/auth";
import {
  getAllCreditEntries,
  getAllDisputes,
  getAllPayments,
  getCategories,
  getAllProjects,
  getAllReports,
  getAllUsers,
  getAdminStats,
  getStore,
} from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const sections = {
  creation: { title: "Création", description: "Créer des clients et publier des projets pour eux." },
  users: { title: "Utilisateurs", description: "Comptes, rôles, suspension et solde de crédits." },
  projects: { title: "Projets", description: "Visibility, clos et modération des annonces." },
  reports: { title: "Signalements", description: "Traitement des alertes de la communauté." },
  payments: { title: "Paiements", description: "Abonnements, factures et renouvellements." },
  verifications: { title: "Vérifications", description: "Badges d'identité des freelances." },
  disputes: { title: "Litiges", description: "Désaccords sur livraisons et paiements séquestrés." },
} as const;

type Section = keyof typeof sections;

type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    open: "Ouvert",
    hidden: "Masqué",
    reviewing: "En révision",
    resolved: "Résolu",
    dismissed: "Rejeté",
    rejected: "Rejeté",
    succeeded: "Payé",
  };
  return labels[status] ?? status;
}

function statusTone(status: string): StatusTone {
  if (status === "resolved" || status === "succeeded") return "success";
  if (status === "open") return "warning";
  if (status === "dismissed" || status === "rejected") return "danger";
  if (status === "reviewing") return "info";
  return "neutral";
}

function AdminTable({
  head,
  desktop,
  mobile,
}: {
  head: string[];
  desktop: React.ReactNode;
  mobile: React.ReactNode;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-panel-quiet">
            <tr className="border-b border-line">
              {head.map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-teal"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">{desktop}</tbody>
        </table>
      </div>
      <div className="divide-y divide-line md:hidden">{mobile}</div>
    </div>
  );
}

const cellClass = "px-4 py-3 align-middle text-sm text-ink-soft";
const actionClass = "action action-secondary w-full sm:w-auto";
const dangerClass =
  "action w-full border border-danger/40 bg-danger-soft text-danger hover:border-danger sm:w-auto";

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
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Utilisateurs" value={stats.users} />
        <Stat label="Projets" value={stats.projects} />
        <Stat label="Signalements ouverts" value={stats.openReports} />
        <Stat label="Volume encaissé" value={formatMoney(stats.revenue, "XAF")} />
      </div>

      <div className="mt-6">
        {activeSection === "creation" ? <CreationSection /> : null}
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

function CreationSection() {
  const clients = getAllUsers()
    .filter((user) => user.role === "client")
    .map((user) => ({ id: user.id, name: user.name, email: user.email }));
  const categories = getCategories().map((category) => ({ slug: category.slug, name: category.name }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <div className="border-b border-line pb-4">
          <p className="eyebrow">Nouveau compte</p>
          <h2 className="mt-2 text-lg font-bold tracking-[-0.02em] text-ink">Créer un client</h2>
          <p className="mt-1 text-sm text-muted">Le client pourra se connecter avec le mot de passe choisi.</p>
        </div>
        <div className="mt-4">
          <AdminClientForm />
        </div>
      </Card>
      <Card>
        <div className="border-b border-line pb-4">
          <p className="eyebrow">Nouvelle annonce</p>
          <h2 className="mt-2 text-lg font-bold tracking-[-0.02em] text-ink">Créer un projet</h2>
          <p className="mt-1 text-sm text-muted">Le projet est publié au nom du client sélectionné.</p>
        </div>
        <div className="mt-4">
          <AdminProjectForm clients={clients} categories={categories} />
        </div>
      </Card>
    </div>
  );
}

function UsersSection({ currentAdminId }: { currentAdminId: string }) {
  const users = getAllUsers();
  const ledger = getAllCreditEntries();

  const desktop = users.map((user) => {
    const balance = ledger.filter((entry) => entry.userId === user.id).reduce((total, entry) => total + entry.delta, 0);
    return (
      <tr key={user.id}>
        <td className={cellClass}>
          <div className="flex items-center gap-3">
            <Avatar name={user.name} className="size-9" />
            <div className="min-w-0">
              <p className="break-words font-bold text-ink">{user.name}</p>
              <p className="break-all text-xs text-muted">{user.email}</p>
            </div>
          </div>
        </td>
        <td className={cellClass}>
          <StatusPill tone={user.role === "admin" ? "info" : "neutral"}>
            <span className="capitalize">{user.role}</span>
          </StatusPill>
        </td>
        <td className={cellClass}>
          {user.banned ? <StatusPill tone="danger">Suspendu</StatusPill> : <span className="text-muted">Non suspendu</span>}
        </td>
        <td className={cn(cellClass, "tnum whitespace-nowrap")}>{balance} crédits</td>
        <td className={cellClass}>
          <div className="flex flex-wrap items-center gap-2">
            <form action={adjustCreditsAction} className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="userId" value={user.id} />
              <input
                name="delta"
                type="number"
                aria-label={`Ajustement des crédits de ${user.name}`}
                className="h-11 w-20 rounded-xl border border-line bg-matter px-2.5 text-sm text-ink outline-none focus:border-lime"
                defaultValue={10}
              />
              <button type="submit" className={actionClass}>Ajuster</button>
            </form>
            {user.id !== currentAdminId ? (
              <form action={toggleBanAction}>
                <input type="hidden" name="userId" value={user.id} />
                <input type="hidden" name="banned" value={user.banned ? "false" : "true"} />
                <button type="submit" className={dangerClass}>
                  {user.banned ? "Réactiver" : "Suspendre"}
                </button>
              </form>
            ) : null}
          </div>
        </td>
      </tr>
    );
  });

  const mobile = users.map((user) => {
    const balance = ledger.filter((entry) => entry.userId === user.id).reduce((total, entry) => total + entry.delta, 0);
    return (
      <div key={user.id} className="min-w-0 px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={user.name} className="size-9" />
            <div className="min-w-0">
              <p className="break-words text-sm font-bold text-ink">{user.name}</p>
              <p className="break-all text-xs text-muted">{user.email}</p>
            </div>
          </div>
          <StatusPill tone={user.role === "admin" ? "info" : "neutral"}>
            <span className="capitalize">{user.role}</span>
          </StatusPill>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3 text-xs">
          <div>
            <dt className="eyebrow">État</dt>
            <dd className="mt-1 text-ink-soft">{user.banned ? "Suspendu" : "Non suspendu"}</dd>
          </div>
          <div>
            <dt className="eyebrow">Solde</dt>
            <dd className="tnum mt-1 font-bold text-ink">{balance} crédits</dd>
          </div>
        </dl>
        <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
          <form action={adjustCreditsAction} className="flex flex-wrap items-center gap-2">
            <input type="hidden" name="userId" value={user.id} />
            <input
              name="delta"
              type="number"
              aria-label={`Ajustement des crédits de ${user.name}`}
              className="h-11 w-20 rounded-xl border border-line bg-matter px-2.5 text-sm text-ink outline-none focus:border-lime"
              defaultValue={10}
            />
            <button type="submit" className={actionClass}>Ajuster</button>
          </form>
          {user.id !== currentAdminId ? (
            <form action={toggleBanAction}>
              <input type="hidden" name="userId" value={user.id} />
              <input type="hidden" name="banned" value={user.banned ? "false" : "true"} />
              <button type="submit" className={dangerClass}>
                {user.banned ? "Réactiver" : "Suspendre"}
              </button>
            </form>
          ) : null}
        </div>
      </div>
    );
  });

  return <AdminTable head={["Utilisateur", "Rôle", "État", "Solde", "Actions"]} desktop={desktop} mobile={mobile} />;
}

function ProjectsSection() {
  const projects = getAllProjects();

  const desktop = projects.map((project) => (
    <tr key={project.id}>
      <td className={cellClass}>
        <p className="break-words font-bold text-ink">{project.title}</p>
        <p className="tnum mt-1 text-xs text-muted">
          Publié le {formatDate(project.publishedAt)} · {project.quotesCount} offres · {project.viewsCount} vues
        </p>
      </td>
      <td className={cn(cellClass, "whitespace-nowrap")}>
        <StatusPill tone={statusTone(project.status)}>{statusLabel(project.status)}</StatusPill>
      </td>
      <td className={cellClass}>
        <form action={moderateProjectAction}>
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="status" value={project.status === "hidden" ? "open" : "hidden"} />
          <button type="submit" className={actionClass}>
            {project.status === "hidden" ? "Réouvrir" : "Masquer"}
          </button>
        </form>
      </td>
    </tr>
  ));

  const mobile = projects.map((project) => (
    <div key={project.id} className="min-w-0 px-4 py-4 sm:px-5">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 break-words text-sm font-bold text-ink">{project.title}</p>
        <StatusPill tone={statusTone(project.status)}>{statusLabel(project.status)}</StatusPill>
      </div>
      <p className="tnum mt-2 text-xs leading-relaxed text-muted">
        Publié le {formatDate(project.publishedAt)} · {project.quotesCount} offres · {project.viewsCount} vues
      </p>
      <form action={moderateProjectAction} className="mt-3 border-t border-line pt-3">
        <input type="hidden" name="projectId" value={project.id} />
        <input type="hidden" name="status" value={project.status === "hidden" ? "open" : "hidden"} />
        <button type="submit" className={actionClass}>
          {project.status === "hidden" ? "Réouvrir" : "Masquer"}
        </button>
      </form>
    </div>
  ));

  return <AdminTable head={["Projet", "Statut", "Actions"]} desktop={desktop} mobile={mobile} />;
}

function ReportsSection() {
  const reports = getAllReports();
  if (reports.length === 0) {
    return <EmptyState title="Aucun signalement" description="Les signalements de la communauté apparaîtront ici." />;
  }

  const desktop = reports.map((report) => (
    <tr key={report.id}>
      <td className={cellClass}>
        <div className="flex flex-wrap items-center gap-2">
          <p className="break-words font-bold text-ink">{report.reason}</p>
          <StatusPill tone={statusTone(report.status)}>{statusLabel(report.status)}</StatusPill>
        </div>
        <p className="break-all text-xs text-muted">
          {report.targetType} · {report.targetId} · {formatDate(report.createdAt)}
        </p>
        {report.details ? <p className="mt-2 break-words text-xs leading-relaxed text-ink-soft">{report.details}</p> : null}
      </td>
      <td className={cellClass}>
        <div className="flex flex-wrap gap-2">
          <form action={resolveReportAction}>
            <input type="hidden" name="reportId" value={report.id} />
            <input type="hidden" name="status" value="resolved" />
            <button type="submit" className={actionClass}>Résoudre</button>
          </form>
          <form action={resolveReportAction}>
            <input type="hidden" name="reportId" value={report.id} />
            <input type="hidden" name="status" value="dismissed" />
            <button type="submit" className={dangerClass}>Rejeter</button>
          </form>
        </div>
      </td>
    </tr>
  ));

  const mobile = reports.map((report) => (
    <div key={report.id} className="min-w-0 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="min-w-0 break-words text-sm font-bold text-ink">{report.reason}</p>
        <StatusPill tone={statusTone(report.status)}>{statusLabel(report.status)}</StatusPill>
      </div>
      <p className="break-all text-xs text-muted">
        {report.targetType} · {report.targetId} · {formatDate(report.createdAt)}
      </p>
      {report.details ? <p className="mt-2 break-words text-sm leading-relaxed text-ink-soft">{report.details}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
        <form action={resolveReportAction}>
          <input type="hidden" name="reportId" value={report.id} />
          <input type="hidden" name="status" value="resolved" />
          <button type="submit" className={actionClass}>Résoudre</button>
        </form>
        <form action={resolveReportAction}>
          <input type="hidden" name="reportId" value={report.id} />
          <input type="hidden" name="status" value="dismissed" />
          <button type="submit" className={dangerClass}>Rejeter</button>
        </form>
      </div>
    </div>
  ));

  return <AdminTable head={["Signalement", "Actions"]} desktop={desktop} mobile={mobile} />;
}

function VerificationsSection() {
  const users = getAllUsers().filter((user) => user.role === "freelance");
  const profiles = getStore().freelanceProfiles;

  const desktop = users.map((user) => {
    const profile = profiles.find((item) => item.userId === user.id);
    return (
      <tr key={user.id}>
        <td className={cellClass}>
          <div className="flex items-center gap-3">
            <Avatar name={user.name} className="size-9" />
            <div className="min-w-0">
              <p className="break-words font-bold text-ink">{user.name}</p>
              <p className="break-words text-xs text-muted">{profile?.title || "Profil incomplet"}</p>
            </div>
          </div>
        </td>
        <td className={cn(cellClass, "whitespace-nowrap")}>
          {user.identityVerified ? <StatusPill tone="success">Vérifié</StatusPill> : <StatusPill tone="warning">À vérifier</StatusPill>}
        </td>
        <td className={cellClass}>
          <form action={verifyProfileAction}>
            <input type="hidden" name="userId" value={user.id} />
            <input type="hidden" name="verified" value={user.identityVerified ? "false" : "true"} />
            <button type="submit" className={actionClass}>
              {user.identityVerified ? "Retirer le badge" : "Vérifier"}
            </button>
          </form>
        </td>
      </tr>
    );
  });

  const mobile = users.map((user) => {
    const profile = profiles.find((item) => item.userId === user.id);
    return (
      <div key={user.id} className="min-w-0 px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={user.name} className="size-9" />
            <div className="min-w-0">
              <p className="break-words text-sm font-bold text-ink">{user.name}</p>
              <p className="break-words text-xs text-muted">{profile?.title || "Profil incomplet"}</p>
            </div>
          </div>
          {user.identityVerified ? <StatusPill tone="success">Vérifié</StatusPill> : <StatusPill tone="warning">À vérifier</StatusPill>}
        </div>
        <form action={verifyProfileAction} className="mt-3 border-t border-line pt-3">
          <input type="hidden" name="userId" value={user.id} />
          <input type="hidden" name="verified" value={user.identityVerified ? "false" : "true"} />
          <button type="submit" className={actionClass}>
            {user.identityVerified ? "Retirer le badge" : "Vérifier"}
          </button>
        </form>
      </div>
    );
  });

  return <AdminTable head={["Freelance", "Identité", "Actions"]} desktop={desktop} mobile={mobile} />;
}

function DisputesSection() {
  const disputes = getAllDisputes();
  const data = getStore();
  if (disputes.length === 0) {
    return <EmptyState title="Aucun litige" description="Les litiges ouverts apparaîtront ici." />;
  }

  const desktop = disputes.map((dispute) => {
    const project = data.projects.find((item) => item.id === dispute.projectId);
    return (
      <tr key={dispute.id}>
        <td className={cellClass}>
          <div className="flex flex-wrap items-center gap-2">
            <p className="break-words font-bold text-ink">{dispute.reason}</p>
            <StatusPill tone={statusTone(dispute.status)}>{statusLabel(dispute.status)}</StatusPill>
          </div>
          <p className="break-words text-xs text-muted">
            {project?.title ?? "Mission"} · {formatDate(dispute.createdAt)}
          </p>
          {dispute.details ? <p className="mt-2 break-words text-xs leading-relaxed text-ink-soft">{dispute.details}</p> : null}
        </td>
        <td className={cellClass}>
          {dispute.status === "open" || dispute.status === "reviewing" ? (
            <div className="flex flex-wrap gap-2">
              <form action={resolveDisputeAction}>
                <input type="hidden" name="disputeId" value={dispute.id} />
                <input type="hidden" name="status" value="resolved" />
                <button type="submit" className={actionClass}>Libérer le paiement</button>
              </form>
              <form action={resolveDisputeAction}>
                <input type="hidden" name="disputeId" value={dispute.id} />
                <input type="hidden" name="status" value="rejected" />
                <button type="submit" className={dangerClass}>Rembourser</button>
              </form>
            </div>
          ) : (
            <span className="text-muted">—</span>
          )}
        </td>
      </tr>
    );
  });

  const mobile = disputes.map((dispute) => {
    const project = data.projects.find((item) => item.id === dispute.projectId);
    return (
      <div key={dispute.id} className="min-w-0 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="min-w-0 break-words text-sm font-bold text-ink">{dispute.reason}</p>
          <StatusPill tone={statusTone(dispute.status)}>{statusLabel(dispute.status)}</StatusPill>
        </div>
        <p className="break-words text-xs text-muted">
          {project?.title ?? "Mission"} · {formatDate(dispute.createdAt)}
        </p>
        {dispute.details ? <p className="mt-2 break-words text-sm leading-relaxed text-ink-soft">{dispute.details}</p> : null}
        {dispute.status === "open" || dispute.status === "reviewing" ? (
          <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
            <form action={resolveDisputeAction}>
              <input type="hidden" name="disputeId" value={dispute.id} />
              <input type="hidden" name="status" value="resolved" />
              <button type="submit" className={actionClass}>Libérer le paiement</button>
            </form>
            <form action={resolveDisputeAction}>
              <input type="hidden" name="disputeId" value={dispute.id} />
              <input type="hidden" name="status" value="rejected" />
              <button type="submit" className={dangerClass}>Rembourser</button>
            </form>
          </div>
        ) : null}
      </div>
    );
  });

  return <AdminTable head={["Litige", "Actions"]} desktop={desktop} mobile={mobile} />;
}

function PaymentsSection() {
  const payments = getAllPayments();

  const desktop = payments.map((payment) => (
    <tr key={payment.id}>
      <td className={cn(cellClass, "tnum font-bold text-ink")}>{formatMoney(payment.amount, payment.currency)}</td>
      <td className={cellClass}>
        <p className="break-words">{payment.planCode ?? "Paiement"}</p>
        <p className="break-words text-xs text-muted">
          {payment.provider.replace("_", " ")} · {formatDate(payment.createdAt)}
        </p>
      </td>
      <td className={cn(cellClass, "whitespace-nowrap")}>
        <StatusPill tone={statusTone(payment.status)}>{statusLabel(payment.status)}</StatusPill>
      </td>
    </tr>
  ));

  const mobile = payments.map((payment) => (
    <div key={payment.id} className="min-w-0 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="tnum break-words text-sm font-bold text-ink">{formatMoney(payment.amount, payment.currency)}</p>
        <StatusPill tone={statusTone(payment.status)}>{statusLabel(payment.status)}</StatusPill>
      </div>
      <p className="mt-2 break-words text-sm text-ink-soft">{payment.planCode ?? "Paiement"}</p>
      <p className="break-words text-xs text-muted">
        {payment.provider.replace("_", " ")} · {formatDate(payment.createdAt)}
      </p>
    </div>
  ));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow">Cycle de facturation</p>
            <h2 className="mt-2 text-lg font-bold tracking-[-0.02em] text-ink">Renouvellements de 30 jours</h2>
            <p className="mt-1 text-sm text-muted">Crédite les comptes dont la période est terminée.</p>
          </div>
          <form action={renewSubscriptionsAction}>
            <button type="submit" className="action action-primary w-full sm:w-auto">
              Lancer le renouvellement
            </button>
          </form>
        </div>
      </Card>
      <AdminTable head={["Montant", "Détail", "Statut"]} desktop={desktop} mobile={mobile} />
    </div>
  );
}
