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
      <TitleBlock title="PDF viewer" description="Embedded PDF renderer for previewing documents inline without leaving the application. Supports pagination, zoom, and download." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Previewing uploaded PDF documents inline (reports, certificates, evidence)</>,
            <>Reviewing multi-page documents without downloading</>,
            <>Side-by-side comparison of a document with form fields</>,
            <>Document preview inside a <Code>Modal</Code> or <Code>Drawer</Code></>,
          ]}
          dontItems={[
            <>Displaying structured data -- use <Code>Table</Code></>,
            <>Rendering text content from an API -- use <Code>Markdown</Code> or <Code>Prose</Code></>,
            <>Image previews -- use an image component or lightbox</>,
            <>When the user just needs to download the file -- use a download link</>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Preview a PDF document inline', use: <Code>PDF viewer</Code>, not: <>Download link</> },
          { intent: 'Display structured data from a report', use: <Code>Table</Code>, not: <Code>PDF viewer</Code> },
          { intent: 'Show text content from an API', use: <><Code>Markdown</Code> or <Code>Prose</Code></>, not: <Code>PDF viewer</Code> },
          { intent: 'Preview an image', use: <>Image / lightbox</>, not: <Code>PDF viewer</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Full-width embedded viewer with toolbar. Typically rendered inside a Modal or Drawer for focused document review.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
            <div className="flex items-center gap-3 text-[13px] text-[#505867] dark:text-[#9CA3AF]">
              <button className="hover:text-[#111827] dark:hover:text-white">&#8249;</button>
              <span>Page 1 of 12</span>
              <button className="hover:text-[#111827] dark:hover:text-white">&#8250;</button>
            </div>
            <div className="flex items-center gap-3 text-[13px] text-[#505867] dark:text-[#9CA3AF]">
              <button className="hover:text-[#111827] dark:hover:text-white">&#8722;</button>
              <span>100%</span>
              <button className="hover:text-[#111827] dark:hover:text-white">+</button>
              <button className="ml-2 px-2 py-1 rounded border border-[#D7DAE0] dark:border-[#374151] text-[12px] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430]">Download</button>
            </div>
          </div>
          <div className="bg-[#505867] flex items-center justify-center h-[300px]">
            <div className="bg-white w-[200px] h-[260px] rounded shadow-lg flex items-center justify-center">
              <span className="text-[12px] text-[#9CA3AF]">PDF page content</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Always provide a download button in the toolbar. The viewer is a preview, not a replacement for the file.</>,
          <>Show page count and current page number. Users need to know where they are in the document.</>,
          <>Show a <Code>Skeleton</Code> loading state while the PDF loads. Large PDFs can take seconds.</>,
          <>For multi-page documents, provide keyboard navigation (Page Up/Down) alongside the toolbar buttons.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Render a PDF without a download fallback.</>, response: <>"Not all browsers render PDFs inline reliably. Always provide a download link as fallback."</> },
          { rule: <>Use PDF viewer for non-PDF file types.</>, response: <>"PDF viewer only handles PDF. For images use an image viewer, for Office docs provide a download."</> },
          { rule: <>Auto-load large PDFs without user consent.</>, response: <>"PDFs can be megabytes. Show a preview thumbnail and let the user click to load the full viewer."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Label', value: <>The viewer container has <Code>aria-label</Code> describing the document (e.g. "ESG Report 2024, 12 pages").</> },
          { key: 'Keyboard', value: <>Toolbar controls are keyboard accessible. Page Up/Down navigates pages. +/- adjusts zoom. Enter on Download triggers the download.</> },
          { key: 'Fallback', value: <>Provide a text alternative or download link for screen reader users. PDFs rendered as images are not accessible without OCR.</> },
          { key: 'Focus', value: <>Toolbar buttons have visible focus rings. Focus order follows visual order (prev, page number, next, zoom, download).</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}