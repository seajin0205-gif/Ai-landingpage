"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type PublicUser = { id: string; email: string; name: string; plan: string } | null;

export function AuthNav({ locale }: { locale: "ko" | "en" }) {
  const [user, setUser] = useState<PublicUser>(null);
  const login = locale === "en" ? "/en/login" : "/login";
  const signup = locale === "en" ? "/en/signup" : "/signup";
  const workspace = locale === "en" ? "/en/workspace" : "/workspace";

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data: { user: PublicUser }) => {
        if (active) setUser(data.user);
      })
      .catch(() => {
        if (active) setUser(null);
      });
    return () => {
      active = false;
    };
  }, []);

  if (user) {
    return (
      <Button href={workspace} className="h-10 px-4 text-sm sm:h-10 sm:px-6">
        {locale === "en" ? "Workspace" : "워크스페이스"}
      </Button>
    );
  }

  return (
    <>
      <Button variant="ghost" href={login} className="hidden sm:inline-flex">
        {locale === "en" ? "Log in" : "로그인"}
      </Button>
      <Button href={signup} className="h-10 px-4 text-sm sm:h-10 sm:px-6">
        {locale === "en" ? "Get started" : "시작하기"}
      </Button>
    </>
  );
}
