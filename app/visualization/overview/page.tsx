'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import { CHART_COLORS } from '@/app/components-lib/ui/ChartComponents'

export default function VisualizationOverviewPage() {
  return (
    <div>
      <PageHeader
        title="Visualization"
        description="Chart components and color rules for displaying ESG data across the platform."
        badge="Visualization"
      />

      <div className="mt-8 flex flex-col gap-10">

        {/* Chart type index */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Chart types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/visualization/column-chart', label: 'Column chart', desc: 'Vertical bars for monthly consumption data. Single and multi-series.' },
              { href: '/visualization/score-chart',  label: 'Score chart',  desc: 'Sorted bars highest→lowest for scoring/ranking views.' },
              { href: '/visualization/line-chart',   label: 'Line chart',   desc: 'Trend lines with markers for YoY, stranding, and projections.' },
              { href: '/visualization/donut-chart',  label: 'Donut chart',  desc: 'Aspect composition and portfolio breakdowns with center value.' },
            ].map(item => (
              <a key={item.href} href={item.href} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#111827] hover:border-[#1258F8] transition-colors group">
                <p className="text-[14px] font-semibold text-[#111827] dark:text-white group-hover:text-[#1258F8] mb-1">{item.label}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Color palette */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Chart color palette</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            {[
              { label: 'Energy',          hex: CHART_COLORS.energy,         usage: 'Energy 500 — default bar/line color' },
              { label: 'GHG',             hex: CHART_COLORS.ghg,            usage: 'GHG 300 — GHG emissions' },
              { label: 'Water',           hex: CHART_COLORS.water,          usage: 'Water 400 — water consumption' },
              { label: 'Waste',           hex: CHART_COLORS.waste,          usage: 'Waste 400 — waste/recycling' },
              { label: 'Certifications',  hex: CHART_COLORS.certifications, usage: 'Cert 700 — certification scores' },
              { label: 'Engagement',      hex: CHART_COLORS.engagement,     usage: 'Engagement 600 — tenant engagement' },
              { label: 'ESG Risk',        hex: CHART_COLORS.esgRisk,        usage: 'ESG Risk 400 — risk indicators' },
              { label: 'Bar default',     hex: CHART_COLORS.barDefault,     usage: 'Light blue — unselected bars' },
              { label: 'Bar inactive',    hex: CHART_COLORS.barInactive,    usage: 'Lighter blue — sibling bars during interaction' },
              { label: 'Bar disabled',    hex: CHART_COLORS.barDisabled,    usage: 'Grey — missing/estimated data' },
              { label: 'Comparison',      hex: CHART_COLORS.comparison,     usage: 'Sky 500 — dashed benchmark lines' },
              { label: 'Tooltip accent',  hex: CHART_COLORS.accent,         usage: 'Blue 600 — tooltip left accent bar' },
              { label: 'Warning',         hex: CHART_COLORS.warning,        usage: 'Yellow — data quality flag' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
                <div className="w-6 h-6 rounded shrink-0 border border-black/5" style={{ backgroundColor: row.hex }} />
                <span className="text-[13px] font-medium text-[#111827] dark:text-white w-32 shrink-0">{row.label}</span>
                <code className="text-[12px] font-mono text-[#1258F8] w-20 shrink-0">{row.hex}</code>
                <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{row.usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'ESG aspect colors are mandatory', desc: 'Each aspect has a designated color. Never assign arbitrary colors.' },
              { title: 'Missing data is grey', desc: '#EDEEF1 bars for missing/estimated. Always visually distinct from actual.' },
              { title: 'Dashed = projected or comparison', desc: 'Solid lines are actual data. Dashed are projections or benchmarks.' },
              { title: 'Hover dims siblings', desc: 'Active bar stays colored, siblings fade to #D9EAFF. Click locks selection.' },
              { title: 'Donut over pie', desc: 'Use donut for composition. Center shows aggregate value + unit.' },
              { title: 'Warning icon on top', desc: 'Yellow triangle + vertical line sits above bars at z-3, never behind.' },
            ].map((r, i) => (
              <div key={i} className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{r.title}</p>
                <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
