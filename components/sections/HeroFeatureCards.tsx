"use client";

import { Reveal } from "@/components/motion/Reveal";
import { PointerCard } from "@/components/motion/PointerCard";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { FeatureIcon } from "@/components/ui/Icons";

const icons = ["chatbot", "image", "automation"] as const;

export function HeroFeatureCards() {
  const cards = useCopy().featureCards;

  return (
    <div className="mt-12 lg:mt-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
        {cards.map((feature, index) => {
          return (
            <Reveal key={feature.id} variant="scale-in" delay={index * 80} className="flex-1">
              <PointerCard max={6} lift={4} className="card-surface card-surface-flat relative h-full overflow-hidden rounded-2xl p-6 text-left sm:p-6">
                <span className="feature-number">{feature.num} · CORE</span>
                <div className="icon-box mt-6 mb-4 h-12 w-12 rounded-xl border border-white/90 bg-white/70 text-neon-cyan shadow-sm">
                  <FeatureIcon name={icons[index]} />
                </div>
                <h3 className="hero-feature-title text-base text-foreground sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{feature.description}</p>
              </PointerCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
