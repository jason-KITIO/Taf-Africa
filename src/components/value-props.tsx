import { valueProps } from "@/lib/content";
import { PaymentIllustration } from "@/components/illustrations";

export function ValueProps() {
  return (
    <section className="section-rule">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">Pourquoi Taf Africa</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
            Une plateforme pensée pour les réalités africaines
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            Les plateformes existantes ignorent le contexte local. Nous avons
            repensé chaque étape — de la candidature au paiement.
          </p>
          <div data-visual className="panel-quiet mt-8 hidden max-w-xs overflow-hidden lg:block">
            <PaymentIllustration className="h-auto w-full" />
          </div>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {valueProps.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className="grid gap-4 py-6 sm:grid-cols-[auto_1fr] sm:gap-x-6 sm:py-7"
            >
              <span className="tnum text-xs font-bold tracking-[0.18em] text-teal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-10 shrink-0 place-items-center border border-line bg-matter text-teal">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
