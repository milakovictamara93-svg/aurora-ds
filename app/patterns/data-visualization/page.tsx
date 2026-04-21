'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import PageHeader from '@/app/components-lib/ui/PageHeader'

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

const BAR_SERIES = [
  { key: 'energy' as const, label: 'Energy', color: '#FF455F' },
  { key: 'water'  as const, label: 'Water',  color: '#1FD7EE' },
  { key: 'ghg'    as const, label: 'GHG',    color: '#FFB246' },
]

function MiniBarChart() {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number; color: string } | null>(null)

  return (
    <div className="p-6 rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[#111827] dark:text-white">Quarterly ESG performance</p>
        <div className="flex items-center gap-3">
          {BAR_SERIES.map(s => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
              <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex items-end gap-4 h-40">
        {barData.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end gap-0.5 h-32">
              {BAR_SERIES.map(s => (
                <div
                  key={s.key}
                  className="flex-1 rounded-t transition-opacity duration-100 cursor-default"
                  style={{ height: `${d[s.key]}%`, background: s.color }}
                  onMouseEnter={e => {
                    const r = (e.target as HTMLElement).getBoundingClientRect()
                    setTooltip({ x: r.left + r.width / 2, y: r.top - 6, label: `${d.label} · ${s.label}`, value: d[s.key], color: s.color })
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </div>
            <span className="text-xs text-[#505867] dark:text-[#9CA3AF]">{d.label}</span>
          </div>
        ))}
        {tooltip && typeof document !== 'undefined' && createPortal(
          <div
            style={{ position: 'fixed', top: tooltip.y - 36, left: tooltip.x, transform: 'translateX(-50%)', zIndex: 9999, pointerEvents: 'none' }}
            className="bg-[#111827] text-white text-[11px] rounded px-2 py-1 whitespace-nowrap shadow-md flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: tooltip.color }} />
            {tooltip.label}: <strong>{tooltip.value}</strong>
          </div>,
          document.body,
        )}
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
        description="Chart color usage, axis labels, and rules for displaying ESG data correctly."
        badge="Patterns"
      />

      {/* ── Color palette ────────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-4 leading-[1.4]">
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
        <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-4 leading-[1.4]">
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
        <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-4 leading-[1.4]">
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
        <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-4 leading-[1.4]">
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
