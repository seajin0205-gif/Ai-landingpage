import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { KineticMarquee } from "@/components/motion/KineticMarquee";
import { WorkspaceDemo } from "@/components/sections/WorkspaceDemo";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Statistics } from "@/components/sections/Statistics";
import { TeamSecurity } from "@/components/sections/TeamSecurity";
import { Integrations } from "@/components/sections/Integrations";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import type { Locale } from "@/lib/copy";

export function LandingPage({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <AuroraBackground>
        <Navigation />
        <main className="landing-narrative">
          <Hero />
          <KineticMarquee />
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
    </LocaleProvider>
  );
}
