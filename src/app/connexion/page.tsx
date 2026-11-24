import { AuthForm } from "@/components/forms";
import {
  AuthDivider,
  AuthShell,
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
      <AuthShell
        title="Reprenez le fil de vos projets."
        description="Retrouvez vos offres, vos échanges et votre espace de travail Taf Africa."
        cues={[
          "Consultez les missions et les profils sans frais.",
          "Retrouvez vos offres, vos crédits et vos conversations au même endroit.",
          "Le paiement Mobile Money et par carte reste disponible pour vos abonnements.",
        ]}
        panelTitle="Votre compte"
        panelDescription="Connectez-vous avec votre adresse e-mail ou avec Google."
        footer={
          <>
            <AuthDivider />
            <GoogleAuthLink label="Continuer avec Google" />
            <DemoAccounts />
          </>
        }
      >
        <AuthForm mode="login" />
      </AuthShell>
    </SiteFrame>
  );
}
