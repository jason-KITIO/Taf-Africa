import { AuthForm } from "@/components/forms";
import { AuthDivider, AuthShell, GoogleAuthLink } from "@/components/auth-shell";
import { SiteFrame } from "@/components/site-frame";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Inscription",
  description: "Créez votre compte client ou freelance sur Taf Africa.",
};

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; ref?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/tableau-de-bord");

  const { role, ref } = await searchParams;
  const defaultRole = role === "freelance" ? "freelance" : "client";

  return (
    <SiteFrame>
      <AuthShell
        title="Créez votre compte Taf Africa."
        description="Client ou freelance, réunissez vos projets, vos offres et vos échanges dans un seul espace."
        cues={[
          "Consultez les profils et les missions sans frais.",
          "Publiez un besoin ou présentez votre profil freelance.",
          "Candidatez avec des crédits ou un abonnement, puis payez en Mobile Money ou par carte.",
        ]}
        panelTitle="Votre inscription"
        panelDescription="Choisissez votre rôle et renseignez vos informations."
        footer={
          <>
            <AuthDivider />
            <GoogleAuthLink label="S&apos;inscrire avec Google" />
          </>
        }
      >
        <AuthForm mode="register" defaultRole={defaultRole} referralCode={ref ?? ""} />
      </AuthShell>
    </SiteFrame>
  );
}
