"use client";

import { useEffect, useState } from "react";
import { ResultPreviewByType } from "@/components/effects/DemoResultPreviews";
import { isDemoFrozen, useCancellableWait } from "@/components/effects/useCancellableWait";

const DEMOS = [
  {
    prompt: "이번 주 마케팅 보고서 요약해줘",
    response: "마케팅 보고서를 생성했습니다.",
    detail: "PDF · 핵심 지표 3종 · 주간 차트 포함",
    type: "report" as const,
  },
  {
    prompt: "미니멀 SaaS 히어로 배너 만들어줘",
    response: "히어로 배너 이미지를 생성했습니다.",
    detail: "PNG 4K · 미니멀 · 블루-퍼플 그라데이션",
    type: "image" as const,
  },
  {
    prompt: "내일 팀 미팅 일정 잡아줘",
    response: "캘린더 초대를 보냈습니다.",
    detail: "Google Meet · 참석자 5명 · 내일 10:00",
    type: "calendar" as const,
  },
];

type Phase = "idle" | "typing" | "sending" | "thinking" | "streaming" | "result" | "hold";
type NavId = "chat" | "image" | "automation" | "workflow" | "history";

type ActiveResult = {
  key: number;
  prompt: string;
  response: string;
  detail: string;
  type: (typeof DEMOS)[number]["type"];
};

type HistoryItem = {
  prompt: string;
  type: (typeof DEMOS)[number]["type"];
};

let resultCounter = 0;

