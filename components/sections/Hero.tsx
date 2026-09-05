import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";
import { HeroImageDemo } from "@/components/effects/HeroImageDemo";
import { HeroFeaturePills } from "@/components/sections/HeroFeaturePills";
import { NexusLogoMark } from "@/components/ui/NexusLogo";

const trustTags = ["신용카드 불필요", "14일 무료", "한국어 완벽 지원"];

const impactHighlights = [
  { value: "3 → 1", label: "툴 통합 Workspace" },
  { value: "Zero", label: "맥락 단절" },
  { value: "Live", label: "AI 즉시 체험" },
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
                  <p className="hero-brand-tagline">업무 자동화 AI Workspace</p>
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
                <span className="headline-gradient-line text-gradient">툴을 오갈 필요 없이,</span>
                <span className="headline-gradient-line text-gradient">대화·이미지·자동화를</span>
                <span className="headline-gradient-line hero-headline-accent text-gradient-accent">
                  AI Workspace에서 한번에
                </span>
              </h1>
            </Reveal>

            <Reveal variant="fade-up" delay={140}>
              <ul className="hero-impact-strip mx-auto mt-8 lg:mx-0" aria-label="핵심 가치">
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
                생성과 수정, 반복 작업까지 끊기지 않습니다.
                프롬프트 한 줄로 시작해 팀 업무 자동화까지 같은 맥락에서 이어집니다.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={260}>
              <p className="hero-social-proof mt-8 text-base text-muted">
                <span className="font-bold text-foreground">500+개 팀</span>
                이 여러 AI 툴 대신{" "}
                <span className="hero-brand-inline">Nexus AI</span>
                하나로 작업 흐름을 유지 중
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={320}>
              <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center lg:justify-start">
                <Button href="#cta" size="lg" showArrow magnetic className="w-full sm:w-auto">
                  무료로 시작하기
                </Button>
                <Button href="#workspace-demo" variant="secondary" size="lg" className="w-full sm:w-auto">
                  제품 미리보기
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

        <HeroFeaturePills />
      </Container>
    </section>
  );
}
