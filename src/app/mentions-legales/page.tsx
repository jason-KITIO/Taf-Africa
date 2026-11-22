import { SiteFrame } from "@/components/site-frame";
import { Card, PageHeader } from "@/components/ui";

export const metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader
          eyebrow="Informations légales"
          title="Mentions légales"
          description="Éditeur, hébergement et responsabilité de la plateforme Taf Africa."
        />
        <div className="mt-8 space-y-4">
          <Card>
            <h2 className="text-lg font-bold text-ink">Éditeur</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Taf Africa — marketplace de mise en relation entre clients et freelances d&apos;Afrique francophone.
              Site officiel : taf-africa.com.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-ink">Hébergement</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Les informations d&apos;hébergement seront renseignées ici lors de la mise en production.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-ink">Responsabilité</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Taf Africa facilite la mise en relation. Les modalités d&apos;exécution des missions relèvent du client et du freelance, dans le cadre des présentes conditions.
            </p>
          </Card>
        </div>
      </div>
    </SiteFrame>
  );
}
