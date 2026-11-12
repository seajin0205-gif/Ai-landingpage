"use client";

import { Reveal } from "@/components/motion/Reveal";
import { PointerCard } from "@/components/motion/PointerCard";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { useCopy } from "@/components/i18n/LocaleProvider";

export function TechStack() {
  const stack = useCopy().architecture;

  return (
    <Section id="architecture" className="section-rhythm-capability" bordered>
      <Reveal variant="fade-up">
        <div className="max-w-2xl">
          <NarrativeStep step="04" label={stack.kicker} />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
            {stack.heading}
          </h2>
          <p className="mt-6 text-base leading-[1.8] text-muted">{stack.intro}</p>
        </div>
      </Reveal>

      <div className="mt-12 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-3">
        {stack.groups.map((group, index) => (
          <Reveal key={group.title} variant="fade-up" delay={index * 80} className="h-full min-w-0">
            <PointerCard
              as="article"
              max={4}
              lift={4}
              className="card-surface card-surface-glass flex h-full flex-col rounded-2xl p-8"
            >
              <p className="text-xs font-bold tracking-[0.14em] text-neon-cyan uppercase">{group.label}</p>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-foreground">{group.title}</h3>
              <p className="mt-4 flex-1 text-base leading-[1.75] text-muted">{group.description}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/90 bg-white/70 px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </PointerCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
