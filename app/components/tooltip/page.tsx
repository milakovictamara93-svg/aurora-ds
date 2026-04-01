'use client'

import { useState } from 'react'
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Tooltip from '@/app/components-lib/ui/Tooltip'
import AdvancedTooltip from '@/app/components-lib/ui/AdvancedTooltip'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TooltipPage() {
  const [placement, setPlacement] = useState<
    'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right'
  >('top')

  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="Contextual labels that appear on hover or focus. Two variants: a lightweight basic tooltip for short labels, and a rich advanced tooltip for asset details and structured data."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          {/* ─── BASIC ─── */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-[#505867] mb-6">Basic tooltip</p>

          <Section title="Label and description">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Wrap any interactive element with <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">&lt;Tooltip&gt;</code> to give it a floating label. Appears on hover and keyboard focus. Use for short, supplementary text only.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-10 py-4">
                <Tooltip content="This action is irreversible" placement="top">
                  <button className="h-8 px-4 rounded bg-[#1258F8] text-white text-[13px] font-semibold hover:bg-[#0F44D0] transition-colors">
                    Delete all
                  </button>
                </Tooltip>
                <Tooltip
                  title="Scope 1 emissions"
                  content="Direct greenhouse gas emissions from sources owned or controlled by the company."
                  placement="top"
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-1.5">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Scope 1
                  </button>
                </Tooltip>
                <Tooltip content="More information about this metric" placement="top">
                  <button className="flex items-center justify-center w-5 h-5 text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors">
                    <InformationCircleIcon className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
            </Preview>
          </Section>

          <Section title="Placement">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Eight placement options. Click a button to preview.
            </p>
            <Preview>
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="grid grid-cols-3 gap-2 w-full max-w-[320px]">
                  {(['top-start', 'top', 'top-end'] as const).map(p => (
                    <button key={p} onClick={() => setPlacement(p)} className={`h-7 rounded text-[11px] font-medium transition-colors ${placement === p ? 'bg-[#1258F8] text-white' : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]'}`}>{p}</button>
                  ))}
                  {(['left', null, 'right'] as const).map((p, i) =>
                    p === null ? (
                      <div key="center" className="flex items-center justify-center">
                        <Tooltip content="Tooltip content here" placement={placement} open>
                          <div className="h-9 w-20 rounded bg-[#F7F8F8] dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] flex items-center justify-center text-[11px] text-[#505867] dark:text-[#9CA3AF]">trigger</div>
                        </Tooltip>
                      </div>
                    ) : (
                      <button key={p} onClick={() => setPlacement(p)} className={`h-7 rounded text-[11px] font-medium transition-colors ${placement === p ? 'bg-[#1258F8] text-white' : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]'}`}>{p}</button>
                    )
                  )}
                  {(['bottom-start', 'bottom', 'bottom-end'] as const).map(p => (
                    <button key={p} onClick={() => setPlacement(p)} className={`h-7 rounded text-[11px] font-medium transition-colors ${placement === p ? 'bg-[#1258F8] text-white' : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] hover:border-[#8C96A4]'}`}>{p}</button>
                  ))}
                </div>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">Current: <span className="font-semibold text-[#111827] dark:text-white">{placement}</span></p>
              </div>
            </Preview>
          </Section>

          <Section title="Without arrow">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">showArrow={'{false}'}</code> for tightly coupled toolbars where the spatial relationship is already obvious.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-6 py-4">
                {['Bold', 'Italic', 'Underline', 'Link'].map(label => (
                  <Tooltip key={label} content={label} showArrow={false} placement="top">
                    <button className="w-8 h-8 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
                      {label[0]}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </Preview>
          </Section>

          {/* ─── ADVANCED ─── */}
          <div className="my-10 border-t border-[#EDEEF1] dark:border-[#1F2430]" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-[#505867] mb-6">Advanced tooltip</p>

          <Section title="Text sections">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              The advanced tooltip supports multiple content sections divided by horizontal rules. Each section can be plain text, text with a badge, or a full asset-details block. Hover the info icons to see them live.
            </p>
            <Preview>
              <div className="flex flex-wrap items-center justify-center gap-12 py-8">

                {/* Basic text — single section */}
                <div className="flex flex-col items-center gap-2">
                  <AdvancedTooltip
                    placement="top"
                    sections={[
                      { type: 'text', title: 'Energy intensity', description: 'Total energy consumed divided by gross leasable area. Expressed in kWh/m².' },
                    ]}
                    open
                  >
                    <button className="w-8 h-8 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]">
                      <InformationCircleIcon className="w-4 h-4" />
                    </button>
                  </AdvancedTooltip>
                  <span className="text-[11px] text-[#9CA3AF] dark:text-[#505867] mt-1">Single section</span>
                </div>

                {/* Text with badge */}
                <div className="flex flex-col items-center gap-2">
                  <AdvancedTooltip
                    placement="top"
                    sections={[
                      { type: 'text', title: 'Certification status', description: 'Building achieved BREEAM Excellent on the most recent assessment cycle.', badge: 'BREEAM Excellent' },
                    ]}
                    open
                  >
                    <button className="w-8 h-8 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]">
                      <InformationCircleIcon className="w-4 h-4" />
                    </button>
                  </AdvancedTooltip>
                  <span className="text-[11px] text-[#9CA3AF] dark:text-[#505867] mt-1">With badge</span>
                </div>

              </div>
            </Preview>
          </Section>

          <Section title="Multiple sections with Show more">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              When <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">expandable</code> is true, only the first section is shown initially. A "Show more / Show less" footer toggle reveals the rest. Hover the button below.
            </p>
            <Preview>
              <div className="flex items-center justify-center py-6">
                <AdvancedTooltip
                  placement="top"
                  expandable
                  sections={[
                    { type: 'text', title: 'Scope 1', description: 'Direct GHG emissions from sources owned or controlled by the organisation.' },
                    { type: 'text', title: 'Scope 2', description: 'Indirect emissions from purchased electricity, heat, or steam.' },
                    { type: 'text', title: 'Scope 3', description: 'All other indirect emissions in the value chain — upstream and downstream.' },
                  ]}
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] flex items-center gap-1.5 hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    GHG scopes
                  </button>
                </AdvancedTooltip>
              </div>
            </Preview>
          </Section>

          <Section title="Asset details">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              The <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">type: &apos;details&apos;</code> section renders structured data groups with a blue left-accent on each category header. Used for asset summary cards and ESG data points. Hover the button below.
            </p>
            <Preview>
              <div className="flex items-center justify-center py-6">
                <AdvancedTooltip
                  placement="top-start"
                  showClose
                  sections={[
                    {
                      type: 'details',
                      title: 'Aurora Tower',
                      subtitle: 'Office · London, UK',
                      groups: [
                        {
                          label: 'Energy',
                          value: '142 kWh/m²',
                          rows: [
                            { label: 'Electricity', value: '98 kWh/m²' },
                            { label: 'Gas', value: '44 kWh/m²' },
                          ],
                        },
                        {
                          label: 'GHG emissions',
                          value: '28 kgCO₂e/m²',
                          rows: [
                            { label: 'Scope 1', value: '12 kgCO₂e/m²' },
                            { label: 'Scope 2', value: '16 kgCO₂e/m²' },
                          ],
                        },
                        {
                          label: 'Water',
                          value: '0.8 m³/m²',
                          rows: [
                            { label: 'Mains supply', value: '0.8 m³/m²' },
                          ],
                        },
                      ],
                    },
                  ]}
                >
                  <button className="h-8 px-3 rounded bg-[#1258F8] text-white text-[13px] font-semibold flex items-center gap-1.5 hover:bg-[#0F44D0] transition-colors">
                    Aurora Tower
                  </button>
                </AdvancedTooltip>
              </div>
            </Preview>
          </Section>

          <Section title="With action buttons">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Pass <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">primaryAction</code> and <code className="bg-[#F7F8F8] dark:bg-[#1F2430] px-1.5 py-0.5 rounded text-[13px] text-[#111827] dark:text-white">secondaryAction</code> to add a footer with two buttons — typically used for quick actions on an asset or data point. Hover the button below.
            </p>
            <Preview>
              <div className="flex items-center justify-center py-6">
                <AdvancedTooltip
                  placement="top-start"
                  showClose
                  secondaryAction={{ label: 'Dismiss' }}
                  primaryAction={{ label: 'View asset' }}
                  sections={[
                    { type: 'text', title: 'Aurora Tower', description: 'Office building · 12,400 m² GLA · London, UK · BREEAM Excellent' },
                    {
                      type: 'details',
                      title: 'Latest readings',
                      subtitle: 'Q1 2025',
                      groups: [
                        {
                          label: 'Energy',
                          value: '142 kWh/m²',
                          rows: [
                            { label: 'Electricity', value: '98 kWh/m²' },
                            { label: 'Gas', value: '44 kWh/m²' },
                          ],
                        },
                        {
                          label: 'GHG',
                          value: '28 kgCO₂e/m²',
                          rows: [
                            { label: 'Scope 1', value: '12 kgCO₂e/m²' },
                            { label: 'Scope 2', value: '16 kgCO₂e/m²' },
                          ],
                        },
                      ],
                    },
                  ]}
                >
                  <button className="h-8 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] text-[13px] text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors">
                    Hover me
                  </button>
                </AdvancedTooltip>
              </div>
            </Preview>
          </Section>

          {/* ─── WHEN TO USE ─── */}
          <div className="my-10 border-t border-[#EDEEF1] dark:border-[#1F2430]" />

          <Section title="When to use">
            <UseList items={[
              'Basic tooltip — icon-only buttons, truncated text, abbreviations, data point labels in charts',
              'Advanced tooltip (text sections) — glossary definitions, multi-concept explanations that benefit from Show more truncation',
              'Advanced tooltip (asset details) — structured ESG data groups on map pins, table rows, and asset cards',
              'Advanced tooltip (with actions) — quick-action surface on asset summaries where navigating away is optional',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'Required information — never hide content that is needed to complete a task inside a tooltip',
              'Long-form explanations — use a modal or side panel instead',
              'On touch-only interfaces — hover is unavailable; use inline helper text or a popover triggered by tap',
              'Don\'t nest interactive tooltips — each trigger should control exactly one tooltip',
            ]} />
          </Section>

          <Section title="Choosing a variant">
            <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
              <table className="w-full text-[13px]">
                <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <tr>
                    {['Variant', 'Use when', 'Max width', 'Interactive'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                  {[
                    ['Basic',                    'Short label or one-liner description',               '240px', 'No — mouse-through only'],
                    ['Advanced · text sections', 'Multi-paragraph definitions, expandable glossary',  '320px', 'Yes — show more, close'],
                    ['Advanced · asset details', 'Structured data groups (ESG metrics per category)', '320px', 'Yes — show more, close'],
                    ['Advanced · with actions',  'Asset summary + quick navigation or dismissal',     '320px', 'Yes — footer buttons'],
                  ].map(([variant, when, width, interactive]) => (
                    <tr key={variant}>
                      <td className="px-4 py-2.5 font-medium text-[#111827] dark:text-white whitespace-nowrap">{variant}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{when}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{width}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{interactive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">

          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-[#505867] mb-6">Basic tooltip</p>

          <Section title="Anatomy">
            <Preview>
              <div className="flex flex-col items-center gap-10 py-8">
                <div className="relative flex flex-col items-center gap-2">
                  <div className="relative max-w-[200px] bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#374151] rounded-lg shadow-lg px-4 py-3">
                    <span aria-hidden="true" className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45 bg-white dark:bg-[#111827] border-b border-r border-[#D7DAE0] dark:border-[#374151]" />
                    <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-snug mb-1">Title</p>
                    <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">Description content goes here</p>
                  </div>
                  <div className="flex items-center justify-center w-24 h-8 rounded bg-[#F7F8F8] dark:bg-[#1F2430] border border-[#EDEEF1] dark:border-[#374151] text-[11px] text-[#505867] dark:text-[#9CA3AF]">Trigger</div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-[480px]">
                  <Annotation>Panel — white, border, rounded-lg, shadow-level-2</Annotation>
                  <Annotation>Title — 14px semibold, grey-950</Annotation>
                  <Annotation>Description — 12px, grey-600</Annotation>
                  <Annotation>Arrow — 10×10px rotated 45°, 2 visible borders</Annotation>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Basic tooltip specs">
            <SpecTable rows={[
              { property: 'Max width',         value: '240px',                           token: 'max-w-[240px]' },
              { property: 'Padding',           value: '12px vertical · 16px horizontal', token: 'px-4 py-3' },
              { property: 'Background',        value: 'white / grey-950',                token: 'bg-white dark:bg-[#111827]' },
              { property: 'Border',            value: '1px grey-200',                    token: 'border-[#D7DAE0] dark:border-[#374151]' },
              { property: 'Border radius',     value: '8px',                             token: 'rounded-lg' },
              { property: 'Title',             value: '14px semibold, grey-950',         token: 'text-[14px] font-semibold text-[#111827]' },
              { property: 'Description',       value: '12px regular, grey-600',          token: 'text-[12px] text-[#505867]' },
              { property: 'Arrow',             value: '10×10px rotated 45°',             token: 'w-[10px] h-[10px] rotate-45' },
              { property: 'Panel offset',      value: '8px from trigger',                token: 'mb-2 / mt-2 / mr-2 / ml-2' },
              { property: 'z-index',           value: '50',                              token: 'z-50' },
            ]} />
          </Section>

          <div className="my-10 border-t border-[#EDEEF1] dark:border-[#1F2430]" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-[#505867] mb-6">Advanced tooltip</p>

          <Section title="Anatomy">
            <Preview>
              <div className="flex flex-col items-center gap-10 py-6">
                {/* Static anatomy diagram */}
                <div className="w-[320px] bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#374151] rounded-lg shadow-lg overflow-hidden">
                  {/* Close button */}
                  <div className="relative px-4 py-3">
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center text-[#505867] dark:text-[#9CA3AF] border border-[#D7DAE0] dark:border-[#374151] rounded">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </div>
                    <p className="text-[14px] font-semibold text-[#111827] dark:text-white mb-1 pr-6">Section title</p>
                    <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">Plain text content goes here.</p>
                    <span className="mt-2 inline-block text-[11px] font-medium text-[#1258F8] bg-[#D9EAFF] dark:bg-[#1258F8]/20 px-2 py-0.5 rounded-full">Badge</span>
                  </div>
                  {/* Details section */}
                  <div className="border-t border-[#EDEEF1] dark:border-[#374151] px-4 py-3">
                    <p className="text-[14px] font-semibold text-[#111827] dark:text-white">Details title</p>
                    <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">Subtitle</p>
                    <div className="flex flex-col gap-2">
                      {[['Category A', '100 units'], ['Category B', '200 units']].map(([cat, val]) => (
                        <div key={cat}>
                          <div className="flex justify-between border-l-2 border-[#1258F8] pl-2 py-0.5">
                            <span className="text-[13px] font-semibold text-[#111827] dark:text-white">{cat}</span>
                            <span className="text-[13px] font-semibold text-[#111827] dark:text-white">{val}</span>
                          </div>
                          <div className="flex justify-between pl-3 py-0.5">
                            <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">Sub-row</span>
                            <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">value</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="border-t border-[#EDEEF1] dark:border-[#374151] px-4 py-3 flex items-center gap-2">
                    <div className="h-8 px-4 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center text-[13px] font-medium text-[#505867] dark:text-[#9CA3AF]">Cancel</div>
                    <div className="ml-auto h-8 px-4 rounded bg-[#1258F8] flex items-center text-[13px] font-medium text-white">Action</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-[540px]">
                  <Annotation>Close button — absolute top-right, XMarkIcon 16px</Annotation>
                  <Annotation>Text section — 14px title + 13px body, optional badge pill</Annotation>
                  <Annotation>Section divider — 1px grey-100</Annotation>
                  <Annotation>Details group header — bold, 2px blue left accent</Annotation>
                  <Annotation>Details sub-row — regular 13px, pl-3</Annotation>
                  <Annotation>Footer — border-t, secondary + primary button</Annotation>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Advanced tooltip specs">
            <SpecTable rows={[
              { property: 'Panel width',              value: '320px fixed',                          token: 'w-[320px]' },
              { property: 'Section padding',          value: '12px vertical · 16px horizontal',     token: 'px-4 py-3' },
              { property: 'Section divider',          value: '1px grey-100',                        token: 'border-t border-[#EDEEF1] dark:border-[#374151]' },
              { property: 'Section title',            value: '14px semibold, grey-950',             token: 'text-[14px] font-semibold text-[#111827]' },
              { property: 'Section body',             value: '13px regular, grey-600',              token: 'text-[13px] text-[#505867]' },
              { property: 'Badge',                    value: '11px medium, blue-600 on blue-100',   token: 'text-[11px] font-medium bg-[#D9EAFF] text-[#1258F8] rounded-full' },
              { property: 'Details subtitle',         value: '12px, grey-600',                      token: 'text-[12px] text-[#505867]' },
              { property: 'Group header',             value: '13px semibold + 2px blue-600 left',   token: 'font-semibold border-l-2 border-[#1258F8] pl-2' },
              { property: 'Group sub-row',            value: '13px regular, grey-600, pl-3',        token: 'text-[13px] text-[#505867] pl-3' },
              { property: 'Footer height',            value: '~52px',                               token: 'border-t px-4 py-3' },
              { property: 'Primary button',           value: 'h-8, bg blue-600, text white',        token: 'h-8 px-4 rounded bg-[#1258F8] text-white' },
              { property: 'Secondary button',         value: 'h-8, border grey-200',               token: 'h-8 px-4 rounded border border-[#D7DAE0]' },
              { property: 'Show more link',           value: '13px medium, blue-600, right-aligned',token: 'text-[13px] font-medium text-[#1258F8] ml-auto' },
              { property: 'Close button',             value: 'absolute top-2.5 right-2.5, 16px ×', token: 'absolute top-2.5 right-2.5 w-4 h-4' },
            ]} />
          </Section>

          <Section title="Placement guide">
            <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
              <table className="w-full text-[13px]">
                <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <tr>
                    {['Placement', 'Arrow position', 'Use when'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                  {[
                    ['top',          'Bottom center', 'Default — most common'],
                    ['top-start',    'Bottom left',   'Asset cards anchored left; left viewport edge'],
                    ['top-end',      'Bottom right',  'Trigger near right edge'],
                    ['bottom',       'Top center',    'Viewport space above is limited'],
                    ['bottom-start', 'Top left',      'Toolbar icons, table header cells'],
                    ['bottom-end',   'Top right',     'Right-side toolbar icons'],
                    ['left',         'Right center',  'Inline icons in dense row layouts'],
                    ['right',        'Left center',   'Left-edge icons in sidebars'],
                  ].map(([pl, arrow, use]) => (
                    <tr key={pl}>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-[#111827] dark:text-white">{pl}</td>
                      <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">{arrow}</td>
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

          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-[#505867] mb-6">Basic tooltip</p>

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import Tooltip from '@/app/components-lib/ui/Tooltip'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'content',    value: 'React.ReactNode',    token: 'required' },
              { property: 'children',   value: 'React.ReactElement', token: 'required — the trigger element' },
              { property: 'title',      value: 'string',             token: 'optional — bold heading above content' },
              { property: 'placement',  value: 'TooltipPlacement',   token: 'defaults to "top"' },
              { property: 'showArrow',  value: 'boolean',            token: 'defaults to true' },
              { property: 'open',       value: 'boolean',            token: 'force visible — for docs/previews' },
              { property: 'className',  value: 'string',             token: 'extra classes on the panel' },
            ]} />
          </Section>

          <Section title="Usage">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`// Label only
<Tooltip content="Download as CSV">
  <button><DownloadIcon /></button>
</Tooltip>

// With title
<Tooltip
  title="Scope 1 emissions"
  content="Direct GHG emissions from sources owned by the company."
  placement="bottom-start"
>
  <button><QuestionMarkCircleIcon /></button>
</Tooltip>

// Toolbar — no arrow
<Tooltip content="Bold" showArrow={false} placement="top">
  <button>B</button>
</Tooltip>`}</code>
            </pre>
          </Section>

          <div className="my-10 border-t border-[#EDEEF1] dark:border-[#1F2430]" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-[#505867] mb-6">Advanced tooltip</p>

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import AdvancedTooltip from '@/app/components-lib/ui/AdvancedTooltip'
import type { AdvancedTooltipSection } from '@/app/components-lib/ui/AdvancedTooltip'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'sections',         value: 'AdvancedTooltipSection[]', token: 'required — one or more content sections' },
              { property: 'expandable',        value: 'boolean',                 token: 'shows first section + Show more toggle' },
              { property: 'primaryAction',     value: '{ label, onClick? }',     token: 'primary footer button' },
              { property: 'secondaryAction',   value: '{ label, onClick? }',     token: 'secondary footer button' },
              { property: 'showClose',         value: 'boolean',                 token: 'renders × close button top-right' },
              { property: 'onClose',           value: '() => void',              token: 'called when × is clicked' },
              { property: 'placement',         value: 'TooltipPlacement',        token: 'defaults to "top"' },
              { property: 'open',              value: 'boolean',                 token: 'force visible — for docs/previews' },
              { property: 'children',          value: 'React.ReactElement',      token: 'required — the trigger element' },
            ]} />
          </Section>

          <Section title="Section types">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`// Text section (plain or with badge)
{ type: 'text', title?: string, description: string, badge?: string }

// Asset details section
{ type: 'details', title: string, subtitle?: string, groups: DetailsGroup[] }

// DetailsGroup
{ label: string, value: string, rows: { label: string, value: string }[] }`}</code>
            </pre>
          </Section>

          <Section title="Text sections + expandable">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<AdvancedTooltip
  expandable
  sections={[
    { type: 'text', title: 'Scope 1', description: 'Direct GHG emissions...' },
    { type: 'text', title: 'Scope 2', description: 'Indirect from electricity...' },
    { type: 'text', title: 'Scope 3', description: 'All other indirect...' },
  ]}
>
  <button><QuestionMarkCircleIcon /></button>
</AdvancedTooltip>`}</code>
            </pre>
          </Section>

          <Section title="Asset details + actions">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<AdvancedTooltip
  placement="top-start"
  showClose
  primaryAction={{ label: 'View asset', onClick: () => router.push('/assets/1') }}
  secondaryAction={{ label: 'Dismiss' }}
  sections={[
    { type: 'text', title: 'Aurora Tower', description: 'Office · London, UK' },
    {
      type: 'details',
      title: 'Latest readings',
      subtitle: 'Q1 2025',
      groups: [
        {
          label: 'Energy',
          value: '142 kWh/m²',
          rows: [
            { label: 'Electricity', value: '98 kWh/m²' },
            { label: 'Gas',         value: '44 kWh/m²' },
          ],
        },
      ],
    },
  ]}
>
  <button>Aurora Tower</button>
</AdvancedTooltip>`}</code>
            </pre>
          </Section>

        </TabPanel>

        {/* ── ACCESSIBILITY ── */}
        <TabPanel id="accessibility">

          <Section title="ARIA — basic tooltip">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check='role="tooltip"'>Applied to the floating panel element</A11yRow>
              <A11yRow check="aria-describedby">Set on the trigger pointing to the tooltip id — only present when visible</A11yRow>
              <A11yRow check="useId()">Stable unique id per instance via React&apos;s useId hook</A11yRow>
              <A11yRow check="pointer-events-none">Basic tooltip panel never intercepts mouse events</A11yRow>
              <A11yRow check="aria-hidden on arrow">Decorative arrow caret is hidden from assistive technology</A11yRow>
            </div>
          </Section>

          <Section title="ARIA — advanced tooltip">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check='role="tooltip"'>Applied to the panel — same as basic</A11yRow>
              <A11yRow check="aria-describedby">Same pattern — links trigger to panel id</A11yRow>
              <A11yRow check='aria-label="Close tooltip"'>On the × button so screen readers announce its purpose</A11yRow>
              <A11yRow check="pointer-events auto">Advanced tooltip panel IS interactive — mouse can enter and stay on it to use buttons</A11yRow>
              <A11yRow check="Focus management">Footer buttons and Show more link are reachable via Tab from inside the panel</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <KeyRow keys={['Tab']}         action="Focus the trigger — tooltip becomes visible" />
              <KeyRow keys={['Tab']}         action="From the trigger, Tab moves into the advanced tooltip panel (close button → footer buttons)" />
              <KeyRow keys={['Shift + Tab']} action="Reverse focus order back to the trigger" />
              <KeyRow keys={['Esc']}         action="Dismiss — implement via onKeyDown on the trigger" />
              <KeyRow keys={['Enter', 'Space']} action="Activate focused button inside the panel (close, footer actions, show more)" />
            </div>
          </Section>

          <Section title="Rules">
            <ul className="flex flex-col gap-2">
              {[
                'Tooltips must only wrap focusable elements (button, a, input) — never static divs',
                'Basic tooltip content must be purely descriptive — it supplements, never replaces visible labels',
                'Advanced tooltip with action buttons must be keyboard-reachable — ensure Tab moves focus into the panel',
                'Never place required task information only in a tooltip',
                'Maintain 4.5:1 contrast between tooltip text and panel background',
                'On touch devices, replace tooltips with inline helper text or a tap-triggered popover',
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
