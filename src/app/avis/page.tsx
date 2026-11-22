import { DashboardShell } from "@/components/dashboard-shell";
import { ReviewForm } from "@/components/v2-forms";
import { Avatar, Card, EmptyState, SectionHeading } from "@/components/ui";
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
        <section>
          <SectionHeading title="Missions à évaluer" />
          <div className="mt-4 space-y-3">
            {toReview.map((quote) => {
              const project = data.projects.find((item) => item.id === quote.projectId);
              const freelance = data.users.find((item) => item.id === quote.freelanceId);
              return (
                <Card key={quote.id}>
                  <p className="font-bold text-ink">{project?.title ?? "Mission"}</p>
                  <p className="mt-1 text-sm text-muted">Freelance : {freelance?.name ?? "Membre"}</p>
                  <div className="mt-4 max-w-xl">
                    <ReviewForm quote={quote} />
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className={toReview.length ? "mt-10" : ""}>
        <SectionHeading title={user.role === "freelance" ? "Avis reçus" : "Avis donnés"} />
        {reviews.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Aucun avis pour le moment"
              description="Les avis apparaîtront ici après la livraison d'une mission financée."
            />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {reviews.map((review) => {
              const project = data.projects.find((item) => item.id === review.projectId);
              const client = data.users.find((item) => item.id === review.clientId);
              return (
                <Card key={review.id}>
                  <div className="flex items-start gap-3">
                    <Avatar name={client?.name ?? "Client"} />
                    <div className="min-w-0">
                      <p className="font-bold text-ink">{client?.name ?? "Client"} · {review.rating}/5</p>
                      <p className="mt-1 text-sm text-muted">{project?.title ?? "Mission"} · {formatDate(review.createdAt)}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{review.comment}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
