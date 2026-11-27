import { SiteFrame } from "@/components/site-frame";

export const metadata = { title: "Conditions générales d'utilisation" };

export default function CguPage() {
  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="min-w-0">
          <p className="eyebrow">Cadre d&apos;utilisation</p>
          <h1 className="display mt-4 text-[2rem] text-ink sm:text-[2.5rem]">
            Conditions générales d&apos;utilisation
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Les règles simples qui protègent les clients, les freelances et la plateforme.
          </p>
        </header>

        <div className="mt-10 divide-y divide-line border-t border-line">
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">01</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Comptes et rôles</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Chaque membre dispose d&apos;un compte client, freelance ou administrateur. Un compte suspendu ne peut plus accéder aux services.
              </p>
            </div>
          </section>
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">02</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Projets et offres</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Les clients publient des projets réels. Les freelances répondent avec une offre simple ou premium. Une offre simple consomme 1 crédit, une offre premium 15 crédits, avec un maximum de 4 offres premium.
              </p>
            </div>
          </section>
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">03</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Messagerie sécurisée</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Les échanges restent sur la plateforme. Les adresses e-mail, numéros de téléphone et liens WhatsApp détectés dans les messages sont bloqués pour éviter les contours.
              </p>
            </div>
          </section>
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">04</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Abonnements</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Les formules sont renouvelées tous les 30 jours. La résiliation prend effet à la fin de la période en cours. Les crédits non utilisés expirent au renouvellement.
              </p>
            </div>
          </section>
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">05</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Signalements</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Tout projet, profil, message ou offre peut être signalé. L&apos;équipe de modération peut masquer un contenu ou suspendre un compte.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteFrame>
  );
}
