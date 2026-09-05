import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GlassTitle } from "@/components/ui/GlassTitle";

const trustBadges = [
  { icon: "✓", label: "14일 무료" },
  { icon: "✓", label: "신용카드 불필요" },
  { icon: "✓", label: "한국어 완벽 지원" },
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
              <span>500+ 팀이 Nexus AI를 선택했습니다</span>
            </div>

            <GlassTitle
              as="h2"
              id="cta-heading"
              className="cta-headline mt-10"
              lines={["업무의 다음 챕터,", "지금 시작하세요"]}
            />

            <p className="cta-subline mx-auto mt-8 max-w-2xl text-muted">
              챗봇 · 이미지 · 자동화를 한 플랫폼에서. 설정은 5분, 팀 전체가 바로
              협업할 수 있습니다.
            </p>

            <div className="cta-actions mt-12 sm:mt-14">
              <Button href="#pricing" size="xl" showArrow className="cta-primary-btn">
                무료 체험 시작하기
              </Button>
              <Button
                href="mailto:sales@nexus.ai"
                variant="secondary"
                size="lg"
                className="cta-secondary-btn"
              >
                영업팀 문의
              </Button>
            </div>

            <ul className="cta-trust-list mt-10" aria-label="신뢰 배지">
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
