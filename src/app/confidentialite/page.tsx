import { SiteFrame } from "@/components/site-frame";

export const metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="min-w-0">
          <p className="eyebrow">Données personnelles</p>
          <h1 className="display mt-4 text-[2rem] text-ink sm:text-[2.5rem]">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Ce que Taf Africa collecte et pourquoi.
          </p>
        </header>

        <div className="mt-10 divide-y divide-line border-t border-line">
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">01</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Données collectées</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Nom, adresse e-mail, rôle, profil, projets, offres, messages de la messagerie et historique de facturation. Les mots de passe sont stockés sous forme de hash.
              </p>
            </div>
          </section>
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">02</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Utilisation</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Les données servent à la mise en relation, à la facturation, à la modération et aux alertes par compétence. Elles ne sont pas revendues.
              </p>
            </div>
          </section>
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">03</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Visibilité</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Le profil freelance public affiche les informations professionnelles. Les coordonnées d&apos;un client ne sont visibles que lorsque son abonnement le permet.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteFrame>
  );
}
