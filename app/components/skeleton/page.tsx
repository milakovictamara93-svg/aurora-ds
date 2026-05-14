'use client'

import Skeleton from '@/app/components-lib/ui/Skeleton'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '08'

export default function SkeletonPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Skeleton"
        description="Layout placeholder that preserves the shape of content during initial load, reducing perceived layout shift."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Initial page or section loads where the layout is known</>,
            <>Table rows, cards, and list items loading content</>,
            <>Preventing layout shift by preserving the content shape</>,
          ]}
          dontItems={[
            <>Short indeterminate waits -- use <Code>Spinner</Code></>,
            <>Operations with known progress -- use <Code>Loading bar</Code></>,
            <>Content that loads instantly -- just show the content</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Preserve layout shape during load', use: <Code>Skeleton</Code>, not: <Code>Spinner</Code> },
            { intent: 'Short inline wait', use: <Code>Spinner</Code>, not: <Code>Skeleton</Code> },
            { intent: 'Measurable progress', use: <Code>Loading bar</Code>, not: <Code>Skeleton</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Shape matches the content it replaces: text lines, circles, rectangles.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-3">
          <Skeleton width="75%" height={12} />
          <Skeleton width="100%" height={12} />
          <Skeleton width="50%" height={12} />
          <div className="flex items-center gap-3 mt-2">
            <Skeleton width={32} height={32} rounded />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton width="40%" height={10} />
              <Skeleton width="60%" height={10} />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes">
        <TodoSection label="Skeleton adapts to the size of the content it replaces. No fixed sizes." />
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Skeleton shape must match the content it replaces. Text lines for text, circles for avatars, rectangles for images.</>,
            <>Use <Code>aria-busy="true"</Code> on the container while loading. Remove when content arrives.</>,
            <>Skeleton should transition to real content, not flash or jump.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Skeleton for indeterminate waits where layout is unknown.</>, response: <>"Use <Code>Spinner</Code> when you don't know what the content will look like."</> },
            { rule: <>Show Skeleton indefinitely without a timeout.</>, response: <>"If loading takes longer than expected, show an error state or retry option."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'aria-busy', value: <>Container sets <Code>aria-busy="true"</Code> while loading. Screen readers wait for content.</> },
            { key: 'Motion', value: <>Pulse animation respects <Code>prefers-reduced-motion</Code>.</> },
            { key: 'Alt text', value: <>Skeleton has no alt text. It is decorative and hidden from assistive technology.</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy">
        <TodoSection label="Anatomy diagram for Skeleton coming in follow-up." />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}