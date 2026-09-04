import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/layout/Container";
import { NexusLogo } from "@/components/ui/NexusLogo";

const footerLinks = {
  제품: [
    { label: "기능", href: "#features" },
    { label: "요금제", href: "#pricing" },
    { label: "변경 로그", href: "#" },
    { label: "문서", href: "#" },
  ],
  회사: [
    { label: "소개", href: "#" },
    { label: "블로그", href: "#" },
    { label: "채용", href: "#" },
    { label: "문의", href: "#" },
  ],
  법적고지: [
    { label: "개인정보처리방침", href: "#" },
    { label: "이용약관", href: "#" },
    { label: "보안", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-foreground/6 py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,1fr)] lg:gap-12">
            <div>
              <Link
                href="/"
                className="group flex items-center gap-2 transition-opacity hover:opacity-90"
              >
                <NexusLogo
                  size="md"
                  showTagline
                  wordmarkClassName="text-sm"
                  taglineClassName="text-xs"
                />
              </Link>
              <p className="mt-6 max-w-sm text-base leading-[1.8] text-muted">
                AI 챗봇, 이미지 생성, 업무 자동화를 하나의 플랫폼에서.
                팀의 생산성을 한 단계 끌어올리세요.
              </p>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <nav key={category} aria-label={category}>
                <p className="text-base font-bold text-foreground">{category}</p>
                <ul className="mt-6 space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="premium-link text-base text-muted transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-foreground/6 pt-8 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Nexus AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="premium-link text-sm text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
