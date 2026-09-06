"use client";

import { useEffect, useState } from "react";
import { HeroBannerResultPreview } from "@/components/effects/DemoResultPreviews";
import { isDemoFrozen, useCancellableWait } from "@/components/effects/useCancellableWait";

const PROMPT = "미니멀 SaaS 히어로 배너 만들어줘";

type Phase = "typing" | "generating" | "result" | "done";

let resultCounter = 0;

export function HeroImageDemo() {
  const [inputText, setInputText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [progress, setProgress] = useState(0);
  const [resultKey, setResultKey] = useState(0);
  const createWait = useCancellableWait();

  useEffect(() => {
    const { wait, isCancelled, cancel } = createWait();

    const runSequence = async () => {
      setPhase("typing");
      setInputText("");
      setProgress(0);

      for (let i = 1; i <= PROMPT.length; i += 1) {
        if (isCancelled()) return;
        setInputText(PROMPT.slice(0, i));
        await wait(42);
      }
      await wait(380);
      if (isCancelled()) return;

      setInputText(PROMPT);
      setPhase("generating");
      for (let p = 0; p <= 100; p += 4) {
        if (isCancelled()) return;
        setProgress(p);
        await wait(38);
      }
      if (isCancelled()) return;

      resultCounter += 1;
      setResultKey(resultCounter);
      setPhase("result");
      await wait(700);
      if (isCancelled()) return;

      setPhase("done");
      await wait(2800);
    };

    const loop = async () => {
      await wait(500);
      while (!isCancelled()) {
        await runSequence();
        if (isCancelled()) return;
        await wait(700);
      }
    };

    if (!isDemoFrozen()) loop();

    return cancel;
  }, [createWait]);

  const isTyping = phase === "typing";
  const isGenerating = phase === "generating";
  const showResult = phase === "result" || phase === "done";
  const isDone = phase === "done";

  const statusLabel = isDone
    ? "✓ Done"
    : isGenerating
      ? "Generating..."
      : isTyping
        ? "Ready"
        : "Complete";

  return (
    <div className="hero-image-demo-fixed relative mx-auto">
      <div
        className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-neon-cyan/15 via-accent-violet/10 to-accent-lime/10 blur-3xl transition-opacity duration-500 ${
          isGenerating || isDone ? "hero-demo-glow-pulse opacity-100" : "opacity-70"
        }`}
        aria-hidden
      />

      <div
        className={`shadow-float relative overflow-hidden rounded-2xl border border-white/90 bg-white/60 backdrop-blur-2xl transition-shadow duration-500 ${
          isGenerating ? "hero-demo-card-glow" : isDone ? "hero-demo-card-success" : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200/70 bg-white/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan/30 to-accent-violet/25 text-xs font-bold">
              N
            </span>
            <p className="text-sm font-bold text-foreground">Nexus AI</p>
          </div>
          <span
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 ${
              isDone
                ? "bg-accent-lime/15 text-accent-lime"
                : isGenerating
                  ? "bg-accent-violet/15 text-accent-violet"
                  : showResult
                    ? "bg-neon-cyan/15 text-neon-cyan"
                    : "bg-slate-100 text-muted-foreground"
            }`}
          >
            {isDone && (
              <span className="hero-success-check inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent-lime text-xs text-white">
                ✓
              </span>
            )}
            {statusLabel}
          </span>
        </div>

        <div className="hero-image-demo-content p-6">
          <div className="hero-image-demo-panel">
            {isGenerating && (
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-accent-violet/30 bg-accent-violet/5 px-6">
                <div className="flex gap-2">
                  <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
                  <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
                  <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
                </div>
                <p className="mt-3 text-sm font-semibold text-accent-violet">이미지 생성 중...</p>
                <div className="mt-4 w-full max-w-[240px] overflow-hidden rounded-full bg-white/60">
                  <div
                    className="showcase-progress-bar h-2 rounded-full bg-gradient-to-r from-accent-violet to-neon-cyan transition-[width] duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-bold text-accent-violet">{progress}%</p>
              </div>
            )}

            {showResult && (
              <div key={resultKey} className="flex h-full flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold tracking-wide text-neon-cyan uppercase">생성 결과</p>
                  <span
                    className={`rounded-full bg-accent-lime/15 px-2 py-1 text-xs font-semibold text-accent-lime transition-all duration-500 ${
                      isDone ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    nexus-hero-banner.png
                  </span>
                </div>
                <div className="relative mx-auto min-h-0 w-full max-w-[304px] flex-1 animate-hero-image-in">
                  <HeroBannerResultPreview animate className="w-full" />
                </div>
              </div>
            )}

            {isTyping && (
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300/70 bg-slate-50/40 px-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-slate-300" />
                    <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" className="text-slate-300" />
                    <path d="M3 16l4.5-3.5L12 15l4-3.5L21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-300" />
                  </svg>
                </div>
                <p className="mt-3 text-xs font-medium text-muted">프롬프트를 입력하세요</p>
              </div>
            )}
          </div>

          <div
            className={`mt-3 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 transition-all duration-300 ${
              isTyping
                ? "border-neon-cyan/50 shadow-[0_0_0_3px_rgba(0,212,255,0.18)]"
                : "border-slate-200/80"
            }`}
          >
            <div className="flex min-w-0 flex-1 items-center">
              <span
                className={`truncate text-sm ${
                  inputText ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {inputText || "프롬프트 입력..."}
              </span>
              {isTyping && <span className="hero-cursor-blink ml-1 inline-block h-4 w-1 shrink-0 bg-neon-cyan" />}
            </div>
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neon-cyan text-xs font-bold text-white transition-transform duration-300 ${
                isTyping ? "scale-105" : ""
              }`}
            >
              ↑
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
