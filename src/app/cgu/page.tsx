import { SiteFrame } from "@/components/site-frame";
import { Card, PageHeader } from "@/components/ui";

export const metadata = { title: "Conditions générales d'utilisation" };

export default function CguPage() {
  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader
          eyebrow="Cadre d'utilisation"
          title="Conditions générales d'utilisation"
          description="Les règles simples qui protègent les clients, les freelances et la plateforme."
        />
        <div className="mt-8 space-y-4">
          <Card>
            <h2 className="text-lg font-bold text-ink">Comptes et rôles</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Chaque membre dispose d&apos;un compte client, freelance ou administrateur. Un compte suspendu ne peut plus accéder aux services.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-ink">Projets et offres</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Les clients publient des projets réels. Les freelances répondent avec une offre simple ou premium. Une offre simple consomme 1 crédit, une offre premium 15 crédits, avec un maximum de 4 offres premium.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-ink">Messagerie sécurisée</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Les échanges restent sur la plateforme. Les adresses e-mail, numéros de téléphone et liens WhatsApp détectés dans les messages sont bloqués pour éviter les contours.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-ink">Abonnements</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Les formules sont renouvelées tous les 30 jours. La résiliation prend effet à la fin de la période en cours. Les crédits non utilisés expirent au renouvellement.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-ink">Signalements</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Tout projet, profil, message ou offre peut être signalé. L&apos;équipe de modération peut masquer un contenu ou suspendre un compte.
            </p>
          </Card>
        </div>
      </div>
    </SiteFrame>
  );
}
