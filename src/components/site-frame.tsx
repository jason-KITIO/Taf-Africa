import { SiteFooter } from "@/components/site-footer";
import { SiteHeaderAuth } from "@/components/site-header-auth";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeaderAuth />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
