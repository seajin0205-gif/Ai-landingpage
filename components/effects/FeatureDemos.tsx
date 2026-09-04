"use client";

import { useEffect, useState } from "react";
import { HeroBannerResultPreview } from "@/components/effects/DemoResultPreviews";
import {
  DemoInput,
  DemoProgressBar,
  DemoShell,
  streamText,
  SuccessBadge,
  ThinkingLoader,
  typeText,
  useDemoWait,
} from "@/components/effects/demoShared";

const CHAT_PROMPT = "Q3 매출 데이터 분석해줘";
const CHAT_REPLY = "전월 대비 +23% 성장. 주요 채널은 검색·SNS입니다.";

export function BentoChatDemo() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "thinking" | "streaming" | "done">("idle");
  const [showUser, setShowUser] = useState(false);
  const wait = useDemoWait();

  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;

    const run = async () => {
      setPhase("idle");
      setInput("");
      setReply("");
      setShowUser(false);
      await wait(800, isCancelled);
      if (cancelled) return;

      setPhase("typing");
      await typeText(CHAT_PROMPT, setInput, wait, isCancelled, 42);
      if (cancelled) return;

      setShowUser(true);
      setInput("");
      setPhase("thinking");
      await wait(900, isCancelled);
      if (cancelled) return;

      setPhase("streaming");
      await streamText(CHAT_REPLY, setReply, wait, isCancelled, 24);
      if (cancelled) return;

      setPhase("done");
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
    <DemoShell className="mt-6 space-y-2">
      {/* 항상 공간을 차지하도록 렌더링해 말풍선 등장 시 레이아웃이 밀리지 않도록 함 */}
      <div
        className={`ml-auto max-w-[88%] rounded-lg bg-neon-cyan/12 px-3 py-2 text-xs font-medium text-foreground ${
          showUser ? "animate-pop-reveal" : "invisible"
        }`}
      >
        {CHAT_PROMPT}
      </div>
      <div className="min-h-[72px]">
        {phase === "thinking" && <ThinkingLoader compact label="분석 중" />}
        {(phase === "streaming" || phase === "done") && (
          <div className="mr-4 rounded-lg bg-white/80 px-3 py-2 text-xs leading-relaxed text-muted shadow-sm">
            <div className="relative">
              {/* 전체 답변 크기를 미리 확보해 스트리밍 중 박스 크기가 변하지 않도록 함 */}
              <span className="invisible" aria-hidden>
                {CHAT_REPLY}
              </span>
              <span className="absolute inset-0">
                {reply}
                {phase === "streaming" && <span className="showcase-cursor" />}
              </span>
            </div>
            <div className={`mt-2 ${phase === "done" ? "" : "invisible"}`}>
              <SuccessBadge label="분석 완료" />
            </div>
          </div>
        )}
      </div>
      <DemoInput
        value={input}
        placeholder="메시지 입력..."
        typing={phase === "typing"}
        sendPulse={phase === "typing" && input.length === CHAT_PROMPT.length}
      />
    </DemoShell>
  );
}

const IMAGE_PROMPT = "마케팅 배너 생성";

export function BentoImageDemo() {
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "generating" | "done">("idle");
  const [resultKey, setResultKey] = useState(0);
  const wait = useDemoWait();

  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;

    const run = async () => {
      setPhase("idle");
      setInput("");
      setProgress(0);
      setResultKey(0);
      await wait(1000, isCancelled);
      if (cancelled) return;

      setPhase("typing");
      await typeText(IMAGE_PROMPT, setInput, wait, isCancelled, 38);
      if (cancelled) return;

      setPhase("generating");
      for (let p = 0; p <= 100; p += 4) {
        if (cancelled) return;
        setProgress(p);
        await wait(30, isCancelled);
      }

      if (cancelled) return;
      setPhase("done");
      setResultKey((k) => k + 1);
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
    <DemoShell className="mt-6 space-y-2">
      <DemoInput
        value={input ? `"${input}"` : ""}
        placeholder="프롬프트 입력..."
        typing={phase === "typing"}
        accent="accent-violet"
        active={phase === "generating"}
      />
      {phase === "generating" && <DemoProgressBar progress={progress} />}
      <div className="relative min-h-[88px]">
        {phase === "generating" && (
          <div className="flex h-[88px] flex-col items-center justify-center rounded-lg border border-dashed border-accent-violet/30 bg-accent-violet/5">
            <div className="flex gap-1">
              <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-accent-violet" />
            </div>
            <p className="mt-2 text-xs font-semibold text-accent-violet">{progress}%</p>
          </div>
        )}
        {phase === "done" && resultKey > 0 && (
          <div key={resultKey} className="animate-image-pop">
            <HeroBannerResultPreview animate variant={0} className="w-full" />
            <div className="mt-2 flex justify-center">
              <SuccessBadge label="생성 완료" />
            </div>
          </div>
        )}
        {phase === "idle" && (
          <div className="flex h-[88px] items-center justify-center rounded-lg border border-dashed border-white/60 bg-white/25">
            <p className="text-xs text-muted">이미지 미리보기</p>
          </div>
        )}
        {phase === "typing" && (
          <div className="flex h-[88px] items-center justify-center rounded-lg border border-dashed border-white/60 bg-white/25">
            <p className="text-xs text-muted">프롬프트 대기 중...</p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}

const FLOW = ["트리거", "처리", "전송"];

export function BentoAutomationDemo() {
  const [activeStep, setActiveStep] = useState(-1);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const wait = useDemoWait();

  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;

    const run = async () => {
      setPhase("idle");
      setActiveStep(-1);
      await wait(900, isCancelled);
      if (cancelled) return;

      setPhase("running");
      for (let i = 0; i < FLOW.length; i += 1) {
        if (cancelled) return;
        setActiveStep(i);
        await wait(750, isCancelled);
      }

      if (cancelled) return;
      setPhase("done");
      await wait(2500, isCancelled);
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
    <DemoShell className="mt-6">
      <div className="relative flex items-center justify-center gap-2">
        {FLOW.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`rounded-lg px-2 py-2 text-center text-xs font-bold transition-all duration-400 sm:text-xs ${
                activeStep === i
                  ? "showcase-flow-node-active border border-neon-cyan/40 bg-white/90 text-neon-cyan shadow-production"
                  : activeStep > i || phase === "done"
                    ? "border border-accent-lime/30 bg-accent-lime/10 text-accent-lime"
                    : "border border-white/80 bg-white/60 text-muted"
              }`}
            >
              {label}
              {(activeStep > i || phase === "done") && activeStep !== i && (
                <span className="ml-1">✓</span>
              )}
            </div>
            {i < FLOW.length - 1 && (
              <span
                className={`text-xs transition-colors ${
                  activeStep > i ? "text-neon-cyan" : "text-muted-foreground/50"
                }`}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        {phase === "running" && (
          <p className="text-xs font-semibold text-neon-cyan sm:text-xs">워크플로 실행 중...</p>
        )}
        {phase === "done" && <SuccessBadge label="자동화 완료" />}
        {phase === "idle" && (
          <p className="text-xs text-muted sm:text-xs">다음 실행 대기</p>
        )}
      </div>
    </DemoShell>
  );
}
