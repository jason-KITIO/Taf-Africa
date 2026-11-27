import { SiteFrame } from "@/components/site-frame";

export const metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="min-w-0">
          <p className="eyebrow">Informations légales</p>
          <h1 className="display mt-4 text-[2rem] text-ink sm:text-[2.5rem]">
            Mentions légales
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Éditeur, hébergement et responsabilité de la plateforme Taf Africa.
          </p>
        </header>

        <div className="mt-10 divide-y divide-line border-t border-line">
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">01</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Éditeur</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Taf Africa — marketplace de mise en relation entre clients et freelances d&apos;Afrique francophone.
                Site officiel : taf-africa.com.
              </p>
            </div>
          </section>
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">02</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Hébergement</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Les informations d&apos;hébergement seront renseignées ici lors de la mise en production.
              </p>
            </div>
          </section>
          <section className="grid gap-3 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
            <p className="eyebrow tnum">03</p>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-ink">Responsabilité</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Taf Africa facilite la mise en relation. Les modalités d&apos;exécution des missions relèvent du client et du freelance, dans le cadre des présentes conditions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteFrame>
  );
}
