'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import { DonutChart, AspectScoreMini, CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

const ASPECTS = [
  { label: 'Energy',         value: 28, color: CHART_COLORS.energy },
  { label: 'GHG',            value: 18, color: CHART_COLORS.ghg },
  { label: 'Water',          value: 15, color: CHART_COLORS.water },
  { label: 'Waste',          value: 12, color: CHART_COLORS.waste },
  { label: 'Certifications', value: 14, color: CHART_COLORS.certifications },
  { label: 'Engagement',     value: 8,  color: CHART_COLORS.engagement },
  { label: 'ESG Risk',       value: 5,  color: CHART_COLORS.esgRisk },
]

export default function DonutChartPage() {
  return (
    <div>
      <PageHeader title="Donut chart" description="ESG aspect composition and portfolio breakdowns with center value and hover expand." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Aspect breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Aspects</p>
              <DonutChart segments={ASPECTS} centerValue="78" centerLabel="out of 100" />
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Portfolio</p>
              <DonutChart segments={[
                { label: 'Office', value: 45, color: '#1258F8' },
                { label: 'Residential', value: 30, color: CHART_COLORS.water },
                { label: 'Industrial', value: 15, color: CHART_COLORS.ghg },
                { label: 'Retail', value: 10, color: CHART_COLORS.certifications },
              ]} centerValue="64" centerLabel="assets" />
            </div>
            <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF] self-start">Small</p>
              <DonutChart segments={ASPECTS} size={120} strokeWidth={16} centerValue="78" centerLabel="score" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Aspect sparklines</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Energy', color: CHART_COLORS.energy, data: [65, 72, 68, 75, 70, 62, 58] },
                { label: 'GHG', color: CHART_COLORS.ghg, data: [50, 55, 52, 60, 58, 55, 52] },
                { label: 'Water', color: CHART_COLORS.water, data: [40, 42, 38, 45, 48, 50, 52] },
                { label: 'Waste', color: CHART_COLORS.waste, data: [30, 35, 32, 38, 40, 42, 45] },
                { label: 'Certifications', color: CHART_COLORS.certifications, data: [80, 82, 85, 88, 90, 88, 92] },
                { label: 'Engagement', color: CHART_COLORS.engagement, data: [20, 25, 28, 30, 35, 38, 40] },
                { label: 'ESG Risk', color: CHART_COLORS.esgRisk, data: [70, 68, 65, 60, 55, 50, 48] },
              ].map(a => (
                <div key={a.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium text-[#505867] dark:text-[#9CA3AF]">{a.label}</span>
                  <AspectScoreMini points={a.data} color={a.color} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
