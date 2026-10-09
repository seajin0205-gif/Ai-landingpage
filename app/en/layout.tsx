import type { Metadata } from "next";
import { SetDocumentLang } from "@/components/en/SetDocumentLang";

export const metadata: Metadata = {
  title: "Nexus AI — AI chatbot, image generation, and workflow automation",
  description:
    "AI chatbot, image generation, and workflow automation in one platform. Chat, visualize, and automate repeat work.",
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SetDocumentLang lang="en" />
      {children}
    </>
  );
}
