import { SiteFrame } from "@/components/site-frame";
import { AuthForm } from "@/components/forms";
import { Card } from "@/components/ui";

export const metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <SiteFrame>
      <div className="mx-auto flex w-full max-w-md flex-col px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-ink">Bon retour sur Taf Africa</h1>
          <p className="mt-2 text-sm text-muted">Connectez-vous pour gérer vos projets, offres et conversations.</p>
        </div>
        <Card className="p-6 sm:p-7">
          <AuthForm mode="login" />
        </Card>
        <a
          href="/api/auth/google"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-bold text-ink transition hover:border-ink/40"
        >
          Continuer avec Google
        </a>
      </div>
    </SiteFrame>
  );
}
