'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function ProsePage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Prose" description="Applies typographic defaults to long-form HTML content. Use around CMS output, rich-text editor previews, or server-rendered HTML blocks." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Styling CMS-authored HTML content</>, <>Rich text editor preview panels</>, <>Server-rendered HTML blocks that need consistent typography</>]}
          dontItems={[<>Markdown strings -- use <Code>Markdown</Code> (it handles parsing + styling)</>, <>Structured data -- use <Code>Formatted</Code></>, <>UI layouts -- use regular components</>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Style pre-existing HTML', use: <Code>Prose</Code>, not: <Code>Markdown</Code> },
          { intent: 'Parse and render a markdown string', use: <Code>Markdown</Code>, not: <Code>Prose</Code> },
          { intent: 'Format numbers and dates', use: <Code>Formatted</Code>, not: <Code>Prose</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
          <p>Wrap any HTML content in <Code>&lt;Prose&gt;</Code> to apply design-system typography: line-height, heading sizes, paragraph spacing, list styles, link colors, code styling. No class names needed on inner elements.</p>
        </div>
      </SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Content must be trusted or sanitized HTML. Prose does not sanitize.</>,
          <>Headings in the content should follow a logical hierarchy.</>,
          <>Max-width the Prose container for readability (640-720px recommended).</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Prose for UI layout.</>, response: <>"Prose is for long-form content, not app UI. Use Tailwind utilities for layout."</> },
          { rule: <>Render untrusted HTML inside Prose.</>, response: <>"Prose does not sanitize. Sanitize first, then wrap in Prose."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Semantics', value: <>Prose preserves the semantic HTML structure. Headings, lists, and links retain their roles.</> },
          { key: 'Contrast', value: <>All text colors meet WCAG AA against both light and dark backgrounds.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}