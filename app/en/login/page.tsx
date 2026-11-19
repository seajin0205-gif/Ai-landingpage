import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuroraBackground } from "@/components/effects/AuroraBackground";

export default function EnglishLoginPage() {
  return (
    <AuroraBackground>
      <Suspense>
        <AuthForm mode="login" locale="en" />
      </Suspense>
    </AuroraBackground>
  );
}