function ResultIcon({ type }: { type: ActiveResult["type"] }) {
  if (type === "image") {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5.5" cy="6.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 11l3-2.5 2.5 2 3-3.5L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6h12M5 1.5V4M11 1.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 12V8M6 12V5M9 12V7M12 12V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function navFromDemo(type: (typeof DEMOS)[number]["type"]): NavId {
  if (type === "image") return "image";
  if (type === "calendar") return "automation";
  return "chat";
}

export function WorkspacePreview() {
  const [inputText, setInputText] = useState("");
  const [phase, setPhase] = useState<Phase>("result");
  const [activeResult, setActiveResult] = useState<ActiveResult | null>({
    key: 999,
    prompt: DEMOS[0].prompt,
    response: DEMOS[0].response,
    detail: DEMOS[0].detail,
    type: DEMOS[0].type,
  });
  const [streamedResponse, setStreamedResponse] = useState("");
  const [sidebarType, setSidebarType] = useState<(typeof DEMOS)[number]["type"]>("report");
  const [imageProgress, setImageProgress] = useState(0);
  const [flowStep, setFlowStep] = useState(-1);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    { prompt: DEMOS[0].prompt, type: "report" },
  ]);
  const createWait = useCancellableWait();

  useEffect(() => {
    const { wait, isCancelled, cancel } = createWait();

    const typePrompt = async (prompt: string) => {
      setActiveResult(null);
      setPhase("typing");
      setInputText("");
      for (let i = 1; i <= prompt.length; i += 1) {
        if (isCancelled()) return;
        setInputText(prompt.slice(0, i));
        await wait(40);
      }
    };

    const runDemo = async (demo: (typeof DEMOS)[number]) => {
      setFlowStep(-1);
      setImageProgress(0);
      setStreamedResponse("");
      await typePrompt(demo.prompt);
      if (isCancelled()) return;

      setPhase("sending");
      await wait(280);
      if (isCancelled()) return;

      setInputText("");
      setPhase("thinking");
      setSidebarType(demo.type);

      if (demo.type === "image") {
        for (let p = 0; p <= 100; p += 5) {
          if (isCancelled()) return;
          setImageProgress(p);
          await wait(40);
        }
      } else {
        await wait(850);
      }
      if (isCancelled()) return;

      setPhase("streaming");
      for (let i = 1; i <= demo.response.length; i += 1) {
        if (isCancelled()) return;
        setStreamedResponse(demo.response.slice(0, i));
        await wait(28);
      }
      if (isCancelled()) return;

      resultCounter += 1;
      const result: ActiveResult = {
        key: resultCounter,
        prompt: demo.prompt,
        response: demo.response,
        detail: demo.detail,
        type: demo.type,
      };

      setPhase("result");
      setActiveResult(result);
      setHistoryItems((prev) => {
        const next = [{ prompt: demo.prompt, type: demo.type }, ...prev.filter((h) => h.prompt !== demo.prompt)];
        return next.slice(0, 5);
      });

      for (let s = 0; s < 3; s += 1) {
        if (isCancelled()) return;
        setFlowStep(s);
        await wait(400);
      }
      setFlowStep(3);

      setPhase("hold");
      await wait(3500);
      if (isCancelled()) return;

      setPhase("idle");
      setStreamedResponse("");
      setFlowStep(-1);
    };

    const loop = async () => {
      await wait(500);
      let index = 0;
      while (!isCancelled()) {
        await runDemo(DEMOS[index % DEMOS.length]);
        index += 1;
        await wait(600);
      }
    };

    if (!isDemoFrozen()) loop();

    return cancel;
  }, [createWait]);

  const isThinking = phase === "thinking";
  const isStreaming = phase === "streaming";
  const showResult = activeResult && (phase === "result" || phase === "hold");
  const flowLabels = ["보고서 생성", "슬랙 전송", "완료"];

  const activeNav: NavId = (() => {
    if (phase === "hold" && flowStep >= 3) return "history";
    if ((phase === "result" || phase === "hold") && flowStep >= 0) return "workflow";
    if (isThinking || isStreaming || phase === "typing" || phase === "sending") {
      return navFromDemo(sidebarType);
    }
    if (activeResult) return navFromDemo(activeResult.type);
    return "chat";
  })();

  const mainPanelLabel =
    activeNav === "image"
      ? "Image Studio"
      : activeNav === "automation"
        ? "Automation"
        : activeNav === "workflow"
          ? "Workflow Builder"
          : activeNav === "history"
            ? "Session History"
            : "AI Chat";

  const mainContent = (
    <>
      <div className="mb-4">
        {activeNav === "history" && phase === "hold" ? (
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4">
            <p className="text-xs font-bold tracking-wide text-muted uppercase">Recent Sessions</p>
            <ul className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto">
              {historyItems.map((item) => (
                <li
                  key={item.prompt}
                  className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neon-cyan/10 text-neon-cyan">
                    <ResultIcon type={item.type} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">{item.prompt}</p>
                    <p className="mt-1 text-xs text-muted-foreground">방금 · 완료</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : isThinking ? (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-neon-cyan/30 bg-neon-cyan/5 px-4 py-6">
            <div className="flex gap-2">
              <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-neon-cyan" />
            </div>
            <p className="mt-3 text-sm font-semibold text-neon-cyan">AI가 결과를 생성하는 중...</p>
            {sidebarType === "image" && imageProgress > 0 && (
              <p className="mt-2 text-xs font-bold text-accent-violet">{imageProgress}%</p>
            )}
          </div>
        ) : isStreaming ? (
          <div className="flex h-full flex-col rounded-2xl border border-neon-cyan/30 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold tracking-wide text-neon-cyan uppercase">Nexus AI</p>
            <p className="mt-3 text-sm font-medium text-foreground">
              {streamedResponse}
              <span className="showcase-cursor" />
            </p>
          </div>
        ) : showResult && activeResult ? (
          <div
            key={activeResult.key}
            className="demo-success-badge animate-pop-result flex h-full flex-col overflow-hidden rounded-2xl border border-neon-cyan/30 bg-white p-4 shadow-glow"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/25 to-accent-violet/20 text-neon-cyan">
                <ResultIcon type={activeResult.type} />
              </span>
              <p className="text-xs font-bold tracking-wide text-neon-cyan uppercase">생성 결과</p>
            </div>
            <p className="mt-3 text-base font-bold text-foreground">{activeResult.response}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{activeResult.detail}</p>
            <div className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-xl">
              <ResultPreviewByType type={activeResult.type} animate className="w-full" />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/90 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-slate-300/70 bg-slate-50/60 px-4 py-6 text-center">
            <p className="text-sm font-medium text-muted">프롬프트를 입력하면</p>
            <p className="mt-1 text-sm font-medium text-muted">결과가 여기에 표시됩니다</p>
          </div>
        )}
      </div>

      {activeNav !== "history" && (
        <div
          className={`flex items-center gap-2 rounded-xl border bg-white px-4 py-2 transition-all duration-300 ${
            phase === "typing"
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
              {inputText || "메시지 입력..."}
            </span>
            {phase === "typing" && (
              <span className="hero-cursor-blink ml-1 inline-block h-4 w-1 shrink-0 bg-neon-cyan" />
            )}
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-cyan text-xs font-bold text-white">
            ↑
          </span>
        </div>
      )}
    </>
  );

  const previewPanel = (
    <div className="dashboard-preview-side shrink-0">
      <p className="mb-3 text-xs font-bold tracking-wide text-muted uppercase">생성물 미리보기</p>
      <div className="dashboard-preview-preview-frame relative overflow-hidden rounded-xl">
        {showResult || isStreaming ? (
          <ResultPreviewByType
            type={sidebarType}
            animate={!!showResult}
            className="w-full"
            variant={sidebarType === "image" ? 1 : 0}
          />
        ) : isThinking && sidebarType === "image" && imageProgress > 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-accent-violet/30 bg-accent-violet/5 p-3">
            <div className="w-full overflow-hidden rounded-full bg-white/50">
              <div
                className="showcase-progress-bar h-1 rounded-full bg-gradient-to-r from-accent-violet to-neon-cyan"
                style={{ width: `${imageProgress}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-bold text-accent-violet">{imageProgress}%</p>
          </div>
        ) : (
          <ResultPreviewByType type="image" animate={false} className="w-full opacity-60" />
        )}
      </div>
      <p className="mt-2 text-center text-xs font-medium text-muted-foreground">
        {showResult ? "방금 생성됨" : isThinking && imageProgress > 0 ? "생성 중..." : "미리보기"}
      </p>
    </div>
  );

  return (
    <div className="dashboard-preview-fixed">
      <div className="dashboard-preview-card relative overflow-hidden rounded-2xl border border-white/90 bg-white/95 backdrop-blur-2xl">
        <div className="dashboard-preview-header flex items-center justify-between border-b border-slate-200/70 bg-white/60 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/30 to-accent-violet/25 text-sm font-bold">
              N
            </span>
            <div>
              <p className="text-base font-bold text-foreground">Nexus AI Workspace</p>
            </div>
          </div>
          <div className="flex gap-2">
            {["챗봇", "이미지", "자동화"].map((tab, i) => (
              <span
                key={tab}
                className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                  i === 0 ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted-foreground"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        <div className="dashboard-preview-body flex min-h-0 shrink-0">
          <div className="dashboard-preview-grid grid-pattern grid shrink-0 gap-0">
            <div className="dashboard-preview-main border-r border-slate-200/60">
              <p className="mb-3 text-xs font-bold tracking-wide text-muted uppercase">{mainPanelLabel}</p>
              {mainContent}
            </div>
            {previewPanel}
          </div>
        </div>

        <div className="dashboard-preview-footer border-t border-slate-200/70 bg-white/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-accent-lime">● Automation</span>
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
              {flowLabels.flatMap((step, i) => {
                const items = [
                  <span
                    key={step}
                    className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium transition-all duration-300 ${
                      flowStep >= i
                        ? "bg-accent-lime/20 font-bold text-accent-lime demo-success-badge"
                        : "bg-white/70 text-foreground"
                    }`}
                  >
                    {step}
                    {flowStep > i && " ✓"}
                  </span>,
                ];
                if (i < flowLabels.length - 1) {
                  items.push(
                    <span key={`arrow-${i}`} className="shrink-0 text-xs text-muted-foreground">
                      →
                    </span>,
                  );
                }
                return items;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
