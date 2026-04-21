'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { AssetCard } from '@/app/components-lib/ui/Card'

// ── Chart palette ─────────────────────────────────────────────────────────────

const chartColors = [
  { name: 'Energy',        token: '--energy-500',           hex: '#FF455F', bg: 'bg-energy-500' },
  { name: 'GHG',           token: '--ghg-300',              hex: '#FFB246', bg: 'bg-ghg-400' },
  { name: 'Water',         token: '--water-400',            hex: '#1FD7EE', bg: 'bg-water-400' },
  { name: 'Waste',         token: '--waste-400',            hex: '#65A289', bg: 'bg-waste-400' },
  { name: 'Certifications',token: '--certifications-500',   hex: '#4E81E3', bg: 'bg-certifications-500' },
  { name: 'Engagement',    token: '--engagement-400',       hex: '#F4A043', bg: 'bg-engagement-400' },
  { name: 'ESG Risk',      token: '--esg-risk-500',         hex: '#0DBC82', bg: 'bg-esg-risk-500' },
]

// ── Static chart components ───────────────────────────────────────────────────

const barData  = [
  { label: 'Q1', energy: 72, water: 55, ghg: 38 },
  { label: 'Q2', energy: 65, water: 60, ghg: 42 },
  { label: 'Q3', energy: 80, water: 48, ghg: 35 },
  { label: 'Q4', energy: 58, water: 71, ghg: 30 },
]
const lineData = [18, 32, 27, 45, 38, 52, 60, 55, 68, 74, 66, 80]
const months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function MiniBarChart() {
  const barColors = ['bg-energy-500', 'bg-water-400', 'bg-ghg-400']
  const labels    = ['Energy', 'Water', 'GHG']
  return (
    <div className="p-6 rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[#111827] dark:text-white">Quarterly ESG performance</p>
        <div className="flex items-center gap-3">
          {labels.map((l, i) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${barColors[i]}`} />
              <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-4 h-40">
        {barData.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end gap-0.5 h-32">
              <div className="flex-1 bg-energy-500 rounded-t" style={{ height: `${d.energy}%` }} />
              <div className="flex-1 bg-water-400 rounded-t"  style={{ height: `${d.water}%` }} />
              <div className="flex-1 bg-ghg-400 rounded-t"    style={{ height: `${d.ghg}%` }} />
            </div>
            <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniLineChart() {
  const max = Math.max(...lineData), min = Math.min(...lineData), range = max - min
  const w = 400, h = 100, pad = 8
  const points  = lineData.map((v, i) => `${pad + (i / (lineData.length - 1)) * (w - pad * 2)},${h - pad - ((v - min) / range) * (h - pad * 2)}`)
  const pathD   = `M${points.join(' L')}`
  const areaD   = `M${points[0]} L${points.join(' L')} L${w - pad},${h - pad} L${pad},${h - pad} Z`
  return (
    <div className="p-6 rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[#111827] dark:text-white">ESG Risk score trend</p>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-esg-risk-500" />
          <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">ESG Risk</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28 overflow-visible">
        {[0.25, 0.5, 0.75].map((f, i) => (
          <line key={i} x1={pad} y1={h - pad - f * (h - pad * 2)} x2={w - pad} y2={h - pad - f * (h - pad * 2)}
            stroke="currentColor" strokeWidth="0.5" className="text-[#D7DAE0] dark:text-[#374151]" strokeDasharray="4 4" />
        ))}
        <path d={areaD} fill="#0DBC82" fillOpacity="0.08" />
        <path d={pathD} fill="none" stroke="#0DBC82" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {lineData.map((v, i) => {
          const x = pad + (i / (lineData.length - 1)) * (w - pad * 2)
          const y = h - pad - ((v - min) / range) * (h - pad * 2)
          return <circle key={i} cx={x} cy={y} r="3" fill="#0DBC82" />
        })}
      </svg>
      <div className="flex justify-between mt-1 px-2">
        {months.map((m) => <span key={m} className="text-xs text-[#505867] dark:text-[#9CA3AF]">{m}</span>)}
      </div>
    </div>
  )
}

function DonutChart() {
  const segments = [
    { label: 'Energy', value: 35, color: '#FF455F' },
    { label: 'Water',  value: 20, color: '#1FD7EE' },
    { label: 'GHG',    value: 25, color: '#FFB246' },
    { label: 'Waste',  value: 12, color: '#65A289' },
    { label: 'Other',  value: 8,  color: '#4E81E3' },
  ]
  const total = segments.reduce((s, d) => s + d.value, 0)
  let cumulative = 0
  const r = 40, cx = 60, cy = 60
  const arcs = segments.map((seg) => {
    const start = (cumulative / total) * 2 * Math.PI - Math.PI / 2
    cumulative += seg.value
    const end = (cumulative / total) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end)
    return { ...seg, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${seg.value / total > 0.5 ? 1 : 0} 1 ${x2},${y2} Z` }
  })
  return (
    <div className="p-6 rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]">
      <p className="text-sm font-semibold text-[#111827] dark:text-white mb-4">ESG category split</p>
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 120 120" className="w-28 h-28 shrink-0">
          {arcs.map((arc, i) => <path key={i} d={arc.d} fill={arc.color} />)}
          <circle cx={cx} cy={cy} r={24} fill="white" className="dark:fill-[#111827]" />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="8" fill="#505867">Total</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#111827">100%</text>
        </svg>
        <div className="space-y-2 flex-1">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">{s.label}</span>
              </div>
              <span className="text-xs font-semibold text-[#111827] dark:text-white">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Chart drill-down interaction demo ─────────────────────────────────────────

const ASSETS = [
  {
    id: '1', name: '180 George St',  address: 'Sydney · Office',   eui: 142, target: 130,
    metrics: [
      { label: 'EUI (actual)',       value: '142 kWh/m²/yr' },
      { label: 'EUI (target)',       value: '130 kWh/m²/yr' },
      { label: 'Total consumption',  value: '2,613 MWh' },
      { label: 'Gross floor area',   value: '18,400 m²' },
    ],
    quality: [
      { label: 'Data Readiness',  pct: 88,    status: 'error'   as const, onImprove: () => {} },
      { label: 'Data Coverage',   pct: 80.91, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Reliability',pct: 60,    status: 'warning' as const, onImprove: () => {} },
    ],
    bar: [
      { color: '#d76513', pct: 16 }, { color: '#22C55E', pct: 25 },
      { color: '#ffb246', pct: 25 }, { color: '#ed113a', pct: 19 }, { color: '#2295FF', pct: 15 },
    ],
  },
  {
    id: '2', name: '1 Bligh St',      address: 'Sydney · Office',   eui: 168, target: 145,
    metrics: [
      { label: 'EUI (actual)',       value: '168 kWh/m²/yr' },
      { label: 'EUI (target)',       value: '145 kWh/m²/yr' },
      { label: 'Total consumption',  value: '1,764 MWh' },
      { label: 'Gross floor area',   value: '10,500 m²' },
    ],
    quality: [
      { label: 'Data Readiness',  pct: 72, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Coverage',   pct: 65, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Reliability',pct: 50, status: 'error'   as const, onImprove: () => {} },
    ],
    bar: [
      { color: '#d76513', pct: 20 }, { color: '#22C55E', pct: 18 },
      { color: '#ffb246', pct: 30 }, { color: '#ed113a', pct: 22 }, { color: '#2295FF', pct: 10 },
    ],
  },
  {
    id: '3', name: 'Collins Square',  address: 'Melbourne · Office', eui: 124, target: 120,
    metrics: [
      { label: 'EUI (actual)',       value: '124 kWh/m²/yr' },
      { label: 'EUI (target)',       value: '120 kWh/m²/yr' },
      { label: 'Total consumption',  value: '3,100 MWh' },
      { label: 'Gross floor area',   value: '25,000 m²' },
    ],
    quality: [
      { label: 'Data Readiness',  pct: 95, status: 'success' as const },
      { label: 'Data Coverage',   pct: 91, status: 'success' as const },
      { label: 'Data Reliability',pct: 88, status: 'success' as const },
    ],
    bar: [
      { color: '#d76513', pct: 10 }, { color: '#22C55E', pct: 35 },
      { color: '#ffb246', pct: 20 }, { color: '#ed113a', pct: 15 }, { color: '#2295FF', pct: 20 },
    ],
  },
  {
    id: '4', name: '333 George St',   address: 'Sydney · Retail',    eui: 195, target: 160,
    metrics: [
      { label: 'EUI (actual)',       value: '195 kWh/m²/yr' },
      { label: 'EUI (target)',       value: '160 kWh/m²/yr' },
      { label: 'Total consumption',  value: '4,290 MWh' },
      { label: 'Gross floor area',   value: '22,000 m²' },
    ],
    quality: [
      { label: 'Data Readiness',  pct: 55, status: 'error'   as const, onImprove: () => {} },
      { label: 'Data Coverage',   pct: 48, status: 'error'   as const, onImprove: () => {} },
      { label: 'Data Reliability',pct: 70, status: 'warning' as const, onImprove: () => {} },
    ],
    bar: [
      { color: '#d76513', pct: 30 }, { color: '#22C55E', pct: 10 },
      { color: '#ffb246', pct: 15 }, { color: '#ed113a', pct: 35 }, { color: '#2295FF', pct: 10 },
    ],
  },
  {
    id: '5', name: '60 Martin Pl',    address: 'Sydney · Office',   eui: 110, target: 100,
    metrics: [
      { label: 'EUI (actual)',       value: '110 kWh/m²/yr' },
      { label: 'EUI (target)',       value: '100 kWh/m²/yr' },
      { label: 'Total consumption',  value: '990 MWh' },
      { label: 'Gross floor area',   value: '9,000 m²' },
    ],
    quality: [
      { label: 'Data Readiness',  pct: 98, status: 'success' as const },
      { label: 'Data Coverage',   pct: 95, status: 'success' as const },
      { label: 'Data Reliability',pct: 92, status: 'success' as const },
    ],
    bar: [
      { color: '#d76513', pct: 8 },  { color: '#22C55E', pct: 40 },
      { color: '#ffb246', pct: 18 }, { color: '#ed113a', pct: 12 }, { color: '#2295FF', pct: 22 },
    ],
  },
  {
    id: '6', name: '8 Chifley Sq',    address: 'Sydney · Office',   eui: 138, target: 125,
    metrics: [
      { label: 'EUI (actual)',       value: '138 kWh/m²/yr' },
      { label: 'EUI (target)',       value: '125 kWh/m²/yr' },
      { label: 'Total consumption',  value: '1,518 MWh' },
      { label: 'Gross floor area',   value: '11,000 m²' },
    ],
    quality: [
      { label: 'Data Readiness',  pct: 82, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Coverage',   pct: 78, status: 'warning' as const, onImprove: () => {} },
      { label: 'Data Reliability',pct: 85, status: 'success' as const },
    ],
    bar: [
      { color: '#d76513', pct: 14 }, { color: '#22C55E', pct: 28 },
      { color: '#ffb246', pct: 22 }, { color: '#ed113a', pct: 18 }, { color: '#2295FF', pct: 18 },
    ],
  },
]

const MAX_EUI = 220

function ChartDrilldownDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const asset = ASSETS.find(a => a.id === selectedId) ?? null

  function handleBarClick(id: string) {
    setSelectedId(prev => prev === id ? null : id)
  }

  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <div className="flex items-baseline gap-2">
          <span className="text-[14px] font-semibold text-[#111827] dark:text-white">Energy use intensity</span>
          <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">kWh/m²/yr</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#505867] dark:text-[#9CA3AF]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#1258F8]" />Energy use intensity
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#9CA3AF]" />Missing
          </div>
        </div>
      </div>

      {/* Body: asset card + chart */}
      <div className="flex gap-0 p-4 min-h-[280px]">

        {/* Asset detail panel — slides in when a bar is selected */}
        <div
          className={[
            'shrink-0 overflow-hidden transition-all duration-300 ease-in-out',
            asset ? 'w-[240px] mr-4 opacity-100' : 'w-0 opacity-0',
          ].join(' ')}
        >
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

        {/* Chart area */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Y-axis labels + bars */}
          <div className="flex gap-2 h-44">
            {/* Y axis */}
            <div className="flex flex-col justify-between pb-5 text-[10px] text-[#9CA3AF] text-right w-8 shrink-0">
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Grid + bars */}
            <div className="flex-1 relative">
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-t border-dashed border-[#EDEEF1] dark:border-[#1F2430]"
                  style={{ bottom: `${f * 100}%` }}
                />
              ))}

              {/* Bars */}
              <div className="absolute inset-0 flex items-end gap-1 pb-5">
                {ASSETS.map((a) => {
                  const isSelected = selectedId === a.id
                  const isDimmed   = selectedId !== null && !isSelected
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleBarClick(a.id)}
                      aria-pressed={isSelected}
                      aria-label={`${a.name}: ${a.eui} kWh/m²/yr`}
                      className={[
                        'flex-1 rounded-t-sm transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1258F8]',
                        isSelected ? 'bg-[#FF455F]' : 'bg-[#1258F8]',
                        isDimmed    ? 'opacity-30' : 'opacity-100 hover:opacity-80',
                      ].join(' ')}
                      style={{ height: `${(a.eui / MAX_EUI) * 100}%` }}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* X axis labels */}
          <div className="flex gap-1 pl-10 mt-1">
            {ASSETS.map((a) => (
              <div key={a.id} className="flex-1 text-center">
                <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF] leading-tight block truncate px-0.5">
                  {a.name.replace(' St', '').replace(' Sq', '').replace(' Pl', '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="px-4 pb-3">
        <p className="text-[11px] text-[#9CA3AF] dark:text-[#505867]">
          {selectedId
            ? 'Click the same bar again or use × to deselect.'
            : '↑ Click any bar to see that asset\'s detail card.'}
        </p>
      </div>
    </div>
  )
}

// ── Rules ─────────────────────────────────────────────────────────────────────

const rules = [
  {
    num: '1',
    title: 'Use ESG aspect colors for ESG data',
    body: 'When charting ESG categories, always use their designated spectrum colors. Never use generic chart colors for Energy, GHG, Water, etc.',
  },
  {
    num: '2',
    title: 'Label axes clearly',
    body: 'Always include axis labels with units (MWh, tCO₂e, kL). Use sentence case. Font size minimum 12px. Color: Grey 600.',
  },
  {
    num: '3',
    title: 'Show empty states for charts',
    body: 'Never show an empty axis. Use the empty-state pattern with an icon, title, and description when no data is available.',
  },
  {
    num: '4',
    title: 'Limit series per chart',
    body: 'Maximum 5 data series per chart to avoid visual clutter. If more are needed, use a table or allow toggling series visibility.',
  },
  {
    num: '5',
    title: 'No 3D effects or decorative fills',
    body: 'Use flat, minimal chart styles. No gradients, drop shadows, or 3D effects on chart elements. Area fills use 8% opacity of the line color.',
  },
  {
    num: '6',
    title: 'Accessible chart colors',
    body: 'All chart series must maintain 3:1 contrast against the chart background. Include both color and shape/pattern differentiation for accessibility.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DataVisualizationPage() {
  return (
    <div className="flex flex-col gap-10 pb-16">
      <PageHeader
        title="Data visualization"
        description="Chart color usage, axis labels, interaction patterns, and rules for displaying ESG data."
        badge="Patterns"
      />

      {/* ── Chart drill-down interaction ─────────────────────────────────────── */}
      <section>
        <h2 className="text-[24px] font-semibold text-[#111827] dark:text-white mb-2 leading-[1.4]">
          Chart drill-down
        </h2>
        <p className="text-[16px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45] mb-6">
          Clicking a bar or data point reveals an inline asset detail card. The card appears to the
          left and the chart reflows to fill the remaining space. Clicking again (or pressing ×)
          dismisses the card and restores the full-width chart.
        </p>

        {/* Live demo */}
        <ChartDrilldownDemo />

        {/* Behaviour notes */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: '1',
              title: 'Default state',
              body: 'Full-width data viz card. Small summary chart on the left, main chart fills the remaining space.',
            },
            {
              step: '2',
              title: 'Bar clicked',
              body: 'Asset detail card (240 px) slides in from the left. The selected bar turns blue. Non-selected bars dim to 30% opacity.',
            },
            {
              step: '3',
              title: 'Card dismissed',
              body: 'User clicks × on the card or re-clicks the same bar. Card slides out, chart returns to full width.',
            },
          ].map(({ step, title, body }) => (
            <div key={step} className="flex gap-3 p-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]">
              <span className="w-6 h-6 rounded-full bg-[#1258F8] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {step}
              </span>
              <div>
                <p className="text-[14px] font-semibold text-[#111827] dark:text-white mb-1">{title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* When to use */}
        <div className="mt-6 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
          <div className="px-4 py-3 bg-[#F7F8F8] dark:bg-[#1F2430] rounded-t-lg">
            <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wide">When to use</p>
          </div>
          {[
            'Charts where each bar or point represents a distinct entity (asset, building, portfolio).',
            'When users need to compare a specific entity\'s metrics against the group without leaving the page.',
            'ESG drilldowns: energy intensity by asset, indicator scores by asset, data readiness by asset.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1258F8] mt-[6px] shrink-0" />
              <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Color palette ────────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-[24px] font-semibold text-[#111827] dark:text-white mb-4 leading-[1.4]">
          Chart color palette
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#EDEEF1] dark:border-[#1F2430]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F8] dark:bg-[#1F2430] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                {['Series', 'ESG aspect', 'Token', 'Hex', 'Swatch'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
              {chartColors.map((c, i) => (
                <tr key={c.name} className="hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors">
                  <td className="px-4 py-3 text-[#505867] dark:text-[#9CA3AF] text-xs font-mono">Series {i + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#111827] dark:text-white">{c.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#1258F8] dark:text-[#2295FF]">{c.token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#505867] dark:text-[#9CA3AF]">{c.hex}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block w-6 h-6 rounded ${c.bg}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Chart examples ───────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-[24px] font-semibold text-[#111827] dark:text-white mb-4 leading-[1.4]">
          Chart examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <MiniBarChart />
          <DonutChart />
        </div>
        <MiniLineChart />
      </section>

      {/* ── Empty state for charts ───────────────────────────────────────────── */}
      <section>
        <h2 className="text-[24px] font-semibold text-[#111827] dark:text-white mb-4 leading-[1.4]">
          Empty state for charts
        </h2>
        <div className="rounded-xl border border-dashed border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#111827] p-12 flex flex-col items-center justify-center text-center">
          <svg className="w-12 h-12 text-[#D7DAE0] dark:text-[#374151] mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
          <p className="font-semibold text-[#111827] dark:text-white mb-1">No data available</p>
          <p className="text-sm text-[#505867] dark:text-[#9CA3AF] max-w-xs">There is no energy data for the selected period. Try adjusting the date range or check your data sources.</p>
          <button className="mt-4 px-4 py-2 rounded text-sm font-semibold text-[#1258F8] bg-[#EEF6FF] hover:bg-[#DBEAFE] dark:bg-[#1258F8]/10 dark:hover:bg-[#1258F8]/20 transition-colors">
            Change date range
          </button>
        </div>
      </section>

      {/* ── Rules ────────────────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-[24px] font-semibold text-[#111827] dark:text-white mb-4 leading-[1.4]">
          Rules
        </h2>
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
          {rules.map((r) => (
            <div key={r.num} className="flex gap-4 p-5">
              <span className="text-[#1258F8] dark:text-[#2295FF] font-bold text-sm shrink-0 w-5">{r.num}.</span>
              <div>
                <p className="font-semibold text-sm text-[#111827] dark:text-white mb-0.5">{r.title}</p>
                <p className="text-sm text-[#505867] dark:text-[#9CA3AF]">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
