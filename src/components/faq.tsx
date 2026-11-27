import { ChevronDown } from "@/components/icons";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="section-rule">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            Une question qui n&apos;est pas là ? Le bouton « Besoin d&apos;aide ? »
            en bas de page répond aux principales.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-5 text-left text-base font-bold text-ink marker:content-none">
                <span className="flex min-w-0 gap-4">
                  <span className="tnum mt-0.5 shrink-0 text-xs font-bold tracking-[0.18em] text-teal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">{faq.question}</span>
                </span>
                <ChevronDown className="mt-0.5 size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="pb-5 pl-10 pr-8 text-base leading-relaxed text-ink-soft sm:pl-11">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
