import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { Avatar, StatusPill } from "@/components/ui";
import { formatMoney } from "@/lib/format";
import { getPublicFreelances, getStore } from "@/lib/demo-store";

export const metadata = { title: "Annuaire des freelances" };

export default function FreelancesPage() {
  const freelances = getPublicFreelances();
  const users = getStore().users;

  return (
    <SiteFrame>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="min-w-0">
          <p className="eyebrow">Annuaire</p>
          <h1 className="display mt-4 text-[2rem] text-ink sm:text-[2.5rem]">
            Des freelances prêts à livrer
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Une sélection de profils francophones, avec compétences, tarifs et réalisations.
          </p>
        </header>

        <ul className="mt-9 divide-y divide-line border-t border-line">
          {freelances.map((profile) => {
            const user = users.find((item) => item.id === profile.userId);
            return (
              <li key={profile.userId}>
                <Link href={`/freelances/${profile.slug}`} className="group block py-6">
                  <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <Avatar name={user?.name ?? "Freelance"} className="size-12" />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="break-words text-lg font-bold tracking-[-0.02em] text-ink transition group-hover:text-teal">
                            {user?.name ?? "Freelance"}
                          </p>
                          {profile.verified ? <StatusPill tone="success">Profil vérifié</StatusPill> : null}
                        </div>
                        <p className="mt-1 text-sm text-muted">{profile.title}</p>
                      </div>
                    </div>
                    <p className="tnum shrink-0 text-sm font-bold text-ink">
                      {formatMoney(profile.dailyRate, profile.rateCurrency)} / jour
                    </p>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">{profile.bio}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {profile.skills.slice(0, 3).map((skill) => (
                      <li key={skill} className="chip">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </SiteFrame>
  );
}
