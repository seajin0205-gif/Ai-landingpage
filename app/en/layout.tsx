import type { Metadata } from "next";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.en.meta.title,
  description: copy.en.meta.description,
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
