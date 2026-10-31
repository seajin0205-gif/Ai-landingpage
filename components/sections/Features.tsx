"use client";

import { Reveal } from "@/components/motion/Reveal";
import { PointerCard } from "@/components/motion/PointerCard";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { FeatureIcon } from "@/components/ui/Icons";
import { MetricBadge } from "@/components/ui/MetricBadge";

const visuals = [
  { icon: "chatbot" as const, surface: "card-surface-glass", accent: "text-neon-cyan" },
  { icon: "image" as const, surface: "card-surface-flat", accent: "text-accent-indigo" },
  { icon: "automation" as const, surface: "card-surface-flat", accent: "text-accent-indigo" },
];

export function Features() {
  const t = useCopy();
  return (
    <Section id="features" className="section-rhythm-capability">
      <Reveal variant="fade-up">
        <div className="features-section-header max-w-2xl">
          <NarrativeStep step="03" label="Capabilities" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
            What you can do
          </h2>
          <p className="mt-6 text-base leading-[1.8] text-muted">
            {t.featuresIntro}
          </p>
        </div>
      </Reveal>

      <div className="features-card-grid mt-12 lg:mt-16">
        {t.features.map((card, index) => {
          const visual = visuals[index];
          return (
          <Reveal key={card.label} variant="fade-up" delay={index * 80} className="h-full min-w-0">
            <PointerCard
              as="article"
              max={4.5}
              lift={6}
              className={`feature-card-premium card-surface card-interactive group flex h-full min-h-[336px] flex-col p-8 sm:min-h-[360px] sm:p-8 ${visual.surface}`}
            >
              <span className="feature-number relative z-[1]">{card.number} · {card.label}</span>
              <div
                className={`icon-box feature-card-icon relative z-[1] mt-6 mb-6 h-12 w-12 rounded-xl border border-white/90 bg-white/70 shadow-sm ${visual.accent}`}
              >
                <FeatureIcon name={visual.icon} />
              </div>
              <h3 className="relative z-[1] text-xl font-extrabold tracking-tight text-foreground">
                {card.title}
              </h3>
              <p className="relative z-[1] mt-4 flex-1 text-base leading-[1.8] text-muted">
                {card.description}
              </p>
              <div className="relative z-[1] mt-8 grid grid-cols-2 gap-2">
                {card.metrics.map((metric, metricIndex) => (
                  <MetricBadge
                    key={metric.label}
                    value={metric.value}
                    label={metric.label}
                    variant={metricIndex === 0 ? "glass" : "flat"}
                  />
                ))}
              </div>
            </PointerCard>
          </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
