'use client'

import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function FileUploadPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="File upload" description="Drag-and-drop or click-to-browse file input. Supports single and multi-file upload with progress, validation, and preview." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Users need to upload files (documents, images, CSVs)</>,
            <>Bulk data import workflows</>,
            <>Evidence attachment in forms</>,
          ]}
          dontItems={[
            <>Text-only input -- use <Code>Text input</Code> or <Code>Textarea</Code></>,
            <>Selecting from existing options -- use <Code>Combobox</Code></>,
            <>Pasting content -- use <Code>Text input</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Upload a file from the user\'s device', use: <Code>File upload</Code>, not: <Code>Text input</Code> },
          { intent: 'Enter text content', use: <Code>Text input</Code>, not: <Code>File upload</Code> },
          { intent: 'Select from existing items', use: <Code>Combobox</Code>, not: <Code>File upload</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Drop zone for drag-and-drop, click-to-browse trigger, file list with progress bars, and uploaded file preview with remove action.">
        <div className="rounded-lg border-2 border-dashed border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#111827] p-8 text-center">
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">Drag files here or click to browse</p>
          <p className="text-[12px] text-[#C4C9D4] dark:text-[#3F4654] mt-1">CSV, XLSX, PDF up to 10MB</p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Always show accepted file types and max file size.</>,
          <>Show upload progress for each file via <Code>Loading bar</Code>.</>,
          <>Allow removing uploaded files before form submission.</>,
          <>Validate file type and size client-side before uploading.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Accept any file type without validation.</>, response: <>"Always restrict to expected file types. Unrestricted uploads create security and UX problems."</> },
          { rule: <>Upload without showing progress.</>, response: <>"Users need feedback. Show a progress bar for each file being uploaded."</> },
          { rule: <>Auto-submit the form on file selection.</>, response: <>"Let the user review before submitting. Upload is a step, not a trigger."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Native <Code>&lt;input type="file"&gt;</Code> with a styled trigger. The real input is visually hidden but accessible.</> },
          { key: 'Keyboard', value: <><Code>Tab</Code> focuses the trigger. <Code>Enter</Code> or <Code>Space</Code> opens the file picker.</> },
          { key: 'Label', value: <><Code>aria-label</Code> on the input describing expected files (e.g. "Upload CSV or XLSX files").</> },
          { key: 'Drop zone', value: <>Drag-and-drop zone has <Code>role="region"</Code> with <Code>aria-label="File drop zone"</Code>.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
