import { SiteFrame } from "@/components/site-frame";
import { Card, PageHeader } from "@/components/ui";

export const metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader
          eyebrow="Données personnelles"
          title="Politique de confidentialité"
          description="Ce que Taf Africa collecte et pourquoi."
        />
        <div className="mt-8 space-y-4">
          <Card>
            <h2 className="text-lg font-bold text-ink">Données collectées</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Nom, adresse e-mail, rôle, profil, projets, offres, messages de la messagerie et historique de facturation. Les mots de passe sont stockés sous forme de hash.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-ink">Utilisation</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Les données servent à la mise en relation, à la facturation, à la modération et aux alertes par compétence. Elles ne sont pas revendues.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-ink">Visibilité</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Le profil freelance public affiche les informations professionnelles. Les coordonnées d&apos;un client ne sont visibles que lorsque son abonnement le permet.
            </p>
          </Card>
        </div>
      </div>
    </SiteFrame>
  );
}
