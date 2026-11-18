import { Wallet } from "@/components/icons";
import { paymentProviders } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-sand">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 py-8 sm:px-8 lg:flex-row lg:justify-between lg:gap-8">
        <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
          <Wallet className="size-5 text-amber-deep" />
          Encaissez et payez avec vos moyens de paiement
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {paymentProviders.map((provider) => (
            <li
              key={provider}
              className="text-sm font-semibold tracking-tight text-muted"
            >
              {provider}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
