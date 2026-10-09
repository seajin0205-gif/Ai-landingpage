"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";

const faqs = [
  {
    question: "What data does the AI chatbot learn from?",
    answer:
      "It answers with RAG over your docs, wiki, CRM, and knowledge base. Enterprise security options keep that data from being sent to external models.",
  },
  {
    question: "How do image quality and copyright work?",
    answer:
      "4K output is supported, and commercial rights depend on your plan. On Pro and above, you own the copyright to images you generate.",
  },
  {
    question: "Can I set up automation without code?",
    answer:
      "Yes. The visual workflow builder is drag and drop. Webhooks and API connections are there when you need them.",
  },
  {
    question: "Can I use all three features together?",
    answer:
      "Yes. Generate an image in a chat, then hand that result to an automation workflow. The three features connect in one platform.",
  },
  {
    question: "How long is the trial, and how does pricing work?",
    answer:
      "The 14-day trial includes every core feature. After that, choose Starter (free), Pro, or Enterprise. You can start without a credit card.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="section-rhythm-convert-light pb-8">
      <Reveal variant="fade-up">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Before You Start</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Questions before you start
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={item.question} variant="fade-up" delay={index * 60}>
              <div className={`faq-item faq-item-flat rounded-xl ${isOpen ? "faq-item-open" : ""}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left text-base font-bold text-foreground sm:text-lg"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/80 text-neon-cyan shadow-sm"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden
                    >
                      <path
                        d="M6 2v8M2 6h8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-8 pb-6 text-base leading-[1.85] text-muted sm:text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
