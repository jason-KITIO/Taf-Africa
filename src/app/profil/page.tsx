import { DashboardShell } from "@/components/dashboard-shell";
import { PortfolioForm, ProfileForm } from "@/components/forms";
import { Avatar, Card, SectionHeading } from "@/components/ui";
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
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-5 sm:p-6">
          <SectionHeading
            title="Informations du profil"
            description="Ces informations alimentent votre espace et votre profil public."
          />
          <div className="section-rule mt-5 pt-5">
            <ProfileForm user={{ name: user.name, role: user.role }} values={values} />
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <p className="eyebrow">Aperçu</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name={user.name} className="size-12" />
              <div className="min-w-0">
                <p className="display truncate text-2xl text-ink">{user.name}</p>
                <p className="mt-1 break-words text-sm text-muted">
                  {freelance?.title || client?.companyName || "Profil Taf Africa"}
                </p>
              </div>
            </div>
            <div className="mt-4 divide-y divide-line text-sm">
              <div className="flex flex-col gap-1 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <span className="text-muted">Localisation</span>
                <span className="min-w-0 break-words text-right text-ink-soft">
                  {values.city || "Ville à renseigner"}{values.country ? `, ${values.country}` : ""}
                </span>
              </div>
              {freelance ? (
                <div className="flex flex-col gap-1 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="text-muted">Tarif journalier</span>
                  <span className="tnum font-bold text-ink">
                    {formatMoney(freelance.dailyRate, freelance.rateCurrency)} / jour
                  </span>
                </div>
              ) : null}
            </div>
          </Card>

          {user.role === "freelance" ? (
            <>
              <Card>
                <SectionHeading title="Portfolio" description="Ajoutez des réalisations concrètes." />
                <div className="section-rule mt-4 pt-4">
                  {portfolio.length === 0 ? (
                    <p className="text-sm text-muted">Aucune réalisation pour le moment.</p>
                  ) : (
                    <div className="divide-y divide-line">
                      {portfolio.map((item) => (
                        <div key={item.id} className="py-3 first:pt-0 last:pb-0">
                          <p className="text-sm font-bold text-ink">{item.title}</p>
                          <p className="mt-1 break-words text-xs leading-relaxed text-muted">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
              <Card>
                <SectionHeading title="Ajouter une réalisation" />
                <div className="section-rule mt-4 pt-4">
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
