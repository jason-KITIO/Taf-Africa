import { valueProps } from "@/lib/content";
import { PaymentIllustration } from "@/components/illustrations";

export function ValueProps() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
            Une plateforme pensée pour les réalités africaines
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            Les plateformes existantes ignorent le contexte local. Nous avons
            repensé chaque étape — de la candidature au paiement.
          </p>
          <PaymentIllustration className="mt-8 hidden max-w-xs rounded-2xl ring-1 ring-line lg:block" />
        </div>

        <ul className="divide-y divide-line border-t border-line">
          {valueProps.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 py-6 sm:gap-x-6 sm:py-7"
            >
              <span className="mt-0.5 grid size-10 place-items-center rounded-xl bg-amber-soft text-amber-deep">
                <Icon className="size-5" />
              </span>
              <h3 className="self-center text-lg font-bold text-ink">
                {title}
              </h3>
              <p className="col-start-2 text-[15px] leading-relaxed text-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
