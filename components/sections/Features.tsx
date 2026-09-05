import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { FeatureIcon } from "@/components/ui/Icons";
import { MetricBadge } from "@/components/ui/MetricBadge";

const featureCards = [
  {
    number: "01",
    label: "AI 챗봇",
    title: "팀 지식을 이해하는 대화형 어시스턴트",
    description:
      "사내 문서, 고객 데이터, 업무 맥뽽을 연결해 답변·요약·분석을 한곳에서 처리합니다.",
    icon: "chatbot" as const,
    surface: "card-surface-glass",
    accent: "text-neon-cyan",
    metrics: [
      { value: "RAG", label: "문서 기반 답변", variant: "glass" as const },
      { value: "24/7", label: "상시 응답", variant: "flat" as const },
    ],
  },
  {
    number: "02",
    label: "이미지 생성",
    title: "브랜드에 맞는 시각 자료를 빠르게 제작",
    description:
      "캠페인 배너, SNS 콘텐츠, 제품 목업을 텍스트 프롬프트만으로 고해상도 출력합니다.",
    icon: "image" as const,
    surface: "card-surface-flat",
    accent: "text-accent-indigo",
    metrics: [
      { value: "4K", label: "고해상도 출력", variant: "glass" as const },
      { value: "3초", label: "평균 생성 시간", variant: "flat" as const },
    ],
  },
  {
    number: "03",
    label: "업무 자동화",
    title: "반복 업무를 안정적인 워크플로로 전환",
    description:
      "보고서, 알림, 데이터 처리와 승인 흐름을 도구 간 연결로 자동 실행합니다.",
    icon: "automation" as const,
    surface: "card-surface-flat",
    accent: "text-accent-indigo",
    metrics: [
      { value: "50+", label: "앱 연동", variant: "glass" as const },
      { value: "70%", label: "시간 절감", variant: "flat" as const },
    ],
  },
];

export function Features() {
  return (
    <Section id="features" className="section-rhythm-capability">
      <Reveal variant="fade-up">
        <div className="features-section-header max-w-2xl">
          <NarrativeStep step="03" label="Capabilities" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
            What you can do
          </h2>
          <p className="mt-6 text-base leading-[1.8] text-muted">
            챗봇 · 이미지 · 자동화 — 세 가지 핵심 역량이 하나의 플랫폼에 있습니다.
          </p>
        </div>
      </Reveal>

      <div className="features-card-grid mt-12 lg:mt-16">
        {featureCards.map((card, index) => (
          <Reveal key={card.label} variant="fade-up" delay={index * 80} className="h-full min-w-0">
            <article
              className={`feature-card-premium card-surface card-interactive group flex h-full min-h-[336px] flex-col p-8 sm:min-h-[360px] sm:p-8 ${card.surface}`}
            >
              <span className="feature-number relative z-[1]">{card.number} · {card.label}</span>
              <div
                className={`icon-box feature-card-icon relative z-[1] mt-6 mb-6 h-12 w-12 rounded-xl border border-white/90 bg-white/70 shadow-sm ${card.accent}`}
              >
                <FeatureIcon name={card.icon} />
              </div>
              <h3 className="relative z-[1] text-xl font-extrabold tracking-tight text-foreground">
                {card.title}
              </h3>
              <p className="relative z-[1] mt-4 flex-1 text-base leading-[1.8] text-muted">
                {card.description}
              </p>
              <div className="relative z-[1] mt-8 grid grid-cols-2 gap-2">
                {card.metrics.map((metric) => (
                  <MetricBadge
                    key={metric.label}
                    value={metric.value}
                    label={metric.label}
                    variant={metric.variant}
                  />
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
