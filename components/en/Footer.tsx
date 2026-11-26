import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/layout/Container";
import { NexusLogo } from "@/components/ui/NexusLogo";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Docs", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
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
                href="/en"
                className="group flex items-center gap-2 transition-opacity hover:opacity-90"
              >
                <NexusLogo
                  size="md"
                  showTagline
                  tagline="Chat · Image · Automation"
                  wordmarkClassName="text-sm"
                  taglineClassName="text-xs"
                />
              </Link>
              <p className="mt-6 max-w-sm text-base leading-[1.8] text-muted">
                AI chatbot, image generation, and workflow automation in one platform.
                Take your team&apos;s productivity further.
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
