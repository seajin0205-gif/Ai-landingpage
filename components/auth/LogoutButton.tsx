"use client";

import { Button } from "@/components/ui/Button";

export function LogoutButton({ locale }: { locale: "ko" | "en" }) {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = locale === "en" ? "/en" : "/";
      }}
    >
      {locale === "en" ? "Log out" : "로그아웃"}
    </Button>
  );
}
