import Link from "next/link";
import { footerNav } from "@/lib/content";
import { Logo } from "@/components/logo";

const year = new Date().getFullYear();

const legalLinks = [
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "CGU", href: "/cgu" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo className="text-2xl" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              La marketplace qui réunit les clients et les freelances
              d&apos;Afrique francophone.
            </p>
            <p className="mt-4 text-sm font-semibold text-ink">
              taf-africa.com
            </p>
          </div>

          {footerNav.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold text-ink">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition hover:text-amber-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {year} Taf Africa. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-amber-deep">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
