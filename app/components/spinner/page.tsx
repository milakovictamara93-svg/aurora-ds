'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import Spinner from '@/app/components-lib/ui/Spinner'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, Preview,
  UseList, DontUseList, RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

export default function SpinnerPage() {
  return (
    <div>
      <PageHeader
        title="Spinner"
        description="Circular indeterminate indicator for short operations where progress can't be measured."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar tabs={['usage', 'style', 'code']} />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Sizes">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Two sizes from Figma — small (12px) and medium (16px). A large (20px) variant is available for button loading states.
            </p>
            <Preview>
              <div className="flex items-center gap-10">
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="sm" />
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">sm · 12px</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="md" />
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">md · 16px</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="lg" />
                  <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">lg · 20px</span>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="In context">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Spinners pair with text to give context. Always accompany a spinner with a status message unless space makes it impossible.
            </p>
            <Preview>
              <div className="flex flex-col gap-4 w-full max-w-sm">
                {/* Inline with text */}
                <div className="flex items-center gap-2 text-[14px] text-[#505867] dark:text-[#9CA3AF]">
                  <Spinner size="sm" />
                  <span>Saving changes…</span>
                </div>
                {/* Button loading state */}
                <button
                  disabled
                  className="flex items-center justify-center gap-2 h-9 px-4 rounded bg-[#1258F8] text-white text-[13px] font-semibold opacity-70 cursor-not-allowed"
                >
                  <Spinner size="lg" className="border-white/30 border-t-white" />
                  Submitting…
                </button>
                {/* Card loading state */}
                <div className="flex items-center justify-center gap-3 h-24 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]">
                  <Spinner size="md" />
                  <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">Loading data…</span>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'Short indeterminate operations — API calls, saving, data fetching (under ~3 seconds)',
              'Button loading state — replace button label while action is in flight',
              'Inline within a form field or table cell to indicate processing',
              'Small content areas where a full skeleton would be disproportionate',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'Long or measurable operations — use Loading Bar with a known percentage instead',
              'Full-page initial loads where content shape is known — use Skeleton instead',
              'Multi-step background processes — use Progress Steps instead',
              'Replace entire page content — pair with a meaningful status message',
            ]} />
          </Section>

        </TabPanel>

        {/* ── STYLE ── */}
        <TabPanel id="style">

          <Section title="Specs">
            <SpecTable rows={[
              { property: 'sm size',        value: '12×12px',    token: 'w-3 h-3' },
              { property: 'md size',        value: '16×16px',    token: 'w-4 h-4' },
              { property: 'lg size',        value: '20×20px',    token: 'w-5 h-5' },
              { property: 'Track color',    value: '#D7DAE0',    token: 'border-[#D7DAE0]' },
              { property: 'Arc color',      value: '#1258F8',    token: 'border-t-[#1258F8]' },
              { property: 'Border width sm','value': '1.5px',   token: 'border-[1.5px]' },
              { property: 'Border width md/lg','value': '2px',  token: 'border-2' },
              { property: 'Speed',          value: '0.7s linear infinite', token: 'animate-spin' },
            ]} />
          </Section>

        </TabPanel>

        {/* ── CODE ── */}
        <TabPanel id="code">

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import Spinner from '@/app/components-lib/ui/Spinner'`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'size',      value: `'sm' | 'md' | 'lg'`, token: "defaults to 'md'" },
              { property: 'className', value: 'string',              token: 'optional — extra classes' },
            ]} />
          </Section>

          <Section title="Examples">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`{/* Default */}
<Spinner />

{/* Small inline */}
<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Saving…</span>
</div>

{/* White spinner inside a dark button */}
<button disabled className="bg-[#1258F8] ...">
  <Spinner size="lg" className="border-white/30 border-t-white" />
  Submitting…
</button>`}</code>
            </pre>
          </Section>

          <Section title="Related components">
            <RelatedComponents items={[
              { href: '/components/loading-bar',    label: 'Loading Bar',     description: 'For measurable progress with a known percentage' },
              { href: '/components/skeleton',       label: 'Skeleton',        description: 'Layout placeholders for known content shapes' },
              { href: '/components/progress-steps', label: 'Progress Steps',  description: 'Multi-step workflow indicator' },
            ]} />
          </Section>

        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
