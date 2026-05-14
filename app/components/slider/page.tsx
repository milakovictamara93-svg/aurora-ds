'use client'

import Slider from '@/app/components-lib/ui/Slider'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code, TodoSection,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '08'

export default function SliderPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Slider" description="Allows users to select a value or range by dragging a thumb along a track. Use for settings, filters, and continuous numeric inputs." />
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[<>Continuous numeric range selection (price, score, percentage)</>, <>Filters where approximate values are acceptable</>, <>Settings where the range boundaries are meaningful</>]}
          dontItems={[<>Precise numeric entry -- use <Code>Text input</Code> with type="number"</>, <>Discrete choices -- use <Code>SegmentedControl</Code> or <Code>Radio</Code></>, <>Binary on/off -- use <Code>Toggle</Code></>]}
        />
      </SectionWrapper>
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Select a value from a continuous range', use: <Code>Slider</Code>, not: <Code>Text input</Code> },
          { intent: 'Precise numeric entry', use: <Code>Text input</Code>, not: <Code>Slider</Code> },
          { intent: 'Discrete options', use: <Code>SegmentedControl</Code>, not: <Code>Slider</Code> },
          { intent: 'Binary on/off', use: <Code>Toggle</Code>, not: <Code>Slider</Code> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <Slider min={0} max={100} defaultValue={65} />
        </div>
      </SectionWrapper>
      <SectionWrapper id="sizes" num="04" total={TOTAL} title="Sizes"><TodoSection label="Single size. Track height is 4px, thumb is 16px." /></SectionWrapper>
      <SectionWrapper id="required-pairings" num="05" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Always show the current value as a number (tooltip or adjacent label).</>,
          <>Show min and max labels at the track ends.</>,
          <>For precise entry, pair with a number input that syncs with the slider.</>,
        ]} />
      </SectionWrapper>
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Slider without showing the current value.</>, response: <>"Users need to see the exact value they're selecting. Show it in a tooltip or label."</> },
          { rule: <>Use Slider for precise values where exact numbers matter.</>, response: <>"Sliders are imprecise by nature. Use a number input for exact values."</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <><Code>role="slider"</Code> with <Code>aria-valuemin</Code>, <Code>aria-valuemax</Code>, <Code>aria-valuenow</Code>.</> },
          { key: 'Keyboard', value: <><Code>Arrow Left/Right</Code> adjusts by step. <Code>Home/End</Code> jumps to min/max.</> },
          { key: 'Label', value: <><Code>aria-label</Code> or visible label via <Code>aria-labelledby</Code>.</> },
          { key: 'Touch target', value: <>Thumb is 16px but touch target extends to 44px via padding.</> },
        ]} />
      </SectionWrapper>
      <SectionWrapper id="anatomy" num="08" total={TOTAL} title="Anatomy"><TodoSection label="Anatomy diagram for Slider coming in follow-up." /></SectionWrapper>
    </ComponentPageLayout>
  )
}