'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import LoadingBar from '@/app/components-lib/ui/LoadingBar'
import Slider from '@/app/components-lib/ui/Slider'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, Preview,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

export default function LoadingBarPage() {
  const [value, setValue] = useState(60)

  return (
    <div>
      <PageHeader
        title="Loading bar"
        description="Linear progress indicator for operations where progress percentage is known or measurable."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar tabs={['usage', 'style', 'code']} />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Indeterminate">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              No <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px]">value</code> prop — animated bar sweeps back and forth to indicate activity without a known end point.
            </p>
            <Preview>
              <div className="flex flex-col gap-6 w-full max-w-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">Small (4px)</span>
                  <LoadingBar size="sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">Medium (8px)</span>
                  <LoadingBar size="md" />
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Determinate">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Pass a <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px]">value</code> (0–100) to show a static fill. Transitions smoothly when the value changes.
            </p>
            <Preview>
              <div className="flex flex-col gap-6 w-full max-w-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">25%</span>
                  <LoadingBar value={25} size="md" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">60%</span>
                  <LoadingBar value={60} size="md" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">100%</span>
                  <LoadingBar value={100} size="md" />
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Interactive demo">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Drag to set the progress value.
            </p>
            <Preview>
              <div className="flex flex-col gap-4 w-full max-w-sm">
                <LoadingBar value={value} size="md" />
                <Slider
                  min={0}
                  max={100}
                  value={value}
                  onChange={v => setValue(v)}
                  showValue
                />
              </div>
            </Preview>
          </Section>

          <Section title="In context">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Always pair a Loading Bar with a label so users understand what is loading.
            </p>
            <Preview>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#505867] dark:text-[#9CA3AF]">Uploading report.csv</span>
                    <span className="font-medium text-[#111827] dark:text-white">73%</span>
                  </div>
                  <LoadingBar value={73} size="sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#505867] dark:text-[#9CA3AF]">Processing ESG data</span>
                    <span className="text-[#505867] dark:text-[#9CA3AF]">In progress</span>
                  </div>
                  <LoadingBar size="sm" />
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'File uploads — show exact byte or percentage progress',
              'Multi-step background processes where total steps are known',
              'Data export or import operations',
              'Page-top loading bar for route transitions',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'Short operations under ~1 second — a spinner is less disruptive',
              'When progress truly cannot be measured — use indeterminate Spinner instead',
              'Inside compact table cells — use a Spinner there',
            ]} />
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">
          <Section title="Specs">
            <SpecTable rows={[
              { property: 'Height sm',      value: '4px',      token: 'h-1' },
              { property: 'Height md',      value: '8px',      token: 'h-2' },
              { property: 'Border radius',  value: '4px',      token: 'rounded-[4px]' },
              { property: 'Track color',    value: '#EDEEF1',  token: 'bg-[#EDEEF1]' },
              { property: 'Fill color',     value: '#1258F8',  token: 'bg-[#1258F8]' },
              { property: 'Indeterminate',  value: '1.6s ease-in-out infinite', token: 'animate-loading-bar' },
              { property: 'Determinate',    value: '500ms ease-out transition', token: 'transition-all duration-500' },
            ]} />
          </Section>
        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">
          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import LoadingBar from '@/app/components-lib/ui/LoadingBar'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'value',     value: 'number (0–100)', token: 'optional — omit for indeterminate' },
              { property: 'size',      value: `'sm' | 'md'`,    token: "defaults to 'sm'" },
              { property: 'className', value: 'string',          token: 'optional — extra classes' },
            ]} />
          </Section>

          <Section title="Examples">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`{/* Indeterminate */}
<LoadingBar />

{/* Determinate 60% */}
<LoadingBar value={60} size="md" />

{/* With label */}
<div className="flex flex-col gap-1.5">
  <div className="flex justify-between text-[12px]">
    <span>Uploading file…</span>
    <span>{progress}%</span>
  </div>
  <LoadingBar value={progress} size="sm" />
</div>`}</code>
            </pre>
          </Section>

          <Section title="Related components">
            <RelatedComponents items={[
              { href: '/components/spinner',        label: 'Spinner',        description: 'For short indeterminate waits' },
              { href: '/components/progress-steps', label: 'Progress Steps', description: 'Multi-step workflow tracker' },
            ]} />
          </Section>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
