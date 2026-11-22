import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import { QuoteForm, ReportForm } from "@/components/forms";
import { Avatar, ButtonLink, Card, SectionHeading, StatusPill } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import {
  canViewClientProfile,
  getClientProfile,
  getCreditBalance,
  getProjectById,
  getRecommendedFreelancers,
  getStore,
  incrementProjectViews,
} from "@/lib/demo-store";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectById(slug);
  if (!project || project.status === "hidden") notFound();
  const user = await getCurrentUser();
  if (user?.id !== project.clientId) incrementProjectViews(project.id);

  const client = getStore().users.find((item) => item.id === project.clientId);
  const clientProfile = getClientProfile(project.clientId);
  const revealClient = user && user.role !== "client" && canViewClientProfile(project.clientId);
  const myQuote = user?.role === "freelance"
    ? getStore().quotes.find((quote) => quote.projectId === project.id && quote.freelanceId === user.id)
    : undefined;
  const premiumCount = user?.role === "freelance"
    ? getStore().quotes.filter((quote) => quote.projectId === project.id && quote.type === "premium").length
    : 0;
  const credits = user?.role === "freelance" ? getCreditBalance(user.id) : 0;
  const conversation = user
    ? getStore().conversations.find(
        (item) => item.projectId === project.id && item.freelanceId === user.id,
      )
    : undefined;

  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Link href="/projets" className="text-sm font-semibold text-muted transition hover:text-amber-deep">
          ← Tous les projets
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill tone={project.status === "open" ? "success" : "neutral"}>
                {project.status === "open" ? "Ouvert aux offres" : project.status}
              </StatusPill>
              <span className="text-sm text-muted">Publié le {formatDate(project.publishedAt)}</span>
              <span className="text-sm text-muted">· {project.viewsCount} vues</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{project.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Card className="p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Budget</p>
                <p className="tnum mt-1 text-lg font-extrabold text-ink">
                  {formatMoney(project.budgetMin, project.currency)} – {formatMoney(project.budgetMax, project.currency)}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Délai</p>
                <p className="tnum mt-1 text-lg font-extrabold text-ink">{project.deadlineDays} jours</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Offres reçues</p>
                <p className="tnum mt-1 text-lg font-extrabold text-ink">{project.quotesCount}</p>
              </Card>
            </div>

            <div className="mt-8">
              <SectionHeading title="Compétences recherchées" />
              <div className="mt-3 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink-soft">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {project.attachmentNames.length > 0 ? (
              <div className="mt-8">
                <SectionHeading title="Fichiers joints" />
                <ul className="mt-3 space-y-2">
                  {project.attachmentNames.map((file) => (
                    <li key={file} className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm">
                      <span className="font-semibold text-ink">{file}</span>
                      <span className="text-muted">Démo</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-10 border-t border-line pt-8">
              <SectionHeading title="Freelances recommandés" description="Classement basé sur les compétences, la ville et la réputation." />
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {getRecommendedFreelancers(project.id).map((entry) => (
                  <Card key={entry.profile.userId} className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={entry.name} />
                      {entry.profile.verified ? <StatusPill tone="success">Vérifié</StatusPill> : null}
                    </div>
                    <Link href={`/freelances/${entry.profile.slug}`} className="mt-3 block font-bold text-ink hover:text-amber-deep">
                      {entry.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted">{entry.profile.title || "Freelance"}</p>
                    <p className="mt-2 text-xs text-muted">{entry.reason}{entry.reviewCount ? ` · ${entry.rating}/5` : ""}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <SectionHeading title="Client" description="Les coordonnées ne sont visibles qu'avec un abonnement actif." />
              <Card className="mt-4">
                <div className="flex items-center gap-3">
                  <Avatar name={client?.name ?? "Client"} />
                  <div>
                    <p className="font-bold text-ink">{client?.name ?? "Client Taf Africa"}</p>
                    <p className="text-sm text-muted">
                      {revealClient ? `${clientProfile?.companyName || "Client"} · ${clientProfile?.city || "Afrique"}` : "Profil masqué"}
                    </p>
                  </div>
                </div>
                {revealClient ? (
                  <p className="mt-4 text-sm text-ink-soft">
                    {clientProfile?.country || "Afrique francophone"} · {clientProfile?.phone || "Contact via la messagerie"}
                  </p>
                ) : (
                  <div className="mt-4 rounded-xl bg-sand/60 px-4 py-3 text-sm text-muted">
                    Ce client n&apos;a pas encore d&apos;abonnement permettant de révéler ses coordonnées. Échangez via la messagerie sécurisée.
                  </div>
                )}
              </Card>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <SectionHeading title="Signaler ce projet" description="La modération examine chaque signalement." />
              <div className="mt-4 max-w-xl">
                <ReportForm projectId={project.id} />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              {!user ? (
                <>
                  <h2 className="text-lg font-bold text-ink">Prêt à répondre ?</h2>
                  <p className="mt-2 text-sm text-muted">Créez un compte freelance pour envoyer une offre avec vos crédits.</p>
                  <div className="mt-4 grid gap-2">
                    <ButtonLink href="/inscription?role=freelance" className="w-full">Créer un compte</ButtonLink>
                    <ButtonLink href="/connexion" variant="secondary" className="w-full">Se connecter</ButtonLink>
                  </div>
                </>
              ) : user.role === "client" ? (
                <>
                  <h2 className="text-lg font-bold text-ink">Votre annonce</h2>
                  <p className="mt-2 text-sm text-muted">Vous recevez les offres dans votre espace client.</p>
                  <ButtonLink href="/offres" className="mt-4 w-full">Voir les offres reçues</ButtonLink>
                </>
              ) : user.role === "admin" ? (
                <>
                  <h2 className="text-lg font-bold text-ink">Modération</h2>
                  <ButtonLink href="/admin/projects" className="mt-4 w-full">Gérer ce projet</ButtonLink>
                </>
              ) : myQuote ? (
                <>
                  <h2 className="text-lg font-bold text-ink">Offre envoyée</h2>
                  <p className="mt-2 text-sm text-muted">
                    Statut : {myQuote.status === "studied" ? "offre étudiée par le client" : myQuote.status}.
                  </p>
                  {conversation ? (
                    <ButtonLink href={`/messagerie/${conversation.id}`} className="mt-4 w-full">Ouvrir la conversation</ButtonLink>
                  ) : null}
                </>
              ) : project.status !== "open" ? (
                <p className="text-sm text-muted">Ce projet n&apos;accepte plus d&apos;offres.</p>
              ) : (
                <QuoteForm projectId={project.id} credits={credits} premiumCount={premiumCount} />
              )}
            </Card>
          </aside>
        </div>
      </div>
    </SiteFrame>
  );
}
