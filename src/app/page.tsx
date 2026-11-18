import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { ValueProps } from "@/components/value-props";
import { HowItWorks } from "@/components/how-it-works";
import { Faq } from "@/components/faq";
import { CtaFinal } from "@/components/cta-final";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <ValueProps />
        <HowItWorks />
        <Faq />
        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
  );
}
