"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";

export function CTA() {
  const cta = useCopy().cta;
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
              <span>{cta.badge}</span>
            </div>

            <h2
              id="cta-heading"
              className="cta-headline mt-10 text-foreground"
            >
              {cta.lines.map((line) => (
                <span key={line.text} className="line-mask">
                  <span
                    className={`cta-headline-line ${
                      line.accent ? "cta-headline-accent text-neon-cyan" : "text-gradient"
                    }`}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h2>

            <p className="cta-subline mx-auto mt-8 max-w-2xl text-muted">
              {cta.body}
            </p>

            <div className="cta-actions mt-12 sm:mt-14">
              <Button href="#pricing" size="xl" showArrow className="cta-primary-btn">
                {cta.primary}
              </Button>
              <Button
                href="mailto:sales@nexus.ai"
                variant="secondary"
                size="lg"
                className="cta-secondary-btn"
              >
                {cta.secondary}
              </Button>
            </div>

            <ul className="cta-trust-list mt-10" aria-label={cta.trustLabel}>
              {cta.trust.map((label) => (
                <li key={label} className="cta-trust-pill">
                  <span className="cta-trust-pill-icon" aria-hidden>
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
