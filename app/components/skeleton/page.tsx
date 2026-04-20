'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import Skeleton from '@/app/components-lib/ui/Skeleton'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, Preview,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

export default function SkeletonPage() {
  return (
    <div>
      <PageHeader
        title="Skeleton"
        description="Layout placeholder that preserves the shape of content during initial load, reducing perceived layout shift."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar tabs={['usage', 'style', 'code']} />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Wave animation">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Default animation — a shimmer sweeps from left to right, conveying that content is actively loading.
            </p>
            <Preview>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <Skeleton height="16px" width="60%" />
                <Skeleton height="14px" width="100%" />
                <Skeleton height="14px" width="80%" />
                <Skeleton height="14px" width="90%" />
              </div>
            </Preview>
          </Section>

          <Section title="Pulse animation">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Slower, lower-motion alternative — the element fades in and out. Prefer this for users who have requested reduced motion.
            </p>
            <Preview>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <Skeleton animation="pulse" height="16px" width="60%" />
                <Skeleton animation="pulse" height="14px" width="100%" />
                <Skeleton animation="pulse" height="14px" width="80%" />
                <Skeleton animation="pulse" height="14px" width="90%" />
              </div>
            </Preview>
          </Section>

          <Section title="Card skeleton">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Compose Skeletons to match the shape of real content. Each skeleton should mirror the actual element's height and approximate width.
            </p>
            <Preview>
              <div className="w-full max-w-sm rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] p-5 flex flex-col gap-4">
                {/* Header row */}
                <div className="flex items-center gap-3">
                  <Skeleton height="40px" width="40px" rounded="full" />
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton height="14px" width="50%" />
                    <Skeleton height="12px" width="30%" />
                  </div>
                </div>
                {/* Body lines */}
                <div className="flex flex-col gap-2">
                  <Skeleton height="12px" />
                  <Skeleton height="12px" width="90%" />
                  <Skeleton height="12px" width="80%" />
                </div>
                {/* Footer row */}
                <div className="flex gap-2 pt-1">
                  <Skeleton height="32px" width="80px" rounded="6px" />
                  <Skeleton height="32px" width="80px" rounded="6px" />
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="Table skeleton">
            <Preview>
              <div className="w-full max-w-md rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
                {/* Header */}
                <div className="flex gap-4 px-4 py-3 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <Skeleton height="12px" width="80px" animation="none" />
                  <Skeleton height="12px" width="100px" animation="none" />
                  <Skeleton height="12px" width="60px" animation="none" />
                </div>
                {/* Rows */}
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-0 bg-white dark:bg-[#111827]">
                    <Skeleton height="14px" width="80px" />
                    <Skeleton height="14px" width="120px" />
                    <Skeleton height="14px" width="60px" />
                  </div>
                ))}
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'Initial page or section load where content shape is known in advance',
              'Data-heavy dashboards — prevents jarring layout shifts when data arrives',
              'Lists, tables, and cards fetched asynchronously',
              'Any load longer than ~300ms where showing nothing would feel broken',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              "Content shape is unknown — don't guess, use a Spinner instead",
              'Very short loads (under 200ms) — the skeleton flash is more jarring than nothing',
              'Leave visible permanently — replace with real content as soon as it arrives',
              'Use for buttons or interactive elements — those should use a Spinner',
            ]} />
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">
          <Section title="Specs">
            <SpecTable rows={[
              { property: 'Border radius',   value: '4px (default)',        token: 'rounded-[4px]' },
              { property: 'Base color',      value: 'rgba(109,120,138,0.2)', token: 'bg-[rgba(109,120,138,0.2)]' },
              { property: 'Shimmer color',   value: 'rgba(215,218,224,0.5)', token: 'via-[rgba(215,218,224,0.5)]' },
              { property: 'Wave speed',      value: '1.6s ease-in-out ∞',   token: 'animate-shimmer' },
              { property: 'Pulse speed',     value: '1.4s ease-in-out ∞',   token: 'animate-aurora-pulse' },
              { property: 'Width',           value: 'flexible (CSS)',        token: 'width prop' },
              { property: 'Height',          value: 'flexible (CSS)',        token: 'height prop' },
            ]} />
          </Section>
        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">
          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import Skeleton from '@/app/components-lib/ui/Skeleton'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'animation', value: `'wave' | 'pulse' | 'none'`, token: "defaults to 'wave'" },
              { property: 'width',     value: 'string | number',            token: "defaults to '100%'" },
              { property: 'height',    value: 'string | number',            token: "defaults to '1rem'" },
              { property: 'rounded',   value: 'string',                     token: "defaults to '4px', use 'full' for circles" },
              { property: 'className', value: 'string',                     token: 'optional extra classes' },
            ]} />
          </Section>

          <Section title="Card skeleton example">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<div className="p-5 flex flex-col gap-4">
  {/* Avatar + name */}
  <div className="flex items-center gap-3">
    <Skeleton height="40px" width="40px" rounded="full" />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton height="14px" width="50%" />
      <Skeleton height="12px" width="30%" />
    </div>
  </div>
  {/* Body text */}
  <Skeleton height="12px" />
  <Skeleton height="12px" width="80%" />
</div>`}</code>
            </pre>
          </Section>

          <Section title="Related components">
            <RelatedComponents items={[
              { href: '/components/spinner',     label: 'Spinner',     description: 'For indeterminate short waits' },
              { href: '/components/loading-bar', label: 'Loading Bar', description: 'For measurable progress' },
            ]} />
          </Section>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
