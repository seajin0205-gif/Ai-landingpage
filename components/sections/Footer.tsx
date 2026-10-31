"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/layout/Container";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { NexusLogo } from "@/components/ui/NexusLogo";

export function Footer() {
  const footer = useCopy().footer;
  return (
    <footer className="border-t border-foreground/6 py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,1fr)] lg:gap-12">
            <div>
              <Link
                href={footer.home}
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
                {footer.blurb}
              </p>
            </div>

            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-base font-bold text-foreground">{column.title}</p>
                <ul className="mt-6 space-y-4">
                  {column.links.map((link) => (
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
