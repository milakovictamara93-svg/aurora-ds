'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { ScoreChart, ChartEmptyState } from '@/app/components-lib/ui/ChartComponents'

const SCORES = [100, 98, 95, 92, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 8, 5, 100, 100, 100, 100, 100, 100]

export default function ScoreChartPage() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div>
      <PageHeader title="Score chart" description="Sorted bar chart — highest to lowest — with gradient fade, hover, and active states." badge="Visualization" />

      <div className="mt-8 flex flex-col gap-10">
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Interactive — click to select</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Bars sorted highest→lowest. Default shows a coral gradient fading right. Hover/click highlights one bar while rest turn light blue.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
            <ScoreChart data={SCORES} missingFrom={28} selectedIndex={selected} onSelect={setSelected} />
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">Empty state</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-4">
            <ChartEmptyState />
          </div>
        </section>
      </div>
    </div>
  )
}
