import { sections, type SectionId } from "@/data/navigation";

export const SECTION_COUNT = sections.length;

export function getJourneyProgress(scrollTop: number, scrollableHeight: number) {
  if (scrollableHeight <= 0) return 0;
  return Math.min(1, Math.max(0, scrollTop / scrollableHeight));
}

export function navigateToSection(id: SectionId, reducedMotion: boolean) {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({
    behavior: reducedMotion ? "instant" : "smooth",
    block: "start",
  });
}
