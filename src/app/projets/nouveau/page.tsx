import { DashboardShell } from "@/components/dashboard-shell";
import { ProjectForm } from "@/components/forms";
import { requireRole } from "@/lib/auth";
import { getCategories, getStore } from "@/lib/demo-store";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const user = await requireRole("client");
  const categories = getCategories();
  const skills = getStore().skills;

  return (
    <DashboardShell
      user={{ name: user.name, role: user.role }}
      active="/projets/nouveau"
      title="Publier un besoin"
      description="Un brief clair attire des offres plus précises. Comptez 5 minutes."
    >
      <section className="panel min-w-0 p-5 sm:p-7">
        <p className="eyebrow">Nouvelle annonce</p>
        <h2 className="display mt-3 text-[1.75rem] text-ink">Les informations essentielles</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Renseignez le contexte, le budget et les compétences attendues. Les champs signalés sont obligatoires.
        </p>
        <div className="section-rule mt-6 pt-6">
          <ProjectForm categories={categories} skills={skills} />
        </div>
      </section>
    </DashboardShell>
  );
}
