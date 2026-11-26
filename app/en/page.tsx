import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { Navigation } from "@/components/en/Navigation";
import { Hero } from "@/components/en/Hero";
import { WorkspaceDemo } from "@/components/en/WorkspaceDemo";
import { Features } from "@/components/en/Features";
import { HowItWorks } from "@/components/en/HowItWorks";
import { Testimonials } from "@/components/en/Testimonials";
import { Statistics } from "@/components/en/Statistics";
import { TeamSecurity } from "@/components/en/TeamSecurity";
import { Integrations } from "@/components/en/Integrations";
import { Pricing } from "@/components/en/Pricing";
import { FAQ } from "@/components/en/FAQ";
import { CTA } from "@/components/en/CTA";
import { Footer } from "@/components/en/Footer";

export default function EnglishHome() {
  return (
    <AuroraBackground>
      <Navigation />
      <main className="landing-narrative">
        <Hero />
        <WorkspaceDemo />
        <Features />
        <HowItWorks />
        <div className="narrative-block narrative-block-proof">
          <Testimonials />
          <Statistics />
          <TeamSecurity />
          <Integrations />
        </div>
        <div className="narrative-block narrative-block-convert">
          <Pricing />
          <FAQ />
          <CTA />
        </div>
      </main>
      <Footer />
    </AuroraBackground>
  );
}
