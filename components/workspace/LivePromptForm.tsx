"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Kind = "chat" | "image" | "automation";

const copy = {
  ko: {
    title: "워크스페이스 체험",
    kinds: { chat: "챗봇", image: "이미지", automation: "자동화" },
    placeholder: "요청을 입력하세요",
    run: "실행",
    pending: "데이터 생성 중...",
    empty: "프롬프트를 입력하세요.",
    local: "서버에 AI 키가 없어 로컬 미리보기로 응답합니다.",
  },
  en: {
    title: "Try the workspace",
    kinds: { chat: "Chat", image: "Image", automation: "Automation" },
    placeholder: "Enter a prompt",
    run: "Run",
    pending: "Generating...",
    empty: "Enter a prompt.",
    local: "No AI key is configured, so this is a local preview.",
  },
};

type Usage = { used: number; limit: number; remaining: number; plan: string };

export function LivePromptForm({ locale }: { locale: "ko" | "en" }) {
  const text = copy[locale];
  const [kind, setKind] = useState<Kind>("chat");
  const [prompt, setPrompt] = useState("");
  const [pending, setPending] = useState(false);
  const [output, setOutput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [steps, setSteps] = useState<{ name: string; detail: string }[]>([]);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState<Usage | null>(null);
  const [provider, setProvider] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = prompt.trim();
    if (!value) {
      setError(text.empty);
      return;
    }
    setPending(true);
    setError("");
    setOutput("");
    setImageUrl("");
    setSteps([]);
    setProvider("");

    const response = await fetch(`/api/ai/${kind}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: value }),
    });

    if (kind === "chat" && response.ok && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        for (const event of events) {
          const line = event.replace(/^data:\s*/, "");
          if (!line) continue;
          const payload = JSON.parse(line) as {
            delta?: string;
            done?: boolean;
            provider?: string;
            usage?: Usage;
            error?: { message?: string };
          };
          if (payload.delta) setOutput((current) => current + payload.delta);
          if (payload.provider) setProvider(payload.provider);
          if (payload.usage) setUsage(payload.usage);
          if (payload.error?.message) setError(payload.error.message);
        }
      }
      setPending(false);
      return;
    }

    const payload = (await response.json().catch(() => null)) as {
      imageUrl?: string;
      steps?: { name: string; detail: string }[];
      provider?: string;
      usage?: Usage;
      error?: { message?: string };
    } | null;
    setPending(false);
    if (!response.ok) {
      setError(payload?.error?.message || (locale === "en" ? "Request failed." : "요청이 실패했습니다."));
      return;
    }
    setImageUrl(payload?.imageUrl || "");
    setSteps(payload?.steps || []);
    setProvider(payload?.provider || "");
    setUsage(payload?.usage || null);
  }

  return (
    <form onSubmit={onSubmit} className="card-surface rounded-2xl bg-white/85 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold tracking-wide text-foreground">{text.title}</p>
        <div className="flex gap-1 rounded-full bg-white/80 p-1">
          {(["chat", "image", "automation"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setKind(item)}
              className={`rounded-full px-3 py-1 text-xs font-bold ${kind === item ? "bg-foreground text-white" : "text-muted"}`}
            >
              {text.kinds[item]}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          maxLength={kind === "image" ? 500 : kind === "automation" ? 1000 : 2000}
          placeholder={text.placeholder}
          className="h-12 min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-4 text-sm font-medium"
        />
        <Button type="submit" disabled={pending} className="h-12 px-6">
          {pending ? text.pending : text.run}
        </Button>
      </div>
      {pending && <p className="mt-3 text-sm font-medium text-muted">{text.pending}</p>}
      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      {output && <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{output}</p>}
      {imageUrl && <img src={imageUrl} alt="" className="mt-3 max-h-64 w-full rounded-xl object-cover" />}
      {steps.length > 0 && (
        <ol className="mt-3 grid gap-2">
          {steps.map((step) => (
            <li key={step.name} className="rounded-xl bg-white/80 px-3 py-2 text-sm">
              <span className="font-bold text-foreground">{step.name}</span>
              <span className="mt-1 block text-muted">{step.detail}</span>
            </li>
          ))}
        </ol>
      )}
      {provider === "local" && <p className="mt-3 text-xs text-muted">{text.local}</p>}
      {usage && (
        <p className="mt-2 text-xs text-muted">
          {usage.plan} · {usage.used}/{usage.limit}
        </p>
      )}
    </form>
  );
}
