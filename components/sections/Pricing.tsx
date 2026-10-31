"use client";

import { Reveal } from "@/components/motion/Reveal";
import { PointerCard } from "@/components/motion/PointerCard";
import { Section, sectionGridGap } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

const ctaHrefs = ["#cta", "mailto:sales@nexus.ai", "#cta"];

export function Pricing() {
  const t = useCopy();
  return (
    <Section id="pricing" className="section-rhythm-convert narrative-convert-entry" bordered>
      <div className="mb-14 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-end">
        <Reveal variant="fade-up">
          <NarrativeStep step="06" label="Get Started" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
            Start now
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {t.pricingIntro}
          </p>
        </Reveal>
      </div>

      <div className={`grid items-stretch ${sectionGridGap} lg:grid-cols-3`}>
        {t.plans.map((plan, index) => (
          <Reveal key={plan.name} variant="scale-in" delay={index * 100} className="h-full">
            <PointerCard
              as="article"
              max={4}
              lift={4}
              className={`card-surface pricing-card card-surface-glass relative flex h-full flex-col rounded-2xl p-8 sm:p-10 ${
                plan.highlighted ? "pricing-featured" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-neon-cyan/40 bg-neon-cyan/15 px-4 py-2 text-sm font-bold tracking-wide text-neon-cyan">
                  {t.popular}
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
                href={ctaHrefs[index]}
                variant={plan.highlighted ? "primary" : "secondary"}
                showArrow={plan.highlighted}
                className="mt-10 w-full"
              >
                {plan.ctaLabel}
              </Button>
            </PointerCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
