'use client'

import { useState } from 'react'
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Tooltip from '@/app/components-lib/ui/Tooltip'
import type { TooltipPlacement } from '@/app/components-lib/ui/Tooltip'
import AdvancedTooltip from '@/app/components-lib/ui/AdvancedTooltip'
import type { AdvancedTooltipPlacement } from '@/app/components-lib/ui/AdvancedTooltip'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Page ──────────────────────────────────────────────────────────────────────

const PLACEMENTS: TooltipPlacement[] = [
  'top-left', 'top-right',
  'bottom-left', 'bottom-right',
  'no-pointer',
]

const ADV_PLACEMENTS: AdvancedTooltipPlacement[] = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'right',
]

export default function TooltipPage() {
  const [placement, setPlacement] = useState<TooltipPlacement>('bottom-left')
  const [advPlacement, setAdvPlacement] = useState<AdvancedTooltipPlacement>('bottom-start')

  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="Contextual labels that appear on hover or focus to provide brief supplementary information about an element."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Basic tooltip">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Wrap any interactive element with <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">&lt;Tooltip&gt;</code> to give it a floating label. The tooltip appears on hover and keyboard focus.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-16 py-10">
                <Tooltip content="This action is irreversible" placement="bottom-left" open>
                  <button className="h-8 px-4 rounded bg-[#1258F8] text-white text-[13px] font-semibold hover:bg-[#0F44D0] transition-colors">
                    Delete all
                  </button>
                </Tooltip>
                <Tooltip content="View your profile, preferences, and sign out" placement="bottom-left" open>
                  <button className="w-8 h-8 rounded-full bg-[#1258F8] flex items-center justify-center text-white text-[12px] font-bold hover:bg-[#0F44D0] transition-colors">
                    TM
                  </button>
                </Tooltip>
                <Tooltip content="More information about this metric" placement="bottom-left" open>
                  <button className="flex items-center justify-center w-5 h-5 text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors">
                    <InformationCircleIcon className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
            </Preview>
          </Section>

          <Section title="With title">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Add a <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">title</code> prop when you need a bold heading above the description.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-16 py-10">
                <Tooltip
                  title="Scope 1 emissions"
                  content="Direct greenhouse gas emissions from sources owned or controlled by the company."
                  placement="bottom-left"
                  open
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-1.5">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Scope 1
                  </button>
                </Tooltip>
                <Tooltip
                  title="Intensity ratio"
                  content="Emissions per unit of economic output — typically kgCO₂e per m² or per revenue."
                  placement="bottom-right"
                  open
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-1.5">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Intensity
                  </button>
                </Tooltip>
              </div>
            </Preview>
          </Section>

          <Section title="Pointer position">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              The pointer attaches to a corner of the tooltip panel and that corner loses its border radius. Select a position to preview it.
            </p>
            <Preview>
              <div className="flex flex-col items-center gap-6 py-4">
                {/* Placement buttons */}
                <div className="flex flex-wrap justify-center gap-2">
                  {PLACEMENTS.map(p => (
                    <button
                      key={p}
                      onClick={() => setPlacement(p)}
                      className={`h-7 px-3 rounded text-[11px] font-medium transition-colors ${
                        placement === p
                          ? 'bg-[#1258F8] text-white'
                          : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                {/* Live preview */}
                <div className="flex items-center justify-center py-12">
                  <Tooltip content="Tooltip content here" placement={placement} open>
                    <div className="h-9 w-24 rounded bg-[#F7F8F8] dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] flex items-center justify-center text-[11px] text-[#505867] dark:text-[#9CA3AF]">
                      trigger
                    </div>
                  </Tooltip>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="No pointer">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">placement=&quot;no-pointer&quot;</code> when the tooltip is tightly coupled to a toolbar or when the relationship is already visually obvious.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-6 py-4">
                {['Bold', 'Italic', 'Underline', 'Link'].map(label => (
                  <Tooltip key={label} content={label} placement="no-pointer">
                    <button className="w-8 h-8 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
                      {label[0]}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </Preview>
          </Section>

          {/* ── Advanced Tooltip ── */}
          <Section title="Advanced tooltip — text section">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Use <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">&lt;AdvancedTooltip&gt;</code> when you need richer content: titles, multi-section layout, action buttons, a close control, or expandable sections. Sections are divided by a hairline border.
            </p>
            <Preview>
              <div className="flex flex-wrap items-start justify-center gap-20 py-12">
                {/* Simple text */}
                <AdvancedTooltip
                  open
                  placement="bottom-start"
                  sections={[{
                    type: 'text',
                    title: 'Scope 1 emissions',
                    description: 'Direct GHG emissions from sources owned or controlled by the company.',
                    badge: 'GHG Protocol',
                  }]}
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-1.5">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Scope 1
                  </button>
                </AdvancedTooltip>

                {/* With close + actions */}
                <AdvancedTooltip
                  open
                  placement="bottom-start"
                  showClose
                  primaryAction={{ label: 'Learn more' }}
                  secondaryAction={{ label: 'Dismiss' }}
                  sections={[{
                    type: 'text',
                    title: 'Energy intensity',
                    description: 'Total energy consumption divided by gross leasable area — expressed as kWh/m².',
                  }]}
                >
                  <button className="flex items-center justify-center w-5 h-5 text-[#505867] dark:text-[#9CA3AF]">
                    <InformationCircleIcon className="w-5 h-5" />
                  </button>
                </AdvancedTooltip>
              </div>
            </Preview>
          </Section>

          <Section title="Advanced tooltip — data details">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              The <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">details</code> section type renders grouped key-value rows with a blue left-accent on each group header — ideal for chart data points, ESG metrics, and asset breakdowns.
            </p>
            <Preview>
              <div className="flex flex-wrap items-start justify-center gap-20 py-12">
                <AdvancedTooltip
                  open
                  placement="bottom-start"
                  sections={[{
                    type: 'details',
                    title: 'Portfolio energy',
                    subtitle: 'Jan – Dec 2024',
                    groups: [
                      {
                        label: 'Total',
                        value: '12,400 MWh',
                        rows: [
                          { label: 'Electricity', value: '9,800 MWh' },
                          { label: 'Natural gas', value: '2,600 MWh' },
                        ],
                      },
                      {
                        label: 'Intensity',
                        value: '42.1 kWh/m²',
                        rows: [
                          { label: 'vs. benchmark', value: '−8%' },
                          { label: 'vs. last year', value: '−3%' },
                        ],
                      },
                    ],
                  }]}
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF]">
                    View data
                  </button>
                </AdvancedTooltip>
              </div>
            </Preview>
          </Section>

          <Section title="Advanced tooltip — multi-section + expandable">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Pass multiple sections to stack them with dividers. Set <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">expandable</code> to show only the first section by default, with a "Show more" toggle in the footer.
            </p>
            <Preview>
              <div className="flex flex-wrap items-start justify-center gap-20 py-12">
                <AdvancedTooltip
                  open
                  placement="bottom-start"
                  expandable
                  sections={[
                    {
                      type: 'text',
                      title: 'GRESB score',
                      description: 'Your portfolio achieved 78/100 in the 2024 GRESB assessment — above the global average of 71.',
                      badge: 'GRESB 2024',
                    },
                    {
                      type: 'details',
                      title: 'Score breakdown',
                      groups: [
                        { label: 'Management', value: '18/20', rows: [{ label: 'Policy', value: '10/10' }, { label: 'Reporting', value: '8/10' }] },
                        { label: 'Performance', value: '60/80', rows: [{ label: 'Energy', value: '22/25' }, { label: 'GHG', value: '18/25' }] },
                      ],
                    },
                  ]}
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-1.5">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    GRESB score
                  </button>
                </AdvancedTooltip>
              </div>
            </Preview>
          </Section>

          <Section title="Advanced tooltip — placement">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              The advanced tooltip supports 8 placements. Select one to preview.
            </p>
            <Preview>
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {ADV_PLACEMENTS.map(p => (
                    <button
                      key={p}
                      onClick={() => setAdvPlacement(p)}
                      className={`h-7 px-3 rounded text-[11px] font-medium transition-colors ${
                        advPlacement === p
                          ? 'bg-[#1258F8] text-white'
                          : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center py-16">
                  <AdvancedTooltip
                    open
                    placement={advPlacement}
                    sections={[{
                      type: 'text',
                      title: 'Placement preview',
                      description: `This tooltip is positioned at "${advPlacement}".`,
                    }]}
                  >
                    <div className="h-9 w-24 rounded bg-[#F7F8F8] dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] flex items-center justify-center text-[11px] text-[#505867] dark:text-[#9CA3AF]">
                      trigger
                    </div>
                  </AdvancedTooltip>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'Icon-only buttons or controls where the label isn\'t always visible',
              'Form fields and inputs — brief field-level hints that don\'t need permanent helper text',
              'Truncated text — reveal the full value on hover',
              'Abbreviations and technical terms — define on first use',
              'Data point labels in charts and dashboards',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'Critical information required to complete a task — use inline helper text or a callout instead',
              'Long explanations or instructions that need to be read carefully',
              'Interactive content (links, buttons, forms) inside the tooltip panel',
              'Replacing visible labels on important actions',
              'Mobile-first interactions where hover is unavailable',
            ]} />
          </Section>

          <Section title="Do / Don&apos;t">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DoCard>
                <div className="mb-3 flex items-center justify-center py-4">
                  <Tooltip content="Download as CSV" placement="bottom-left" open>
                    <button className="w-9 h-9 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
                Use a tooltip to label icon-only controls with a concise action phrase.
              </DoCard>

              <DontCard>
                <div className="mb-3 flex items-center justify-center py-2">
                  <Tooltip
                    title="Energy intensity"
                    content="This metric helps you understand your energy usage per unit of floor area. It is calculated by dividing total energy consumption by the gross leasable area of your portfolio."
                    placement="bottom-left"
                    open
                  >
                    <button className="w-9 h-9 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]">
                      <InformationCircleIcon className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
                Don&apos;t put lengthy explanations in a tooltip — use a popover or modal instead.
              </DontCard>
            </div>
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">

          <Section title="Anatomy">
            <Preview>
              <div className="flex flex-col items-center gap-10 py-8">
                <div className="relative flex flex-col items-start gap-3">
                  {/* Tooltip panel */}
                  <div className="relative max-w-[240px] bg-white dark:bg-[#1F2430] border border-[#D7DAE0] dark:border-[#374151] rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-[0px_1px_4px_0px_rgba(12,12,13,0.10)] p-4">
                    {/* Arrow at top-left */}
                    <span
                      aria-hidden="true"
                      className="absolute top-[-5px] left-2 w-[10px] h-[10px] rotate-45 bg-white dark:bg-[#1F2430] border-t border-l border-[#D7DAE0] dark:border-[#374151]"
                    />
                    <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-[1.45] mb-1">Title</p>
                    <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">Description content goes here</p>
                  </div>
                  <div className="flex items-center justify-center w-24 h-8 rounded bg-[#F7F8F8] dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] text-[11px] text-[#505867] dark:text-[#9CA3AF]">
                    Trigger
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-[480px]">
                  <Annotation>Panel — white bg, border-grey-200, shadow-200</Annotation>
                  <Annotation>Sharp corner — corner radius removed at pointer position</Annotation>
                  <Annotation>Title — 14px semibold, grey-950</Annotation>
                  <Annotation>Body — 12px regular, grey-600</Annotation>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Specs">
            <SpecTable rows={[
              { property: 'Max width',         value: '240px',                           token: 'max-w-[240px]' },
              { property: 'Padding',           value: '16px all sides',                  token: 'p-4' },
              { property: 'Background',        value: 'white / grey-800',                token: 'bg-white dark:bg-[#1F2430]' },
              { property: 'Border',            value: '1px grey-200 / grey-700',         token: 'border border-[#D7DAE0]' },
              { property: 'Border radius',     value: '8px — minus the pointer corner',  token: 'rounded-lg (3 of 4 corners)' },
              { property: 'Shadow',            value: '0 1px 4px rgba(12,12,13,0.10)',   token: 'shadow-[0px_1px_4px_...]' },
              { property: 'Title font',        value: '14px · semibold',                 token: 'text-[14px] font-semibold' },
              { property: 'Title color',       value: 'grey-950',                        token: 'text-[#111827]' },
              { property: 'Body font',         value: '12px · regular',                  token: 'text-[12px] font-normal' },
              { property: 'Body color',        value: 'grey-600',                        token: 'text-[#505867]' },
              { property: 'Line height',       value: '1.45',                            token: 'leading-[1.45]' },
              { property: 'Letter spacing',    value: '0.18px body · 0.21px title',      token: 'tracking-[0.18px]' },
              { property: 'Arrow size',        value: '10×10px rotated 45°',             token: 'w-[10px] h-[10px] rotate-45' },
              { property: 'Arrow offset',      value: '−5px (half arrow height)',        token: 'top-[-5px] / bottom-[-5px]' },
              { property: 'Panel offset',      value: '8px from trigger',                token: 'mt-2 / mb-2' },
            ]} />
          </Section>

          <Section title="Pointer position guide">
            <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
              <table className="w-full text-[13px]">
                <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <tr>
                    {['Position', 'Arrow at', 'Panel placement', 'Use when'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                  {[
                    ['top-left',     'Top-left corner',     'Below trigger, left-aligned',  'Trigger near left edge'],
                    ['top-right',    'Top-right corner',    'Below trigger, right-aligned', 'Trigger near right edge'],
                    ['bottom-left',  'Bottom-left corner',  'Above trigger, left-aligned',  'Default — most common'],
                    ['bottom-right', 'Bottom-right corner', 'Above trigger, right-aligned', 'Trigger near right edge'],
                    ['no-pointer',   'None',                'Above trigger, centered',      'Toolbar or icon groups'],
                  ].map(([pos, arrow, panel, use]) => (
                    <tr key={pos}>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#111827] dark:text-white">{pos}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{arrow}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{panel}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import Tooltip from '@/app/components-lib/ui/Tooltip'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'content',   value: 'React.ReactNode',    token: 'required — tooltip body text' },
              { property: 'children',  value: 'React.ReactElement', token: 'required — the trigger element' },
              { property: 'title',     value: 'string',             token: 'optional — bold heading above content' },
              { property: 'placement', value: 'TooltipPlacement',   token: 'defaults to "bottom-left"' },
              { property: 'open',      value: 'boolean',            token: 'force visible — for docs/previews' },
              { property: 'className', value: 'string',             token: 'optional — extra classes on the panel' },
            ]} />
          </Section>

          <Section title="Basic usage">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<Tooltip content="Delete this record permanently">
  <button>Delete</button>
</Tooltip>`}</code>
            </pre>
          </Section>

          <Section title="With title">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<Tooltip
  title="Scope 1 emissions"
  content="Direct GHG emissions from sources owned by the company."
  placement="bottom-right"
>
  <button className="...">
    <QuestionMarkCircleIcon className="w-4 h-4" />
    Scope 1
  </button>
</Tooltip>`}</code>
            </pre>
          </Section>

          <Section title="No pointer (toolbar)">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`{['Bold', 'Italic', 'Underline'].map(label => (
  <Tooltip key={label} content={label} placement="no-pointer">
    <button className="w-8 h-8 rounded border ...">
      {label[0]}
    </button>
  </Tooltip>
))}`}</code>
            </pre>
          </Section>

          <Section title="Type reference">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`type TooltipPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'no-pointer'`}</code>
            </pre>
          </Section>

          <Section title="AdvancedTooltip import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import AdvancedTooltip from '@/app/components-lib/ui/AdvancedTooltip'`}</code>
            </pre>
          </Section>

          <Section title="AdvancedTooltip props">
            <SpecTable rows={[
              { property: 'sections',         value: 'AdvancedTooltipSection[]',  token: 'required — one or more content sections' },
              { property: 'children',         value: 'React.ReactElement',        token: 'required — the trigger element' },
              { property: 'expandable',       value: 'boolean',                   token: 'show only first section until "Show more" is clicked' },
              { property: 'primaryAction',    value: '{ label, onClick? }',       token: 'primary button in footer' },
              { property: 'secondaryAction',  value: '{ label, onClick? }',       token: 'secondary button in footer' },
              { property: 'showClose',        value: 'boolean',                   token: 'render × button in top-right corner' },
              { property: 'onClose',          value: '() => void',                token: 'called when × is clicked' },
              { property: 'placement',        value: 'AdvancedTooltipPlacement',  token: 'defaults to "top"' },
              { property: 'open',             value: 'boolean',                   token: 'force visible — for docs/previews' },
              { property: 'className',        value: 'string',                    token: 'extra classes on the panel' },
            ]} />
          </Section>

          <Section title="AdvancedTooltip — text section">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<AdvancedTooltip
  placement="bottom-start"
  showClose
  primaryAction={{ label: 'Learn more', onClick: () => {} }}
  sections={[{
    type: 'text',
    title: 'Scope 1 emissions',
    description: 'Direct GHG emissions from sources owned by the company.',
    badge: 'GHG Protocol',
  }]}
>
  <button>
    <InformationCircleIcon className="w-5 h-5" />
  </button>
</AdvancedTooltip>`}</code>
            </pre>
          </Section>

          <Section title="AdvancedTooltip — details section">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<AdvancedTooltip
  placement="bottom-start"
  sections={[{
    type: 'details',
    title: 'Portfolio energy',
    subtitle: 'Jan – Dec 2024',
    groups: [
      {
        label: 'Total',
        value: '12,400 MWh',
        rows: [
          { label: 'Electricity', value: '9,800 MWh' },
          { label: 'Natural gas', value: '2,600 MWh' },
        ],
      },
    ],
  }]}
>
  <button>View data</button>
</AdvancedTooltip>`}</code>
            </pre>
          </Section>

          <Section title="AdvancedTooltip — multi-section expandable">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<AdvancedTooltip
  placement="bottom-start"
  expandable
  sections={[
    {
      type: 'text',
      title: 'GRESB score',
      description: 'Portfolio achieved 78/100 — above global average.',
      badge: 'GRESB 2024',
    },
    {
      type: 'details',
      title: 'Score breakdown',
      groups: [
        { label: 'Management', value: '18/20', rows: [...] },
        { label: 'Performance', value: '60/80', rows: [...] },
      ],
    },
  ]}
>
  <button>GRESB score</button>
</AdvancedTooltip>`}</code>
            </pre>
          </Section>

          <Section title="AdvancedTooltipPlacement type">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`type AdvancedTooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'right'`}</code>
            </pre>
          </Section>

        </TabPanel>

        {/* ── ACCESSIBILITY ── */}
        <TabPanel id="accessibility">

          <Section title="ARIA roles">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check='role="tooltip"'>Applied to the floating panel element</A11yRow>
              <A11yRow check="aria-describedby">Set on the trigger pointing to the tooltip&apos;s id — only when visible</A11yRow>
              <A11yRow check="useId()">React&apos;s useId hook ensures a stable, unique id per instance</A11yRow>
              <A11yRow check="pointer-events-none">Panel never intercepts mouse events — only the trigger is interactive</A11yRow>
              <A11yRow check="aria-hidden on arrow">Decorative arrow is hidden from assistive technology</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <KeyRow keys={['Tab']} action="Move focus to the trigger — tooltip becomes visible" />
              <KeyRow keys={['Tab', 'Shift + Tab']} action="Move focus away — tooltip dismisses" />
              <KeyRow keys={['Esc']} action="Should dismiss the tooltip — implement via onKeyDown on the trigger if needed" />
            </div>
          </Section>

          <Section title="Rules">
            <ul className="flex flex-col gap-2">
              {[
                'Tooltips must only wrap focusable elements (button, a, input) — never divs or spans',
                'Tooltip content must be purely descriptive — never place required information only in a tooltip',
                'Keep content to one or two short sentences — tooltips aren\'t documentation panels',
                'Don\'t put interactive elements (links, buttons) inside a tooltip',
                'Ensure a 4.5:1 contrast ratio between tooltip text and panel background',
                'On touch devices, consider replacing tooltips with inline helper text — hover is unavailable',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
                  <svg className="w-4 h-4 mt-px shrink-0 text-success-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {rule}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Related components">
            <RelatedComponents items={[
              { href: '/components/modals',  label: 'Modal',   description: 'Full dialogs for complex interactions' },
              { href: '/components/banner',  label: 'Banner',  description: 'Persistent page-level messages' },
              { href: '/components/toasts',  label: 'Toast',   description: 'Transient feedback notifications' },
            ]} />
          </Section>

        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
