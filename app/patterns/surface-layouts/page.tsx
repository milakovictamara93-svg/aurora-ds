'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Tabs from '@/app/components-lib/ui/Tabs'
import type { TabItem } from '@/app/components-lib/ui/Tabs'
import { DoCard, DontCard } from '@/app/components-lib/ui/ComponentTabs'

// ── Shared mini-components for demos ─────────────────────────────────────────

function MiniTable({ rows = 4 }: { rows?: number }) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
      <div className="flex items-center h-8 px-3 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        {['Name', 'Type', 'Status', 'Value'].map(h => (
          <span key={h} className="flex-1 text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] tracking-wide">{h}</span>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center h-8 px-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
          {[80, 48, 56, 40].map((w, j) => (
            <span key={j} className="flex-1">
              <span className="inline-block rounded bg-[#EDEEF1] dark:bg-[#1F2430] h-2.5" style={{ width: `${w}%` }} />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function MiniButton({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'secondary' }) {
  return (
    <span className={`inline-flex items-center h-7 px-3 rounded text-[11px] font-medium ${
      variant === 'primary'
        ? 'bg-[#1258F8] text-white'
        : 'border border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]'
    }`}>
      {label}
    </span>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-[20px] font-semibold text-[#111827] dark:text-white leading-[1.4]">{title}</span>
        {subtitle && <span className="text-[14px] text-[#9CA3AF]">{subtitle}</span>}
      </div>
      <div className="flex gap-1.5">
        <MiniButton label="Filter" variant="secondary" />
        <MiniButton label="Export" variant="secondary" />
      </div>
    </div>
  )
}

// ── Demo tab items ───────────────────────────────────────────────────────────

const OVERVIEW_TABS: TabItem[] = [
  { id: 'overview',  label: 'Overview' },
  { id: 'alerts',    label: 'Alerts' },
  { id: 'upload-log', label: 'Upload log' },
]

const DATA_TABS: TabItem[] = [
  { id: 'requests',  label: 'Requests' },
  { id: 'responses', label: 'Responses' },
  { id: 'history',   label: 'History' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SurfaceLayoutsPage() {
  const [tab2, setTab2] = useState('overview')
  const [tab3old, setTab3old] = useState('requests')
  const [tab3fix, setTab3fix] = useState('requests')

  return (
    <div>
      <PageHeader
        title="Surface layouts"
        description="How to compose blocks, cards, tables, and tabs on page backgrounds. This page defines when to use each layout pattern and how to keep them consistent."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Multi-block on grey ─────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">Multi-block on grey</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Multiple white blocks (cards, tables, button rows) on a grey background. Each block has a light border. The grey background creates natural separation between blocks without needing extra spacing or dividers.
          </p>

          {/* Live demo */}
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
            <div className="px-3 py-1.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
              <span className="text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] tracking-wide">Live preview</span>
            </div>
            <div className="bg-[#F7F8F8] dark:bg-[#0D1117] p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] px-4 py-3">
                <span className="text-[20px] font-semibold text-[#111827] dark:text-white leading-[1.4]">Data collection overview</span>
                <div className="flex gap-2">
                  <MiniButton label="Filter" variant="secondary" />
                  <MiniButton label="New request" variant="primary" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total requests', value: '24' },
                  { label: 'Pending', value: '8' },
                  { label: 'Completed', value: '16' },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] px-4 py-3">
                    <p className="text-[10px] text-[#9CA3AF] dark:text-[#505867] mb-1">{label}</p>
                    <p className="text-[18px] font-bold text-[#111827] dark:text-white">{value}</p>
                  </div>
                ))}
              </div>
              <MiniTable rows={3} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Grey background is the canvas', desc: 'Use grey-50 (#F7F8F8) as the page background. Every content block is white with a grey-100 border.' },
              { title: 'Blocks are siblings, not nested', desc: 'Each card, table, or action bar is a direct child of the grey canvas. Never nest white blocks inside white blocks.' },
              { title: 'Consistent gap between blocks', desc: 'Use 16px gap between blocks. This, combined with the grey canvas, gives clear visual separation.' },
              { title: 'Borders are always grey-100', desc: 'All block borders use #EDEEF1 (1px). No shadows, no thicker borders, no colored borders.' },
            ].map((rule, i) => (
              <div key={i} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{rule.title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Single container on grey ─────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">Single container on grey</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            One large white container on a grey background, often combined with primary tabs at the top. The active tab visually connects to the white content area below.
          </p>

          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
            <div className="px-3 py-1.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
              <span className="text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] tracking-wide">Live preview</span>
            </div>
            <div className="bg-[#F7F8F8] dark:bg-[#0D1117] p-5">
              <Tabs
                items={OVERVIEW_TABS}
                activeId={tab2}
                onChange={setTab2}
                type="primary"
              />
              <div className="bg-white dark:bg-[#111827] rounded-b-lg rounded-tr-lg p-5">
                <SectionHeader title="Overview" subtitle="64 assets" />
                <MiniTable rows={4} />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Tab connects to container', desc: 'The active primary tab has a white background that merges into the content card below — no gap, no border, just white on grey.' },
              { title: 'One container per tab', desc: 'Each tab reveals one white container. Don\'t put multiple bordered blocks inside — use dividers or sections within the single container instead.' },
              { title: 'Section headers live inside', desc: 'The h2 section header, search bar, and action buttons sit inside the white container, not floating above it.' },
              { title: 'No border on the container', desc: 'The white container has no border — the contrast between white and grey-50 background provides enough visual separation.' },
            ].map((rule, i) => (
              <div key={i} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{rule.title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tabs with bordered inner elements (avoid) ────────────────── */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">Tabs with bordered inner elements</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Multiple bordered elements placed inside a tab panel, where the tabs themselves have no container connection. This creates visual noise and should be migrated to the single container pattern above.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DontCard>
              <div className="mb-3 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] p-3">
                <div className="flex mb-3">
                  {['Tab A', 'Tab B'].map((l, i) => (
                    <span key={l} className={`px-2 h-6 text-[10px] font-medium flex items-center border-b-2 ${i === 0 ? 'border-[#1258F8] text-[#111827] dark:text-white' : 'border-transparent text-[#9CA3AF]'}`}>{l}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="rounded border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] h-12" />
                  <div className="rounded border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] h-12" />
                </div>
              </div>
              Underline tabs floating on grey with individually bordered blocks — disconnected and noisy.
            </DontCard>

            <DoCard>
              <div className="mb-3 rounded-lg bg-[#F7F8F8] dark:bg-[#0D1117] p-3">
                <div className="flex items-end">
                  {['Tab A', 'Tab B'].map((l, i) => (
                    <span key={l} className={`px-2 h-6 text-[10px] font-medium flex items-center rounded-t ${i === 0 ? 'bg-white dark:bg-[#111827] text-[#111827] dark:text-white' : 'text-[#9CA3AF]'}`}>{l}</span>
                  ))}
                </div>
                <div className="bg-white dark:bg-[#111827] rounded-b rounded-tr">
                  <div className="h-12" />
                  <div className="border-t border-[#EDEEF1] dark:border-[#1F2430]" />
                  <div className="h-12" />
                </div>
              </div>
              Primary tabs anchor to a single white container. Internal sections use dividers, not borders.
            </DoCard>
          </div>
        </section>

        {/* ── Recommended fix ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">Recommended fix</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            When you have multiple content blocks inside a tab, wrap everything in a single white container with the primary tab bar on top. Use <strong>dividers</strong> (not borders) to separate the blocks inside.
          </p>

          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
            <div className="px-3 py-1.5 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
              <span className="text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] tracking-wide">Live preview</span>
            </div>
            <div className="bg-[#F7F8F8] dark:bg-[#0D1117] p-5">
              <Tabs
                items={DATA_TABS}
                activeId={tab3fix}
                onChange={setTab3fix}
                type="primary"
              />
              <div className="bg-white dark:bg-[#111827] rounded-b-lg rounded-tr-lg">
                <div className="p-5">
                  <SectionHeader title="Active requests" subtitle="12 items" />
                  <MiniTable rows={2} />
                </div>
                <div className="border-t border-[#EDEEF1] dark:border-[#1F2430]" />
                <div className="p-5">
                  <SectionHeader title="Completed requests" subtitle="8 items" />
                  <MiniTable rows={2} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Decision tree ────────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">Decision tree</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Use this to decide which pattern to apply.
          </p>

          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] overflow-hidden">
            {[
              {
                q: 'Does the page have tabs?',
                no: 'Use multi-block on grey. Each block (card, table, button bar) is a white sibling on the grey canvas.',
                yes: 'Continue...',
              },
              {
                q: 'Does each tab reveal a single content area?',
                yes: 'Use single container. The tab merges into the white card below.',
                no: 'Continue...',
              },
              {
                q: 'Does each tab contain multiple blocks?',
                yes: 'Still use single container — put all blocks inside one container, separate them with dividers (not individual borders).',
                no: null,
              },
            ].map((step, i) => (
              <div key={i} className="border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
                <div className="flex items-start gap-3 px-5 py-4">
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-[#111827] dark:text-white mb-2">{step.q}</p>
                    <div className="flex flex-col gap-1.5">
                      {step.yes && (
                        <div className="flex items-start gap-2">
                          <span className="text-[13px] font-semibold text-[#22C55E] mt-px w-8 shrink-0">Yes</span>
                          <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{step.yes}</span>
                        </div>
                      )}
                      {step.no && (
                        <div className="flex items-start gap-2">
                          <span className="text-[13px] font-semibold text-[#F87171] mt-px w-8 shrink-0">No</span>
                          <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{step.no}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick reference ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">Quick reference</h2>
          <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
            <table className="w-full text-[13px]">
              <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                <tr>
                  {['Pattern', 'Tabs?', 'Container', 'Inner borders', 'When to use'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#505867] dark:text-[#6B7280] text-[11px] tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-[#111827] dark:text-white">Multi-block</td>
                  <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">No</td>
                  <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Grey canvas, white blocks</td>
                  <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Yes — each block has grey-100 border</td>
                  <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Dashboards, overviews, mixed content</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-[#111827] dark:text-white">Single container</td>
                  <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Yes (primary)</td>
                  <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">One white card, no border</td>
                  <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">No — use dividers inside</td>
                  <td className="px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Entity detail pages, tabbed views</td>
                </tr>
                <tr className="bg-[#FEF2F2] dark:bg-[#450a0a]/20">
                  <td className="px-4 py-2.5 font-medium text-[#DC2626] dark:text-[#F87171]">Floating tabs + bordered blocks</td>
                  <td className="px-4 py-2.5 text-[#DC2626] dark:text-[#F87171]">Yes (secondary)</td>
                  <td className="px-4 py-2.5 text-[#DC2626] dark:text-[#F87171]">None</td>
                  <td className="px-4 py-2.5 text-[#DC2626] dark:text-[#F87171]">Yes — each inner block bordered</td>
                  <td className="px-4 py-2.5 text-[#DC2626] dark:text-[#F87171] line-through">Avoid — migrate to single container</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Content padding ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">Content padding</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Content inside a white container must always have padding. Never let tables, charts, or text go full-width edge-to-edge within the container.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DontCard>
              <div className="mb-3 rounded-lg overflow-hidden">
                <div className="bg-white dark:bg-[#111827] rounded-lg">
                  <div className="bg-[#F7F8F8] dark:bg-[#0D1117] h-6 w-full" />
                  <div className="bg-[#EDEEF1] dark:bg-[#1F2430] h-px" />
                  <div className="h-8" />
                  <div className="bg-[#EDEEF1] dark:bg-[#1F2430] h-px" />
                  <div className="h-8" />
                </div>
              </div>
              Content goes edge-to-edge with no padding — table rows touch the container walls.
            </DontCard>

            <DoCard>
              <div className="mb-3 rounded-lg overflow-hidden">
                <div className="bg-white dark:bg-[#111827] rounded-lg p-4">
                  <div className="bg-[#F7F8F8] dark:bg-[#0D1117] h-6 rounded" />
                  <div className="bg-[#EDEEF1] dark:bg-[#1F2430] h-px my-2" />
                  <div className="h-8 rounded bg-[#F7F8F8] dark:bg-[#0D1117]" />
                  <div className="bg-[#EDEEF1] dark:bg-[#1F2430] h-px my-2" />
                  <div className="h-8 rounded bg-[#F7F8F8] dark:bg-[#0D1117]" />
                </div>
              </div>
              Content has consistent padding (16–20px) on all sides within the container.
            </DoCard>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Minimum 16px padding', desc: 'All white containers must have at least 16px (px-4 py-4) internal padding. Use 20px (p-5) for content-heavy sections.' },
              { title: 'Tables get container padding', desc: 'Even tables with their own header row need padding between the table edge and the container wall.' },
              { title: 'Charts need breathing room', desc: 'Charts and visualizations should have at least 16px padding on all sides within their container card.' },
              { title: 'Consistent across all tab panels', desc: 'Every tab panel within a single container should use the same padding value. Don\'t mix p-4 and p-5 in sibling panels.' },
            ].map((rule, i) => (
              <div key={i} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{rule.title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Migration notes ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">Migration notes</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-4 leading-relaxed">
            For pages currently using the floating tabs pattern, here is the migration path:
          </p>
          <div className="flex flex-col gap-3">
            {[
              { title: 'Replace secondary tabs with primary tabs', desc: 'Swap the underline-only tab bar for the primary tab component. The active tab should get a white background.' },
              { title: 'Add a single white container below the tabs', desc: 'Create one container with white background, no border, and rounded-b-lg + rounded-tr-lg corners.' },
              { title: 'Move all inner blocks into the container', desc: 'Remove the individual border and border-radius from each inner block. They are now sections inside the container.' },
              { title: 'Separate sections with dividers', desc: 'Use a horizontal divider (border-t) between sections instead of relying on block borders for separation.' },
              { title: 'Verify spacing', desc: 'Each section inside the container should have consistent padding (p-5 or px-5 py-4). Check that the gap between tab bar and content is 0px.' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117]">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-0.5">{item.title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
