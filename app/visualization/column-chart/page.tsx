'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ColumnChart, ChartCard, ChartEmptyState, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

const DATA = [8, 12, 15, 22, 28, 35, 42, 50, 58, 65, 72, 78, 82, 88, 92, 98, 102, 108, 112, 115, 118, 120, 125, 128, 130, 135, 138, 140, 142, 145, 148, 150, 148, 145, 140, 135]

export default function ColumnChartPage() {
  return (
    <div>
      <PageHeader title="Column chart" description="Vertical bar chart for monthly consumption data with hover, active, and warning states." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Chart slot — small + big</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Charts always live inside a card slot. Small card on the left for sparkline/summary, big card on the right for the full chart. Cards have a header (label + suffix + info icon) and a right-aligned legend.
          </p>
          <div className="flex gap-4">
            <ChartCard label="Annual" suffix="kWh/m²/y" className="w-[260px] shrink-0">
              <div className="h-[160px] flex items-center justify-center text-[12px] text-[#9CA3AF]">
                Small chart slot
              </div>
            </ChartCard>
            <div className="w-px bg-[#EDEEF1] dark:bg-[#1F2430] shrink-0" />
            <ChartCard
              label="Asset distribution"
              suffix="2025"
              legend={[
                { label: 'Energy use intensity', color: CHART_COLORS.barSelected },
                { label: 'Missing', color: CHART_COLORS.barDisabled },
                { label: 'Warnings', color: CHART_COLORS.warning },
              ]}
              className="flex-1"
            >
              <ColumnChart data={DATA} showWarning warningIndex={22} missingFrom={30} labels={['2020', '2021', '2022', '2023', '2024', '2025']} />
            </ChartCard>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Default — energy</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Bars are light blue by default. Hover highlights in aspect color. Click locks selection (stays red while hovering others). Warning icon + line on top.
          </p>
          <ChartCard
            label="Energy use intensity"
            suffix="kWh/m²/y"
            legend={[
              { label: 'Energy use intensity', color: CHART_COLORS.barSelected },
              { label: 'Missing', color: CHART_COLORS.barDisabled },
              { label: 'Warnings', color: CHART_COLORS.warning },
            ]}
          >
            <ColumnChart data={DATA} showWarning warningIndex={22} missingFrom={30} labels={['2020', '2021', '2022', '2023', '2024', '2025']} />
          </ChartCard>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">GHG aspect</h2>
          <ChartCard
            label="GHG emissions"
            suffix="tCO₂e"
            legend={[
              { label: 'GHG emissions', color: CHART_COLORS.ghg },
              { label: 'Missing', color: CHART_COLORS.barDisabled },
            ]}
          >
            <ColumnChart data={DATA.map(v => v * 0.7)} color={CHART_COLORS.ghg} missingFrom={30} labels={['2020', '2021', '2022', '2023', '2024', '2025']} />
          </ChartCard>
        </section>

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
