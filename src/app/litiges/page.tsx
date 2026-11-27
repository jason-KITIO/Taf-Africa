import { DashboardShell } from "@/components/dashboard-shell";
import { DisputeForm } from "@/components/v2-forms";
import { Card, EmptyState, SectionHeading, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getDisputesForUser, getStore } from "@/lib/demo-store";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

const disputeStatus: Record<string, { label: string; tone: StatusTone }> = {
  open: { label: "Ouvert", tone: "warning" },
  reviewing: { label: "En examen", tone: "info" },
  resolved: { label: "Résolu", tone: "success" },
  rejected: { label: "Rejeté", tone: "danger" },
};

export default async function LitigesPage() {
  const user = await requireUser();
  const data = getStore();
  const disputes = getDisputesForUser(user.id);
  const openQuotes = data.quotes.filter((quote) => {
    if (quote.status !== "accepted") return false;
    const project = data.projects.find((item) => item.id === quote.projectId);
    const involved = project?.clientId === user.id || quote.freelanceId === user.id;
    const hasOpen = data.disputes.some(
      (dispute) => dispute.quoteId === quote.id && dispute.status === "open",
    );
    return involved && !hasOpen;
  });

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/litiges"
      title="Litiges"
      description="Un désaccord sur une livraison ou un paiement est examiné par la modération."
    >
      <section className="space-y-4">
        <SectionHeading title="Signaler un problème" description="Ouvrez un litige sur une mission acceptée." />
        {openQuotes.length === 0 ? (
          <EmptyState title="Aucun litige à ouvrir" description="Vous n'avez aucune mission acceptée nécessitant un litige." />
        ) : (
          <Card>
            <div className="divide-y divide-line">
              {openQuotes.map((quote) => {
                const project = data.projects.find((item) => item.id === quote.projectId);
                return (
                  <div key={quote.id} className="min-w-0 py-4 first:pt-0 last:pb-0">
                    <h2 className="break-words text-base font-bold text-ink">{project?.title ?? "Mission"}</h2>
                    <p className="tnum mt-1 text-sm text-muted">Ouvert le {formatDate(quote.createdAt)}</p>
                    <div className="mt-4">
                      <DisputeForm quoteId={quote.id} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </section>

      <section className="mt-8 space-y-4">
        <SectionHeading title="Mes litiges" />
        {disputes.length === 0 ? (
          <EmptyState title="Aucun litige" description="Aucun litige n'est associé à votre compte." />
        ) : (
          <Card>
            <div className="divide-y divide-line">
              {disputes.map((dispute) => {
                const project = data.projects.find((item) => item.id === dispute.projectId);
                const status = disputeStatus[dispute.status] ?? { label: "Litige", tone: "neutral" as StatusTone };
                return (
                  <article key={dispute.id} className="min-w-0 py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h2 className="break-words text-base font-bold text-ink">{dispute.reason}</h2>
                        <p className="mt-1 break-words text-sm text-muted">
                          {project?.title ?? "Mission"} · <span className="tnum">{formatDate(dispute.createdAt)}</span>
                        </p>
                      </div>
                      <StatusPill tone={status.tone}>{status.label}</StatusPill>
                    </div>
                    {dispute.details ? (
                      <p className="mt-3 break-words text-sm leading-relaxed text-ink-soft">{dispute.details}</p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </Card>
        )}
      </section>
    </DashboardShell>
  );
}
