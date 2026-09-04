"use client";

import { useEffect, useState } from "react";
import { NexusLogo } from "@/components/ui/NexusLogo";

type LoaderPhase = "loading" | "exit" | "done";

export function PremiumLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");

  useEffect(() => {
    const minDuration = 320;
    const started = performance.now();

    const complete = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, minDuration - elapsed);

      const exitTimer = window.setTimeout(() => setPhase("exit"), wait);
      const doneTimer = window.setTimeout(() => setPhase("done"), wait + 360);

      return () => {
        window.clearTimeout(exitTimer);
        window.clearTimeout(doneTimer);
      };
    };

    if (document.readyState === "complete") {
      return complete();
    }

    window.addEventListener("load", complete, { once: true });
    return () => window.removeEventListener("load", complete);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`premium-loader ${phase === "exit" ? "premium-loader-exit" : ""}`}
      aria-hidden={phase === "exit"}
      aria-busy={phase === "loading"}
      role="status"
    >
      <div className="premium-loader-blur" />
      <div className="premium-loader-noise" />
      <div className="premium-loader-content">
        <div className="premium-loader-logo">
          <NexusLogo size="lg" layout="stack" wordmarkClassName="text-sm" />
        </div>

        <div className="premium-loader-bar" aria-hidden>
          <span className="premium-loader-bar-fill" />
          <span className="premium-loader-bar-shine" />
        </div>

        <p className="premium-loader-caption">준비 중</p>
      </div>
    </div>
  );
}
