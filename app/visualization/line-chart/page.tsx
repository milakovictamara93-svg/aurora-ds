'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import { LineChart, ChartLegend, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

export default function LineChartPage() {
  return (
    <div>
      <PageHeader title="Line chart" description="Trend lines with markers for YoY comparisons, stranding analysis, and projections." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Trend with projection + benchmark</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
            <LineChart points={[75, 95, 90, 120, 125, 115, 105]} comparisonPoints={[110, 110, 110, 110, 110, 110, 110]} projectionFrom={5} labels={['2018', '2020', '2022', '2024', '2026', '2028', '2030']} />
            <div className="mt-3 flex justify-end">
              <ChartLegend items={[{ label: 'Actual', color: CHART_COLORS.energy }, { label: 'Benchmark', color: CHART_COLORS.comparison }]} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Simple trend</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
            <LineChart points={[45, 52, 48, 60, 55, 72, 68, 80, 75, 85]} color="#1258F8" labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']} />
          </div>
        </section>
      </div>
    </div>
  )
}
