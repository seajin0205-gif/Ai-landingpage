import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuroraBackground } from "@/components/effects/AuroraBackground";

export default function SignupPage() {
  return (
    <AuroraBackground>
      <Suspense>
        <AuthForm mode="signup" locale="ko" />
      </Suspense>
    </AuroraBackground>
  );
}
