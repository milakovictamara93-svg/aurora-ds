'use client'

import PageHeader from '@/app/components-lib/ui/PageHeader'
import MiniDashboard from '@/app/components-lib/ui/MiniDashboard'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, Preview,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

const SLOTS = [
  { label: '64/65', description: 'Assets in analytics' },
  { label: '58/65', description: 'Assets in reports', alert: true },
  { label: '100%', description: 'Data completion' },
  { label: '69.98%', description: 'Data coverage' },
  { label: '87.47%', description: 'Data reliability' },
  { label: 'N/A', description: 'Target comparison' },
]

export default function MiniDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Mini dashboard"
        description="Horizontal summary bar with data slots separated by dividers. Shows key metrics at a glance."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar tabs={['usage', 'style', 'code']} />

        <TabPanel id="usage">

          <Section title="Above content (white)">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              White background variant — used above the main content area, typically below the page header.
            </p>
            <Preview>
              <div className="w-full">
                <MiniDashboard variant="above" slots={SLOTS} />
              </div>
            </Preview>
          </Section>

          <Section title="Inside content (grey)">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Grey background variant — used inside cards or content sections where the white variant would blend in.
            </p>
            <Preview>
              <div className="w-full">
                <MiniDashboard variant="inside" slots={SLOTS} />
              </div>
            </Preview>
          </Section>

          <Section title="Outline">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              White background with a border — used when the dashboard needs visual separation without a grey background.
            </p>
            <Preview>
              <div className="w-full">
                <MiniDashboard variant="outline" slots={SLOTS} />
              </div>
            </Preview>
          </Section>

          <Section title="With alerts">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Slots can have an orange alert dot to flag items that need attention.
            </p>
            <Preview>
              <div className="w-full">
                <MiniDashboard variant="outline" slots={[
                  { label: '58/65', description: 'Assets in reports', alert: true },
                  { label: '12', description: 'Missing data', alert: true },
                  { label: '3', description: 'Errors', alert: true },
                  { label: '100%', description: 'Data completion' },
                ]} />
              </div>
            </Preview>
          </Section>

          <Section title="Fewer slots">
            <Preview>
              <div className="w-full">
                <MiniDashboard variant="outline" slots={[
                  { label: '78/100', description: 'GRESB Score' },
                  { label: 'A', description: 'NABERS Rating' },
                  { label: '4 Star', description: 'Green Star' },
                ]} />
              </div>
            </Preview>
          </Section>

          <Section title="Condensed">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Inline horizontal layout — value and description sit side by side, separated by middle dots. Single line, wraps if needed. For card headers, toolbars, or anywhere vertical space is tight.
            </p>
            <Preview>
              <div className="w-full">
                <MiniDashboard variant="outline" size="condensed" slots={SLOTS} />
              </div>
            </Preview>
          </Section>

          <Section title="When to use">
            <UseList items={[
              'Summary bar below the page header showing portfolio-level KPIs',
              'Inside a card to display key metrics for an asset or report',
              'Top of a dashboard section to provide context before detailed charts',
            ]} />
          </Section>

          <Section title="When not to use">
            <DontUseList items={[
              'For detailed data — use a table or data points instead',
              'More than 7 slots — becomes too dense and unreadable',
              'Interactive data — these are display-only, not clickable',
            ]} />
          </Section>

        </TabPanel>

        <TabPanel id="style">

          <Section title="Specs">
            <SpecTable rows={[
              { property: 'Height',          value: '54px per slot',              token: 'h-[54px]' },
              { property: 'Padding',         value: '12px horizontal, 8px vertical', token: 'px-3 py-2' },
              { property: 'Border radius',   value: '8px',                        token: 'rounded-lg' },
              { property: 'Divider',         value: '1px vertical, grey-100',     token: 'w-px bg-[#EDEEF1]' },
              { property: 'Value font',      value: '14px medium, grey-950',      token: 'text-[14px] font-medium' },
              { property: 'Description font', value: '10px regular, grey-950',    token: 'text-[10px]' },
              { property: 'Alert dot',       value: '4px circle, #F96416',        token: 'w-1 h-1 rounded-full' },
              { property: 'Above bg',        value: 'white',                      token: 'bg-white' },
              { property: 'Inside bg',       value: '#F7F8F8',                    token: 'bg-[#F7F8F8]' },
              { property: 'Outline border',  value: '1px grey-100',              token: 'border border-[#EDEEF1]' },
            ]} />
          </Section>

        </TabPanel>

        <TabPanel id="code">

          <Section title="Import">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`import MiniDashboard from '@/app/components-lib/ui/MiniDashboard'`}</code>
            </pre>
          </Section>

          <Section title="Basic usage">
            <pre className="bg-[#F7F8F8] dark:bg-[#1F2430] rounded-lg px-4 py-3 text-[13px] text-[#111827] dark:text-white overflow-x-auto">
              <code>{`<MiniDashboard
  variant="outline"
  slots={[
    { label: '64/65', description: 'Assets in analytics' },
    { label: '58/65', description: 'Assets in reports', alert: true },
    { label: '100%', description: 'Data completion' },
  ]}
/>`}</code>
            </pre>
          </Section>

          <Section title="Props">
            <SpecTable rows={[
              { property: 'slots',     value: 'DataSlot[]',                        token: 'required — array of { label, description, alert? }' },
              { property: 'variant',   value: '"above" | "inside" | "outline"',    token: 'default "above"' },
              { property: 'className', value: 'string',                            token: 'optional extra classes' },
            ]} />
          </Section>

        </TabPanel>

      </ComponentTabs>
    </div>
  )
}
