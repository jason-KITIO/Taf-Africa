import { SiteFrame } from "@/components/site-frame";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { ValueProps } from "@/components/value-props";
import { HowItWorks } from "@/components/how-it-works";
import { Faq } from "@/components/faq";
import { CtaFinal } from "@/components/cta-final";

export default function Home() {
  return (
    <SiteFrame>
      <Hero />
      <TrustStrip />
      <ValueProps />
      <HowItWorks />
      <Faq />
      <CtaFinal />
    </SiteFrame>
  );
}
