import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { CheckIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

const blocks = [
  {
    label: "Team collaboration",
    title: "Chat, image, and automation for the whole team",
    description:
      "Role-based access, shared workspaces, and live collaboration let marketing, ops, and engineering work in one AI environment. Finished work goes straight to Slack and Notion.",
    highlights: [
      "Workspaces and permissions by team",
      "Shared history for chats, images, and workflows",
      "Slack, Notion, and Google Drive",
      "Live collaboration and comments",
    ],
    visual: "collab" as const,
    reversed: false,
  },
  {
    label: "Enterprise",
    title: "Security and compliance, built in",
    description:
      "SOC 2 Type II, encryption, and an on-prem deploy option. Connect sensitive internal data safely and trace every action in the audit log.",
    highlights: [
      "SOC 2 Type II certified",
      "End-to-end data encryption",
      "SSO and SAML",
      "Audit logs and compliance",
    ],
    visual: "security" as const,
    reversed: true,
  },
];

function CollabVisual() {
  const members = [
    { name: "Seoyeon Kim", role: "Marketing", color: "from-neon-cyan/30 to-accent-violet/20" },
    { name: "Junhyuk Park", role: "Operations", color: "from-accent-violet/30 to-accent-lime/20" },
    { name: "Chaewon Lee", role: "Product", color: "from-accent-lime/30 to-neon-cyan/20" },
  ];

  return (
    <div className="p-8 sm:p-10">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">Team workspace</p>
        <span className="rounded-full bg-accent-lime/15 px-3 py-1 text-xs font-bold text-accent-lime">
          3 online
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
        Report ready → sent to Slack #marketing
      </div>
    </div>
  );
}

function SecurityVisual() {
  const items = [
    { label: "SOC 2 Type II", status: "Certified", ok: true },
    { label: "Data encryption", status: "AES-256", ok: true },
    { label: "SSO / SAML", status: "Enabled", ok: true },
    { label: "Audit log", status: "Live", ok: true },
  ];

  return (
    <div className="p-8 sm:p-10">
      <p className="mb-6 text-sm font-bold text-foreground">Security dashboard</p>
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
        <span className="text-xs font-medium text-muted">All systems normal · last check 2 min ago</span>
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
            Built for teams and security
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
                  Learn more
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
