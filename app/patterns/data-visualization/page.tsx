'use client'

import PageHeader from '@/components/ui/PageHeader'

const chartColors = [
  { name: 'Energy', token: '--energy-500', hex: '#FF455F', bg: 'bg-energy-500', label: 'Series 1' },
  { name: 'GHG', token: '--ghg-300', hex: '#FFB246', bg: 'bg-ghg-400', label: 'Series 2' },
  { name: 'Water', token: '--water-400', hex: '#1FD7EE', bg: 'bg-water-400', label: 'Series 3' },
  { name: 'Waste', token: '--waste-400', hex: '#65A289', bg: 'bg-waste-400', label: 'Series 4' },
  { name: 'Certifications', token: '--certifications-500', hex: '#4E81E3', bg: 'bg-certifications-500', label: 'Series 5' },
  { name: 'Engagement', token: '--engagement-400', hex: '#F4A043', bg: 'bg-engagement-400', label: 'Series 6' },
  { name: 'ESG Risk', token: '--esg-risk-500', hex: '#0DBC82', bg: 'bg-esg-risk-500', label: 'Series 7' },
]

const barData = [
  { label: 'Q1', energy: 72, water: 55, ghg: 38 },
  { label: 'Q2', energy: 65, water: 60, ghg: 42 },
  { label: 'Q3', energy: 80, water: 48, ghg: 35 },
  { label: 'Q4', energy: 58, water: 71, ghg: 30 },
]

