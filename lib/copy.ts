import { enCopy } from "@/messages/en";
import { koCopy } from "@/messages/ko";

export type { Copy } from "@/messages/ko";
export type Locale = "ko" | "en";

export const copy = { ko: koCopy, en: enCopy };

export function formatStat(kind: "chat" | "images" | "saved" | "teams", n: number, locale: Locale) {
  if (kind === "saved") return `${Math.round(n)}%`;
  if (kind === "teams") return `${Math.round(n)}+`;
  if (locale === "ko") {
    if (kind === "chat") return `${Math.round(n / 10_000_000) / 10}억+`;
    return `${Math.round(n / 100_000) / 10}만+`;
  }
  return `${Math.round(n / 1_000_000)}M+`;
}
