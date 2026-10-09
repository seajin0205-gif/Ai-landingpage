import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const trustBadges = [
  { icon: "✓", label: "14 days free" },
  { icon: "✓", label: "No credit card" },
  { icon: "✓", label: "Full English support" },
];

export function CTA() {
  return (
    <section id="cta" className="cta-finale" aria-labelledby="cta-heading">
      <div className="cta-aurora-layer" aria-hidden>
        <div className="cta-aurora-blob cta-aurora-blob-1 motion-glow-aurora" />
      </div>

      <div className="cta-radial-glow" aria-hidden />
      <div className="cta-grid-overlay" aria-hidden />

      <div className="cta-finale-inner">
        <Reveal variant="scale-in">
          <div className="cta-finale-content">
            <div className="cta-trust-badge">
              <span className="cta-trust-badge-dot" aria-hidden />
              <span>500+ teams chose Nexus AI</span>
            </div>

            <h2
              id="cta-heading"
              className="cta-headline mt-10 text-foreground"
            >
              <span className="cta-headline-line text-gradient">
                Go further.
              </span>
              <span className="cta-headline-line cta-headline-accent text-neon-cyan">
                Start now.
              </span>
            </h2>

            <p className="cta-subline mx-auto mt-8 max-w-2xl text-muted">
              Chat, image, and automation in one platform. Setup takes five minutes,
              and the whole team can collaborate right away.
            </p>

            <div className="cta-actions mt-12 sm:mt-14">
              <Button href="#pricing" size="xl" showArrow className="cta-primary-btn">
                Start free trial
              </Button>
              <Button
                href="mailto:sales@nexus.ai"
                variant="secondary"
                size="lg"
                className="cta-secondary-btn"
              >
                Talk to sales
              </Button>
            </div>

            <ul className="cta-trust-list mt-10" aria-label="Trust badges">
              {trustBadges.map((badge) => (
                <li key={badge.label} className="cta-trust-pill">
                  <span className="cta-trust-pill-icon" aria-hidden>
                    {badge.icon}
                  </span>
                  {badge.label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
