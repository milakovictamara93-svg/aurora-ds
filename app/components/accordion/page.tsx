'use client'

import Accordion from '@/app/components-lib/ui/Accordion'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function AccordionPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Accordion"
        description="Compact collapsible rows that reveal content on demand. Used to progressively disclose grouped information."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Progressive disclosure of grouped content</>,
            <>FAQ-style question/answer lists</>,
            <>Settings panels with many sections</>,
            <>Reducing visual clutter on content-heavy pages</>,
          ]}
          dontItems={[
            <>Switching between views -- use <Code>Tabs</Code></>,
            <>Navigation -- use sidebar or <Code>Tabs</Code></>,
            <>Content the user needs to see simultaneously -- keep it visible</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Show/hide content sections progressively', use: <Code>Accordion</Code>, not: <Code>Tabs</Code> },
            { intent: 'Switch between related sibling views', use: <Code>Tabs</Code>, not: <Code>Accordion</Code> },
            { intent: 'Detailed content that needs to be compared', use: <>Keep visible on page</>, not: <Code>Accordion</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Single-open (default) or multiple panels open simultaneously.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
          <div>
            <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2 font-mono">single-open (default)</p>
            <Accordion
              items={[
                { id: '1', label: 'Energy', content: 'Energy consumption metrics and targets.' },
                { id: '2', label: 'GHG Emissions', content: 'Greenhouse gas emissions by scope.' },
                { id: '3', label: 'Water', content: 'Water usage and recycling data.' },
              ]}
              defaultOpen="1"
            />
          </div>
          <div>
            <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2 font-mono">multiple</p>
            <Accordion
              items={[
                { id: 'a', label: 'Scope 1', content: 'Direct emissions from owned sources.' },
                { id: 'b', label: 'Scope 2', content: 'Indirect emissions from purchased energy.' },
                { id: 'c', label: 'Scope 3', content: 'All other indirect emissions.' },
              ]}
              multiple
              defaultOpen={['a', 'b']}
            />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Each item needs a unique <Code>id</Code> and a <Code>label</Code>.</>,
            <>Content can be any React node. Keep it concise -- long content defeats the purpose of progressive disclosure.</>,
            <>Use <Code>defaultOpen</Code> to pre-expand important sections on page load.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Use Accordion for page navigation.</>, response: <>"Use <Code>Tabs</Code> or sidebar navigation. Accordion is for content disclosure, not wayfinding."</> },
            { rule: <>Nest Accordions more than one level deep.</>, response: <>"Deeply nested accordions are disorienting. Flatten the content or use a different layout."</> },
            { rule: <>Put critical information inside a collapsed accordion without a default-open.</>, response: <>"If the content is critical, keep it visible or pre-expand the section."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Trigger: <Code>&lt;button&gt;</Code> with <Code>aria-expanded</Code> and <Code>aria-controls</Code>. Panel: <Code>role="region"</Code> with <Code>aria-labelledby</Code>.</> },
            { key: 'Keyboard', value: <><Code>Enter</Code> or <Code>Space</Code> toggles the panel. <Code>Tab</Code> moves between triggers.</> },
            { key: 'Focus', value: <>Visible focus ring on the trigger button.</> },
            { key: 'Animation', value: <>Panel expand/collapse respects <Code>prefers-reduced-motion</Code>.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}