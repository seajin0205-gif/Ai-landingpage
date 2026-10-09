import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";
import { HeroImageDemo } from "@/components/en/HeroImageDemo";
import { HeroFeatureCards } from "@/components/en/HeroFeatureCards";
import { NexusLogoMark } from "@/components/ui/NexusLogo";

const trustTags = ["No credit card", "14-day free trial", "Full English support"];

const impactHighlights = [
  { value: "3 → 1", label: "Unified workspace" },
  { value: "Zero", label: "Context switching" },
  { value: "Live", label: "Try AI instantly" },
];

export function Hero() {
  return (
    <section className="hero-section relative overflow-visible pt-28 pb-16 sm:pt-36 sm:pb-24 lg:flex lg:min-h-[calc(100vh-4.5rem)] lg:items-center lg:pt-32 lg:pb-20">
      <div className="hero-aurora-layer" aria-hidden>
        <div className="hero-aurora-blob hero-aurora-blob-1 motion-glow-aurora" />
        <div className="hero-aurora-blob hero-aurora-blob-2 motion-glow-aurora" />
        <div className="hero-aurora-blob hero-aurora-blob-3 motion-glow-aurora" />
      </div>
      <div className="hero-spotlight" aria-hidden />
      <div className="hero-spotlight-demo" aria-hidden />
      <div className="hero-brand-beam" aria-hidden />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-16">
          <div className="min-w-0 overflow-visible text-center lg:text-left">
            <Reveal variant="fade-up" delay={0}>
              <div className="hero-brand-lockup mx-auto lg:mx-0">
                <div className="hero-brand-mark">
                  <div className="hero-brand-ring" aria-hidden />
                  <NexusLogoMark size={56} className="hero-brand-logo" />
                </div>
                <div className="hero-brand-copy">
                  <p className="hero-brand-wordmark">Nexus AI</p>
                  <p className="hero-brand-tagline">AI workspace for automation</p>
                </div>
              </div>

              <div className="hero-brand-pill mx-auto mt-6 lg:mx-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan motion-glow" />
                </span>
                <span className="hero-brand-pill-label">Nexus AI Workspace</span>
                <span className="hero-brand-pill-divider" aria-hidden />
                <span className="hero-brand-pill-meta">Chat · Image · Auto</span>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={80}>
              <h1 className="headline-display hero-headline mx-auto mt-8 max-w-full lg:mx-0">
                <span className="headline-gradient-line text-gradient">No tab switching.</span>
                <span className="headline-gradient-line text-gradient">Chat, images, automation</span>
                <span className="headline-gradient-line hero-headline-accent text-gradient-accent">
                  in one AI workspace
                </span>
                <span className="headline-gradient-line hero-headline-accent text-gradient-accent">
                  all at once
                </span>
              </h1>
            </Reveal>

            <Reveal variant="fade-up" delay={140}>
              <ul className="hero-impact-strip mx-auto lg:mx-0" aria-label="Key outcomes">
                {impactHighlights.map((item) => (
                  <li key={item.label} className="hero-impact-item">
                    <span className="hero-impact-value">{item.value}</span>
                    <span className="hero-impact-label">{item.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade-up" delay={200}>
              <p className="hero-lead mx-auto mt-8 max-w-xl text-lg leading-[1.8] text-muted sm:text-xl sm:leading-[1.8] lg:mx-0">
                Creation, edits, and repeat work stay in one flow.
                Start with a single prompt and carry that context through team automation.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={260}>
              <p className="hero-social-proof mt-8 text-base text-muted">
                <span className="font-bold text-foreground">500+ teams</span>
                {" "}keep their workflow in{" "}
                <span className="hero-brand-inline">Nexus AI</span>
                {" "}instead of jumping between AI tools
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={320}>
              <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center lg:justify-start">
                <Button href="#cta" size="lg" showArrow magnetic className="w-full sm:w-auto">
                  Start for free
                </Button>
                <Button href="#workspace-demo" variant="secondary" size="lg" className="w-full sm:w-auto">
                  See the product
                </Button>
              </div>
            </Reveal>

            <Reveal variant="fade" delay={380}>
              <div className="mt-8 flex flex-col items-center justify-center gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-4 lg:justify-start">
                {trustTags.map((tag, i) => (
                  <span key={tag} className="flex items-center gap-4">
                    {i > 0 && (
                      <span className="hidden text-muted-foreground/40 sm:inline" aria-hidden>
                        |
                      </span>
                    )}
                    <span className="text-sm font-medium text-muted-foreground">
                      {tag}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Parallax strength={0.042} className="hero-demo-column relative min-w-0">
            <Reveal variant="scale-in" delay={160}>
              <div className="hero-demo-stage">
                <span className="hero-live-badge">
                  <NexusLogoMark size={20} className="hero-live-badge-mark" />
                  <span className="hero-live-dot" aria-hidden />
                  Nexus Live Demo
                </span>
                <div className="hero-demo-orbit" aria-hidden />
                <div className="hero-demo-scroll">
                  <HeroImageDemo />
                </div>
              </div>
            </Reveal>
          </Parallax>
        </div>

        <HeroFeatureCards />
      </Container>
    </section>
  );
}
