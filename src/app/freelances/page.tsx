import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { Avatar, Card, PageHeader, StatusPill } from "@/components/ui";
import { formatMoney } from "@/lib/format";
import { getPublicFreelances, getStore, getUserPlan } from "@/lib/demo-store";

export const metadata = { title: "Annuaire des freelances" };

export default function FreelancesPage() {
  const freelances = getPublicFreelances();
  const users = getStore().users;

  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader
          eyebrow="Annuaire"
          title="Des freelances prêts à livrer"
          description="Une sélection de profils francophones, avec compétences, tarifs et réalisations."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {freelances.map((profile) => {
            const user = users.find((item) => item.id === profile.userId);
            const plan = getUserPlan(profile.userId);
            return (
              <Link key={profile.userId} href={`/freelances/${profile.slug}`} className="block">
                <Card className="h-full transition hover:border-line-strong hover:shadow-lift">
                  <div className="flex items-start gap-3">
                    <Avatar name={user?.name ?? "Freelance"} className="size-12" />
                    <div className="min-w-0">
                      <p className="font-bold text-ink">{user?.name ?? "Freelance"}</p>
                      <p className="text-sm text-muted">{profile.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm text-muted">{profile.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-ink-soft">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="tnum text-sm font-bold text-ink">
                      {formatMoney(profile.dailyRate, profile.rateCurrency)} / jour
                    </span>
                    {plan.code !== "free" ? <StatusPill tone="success">Profil vérifié</StatusPill> : null}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </SiteFrame>
  );
}
