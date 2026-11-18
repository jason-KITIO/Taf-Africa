import { ChevronDown } from "@/components/icons";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="border-y border-line bg-sand">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            Une question qui n&apos;est pas là ? Le bouton « Besoin d&apos;aide ? »
            en bas de page répond aux principales.
          </p>
        </div>

        <div className="divide-y divide-line border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-bold text-ink marker:content-none">
                {faq.question}
                <ChevronDown className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
