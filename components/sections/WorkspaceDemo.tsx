"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { ScrollFade } from "@/components/motion/ScrollFade";
import { BrowserMockup } from "@/components/effects/BrowserMockup";
import { WorkspacePreview } from "@/components/effects/WorkspacePreview";

export function WorkspaceDemo() {
  return (
    <>
      <Section id="workspace-demo" bordered className="section-rhythm-product pb-0">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <NarrativeStep step="02" label="Real Product" />
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
                실제 Nexus 워크스페이스
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted lg:text-right">
              챗봇 · 이미지 · 자동화가 연결된 제품 화면을 확인하세요.
            </p>
          </div>
        </Reveal>
      </Section>

      <div className="workspace-demo-zone workspace-demo-canvas">
        <div className="workspace-demo-glow" aria-hidden />

        <div className="workspace-demo-overflow workspace-demo-scroll">
          <div className="workspace-demo-inner-fixed">
            <ScrollFade offset={64} className="workspace-demo-scrollfade">
              <BrowserMockup className="workspace-demo-browser">
                <div className="workspace-demo-body">
                  <WorkspacePreview />
                </div>
              </BrowserMockup>
            </ScrollFade>
          </div>
        </div>

        <div className="workspace-demo-bottom-fade" aria-hidden />
      </div>
    </>
  );
}
