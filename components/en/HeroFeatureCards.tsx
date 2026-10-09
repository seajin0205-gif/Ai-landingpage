import { Reveal } from "@/components/motion/Reveal";
import { FeatureIcon } from "@/components/ui/Icons";

const features = [
  {
    id: "chatbot",
    num: "01",
    icon: "chatbot" as const,
    title: "AI chatbot",
    description: "Answers from your docs and data",
  },
  {
    id: "image",
    num: "02",
    icon: "image" as const,
    title: "Image generation",
    description: "On-brand visuals",
  },
  {
    id: "automation",
    num: "03",
    icon: "automation" as const,
    title: "Workflow automation",
    description: "Connect tools into workflows",
  },
];

export function HeroFeatureCards() {
  return (
    <div className="mt-12 lg:mt-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
        {features.map((feature, index) => {
          return (
            <Reveal key={feature.id} variant="scale-in" delay={index * 80} className="flex-1">
              <div className="card-surface card-surface-flat relative h-full overflow-hidden rounded-2xl p-6 text-left sm:p-6">
                <span className="feature-number">{feature.num} · CORE</span>
                <div className="icon-box mt-6 mb-4 h-12 w-12 rounded-xl border border-white/90 bg-white/70 text-neon-cyan shadow-sm">
                  <FeatureIcon name={feature.icon} />
                </div>
                <h3 className="hero-feature-title text-base text-foreground sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{feature.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
