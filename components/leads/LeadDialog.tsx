"use client";

import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

type InquiryType = "quote" | "sales" | "trial" | "other";

type LeadContextValue = {
  openLead: (type?: InquiryType) => void;
};

const LeadContext = createContext<LeadContextValue>({ openLead: () => {} });

export function useLead() {
  return useContext(LeadContext);
}

const copy = {
  ko: {
    title: "영업팀 문의",
    name: "이름",
    company: "회사명",
    email: "이메일",
    type: "문의 유형",
    message: "메시지",
    submit: "문의 보내기",
    sending: "접수 중...",
    success: "문의가 접수되었습니다. 영업팀에서 이어서 연락합니다.",
    close: "닫기",
    types: [
      ["quote", "맞춤 견적"],
      ["sales", "영업팀 문의"],
      ["trial", "도입 상담"],
      ["other", "기타"],
    ] as const,
  },
  en: {
    title: "Talk to sales",
    name: "Name",
    company: "Company",
    email: "Email",
    type: "Inquiry type",
    message: "Message",
    submit: "Send inquiry",
    sending: "Sending...",
    success: "Inquiry received. The sales team can follow up from this record.",
    close: "Close",
    types: [
      ["quote", "Custom quote"],
      ["sales", "Talk to sales"],
      ["trial", "Trial"],
      ["other", "Other"],
    ] as const,
  },
};

export function LeadProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "ko";
  const text = copy[locale];
  const [open, setOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>("sales");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function openLead(type: InquiryType = "sales") {
    setInquiryType(type);
    setStatus("idle");
    setError("");
    setOpen(true);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        company: data.get("company"),
        email: data.get("email"),
        inquiryType: data.get("inquiryType"),
        message: data.get("message"),
        locale,
      }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    if (!response.ok) {
      setStatus("error");
      setError(payload?.error?.message || (locale === "en" ? "Could not send the inquiry." : "문의를 보내지 못했습니다."));
      return;
    }
    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#07111c]/40 p-4 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            className="card-surface w-full max-w-lg rounded-2xl bg-white/95 p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="lead-title" className="text-2xl font-bold text-foreground">
                {text.title}
              </h2>
              <button type="button" className="text-sm font-semibold text-muted" onClick={() => setOpen(false)}>
                {text.close}
              </button>
            </div>
            {status === "success" ? (
              <p className="mt-6 text-base leading-relaxed text-foreground">{text.success}</p>
            ) : (
              <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
                <label className="grid gap-2 text-sm font-semibold text-foreground">
                  {text.name}
                  <input name="name" required maxLength={80} className="h-12 rounded-xl border border-black/10 bg-white px-4 font-medium" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-foreground">
                  {text.company}
                  <input name="company" required maxLength={120} className="h-12 rounded-xl border border-black/10 bg-white px-4 font-medium" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-foreground">
                  {text.email}
                  <input name="email" type="email" required maxLength={254} className="h-12 rounded-xl border border-black/10 bg-white px-4 font-medium" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-foreground">
                  {text.type}
                  <select
                    name="inquiryType"
                    value={inquiryType}
                    onChange={(event) => setInquiryType(event.target.value as InquiryType)}
                    className="h-12 rounded-xl border border-black/10 bg-white px-4 font-medium"
                  >
                    {text.types.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-foreground">
                  {text.message}
                  <textarea name="message" required minLength={8} maxLength={2000} rows={4} className="rounded-xl border border-black/10 bg-white px-4 py-3 font-medium" />
                </label>
                {error && <p className="text-sm font-medium text-red-600">{error}</p>}
                <Button type="submit" disabled={status === "sending"} className="w-full">
                  {status === "sending" ? text.sending : text.submit}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </LeadContext.Provider>
  );
}
