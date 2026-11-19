"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Mode = "login" | "signup";

const copy = {
  ko: {
    loginTitle: "로그인",
    signupTitle: "시작하기",
    name: "이름",
    email: "이메일",
    password: "비밀번호",
    submitLogin: "로그인",
    submitSignup: "계정 만들기",
    sending: "확인 중...",
    toSignup: "계정이 없나요? 회원가입",
    toLogin: "이미 계정이 있나요? 로그인",
    home: "홈으로",
    note: "소셜 로그인은 같은 계정 테이블의 provider 필드로 확장할 수 있습니다.",
  },
  en: {
    loginTitle: "Log in",
    signupTitle: "Get started",
    name: "Name",
    email: "Email",
    password: "Password",
    submitLogin: "Log in",
    submitSignup: "Create account",
    sending: "Checking...",
    toSignup: "No account yet? Sign up",
    toLogin: "Already have an account? Log in",
    home: "Back home",
    note: "Social login can be added later through the account provider field.",
  },
};

export function AuthForm({ mode, locale }: { mode: Mode; locale: "ko" | "en" }) {
  const text = copy[locale];
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const next = params.get("next") || (locale === "en" ? "/en/workspace" : "/workspace");
  const otherHref = mode === "login"
    ? `${locale === "en" ? "/en/signup" : "/signup"}?next=${encodeURIComponent(next)}`
    : `${locale === "en" ? "/en/login" : "/login"}?next=${encodeURIComponent(next)}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        next,
      }),
    });
    const payload = (await response.json().catch(() => null)) as {
      next?: string;
      error?: { message?: string };
    } | null;
    if (!response.ok) {
      setPending(false);
      setError(payload?.error?.message || (locale === "en" ? "Could not continue." : "진행하지 못했습니다."));
      return;
    }
    router.push(payload?.next || next);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
      <Link href={locale === "en" ? "/en" : "/"} className="text-sm font-semibold text-muted">
        {text.home}
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-foreground">
        {mode === "login" ? text.loginTitle : text.signupTitle}
      </h1>
      <form className="card-surface mt-8 grid gap-4 rounded-2xl bg-white/80 p-6" onSubmit={onSubmit}>
        {mode === "signup" && (
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            {text.name}
            <input name="name" required maxLength={80} className="h-12 rounded-xl border border-black/10 bg-white px-4 font-medium" />
          </label>
        )}
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          {text.email}
          <input name="email" type="email" required autoComplete="email" className="h-12 rounded-xl border border-black/10 bg-white px-4 font-medium" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          {text.password}
          <input
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={200}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="h-12 rounded-xl border border-black/10 bg-white px-4 font-medium"
          />
        </label>
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? text.sending : mode === "login" ? text.submitLogin : text.submitSignup}
        </Button>
      </form>
      <Link href={otherHref} className="mt-4 text-sm font-semibold text-foreground">
        {mode === "login" ? text.toSignup : text.toLogin}
      </Link>
      <p className="mt-6 text-sm leading-relaxed text-muted">{text.note}</p>
    </div>
  );
}
