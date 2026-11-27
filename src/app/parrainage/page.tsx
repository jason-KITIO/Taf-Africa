import { CopyReferralButton } from "@/components/copy-referral-button";
import { DashboardShell } from "@/components/dashboard-shell";
import { ButtonLink, Card, SectionHeading, Stat } from "@/components/ui";
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
      <Card>
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3">
          <Stat label="Votre code" value={<span className="display break-all text-2xl text-ink">{stats.code}</span>} />
          <Stat label="Invités" value={<span className="tnum">{stats.invited}</span>} />
          <Stat label="Crédits gagnés" value={<span className="tnum">{stats.bonus}</span>} />
        </div>
      </Card>

      <section className="mt-8 space-y-4">
        <SectionHeading title="Partagez votre lien" description="Un compte créé avec votre code déclenche le bonus pour les deux parties." />
        <Card>
          <p className="text-sm leading-relaxed text-muted">
            Toute personne qui crée un compte avec votre code reçoit 5 crédits, et vous recevez 5 crédits également.
          </p>
          <p className="tnum mt-4 break-all rounded-xl border border-line bg-matter px-4 py-3 text-sm font-semibold text-ink-soft">
            /inscription?ref={stats.code}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <ButtonLink href={`/inscription?ref=${stats.code}`}>Ouvrir le lien d&apos;invitation</ButtonLink>
            <CopyReferralButton path={`/inscription?ref=${stats.code}`} />
          </div>
        </Card>
      </section>
    </DashboardShell>
  );
}
