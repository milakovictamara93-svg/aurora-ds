'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ChartCard, ChartTooltip, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

// ── Line with bullets data (15:6756) ────────────────────────────────────────

const BULLET_LABELS = ['2018', '2020', '2022', '2024', '2026', '2028', '2030', '2032', '2034', '2036', '2038', '2040', '2042', '2044', '2046', '2048', '2050']
const BULLET_BARS = [25, 50, 55, 65, 70, 80, 90, 100, 115, 120, 105, 95, 80, 70, 50, 55, 60]
const BULLET_LINE = [30, 55, 60, 70, 75, 85, 95, 110, 120, 115, 100, 85, 70, 55, 45, 50, 60]

// ── Bubble data (82:6678) ───────────────────────────────────────────────────

const BUBBLES = [
  { x: 15, y: 25, size: 35, label: 'Tower A', eui: 15, lfl: 25, area: 12400 },
  { x: 30, y: 20, size: 25, label: 'HQ West', eui: 30, lfl: 20, area: 8200 },
  { x: 55, y: 15, size: 18, label: 'Park Plaza', eui: 55, lfl: 15, area: 5100 },
  { x: 75, y: -20, size: 28, label: 'South Wing', eui: 75, lfl: -20, area: 9800 },
  { x: 100, y: 65, size: 14, label: 'Annex B', eui: 100, lfl: 65, area: 3200 },
  { x: 115, y: -10, size: 22, label: 'Mill Rd', eui: 115, lfl: -10, area: 7400 },
  { x: 155, y: 55, size: 16, label: 'Pier 8', eui: 155, lfl: 55, area: 4100 },
  { x: 185, y: 25, size: 10, label: 'Unit 5', eui: 185, lfl: 25, area: 2200 },
  { x: 210, y: 65, size: 40, label: 'Central HQ', eui: 210, lfl: 65, area: 18500 },
  { x: 225, y: -15, size: 12, label: 'Depot', eui: 225, lfl: -15, area: 2800 },
  { x: 280, y: 35, size: 22, label: 'Northgate', eui: 280, lfl: 35, area: 7100 },
  { x: 300, y: 30, size: 28, label: 'Eastfield', eui: 300, lfl: 30, area: 9500 },
  { x: 315, y: -5, size: 35, label: 'Warehouse C', eui: 315, lfl: -5, area: 14200 },
  { x: 330, y: 55, size: 14, label: 'Office 12', eui: 330, lfl: 55, area: 3400 },
]

// ── Sankey data ─────────────────────────────────────────────────────────────

const SANKEY_FLOWS = [
  { from: 'Total energy', to: 'Electricity', value: 65, color: '#FF455F' },
  { from: 'Total energy', to: 'Natural gas', value: 25, color: '#FFB246' },
  { from: 'Total energy', to: 'District heating', value: 10, color: '#2F4FC0' },
  { from: 'Electricity', to: 'Scope 2', value: 65, color: '#FF455F' },
  { from: 'Natural gas', to: 'Scope 1', value: 25, color: '#FFB246' },
  { from: 'District heating', to: 'Scope 2', value: 10, color: '#2F4FC0' },
]

