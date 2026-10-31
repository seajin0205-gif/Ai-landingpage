"use client";

import { Reveal } from "@/components/motion/Reveal";
import { PointerCard } from "@/components/motion/PointerCard";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { personIllustrations } from "@/components/ui/PersonIllustrations";

function StarRating({ rating, suffix }: { rating: number; suffix: string }) {
  return (
    <div className="testimonial-rating flex gap-1" role="img" aria-label={`${rating} ${suffix}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className={index < rating ? "text-amber-400" : "text-slate-200"}
        >
          <path d="M10 1.5 12.47 6.5l5.53.8-4 3.9.94 5.5L10 14.3l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useCopy();
  return (
    <Section id="testimonials" className="section-rhythm-proof narrative-proof-entry">
      <Reveal variant="fade-up">
        <div className="testimonials-section-header max-w-2xl">
          <NarrativeStep step="05" label="Why Nexus" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
            Why it works
          </h2>
          <p className="mt-6 text-base leading-[1.8] text-muted">
            {t.testimonialsIntro}
          </p>
        </div>
      </Reveal>

      <div className="features-card-grid mt-12 lg:mt-16">
        {t.testimonials.map((item, index) => {
          const Avatar = personIllustrations[item.avatar];

          return (
            <Reveal key={item.name} variant="fade-up" delay={index * 80} className="h-full min-w-0">
              <PointerCard
                as="figure"
                max={4.5}
                lift={6}
                className="testimonial-card feature-card-premium card-surface card-surface-glass card-interactive flex h-full min-h-[336px] flex-col sm:min-h-[360px]"
              >
                <StarRating rating={item.rating} suffix={t.ratingSuffix} />
                <blockquote className="testimonial-quote relative z-[1] flex-1 text-base leading-[1.85] text-foreground/90">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="testimonial-author relative z-[1] mt-auto flex items-center gap-4 border-t border-foreground/6 pt-6">
                  <div className="testimonial-avatar shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-white/90">
                    <Avatar className="h-full w-full" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{item.name}</p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </figcaption>
              </PointerCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
