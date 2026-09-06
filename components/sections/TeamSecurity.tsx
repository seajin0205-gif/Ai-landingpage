import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { CheckIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

const blocks = [
  {
    label: "팀 협업",
    title: "챗봇·이미지·자동화를 팀 전체가 함께",
    description:
      "역할별 권한, 공유 워크스페이스, 실시간 협업으로 마케팅·운영·개발 팀이 하나의 AI 환경에서 일합니다. 생성된 결과물은 Slack·Notion으로 바로 공유됩니다.",
    highlights: [
      "팀별 워크스페이스 & 권한 관리",
      "대화·이미지·워크플로 히스토리 공유",
      "Slack · Notion · Google Drive 연동",
      "실시간 협업 & 댓글",
    ],
    visual: "collab" as const,
    reversed: false,
  },
  {
    label: "엔터프라이즈",
    title: "보안과 규정 준수를 기본으로",
    description:
      "SOC 2 Type II, 데이터 암호화, 온프레미스 배포 옵션까지. 민감한 사내 데이터를 안전하게 AI에 연결하고, 감사 로그로 모든 활동을 추적합니다.",
    highlights: [
      "SOC 2 Type II 인증",
      "엔드투엔드 데이터 암호화",
      "SSO · SAML 지원",
      "감사 로그 & 컴플라이언스",
    ],
    visual: "security" as const,
    reversed: true,
  },
];

function CollabVisual() {
  const members = [
    { name: "김서연", role: "마케팅", color: "from-neon-cyan/30 to-accent-violet/20" },
    { name: "박준혁", role: "운영", color: "from-accent-violet/30 to-accent-lime/20" },
    { name: "이채원", role: "프로덕트", color: "from-accent-lime/30 to-neon-cyan/20" },
  ];

  return (
    <div className="p-8 sm:p-10">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">팀 워크스페이스</p>
        <span className="rounded-full bg-accent-lime/15 px-3 py-1 text-xs font-bold text-accent-lime">
          3명 활성
        </span>
      </div>
      <div className="space-y-3">
        {members.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-4 rounded-xl border border-white/90 bg-white/70 px-4 py-4"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${m.color} text-sm font-bold text-foreground`}
            >
              {m.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent-lime" />
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-3 text-center text-sm font-semibold text-neon-cyan">
        보고서 생성 완료 → Slack #marketing 전송됨
      </div>
    </div>
  );
}

function SecurityVisual() {
  const items = [
    { label: "SOC 2 Type II", status: "인증 완료", ok: true },
    { label: "데이터 암호화", status: "AES-256", ok: true },
    { label: "SSO / SAML", status: "활성화", ok: true },
    { label: "감사 로그", status: "실시간", ok: true },
  ];

  return (
    <div className="p-8 sm:p-10">
      <p className="mb-6 text-sm font-bold text-foreground">보안 대시보드</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-white/90 bg-white/70 px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-lime/15 text-accent-lime">
                <CheckIcon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
            </div>
            <span className="text-xs font-bold text-muted-foreground">{item.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/90 bg-white/60 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-accent-lime" />
        <span className="text-xs font-medium text-muted">모든 시스템 정상 · 마지막 점검 2분 전</span>
      </div>
    </div>
  );
}

export function TeamSecurity() {
  return (
    <Section id="team-security" className="section-rhythm-proof-alt">
      <div className="mb-14 lg:mb-20">
        <Reveal variant="fade-up">
          <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Enterprise Ready</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
            팀과 보안까지 갖춘 이유
          </h2>
        </Reveal>
      </div>

      <div className="space-y-24 lg:space-y-32">
        {blocks.map((block, index) => (
          <div
            key={block.label}
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
              block.reversed ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal direction={block.reversed ? "right" : "left"} delay={index * 60}>
              <div className={block.reversed ? "lg:pl-4" : "lg:pr-4"}>
                <p className="text-sm font-bold tracking-[0.1em] text-neon-cyan uppercase">
                  {block.label}
                </p>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-tight">
                  {block.title}
                </h3>
                <p className="mt-6 text-lg leading-[1.85] text-muted">
                  {block.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {block.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="icon-box mt-1 h-6 w-6 shrink-0 rounded-full bg-neon-cyan/10 text-neon-cyan">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="text-base leading-8 text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="#cta" variant="secondary" showArrow className="mt-10">
                  자세히 알아보기
                </Button>
              </div>
            </Reveal>

            <Reveal direction={block.reversed ? "left" : "right"} delay={index * 60 + 80}>
              <div className="split-visual">
                <div className="grid-pattern">
                  {block.visual === "collab" ? <CollabVisual /> : <SecurityVisual />}
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
