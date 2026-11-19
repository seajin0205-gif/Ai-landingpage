type ChatResult = { text: string; provider: "openai" | "local" };
type ImageResult = { imageUrl: string; provider: "openai" | "local" };
type AutomationResult = {
  steps: { name: string; detail: string }[];
  provider: "openai" | "local";
};

function openAiKey() {
  return process.env.OPENAI_API_KEY?.trim() || "";
}

function baseUrl() {
  return (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
}

async function openAiChat(prompt: string, system: string) {
  const response = await fetch(`${baseUrl()}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
    }),
  });
  if (!response.ok) {
    throw new Error(`openai_${response.status}`);
  }
  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() || "";
}

export async function generateChat(prompt: string): Promise<ChatResult> {
  if (!openAiKey()) {
    return {
      provider: "local",
      text: `Local preview. The server has no OPENAI_API_KEY, so this reply stays on the app server.\n\nPrompt: ${prompt}`,
    };
  }
  const text = await openAiChat(
    prompt,
    "You are Nexus AI, a concise workspace assistant. Answer in the same language as the user.",
  );
  return { provider: "openai", text };
}

export async function generateImage(prompt: string): Promise<ImageResult> {
  if (!openAiKey()) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="640" viewBox="0 0 1024 640">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e7f7ff"/><stop offset="1" stop-color="#efeaff"/></linearGradient></defs>
      <rect width="1024" height="640" fill="url(#g)"/>
      <text x="64" y="280" fill="#0c1a2e" font-size="42" font-family="sans-serif">Local image preview</text>
      <text x="64" y="340" fill="#3d5a73" font-size="24" font-family="sans-serif">${escapeXml(prompt).slice(0, 80)}</text>
    </svg>`;
    return { provider: "local", imageUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}` };
  }

  const response = await fetch(`${baseUrl()}/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_IMAGE_MODEL || "dall-e-3",
      prompt,
      size: "1024x1024",
      response_format: "url",
    }),
  });
  if (!response.ok) throw new Error(`openai_${response.status}`);
  const data = (await response.json()) as { data?: { url?: string }[] };
  const imageUrl = data.data?.[0]?.url;
  if (!imageUrl) throw new Error("openai_empty_image");
  return { provider: "openai", imageUrl };
}

export async function generateAutomation(prompt: string): Promise<AutomationResult> {
  if (!openAiKey()) {
    return {
      provider: "local",
      steps: [
        { name: "Intent", detail: prompt },
        { name: "Plan", detail: "Break the request into a repeatable workflow." },
        { name: "Run", detail: "Local preview only. Connect OPENAI_API_KEY to draft this with a model." },
      ],
    };
  }
  const text = await openAiChat(
    prompt,
    'Return JSON only: {"steps":[{"name":"string","detail":"string"}]} with 3 to 5 steps.',
  );
  try {
    const parsed = JSON.parse(text) as { steps?: { name?: string; detail?: string }[] };
    const steps = (parsed.steps || [])
      .map((step) => ({ name: String(step.name || "").slice(0, 80), detail: String(step.detail || "").slice(0, 280) }))
      .filter((step) => step.name && step.detail)
      .slice(0, 5);
    if (steps.length) return { provider: "openai", steps };
  } catch {
    /* fall through */
  }
  return {
    provider: "openai",
    steps: [{ name: "Draft", detail: text.slice(0, 500) }],
  };
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
