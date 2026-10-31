"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { NexusLogoMark } from "@/components/ui/NexusLogo";

export function Navigation() {
  const t = useCopy();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 pt-4">
      <Container
        as="nav"
        className={`nav-bar premium-shadow-smooth flex h-14 items-center justify-between rounded-2xl px-6 sm:h-16 sm:px-6 ${
          scrolled
            ? "nav-bar-scrolled blur-premium border-b border-gray-100/90 bg-white/80"
            : "glass-strong shadow-premium"
        }`}
      >
        <Link href={t.footer.home} data-cursor="Home" className="group flex items-center gap-2">
          <NexusLogoMark variant="header" />
          <span className="nav-wordmark whitespace-nowrap text-base font-bold leading-none text-foreground">
            Nexus AI
          </span>
          <span className="hidden items-center gap-2 rounded-full border border-white/90 bg-white/70 px-6 py-2 text-sm font-bold tracking-[0.08em] text-muted shadow-sm backdrop-blur-sm sm:inline-flex">
            {t.brand.pill}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {t.nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-cursor="Go"
                className="nav-link rounded-lg px-4 py-2 text-sm font-semibold tracking-[0.06em] text-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={t.nav.switchHref}
            hrefLang={t.nav.switchLabel === "EN" ? "en" : "ko"}
            className="shrink-0 rounded-lg px-2 py-2 text-xs font-bold tracking-[0.14em] text-muted transition-colors hover:text-foreground"
          >
            {t.nav.switchLabel}
          </Link>
          <span className="hidden sm:inline-flex">
            <Button variant="ghost" href="#">
              {t.nav.login}
            </Button>
          </span>
          <Button href="#cta" className="h-10 whitespace-nowrap px-3 text-sm sm:px-6">
            {t.nav.start}
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/60 shadow-sm transition-colors hover:bg-white/90 lg:hidden"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d={menuOpen ? "M4 4l8 8M12 4l-8 8" : "M2 4h12M2 8h12M2 12h12"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </Container>
      {menuOpen && (
        <Container className="lg:hidden">
          <div id="mobile-navigation" className="mobile-nav-panel mt-2 grid gap-1 rounded-2xl px-4 py-4">
            <Link
              href="#"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-muted transition-colors hover:bg-white/70 hover:text-foreground sm:hidden"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.login}
            </Link>
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="Go"
                className="rounded-xl px-4 py-3 text-sm font-semibold text-muted transition-colors hover:bg-white/70 hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      )}
    </header>
  );
}
