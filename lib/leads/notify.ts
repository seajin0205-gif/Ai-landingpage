import type { LeadRow } from "@/lib/db";

export type LeadNotice = Pick<LeadRow, "id" | "name" | "company" | "email" | "inquiry_type" | "message" | "locale">;

export type Notifier = {
  name: string;
  send: (lead: LeadNotice) => Promise<void>;
};

const logNotifier: Notifier = {
  name: "log",
  async send(lead) {
    console.info("[lead]", lead.id, lead.inquiry_type, lead.email);
  },
};

function webhookNotifier(url: string, name: string): Notifier {
  return {
    name,
    async send(lead) {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `${lead.inquiry_type}: ${lead.name} (${lead.email})`, lead }),
      });
      if (!response.ok) throw new Error(`${name}_${response.status}`);
    },
  };
}

export function leadNotifiers(): Notifier[] {
  const list: Notifier[] = [logNotifier];
  if (process.env.LEAD_WEBHOOK_URL) list.push(webhookNotifier(process.env.LEAD_WEBHOOK_URL, "webhook"));
  if (process.env.SLACK_WEBHOOK_URL) list.push(webhookNotifier(process.env.SLACK_WEBHOOK_URL, "slack"));
  return list;
}

export async function notifyLead(lead: LeadNotice) {
  const delivered: string[] = [];
  const failed: string[] = [];
  for (const notifier of leadNotifiers()) {
    try {
      await notifier.send(lead);
      delivered.push(notifier.name);
    } catch {
      failed.push(notifier.name);
    }
  }
  return { delivered, failed };
}
