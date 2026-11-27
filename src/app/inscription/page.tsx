import { AuthForm } from "@/components/forms";
import { AuthDivider, GoogleAuthLink } from "@/components/auth-shell";
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
      <div className="mx-auto grid w-full max-w-6xl gap-x-16 gap-y-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:py-20">
        <section className="min-w-0">
          <p className="eyebrow">Rejoindre Taf Africa</p>
          <h1 className="display mt-4 max-w-2xl text-[2.5rem] text-ink sm:text-5xl">
            Créez votre compte Taf Africa.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Client ou freelance, réunissez vos projets, vos offres et vos échanges dans un seul espace.
          </p>
        </section>

        <section className="panel min-w-0 self-start p-5 sm:p-7 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <p className="eyebrow">Votre compte</p>
          <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-ink">
            Votre inscription
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Choisissez votre rôle et renseignez vos informations.
          </p>
          <div className="mt-7">
            <AuthForm mode="register" defaultRole={defaultRole} referralCode={ref ?? ""} />
          </div>
          <div className="section-rule mt-7 pt-6">
            <AuthDivider />
            <GoogleAuthLink label="S&apos;inscrire avec Google" />
          </div>
        </section>

        <section className="min-w-0 lg:col-start-1 lg:row-start-2">
          <ul className="divide-y divide-line border-t border-line">
            <li className="py-4 text-[15px] leading-relaxed text-ink-soft">
              Consultez les profils et les missions sans frais.
            </li>
            <li className="py-4 text-[15px] leading-relaxed text-ink-soft">
              Publiez un besoin ou présentez votre profil freelance.
            </li>
            <li className="py-4 text-[15px] leading-relaxed text-ink-soft">
              Candidatez avec des crédits ou un abonnement, puis payez en Mobile Money ou par carte.
            </li>
          </ul>
        </section>
      </div>
    </SiteFrame>
  );
}
