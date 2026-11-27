import { DashboardShell } from "@/components/dashboard-shell";
import { ReviewForm } from "@/components/v2-forms";
import { Avatar, Card, EmptyState, SectionHeading, StatusPill } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getStore } from "@/lib/demo-store";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AvisPage() {
  const user = await requireUser();
  const data = getStore();
  const toReview = user.role === "client"
    ? data.quotes.filter(
        (quote) =>
          quote.status === "accepted" &&
          !data.reviews.some((review) => review.quoteId === quote.id) &&
          data.projects.find((project) => project.id === quote.projectId)?.clientId === user.id,
      )
    : [];
  const reviews = user.role === "freelance"
    ? data.reviews.filter((review) => review.freelanceId === user.id)
    : data.reviews.filter((review) => review.clientId === user.id);

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/avis"
      title="Avis et réputation"
      description="Les avis ne peuvent être laissés qu'après une mission acceptée et financée."
    >
      {toReview.length ? (
        <section className="space-y-4">
          <SectionHeading title="Missions à évaluer" />
          <Card>
            <div className="divide-y divide-line">
              {toReview.map((quote) => {
                const project = data.projects.find((item) => item.id === quote.projectId);
                const freelance = data.users.find((item) => item.id === quote.freelanceId);
                return (
                  <div key={quote.id} className="min-w-0 py-4 first:pt-0 last:pb-0">
                    <h2 className="break-words text-base font-bold text-ink">{project?.title ?? "Mission"}</h2>
                    <p className="mt-1 break-words text-sm text-muted">Freelance : {freelance?.name ?? "Membre"}</p>
                    <div className="mt-4">
                      <ReviewForm quote={quote} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>
      ) : null}

      <section className="mt-8 space-y-4">
        <SectionHeading title={user.role === "freelance" ? "Avis reçus" : "Avis donnés"} />
        {reviews.length === 0 ? (
          <EmptyState
            title="Aucun avis pour le moment"
            description="Les avis apparaîtront ici après la livraison d'une mission financée."
          />
        ) : (
          <Card>
            <div className="divide-y divide-line">
              {reviews.map((review) => {
                const project = data.projects.find((item) => item.id === review.projectId);
                const client = data.users.find((item) => item.id === review.clientId);
                return (
                  <article key={review.id} className="flex min-w-0 gap-3 py-4 first:pt-0 last:pb-0">
                    <Avatar name={client?.name ?? "Client"} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="break-words text-sm font-bold text-ink">{client?.name ?? "Client"}</p>
                        <StatusPill tone="info">
                          <span className="tnum">{review.rating}/5</span>
                        </StatusPill>
                      </div>
                      <p className="mt-1 break-words text-sm text-muted">
                        {project?.title ?? "Mission"} · <span className="tnum">{formatDate(review.createdAt)}</span>
                      </p>
                      <p className="mt-3 break-words text-sm leading-relaxed text-ink-soft">{review.comment}</p>
                    </div>
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
