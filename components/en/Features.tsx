import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { FeatureIcon } from "@/components/ui/Icons";
import { MetricBadge } from "@/components/ui/MetricBadge";

const featureCards = [
  {
    number: "01",
    label: "AI chatbot",
    title: "A conversational assistant that knows your team's knowledge",
    description:
      "Connect internal docs, customer data, and work context to answer, summarize, and analyze in one place.",
    icon: "chatbot" as const,
    surface: "card-surface-glass",
    accent: "text-neon-cyan",
    metrics: [
      { value: "RAG", label: "Answers from docs", variant: "glass" as const },
      { value: "24/7", label: "Always on", variant: "flat" as const },
    ],
  },
  {
    number: "02",
    label: "Image generation",
    title: "On-brand visuals, produced quickly",
    description:
      "Campaign banners, social content, and product mockups from a text prompt, in high resolution.",
    icon: "image" as const,
    surface: "card-surface-flat",
    accent: "text-accent-indigo",
    metrics: [
      { value: "4K", label: "High-resolution output", variant: "glass" as const },
      { value: "3s", label: "Average generation time", variant: "flat" as const },
    ],
  },
  {
    number: "03",
    label: "Workflow automation",
    title: "Turn repeat work into reliable workflows",
    description:
      "Reports, alerts, data processing, and approvals run automatically across your tools.",
    icon: "automation" as const,
    surface: "card-surface-flat",
    accent: "text-accent-indigo",
    metrics: [
      { value: "50+", label: "App integrations", variant: "glass" as const },
      { value: "70%", label: "Time saved", variant: "flat" as const },
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
            Chat, image, and automation — three core capabilities in one platform.
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
