"use client";

import { useRef, type MouseEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { NarrativeStep } from "@/components/layout/NarrativeStep";
import { ScrollFade } from "@/components/motion/ScrollFade";
import { BrowserMockup } from "@/components/effects/BrowserMockup";
import { WorkspacePreview } from "@/components/effects/WorkspacePreview";
import { useFinePointer, usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

export function WorkspaceDemo() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const lightRef = useRef<HTMLDivElement>(null);
  const inspectRef = useRef<HTMLDivElement>(null);
  const track = fine && !reduced;

  const onZoneMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!track) return;
    const zone = event.currentTarget;
    const zoneRect = zone.getBoundingClientRect();
    const light = lightRef.current;
    if (light) {
      light.style.opacity = "1";
      light.style.transform = `translate3d(${event.clientX - zoneRect.left}px, ${event.clientY - zoneRect.top}px, 0) translate(-50%, -50%)`;
    }
    const inspect = inspectRef.current;
    if (inspect) {
      const frame = inspect.getBoundingClientRect();
      inspect.style.setProperty("--ix", `${event.clientX - frame.left}px`);
      inspect.style.setProperty("--iy", `${event.clientY - frame.top}px`);
    }
  };

  const onZoneLeave = () => {
    if (lightRef.current) lightRef.current.style.opacity = "0";
  };

  return (
    <div id="workspace-demo">
      <Section bordered className="section-rhythm-product pb-0">
        <Reveal>
          <div className="mb-4 flex flex-col gap-4 sm:mb-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <NarrativeStep step="02" label="Real Product" />
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-tight">
                The real Nexus workspace
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted lg:text-right">
              챗봇 · 이미지 · 자동화가 연결된 제품 화면을 확인하세요.
            </p>
          </div>
        </Reveal>
      </Section>

      <div
        className="workspace-demo-zone workspace-demo-canvas"
        onMouseMove={onZoneMove}
        onMouseLeave={onZoneLeave}
      >
        <div className="workspace-demo-glow" aria-hidden />
        <div ref={lightRef} className="workspace-follow-light" aria-hidden />

        <div className="workspace-demo-overflow workspace-demo-scroll">
          <div className="workspace-demo-inner-fixed">
            <ScrollFade offset={64} className="workspace-demo-scrollfade">
              <div ref={inspectRef} className="workspace-inspect" data-cursor="Live">
                <BrowserMockup className="workspace-demo-browser">
                  <div className="workspace-demo-body">
                    <WorkspacePreview />
                  </div>
                </BrowserMockup>
                <span className="workspace-inspect-sheen" aria-hidden />
              </div>
            </ScrollFade>
          </div>
        </div>

        <div className="workspace-demo-bottom-fade" aria-hidden />
      </div>
    </div>
  );
}
