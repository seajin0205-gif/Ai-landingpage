import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/layout/Container";
import { IntegrationHub } from "@/components/effects/IntegrationHub";

const partners = ["Enterprise A", "Company B", "Startup C", "Team D", "Org E", "Studio F"];

export function Integrations() {
  return (
    <section id="integrations" className="integration-section section-rhythm-proof-trust border-y border-white/70 bg-white/20 py-10 backdrop-blur-sm sm:py-12">
      <Container>
        <Reveal variant="fade-up">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-lg">
              <p className="text-sm font-bold tracking-[0.12em] text-neon-cyan uppercase">연동 & 파트너</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Trusted by 500+ Teams
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Slack, Notion, GitHub 등 이미 쓰는 도구를 Nexus AI Hub에 연결하세요.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {partners.map((name) => (
                <span
                  key={name}
                  className="logo-partner rounded-full border border-white/80 bg-white/50 px-4 py-2 text-xs font-bold tracking-tight text-foreground sm:text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal variant="scale-in" delay={120}>
          <div className="mt-10 sm:mt-12">
            <IntegrationHub />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
