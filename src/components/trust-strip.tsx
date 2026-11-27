import { Wallet } from "@/components/icons";
import { paymentProviders } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="section-rule border-b border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-7 sm:px-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-start">
        <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
          <Wallet className="size-5 shrink-0 text-teal" />
          Encaissez et payez avec vos moyens de paiement
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {paymentProviders.map((provider) => (
            <li
              key={provider}
              className="text-sm font-medium tracking-tight text-muted"
            >
              {provider}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
