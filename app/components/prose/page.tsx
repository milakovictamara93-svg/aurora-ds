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
          doItems={[
            <>Styling HTML content from a CMS (Contentful, Sanity, WordPress)</>,
            <>Rich text editor preview panels where content is already HTML</>,
            <>Server-rendered HTML blocks from an API that need consistent typography</>,
            <>Email template previews or document renders</>,
          ]}
          dontItems={[
            <>Raw markdown strings that need parsing -- use <Code>Markdown</Code></>,
            <>Structured data (numbers, dates) -- use <Code>Formatted</Code></>,
            <>App UI layouts -- use Tailwind utilities and component composition</>,
            <>Content you author directly in JSX -- just use the design tokens directly</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Style pre-existing HTML with typography defaults', use: <Code>Prose</Code>, not: <Code>Markdown</Code> },
          { intent: 'Parse and render a markdown string', use: <Code>Markdown</Code>, not: <Code>Prose</Code> },
          { intent: 'Format numbers, dates, currencies', use: <Code>Formatted</Code>, not: <Code>Prose</Code> },
          { intent: 'Build app UI', use: <>Components + Tailwind</>, not: <Code>Prose</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Prose is a single wrapper that applies typographic defaults to all child elements. No variants -- the content determines the output.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
          <p className="mb-3">Wrap any HTML content in <Code>&lt;Prose&gt;</Code> to apply:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            <li>Heading sizes matching the design-system type scale (h1-h6)</li>
            <li>Paragraph spacing (16px margin-bottom)</li>
            <li>List styles (disc for unordered, decimal for ordered, nested indentation)</li>
            <li>Link colors (Blue 600, underline on hover)</li>
            <li>Code styling (monospace font, code-bg token)</li>
            <li>Blockquote left border accent</li>
            <li>Table borders and cell padding</li>
            <li>Image max-width and border-radius</li>
          </ul>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Content must be trusted or pre-sanitized HTML. Prose does not sanitize. If the content comes from user input, sanitize it before passing to Prose.</>,
          <>Headings in the content should follow a logical hierarchy (h1 then h2, not h1 then h4). Prose styles them by level but does not enforce ordering.</>,
          <>Max-width the Prose container to 640-720px for optimal reading line length. Unconstrained Prose is hard to read on wide screens.</>,
          <>Prose should not be used inside flex or grid layouts where the typographic defaults conflict with the layout system.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Prose for app UI layout (buttons, cards, forms).</>, response: <>"Prose is for long-form reading content, not interactive UI. Use components and Tailwind for app surfaces."</> },
          { rule: <>Render untrusted user HTML inside Prose without sanitization.</>, response: <>"Prose applies styles but does not sanitize. Sanitize first with DOMPurify, then wrap in Prose."</> },
          { rule: <>Nest Prose wrappers.</>, response: <>"A single Prose wrapper handles all nested elements. Double-wrapping doubles the margin/padding."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Semantics', value: <>Prose preserves the semantic HTML structure of its children. Headings, lists, links, and tables retain their native ARIA roles.</> },
          { key: 'Contrast', value: <>All text colors applied by Prose meet WCAG AA (4.5:1 for body text, 3:1 for large text) in both light and dark mode.</> },
          { key: 'Links', value: <>Links inside Prose get underline-on-hover and Blue 600 color, meeting the "links must be distinguishable" requirement.</> },
          { key: 'Focus', value: <>Interactive elements inside Prose (links, buttons) inherit the system focus ring style.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}