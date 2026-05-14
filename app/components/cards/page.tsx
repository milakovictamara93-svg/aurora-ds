'use client'

import { useState } from 'react'
import InputText from '@/app/components-lib/ui/InputText'
import {
  SimpleCard,
  StandardCard,
  FormCard,
  DataVizCard,
  OverviewCard,
  AssetCard,
} from '@/app/components-lib/ui/Card'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'

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
      <InputText label="Building name" defaultValue="Aurora HQ" state="read-only" />
      <InputText label="Energy source" defaultValue="Solar + Grid" state="read-only" />
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
      { color: '#d76513', pct: 16, label: 'Smart meters' }, { color: '#22C55E', pct: 25, label: 'Invoices / Conventional meters' },
      { color: '#ffb246', pct: 25, label: 'Estimation (SJV Cluster)' }, { color: '#ed113a', pct: 19, label: 'Estimation (SJV postal code)' }, { color: '#1258F8', pct: 15, label: 'Estimation (Calculation)' },
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
      { color: '#ffb246', pct: 30 }, { color: '#ed113a', pct: 22 }, { color: '#1258F8', pct: 10 },
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
      { color: '#ffb246', pct: 20 }, { color: '#ed113a', pct: 15 }, { color: '#1258F8', pct: 20 },
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
      { color: '#ffb246', pct: 15 }, { color: '#ed113a', pct: 35 }, { color: '#1258F8', pct: 10 },
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
      { color: '#ffb246', pct: 18 }, { color: '#ed113a', pct: 12 }, { color: '#1258F8', pct: 22 },
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
      { color: '#ffb246', pct: 22 }, { color: '#ed113a', pct: 18 }, { color: '#1258F8', pct: 18 },
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
          <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">kWh/m2/yr</span>
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
                      aria-label={`${a.name}: ${a.eui} kWh/m2/yr`}
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
          {selectedId ? 'Click the same bar again or x to deselect.' : 'Click any bar to reveal that asset\'s card.'}
        </p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TOTAL = '06'

