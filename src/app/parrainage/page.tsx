import { DashboardShell } from "@/components/dashboard-shell";
import { ButtonLink, Card, Stat } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getReferralStats } from "@/lib/demo-store";

export const dynamic = "force-dynamic";

export default async function ParrainagePage() {
  const user = await requireUser();
  const stats = getReferralStats(user.id);

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/parrainage"
      title="Parrainage"
      description="Invitez un freelance ou un client : 5 crédits pour vous, 5 pour lui."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Votre code" value={stats.code} />
        <Stat label="Invités" value={stats.invited} />
        <Stat label="Crédits gagnés" value={stats.bonus} />
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-bold text-ink">Partagez votre lien</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Toute personne qui crée un compte avec votre code reçoit 5 crédits, et vous recevez 5 crédits également.
        </p>
        <p className="tnum mt-4 break-all rounded-xl bg-sand/60 px-4 py-3 text-sm font-semibold text-ink-soft">
          /inscription?ref={stats.code}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <ButtonLink href={`/inscription?ref=${stats.code}`}>Ouvrir le lien d&apos;invitation</ButtonLink>
          <ButtonLink href="/abonnements" variant="secondary">Voir mes crédits</ButtonLink>
        </div>
      </Card>
    </DashboardShell>
  );
}
