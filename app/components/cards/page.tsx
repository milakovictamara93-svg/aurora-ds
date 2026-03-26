'use client'

import PageHeader from '@/components/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, VariantRow, VariantTable, RelatedComponents, PageContent,
} from '@/components/ui/ComponentTabs'

// ─── Card primitives ──────────────────────────────────────────────────────────
function Card({ variant = 'flat', children }: { variant?: 'flat' | 'elevated'; children: React.ReactNode }) {
  return (
    <div className={`rounded-[8px] overflow-hidden bg-white dark:bg-[#111827] border ${
      variant === 'elevated'
        ? 'border-[#EDEEF1] dark:border-[#1F2430] shadow-[0_4px_16px_rgba(12,12,13,0.08),0_1px_4px_rgba(12,12,13,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
        : 'border-[#EDEEF1] dark:border-[#1F2430]'
    }`}>
      {children}
    </div>
  )
}

function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
      <div>
        <h3 className="text-sm font-bold text-[#111827] dark:text-white leading-[1.4]">{title}</h3>
        {subtitle && <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-4 text-sm text-[#505867] dark:text-[#9CA3AF]">{children}</div>
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[#EDEEF1] dark:border-[#1F2430]">
      {children}
    </div>
  )
}

function Btn({ variant = 'primary', children }: { variant?: 'primary' | 'tertiary'; children: React.ReactNode }) {
  const cls = variant === 'primary'
    ? 'bg-[#1258F8] text-white hover:bg-[#1146E4] active:bg-[#143ABB]'
    : 'border border-[#EDEEF1] dark:border-[#1F2430] text-[#1F2430] dark:text-white bg-white dark:bg-[#111827] hover:bg-[#F7F8F8] hover:border-[#D7DAE0] active:bg-[#EDEEF1]'
  return (
    <button className={`inline-flex items-center justify-center h-8 px-3 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#2295FF] focus:ring-offset-2 ${cls}`}>
      {children}
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CardsPage() {
  return (
    <div>
      <PageHeader
        title="Cards"
        description="Surface containers for grouping related content. Two elevation levels, flexible header/body/footer structure."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>
            <Section title="When to use">
              <UseList items={[
                'For grouping related information into a single scannable unit (metrics, summaries, entity details).',
                'In dashboards and data summaries where each card represents a distinct data object or KPI.',
                'For standalone content units that need clear visual separation from surrounding content.',
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't nest cards inside other cards — this creates visual hierarchy confusion. Use CardBody sections or a table instead.",
                "Don't use cards for lists of homogeneous items that share the same structure — use table rows or list items for those.",
              ]} />
            </Section>

            <Section title="Variants">
              <VariantTable>
                <VariantRow
                  preview={
                    <Card variant="flat">
                      <div className="px-4 py-3">
                        <p className="text-xs font-semibold text-[#1F2430] dark:text-white">Flat card</p>
                        <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mt-0.5">1px border</p>
                      </div>
                    </Card>
                  }
                  name="Flat"
                  description="Default. 1px border using Grey 100 (#EDEEF1). Use for most UI contexts."
                />
                <VariantRow
                  preview={
                    <Card variant="elevated">
                      <div className="px-4 py-3">
                        <p className="text-xs font-semibold text-[#1F2430] dark:text-white">Elevated</p>
                        <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mt-0.5">Shadow, no border</p>
                      </div>
                    </Card>
                  }
                  name="Elevated"
                  description="Drop shadow (0 4px 16px rgba(0,0,0,0.08)), no visible border. Use to layer above the page background."
                  last
                />
              </VariantTable>
            </Section>

            <Section title="Full card preview">
              <Preview label="Flat card — header / body / footer">
                <div className="w-full max-w-sm">
                  <Card variant="flat">
                    <CardHeader
                      title="Energy consumption"
                      subtitle="January – March 2026"
                      action={<span className="text-xs font-medium text-[#2295FF] cursor-pointer">View all</span>}
                    />
                    <CardBody>
                      Total site energy usage for Q1 was{' '}
                      <strong className="font-semibold text-[#1F2430] dark:text-white">1,248 MWh</strong>, down 6%
                      from the previous quarter.
                    </CardBody>
                    <CardFooter>
                      <Btn variant="tertiary">Dismiss</Btn>
                      <Btn variant="primary">Export report</Btn>
                    </CardFooter>
                  </Card>
                </div>
              </Preview>
              <Annotation>Card with header (title + subtitle + action link), body text, and a footer with a tertiary/primary button pair.</Annotation>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <div className="mb-3 max-w-xs">
                    <Card variant="flat">
                      <CardHeader title="Site overview" subtitle="12 buildings" />
                      <CardBody>Use a clear title and optional subtitle to orient the reader immediately.</CardBody>
                    </Card>
                  </div>
                  <p>Give every card a concise, descriptive title. Use a subtitle for secondary context like date range or entity count.</p>
                </DoCard>
                <DontCard>
                  <div className="mb-3 max-w-xs">
                    <Card variant="flat">
                      <CardBody>
                        <Card variant="elevated">
                          <CardBody>Don&apos;t nest cards inside other cards.</CardBody>
                        </Card>
                      </CardBody>
                    </Card>
                  </div>
                  <p>Don&apos;t nest cards. Use table rows, list items, or internal sections within a single card instead.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/tables', label: 'Tables', description: 'For homogeneous lists of data that share column structure.' },
              { href: '/components/modals', label: 'Modals', description: 'When card content needs to expand into a full overlay.' },
              { href: '/components/badges-tags', label: 'Badges & tags', description: 'Status indicators placed inside card headers or bodies.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Spacing & sizing">
              <SpecTable rows={[
                { property: 'Card padding (horizontal)',  value: '24px (px-6)',      token: '—' },
                { property: 'Header top padding',         value: '24px (pt-6)',      token: '—' },
                { property: 'Header bottom padding',      value: '16px (pb-4)',      token: '—' },
                { property: 'Body vertical padding',      value: '16px (py-4)',      token: '—' },
                { property: 'Footer vertical padding',    value: '16px (py-4)',      token: '—' },
                { property: 'Border radius',              value: '8px (rounded-lg)', token: '—' },
                { property: 'Footer button gap',          value: '8px (gap-2)',      token: '—' },
              ]} />
            </Section>

            <Section title="Structure">
              <SpecTable rows={[
                { property: 'CardHeader border',  value: '1px bottom — Grey 100',  token: 'border-b border-[#EDEEF1]' },
                { property: 'CardFooter border',  value: '1px top — Grey 100',     token: 'border-t border-[#EDEEF1]' },
                { property: 'CardFooter bg',      value: 'Grey 50 (#F7F8F8)',      token: 'bg-[#F7F8F8]' },
                { property: 'Card bg',            value: 'White (#FFFFFF)',         token: 'bg-white' },
                { property: 'Dark card bg',       value: '#111827',                token: 'dark:bg-[#111827]' },
                { property: 'Dark footer bg',     value: '#0D1117',                token: 'dark:bg-[#0D1117]' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Card background" hex="#FFFFFF" role="White — card surface" />
              <ColorRow label="Flat border" hex="#EDEEF1" role="Grey 100 — 1px border for flat variant" border />
              <ColorRow label="Header / footer divider" hex="#EDEEF1" role="Grey 100 — separates header and footer from body" border />
              <ColorRow label="Footer background" hex="#F7F8F8" role="Grey 50 — subtle distinction for the footer zone" border />
              <ColorRow label="Title text" hex="#1F2430" role="Grey 900 — card title and strong emphasis" border />
              <ColorRow label="Body text" hex="#505867" role="Grey 600 — default body copy inside cards" border />
            </Section>

            <Section title="Elevation">
              <Preview label="Flat vs elevated — side by side">
                <Card variant="flat">
                  <div className="px-5 py-4 w-44">
                    <p className="text-xs font-semibold text-[#1F2430] dark:text-white mb-1">Flat</p>
                    <p className="text-xs text-[#505867] dark:text-[#9CA3AF]">1px border, no shadow</p>
                  </div>
                </Card>
                <Card variant="elevated">
                  <div className="px-5 py-4 w-44">
                    <p className="text-xs font-semibold text-[#1F2430] dark:text-white mb-1">Elevated</p>
                    <p className="text-xs text-[#505867] dark:text-[#9CA3AF]">Shadow, no border</p>
                  </div>
                </Card>
              </Preview>
              <Annotation>Elevated cards use box-shadow: 0 4px 16px rgba(0,0,0,0.08). In dark mode: 0 4px 16px rgba(0,0,0,0.3).</Annotation>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Flat card">
              <Preview label="Live preview">
                <div className="w-full max-w-sm">
                  <Card variant="flat">
                    <CardHeader title="Site overview" subtitle="12 buildings" />
                    <CardBody>Total energy consumption for Q1 2026 was 1,248 MWh.</CardBody>
                    <CardFooter>
                      <Btn variant="tertiary">Cancel</Btn>
                      <Btn variant="primary">Save</Btn>
                    </CardFooter>
                  </Card>
                </div>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<div className="rounded-lg overflow-hidden bg-white
             border border-[#EDEEF1]">

  {/* Header */}
  <div className="flex items-start justify-between
                  px-6 pt-6 pb-4 border-b border-[#EDEEF1]">
    <div>
      <h3 className="text-sm font-semibold text-[#1F2430]">
        Site overview
      </h3>
      <p className="text-xs text-[#505867] mt-0.5">12 buildings</p>
    </div>
  </div>

  {/* Body */}
  <div className="px-6 py-4 text-sm text-[#505867]">
    Total energy consumption for Q1 2026 was 1,248 MWh.
  </div>

  {/* Footer */}
  <div className="flex items-center justify-end gap-2
                  px-6 py-4 border-t border-[#EDEEF1] bg-[#F7F8F8]">
    <button className="h-8 px-3 rounded border border-[#EDEEF1]
                       text-sm font-medium text-[#1F2430]">
      Cancel
    </button>
    <button className="h-8 px-3 rounded bg-[#1258F8]
                       text-sm font-medium text-white">
      Save
    </button>
  </div>
</div>`}
              </pre>
            </Section>

            <Section title="Elevated card">
              <Preview label="Live preview">
                <div className="w-full max-w-sm">
                  <Card variant="elevated">
                    <CardHeader title="GHG emissions" subtitle="Scope 1 + 2" />
                    <CardBody>Total emissions for the reporting period: 842 tCO₂e. Target: 800 tCO₂e.</CardBody>
                  </Card>
                </div>
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed">
{`<div className="rounded-lg overflow-hidden bg-white
             border-transparent
             shadow-[0_4px_16px_rgba(0,0,0,0.08)]">

  {/* Header */}
  <div className="flex items-start justify-between
                  px-6 pt-6 pb-4 border-b border-[#EDEEF1]">
    <div>
      <h3 className="text-sm font-semibold text-[#1F2430]">
        GHG emissions
      </h3>
      <p className="text-xs text-[#505867] mt-0.5">Scope 1 + 2</p>
    </div>
  </div>

  {/* Body */}
  <div className="px-6 py-4 text-sm text-[#505867]">
    Total emissions: 842 tCO₂e. Target: 800 tCO₂e.
  </div>
</div>`}
              </pre>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check="role=region">
                  Wrap each meaningful card in{' '}
                  <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">role=&quot;region&quot;</code>{' '}
                  with an{' '}
                  <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-labelledby</code>{' '}
                  pointing to the card&apos;s heading so screen readers can identify the landmark.
                </A11yRow>
                <A11yRow check="aria-labelledby">
                  Give the card&apos;s{' '}
                  <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;h3&gt;</code>{' '}
                  a unique{' '}
                  <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">id</code>{' '}
                  and reference it from the wrapper&apos;s{' '}
                  <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-labelledby</code>.
                </A11yRow>
                <A11yRow check="heading level">
                  Use the correct heading level for context. Card titles are typically{' '}
                  <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;h3&gt;</code>{' '}
                  when nested inside a page section. Don&apos;t skip heading levels.
                </A11yRow>
                <A11yRow check="interactive cards">
                  If the entire card is clickable, use a single{' '}
                  <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;a&gt;</code>{' '}
                  wrapping the card rather than a{' '}
                  <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">div onClick</code>.
                  This ensures keyboard focus and screen reader navigation work correctly.
                </A11yRow>
              </div>
            </Section>

            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <KeyRow keys={['Tab']} action="Move focus through interactive elements inside the card (links, buttons)." />
                <KeyRow keys={['Shift+Tab']} action="Move focus backwards through card interactive elements." />
                <KeyRow keys={['Enter']} action="Activate the focused button or link inside the card footer." />
                <KeyRow keys={['Esc']} action="If the card is part of a dismissible pattern, close or collapse it." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Card title on white',    value: '#1F2430 on #FFFFFF',  token: '14.1:1 ✓ AAA' },
                { property: 'Body text on white',     value: '#505867 on #FFFFFF',  token: '7.0:1 ✓ AA' },
                { property: 'Subtitle on white',      value: '#505867 on #FFFFFF',  token: '7.0:1 ✓ AA' },
                { property: 'Body text on footer bg', value: '#505867 on #F7F8F8',  token: '6.8:1 ✓ AA' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
