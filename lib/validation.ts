const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function asObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function cleanString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function isEmail(value: string) {
  return value.length <= 254 && EMAIL.test(value);
}

export function safeNextPath(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
  return value;
}
