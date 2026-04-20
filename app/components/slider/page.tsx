'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Slider from '@/app/components-lib/ui/Slider'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

export default function SliderPage() {
  const [single, setSingle] = useState(40)
  const [range, setRange]   = useState<[number, number]>([20, 70])

  return (
    <div>
      <PageHeader
        title="Slider"
        description="Allows users to select a value or range by dragging a thumb along a track. Use for settings, filters, and continuous numeric inputs."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Default">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              A single thumb on a horizontal track. Shows min/max labels at each end.
            </p>
            <Preview>
              <div className="w-full max-w-sm mx-auto">
                <Slider defaultValue={40} />
              </div>
            </Preview>
          </Section>

          <Section title="Controlled">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Bind to state with <code className="font-mono text-[13px] text-[#1258F8]">value</code> and <code className="font-mono text-[13px] text-[#1258F8]">onChange</code>.
            </p>
            <Preview>
              <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
                <Slider value={single} onChange={setSingle} showValue />
                <p className="text-center text-[13px] text-[#505867] dark:text-[#9CA3AF]">
                  Value: <strong className="text-[#111827] dark:text-white">{single}</strong>
                </p>
              </div>
            </Preview>
          </Section>

          <Section title="Range">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="font-mono text-[13px] text-[#1258F8]">range</code> to enable two thumbs for selecting a value interval.
            </p>
            <Preview>
              <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
                <Slider
                  range
                  rangeValue={range}
                  onRangeChange={setRange}
                  showValue
                />
                <p className="text-center text-[13px] text-[#505867] dark:text-[#9CA3AF]">
                  Range: <strong className="text-[#111827] dark:text-white">{range[0]} – {range[1]}</strong>
                </p>
              </div>
            </Preview>
          </Section>

          <Section title="Step">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Use <code className="font-mono text-[13px] text-[#1258F8]">step</code> to snap the thumb to fixed intervals.
            </p>
            <Preview>
              <div className="w-full max-w-sm mx-auto flex flex-col gap-5">
                <div>
                  <p className="text-[12px] font-medium text-[#505867] dark:text-[#9CA3AF] mb-3">Step 10</p>
                  <Slider defaultValue={50} step={10} showValue />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#505867] dark:text-[#9CA3AF] mb-3">Step 25</p>
                  <Slider defaultValue={25} step={25} showValue />
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Vertical">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="font-mono text-[13px] text-[#1258F8]">orientation=&quot;vertical&quot;</code> for column layouts, filter panels, or chart controls.
            </p>
            <Preview>
              <div className="flex items-end justify-center gap-10">
                <Slider orientation="vertical" defaultValue={60} showLabels />
                <Slider orientation="vertical" defaultValue={30} showLabels />
                <Slider orientation="vertical" range defaultRangeValue={[20, 80]} showLabels />
              </div>
            </Preview>
          </Section>

          <Section title="Disabled">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Disabled sliders are not interactive. Use when the setting is currently locked or unavailable.
            </p>
            <Preview>
              <div className="w-full max-w-sm mx-auto flex flex-col gap-5">
                <Slider defaultValue={60} disabled />
                <Slider defaultValue={30} range defaultRangeValue={[20, 70]} disabled />
              </div>
            </Preview>
          </Section>

          <Section title="Without labels">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Hide the end labels with <code className="font-mono text-[13px] text-[#1258F8]">showLabels=false</code> when the context makes the range clear.
            </p>
            <Preview>
              <div className="w-full max-w-sm mx-auto">
                <Slider defaultValue={55} showLabels={false} />
              </div>
            </Preview>
          </Section>

          {/* Do / Don't */}
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <DoCard>
              <UseList items={[
                'Selecting a numeric value within a bounded range',
                'Filter controls — price range, date range, threshold',
                'Settings with continuous values — opacity, volume, intensity',
                'ESG target sliders — reduction %, intensity thresholds',
              ]} />
            </DoCard>
            <DontCard>
              <DontUseList items={[
                'Precise text entry — use a number input instead',
                'Values with fewer than ~5 options — use Radio buttons',
                'When the range is unknown or unbounded',
                'For binary on/off choices — use a Toggle',
              ]} />
            </DontCard>
          </div>

        </TabPanel>

        {/* ── SPECS ── */}
        <TabPanel id="specs">

          <Section title="Props">
            <SpecTable rows={[
              { property: 'min',               value: 'number',                    token: 'default 0' },
              { property: 'max',               value: 'number',                    token: 'default 100' },
              { property: 'step',              value: 'number',                    token: 'default 1' },
              { property: 'value',             value: 'number',                    token: 'controlled single value' },
              { property: 'defaultValue',      value: 'number',                    token: 'uncontrolled initial value' },
              { property: 'onChange',          value: '(value: number) => void',   token: 'fires on every change' },
              { property: 'rangeValue',        value: '[number, number]',          token: 'controlled range [lo, hi]' },
              { property: 'defaultRangeValue', value: '[number, number]',          token: 'uncontrolled initial range' },
              { property: 'onRangeChange',     value: '([lo, hi]) => void',        token: 'fires on range change' },
              { property: 'range',             value: 'boolean',                   token: 'default false — two thumbs' },
              { property: 'orientation',       value: '"horizontal" | "vertical"', token: 'default "horizontal"' },
              { property: 'showLabels',        value: 'boolean',                   token: 'default true — min/max end labels' },
              { property: 'showValue',         value: 'boolean',                   token: 'default false — tooltip above thumb' },
              { property: 'disabled',          value: 'boolean',                   token: 'default false' },
              { property: 'className',         value: 'string',                    token: 'extra classes on wrapper' },
            ]} />
          </Section>

          <Section title="Sizing">
            <SpecTable rows={[
              { property: 'Track height',      value: '2px',          token: 'h-[2px]' },
              { property: 'Thumb size',        value: '16×16px',      token: 'w-4 h-4' },
              { property: 'Thumb border',      value: '2px blue-600', token: 'border-2 border-[#1258F8]' },
              { property: 'Vertical height',   value: '240px',        token: 'h-[240px]' },
              { property: 'Focus ring',        value: '4px blue-600/25', token: 'shadow-[0_0_0_4px_rgba(18,88,248,0.25)]' },
            ]} />
          </Section>

          <Section title="Colors">
            <SpecTable rows={[
              { property: 'Track background',  value: '#D7DAE0 · #374151 (dark)', token: 'grey-200' },
              { property: 'Filled track',      value: '#1258F8',                  token: 'blue-600' },
              { property: 'Thumb border',      value: '#1258F8',                  token: 'blue-600' },
              { property: 'Thumb fill',        value: '#FFFFFF',                  token: 'white' },
              { property: 'Disabled track',    value: '#D7DAE0',                  token: 'grey-200' },
              { property: 'Label text',        value: '#505867 · #9CA3AF (dark)', token: 'grey-600' },
              { property: 'Value tooltip bg',  value: '#111827',                  token: 'grey-950' },
            ]} />
          </Section>

        </TabPanel>

        {/* ── ACCESSIBILITY ── */}
        <TabPanel id="accessibility">

          <Section title="ARIA & keyboard">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Each thumb renders as a <code className="font-mono text-[13px]">role=&quot;slider&quot;</code> element with <code className="font-mono text-[13px]">aria-valuenow</code>, <code className="font-mono text-[13px]">aria-valuemin</code>, and <code className="font-mono text-[13px]">aria-valuemax</code>.
            </p>

            <div className="mt-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check='role="slider"'>Each thumb is a focusable slider widget — readable and operable by screen readers</A11yRow>
              <A11yRow check="aria-valuenow">Reflects the current numeric value of the thumb</A11yRow>
              <A11yRow check="aria-valuemin / max">Set from the min/max props — defines the valid range</A11yRow>
              <A11yRow check="aria-label">Thumbs are labelled "Value", "Minimum value", and "Maximum value"</A11yRow>
              <A11yRow check="aria-disabled">Applied when disabled — thumb is excluded from tab order</A11yRow>
              <A11yRow check="Focus ring">4px blue-600/25 ring — visible in both light and dark mode</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="flex flex-col gap-2">
              <KeyRow keys={['→', '↑']} action="Increase value by one step" />
              <KeyRow keys={['←', '↓']} action="Decrease value by one step" />
              <KeyRow keys={['Shift', '→ / ↑']} action="Increase value by 10× step" />
              <KeyRow keys={['Shift', '← / ↓']} action="Decrease value by 10× step" />
              <KeyRow keys={['Tab']} action="Move focus to the next thumb or element" />
            </div>
          </Section>

        </TabPanel>

      </ComponentTabs>

      <RelatedComponents
        items={[
          { href: '/components/inputs/text',    label: 'Number input', description: 'For precise numeric entry when a slider is too imprecise' },
          { href: '/components/inputs/toggle',  label: 'Toggle',       description: 'For binary on/off values' },
          { href: '/components/inputs/select',  label: 'Select',       description: 'For discrete options without a continuous range' },
        ]}
      />
    </div>
  )
}
