'use client'

import Tag from '@/app/components-lib/ui/Tag'
import Indicator from '@/app/components-lib/ui/Indicator'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '08'

export default function TagPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Tag" description="Interactive filter chips and multi-select values. Indicators for status dots and count badges." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Filter chips in search and filter UI</>, <>Selected values in multi-select inputs</>, <>Status indicators (dot badges, count badges)</>, <>Categorization labels</>]}
          dontItems={[<>Action buttons -- use <Code>Button</Code></>, <>Navigation links</>, <>Long descriptive text</>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Show a removable selection chip', use: <Code>Tag</Code>, not: <Code>Button</Code> },
          { intent: 'Show a status dot or count', use: <Code>Indicator</Code>, not: <Code>Tag</Code> },
          { intent: 'Trigger an action', use: <Code>Button</Code>, not: <Code>Tag</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants" description="Three styles: filled, outline, projected. Six systems: default, disabled, error, warning, missing-info, success. Two sizes: medium, small.">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Tag label="Default" system="default" style="filled" size="small" showCount={false} showRemove={false} />
            <Tag label="Success" system="success" style="filled" size="small" showCount={false} showRemove={false} />
            <Tag label="Error" system="error" style="filled" size="small" showCount={false} showRemove={false} />
            <Tag label="Warning" system="warning" style="filled" size="small" showCount={false} showRemove={false} />
            <Tag label="Missing info" system="missing-info" style="filled" size="small" showCount={false} showRemove={false} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag label="Outline" system="default" style="outline" size="small" showCount={false} showRemove={false} />
            <Tag label="Projected" system="default" style="projected" size="small" showCount={false} showRemove={false} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag label="With count" system="default" style="filled" size="small" showCount={true} count="12" showRemove={false} />
            <Tag label="Removable" system="default" style="filled" size="small" showCount={false} showRemove={true} />
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes" description="Medium (28px, 14px text) and small (20px, 12px text).">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 flex items-center gap-3">
          <Tag label="Medium" system="default" style="filled" size="medium" showCount={false} showRemove={false} />
          <Tag label="Small" system="default" style="filled" size="small" showCount={false} showRemove={false} />
        </div>
      </SectionWrapper>
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>System color must match the semantic meaning: error for errors, success for success, etc.</>,
          <>Removable tags must have an accessible close button with <Code>aria-label</Code>.</>,
          <>Count badges (Indicators) are decorative when inside a Tag. The Tag label provides context.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Tag as a button to trigger actions.</>, response: <>"Tags are labels, not actions. Use <Code>Button</Code> for actions."</> },
          { rule: <>Use color to convey meaning without a label.</>, response: <>"Always pair system color with a descriptive label."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Tag is a <Code>&lt;span&gt;</Code>. Removable tags have a <Code>&lt;button&gt;</Code> for the close icon.</> },
          { key: 'Close button', value: <><Code>aria-label="Remove [label]"</Code> on the close icon.</> },
          { key: 'Color', value: <>System colors have sufficient contrast. Do not rely on color alone for meaning.</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy"><TodoSection label="Anatomy diagram for Tag coming in follow-up." /></SectionWrapper>
    </ComponentPageLayout>
  )
}