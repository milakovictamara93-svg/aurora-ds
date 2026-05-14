'use client'

import Skeleton from '@/app/components-lib/ui/Skeleton'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function SkeletonPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Skeleton"
        description="Layout placeholder that preserves the shape of content during initial load, reducing perceived layout shift. Supports wave shimmer, pulse, and static animation modes."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Initial page or section loads where the final layout shape is known ahead of time</>,
            <>Table rows, cards, and list items loading content from an API</>,
            <>Preventing cumulative layout shift by reserving the exact dimensions of incoming content</>,
            <>Dashboard widgets that load independently and need individual placeholder states</>,
          ]}
          dontItems={[
            <>Short indeterminate waits where layout is unknown -- use <Code>Spinner</Code></>,
            <>Operations with known measurable progress -- use <Code>Loading bar</Code></>,
            <>Content that loads instantly (under 200ms) -- just render it directly</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Preserve layout shape during content load', use: <Code>Skeleton</Code>, not: <Code>Spinner</Code> },
            { intent: 'Short inline wait with unknown layout', use: <Code>Spinner</Code>, not: <Code>Skeleton</Code> },
            { intent: 'Measurable progress (file upload, export)', use: <Code>Loading bar</Code>, not: <Code>Skeleton</Code> },
            { intent: 'Placeholder for a single image or avatar', use: <Code>Skeleton (circle)</Code>, not: <Code>Spinner</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        {/* Text lines */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2">Text lines (wave animation)</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-3">
          <Skeleton width="80%" height={14} />
          <Skeleton width="100%" height={14} />
          <Skeleton width="60%" height={14} />
        </div>

        {/* Pulse animation */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Text lines (pulse animation)</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-3">
          <Skeleton width="80%" height={14} animation="pulse" />
          <Skeleton width="100%" height={14} animation="pulse" />
          <Skeleton width="60%" height={14} animation="pulse" />
        </div>

        {/* No animation */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Static (no animation)</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-3">
          <Skeleton width="80%" height={14} animation="none" />
          <Skeleton width="100%" height={14} animation="none" />
          <Skeleton width="60%" height={14} animation="none" />
        </div>

        {/* Avatar + text */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Avatar with text</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <div className="flex items-center gap-3">
            <Skeleton width={40} height={40} rounded="full" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton width="35%" height={12} />
              <Skeleton width="55%" height={12} />
            </div>
          </div>
        </div>

        {/* Card placeholder */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Card placeholder</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 max-w-[320px]">
          <div className="flex flex-col gap-3">
            <Skeleton width="100%" height={140} rounded="8px" />
            <Skeleton width="70%" height={16} />
            <Skeleton width="100%" height={12} />
            <Skeleton width="85%" height={12} />
            <div className="flex gap-2 mt-1">
              <Skeleton width={80} height={28} rounded="4px" />
              <Skeleton width={80} height={28} rounded="4px" />
            </div>
          </div>
        </div>

        {/* Table rows */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Table rows</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <div className="flex flex-col gap-0">
            {/* Header */}
            <div className="flex items-center gap-4 pb-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
              <Skeleton width="25%" height={10} />
              <Skeleton width="20%" height={10} />
              <Skeleton width="15%" height={10} />
              <Skeleton width="20%" height={10} />
            </div>
            {/* Rows */}
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
                <Skeleton width="25%" height={12} />
                <Skeleton width="20%" height={12} />
                <Skeleton width="15%" height={12} />
                <Skeleton width="20%" height={12} />
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard widget grid */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Dashboard widget grid</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex flex-col gap-2 p-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
                <Skeleton width="50%" height={10} />
                <Skeleton width="70%" height={24} />
                <Skeleton width="100%" height={60} rounded="4px" />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Skeleton shape and dimensions must match the content it replaces. Text lines for text, circles for avatars, rectangles for images and cards.</>,
            <>The loading container must set <Code>aria-busy="true"</Code> while content is loading. Remove the attribute when real content arrives.</>,
            <>Skeleton must transition smoothly to real content without layout shift. Match widths, heights, and gaps exactly.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Skeleton for indeterminate waits where the layout shape is unknown.</>, response: <>"Skeleton needs to mirror real content dimensions. If you do not know the layout, use <Code>Spinner</Code> instead."</> },
            { rule: <>Show Skeleton indefinitely without a timeout or fallback.</>, response: <>"If loading exceeds 10 seconds, transition to an error state with a retry button. Infinite skeletons frustrate users."</> },
            { rule: <>Use Skeleton as a decorative element or permanent placeholder.</>, response: <>"Skeleton is a transient loading state only. Never use it as a design element in a loaded view."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'aria-busy', value: <>The parent container sets <Code>aria-busy="true"</Code> while Skeletons are visible. Screen readers defer announcing content until loading completes.</> },
            { key: 'aria-hidden', value: <>Each Skeleton element uses <Code>aria-hidden="true"</Code>. It is purely decorative and invisible to assistive technology.</> },
            { key: 'Motion', value: <>Wave and pulse animations respect <Code>prefers-reduced-motion</Code>. Under reduced motion, use <Code>animation="none"</Code> for a static placeholder.</> },
            { key: 'Live region', value: <>When content finishes loading, the container should use <Code>aria-live="polite"</Code> so screen readers announce the newly loaded content.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
