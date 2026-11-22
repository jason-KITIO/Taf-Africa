import { DashboardShell } from "@/components/dashboard-shell";
import { PortfolioForm, ProfileForm } from "@/components/forms";
import { Card, SectionHeading } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getClientProfile, getFreelanceProfile, getPortfolioFor } from "@/lib/demo-store";
import { formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const user = await requireUser();
  const freelance = getFreelanceProfile(user.id);
  const client = getClientProfile(user.id);
  const portfolio = getPortfolioFor(user.id);

  const values = {
    title: freelance?.title ?? "",
    bio: freelance?.bio ?? "",
    city: freelance?.city ?? client?.city ?? "",
    country: freelance?.country ?? client?.country ?? "",
    phone: freelance?.phone ?? client?.phone ?? "",
    companyName: client?.companyName ?? "",
    dailyRate: freelance?.dailyRate ?? 0,
    languages: freelance?.languages ?? ["Français"],
    skills: freelance?.skills ?? [],
    emailAlerts: freelance?.emailAlerts ?? true,
    isPublic: freelance?.isPublic ?? true,
  };

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/profil"
      title="Mon profil"
      description="Un profil complet inspire confiance et reçoit plus de réponses."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="p-5 sm:p-6">
          <SectionHeading title="Informations du profil" description="Ces informations alimentent votre espace et votre profil public." />
          <div className="mt-6">
            <ProfileForm user={{ name: user.name, role: user.role }} values={values} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Aperçu</p>
            <p className="mt-2 text-lg font-extrabold text-ink">{user.name}</p>
            <p className="mt-1 text-sm text-muted">{freelance?.title || client?.companyName || "Profil Taf Africa"}</p>
            <div className="mt-4 border-t border-line pt-4 text-sm text-muted">
              <p>{values.city || "Ville à renseigner"}{values.country ? `, ${values.country}` : ""}</p>
              {freelance ? <p className="tnum mt-1 font-semibold text-ink">{formatMoney(freelance.dailyRate, freelance.rateCurrency)} / jour</p> : null}
            </div>
          </Card>

          {user.role === "freelance" ? (
            <>
              <Card>
                <SectionHeading title="Portfolio" description="Ajoutez des réalisations concrètes." />
                <div className="mt-4 space-y-3">
                  {portfolio.length === 0 ? (
                    <p className="text-sm text-muted">Aucune réalisation pour le moment.</p>
                  ) : (
                    portfolio.map((item) => (
                      <div key={item.id} className="rounded-xl border border-line bg-paper p-3">
                        <p className="text-sm font-bold text-ink">{item.title}</p>
                        <p className="mt-1 text-xs text-muted">{item.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </Card>
              <Card>
                <SectionHeading title="Ajouter une réalisation" />
                <div className="mt-4">
                  <PortfolioForm />
                </div>
              </Card>
            </>
          ) : null}
        </div>
      </div>
    </DashboardShell>
  );
}
