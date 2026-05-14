'use client'

import Slider from '@/app/components-lib/ui/Slider'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '06'

export default function SliderPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock title="Slider" description="Allows users to select a value or range by dragging a thumb along a track. Use for settings, filters, and continuous numeric inputs." />

      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Continuous numeric range selection such as price filters, score thresholds, or percentage values</>,
            <>Filters where an approximate value is acceptable and the user benefits from seeing relative position</>,
            <>Settings where both the range boundaries and the current position carry meaning (volume, brightness)</>,
            <>Dual-thumb range selection for min/max filtering (price range, date range mapped to numeric scale)</>,
          ]}
          dontItems={[
            <>Precise numeric entry where the exact number matters (currency amounts, quantities) -- use <Code>Text input</Code> with type="number"</>,
            <>Discrete choices with fewer than 6 options -- use <Code>SegmentedControl</Code> or <Code>Radio</Code></>,
            <>Binary on/off toggles -- use <Code>Toggle</Code></>,
          ]}
        />
      </SectionWrapper>

      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Select a value from a continuous range', use: <Code>Slider</Code>, not: <Code>Text input</Code> },
          { intent: 'Enter an exact numeric value', use: <Code>Text input</Code>, not: <Code>Slider</Code> },
          { intent: 'Choose one of a few discrete options', use: <Code>SegmentedControl</Code>, not: <Code>Slider</Code> },
          { intent: 'Toggle a feature on or off', use: <Code>Toggle</Code>, not: <Code>Slider</Code> },
          { intent: 'Filter by a min/max numeric range', use: <Code>Slider (range)</Code>, not: <Code>Two text inputs</Code> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        {/* Single value - default */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2">Single value</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <Slider min={0} max={100} defaultValue={40} showLabels />
        </div>

        {/* Single value with tooltip */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Single value with tooltip</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 pt-10">
          <Slider min={0} max={100} defaultValue={65} showLabels showValue />
        </div>

        {/* Range slider */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Range (dual thumb)</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <Slider min={0} max={100} range defaultRangeValue={[20, 80]} showLabels />
        </div>

        {/* Range with tooltip */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Range with tooltip</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 pt-10">
          <Slider min={0} max={500} step={10} range defaultRangeValue={[100, 350]} showLabels showValue />
        </div>

        {/* Custom step */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Custom step (step=25)</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6 pt-10">
          <Slider min={0} max={100} step={25} defaultValue={50} showLabels showValue />
        </div>

        {/* Disabled */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Disabled</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <Slider min={0} max={100} defaultValue={50} showLabels disabled />
        </div>

        {/* No labels */}
        <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-2 mt-6">Without labels</p>
        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-6">
          <Slider min={0} max={100} defaultValue={30} showLabels={false} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Always show the current value as a number via <Code>showValue</Code> tooltip or an adjacent <Code>Text input</Code> synced to the slider.</>,
          <>Show min and max labels at the track ends using <Code>showLabels</Code> so users understand the range boundaries.</>,
          <>For precise entry, pair the slider with a number input that stays in sync -- updating one updates the other.</>,
          <>Range sliders must visually fill the track between the two thumbs so the selected range is obvious.</>,
        ]} />
      </SectionWrapper>

      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Use Slider without showing the current value.</>, response: <>"Users need to see the exact value they are selecting. Add <Code>showValue</Code> or a visible label."</> },
          { rule: <>Use Slider for precise values where exact numbers matter (currency, quantities).</>, response: <>"Sliders are inherently imprecise. Use a <Code>Text input</Code> with type='number' for exact values."</> },
          { rule: <>Use Slider with a range of fewer than 5 steps.</>, response: <>"A slider with 3-4 stops is a <Code>SegmentedControl</Code>. Use that instead."</> },
        ]} />
      </SectionWrapper>

      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Each thumb is <Code>role="slider"</Code> with <Code>aria-valuemin</Code>, <Code>aria-valuemax</Code>, <Code>aria-valuenow</Code>.</> },
          { key: 'Keyboard', value: <><Code>Arrow Left/Right</Code> adjusts by one step. <Code>Shift + Arrow</Code> adjusts by 10 steps. <Code>Home/End</Code> jumps to min/max.</> },
          { key: 'Label', value: <>Each thumb requires <Code>aria-label</Code> (e.g. "Minimum value", "Maximum value") or a visible label via <Code>aria-labelledby</Code>.</> },
          { key: 'Touch target', value: <>Thumb renders at 16px but the pointer capture area extends to 44px minimum for touch accessibility.</> },
          { key: 'Focus ring', value: <>Focus-visible ring uses <Code>box-shadow</Code> with blue-600 at 25% opacity. No outline clip issues.</> },
        ]} />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
