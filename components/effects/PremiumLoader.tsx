"use client";

import { useEffect, useState } from "react";
import { NexusLogo } from "@/components/ui/NexusLogo";

type LoaderPhase = "loading" | "exit" | "done";

export function PremiumLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");

  useEffect(() => {
    const minDuration = 320;
    const started = performance.now();
    let exitTimer = 0;
    let doneTimer = 0;

    const complete = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, minDuration - elapsed);
      exitTimer = window.setTimeout(() => setPhase("exit"), wait);
      doneTimer = window.setTimeout(() => setPhase("done"), wait + 360);
    };

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    return () => {
      window.removeEventListener("load", complete);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
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
