'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function MarkdownPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Markdown" description="Renders raw Markdown strings as styled HTML. Sanitizes input. Supports headings, lists, code blocks, links, and tables." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Rendering user-authored markdown content (comments, descriptions, notes)</>, <>Displaying API responses that contain markdown</>, <>Documentation content stored as .md files</>]}
          dontItems={[<>Formatting structured data (numbers, dates) -- use <Code>Formatted</Code></>, <>Styling pre-existing HTML -- use <Code>Prose</Code></>, <>Rich text editing -- use a WYSIWYG editor</>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Render a markdown string', use: <Code>Markdown</Code>, not: <Code>Prose</Code> },
          { intent: 'Style existing HTML content', use: <Code>Prose</Code>, not: <Code>Markdown</Code> },
          { intent: 'Format numbers and dates', use: <Code>Formatted</Code>, not: <Code>Markdown</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
          <p>Renders headings (h1-h6), paragraphs, lists (ordered/unordered), code blocks (inline and fenced), links, images, tables, blockquotes, and horizontal rules. All styled with design-system typography tokens.</p>
        </div>
      </SectionWrapper>
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Input must be sanitized before rendering. XSS attacks via markdown are real.</>,
          <>Links render with <Code>target="_blank"</Code> and <Code>rel="noopener noreferrer"</Code> by default.</>,
          <>Code blocks use the system monospace font and code-bg color token.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Render unsanitized user markdown.</>, response: <>"Always sanitize. Use a library like DOMPurify or rehype-sanitize."</> },
          { rule: <>Use Markdown for structured data display.</>, response: <>"Use <Code>Formatted</Code> for numbers/dates, <Code>Table</Code> for tabular data."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Headings', value: <>Rendered heading levels must follow document hierarchy. Do not skip levels (e.g. h1 to h3).</> },
          { key: 'Links', value: <>Link text must be descriptive. "Click here" is not accessible.</> },
          { key: 'Images', value: <>Alt text from markdown is preserved. Images without alt are flagged.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}