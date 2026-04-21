'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/app/components-lib/ui/ComponentTabs'
import {
  SimpleCard,
  StandardCard,
  FormCard,
  DataVizCard,
  OverviewCard,
  AssetCard,
} from '@/app/components-lib/ui/Card'

// ── Helper components for slot content ───────────────────────────────────────
function ChartPlaceholder({ height = 120 }: { height?: number }) {
  return (
    <div
      className="w-full rounded bg-grey-50 dark:bg-grey-900 flex items-end justify-between gap-1 px-3 pb-2 pt-4"
      style={{ height }}
      aria-hidden
    >
      {[40, 70, 55, 85, 60, 75, 50, 90, 65, 80].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-blue-500 dark:bg-blue-600 opacity-80"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

function FormSlot() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-grey-950 dark:text-white">Building name</label>
        <input
          readOnly
          defaultValue="Aurora HQ"
          className="h-8 rounded border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-900 text-sm px-3 text-grey-950 dark:text-white"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-grey-950 dark:text-white">Energy source</label>
        <input
          readOnly
          defaultValue="Solar + Grid"
          className="h-8 rounded border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-900 text-sm px-3 text-grey-950 dark:text-white"
        />
      </div>
    </div>
  )
}

function MetricSlot() {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-bold text-grey-950 dark:text-white">1,248 <span className="text-sm font-normal text-grey-400">MWh</span></span>
      <span className="text-xs text-success-600">↓ 6% vs last quarter</span>
    </div>
  )
}

// ── Label wrapper (shared) ────────────────────────────────────────────────────
function PreviewLabel({ label }: { label: string }) {
  return (
    <div className="px-3 py-1.5 bg-grey-50 dark:bg-grey-900 border-b border-grey-100 dark:border-grey-800 text-xs font-semibold text-grey-600 dark:text-grey-400 rounded-t-lg">
      {label}
    </div>
  )
}

function PreviewBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden">
      <PreviewLabel label={label} />
      <div className="p-5 bg-grey-50 dark:bg-grey-900 flex flex-wrap gap-4">{children}</div>
    </div>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 bg-grey-950 text-grey-100 text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
      {children}
    </pre>
  )
}

// ── Asset card drill-down demo ────────────────────────────────────────────────

