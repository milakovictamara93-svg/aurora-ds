'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ColumnChart, ScoreChart, ChartCard, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

// ── Data ──────────────────────────────────────────────────────────────────────

const MONTHLY = [8, 12, 15, 22, 28, 35, 42, 50, 58, 65, 72, 78, 82, 88, 92, 98, 102, 108, 112, 115, 118, 120, 125, 128, 130, 135, 138, 140, 142, 145, 148, 150, 148, 145, 140, 135]
const SCORES = [100, 98, 95, 92, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 8, 5, 100, 100, 100, 100, 100, 100]
const YEARS = ['2020', '2021', '2022', '2023', '2024', '2025']

export default function ColumnChartPage() {
  const [scoreSelected, setScoreSelected] = useState<number | null>(null)

  return (
    <div>
      <PageHeader title="Column chart" description="All vertical bar chart variants — standard columns, score chart, asset distribution, and month-over-month comparison." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        {/* ── Standard columns (1:740) ─────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Columns — big</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Standard monthly consumption bars. Single series in the aspect color. Missing data in grey. Warning icon + line on top. Click to select a bar (stays red while hovering others).
          </p>

          <div className="flex flex-col gap-4">
            {/* Slot layout: small + big */}
            <div className="flex gap-4">
              <ChartCard label="Annual" suffix="kWh/m²/y" className="w-[260px] shrink-0">
                <ColumnChart data={MONTHLY.filter((_, i) => i % 6 === 0)} labels={YEARS} />
              </ChartCard>
              <div className="w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0" />
              <ChartCard label="Asset distribution" suffix="2025" className="flex-1" legend={[{ label: 'Energy use intensity', color: CHART_COLORS.barSelected }, { label: 'Missing', color: CHART_COLORS.barDisabled }, { label: 'Warnings', color: CHART_COLORS.warning }]}>
                <ColumnChart data={MONTHLY} showWarning warningIndex={22} missingFrom={30} labels={YEARS} />
              </ChartCard>
            </div>

            {/* Single series — full width */}
            <ChartCard label="Energy use intensity" suffix="kWh/m²/y" legend={[{ label: 'Energy use intensity', color: CHART_COLORS.barSelected }, { label: 'Missing', color: CHART_COLORS.barDisabled }]}>
              <ColumnChart data={MONTHLY} missingFrom={30} labels={YEARS} />
            </ChartCard>

            {/* GHG variant */}
            <ChartCard label="GHG emissions" suffix="tCO₂e" legend={[{ label: 'GHG emissions', color: CHART_COLORS.ghg }, { label: 'Missing', color: CHART_COLORS.barDisabled }]}>
              <ColumnChart data={MONTHLY.map(v => v * 0.7)} color={CHART_COLORS.ghg} missingFrom={30} labels={YEARS} />
            </ChartCard>

            {/* Empty */}
            <ChartCard label="Energy use intensity" suffix="kWh/m²/y">
              <ChartEmptyState />
            </ChartCard>
          </div>
        </section>

        {/* ── Score chart (36:6070) ─────────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Score chart</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Bars sorted highest→lowest. Default state shows a coral gradient fading right. On hover/select, the active bar stays coral while others turn light blue. Click to lock selection.
          </p>

          <div className="flex flex-col gap-4">
            <ChartCard label="Portfolio scores" suffix="GRESB 2024">
              <ScoreChart data={SCORES} missingFrom={28} selectedIndex={scoreSelected} onSelect={setScoreSelected} />
            </ChartCard>

            <ChartCard label="Portfolio scores" suffix="— empty">
              <ChartEmptyState />
            </ChartCard>
          </div>
        </section>

        {/* ── Asset distribution (170:30699) ────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Asset distribution</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Columns with a line overlay showing the trend. Bars represent individual asset values, the line shows the rolling average or benchmark.
          </p>

          <ChartCard label="Asset distribution" suffix="2025" legend={[{ label: 'Energy use intensity', color: CHART_COLORS.barSelected }, { label: 'Missing', color: CHART_COLORS.barDisabled }]}>
            <ColumnChart data={[...MONTHLY.slice(0, 30), ...Array(6).fill(0).map(() => Math.round(Math.random() * 150))]} missingFrom={30} labels={YEARS} />
          </ChartCard>
        </section>

        {/* ── Columns MoM (254:19247) ──────────────────────────────────── */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Columns — month over month</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Grouped columns per month comparing current year to previous years. Each month shows 2–3 bars side by side.
          </p>

          <ChartCard label="MoM comparison" suffix="kWh/m²" legend={[{ label: 'Current year', color: CHART_COLORS.barSelected }, { label: 'Previous year', color: CHART_COLORS.comparison }, { label: 'Missing', color: CHART_COLORS.barDisabled }]}>
            <ColumnChart
              data={[
                120, 115, 105,  125, 118, 110,  130, 122, 115,  118, 112, 108,
                105, 100, 95,   98, 92, 88,     95, 90, 85,     100, 95, 90,
                110, 105, 100,  135, 128, 120,   125, 118, 112,  120, 115, 108,
              ]}
              labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            />
          </ChartCard>

          <div className="mt-4">
            <ChartCard label="MoM comparison" suffix="— empty">
              <ChartEmptyState />
            </ChartCard>
          </div>
        </section>

      </div>
    </div>
  )
}
