import type { Metadata } from "next";
import { ChainsMarquee, Faq, Features, Showcase } from "@/components/landing/more";
import { LandingNav } from "@/components/landing/nav";
import { Reveal } from "@/components/landing/reveal";
import {
  Band,
  DashboardShot,
  Global,
  Growth,
  Hero,
  LandingFooter,
  OnChain,
  TwoCards,
} from "@/components/landing/sections";

export const metadata: Metadata = {
  title: "Openrail: get paid in stablecoins, from any chain",
  description:
    "Invoices and checkout for businesses. Clients pay from eight chains; you receive USDC where you choose, and every payment is proven on NEAR.",
};

export default function Landing() {
  return (
    <div className="min-h-dvh bg-bg text-text">
      <LandingNav />
      <main>
        <Hero />
        <DashboardShot />
        <Reveal>
          <ChainsMarquee />
        </Reveal>
        <TwoCards />
        <Reveal>
          <Global />
        </Reveal>
        <Growth />
        <Features />
        <Showcase />
        <Reveal>
          <Band />
        </Reveal>
        <Reveal>
          <OnChain />
        </Reveal>
        <Faq />
      </main>
      <LandingFooter />
    </div>
  );
}
