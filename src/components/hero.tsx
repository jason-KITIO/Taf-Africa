import { MarketEntry } from "@/components/market-entry";

const facts = [
  "Consultation gratuite",
  "Mobile Money & carte",
  "Aucune société requise",
];

export function Hero() {
  return (
    <section id="top" className="overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow">Freelance · Afrique francophone</p>
            <h1 className="display animate-rise mt-4 text-balance text-[2.5rem] text-ink sm:text-5xl lg:text-[3.5rem]">
              La marketplace freelance d&apos;Afrique francophone
              <span className="text-lime">.</span>
            </h1>
            <p className="animate-rise mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-soft [animation-delay:80ms] sm:text-lg">
              Taf Africa met en relation les clients et les freelances
              d&apos;Afrique francophone. Consultez librement, publiez votre
              besoin, payez en € par Mobile Money ou carte — sans créer de société.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-5">
              {facts.map((fact) => (
                <li key={fact} className="chip">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-teal"
                  />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <MarketEntry />
          </div>
        </div>
      </div>
    </section>
  );
}
