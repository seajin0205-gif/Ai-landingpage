"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";

const faqs = [
  {
    q: "AI 챗봇은 어떤 데이터를 학습하나요?",
    a: "사내 문서, 위키, CRM, 지식 베이스를 연결해 RAG(검색 증강 생성) 방식으로 답변합니다. 외부 모델에 데이터가 전송되지 않도록 엔터프라이즈 보안 옵션도 제공합니다.",
  },
  {
    q: "이미지 생성 품질과 저작권은 어떻게 되나요?",
    a: "4K 고해상도 출력을 지원하며, 생성된 이미지의 상업적 사용 권한은 플랜에 따라 제공됩니다. Pro 이상 플랜에서는 생성 이미지의 저작권이 사용자에게 귀속됩니다.",
  },
  {
    q: "업무 자동화는 코딩 없이 설정할 수 있나요?",
    a: "네. 비주얼 워크플로 빌더로 드래그 앤 드롭만으로 자동화를 구성할 수 있습니다. 고급 사용자를 위해 Webhook과 API 연동도 지원합니다.",
  },
  {
    q: "세 가지 기능을 함께 사용할 수 있나요?",
    a: "챗봇 대화 중 이미지를 생성하고, 그 결과를 자동화 워크플로에 연결하는 등 세 기능이 하나의 플랫폼에서 자연스럽게 연동됩니다.",
  },
  {
    q: "무료 체험 기간과 요금제는 어떻게 되나요?",
    a: "14일 무료 체험으로 모든 핵심 기능을 사용할 수 있습니다. 체험 후 Starter(무료), Pro, Enterprise 플랜 중 선택할 수 있으며, 신용카드 없이 시작할 수 있습니다.",
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
            시작 전 궁금한 점
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={item.q} variant="fade-up" delay={i * 60}>
              <div className={`faq-item faq-item-flat rounded-xl ${isOpen ? "faq-item-open" : ""}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left text-base font-bold text-foreground sm:text-lg"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
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
                      {item.a}
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
