'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ColumnChart, ScoreChart, ChartCard, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

// ── Data ──────────────────────────────────────────────────────────────────────

const MONTHLY = [8, 12, 15, 22, 28, 35, 42, 50, 58, 65, 72, 78, 82, 88, 92, 98, 102, 108, 112, 115, 118, 120, 125, 128, 130, 135, 138, 140, 142, 145, 148, 150, 148, 145, 140, 135]
// Score data: sorted descending, missing ones at full height (100)
const SCORES = [100, 98, 95, 92, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 8, 5, 100, 100, 100, 100, 100, 100]
const YEARS = ['2020', '2021', '2022', '2023', '2024', '2025']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// MoM grouped data: 3 bars per month [2023, 2024, 2025]
const MOM_GROUPS: [number, number, number][] = [
  [125, 118, 130], [128, 122, 125], [115, 110, 120], [108, 105, 112],
  [100, 98, 105],  [95, 92, 98],    [92, 88, 95],    [98, 95, 100],
  [110, 105, 115], [130, 125, 140], [122, 118, 128], [118, 115, 122],
]

export default function ColumnChartPage() {
  const [scoreSelected, setScoreSelected] = useState<number | null>(null)
  const [momHover, setMomHover] = useState<number | null>(null)

  return (
    <div>
      <PageHeader title="Column chart" description="All vertical bar chart variants — standard columns, score chart, asset distribution, and month-over-month." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Standard columns (1:740) ─────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Columns — big</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Standard monthly consumption bars. Single series in the aspect color. Missing data in grey. Warning icon + line on top. Click to select (stays red while hovering).
          </p>

          <div className="flex flex-col gap-4">
            {/* Slot layout: small + big */}
            <div className="flex gap-4">
              <ChartCard label="Annual" suffix="kWh/m²/y" className="w-[260px] shrink-0">
                <div style={{ height: 140 }}>
                  <div className="flex h-full">
                    <div className="w-6 shrink-0 flex flex-col justify-between pb-5 text-[10px] text-[#505867] text-right pr-1">
                      <span>150</span><span>100</span><span>50</span><span>0</span>
                    </div>
                    <div className="flex-1 flex items-end gap-px">
                      {[85, 100, 95, 130, 145, 80].map((v, i) => (
                        <div key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${(v / 150) * 100}%`, backgroundColor: CHART_COLORS.energy }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex ml-7 mt-1">
                    {["'20", "'21", "'22", "'23", "'24", "'25"].map(l => (
                      <div key={l} className="flex-1 text-center text-[10px] text-[#505867]">{l}</div>
                    ))}
                  </div>
                </div>
              </ChartCard>
              <div className="w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0" />
              <ChartCard label="Asset distribution" suffix="2025" className="flex-1" legend={[{ label: 'Energy use intensity', color: CHART_COLORS.barSelected }, { label: 'Missing', color: CHART_COLORS.barDisabled }, { label: 'Warnings', color: CHART_COLORS.warning }]}>
                <ColumnChart data={MONTHLY} showWarning warningIndex={22} missingFrom={30} labels={YEARS} />
              </ChartCard>
            </div>

            {/* Single — energy */}
            <ChartCard label="Energy use intensity" suffix="kWh/m²/y" legend={[{ label: 'Energy use intensity', color: CHART_COLORS.barSelected }, { label: 'Missing', color: CHART_COLORS.barDisabled }]}>
              <ColumnChart data={MONTHLY} missingFrom={30} labels={YEARS} />
            </ChartCard>

            {/* GHG variant */}
            <ChartCard label="GHG emissions" suffix="tCO₂e" legend={[{ label: 'GHG emissions', color: CHART_COLORS.ghg }, { label: 'Missing', color: CHART_COLORS.barDisabled }]}>
              <ColumnChart data={MONTHLY.map(v => v * 0.7)} color={CHART_COLORS.ghg} missingFrom={30} labels={YEARS} />
            </ChartCard>
          </div>
        </section>

        {/* ── Score chart (36:6070) ─────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Score chart</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Bars sorted highest→lowest. Default shows coral gradient fading right. Missing assets show as full-height grey bars (always to the top). Click to select.
          </p>

          <ChartCard label="Portfolio scores" suffix="GRESB 2024">
            <ScoreChart data={SCORES} missingFrom={28} selectedIndex={scoreSelected} onSelect={setScoreSelected} />
          </ChartCard>
        </section>

        {/* ── Asset distribution (170:30699) ────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Asset distribution</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Columns with a line overlay showing the trend across assets.
          </p>

          <ChartCard label="Asset distribution" suffix="2025" legend={[{ label: 'Energy use intensity', color: CHART_COLORS.barSelected }, { label: 'Missing', color: CHART_COLORS.barDisabled }]}>
            <ColumnChart data={MONTHLY} missingFrom={30} labels={YEARS} />
          </ChartCard>
        </section>

        {/* ── Columns MoM (254:19247) — grouped bars ───────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Columns — month over month</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Grouped columns per month comparing multiple years. Each month shows 3 bars side by side.
          </p>

          <ChartCard label="MoM comparison" suffix="kWh/m²" legend={[{ label: '2023', color: '#FFCACF' }, { label: '2024', color: '#2295FF' }, { label: '2025', color: '#1258F8' }]}>
            {(() => {
              const barH = 120 // px height for tallest bar
              const maxVal = 150
              const colors = ['#FFCACF', '#2295FF', '#1258F8']
              return (
                <div>
                  {/* Y axis + bars */}
                  <div className="flex gap-1">
                    {/* Y axis */}
                    <div className="w-8 shrink-0 flex flex-col justify-between text-[12px] text-[#505867] text-right pr-2" style={{ height: barH }}>
                      <span>1.5</span><span>1</span><span>0.5</span><span>0</span>
                    </div>
                    {/* Bar groups */}
                    <div className="flex-1 flex items-end gap-2">
                      {MOM_GROUPS.map((group, gi) => {
                        const dimmed = momHover !== null && momHover !== gi
                        return (
                          <div
                            key={gi}
                            className="flex-1 flex items-end justify-center gap-px cursor-pointer"
                            style={{ height: barH, opacity: dimmed ? 0.3 : 1, transition: 'opacity 100ms' }}
                            onMouseEnter={() => setMomHover(gi)}
                            onMouseLeave={() => setMomHover(null)}
                          >
                            {group.map((val, bi) => (
                              <div
                                key={bi}
                                className="rounded-t-[2px]"
                                style={{
                                  width: 10,
                                  height: Math.round((val / maxVal) * barH),
                                  backgroundColor: colors[bi],
                                }}
                              />
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* X labels */}
                  <div className="flex ml-9 mt-1">
                    {MONTHS.map(m => (
                      <div key={m} className="flex-1 text-center text-[12px] text-[#505867]">{m}</div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </ChartCard>
        </section>

        {/* ── Empty state (single, at the end) ────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Empty state</h2>
          <ChartCard label="Energy use intensity" suffix="kWh/m²/y">
            <ChartEmptyState />
          </ChartCard>
        </section>

      </div>
    </div>
  )
}
