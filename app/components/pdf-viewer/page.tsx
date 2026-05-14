'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function PdfViewerPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="PDF viewer"
        description="Embedded PDF renderer for previewing documents inline without leaving the application. Supports pagination, zoom, and download."
      />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Previewing uploaded PDF documents inline</>,
            <>Reviewing reports, certificates, or evidence files</>,
            <>When the user needs to see the document without downloading</>,
          ]}
          dontItems={[
            <>Displaying structured data -- use <Code>Table</Code></>,
            <>Rendering markdown -- use <Code>Markdown</Code></>,
            <>Long-form text -- use <Code>Prose</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Preview a PDF inline', use: <Code>PDF viewer</Code>, not: <>Download link</> },
            { intent: 'Display structured data', use: <Code>Table</Code>, not: <Code>PDF viewer</Code> },
            { intent: 'Show text content', use: <><Code>Markdown</Code> or <Code>Prose</Code></>, not: <Code>PDF viewer</Code> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Full-width embedded viewer with toolbar (page navigation, zoom, download). Typically rendered inside a Modal or Drawer.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#111827] p-8 flex items-center justify-center h-[200px]">
          <div className="text-center">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">PDF viewer renders here</p>
            <p className="text-[12px] text-[#C4C9D4] dark:text-[#3F4654] mt-1">Toolbar: page nav, zoom, download</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings
          rules={[
            <>Provide a download button alongside the viewer.</>,
            <>Show page count and current page number in the toolbar.</>,
            <>Loading state: show <Code>Skeleton</Code> while the PDF loads.</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse
          rules={[
            { rule: <>Render a PDF without a download fallback.</>, response: <>"Not all browsers support inline PDF rendering. Always provide a download link."</> },
            { rule: <>Use PDF viewer for non-PDF documents.</>, response: <>"PDF viewer only handles PDF files. For other formats, provide a download link."</> },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList
          items={[
            { key: 'Label', value: <>Viewer has <Code>aria-label</Code> describing the document.</> },
            { key: 'Keyboard', value: <>Toolbar controls are keyboard accessible. Page up/down navigates pages.</> },
            { key: 'Fallback', value: <>Provide a text alternative or download link for screen reader users.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