export default function CardPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Card"
        description="Surface containers that group related content into scannable units. Six families: Simple, Standard, Form, Data viz, Overview, and Asset."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Grouping related content into distinct visual units</>,
            <>Dashboard tiles, KPI summaries, and data widgets</>,
            <>Navigation tiles, feature highlights, or quick-action shortcuts</>,
            <>List items with rich content (image, title, metadata)</>,
            <>Forms that switch between two or more modes/variants</>,
          ]}
          dontItems={[
            <>Structured tabular data -- use <Code>Table</Code></>,
            <>Full-page content -- just use the page surface</>,
            <>Single-line items -- use a list</>,
            <>Nesting cards inside other cards</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree
          rows={[
            { intent: 'Group related content visually', use: <Code>Card</Code>, not: <>Loose content</> },
            { intent: 'Rows of structured data', use: <Code>Table</Code>, not: <Code>Card</Code> },
            { intent: 'Icon + title navigation tile', use: <Code>SimpleCard</Code>, not: <Code>StandardCard</Code> },
            { intent: 'Dashboard widget with chart', use: <Code>DataVizCard</Code>, not: <Code>StandardCard</Code> },
            { intent: 'Form with mode tabs', use: <Code>FormCard</Code>, not: <Code>StandardCard</Code> },
            { intent: 'Asset list with expandable rows', use: <Code>OverviewCard</Code>, not: <Code>Table</Code> },
            { intent: 'Single asset detail inline', use: <Code>AssetCard</Code>, not: <Code>Modal</Code> },
          ]}
        />
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">
        {/* Simple card */}
        <div className="mb-8">
          <h4 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">Simple card</h4>
          <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4 leading-[1.45]">
            Icon + title + optional subtitle. No header label or footer. Use for navigation tiles, feature highlights, or quick-action shortcuts.
          </p>
          <PreviewBox label="Vertical (default)">
            <SimpleCard title="Energy monitoring" subtitle="Track consumption across all sites" className="w-48" />
            <SimpleCard title="GHG emissions" subtitle="Scope 1, 2 and 3 reporting" className="w-48" />
            <SimpleCard title="Water usage" className="w-48" />
          </PreviewBox>
          <div className="mt-4">
            <PreviewBox label="Horizontal orientation">
              <SimpleCard title="Energy monitoring" subtitle="Track across sites" orientation="horizontal" className="w-72" />
            </PreviewBox>
          </div>
        </div>

        {/* Standard card */}
        <div className="mb-8">
          <h4 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">Standard card</h4>
          <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4 leading-[1.45]">
            Header (label + optional suffix + menu) + arbitrary content slot + optional footer button. Use for dashboard widgets, KPI tiles, and metric panels.
          </p>
          <PreviewBox label="With chart content + footer button">
            <StandardCard label="Energy consumption" suffix="MWh" footerLabel="View report" className="w-72">
              <ChartPlaceholder />
            </StandardCard>
            <StandardCard label="Site metrics" showMenu={false} className="w-60">
              <MetricSlot />
            </StandardCard>
          </PreviewBox>
        </div>

        {/* Form card */}
        <div className="mb-8">
          <h4 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">Form card</h4>
          <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4 leading-[1.45]">
            Header + radio tab selector + divider + content slot + footer button. Use for forms that switch between two or more modes/variants.
          </p>
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

        {/* Data viz card */}
        <div className="mb-8">
          <h4 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">Data viz card</h4>
          <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4 leading-[1.45]">
            Header + underline tab bar (optional) + chart/visualization content slot. Omit tabs for a plain chart card.
          </p>
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
              <DataVizCard label="Water usage" suffix="m3" className="w-72">
                <ChartPlaceholder height={120} />
              </DataVizCard>
            </PreviewBox>
          </div>
        </div>

        {/* Overview card */}
        <div className="mb-8">
          <h4 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">Overview card</h4>
          <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4 leading-[1.45]">
            Horizontal row: metadata header + expandable key-value data row. Use in asset, portfolio, or company list views to show summary data for each entity.
          </p>
          <div className="flex flex-col gap-3">
            <OverviewCard
              variant="asset"
              name="Aurora HQ"
              subtext="London, UK"
              typeLabel="Office"
              typeValue="- Grade A"
              tag="Active"
              dataPoints={[
                { label: 'Floor area', value: '12,400 m2' },
                { label: 'Occupancy', value: '87%' },
                { label: 'Energy (YTD)', value: '1,248 MWh' },
                { label: 'GHG (YTD)', value: '342 tCO2e' },
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
                { label: 'Floor area', value: '8,200 m2' },
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
                { label: 'Floor area', value: '5,600 m2' },
                { label: 'Occupancy', value: '-' },
              ]}
              status="incomplete"
              statusLabel="Incomplete"
              defaultExpanded={false}
            />
          </div>
        </div>

        {/* Asset card */}
        <div className="mb-8">
          <h4 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">Asset card</h4>
          <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4 leading-[1.45]">
            ESG-specific pattern for showing a single asset's key metrics inline. Name + address header, key-value metric rows, optional data quality section with status tags and Improve actions.
          </p>
          <PreviewBox label="Performance details variant">
            <AssetCard
              name="180 George St"
              address="Sydney · Office"
              metrics={[
                { label: 'EUI (actual)',          value: '142 kWh/m2/yr' },
                { label: 'EUI (estimated)',       value: '138 kWh/m2/yr' },
                { label: 'Property type',        value: 'Office' },
                { label: 'Gross floor area',     value: '18,400 m2' },
                { label: 'Total consumption',    value: '2,613 MWh' },
              ]}
              footerLabel="See asset details"
              onFooterClick={() => {}}
              onClose={() => {}}
              className="w-72"
            />
          </PreviewBox>
          <div className="mt-4">
            <PreviewBox label="Data quality variant">
              <AssetCard
                name="1 Bligh St"
                address="Sydney · Office"
                metrics={[
                  { label: 'Total gross floor area', value: <>12,400 <span className="text-[#505867] font-normal">m2</span></> },
                  { label: 'Energy use intensity',   value: <>142 <span className="text-[#505867] font-normal">kWh/m2/yr</span></> },
                  { label: 'Total consumption',      value: <>1,764 <span className="text-[#505867] font-normal">MWh</span></> },
                  { label: 'Meters & Consumption',   value: '4 / 6' },
                ]}
                quality={[
                  { label: 'Data Readiness', pct: 88,    status: 'error',   onImprove: () => {} },
                  { label: 'Data Coverage',  pct: 80.91, status: 'warning', onImprove: () => {} },
                  { label: 'Data Reliability', pct: 60,  status: 'warning', onImprove: () => {} },
                ]}
                bar={[
                  { color: '#d76513', pct: 16, label: 'Smart meters' },
                  { color: '#22C55E', pct: 25, label: 'Invoices / Conventional meters' },
                  { color: '#ffb246', pct: 25, label: 'Estimation (SJV Cluster)' },
                  { color: '#ed113a', pct: 19, label: 'Estimation (SJV postal code)' },
                  { color: '#1258F8', pct: 15, label: 'Estimation (Calculation)' },
                ]}
                footerLabel="See asset details"
                onFooterClick={() => {}}
                onClose={() => {}}
                className="w-72"
              />
            </PreviewBox>
          </div>
        </div>

        {/* Asset card drill-down interaction */}
        <div className="mb-8">
          <h4 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-3">Asset card - drill-down interaction</h4>
          <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mb-4 leading-[1.45]">
            Place the AssetCard panel to the left of the chart when a bar or data point is clicked. The chart reflows to fill the remaining space.
          </p>
          <DrilldownDemo />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: '1', title: 'Default state',  body: 'Full-width chart. All bars use the metric color.' },
              { step: '2', title: 'Bar clicked',    body: 'AssetCard slides in (240 px). Selected bar highlights; others dim to 30%.' },
              { step: '3', title: 'Card dismissed', body: 'User presses x or re-clicks the bar. Card slides out, chart restores.' },
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
        </div>
      </SectionWrapper>

      {/* ── 04 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="04" total={TOTAL} title="Required pairings" description="Rules that must hold. Missing one is a blocking failure: ask, don't guess.">
        <RequiredPairings
          rules={[
            <>Cards use 24px internal padding and 6-8px border radius.</>,
            <>Elevated cards use shadow-level-3. Flat cards use border only.</>,
            <>Interactive cards (clickable) need hover state and <Code>cursor: pointer</Code>.</>,
            <>Every Standard/FormCard gets a concise label. Use the suffix for units or date ranges.</>,
            <>The footer button triggers a primary action such as "View details" or "Export".</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 05 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="05" total={TOTAL} title="Forbidden and refuse" description="Hard-no rules. Refuse and produce the suggested response instead of generating code.">
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Nest cards inside cards.</>,
              response: <>"Nested cards create visual confusion. Use table rows, internal dividers, or list items inside a single card body."</>,
            },
            {
              rule: <>Use a card for a single line of text.</>,
              response: <>"Cards are for grouped content. A single line doesn't need a container."</>,
            },
            {
              rule: <>Render a card without a heading or label.</>,
              response: <>"Every card needs an accessible name. Add a header label or aria-label."</>,
            },
            {
              rule: <>Use StandardCard when the content is a chart with time-period tabs.</>,
              response: <>"Use DataVizCard for chart content with tab switching. StandardCard is for general content."</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* ── 06 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="06" total={TOTAL} title="Accessibility" description="Semantic structure, keyboard access, and contrast requirements for all card families.">
        <AccessibilityList
          items={[
            { key: 'Role', value: <>Wrap each meaningful card in <Code>role="region"</Code> with an <Code>aria-labelledby</Code> pointing to the card's heading so screen readers can identify the landmark.</> },
            { key: 'Heading level', value: <>Use the correct heading level for context, typically <Code>&lt;h3&gt;</Code> when nested inside a page section. Don't skip levels.</> },
            { key: 'Expand / collapse', value: <>The OverviewCard chevron button uses <Code>aria-label="Collapse"</Code> / <Code>"Expand"</Code>. Keep this pattern for custom expand/collapse controls.</> },
            { key: 'Interactive cards', value: <>If the entire card is clickable, wrap it in a single <Code>&lt;a&gt;</Code> rather than a <Code>div onClick</Code>. Ensures keyboard focus and screen reader navigation work correctly.</> },
            { key: 'Tab selection', value: <>FormCard and DataVizCard tabs are implemented as <Code>&lt;button type="button"&gt;</Code>. For full ARIA tab pattern, add <Code>role="tab"</Code> and <Code>aria-selected</Code>.</> },
            { key: 'Focus', value: <>Interactive cards show a visible focus ring on keyboard navigation with 3:1 minimum contrast against the surrounding surface.</> },
            { key: 'Touch target', value: <>Footer buttons and interactive controls meet 44 x 44 px minimum touch target on mobile.</> },
          ]}
        />
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
