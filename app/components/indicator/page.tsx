'use client'

import Indicator from '@/app/components-lib/ui/Indicator'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

const SYSTEMS = ['default', 'success', 'error', 'warning', 'missing-info', 'disabled'] as const

export default function IndicatorPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Indicator" description="Small visual signals: number pills for counts and dot badges for status. Used inside Tags, table cells, and navigation items." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Showing counts (unread messages, filter matches, notification badges)</>,
            <>Status dots next to labels (online/offline, severity level)</>,
            <>Inside Tags to show a count alongside the label</>,
          ]}
          dontItems={[
            <>Labelling content categories -- use <Code>Tag</Code></>,
            <>Showing trend direction -- use <Code>DataArrow</Code></>,
            <>Action triggers -- use <Code>Button</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Show a count badge', use: <Code>Indicator variant="number"</Code>, not: <Code>Tag</Code> },
          { intent: 'Show a status dot', use: <Code>Indicator variant="dot"</Code>, not: <Code>Tag</Code> },
          { intent: 'Show a removable label', use: <Code>Tag</Code>, not: <Code>Indicator</Code> },
          { intent: 'Show trend direction', use: <Code>DataArrow</Code>, not: <Code>Indicator</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Two variants: number (16px pill with count) and dot (4px or 8px circle). Each in filled and outline styles across all 6 systems.">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Number -- filled</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-wrap gap-3">
              {SYSTEMS.map(s => <Indicator key={s} variant="number" system={s} style="filled" label="12" />)}
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Number -- outline</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-wrap gap-3">
              {SYSTEMS.map(s => <Indicator key={s} variant="number" system={s} style="outline" label="12" />)}
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Dot -- small (4px)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-wrap gap-4 items-center">
              {SYSTEMS.map(s => (
                <div key={s} className="flex items-center gap-2">
                  <Indicator variant="dot" system={s} size="small" />
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-3">Dot -- medium (8px)</h3>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-wrap gap-4 items-center">
              {SYSTEMS.map(s => (
                <div key={s} className="flex items-center gap-2">
                  <Indicator variant="dot" system={s} size="medium" />
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Number indicators need a count value. Empty pills are meaningless.</>,
          <>Dot indicators should be paired with a text label. A dot alone is ambiguous.</>,
          <>System color must match the semantic meaning: error for errors, success for success.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Indicator as a standalone label.</>, response: <>"Indicator is a signal, not a label. Use <Code>Tag</Code> for labelling."</> },
          { rule: <>Use a dot indicator without adjacent text.</>, response: <>"A colored dot alone is inaccessible. Pair it with a text label."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Number indicators are <Code>&lt;span&gt;</Code> with the count as text content. Screen readers read the number.</> },
          { key: 'Dots', value: <>Dot indicators are decorative (<Code>aria-hidden="true"</Code>). The adjacent text label provides the accessible name.</> },
          { key: 'Color', value: <>System colors meet WCAG AA for filled variants. Do not rely on color alone.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
