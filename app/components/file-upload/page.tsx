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

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Three states: empty drop zone, uploading with progress, and uploaded file list with remove action.">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Empty drop zone</h3>
            <div className="rounded-lg border-2 border-dashed border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#111827] p-8 text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#EDEEF1] dark:bg-[#1F2430] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#505867] dark:text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
              </div>
              <p className="text-[14px] font-medium text-[#111827] dark:text-white">Drag files here or click to browse</p>
              <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mt-1">CSV, XLSX, PDF up to 10MB</p>
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Uploading</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#EDEEF1] dark:bg-[#1F2430] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#505867]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#111827] dark:text-white truncate">energy-data-2024.csv</p>
                  <div className="h-1 w-full rounded-full bg-[#EDEEF1] dark:bg-[#1F2430] mt-1.5 overflow-hidden">
                    <div className="h-1 rounded-full bg-[#1258F8] w-[65%]" />
                  </div>
                  <p className="text-[11px] text-[#505867] dark:text-[#9CA3AF] mt-1">65% uploaded</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Uploaded</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4 flex flex-col gap-2">
              {['energy-data-2024.csv', 'ghg-emissions-q1.xlsx'].map(name => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#f0fdf4] dark:bg-green-950 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#16a34a]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                  </div>
                  <p className="text-[13px] font-medium text-[#111827] dark:text-white flex-1 truncate">{name}</p>
                  <button className="text-[#505867] dark:text-[#9CA3AF] hover:text-[#DC2626] text-[12px]">Remove</button>
                </div>
              ))}
            </div>
          </div>
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
