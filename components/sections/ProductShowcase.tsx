"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Section, sectionHeaderMbSpacious } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { CheckIcon, FeatureIcon } from "@/components/ui/Icons";
import {
  AutomationShowcaseDemo,
  ChatShowcaseDemo,
  ImageShowcaseDemo,
} from "@/components/effects/ShowcaseDemos";

const showcases = [
  {
    id: "chatbot",
    icon: "chatbot" as const,
    label: "AI 챗봇",
    title: "맥락을 이해하는 대화형 어시스턴트",
    description:
      "사내 문서, CRM, 지식 베이스를 연결해 정확한 답변을 제공합니다. 팀원 누구나 자연어로 질문하고 즉시 결과를 받을 수 있습니다.",
    highlights: [
      "사내 문서·위키 기반 RAG 검색",
      "대화 히스토리 및 컨텍스트 유지",
      "팀별 맞춤 프롬프트 템플릿",
      "Slack·Teams 채널 연동",
    ],
    previewTitle: "Nexus 챗봇",
    previewContent: "chat" as const,
  },
  {
    id: "image",
    icon: "image" as const,
    label: "이미지 생성",
    title: "텍스트 한 줄로 완성되는 비주얼",
    description:
      "마케팅 배너, SNS 콘텐츠, 제품 목업까지 프롬프트만 입력하면 고품질 이미지를 생성합니다. 스타일 프리셋으로 브랜드 일관성도 유지하세요.",
    highlights: [
      "다양한 스타일 프리셋 (사진·일러스트·3D)",
      "4K 고해상도 출력 지원",
      "배치 생성 및 변형(Variation)",
      "챗봇 대화에서 바로 이미지 생성",
    ],
    previewTitle: "이미지 스튜디오",
    previewContent: "image" as const,
  },
  {
    id: "automation",
    icon: "automation" as const,
    label: "업무 자동화",
    title: "반복 업무를 워크플로로 자동화",
    description:
      "보고서 작성, 데이터 정리, 알림 발송 등 반복 작업을 드래그 앤 드롭으로 연결합니다. 챗봇·이미지 생성 결과도 워크플로에 바로 활용하세요.",
    highlights: [
      "비주얼 워크플로 빌더",
      "50+ 앱 네이티브 연동",
      "스케줄·트리거 기반 자동 실행",
      "실행 로그 및 오류 알림",
    ],
    previewTitle: "자동화 빌더",
    previewContent: "automation" as const,
  },
];

function LivePreview({ type }: { type: "chat" | "image" | "automation" }) {
  if (type === "chat") return <ChatShowcaseDemo />;
  if (type === "image") return <ImageShowcaseDemo />;
  return <AutomationShowcaseDemo />;
}

export function ProductShowcase() {
  const [activeId, setActiveId] = useState(showcases[0].id);
  const active = showcases.find((s) => s.id === activeId) ?? showcases[0];

  return (
    <Section id="showcase" variant="spacious">
      <Reveal>
        <SectionHeader
          label="제품 둘러보기"
          title="세 가지 핵심 기능을 자세히 살펴보세요"
          description="AI 챗봇, 이미지 생성, 업무 자동화 — 실시간 데모로 각 기능이 어떻게 동작하는지 확인하세요."
          align="center"
          className={sectionHeaderMbSpacious}
        />
      </Reveal>

      <div className="mb-12 flex flex-wrap justify-center gap-3 lg:mb-16">
        {showcases.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-base font-semibold transition-all ${
              activeId === item.id
                ? "border-neon-cyan/40 bg-neon-cyan/10 text-foreground shadow-production"
                : "border-white/90 bg-white/60 text-muted hover:bg-white/80"
            }`}
          >
            <FeatureIcon name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal variant="left" key={`copy-${active.id}`}>
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {active.title}
            </h3>
            <p className="mt-6 text-lg leading-[1.85] text-muted">{active.description}</p>

            <ul className="mt-10 space-y-6">
              {active.highlights.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="icon-box mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-neon-cyan/20 to-accent-violet/15 text-neon-cyan shadow-sm">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="pt-1 text-base leading-[1.75] text-muted sm:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="scale-in" delay={80}>
          <div className="showcase-preview-wrap relative">
            <div className="showcase-live-glow motion-glow" aria-hidden />
            <div className="showcase-preview-card card-surface card-surface-frosted relative overflow-hidden rounded-2xl lg:rounded-3xl">
              <div className="flex items-center justify-between border-b border-white/80 bg-white/40 px-6 py-4">
                <p className="text-base font-bold text-foreground">{active.previewTitle}</p>
                <span className="showcase-live-badge flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <span className="showcase-glow-dot" />
                  Live Demo
                </span>
              </div>
              <div className="grid-pattern" key={active.id}>
                <LivePreview type={active.previewContent} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
