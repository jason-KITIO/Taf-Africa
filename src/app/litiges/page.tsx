import { DashboardShell } from "@/components/dashboard-shell";
import { DisputeForm } from "@/components/v2-forms";
import { Card, EmptyState, SectionHeading, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getDisputesForUser, getStore } from "@/lib/demo-store";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

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
      <section>
        <SectionHeading title="Signaler un problème" description="Ouvrez un litige sur une mission acceptée." />
        {openQuotes.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Aucun litige à ouvrir" description="Vous n'avez aucune mission acceptée nécessitant un litige." />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {openQuotes.map((quote) => {
              const project = data.projects.find((item) => item.id === quote.projectId);
              return (
                <Card key={quote.id}>
                  <p className="font-bold text-ink">{project?.title ?? "Mission"}</p>
                  <p className="mt-1 text-sm text-muted">Ouvert le {formatDate(quote.createdAt)}</p>
                  <div className="mt-4 max-w-xl">
                    <DisputeForm quoteId={quote.id} />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-10">
        <SectionHeading title="Mes litiges" />
        {disputes.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Aucun litige" description="Aucun litige n'est associé à votre compte." />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {disputes.map((dispute) => {
              const project = data.projects.find((item) => item.id === dispute.projectId);
              const tone = dispute.status === "open" ? "warning" : dispute.status === "resolved" ? "success" : "neutral";
              return (
                <Card key={dispute.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-ink">{dispute.reason}</p>
                      <p className="mt-1 text-sm text-muted">
                        {project?.title ?? "Mission"} · {formatDate(dispute.createdAt)}
                      </p>
                    </div>
                    <StatusPill tone={tone}>{dispute.status}</StatusPill>
                  </div>
                  {dispute.details ? <p className="mt-3 text-sm text-ink-soft">{dispute.details}</p> : null}
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
