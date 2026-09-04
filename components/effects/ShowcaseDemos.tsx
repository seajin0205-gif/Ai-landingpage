"use client";

import { useEffect, useState } from "react";
import { HeroBannerResultPreview } from "@/components/effects/DemoResultPreviews";
import {
  DemoInput,
  DemoProgressBar,
  streamText,
  SuccessBadge,
  ThinkingLoader,
  typeText,
  TypingCursor,
  useDemoWait,
} from "@/components/effects/demoShared";

const CHAT_PROMPT = "이번 달 고객 문의 TOP 5 정리해줘";
const CHAT_RESPONSE =
  "분석 완료했습니다.\n\n1. 배송 문의 — 32%\n2. 환불 요청 — 21%\n3. 제품 사용법 — 18%\n4. 교환 문의 — 15%\n5. 기타 — 14%";

type ChatPhase = "idle" | "typing" | "sent" | "thinking" | "streaming" | "done";

export function ChatShowcaseDemo() {
  const [inputText, setInputText] = useState("");
  const [phase, setPhase] = useState<ChatPhase>("idle");
  const [streamedText, setStreamedText] = useState("");
  const [showUserBubble, setShowUserBubble] = useState(false);
  const wait = useDemoWait();

  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;

    const run = async () => {
      setPhase("idle");
      setInputText("");
      setStreamedText("");
      setShowUserBubble(false);
      await wait(500, isCancelled);
      if (cancelled) return;

      setPhase("typing");
      await typeText(CHAT_PROMPT, setInputText, wait, isCancelled, 38);
      if (cancelled) return;

      setPhase("sent");
      await wait(350, isCancelled);
      if (cancelled) return;

      setShowUserBubble(true);
      setInputText("");
      setPhase("thinking");
      await wait(1200, isCancelled);
      if (cancelled) return;

      setPhase("streaming");
      await streamText(CHAT_RESPONSE, setStreamedText, wait, isCancelled);
      if (cancelled) return;

      setPhase("done");
      await wait(3200, isCancelled);
    };

    const loop = async () => {
      while (!cancelled) await run();
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, [wait]);

  const isTyping = phase === "typing";
  const isThinking = phase === "thinking";
  const isStreaming = phase === "streaming" || phase === "done";

  return (
    <div className="space-y-4 p-6">
      {/* 항상 공간을 차지하도록 렌더링해 말풍선 등장 시 레이아웃이 밀리지 않도록 함 */}
      <div
        className={`showcase-msg-user ml-auto max-w-[85%] rounded-2xl bg-neon-cyan/15 px-4 py-3 text-sm font-medium text-foreground ${
          showUserBubble ? "animate-pop-reveal" : "invisible"
        }`}
      >
        {CHAT_PROMPT}
      </div>

      <div className="min-h-[256px]">
        {isThinking && <ThinkingLoader />}
        {isStreaming && (
          <div className="showcase-msg-ai showcase-streaming-glow mr-auto max-w-[90%] rounded-2xl border border-white/90 bg-white/85 px-4 py-4 text-sm leading-relaxed text-muted">
            <p className="mb-2 text-xs font-bold tracking-wide text-neon-cyan uppercase">Nexus AI</p>
            <div className="relative">
              {/* 전체 답변 크기를 미리 확보해 스트리밍 중 박스 크기가 변하지 않도록 함 */}
              <p className="invisible whitespace-pre-line" aria-hidden>
                {CHAT_RESPONSE}
              </p>
              <p className="absolute inset-0 whitespace-pre-line text-foreground/90">
                {streamedText}
                {phase === "streaming" && <TypingCursor visible />}
              </p>
            </div>
            <div className={`mt-3 ${phase === "done" ? "" : "invisible"}`}>
              <SuccessBadge label="답변 완료" />
            </div>
          </div>
        )}
      </div>

      <DemoInput
        value={inputText}
        placeholder="질문을 입력하세요..."
        typing={isTyping}
        sendPulse={phase === "sent"}
      />
    </div>
  );
}

const IMAGE_PROMPT = "미니멀 SaaS 히어로 배너, 블루·퍼플 그라데이션";

type ImagePhase = "idle" | "typing" | "generating" | "result" | "hold";