const lineData = [18, 32, 27, 45, 38, 52, 60, 55, 68, 74, 66, 80]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function MiniBarChart() {
  const maxVal = 100
  const barColors = ['bg-energy-500', 'bg-water-400', 'bg-ghg-400']
  const labels = ['Energy', 'Water', 'GHG']

  return (
    <div className="p-6 rounded-xl border border-token bg-token-primary">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-token-primary">Quarterly ESG performance</p>
        <div className="flex items-center gap-3">
          {labels.map((l, i) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${barColors[i]}`} />
              <span className="text-xs text-token-muted">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-4 h-40">
        {barData.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end gap-0.5 h-32">
              <div
                className="flex-1 bg-energy-500 rounded-t transition-all"
                style={{ height: `${(d.energy / maxVal) * 100}%` }}
              />
              <div
                className="flex-1 bg-water-400 rounded-t transition-all"
                style={{ height: `${(d.water / maxVal) * 100}%` }}
              />
              <div
                className="flex-1 bg-ghg-400 rounded-t transition-all"
                style={{ height: `${(d.ghg / maxVal) * 100}%` }}
              />
            </div>
            <span className="text-xs text-token-muted">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniLineChart() {
  const max = Math.max(...lineData)
  const min = Math.min(...lineData)
  const range = max - min
  const w = 400
  const h = 100
  const pad = 8

  const points = lineData.map((v, i) => {
    const x = pad + (i / (lineData.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / range) * (h - pad * 2)
    return `${x},${y}`
  })
  const pathD = `M${points.join(' L')}`

  const areaD = `M${points[0]} L${points.join(' L')} L${w - pad},${h - pad} L${pad},${h - pad} Z`

  return (
    <div className="p-6 rounded-xl border border-token bg-token-primary">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-token-primary">ESG Risk score trend</p>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-esg-risk-500" />
          <span className="text-xs text-token-muted">ESG Risk</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28 overflow-visible">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((f, i) => (
          <line
            key={i}
            x1={pad}
            y1={h - pad - f * (h - pad * 2)}
            x2={w - pad}
            y2={h - pad - f * (h - pad * 2)}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-grey-200 dark:text-grey-700"
            strokeDasharray="4 4"
          />
        ))}
        {/* Area fill */}
        <path d={areaD} fill="#0DBC82" fillOpacity="0.08" />
        {/* Line */}
        <path d={pathD} fill="none" stroke="#0DBC82" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {/* Dots */}
        {lineData.map((v, i) => {
          const x = pad + (i / (lineData.length - 1)) * (w - pad * 2)
          const y = h - pad - ((v - min) / range) * (h - pad * 2)
          return <circle key={i} cx={x} cy={y} r="3" fill="#0DBC82" />
        })}
      </svg>
      {/* X axis labels */}
      <div className="flex justify-between mt-1 px-2">
        {months.map((m) => (
          <span key={m} className="text-xs text-token-muted">{m}</span>
        ))}
      </div>
    </div>
  )
}

function DonutChart() {
  const segments = [
    { label: 'Energy', value: 35, color: '#FF455F' },
    { label: 'Water', value: 20, color: '#1FD7EE' },
    { label: 'GHG', value: 25, color: '#FFB246' },
    { label: 'Waste', value: 12, color: '#65A289' },
    { label: 'Other', value: 8, color: '#4E81E3' },
  ]

  const total = segments.reduce((s, d) => s + d.value, 0)
  let cumulative = 0
  const r = 40
  const cx = 60
  const cy = 60

  const arcs = segments.map((seg) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2
    cumulative += seg.value
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const largeArc = seg.value / total > 0.5 ? 1 : 0
    return {
      ...seg,
      d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`,
    }
  })

  return (
    <div className="p-6 rounded-xl border border-token bg-token-primary">
      <p className="text-sm font-semibold text-token-primary mb-4">ESG category split</p>
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 120 120" className="w-28 h-28 shrink-0">
          {arcs.map((arc, i) => (
            <path key={i} d={arc.d} fill={arc.color} />
          ))}
          <circle cx={cx} cy={cy} r={24} fill="var(--color-bg-primary, white)" className="fill-token-primary" />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="8" className="fill-grey-600 dark:fill-grey-400 font-semibold" fill="currentColor">Total</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1F2430">100%</text>
        </svg>
        <div className="space-y-2 flex-1">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                <span className="text-xs text-token-secondary">{s.label}</span>
              </div>
              <span className="text-xs font-semibold text-token-primary">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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

export default function DataVisualizationPage() {
  return (
    <div>
      <PageHeader
        title="Data visualization"
        description="Chart color usage, axis labels, empty states, and rules for displaying ESG data in charts and graphs."
        badge="Patterns"
      />

      {/* Color palette */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Chart color palette</h2>
      <div className="overflow-x-auto rounded-xl border border-token mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-token-secondary border-b border-token">
              {['Series', 'ESG aspect', 'Token', 'Hex', 'Swatch'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-token bg-token-primary">
            {chartColors.map((c, i) => (
              <tr key={c.name} className="hover:bg-token-secondary transition-colors">
                <td className="px-4 py-3 text-token-muted text-xs font-mono">Series {i + 1}</td>
                <td className="px-4 py-3 font-medium text-token-primary">{c.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-sky-600">{c.token}</td>
                <td className="px-4 py-3 font-mono text-xs text-token-secondary">{c.hex}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block w-6 h-6 rounded ${c.bg}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart examples */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Chart examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <MiniBarChart />
        <DonutChart />
      </div>
      <div className="mb-10">
        <MiniLineChart />
      </div>

      {/* Empty state for chart */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Empty state for charts</h2>
      <div className="rounded-xl border border-token border-dashed bg-token-primary p-12 flex flex-col items-center justify-center text-center mb-10">
        <svg className="w-12 h-12 text-token-muted mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
        <p className="font-semibold text-token-primary mb-1">No data available</p>
        <p className="text-sm text-token-muted max-w-xs">There is no energy data for the selected period. Try adjusting the date range or check your data sources.</p>
        <button className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-950/60 transition-colors">
          Change date range
        </button>
      </div>

      {/* Rules */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Rules</h2>
      <div className="rounded-xl border border-token bg-token-primary divide-y divide-token">
        {rules.map((r) => (
          <div key={r.num} className="flex gap-4 p-5">
            <span className="text-sky-500 font-bold text-sm shrink-0 w-5">{r.num}.</span>
            <div>
              <p className="font-semibold text-sm text-token-primary mb-0.5">{r.title}</p>
              <p className="text-sm text-token-secondary">{r.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
