import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import { QuoteForm, ReportForm } from "@/components/forms";
import { Avatar, ButtonLink, StatusPill } from "@/components/ui";
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
  const revealClient =
    user && user.role !== "client" && canViewClientProfile(project.clientId);
  const myQuote =
    user?.role === "freelance"
      ? getStore().quotes.find(
          (quote) =>
            quote.projectId === project.id && quote.freelanceId === user.id,
        )
      : undefined;
  const premiumCount =
    user?.role === "freelance"
      ? getStore().quotes.filter(
          (quote) => quote.projectId === project.id && quote.type === "premium",
        ).length
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
        <Link
          href="/projets"
          className="text-sm font-bold text-teal hover:text-ink"
        >
          ← Tous les projets
        </Link>

        <header className="mt-6 min-w-0">
          <p className="eyebrow">Appel d&apos;offres</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusPill
              tone={project.status === "open" ? "success" : "neutral"}
            >
              {project.status === "open" ? "Ouvert aux offres" : project.status}
            </StatusPill>
            <span className="text-sm text-muted">
              Publié le {formatDate(project.publishedAt)}
            </span>
            <span className="tnum text-sm text-muted">
              · {project.viewsCount} vues
            </span>
          </div>
          <h1 className="display mt-4 text-[2rem] text-ink sm:text-[2.5rem]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">
            {project.description}
          </p>
        </header>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              <div className="bg-panel px-5 py-4">
                <dt className="eyebrow">Budget</dt>
                <dd className="tnum mt-2 text-lg font-extrabold tracking-[-0.02em] text-ink">
                  {formatMoney(project.budgetMin, project.currency)} –{" "}
                  {formatMoney(project.budgetMax, project.currency)}
                </dd>
              </div>
              <div className="bg-panel px-5 py-4">
                <dt className="eyebrow">Délai</dt>
                <dd className="tnum mt-2 text-lg font-extrabold tracking-[-0.02em] text-ink">
                  {project.deadlineDays} jours
                </dd>
              </div>
              <div className="bg-panel px-5 py-4">
                <dt className="eyebrow">Offres reçues</dt>
                <dd className="tnum mt-2 text-lg font-extrabold tracking-[-0.02em] text-ink">
                  {project.quotesCount}
                </dd>
              </div>
            </dl>

            <section className="mt-10">
              <p className="eyebrow">Compétences recherchées</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <li
                    key={skill}
                    className="chip chip-solid px-3 py-1.5 text-sm font-semibold text-ink-soft"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            {project.attachmentNames.length > 0 ? (
              <section className="mt-10">
                <p className="eyebrow">Fichiers joints</p>
                <ul className="mt-3 divide-y divide-line border-t border-line">
                  {project.attachmentNames.map((file) => (
                    <li
                      key={file}
                      className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm"
                    >
                      <span className="min-w-0 break-all font-semibold text-ink">
                        {file}
                      </span>
                      <span className="chip">Démo</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="section-rule mt-10 pt-8">
              <p className="eyebrow">Freelances recommandés</p>
              <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-ink">
                Profils à consulter
              </h2>
              <p className="mt-1 text-sm text-muted">
                Classement basé sur les compétences, la ville et la réputation.
              </p>
              <ul className="mt-5 divide-y divide-line border-t border-line">
                {getRecommendedFreelancers(project.id).map((entry) => (
                  <li
                    key={entry.profile.userId}
                    className="flex flex-wrap items-center gap-4 py-5"
                  >
                    <Avatar name={entry.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/freelances/${entry.profile.slug}`}
                          className="font-bold text-ink hover:text-teal"
                        >
                          {entry.name}
                        </Link>
                        {entry.profile.verified ? (
                          <StatusPill tone="success">Vérifié</StatusPill>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-muted">
                        {entry.profile.title || "Freelance"}
                      </p>
                    </div>
                    <p className="tnum text-xs leading-relaxed text-muted">
                      {entry.reason}
                      {entry.reviewCount ? ` · ${entry.rating}/5` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="section-rule mt-10 pt-8">
              <p className="eyebrow">Client</p>
              <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-ink">
                Commanditaire du projet
              </h2>
              <p className="mt-1 text-sm text-muted">
                Les coordonnées ne sont visibles qu&apos;avec un abonnement
                actif.
              </p>
              <div className="panel-quiet mt-5 p-5">
                <div className="flex items-center gap-3">
                  <Avatar name={client?.name ?? "Client"} />
                  <div className="min-w-0">
                    <p className="break-words font-bold text-ink">
                      {client?.name ?? "Client Taf Africa"}
                    </p>
                    <p className="text-sm text-muted">
                      {revealClient
                        ? `${clientProfile?.companyName || "Client"} · ${clientProfile?.city || "Afrique"}`
                        : "Profil masqué"}
                    </p>
                  </div>
                </div>
                {revealClient ? (
                  <p className="section-rule mt-4 pt-4 text-sm leading-relaxed text-ink-soft">
                    {clientProfile?.country || "Afrique francophone"} ·{" "}
                    {clientProfile?.phone || "Contact via la messagerie"}
                  </p>
                ) : (
                  <p className="section-rule mt-4 pt-4 text-sm leading-relaxed text-muted">
                    Ce client n&apos;a pas encore d&apos;abonnement permettant
                    de révéler ses coordonnées. Échangez via la messagerie
                    sécurisée.
                  </p>
                )}
              </div>
            </section>

            <section className="section-rule mt-10 pt-8">
              <p className="eyebrow">Modération</p>
              <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-ink">
                Signaler ce projet
              </h2>
              <p className="mt-1 text-sm text-muted">
                La modération examine chaque signalement.
              </p>
              <div className="panel-quiet mt-5 max-w-xl p-5">
                <ReportForm projectId={project.id} />
              </div>
            </section>
          </div>

          <aside className="panel min-w-0 p-5 lg:sticky lg:top-24 lg:self-start">
            {!user ? (
              <>
                <p className="eyebrow">Votre réponse</p>
                <h2 className="mt-3 text-xl font-bold tracking-[-0.02em] text-ink">
                  Prêt à répondre ?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Créez un compte freelance pour envoyer une offre avec vos
                  crédits.
                </p>
                <div className="mt-5 grid gap-2">
                  <ButtonLink
                    href="/inscription?role=freelance"
                    className="w-full"
                  >
                    Créer un compte
                  </ButtonLink>
                  <ButtonLink
                    href="/connexion"
                    variant="secondary"
                    className="w-full"
                  >
                    Se connecter
                  </ButtonLink>
                </div>
              </>
            ) : user.role === "client" ? (
              <>
                <p className="eyebrow">Votre annonce</p>
                <h2 className="mt-3 text-xl font-bold tracking-[-0.02em] text-ink">
                  Votre espace client
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Vous recevez les offres dans votre espace client.
                </p>
                <ButtonLink href="/offres" className="mt-5 w-full">
                  Voir les offres reçues
                </ButtonLink>
              </>
            ) : user.role === "admin" ? (
              <>
                <p className="eyebrow">Administration</p>
                <h2 className="mt-3 text-xl font-bold tracking-[-0.02em] text-ink">
                  Modération
                </h2>
                <ButtonLink href="/admin/projects" className="mt-5 w-full">
                  Gérer ce projet
                </ButtonLink>
              </>
            ) : myQuote ? (
              <>
                <p className="eyebrow">Votre réponse</p>
                <h2 className="mt-3 text-xl font-bold tracking-[-0.02em] text-ink">
                  Offre envoyée
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Statut :{" "}
                  {myQuote.status === "studied"
                    ? "offre étudiée par le client"
                    : myQuote.status}
                  .
                </p>
                {conversation ? (
                  <ButtonLink
                    href={`/messagerie/${conversation.id}`}
                    className="mt-5 w-full"
                  >
                    Ouvrir la conversation
                  </ButtonLink>
                ) : null}
              </>
            ) : project.status !== "open" ? (
              <>
                <p className="eyebrow">Votre réponse</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Ce projet n&apos;accepte plus d&apos;offres.
                </p>
              </>
            ) : (
              <>
                <p className="eyebrow">Votre réponse</p>
                <h2 className="mt-3 text-xl font-bold tracking-[-0.02em] text-ink">
                  Envoyer une offre
                </h2>
                <div className="section-rule mt-5 pt-5">
                  <QuoteForm
                    projectId={project.id}
                    credits={credits}
                    premiumCount={premiumCount}
                  />
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </SiteFrame>
  );
}
