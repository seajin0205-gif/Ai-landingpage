import { Reveal } from "@/components/motion/Reveal";
import { Section, sectionGridGap } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

const plans = [
  {
    name: "Starter",
    subtitle: "개인·소규모 팀",
    price: "₩0",
    period: "/월",
    description: "AI 챗봇과 이미지 생성을 처음 시작하는 분들에게 적합합니다.",
    features: [
      "월 500회 챗봇 대화",
      "월 50장 이미지 생성",
      "기본 자동화 3개",
      "커뮤니티 지원",
    ],
    highlighted: false,
    ctaHref: "#cta",
    ctaLabel: "무료로 시작",
  },
  {
    name: "Pro",
    subtitle: "성장하는 팀",
    price: "₩239,000",
    period: "/월",
    description: "챗봇·이미지·자동화를 본격적으로 활용하는 팀을 위한 플랜입니다.",
    features: [
      "무제한 챗봇 대화",
      "월 5,000장 이미지 생성",
      "무제한 자동화 워크플로",
      "50+ 앱 연동",
      "우선 지원",
    ],
    highlighted: true,
    ctaHref: "mailto:sales@nexus.ai",
    ctaLabel: "Pro 무료 체험",
  },
  {
    name: "Enterprise",
    subtitle: "대규모 조직",
    price: "맞춤 견적",
    period: "",
    description: "보안, 규정 준수, 전용 인프라가 필요한 엔터프라이즈 조직용입니다.",
    features: [
      "전용 AI 모델·인프라",
      "무제한 이미지 생성",
      "맞춤 자동화 컨설팅",
      "24/7 전담 지원",
      "온프레미스 배포",
    ],
    highlighted: false,
    ctaHref: "#cta",
    ctaLabel: "영업팀 문의",
  },
];

export function Pricing() {
  return (
    <Section id="pricing" className="section-rhythm-convert narrative-convert-entry" bordered>
      <div className="mb-14 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-end">
        <Reveal variant="fade-up">
          <NarrativeStep step="06" label="Get Started" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
            Start now
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            14일 무료 체험 · 신용카드 불필요. 팀 규모에 맞는 플랜을 선택하세요.
          </p>
        </Reveal>
      </div>

      <div className={`grid items-stretch ${sectionGridGap} lg:grid-cols-3`}>
        {plans.map((plan, index) => (
          <Reveal key={plan.name} variant="scale-in" delay={index * 100} className="h-full">
            <article
              className={`card-surface pricing-card card-surface-glass relative flex h-full flex-col rounded-2xl p-8 sm:p-10 ${
                plan.highlighted ? "pricing-featured" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-neon-cyan/40 bg-neon-cyan/15 px-4 py-2 text-sm font-bold tracking-wide text-neon-cyan">
                  가장 인기
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm font-semibold text-neon-cyan">
                  {plan.subtitle}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {plan.description}
                </p>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-gradient-neon sm:text-5xl">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-base text-muted-foreground">{plan.period}</span>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-base leading-relaxed text-muted"
                  >
                    <CheckIcon className="mt-1 shrink-0 text-neon-cyan" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href={plan.ctaHref}
                variant={plan.highlighted ? "primary" : "secondary"}
                showArrow={plan.highlighted}
                className="mt-10 w-full"
              >
                {plan.ctaLabel}
              </Button>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
