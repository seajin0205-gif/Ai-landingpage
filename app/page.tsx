import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { PremiumLoader } from "@/components/effects/PremiumLoader";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { WorkspaceDemo } from "@/components/sections/WorkspaceDemo";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Statistics } from "@/components/sections/Statistics";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <AuroraBackground>
      <PremiumLoader />
      <Navigation />
      <main className="landing-narrative">
        {/* 1. AI가 생성된다 */}
        <Hero />

        {/* 2. 실제 제품이다 */}
        <WorkspaceDemo />

        {/* 3. 무엇을 할 수 있다 */}
        <Features />

        {/* 4. 어떻게 사용하는가 */}
        <HowItWorks />

        {/* 5. 왜 좋은가 */}
        <div className="narrative-block narrative-block-proof">
          <Testimonials />
          <Statistics />
          <SplitFeature />
          <LogoCloud />
        </div>

        {/* 6. 지금 시작 */}
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
