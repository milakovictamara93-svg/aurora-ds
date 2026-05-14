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
          doItems={[
            <>Rendering user-authored markdown (comments, descriptions, notes, changelogs)</>,
            <>Displaying API responses that return markdown-formatted strings</>,
            <>Documentation content stored as .md files</>,
            <>Preview panels in markdown editors</>,
          ]}
          dontItems={[
            <>Formatting structured data (numbers, dates) -- use <Code>Formatted</Code></>,
            <>Styling pre-existing HTML from a CMS -- use <Code>Prose</Code> (no parsing needed)</>,
            <>Rich text editing -- use a WYSIWYG editor component</>,
            <>Displaying code-only content -- use a code block directly</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Render a raw markdown string to HTML', use: <Code>Markdown</Code>, not: <Code>Prose</Code> },
          { intent: 'Style HTML that is already parsed', use: <Code>Prose</Code>, not: <Code>Markdown</Code> },
          { intent: 'Format numbers, dates, currencies', use: <Code>Formatted</Code>, not: <Code>Markdown</Code> },
          { intent: 'Display a PDF document', use: <Code>PDF viewer</Code>, not: <Code>Markdown</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Supported markdown elements, all rendered with design-system typography tokens.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 text-[14px] text-[#505867] dark:text-[#9CA3AF] flex flex-col gap-3">
          <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-2">
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">Headings</span><span>h1-h6, sized by level, Manrope Bold</span>
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">Paragraphs</span><span>16px body text, 145% line-height</span>
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">Lists</span><span>Ordered and unordered, nested support</span>
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">Code</span><span>Inline code and fenced code blocks with syntax highlighting</span>
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">Links</span><span>Blue 600, underline on hover, target="_blank" for external</span>
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">Tables</span><span>Bordered, striped rows, sticky header on scroll</span>
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">Blockquotes</span><span>Left border accent, muted text</span>
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">Images</span><span>Max-width 100%, border-radius 6px</span>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Input must be sanitized before rendering. XSS attacks via markdown injection are real. Use DOMPurify or rehype-sanitize.</>,
          <>External links render with <Code>target="_blank"</Code> and <Code>rel="noopener noreferrer"</Code> by default. Do not override this.</>,
          <>Code blocks use the system monospace font (<Code>--font-mono</Code>) and <Code>code-bg</Code> color token.</>,
          <>Images from user markdown must have width constraints. Unconstrained images break layout.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Render unsanitized user markdown directly into the DOM.</>, response: <>"Always sanitize. Markdown can contain raw HTML including script tags. Use DOMPurify or rehype-sanitize."</> },
          { rule: <>Use Markdown component for structured data display (tables of numbers, KPIs).</>, response: <>"Use Formatted for numbers/dates, Table for tabular data. Markdown tables lack sorting and interactivity."</> },
          { rule: <>Allow raw HTML passthrough in user-generated markdown.</>, response: <>"Disable raw HTML in the markdown parser config. User-generated HTML is an XSS vector."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Headings', value: <>Rendered heading levels must follow document hierarchy. Do not skip levels (h1 to h3). The Markdown component does not enforce this -- the content author must.</> },
          { key: 'Links', value: <>Link text must be descriptive. "Click here" fails WCAG. External links get an icon and <Code>aria-label</Code> indicating they open in a new tab.</> },
          { key: 'Images', value: <>Alt text from the markdown <Code>![alt](src)</Code> syntax is preserved on the rendered <Code>&lt;img&gt;</Code>. Images without alt text are flagged as warnings.</> },
          { key: 'Code blocks', value: <>Fenced code blocks get <Code>role="code"</Code> and are announced as code by screen readers. Syntax highlighting does not interfere with accessibility.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}