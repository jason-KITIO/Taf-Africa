export function AuthShell({
  title,
  description,
  cues,
  panelTitle,
  panelDescription,
  children,
  footer,
}: {
  title: string;
  description: string;
  cues: string[];
  panelTitle: string;
  panelDescription: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="bg-matter">
      <div className="mx-auto grid w-full max-w-6xl gap-x-20 gap-y-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:py-20">
        <section className="min-w-0 lg:col-start-1 lg:row-start-1">
          <div className="h-1 w-12 bg-lime" aria-hidden="true" />
          <h1 className="display mt-6 max-w-2xl text-[2.5rem] text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </section>

        <section className="panel min-w-0 self-start p-6 shadow-lift sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <p className="eyebrow">Votre compte</p>
          <h2 className="mt-3 text-xl font-bold tracking-[-0.02em] text-ink">
            {panelTitle}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {panelDescription}
          </p>
          <div className="mt-7">{children}</div>
          {footer ? (
            <div className="mt-7 border-t border-line pt-6">{footer}</div>
          ) : null}
        </section>

        <section className="min-w-0 lg:col-start-1 lg:row-start-2">
          <ul className="space-y-3 border-t border-line pt-7">
            {cues.map((cue) => (
              <li
                key={cue}
                className="flex gap-3 text-sm leading-relaxed text-ink-soft"
              >
                <span
                  className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-teal"
                  aria-hidden="true"
                />
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
      <span className="eyebrow">ou</span>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </div>
  );
}

export function GoogleAuthLink({ label }: { label: string }) {
  return (
    <a
      href="/api/auth/google"
      className="action action-secondary mt-4 w-full"
    >
      <span>{label}</span>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M4 10h11" />
        <path d="m11 6 4 4-4 4" />
      </svg>
    </a>
  );
}

export function DemoAccounts() {
  return (
    <div className="mt-5 rounded-xl border border-line bg-matter px-4 py-3.5">
      <p className="eyebrow">Comptes de démonstration</p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">
        Mot de passe : <strong className="font-bold text-ink">demo1234</strong>
      </p>
      <ul className="mt-2.5 space-y-1 text-xs leading-relaxed text-ink-soft">
        <li>client@taf-africa.com — Espace client</li>
        <li>freelance@taf-africa.com — Espace freelance</li>
        <li>admin@taf-africa.com — Administration</li>
      </ul>
    </div>
  );
}
