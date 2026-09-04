"use client";

import { useEffect, useRef, useState } from "react";
import { HeroBannerResultPreview } from "@/components/effects/DemoResultPreviews";

const IMAGE_PROMPT =
  "미니멀한 SaaS 랜딩 히어로 이미지, 블루·퍼플 그라데이션";

type Phase = "idle" | "typing" | "generating" | "result" | "hold";

export function ImagePreviewUI() {
  const [inputText, setInputText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [resultKey, setResultKey] = useState(0);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timersRef.current.delete(id);
        if (!cancelled) fn();
      }, ms);
      timersRef.current.add(id);
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => schedule(() => resolve(), ms));

    const runSequence = async () => {
      setPhase("typing");
      setInputText("");
      setResultKey(0);

      for (let i = 1; i <= IMAGE_PROMPT.length; i += 1) {
        if (cancelled) return;
        setInputText(IMAGE_PROMPT.slice(0, i));
        await wait(35);
      }

      if (cancelled) return;
      setPhase("generating");
      await wait(800);

      if (cancelled) return;
      setPhase("result");
      setResultKey((k) => k + 1);

      await wait(3500);
      if (cancelled) return;

      setPhase("hold");
      setInputText("");
      await wait(500);
      if (cancelled) return;
      setPhase("idle");
    };

    const loop = async () => {
      await wait(400);
      while (!cancelled) {
        await runSequence();
        await wait(600);
      }
    };

    loop();

    return () => {
      cancelled = true;
      timersRef.current.forEach(clearTimeout);
      timersRef.current.clear();
    };
  }, []);

  const showResult = phase === "result" || phase === "hold";

  return (
    <div className="p-6">
      <div
        className={`flex items-center rounded-xl border bg-white/60 px-4 py-3 transition-all duration-300 ${
          phase === "typing"
            ? "border-neon-cyan/50 shadow-[0_0_0_3px_rgba(0,212,255,0.18)]"
            : "border-white/90"
        }`}
      >
        <span
          className={`flex-1 text-sm ${
            inputText ? "font-medium text-foreground" : "text-muted-foreground"
          }`}
        >
          {inputText ? `"${inputText}"` : "프롬프트를 입력하세요..."}
          {phase === "typing" && (
            <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-neon-cyan align-middle" />
          )}
        </span>
        {phase === "generating" && (
          <span className="ml-2 flex gap-1">
            <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
            <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
            <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
          </span>
        )}
      </div>

      <div className="mt-4 min-h-[200px]">
        {phase === "generating" && (
          <div className="flex h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-accent-violet/30 bg-accent-violet/5">
            <div className="flex gap-2">
              <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
            </div>
            <p className="mt-3 text-sm font-semibold text-accent-violet">이미지 생성 중...</p>
          </div>
        )}

        {showResult && resultKey > 0 && (
          <div key={resultKey} className="animate-pop-result">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold tracking-wide text-neon-cyan uppercase">생성 결과</p>
              <span className="rounded-full bg-accent-lime/15 px-2 py-1 text-xs font-semibold text-accent-lime">
                2 variants
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <HeroBannerResultPreview animate variant={0} />
              <HeroBannerResultPreview animate variant={1} />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              nexus-hero-v1.png · nexus-hero-v2.png
            </p>
          </div>
        )}

        {!showResult && phase !== "generating" && (
          <div className="flex h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/70 bg-white/30">
            <HeroBannerResultPreview animate={false} className="w-48 opacity-40" />
            <p className="mt-3 text-sm text-muted">프롬프트 입력 후 이미지가 생성됩니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
