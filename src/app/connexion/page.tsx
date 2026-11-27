import { AuthForm } from "@/components/forms";
import {
  AuthDivider,
  DemoAccounts,
  GoogleAuthLink,
} from "@/components/auth-shell";
import { SiteFrame } from "@/components/site-frame";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre espace Taf Africa.",
};

export default async function ConnexionPage() {
  const user = await getCurrentUser();
  if (user) redirect("/tableau-de-bord");

  return (
    <SiteFrame>
      <div className="mx-auto grid w-full max-w-6xl gap-x-16 gap-y-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:py-20">
        <section className="min-w-0">
          <p className="eyebrow">Espace membre</p>
          <h1 className="display mt-4 max-w-2xl text-[2.5rem] text-ink sm:text-5xl">
            Reprenez le fil de vos projets.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Retrouvez vos offres, vos échanges et votre espace de travail Taf Africa.
          </p>
        </section>

        <section className="panel min-w-0 self-start p-5 sm:p-7 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <p className="eyebrow">Votre compte</p>
          <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-ink">
            Votre compte
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Connectez-vous avec votre adresse e-mail ou avec Google.
          </p>
          <div className="mt-7">
            <AuthForm mode="login" />
          </div>
          <div className="section-rule mt-7 pt-6">
            <AuthDivider />
            <GoogleAuthLink label="Continuer avec Google" />
            <DemoAccounts />
          </div>
        </section>

        <section className="min-w-0 lg:col-start-1 lg:row-start-2">
          <ul className="divide-y divide-line border-t border-line">
            <li className="py-4 text-[15px] leading-relaxed text-ink-soft">
              Consultez les missions et les profils sans frais.
            </li>
            <li className="py-4 text-[15px] leading-relaxed text-ink-soft">
              Retrouvez vos offres, vos crédits et vos conversations au même endroit.
            </li>
            <li className="py-4 text-[15px] leading-relaxed text-ink-soft">
              Le paiement Mobile Money et par carte reste disponible pour vos abonnements.
            </li>
          </ul>
        </section>
      </div>
    </SiteFrame>
  );
}
