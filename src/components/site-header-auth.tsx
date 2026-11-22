import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";

export async function SiteHeaderAuth() {
  const user = await getCurrentUser();
  return (
    <SiteHeader
      user={user ? { name: user.name, role: user.role } : null}
    />
  );
}
