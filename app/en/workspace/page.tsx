import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { LivePromptForm } from "@/components/workspace/LivePromptForm";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EnglishWorkspacePage() {
  const user = await getSessionUser();
  if (!user) redirect("/en/login?next=/en/workspace");

  return (
    <AuroraBackground>
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-wide text-neon-cyan">{user.plan}</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">{user.name}</h1>
            <p className="mt-1 text-sm text-muted">{user.email}</p>
          </div>
          <LogoutButton locale="en" />
        </div>
        <LivePromptForm locale="en" />
        <Link href="/en" className="text-sm font-semibold text-muted">
          Back home
        </Link>
      </main>
    </AuroraBackground>
  );
}
