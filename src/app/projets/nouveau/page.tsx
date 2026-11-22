import { DashboardShell } from "@/components/dashboard-shell";
import { ProjectForm } from "@/components/forms";
import { Card } from "@/components/ui";
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
      <Card className="p-5 sm:p-6">
        <ProjectForm categories={categories} skills={skills} />
      </Card>
    </DashboardShell>
  );
}