const DRILL_ASSETS = [
  {
    id: '1', name: '180 George St',  address: 'Sydney · Office',   eui: 142,
    metrics: [
      { label: 'EUI (actual)',      value: '142 kWh/m²/yr' },
      { label: 'EUI (target)',      value: '130 kWh/m²/yr' },
      { label: 'Total consumption', value: '2,613 MWh' },
      { label: 'Gross floor area',  value: '18,400 m²' },
    ],
    quality: [
      { label: 'Data Readiness',   pct: 88,    status: 'error'   as const, onImprove: () => {} },
      { label: 'Data Coverage',    pct: 80.91, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Reliability', pct: 60,    status: 'warning' as const, onImprove: () => {} },
    ],
    bar: [
      { color: '#d76513', pct: 16 }, { color: '#22C55E', pct: 25 },
      { color: '#ffb246', pct: 25 }, { color: '#ed113a', pct: 19 }, { color: '#2295FF', pct: 15 },
    ],
  },
  {
    id: '2', name: '1 Bligh St',     address: 'Sydney · Office',   eui: 168,
    metrics: [
      { label: 'EUI (actual)',      value: '168 kWh/m²/yr' },
      { label: 'EUI (target)',      value: '145 kWh/m²/yr' },
      { label: 'Total consumption', value: '1,764 MWh' },
      { label: 'Gross floor area',  value: '10,500 m²' },
    ],
    quality: [
      { label: 'Data Readiness',   pct: 72, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Coverage',    pct: 65, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Reliability', pct: 50, status: 'error'   as const, onImprove: () => {} },
    ],
    bar: [
      { color: '#d76513', pct: 20 }, { color: '#22C55E', pct: 18 },
      { color: '#ffb246', pct: 30 }, { color: '#ed113a', pct: 22 }, { color: '#2295FF', pct: 10 },
    ],
  },
  {
    id: '3', name: 'Collins Square', address: 'Melbourne · Office', eui: 124,
    metrics: [
      { label: 'EUI (actual)',      value: '124 kWh/m²/yr' },
      { label: 'EUI (target)',      value: '120 kWh/m²/yr' },
      { label: 'Total consumption', value: '3,100 MWh' },
      { label: 'Gross floor area',  value: '25,000 m²' },
    ],
    quality: [
      { label: 'Data Readiness',   pct: 95, status: 'success' as const },
      { label: 'Data Coverage',    pct: 91, status: 'success' as const },
      { label: 'Data Reliability', pct: 88, status: 'success' as const },
    ],
    bar: [
      { color: '#d76513', pct: 10 }, { color: '#22C55E', pct: 35 },
      { color: '#ffb246', pct: 20 }, { color: '#ed113a', pct: 15 }, { color: '#2295FF', pct: 20 },
    ],
  },
  {
    id: '4', name: '333 George St',  address: 'Sydney · Retail',    eui: 195,
    metrics: [
      { label: 'EUI (actual)',      value: '195 kWh/m²/yr' },
      { label: 'EUI (target)',      value: '160 kWh/m²/yr' },
      { label: 'Total consumption', value: '4,290 MWh' },
      { label: 'Gross floor area',  value: '22,000 m²' },
    ],
    quality: [
      { label: 'Data Readiness',   pct: 55, status: 'error'   as const, onImprove: () => {} },
      { label: 'Data Coverage',    pct: 48, status: 'error'   as const, onImprove: () => {} },
      { label: 'Data Reliability', pct: 70, status: 'warning' as const, onImprove: () => {} },
    ],
    bar: [
      { color: '#d76513', pct: 30 }, { color: '#22C55E', pct: 10 },
      { color: '#ffb246', pct: 15 }, { color: '#ed113a', pct: 35 }, { color: '#2295FF', pct: 10 },
    ],
  },
  {
    id: '5', name: '60 Martin Pl',   address: 'Sydney · Office',    eui: 110,
    metrics: [
      { label: 'EUI (actual)',      value: '110 kWh/m²/yr' },
      { label: 'EUI (target)',      value: '100 kWh/m²/yr' },
      { label: 'Total consumption', value: '990 MWh' },
      { label: 'Gross floor area',  value: '9,000 m²' },
    ],
    quality: [
      { label: 'Data Readiness',   pct: 98, status: 'success' as const },
      { label: 'Data Coverage',    pct: 95, status: 'success' as const },
      { label: 'Data Reliability', pct: 92, status: 'success' as const },
    ],
    bar: [
      { color: '#d76513', pct: 8 },  { color: '#22C55E', pct: 40 },
      { color: '#ffb246', pct: 18 }, { color: '#ed113a', pct: 12 }, { color: '#2295FF', pct: 22 },
    ],
  },
  {
    id: '6', name: '8 Chifley Sq',   address: 'Sydney · Office',    eui: 138,
    metrics: [
      { label: 'EUI (actual)',      value: '138 kWh/m²/yr' },
      { label: 'EUI (target)',      value: '125 kWh/m²/yr' },
      { label: 'Total consumption', value: '1,518 MWh' },
      { label: 'Gross floor area',  value: '11,000 m²' },
    ],
    quality: [
      { label: 'Data Readiness',   pct: 82, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Coverage',    pct: 78, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Reliability', pct: 85, status: 'success' as const },
    ],
    bar: [
      { color: '#d76513', pct: 14 }, { color: '#22C55E', pct: 28 },
      { color: '#ffb246', pct: 22 }, { color: '#ed113a', pct: 18 }, { color: '#2295FF', pct: 18 },
    ],
  },
]

const MAX_EUI = 220

function DrilldownDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const asset = DRILL_ASSETS.find(a => a.id === selectedId) ?? null

  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <div className="flex items-baseline gap-2">
          <span className="text-[14px] font-semibold text-[#111827] dark:text-white">Energy use intensity</span>
          <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">kWh/m²/yr</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#505867] dark:text-[#9CA3AF]">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-[#1258F8]" />Energy use intensity</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-[#9CA3AF]" />Missing</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex p-4 min-h-[280px]">
        {/* Asset card panel */}
        <div className={['shrink-0 overflow-hidden transition-all duration-300 ease-in-out', asset ? 'w-[240px] mr-4 opacity-100' : 'w-0 opacity-0'].join(' ')}>
          {asset && (
            <AssetCard
              name={asset.name}
              address={asset.address}
              metrics={asset.metrics}
              quality={asset.quality}
              bar={asset.bar}
              footerLabel="See asset details"
              onFooterClick={() => {}}
              onClose={() => setSelectedId(null)}
            />
          )}
        </div>

        {/* Chart */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex gap-2 h-44">
            <div className="flex flex-col justify-between pb-5 text-[10px] text-[#9CA3AF] text-right w-8 shrink-0">
              <span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
            </div>
            <div className="flex-1 relative">
              {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
                <div key={i} className="absolute left-0 right-0 border-t border-dashed border-[#EDEEF1] dark:border-[#1F2430]" style={{ bottom: `${f * 100}%` }} />
              ))}
              <div className="absolute inset-0 flex items-end gap-1 pb-5">
                {DRILL_ASSETS.map((a) => {
                  const isSelected = selectedId === a.id
                  const isDimmed   = selectedId !== null && !isSelected
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setSelectedId(prev => prev === a.id ? null : a.id)}
                      aria-pressed={isSelected}
                      aria-label={`${a.name}: ${a.eui} kWh/m²/yr`}
                      className={['flex-1 rounded-t-sm transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1258F8]', isSelected ? 'bg-[#FF455F]' : 'bg-[#1258F8]', isDimmed ? 'opacity-30' : 'opacity-100 hover:opacity-80'].join(' ')}
                      style={{ height: `${(a.eui / MAX_EUI) * 100}%` }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-1 pl-10 mt-1">
            {DRILL_ASSETS.map((a) => (
              <div key={a.id} className="flex-1 text-center">
                <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF] leading-tight block truncate px-0.5">
                  {a.name.replace(' St', '').replace(' Sq', '').replace(' Pl', '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="text-[11px] text-[#9CA3AF] dark:text-[#505867]">
          {selectedId ? 'Click the same bar again or × to deselect.' : '↑ Click any bar to reveal that asset\'s card.'}
        </p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CardsPage() {
  return (
    <div>
      <PageHeader
        title="Cards"
        description="Surface containers that group related content into scannable units. Six families: Simple, Standard, Form, Data viz, Overview, and Asset."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>

            {/* ── Simple ───────────────────────────────────────────────────── */}
            <Section title="Simple card">
              <UseList items={[
                'Icon + title + optional subtitle — no header label or footer.',
                'Use for navigation tiles, feature highlights, or quick-action shortcuts.',
                'Supports vertical (default) and horizontal orientations.',
              ]} />
              <div className="mt-4">
                <PreviewBox label="Vertical (default)">
                  <SimpleCard title="Energy monitoring" subtitle="Track consumption across all sites" className="w-48" />
                  <SimpleCard title="GHG emissions" subtitle="Scope 1, 2 and 3 reporting" className="w-48" />
                  <SimpleCard title="Water usage" className="w-48" />
                </PreviewBox>
              </div>
              <div className="mt-4">
                <PreviewBox label="Horizontal orientation">
                  <SimpleCard title="Energy monitoring" subtitle="Track across sites" orientation="horizontal" className="w-72" />
                </PreviewBox>
              </div>
            </Section>

            {/* ── Standard ─────────────────────────────────────────────────── */}
            <Section title="Standard card">
              <UseList items={[
                'Header (label + optional suffix + ⋮ menu) + arbitrary content slot + optional footer button.',
                'Use for dashboard widgets, KPI tiles, and metric panels.',
                'The footer button triggers a primary action such as "View details" or "Export".',
              ]} />
              <div className="mt-4">
                <PreviewBox label="With chart content + footer button">
                  <StandardCard
                    label="Energy consumption"
                    suffix="MWh"
                    footerLabel="View report"
                    className="w-72"
                  >
                    <ChartPlaceholder />
                  </StandardCard>
                  <StandardCard
                    label="Site metrics"
                    showMenu={false}
                    className="w-60"
                  >
                    <MetricSlot />
                  </StandardCard>
                </PreviewBox>
              </div>
            </Section>

            {/* ── Form ─────────────────────────────────────────────────────── */}
            <Section title="Form card">
              <UseList items={[
                'Header + radio tab selector + divider + content slot + footer button.',
                'Use for forms that switch between two or more modes/variants (e.g. manual vs import).',
                'Footer button is always visible and represents the primary submit action.',
              ]} />
              <div className="mt-4">
                <PreviewBox label="Two-tab form">
                  <FormCard
                    label="Add building"
                    tabs={[{ label: 'Manual entry', value: 'manual' }, { label: 'Import CSV', value: 'csv' }]}
                    footerLabel="Save building"
                    className="w-80"
                  >
                    <FormSlot />
                  </FormCard>
                </PreviewBox>
              </div>
            </Section>

            {/* ── Data viz ─────────────────────────────────────────────────── */}
            <Section title="Data viz card">
              <UseList items={[
                'Header + underline tab bar (optional) + chart/visualization content slot.',
                'Omit tabs for a plain chart card; add tabs to switch between chart views.',
                'Use for all time-series, bar, line, and comparison charts in dashboards.',
              ]} />
              <div className="mt-4">
                <PreviewBox label="With underline tab bar">
                  <DataVizCard
                    label="Emissions over time"
                    tabs={[{ label: 'Month', value: 'month' }, { label: 'Quarter', value: 'quarter' }, { label: 'Year', value: 'year' }]}
                    className="w-80"
                  >
                    <ChartPlaceholder height={140} />
                  </DataVizCard>
                </PreviewBox>
                <div className="mt-4">
                  <PreviewBox label="Without tabs (standard chart)">
                    <DataVizCard label="Water usage" suffix="m³" className="w-72">
                      <ChartPlaceholder height={120} />
                    </DataVizCard>
                  </PreviewBox>
                </div>
              </div>
            </Section>

            {/* ── Overview ─────────────────────────────────────────────────── */}
            <Section title="Overview card">
              <UseList items={[
                'Horizontal row: metadata header + expandable key-value data row.',
                'Use in asset, portfolio, or company list views to show summary data for each entity.',
                'Collapse/expand per row. Status badge and completion percentage are optional.',
              ]} />
              <div className="mt-4 flex flex-col gap-3">
                <OverviewCard
                  variant="asset"
                  name="Aurora HQ"
                  subtext="London, UK"
                  typeLabel="Office"
                  typeValue="— Grade A"
                  tag="Active"
                  dataPoints={[
                    { label: 'Floor area', value: '12,400 m²' },
                    { label: 'Occupancy', value: '87%' },
                    { label: 'Energy (YTD)', value: '1,248 MWh' },
                    { label: 'GHG (YTD)', value: '342 tCO₂e' },
                  ]}
                  status="complete"
                  statusLabel="Complete"
                  completionPct={100}
                  onEdit={() => {}}
                />
                <OverviewCard
                  variant="asset"
                  name="Riverside Tower"
                  subtext="Manchester, UK"
                  dataPoints={[
                    { label: 'Floor area', value: '8,200 m²' },
                    { label: 'Occupancy', value: '72%' },
                    { label: 'Energy (YTD)', value: '890 MWh' },
                  ]}
                  status="processing"
                  statusLabel="Processing"
                  defaultExpanded={false}
                />
                <OverviewCard
                  variant="asset"
                  name="Greenfield Campus"
                  subtext="Bristol, UK"
                  dataPoints={[
                    { label: 'Floor area', value: '5,600 m²' },
                    { label: 'Occupancy', value: '—' },
                  ]}
                  status="incomplete"
                  statusLabel="Incomplete"
                  defaultExpanded={false}
                />
              </div>
            </Section>

            {/* ── Asset card ───────────────────────────────────────────────── */}
            <Section title="Asset card">
              <UseList items={[
                'ESG-specific pattern for showing a single asset\'s key metrics inline.',
                'Name + address header, key-value metric rows, optional data quality section with status tags and Improve actions.',
                'Optional stacked bar and full-width CTA button at the bottom.',
              ]} />
              <div className="mt-4">
                <PreviewBox label="Performance details variant">
                  <AssetCard
                    name="180 George St"
                    address="Sydney · Office"
                    metrics={[
                      { label: 'EUI (actual)',          value: '142 kWh/m²/yr' },
                      { label: 'EUI (estimated)',       value: '138 kWh/m²/yr' },
                      { label: 'Property type',        value: 'Office' },
                      { label: 'Gross floor area',     value: '18,400 m²' },
                      { label: 'Total consumption',    value: '2,613 MWh' },
                    ]}
                    footerLabel="See asset details"
                    onFooterClick={() => {}}
                    onClose={() => {}}
                    className="w-72"
                  />
                </PreviewBox>
              </div>
              <div className="mt-4">
                <PreviewBox label="Data quality variant">
                  <AssetCard
                    name="1 Bligh St"
                    address="Sydney · Office"
                    metrics={[
                      { label: 'Total gross floor area', value: <>12,400 <span className="text-[#505867] font-normal">m²</span></> },
                      { label: 'Energy use intensity',   value: <>142 <span className="text-[#505867] font-normal">kWh/m²/yr</span></> },
                      { label: 'Total consumption',      value: <>1,764 <span className="text-[#505867] font-normal">MWh</span></> },
                      { label: 'Meters & Consumption',   value: '4 / 6' },
                    ]}
                    quality={[
                      { label: 'Data Readiness', pct: 88,    status: 'error',   onImprove: () => {} },
                      { label: 'Data Coverage',  pct: 80.91, status: 'warning', onImprove: () => {} },
                      { label: 'Data Reliability', pct: 60,  status: 'warning', onImprove: () => {} },
                    ]}
                    bar={[
                      { color: '#d76513', pct: 16 },
                      { color: '#22C55E', pct: 25 },
                      { color: '#ffb246', pct: 25 },
                      { color: '#ed113a', pct: 19 },
                      { color: '#2295FF', pct: 15 },
                    ]}
                    footerLabel="See asset details"
                    onFooterClick={() => {}}
                    onClose={() => {}}
                    className="w-72"
                  />
                </PreviewBox>
              </div>
            </Section>

            {/* ── Drill-down interaction ───────────────────────────────────── */}
            <Section title="Asset card — drill-down interaction">
              <UseList items={[
                'Place the AssetCard panel to the left of the chart when a bar or data point is clicked.',
                'The chart reflows to fill the remaining space — no page navigation needed.',
                'Clicking the same bar again, or pressing ×, dismisses the card and restores full-width.',
              ]} />
              <div className="mt-4">
                <DrilldownDemo />
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { step: '1', title: 'Default state',  body: 'Full-width chart. All bars use the metric color.' },
                  { step: '2', title: 'Bar clicked',    body: 'AssetCard slides in (240 px). Selected bar highlights; others dim to 30%.' },
                  { step: '3', title: 'Card dismissed', body: 'User presses × or re-clicks the bar. Card slides out, chart restores.' },
                ].map(({ step, title, body }) => (
                  <div key={step} className="flex gap-3 p-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117]">
                    <span className="w-5 h-5 rounded-full bg-[#1258F8] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-0.5">{title}</p>
                      <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Do / Don't ───────────────────────────────────────────────── */}
            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3 w-full max-w-xs">
                    <StandardCard label="Energy consumption" suffix="MWh">
                      <ChartPlaceholder height={80} />
                    </StandardCard>
                  </div>
                  <p>Give every Standard/FormCard a concise label. Use the suffix for units or date ranges.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3 w-full max-w-xs">
                    <StandardCard label="Card with nested card">
                      <StandardCard label="Inner card">
                        <div className="text-xs text-grey-400">Never nest cards inside cards.</div>
                      </StandardCard>
                    </StandardCard>
                  </div>
                  <p>Don&apos;t nest cards. Use table rows, internal dividers, or list items inside a single card body.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/tables', label: 'Tables', description: 'For homogeneous lists that share a column structure.' },
              { href: '/components/modals', label: 'Modals', description: 'When card content should expand into a full overlay.' },
              { href: '/components/badges-tags', label: 'Badges & tags', description: 'Status indicators placed inside card headers.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'Card border radius',       value: '8px (rounded-lg)',       token: '—' },
                { property: 'Card padding (horizontal)', value: '16px (px-4)',            token: '—' },
                { property: 'Header top padding',        value: '16px (pt-4)',            token: '—' },
                { property: 'Content area padding',      value: '12px vertical (py-3)',   token: '—' },
                { property: 'Footer button height',      value: '32px (h-8)',             token: '—' },
                { property: 'Tab underline offset',      value: '-1px (-mb-px)',          token: '—' },
                { property: 'Overview row data gap',     value: '8px × 32px (gap-x-8 gap-y-2)', token: '—' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Card background (light)"   hex="#FFFFFF" role="White — card surface" />
              <ColorRow label="Card background (dark)"    hex="#111827" role="Grey 950 — dark mode card surface" border />
              <ColorRow label="Card border"               hex="#EDEEF1" role="Grey 100 — 1px border for all card variants" border />
              <ColorRow label="Dark card border"          hex="#1F2430" role="Grey 800 — dark mode border" border />
              <ColorRow label="Header / footer dividers"  hex="#EDEEF1" role="Grey 100 — horizontal separators" border />
              <ColorRow label="Card title text"           hex="#111827" role="Grey 950 — primary label in header" border />
              <ColorRow label="Header suffix text"        hex="#9CA3AF" role="Grey 400 — secondary unit / date range" border />
              <ColorRow label="Status — complete"         hex="#DCFCE7" role="Success 50 bg — complete status badge" border />
              <ColorRow label="Status — processing"       hex="#EFF6FF" role="Blue 50 bg — processing status badge" border />
              <ColorRow label="Status — incomplete"       hex="#F3F4F6" role="Grey 100 bg — incomplete status badge" border />
            </Section>

            <Section title="Typography">
              <SpecTable rows={[
                { property: 'Header label',    value: '14px / 600 (font-semibold)',  token: 'text-sm font-semibold' },
                { property: 'Header suffix',   value: '14px / 400',                  token: 'text-sm' },
                { property: 'Simple title',    value: '14px / 600',                  token: 'text-sm font-semibold' },
                { property: 'Simple subtitle', value: '14px / 400',                  token: 'text-sm' },
                { property: 'Tab label',       value: '14px / 500 (active)',         token: 'text-sm font-medium' },
                { property: 'Overview name',   value: '14px / 600',                  token: 'text-sm font-semibold' },
                { property: 'Data point label', value: '12px / 400',                 token: 'text-xs' },
                { property: 'Data point value', value: '14px / 600',                 token: 'text-sm font-semibold' },
                { property: 'Status badge',    value: '12px / 500',                  token: 'text-xs font-medium' },
              ]} />
            </Section>

            <Section title="Tab variants">
              <Preview label="FormCard — radio selector tabs">
                <FormCard
                  label="Tab style demo"
                  tabs={[{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }, { label: 'Option C', value: 'c' }]}
                  footerLabel="Confirm"
                  className="w-72"
                >
                  <div className="text-sm text-grey-400 dark:text-grey-500 py-2">Radio-style selector — filled circle on selected tab</div>
                </FormCard>
              </Preview>
              <div className="mt-4">
                <Preview label="DataVizCard — underline tabs">
                  <DataVizCard
                    label="Tab style demo"
                    tabs={[{ label: 'Week', value: 'w' }, { label: 'Month', value: 'm' }, { label: 'Year', value: 'y' }]}
                    className="w-72"
                  >
                    <div className="text-sm text-grey-400 dark:text-grey-500 py-2">Underline-style tabs — 2px blue border bottom on active</div>
                  </DataVizCard>
                </Preview>
              </div>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>

            <Section title="SimpleCard">
              <Preview label="Live preview">
                <SimpleCard title="Energy monitoring" subtitle="Track consumption across all sites" className="w-56" />
              </Preview>
              <Code>{`import { SimpleCard } from '@/app/components-lib/ui/Card'

<SimpleCard
  title="Energy monitoring"
  subtitle="Track consumption across all sites"
/>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'title',       value: 'string',                         token: 'Required — card title text' },
                  { property: 'subtitle',    value: 'string (optional)',               token: 'Secondary description below title' },
                  { property: 'orientation', value: '"vertical" | "horizontal"',       token: 'Default: "vertical"' },
                  { property: 'className',   value: 'string (optional)',               token: 'Extra Tailwind classes' },
                ]} />
              </div>
            </Section>

            <Section title="StandardCard">
              <Preview label="Live preview">
                <StandardCard label="Energy consumption" suffix="MWh" footerLabel="View report" className="w-72">
                  <ChartPlaceholder />
                </StandardCard>
              </Preview>
              <Code>{`import { StandardCard } from '@/app/components-lib/ui/Card'

<StandardCard
  label="Energy consumption"
  suffix="MWh"
  showMenu           // default true — shows ⋮ icon
  footerLabel="View report"
  onFooterClick={() => router.push('/report')}
>
  {/* chart, metrics, any content */}
</StandardCard>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'label',         value: 'string',                   token: 'Required — header label' },
                  { property: 'suffix',        value: 'string (optional)',         token: 'Secondary text next to label (unit, date range)' },
                  { property: 'showMenu',      value: 'boolean',                  token: 'Default: true — shows ⋮ button' },
                  { property: 'footerLabel',   value: 'string (optional)',         token: 'If set, renders footer button with this label' },
                  { property: 'onFooterClick', value: '() => void (optional)',     token: 'Callback for footer button' },
                  { property: 'orientation',   value: '"vertical" | "horizontal"', token: 'Default: "vertical"' },
                  { property: 'children',      value: 'ReactNode (optional)',      token: 'Card body content' },
                ]} />
              </div>
            </Section>

            <Section title="FormCard">
              <Preview label="Live preview">
                <FormCard
                  label="Add building"
                  tabs={[{ label: 'Manual entry', value: 'manual' }, { label: 'Import CSV', value: 'csv' }]}
                  footerLabel="Save building"
                  className="w-80"
                >
                  <FormSlot />
                </FormCard>
              </Preview>
              <Code>{`import { FormCard } from '@/app/components-lib/ui/Card'

<FormCard
  label="Add building"
  tabs={[
    { label: 'Manual entry', value: 'manual' },
    { label: 'Import CSV',   value: 'csv'    },
  ]}
  footerLabel="Save building"
  onFooterClick={handleSubmit}
>
  {/* form fields */}
</FormCard>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'label',         value: 'string',                   token: 'Required — header label' },
                  { property: 'tabs',          value: 'FormCardTab[]',             token: 'Array of { label, value }. Default: two "Value" tabs' },
                  { property: 'footerLabel',   value: 'string',                   token: 'Default: "Button" — submit button label' },
                  { property: 'onFooterClick', value: '() => void (optional)',     token: 'Submit callback' },
                  { property: 'suffix',        value: 'string (optional)',         token: 'Header suffix text' },
                  { property: 'showMenu',      value: 'boolean',                  token: 'Default: true' },
                  { property: 'orientation',   value: '"vertical" | "horizontal"', token: 'Default: "vertical"' },
                  { property: 'children',      value: 'ReactNode (optional)',      token: 'Card body content (form fields)' },
                ]} />
              </div>
            </Section>

            <Section title="DataVizCard">
              <Preview label="Live preview">
                <DataVizCard
                  label="Emissions"
                  suffix="tCO₂e"
                  tabs={[{ label: 'Month', value: 'month' }, { label: 'Quarter', value: 'quarter' }]}
                  className="w-80"
                >
                  <ChartPlaceholder height={140} />
                </DataVizCard>
              </Preview>
              <Code>{`import { DataVizCard } from '@/app/components-lib/ui/Card'

// With tabs
<DataVizCard
  label="Emissions"
  suffix="tCO₂e"
  tabs={[
    { label: 'Month',   value: 'month'   },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year',    value: 'year'    },
  ]}
>
  <MyChart />
</DataVizCard>

// Without tabs (plain chart card)
<DataVizCard label="Water usage" suffix="m³">
  <MyChart />
</DataVizCard>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'label',       value: 'string',                   token: 'Required — header label' },
                  { property: 'suffix',      value: 'string (optional)',         token: 'Unit or period after label' },
                  { property: 'tabs',        value: 'DataVizCardTab[] (optional)', token: 'If omitted, no tab bar renders' },
                  { property: 'showMenu',    value: 'boolean',                  token: 'Default: true' },
                  { property: 'orientation', value: '"vertical" | "horizontal"', token: 'Default: "vertical"' },
                  { property: 'children',    value: 'ReactNode (optional)',      token: 'Chart / visualization' },
                ]} />
              </div>
            </Section>

            <Section title="OverviewCard">
              <Preview label="Live preview">
                <OverviewCard
                  name="Aurora HQ"
                  subtext="London, UK"
                  typeLabel="Office"
                  typeValue="— Grade A"
                  tag="Active"
                  dataPoints={[
                    { label: 'Floor area', value: '12,400 m²' },
                    { label: 'Energy (YTD)', value: '1,248 MWh' },
                    { label: 'GHG (YTD)', value: '342 tCO₂e' },
                  ]}
                  status="complete"
                  statusLabel="Complete"
                  completionPct={100}
                  onEdit={() => {}}
                />
              </Preview>
              <Code>{`import { OverviewCard } from '@/app/components-lib/ui/Card'

<OverviewCard
  variant="asset"          // 'asset' | 'portfolio' | 'company'
  name="Aurora HQ"
  subtext="London, UK"
  typeLabel="Office"
  typeValue="— Grade A"
  tag="Active"
  dataPoints={[
    { label: 'Floor area',   value: '12,400 m²' },
    { label: 'Energy (YTD)', value: '1,248 MWh' },
    { label: 'GHG (YTD)',    value: '342 tCO₂e' },
  ]}
  status="complete"        // 'complete' | 'processing' | 'incomplete'
  statusLabel="Complete"
  completionPct={100}
  onEdit={() => openEditDrawer()}
  defaultExpanded          // default: true
/>`}</Code>
              <div className="mt-6">
                <SpecTable rows={[
                  { property: 'name',            value: 'string',                        token: 'Required — entity name' },
                  { property: 'subtext',         value: 'string (optional)',              token: 'Secondary descriptor (location, period)' },
                  { property: 'typeLabel',       value: 'string (optional)',              token: 'Entity type label shown with BuildingOffice icon' },
                  { property: 'typeValue',       value: 'string (optional)',              token: 'Secondary type text' },
                  { property: 'tag',             value: 'string (optional)',              token: 'Badge text (e.g. "Active")' },
                  { property: 'dataPoints',      value: 'OverviewDataPoint[]',            token: 'Array of { label, value: ReactNode }' },
                  { property: 'status',          value: '"complete"|"processing"|"incomplete"', token: 'Controls status badge color' },
                  { property: 'statusLabel',     value: 'string (optional)',              token: 'Custom label for status badge' },
                  { property: 'completionPct',   value: 'number (optional)',              token: 'Percentage shown above status badge' },
                  { property: 'onEdit',          value: '() => void (optional)',          token: 'If set, renders Edit button in header' },
                  { property: 'defaultExpanded', value: 'boolean',                       token: 'Default: true — initial expand state' },
                  { property: 'variant',         value: '"asset"|"portfolio"|"company"',  token: 'Semantic variant (visual is the same)' },
                ]} />
              </div>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <A11yRow check="role=region">
                  Wrap each meaningful card in{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    role=&quot;region&quot;
                  </code>{' '}
                  with an{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    aria-labelledby
                  </code>{' '}
                  pointing to the card&apos;s heading so screen readers can identify the landmark.
                </A11yRow>
                <A11yRow check="heading level">
                  Use the correct heading level for context — typically{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    &lt;h3&gt;
                  </code>{' '}
                  when nested inside a page section. Don&apos;t skip levels.
                </A11yRow>
                <A11yRow check="expand / collapse">
                  The OverviewCard chevron button uses{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    aria-label=&quot;Collapse&quot; / &quot;Expand&quot;
                  </code>{' '}
                  — keep this pattern when implementing custom expand/collapse controls.
                </A11yRow>
                <A11yRow check="interactive cards">
                  If the entire card is clickable, wrap it in a single{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    &lt;a&gt;
                  </code>{' '}
                  rather than a{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    div onClick
                  </code>{' '}
                  — ensures keyboard focus and screen reader navigation work correctly.
                </A11yRow>
                <A11yRow check="tab selection">
                  FormCard and DataVizCard tabs are implemented as{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    &lt;button type=&quot;button&quot;&gt;
                  </code>.{' '}
                  For full ARIA tab pattern, add{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    role=&quot;tab&quot;
                  </code>{' '}
                  and{' '}
                  <code className="text-xs font-mono bg-grey-50 dark:bg-grey-900 px-1 py-0.5 rounded">
                    aria-selected
                  </code>{' '}
                  when screen-reader tab navigation is required.
                </A11yRow>
              </div>
            </Section>

            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-grey-100 dark:border-grey-800 overflow-hidden bg-white dark:bg-grey-950">
                <KeyRow keys={['Tab']} action="Move focus through all interactive elements inside the card (menu button, tab selectors, footer buttons, edit/expand controls)." />
                <KeyRow keys={['Shift+Tab']} action="Move focus backwards through interactive card elements." />
                <KeyRow keys={['Enter', 'Space']} action="Activate the focused button — expand/collapse chevron, tab selector, or footer action." />
                <KeyRow keys={['Esc']} action="Close any open dropdown menu attached to the ⋮ button." />
              </div>
            </Section>

            <Section title="Contrast ratios">
              <SpecTable rows={[
                { property: 'Card label on white',        value: '#111827 on #FFFFFF',  token: '18.1:1 ✓ AAA' },
                { property: 'Header suffix on white',     value: '#9CA3AF on #FFFFFF',  token: '2.9:1 — use for non-text decoration only' },
                { property: 'Data point value on white',  value: '#111827 on #FFFFFF',  token: '18.1:1 ✓ AAA' },
                { property: 'Data point label on white',  value: '#9CA3AF on #FFFFFF',  token: '2.9:1 — decorative label, not body copy' },
                { property: 'Status complete text',       value: '#15803D on #DCFCE7',  token: '4.9:1 ✓ AA' },
                { property: 'Status processing text',     value: '#1D4ED8 on #EFF6FF',  token: '5.1:1 ✓ AA' },
                { property: 'Status incomplete text',     value: '#6B7280 on #F3F4F6',  token: '4.0:1 ✓ AA (large text)' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
