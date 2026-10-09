import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import {
  type PersonIllustrationVariant,
  personIllustrations,
} from "@/components/ui/PersonIllustrations";

const testimonials: {
  quote: string;
  name: string;
  role: string;
  avatar: PersonIllustrationVariant;
  rating: number;
}[] = [
  {
    quote:
      "Our AI chatbot cut customer response time by 60%. The team now produces marketing visuals in-house with image generation.",
    name: "Seoyeon Kim",
    role: "Marketing Lead, Meridian",
    avatar: "marketing",
    rating: 5,
  },
  {
    quote:
      "We connected the daily report grind to an automation workflow, so the team can focus on strategy.",
    name: "Junhyuk Park",
    role: "Operations Manager, Lattice Health",
    avatar: "operations",
    rating: 4,
  },
  {
    quote:
      "Chat, image, and automation live in one platform, so we stopped bouncing between tools. We felt the impact within two weeks.",
    name: "Chaewon Lee",
    role: "Product Lead, Arcline",
    avatar: "product",
    rating: 3,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="testimonial-rating flex gap-1" role="img" aria-label={`${rating} out of 5`}>
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
  return (
    <Section id="testimonials" className="section-rhythm-proof narrative-proof-entry">
      <Reveal variant="fade-up">
        <div className="testimonials-section-header max-w-2xl">
          <NarrativeStep step="05" label="Why Nexus" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
            Why it works
          </h2>
          <p className="mt-6 text-base leading-[1.8] text-muted">
            See the productivity shift and proven results from teams using Nexus.
          </p>
        </div>
      </Reveal>

      <div className="features-card-grid mt-12 lg:mt-16">
        {testimonials.map((item, index) => {
          const Avatar = personIllustrations[item.avatar];

          return (
            <Reveal key={item.name} variant="fade-up" delay={index * 80} className="h-full min-w-0">
              <figure className="testimonial-card feature-card-premium card-surface card-surface-glass card-interactive flex h-full min-h-[336px] flex-col sm:min-h-[360px]">
                <StarRating rating={item.rating} />
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
              </figure>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