export function ImageShowcaseDemo() {
  const [inputText, setInputText] = useState("");
  const [phase, setPhase] = useState<ImagePhase>("idle");
  const [progress, setProgress] = useState(0);
  const [resultKey, setResultKey] = useState(0);
  const wait = useDemoWait();

  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;

    const run = async () => {
      setPhase("idle");
      setInputText("");
      setProgress(0);
      setResultKey(0);
      await wait(500, isCancelled);
      if (cancelled) return;

      setPhase("typing");
      await typeText(IMAGE_PROMPT, setInputText, wait, isCancelled, 32);
      if (cancelled) return;

      setPhase("generating");
      for (let p = 0; p <= 100; p += 2) {
        if (cancelled) return;
        setProgress(p);
        await wait(28, isCancelled);
      }

      if (cancelled) return;
      setPhase("result");
      setResultKey((k) => k + 1);
      await wait(3200, isCancelled);
      if (cancelled) return;

      setPhase("hold");
      setInputText("");
      await wait(600, isCancelled);
    };

    const loop = async () => {
      while (!cancelled) await run();
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, [wait]);

  const isTyping = phase === "typing";
  const isGenerating = phase === "generating";
  const showResult = phase === "result" || phase === "hold";

  return (
    <div className="p-6">
      <DemoInput
        value={inputText ? `"${inputText}"` : ""}
        placeholder="프롬프트를 입력하세요..."
        typing={isTyping}
        accent="accent-violet"
        active={isGenerating}
      />
      {isGenerating && (
        <div className="mt-3">
          <DemoProgressBar progress={progress} />
        </div>
      )}

      <div className="relative mt-4 min-h-[224px]">
        {isGenerating && (
          <div className="showcase-image-gen flex h-[224px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-accent-violet/35 bg-accent-violet/5">
            <div className="showcase-scanline absolute inset-0" aria-hidden />
            <div className="relative z-10 flex flex-col items-center">
              <div className="showcase-glow-ring mb-4 h-16 w-16 rounded-2xl border border-accent-violet/30 bg-white/60" />
              <div className="flex gap-2">
                <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
                <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
                <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
              </div>
              <p className="mt-3 text-sm font-semibold text-accent-violet">
                이미지 생성 중... {progress}%
              </p>
            </div>
          </div>
        )}

        {showResult && resultKey > 0 && (
          <div key={resultKey} className="animate-image-pop">
            <div className="mb-3 flex items-center justify-between">
              <SuccessBadge label="생성 완료" />
              <span className="rounded-full bg-accent-lime/15 px-2 py-1 text-xs font-semibold text-accent-lime">
                4K · 2 variants
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <HeroBannerResultPreview animate variant={0} />
              <HeroBannerResultPreview animate variant={1} />
            </div>
          </div>
        )}

        {!showResult && !isGenerating && (
          <div className="flex h-[224px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/70 bg-white/30">
            <HeroBannerResultPreview animate={false} className="w-44 opacity-40" />
            <p className="mt-3 text-sm text-muted">프롬프트 입력 후 이미지가 생성됩니다</p>
          </div>
        )}
      </div>
    </div>
  );
}

const WORKFLOW_STEPS = [
  { id: "trigger", label: "매일 9시", text: "text-neon-cyan", border: "border-neon-cyan/40" },
  { id: "collect", label: "데이터 수집", text: "text-accent-violet", border: "border-accent-violet/40" },
  { id: "report", label: "보고서 생성", text: "text-accent-indigo", border: "border-accent-indigo/40" },
  { id: "slack", label: "슬랙 전송", text: "text-accent-lime", border: "border-accent-lime/40" },
];

type FlowPhase = "idle" | "running" | "complete";

export function AutomationShowcaseDemo() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [phase, setPhase] = useState<FlowPhase>("idle");
  const [lineProgress, setLineProgress] = useState(0);
  const wait = useDemoWait();

  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;

    const run = async () => {
      setPhase("idle");
      setActiveIndex(-1);
      setLineProgress(0);
      await wait(600, isCancelled);
      if (cancelled) return;

      setPhase("running");
      for (let i = 0; i < WORKFLOW_STEPS.length; i += 1) {
        if (cancelled) return;
        setActiveIndex(i);
        setLineProgress(i);
        await wait(900, isCancelled);
      }

      if (cancelled) return;
      setLineProgress(WORKFLOW_STEPS.length - 1);
      setPhase("complete");
      await wait(2800, isCancelled);
    };

    const loop = async () => {
      while (!cancelled) await run();
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, [wait]);

  return (
    <div className="p-6">
      <div className="relative">
        <svg
          className="showcase-flow-svg pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="showcase-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#6d7cff" />
              <stop offset="100%" stopColor="#9ae600" />
            </linearGradient>
          </defs>
          {[0, 1, 2].map((i) => {
            const x1 = 50 + i * 100;
            const x2 = 150 + i * 100;
            const active = lineProgress > i;
            return (
              <line
                key={i}
                x1={x1}
                y1={40}
                x2={x2}
                y2={40}
                className={`showcase-flow-line ${active ? "showcase-flow-line-active" : ""}`}
              />
            );
          })}
        </svg>

        <div className="relative grid grid-cols-4 gap-2">
          {WORKFLOW_STEPS.map((step, i) => {
            const isActive = activeIndex === i;
            const isDone = activeIndex > i || phase === "complete";
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`showcase-flow-node w-full rounded-xl border px-2 py-3 text-center transition-all duration-500 ${
                    isActive
                      ? `showcase-flow-node-active ${step.border} bg-white/90`
                      : isDone
                        ? "border-accent-lime/30 bg-accent-lime/8"
                        : "border-white/90 bg-white/60"
                  }`}
                >
                  <p
                    className={`text-xs font-bold sm:text-xs ${
                      isActive ? step.text : isDone ? "text-accent-lime" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  {isActive && <div className="showcase-node-pulse mx-auto mt-2" />}
                  {isDone && !isActive && (
                    <span className="mt-1 inline-block text-xs text-accent-lime">✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`mt-6 rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-all duration-500 ${
          phase === "complete"
            ? "showcase-complete-banner border-accent-lime/30 bg-accent-lime/8 text-accent-lime"
            : phase === "running"
              ? "border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan"
              : "border-white/80 bg-white/50 text-muted"
        }`}
      >
        {phase === "complete" && (
          <span className="demo-success-badge inline-flex items-center gap-2">
            ✓ 오늘 09:00 자동 실행 완료
          </span>
        )}
        {phase === "running" && "워크플로 실행 중..."}
        {phase === "idle" && "다음 실행 대기 중"}
      </div>
    </div>
  );
}
