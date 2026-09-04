import { Container } from "@/components/layout/Container";

const integrations = [
  "Slack",
  "Notion",
  "GitHub",
  "Jira",
  "Figma",
  "Google Drive",
  "Salesforce",
  "Zapier",
  "OpenAI",
  "Anthropic",
  "AWS",
  "Azure",
  "Linear",
  "Discord",
  "PostgreSQL",
];

export function IntegrationMarquee() {
  return (
    <section className="section-tint-violet py-14 sm:py-16">
      <Container>
        <div className="mb-12 text-center">
          <p className="text-sm font-bold tracking-[0.1em] text-neon-cyan uppercase">
            연동
          </p>
          <h2 className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl">
            챗봇·자동화에 바로 연결되는 도구들
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Slack, Notion, Google Drive 등 이미 쓰는 도구와 네이티브 연동
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-5">
          {integrations.map((name) => (
            <div
              key={name}
              className="flex h-14 items-center justify-center rounded-xl border border-white/90 bg-white/70 px-3 text-center text-base font-semibold text-foreground/70 shadow-sm backdrop-blur-sm transition-all hover:border-neon-cyan/30 hover:text-foreground hover:shadow-production sm:h-16"
            >
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
