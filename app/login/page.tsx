import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuroraBackground } from "@/components/effects/AuroraBackground";

export default function LoginPage() {
  return (
    <AuroraBackground>
      <Suspense>
        <AuthForm mode="login" locale="ko" />
      </Suspense>
    </AuroraBackground>
  );
}