export default function OtherChartsPage() {
  const [bulletHover, setBulletHover] = useState<number | null>(null)
  const [bulletSelected, setBulletSelected] = useState<number | null>(null)
  const [bubbleHover, setBubbleHover] = useState<number | null>(null)
  const [sankeyHover, setSankeyHover] = useState<number | null>(null)

  const bulletActive = bulletHover ?? bulletSelected

  return (
    <div>
      <PageHeader title="Other charts" description="Line with bullets, bubble chart, and sankey diagram." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Line with bullets (15:6756) ──────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Line with bullets</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Blue column bars with a connected dot line overlay. Hover shows vertical indicator + enlarged marker + tooltip. Click locks selection.
          </p>

          <ChartCard label="Energy use intensity" suffix="kWh/m²/y">
            <div className="flex" style={{ height: 160 }}>
              <div className="w-8 shrink-0 flex flex-col justify-between pb-5 text-[12px] text-[#505867] text-right pr-2 tracking-[0.18px]">
                <span>150</span><span>100</span><span>50</span><span>0</span>
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 relative">
                  {/* Grid */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                    {[0, 1, 2, 3].map(i => <div key={i} className="h-px bg-[#EDEEF1]" />)}
                  </div>

                  {/* Bars */}
                  <div className="absolute inset-0 flex items-end z-[1]" style={{ gap: 1 }}>
                    {BULLET_BARS.map((v, i) => {
                      const pct = (v / 150) * 100
                      const isActive = bulletActive === i
                      const dimmed = bulletActive !== null && !isActive
                      return (
                        <div
                          key={i}
                          className="flex-1 cursor-pointer"
                          style={{ height: `${pct}%`, opacity: dimmed ? 0.4 : 1, transition: 'opacity 100ms' }}
                          onMouseEnter={() => setBulletHover(i)}
                          onMouseLeave={() => setBulletHover(null)}
                          onClick={() => setBulletSelected(bulletSelected === i ? null : i)}
                        >
                          <div className="w-full h-full rounded-t-[4px]" style={{ backgroundColor: isActive ? '#1258F8' : CHART_COLORS.barDefault }} />
                        </div>
                      )
                    })}
                  </div>

                  {/* Line overlay — starts at center of first bar, ends at center of last */}
                  {(() => {
                    const n = BULLET_LINE.length
                    // Each bar is flex-1 in the container, so bar center = (i + 0.5) / n * 100%
                    const barCenter = (i: number) => ((i + 0.5) / n) * 100
                    return (
                      <svg className="absolute inset-0 w-full z-[2] pointer-events-none" style={{ height: '100%' }} preserveAspectRatio="none" viewBox={`0 0 100 135`}>
                        <polyline
                          points={BULLET_LINE.map((v, i) => `${barCenter(i)},${135 - (v / 150) * 135}`).join(' ')}
                          fill="none" stroke="#1258F8" strokeWidth={2} vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    )
                  })()}

                  {/* Hover vertical dashed line — aligned to bar center */}
                  {bulletActive !== null && (
                    <div className="absolute z-[3] pointer-events-none" style={{ left: `${((bulletActive + 0.5) / BULLET_LINE.length) * 100}%`, top: `${(1 - BULLET_LINE[bulletActive] / 150) * 100}%`, bottom: 0, width: 1, borderLeft: '1px dashed #D7DAE0' }} />
                  )}

                  {/* Dot markers — aligned to bar centers */}
                  {BULLET_LINE.map((v, i) => {
                    const isActive = bulletActive === i
                    const size = isActive ? 12 : 6
                    const n = BULLET_LINE.length
                    return (
                      <div
                        key={`dot-${i}`}
                        className="absolute z-[4] rounded-full pointer-events-none"
                        style={{
                          left: `${((i + 0.5) / n) * 100}%`,
                          top: `${(1 - v / 150) * 100}%`,
                          width: size, height: size,
                          marginLeft: -size / 2, marginTop: -size / 2,
                          backgroundColor: isActive ? '#1258F8' : 'white',
                          border: '2px solid #1258F8',
                          transition: 'width 100ms, height 100ms, margin 100ms',
                        }}
                      />
                    )
                  })}

                  {/* Tooltip */}
                  {bulletSelected !== null && (
                    <div className="absolute z-[5]" style={{ left: `${((bulletSelected + 0.5) / BULLET_LINE.length) * 100}%`, top: Math.max(0, (1 - BULLET_LINE[bulletSelected] / 150) * 100 - 10) + '%', transform: 'translateX(-50%)' }}>
                      <ChartTooltip
                        title={BULLET_LABELS[bulletSelected]}
                        rows={[{ label: 'Energy use intensity', value: `${BULLET_LINE[bulletSelected]} kWh/m²` }]}
                        accentColor="#1258F8"
                      />
                    </div>
                  )}
                </div>

                <div className="h-5 flex justify-between text-[12px] text-[#505867] tracking-[0.18px]">
                  {BULLET_LABELS.map(l => <span key={l}>{l}</span>)}
                </div>
              </div>
            </div>
          </ChartCard>
        </section>

        {/* ── Bubble chart (82:6678) ───────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Bubble chart</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Scatter plot with sized circles. X = Energy use intensity, Y = Like-for-like change. Bubble size = asset area. Hover highlights one, fades rest.
          </p>

          <ChartCard label="Asset comparison" suffix="Energy vs LFL change">
            <div className="relative" style={{ height: 280 }}>
              {/* Y axis */}
              <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[12px] text-[#505867] text-right pr-2">
                <span>200</span><span>100</span><span>0</span><span>-100</span>
              </div>

              {/* Chart area */}
              <div className="absolute left-12 right-0 top-0 bottom-6">
                {/* Grid */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3].map(i => <div key={i} className="h-px bg-[#EDEEF1]" />)}
                </div>

                {/* Zero line */}
                <div className="absolute left-0 right-0 h-px bg-[#9CA3AF]" style={{ top: `${(200 / 300) * 100}%` }} />

                {/* Bubbles */}
                {BUBBLES.map((b, i) => {
                  const isActive = bubbleHover === i
                  const dimmed = bubbleHover !== null && !isActive
                  const left = (b.x / 350) * 100
                  const top = ((200 - b.y) / 300) * 100
                  return (
                    <div
                      key={i}
                      className="absolute rounded-full cursor-pointer"
                      style={{
                        left: `${left}%`, top: `${top}%`,
                        width: b.size, height: b.size,
                        marginLeft: -b.size / 2, marginTop: -b.size / 2,
                        backgroundColor: CHART_COLORS.energy,
                        opacity: dimmed ? 0.2 : isActive ? 0.9 : 0.6,
                        transition: 'opacity 150ms ease-out',
                      }}
                      onMouseEnter={() => setBubbleHover(i)}
                      onMouseLeave={() => setBubbleHover(null)}
                    />
                  )
                })}

                {/* Tooltip on hover */}
                {bubbleHover !== null && (() => {
                  const b = BUBBLES[bubbleHover]
                  const left = (b.x / 350) * 100
                  const top = ((200 - b.y) / 300) * 100
                  return (
                    <div className="absolute z-10" style={{ left: `${left}%`, top: `${top - 5}%`, transform: 'translate(-50%, -100%)' }}>
                      <ChartTooltip
                        title={b.label}
                        rows={[
                          { label: 'Energy intensity', value: `${b.eui} kWh/m²/y` },
                          { label: 'LFL change', value: `${b.lfl > 0 ? '+' : ''}${b.lfl}%` },
                          { label: 'Area', value: `${b.area.toLocaleString()} m²` },
                        ]}
                        accentColor={CHART_COLORS.energy}
                      />
                    </div>
                  )
                })()}
              </div>

              {/* X axis */}
              <div className="absolute left-12 right-0 bottom-0 flex justify-between text-[12px] text-[#505867]">
                {['0', '50', '100', '150', '200', '250', '300', '350'].map(l => <span key={l}>{l}</span>)}
              </div>

              <div className="absolute left-0 top-0 text-[10px] text-[#9CA3AF]">Like-for-like change</div>
              <div className="absolute right-0 bottom-0 text-[10px] text-[#9CA3AF]">Energy use intensity kWh/m2/y</div>
            </div>
          </ChartCard>
        </section>

        {/* ── Sankey diagram (3:2579) ──────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Sankey diagram</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Flow diagram showing how total energy breaks down into sources, then into emission scopes. Band width proportional to value. Hover highlights a flow.
          </p>

          <ChartCard label="Energy flow" suffix="MWh → tCO₂e">
            {(() => {
              const sources = [
                { label: 'Electricity',      value: 65, color: '#FF455F' },
                { label: 'Natural gas',      value: 25, color: '#FFB246' },
                { label: 'District heating', value: 10, color: '#2F4FC0' },
              ]
              const scopes = [
                { label: 'Scope 1', value: 25, color: '#C80831' },
                { label: 'Scope 2', value: 75, color: '#8B5CF6' },
              ]
              const total = 100
              const h = 180
              const gap = 4
              const blockW = 80
              const colL = 0         // Total block
              const colM = 240       // Source blocks
              const colR = 480       // Scope blocks
              const svgW = colR + blockW

              let srcY = 0
              const srcBands = sources.map(s => {
                const bandH = (s.value / total) * (h - gap * (sources.length - 1))
                const y = srcY
                srcY += bandH + gap
                return { ...s, y, h: bandH }
              })

              let scopeY = 0
              const scopeTotal = scopes.reduce((s, sc) => s + sc.value, 0)
              const scopeBands = scopes.map(s => {
                const bandH = (s.value / scopeTotal) * (h - gap * (scopes.length - 1))
                const y = scopeY
                scopeY += bandH + gap
                return { ...s, y, h: bandH }
              })

              return (
                <div className="relative" style={{ height: h + 30 }}>
                  <div className="flex justify-between text-[12px] font-semibold text-[#111827] dark:text-white mb-2 px-1">
                    <span>Total energy</span>
                    <span>Source</span>
                    <span>Scope</span>
                  </div>

                  <svg viewBox={`0 0 ${svgW} ${h}`} width="100%" height={h} preserveAspectRatio="xMidYMid meet">
                    <defs>
                      {sources.map((src, i) => (
                        <linearGradient key={`g${i}`} id={`sg${i}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={src.color} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={src.color} stopOpacity="0.1" />
                        </linearGradient>
                      ))}
                      {sources.map((src, i) => (
                        <linearGradient key={`g2${i}`} id={`sg2${i}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={src.color} stopOpacity="0.1" />
                          <stop offset="100%" stopColor={src.color} stopOpacity="0.4" />
                        </linearGradient>
                      ))}
                    </defs>

                    {/* Total block — full color */}
                    <rect x={colL} y={0} width={blockW} height={h} rx="4" fill="#FF455F" />
                    <text x={colL + blockW / 2} y={h / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="white">100 MWh</text>

                    {/* Flows total → source (gradient connectors) */}
                    {srcBands.map((src, i) => {
                      const dimmed = sankeyHover !== null && sankeyHover !== i
                      const x1 = colL + blockW
                      const x2 = colM
                      const cpx = (x1 + x2) / 2
                      return (
                        <path
                          key={`f1-${i}`}
                          d={`M${x1},${src.y} C${cpx},${src.y} ${cpx},${src.y} ${x2},${src.y} L${x2},${src.y + src.h} C${cpx},${src.y + src.h} ${cpx},${src.y + src.h} ${x1},${src.y + src.h} Z`}
                          fill={`url(#sg${i})`}
                          opacity={dimmed ? 0.2 : 1}
                          style={{ transition: 'opacity 150ms ease-out' }}
                          className="cursor-pointer"
                          onMouseEnter={() => setSankeyHover(i)}
                          onMouseLeave={() => setSankeyHover(null)}
                        />
                      )
                    })}

                    {/* Source blocks — full color */}
                    {srcBands.map((src, i) => {
                      const dimmed = sankeyHover !== null && sankeyHover !== i
                      return (
                        <g key={`sb-${i}`} className="cursor-pointer" onMouseEnter={() => setSankeyHover(i)} onMouseLeave={() => setSankeyHover(null)}>
                          <rect x={colM} y={src.y} width={blockW} height={src.h} rx="4" fill={src.color} opacity={dimmed ? 0.3 : 1} style={{ transition: 'opacity 150ms ease-out' }} />
                          <text x={colM + blockW / 2} y={src.y + src.h / 2 + 1} textAnchor="middle" fontSize="11" fill="white" fontWeight="500">{src.label}</text>
                          <text x={colM + blockW / 2} y={src.y + src.h / 2 + 13} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.7)">{src.value} MWh</text>
                        </g>
                      )
                    })}

                    {/* Flows source → scope (gradient connectors) */}
                    {srcBands.map((src, i) => {
                      const dimmed = sankeyHover !== null && sankeyHover !== i
                      const targetIdx = src.label === 'Natural gas' ? 0 : 1
                      const tgt = scopeBands[targetIdx]
                      const x1 = colM + blockW
                      const x2 = colR
                      const cpx = (x1 + x2) / 2
                      const tgtY = tgt.y + (targetIdx === 1 && i > 0 ? srcBands.filter((_, j) => j < i && sources[j].label !== 'Natural gas').reduce((s, b) => s + b.h + gap, 0) : 0)
                      return (
                        <path
                          key={`f2-${i}`}
                          d={`M${x1},${src.y} C${cpx},${src.y} ${cpx},${tgtY} ${x2},${tgtY} L${x2},${tgtY + src.h} C${cpx},${tgtY + src.h} ${cpx},${src.y + src.h} ${x1},${src.y + src.h} Z`}
                          fill={`url(#sg2${i})`}
                          opacity={dimmed ? 0.2 : 1}
                          style={{ transition: 'opacity 150ms ease-out' }}
                        />
                      )
                    })}

                    {/* Scope blocks — full color */}
                    {scopeBands.map((sc, i) => (
                      <g key={`scb-${i}`}>
                        <rect x={colR} y={sc.y} width={blockW} height={sc.h} rx="4" fill={sc.color} />
                        <text x={colR + blockW / 2} y={sc.y + sc.h / 2 + 4} textAnchor="middle" fontSize="11" fill="white" fontWeight="500">{sc.label}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              )
            })()}
          </ChartCard>
        </section>

        {/* Empty */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Empty state</h2>
          <ChartCard label="Chart" suffix="">
            <ChartEmptyState />
          </ChartCard>
        </section>

      </div>
    </div>
  )
}
