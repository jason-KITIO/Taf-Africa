import { SiteFrame } from "@/components/site-frame";
import { AuthForm } from "@/components/forms";
import { Card } from "@/components/ui";

export const metadata = { title: "Inscription" };

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; ref?: string }>;
}) {
  const { role, ref } = await searchParams;
  const defaultRole = role === "freelance" ? "freelance" : "client";

  return (
    <SiteFrame>
      <div className="mx-auto flex w-full max-w-md flex-col px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-ink">Créez votre compte</h1>
          <p className="mt-2 text-sm text-muted">Client ou freelance, tout commence ici.</p>
        </div>
        <Card className="p-6 sm:p-7">
          <AuthForm mode="register" defaultRole={defaultRole} referralCode={ref ?? ""} />
        </Card>
        <a
          href="/api/auth/google"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-bold text-ink transition hover:border-ink/40"
        >
          S&apos;inscrire avec Google
        </a>
      </div>
    </SiteFrame>
  );
}
