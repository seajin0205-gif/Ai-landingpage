import { Reveal } from "@/components/motion/Reveal";
import { Section, sectionGridGap } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

const plans = [
  {
    name: "Starter",
    subtitle: "Individuals and small teams",
    price: "$0",
    period: "/mo",
    description: "A fit for anyone starting with the AI chatbot and image generation.",
    features: [
      "500 chatbot conversations / month",
      "50 images / month",
      "3 basic automations",
      "Community support",
    ],
    highlighted: false,
    ctaHref: "#cta",
    ctaLabel: "Start free",
  },
  {
    name: "Pro",
    subtitle: "Growing teams",
    price: "$179",
    period: "/mo",
    description: "For teams ready to use chat, image, and automation in production.",
    features: [
      "Unlimited chatbot conversations",
      "5,000 images / month",
      "Unlimited automation workflows",
      "50+ app integrations",
      "Priority support",
    ],
    highlighted: true,
    ctaHref: "mailto:sales@nexus.ai",
    ctaLabel: "Try Pro free",
  },
  {
    name: "Enterprise",
    subtitle: "Large organizations",
    price: "Custom",
    period: "",
    description: "For organizations that need security, compliance, and dedicated infrastructure.",
    features: [
      "Dedicated AI models and infrastructure",
      "Unlimited image generation",
      "Custom automation consulting",
      "24/7 dedicated support",
      "On-prem deployment",
    ],
    highlighted: false,
    ctaHref: "#cta",
    ctaLabel: "Talk to sales",
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
            14-day free trial · No credit card. Pick a plan that fits your team.
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
                  Most popular
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
