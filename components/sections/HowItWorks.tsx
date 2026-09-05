import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { GlassTitle } from "@/components/ui/GlassTitle";

const steps = [
  {
    step: "01",
    title: "AI 챗봇으로 질문",
    description:
      "자연어로 질문하면 사내 데이터와 문서를 기반으로 즉시 답변합니다.",
    accent: "text-neon-cyan",
    ring: "ring-neon-cyan/30",
  },
  {
    step: "02",
    title: "이미지를 바로 생성",
    description:
      "대화 중 필요한 비주얼을 프롬프트 한 줄로 생성합니다.",
    accent: "text-accent-violet",
    ring: "ring-accent-violet/30",
  },
  {
    step: "03",
    title: "워크플로로 자동화",
    description:
      "반복 업무를 워크플로로 연결해 보고서와 알림을 자동 실행합니다.",
    accent: "text-accent-indigo",
    ring: "ring-accent-indigo/30",
  },
  {
    step: "04",
    title: "결과를 팀과 공유",
    description:
      "결과를 Slack·Notion 등 연동 도구로 공유하고 협업합니다.",
    accent: "text-accent-indigo",
    ring: "ring-accent-indigo/30",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="section-rhythm-process" bordered>
      <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-20 lg:text-left">
        <Reveal variant="fade-up">
          <NarrativeStep step="04" label="How It Works" />
          <GlassTitle
            as="h2"
            className="mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-left"
            lines={["How to use it"]}
          />
          <p className="mx-auto mt-4 max-w-lg text-center text-base leading-[1.75] text-muted lg:mx-0 lg:text-left">
            대화로 시작해, 생성하고, 자동화까지 — 네 단계면 충분합니다.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div
          className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan/0 via-neon-cyan/25 to-accent-indigo/0 md:left-1/2 md:-translate-x-1/2"
          aria-hidden
        />

        <div className="relative space-y-12 pl-14 md:space-y-0 md:pl-0">
          {steps.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <Reveal key={item.step} variant="fade-up" delay={index * 100}>
                <div className="relative md:grid md:grid-cols-2 md:gap-16 md:py-8">
                  <div
                    className={`hidden md:flex md:items-center ${
                      isEven
                        ? "md:justify-end md:text-right"
                        : "md:col-start-2 md:justify-start md:text-left"
                    }`}
                  >
                    <article className="max-w-sm">
                      <span className={`text-xs font-bold tracking-[0.15em] uppercase ${item.accent}`}>
                        Step {item.step}
                      </span>
                      <h3 className="mt-2 text-xl font-extrabold text-foreground lg:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-[1.75] text-muted">
                        {item.description}
                      </p>
                    </article>
                  </div>

                  <div className="absolute -left-[3.45rem] top-0 z-10 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <div className={`timeline-dot ring-4 ${item.ring}`}>
                      <span className={item.accent}>{item.step}</span>
                    </div>
                  </div>

                  <article className="md:hidden">
                    <span className={`text-xs font-bold tracking-[0.15em] uppercase ${item.accent}`}>
                      Step {item.step}
                    </span>
                    <h3 className="mt-2 text-xl font-extrabold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-[1.75] text-muted">
                      {item.description}
                    </p>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
