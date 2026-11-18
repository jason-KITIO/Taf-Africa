import { MarketEntry } from "@/components/market-entry";
import { HeroIllustration } from "@/components/illustrations";

const facts = [
  "Consultation gratuite",
  "Mobile Money & carte",
  "Aucune société requise",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-14rem] -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-amber/15 blur-[120px]"
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-rise text-balance text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
            Le talent et la mission, au même endroit
            <span className="text-amber-deep">.</span>
          </h1>
          <p className="animate-rise mt-5 text-pretty text-lg leading-relaxed text-muted [animation-delay:80ms] sm:text-xl">
            Taf Africa met en relation les clients et les freelances d&apos;Afrique
            francophone. Consultez librement, publiez votre besoin, payez par
            Mobile Money ou carte — sans créer de société.
          </p>
        </div>

        <MarketEntry />

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-amber"
              />
              {fact}
            </li>
          ))}
        </ul>

        <div className="animate-rise mx-auto mt-14 max-w-4xl [animation-delay:160ms]">
          <HeroIllustration className="rounded-3xl shadow-soft ring-1 ring-line" />
        </div>
      </div>
    </section>
  );
}
