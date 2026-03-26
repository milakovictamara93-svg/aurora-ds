'use client'

import PageHeader from '@/components/ui/PageHeader'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, ColorRow,
  DoCard, DontCard, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, RelatedComponents, PageContent,
} from '@/components/ui/ComponentTabs'

// ── Inline demo components ─────────────────────────────────────────────────────

function TableDemo() {
  const rows = [
    { building: 'Scaler HQ', type: 'Office', emissions: '142 tCO₂e', status: 'Active' },
    { building: 'Warehouse A', type: 'Industrial', emissions: '87 tCO₂e', status: 'Active' },
    { building: 'Retail Unit 3', type: 'Retail', emissions: '23 tCO₂e', status: 'Inactive' },
  ]
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden w-full">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
          <tr>
            {['Building', 'Type', 'Emissions', 'Status'].map(h => (
              <th key={h} className="text-left px-4 py-2 text-sm font-medium text-[#505867] dark:text-[#6B7280] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
          {rows.map((row, i) => (
            <tr key={i} className={`transition-colors ${i === 1 ? 'bg-[#EFF6FF] dark:bg-[#1258F8]/10' : 'hover:bg-[#F7F8F8] dark:hover:bg-[#0D1117]/40'}`}>
              <td className="px-4 py-2 text-sm font-medium text-[#111827] dark:text-white">{row.building}</td>
              <td className="px-4 py-2 text-sm text-[#505867] dark:text-[#9CA3AF]">{row.type}</td>
              <td className="px-4 py-2 text-sm text-[#505867] dark:text-[#9CA3AF]">{row.emissions}</td>
              <td className="px-4 py-2">
                <span className={`inline-flex items-center h-5 px-2 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-[#DCFCE7] text-[#166534] dark:bg-[#22C55E]/20 dark:text-[#22C55E]' : 'bg-[#D7DAE0]/40 text-[#8C96A4]'}`}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EmptyTable() {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
          <tr>
            {['Building', 'Type', 'Emissions'].map(h => (
              <th key={h} className="text-left px-4 py-2 text-sm font-medium text-[#505867] dark:text-[#6B7280]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#111827]">
          <tr>
            <td colSpan={3} className="px-4 py-12 text-center">
              <p className="text-sm font-medium text-[#1F2430] dark:text-white mb-1">No buildings found</p>
              <p className="text-xs text-[#505867] dark:text-[#6B7280]">Add a building to start tracking emissions data.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// ── Code snippets ──────────────────────────────────────────────────────────────

const tableSnippet = `<div className="rounded-lg border border-[#EDEEF1] overflow-hidden w-full">
  <table className="w-full text-sm border-collapse">
    <thead className="bg-[#F7F8F8] border-b border-[#EDEEF1]">
      <tr>
        <th scope="col"
          className="text-left px-4 py-2.5 text-xs font-semibold
                     text-[#505867] uppercase tracking-wider">
          Building
        </th>
        {/* repeat for each column */}
      </tr>
    </thead>
    <tbody className="divide-y divide-[#EDEEF1] bg-white">
      {rows.map((row, i) => (
        <tr key={i}
          className="transition-colors hover:bg-[#F7F8F8]
                     aria-selected:bg-[#EFF6FF]">
          <td className="px-4 py-3 font-medium text-[#1F2430]">
            {row.building}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>`

const emptySnippet = `<tbody>
  <tr>
    <td colSpan={columnCount} className="px-4 py-12 text-center">
      <p className="text-sm font-medium text-[#1F2430] mb-1">
        No buildings found
      </p>
      <p className="text-xs text-[#505867]">
        Add a building to start tracking emissions data.
      </p>
    </td>
  </tr>
</tbody>`

// ── Page ───────────────────────────────────────────────────────────────────────

export default function TablesPage() {
  return (
    <div>
      <PageHeader
        title="Tables"
        description="Data tables for structured information with sticky headers, sortable columns, and row states."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="usage">
          <PageContent>
            <Section title="When to use">
              <UseList items={[
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Structured data sets</strong> — when users need to scan, compare, or act on multiple records at once.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Comparing rows</strong> — when column alignment makes relationships between values immediately scannable.</>,
                <><strong className="font-semibold text-[#1F2430] dark:text-white">Sortable data</strong> — when users need to reorder records by a column (emissions, date, status).</>,
              ]} />
            </Section>

            <Section title="When not to use">
              <DontUseList items={[
                "Don't use a table for a single item — use a detail card or a description list instead.",
                "Don't use a table to display a form. Forms have a distinct layout and interaction model.",
              ]} />
            </Section>

            <Section title="Default state">
              <Preview label="Table with hover and selected row">
                <TableDemo />
              </Preview>
              <Annotation>Row 2 shows the selected/highlighted state (#EFF6FF). All other rows respond to hover.</Annotation>
            </Section>

            <Section title="Empty state">
              <Preview label="No data">
                <EmptyTable />
              </Preview>
              <Annotation>Always render the header row in the empty state so users understand the table's schema.</Annotation>
            </Section>

            <Section title="Do / Don't">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DoCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Align numeric columns right</p>
                  <p>Right-align numbers and monospaced values so decimal points and magnitudes stack visually — making scanning fast.</p>
                </DoCard>
                <DontCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Don't left-align all columns uniformly</p>
                  <p>Left-aligning numbers removes their natural alignment axis. Values like "1,240" and "87" become hard to compare at a glance.</p>
                </DontCard>
                <DoCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Keep row density consistent at 48px</p>
                  <p>Use 16px vertical padding per cell. This ensures touch targets meet 44px minimum and text never feels cramped.</p>
                </DoCard>
                <DontCard>
                  <p className="font-semibold text-[#1F2430] dark:text-white mb-1">Don't mix dense and spacious rows</p>
                  <p>Inconsistent row heights break the visual rhythm and make it harder to track rows across wide tables.</p>
                </DontCard>
              </div>
            </Section>

            <RelatedComponents items={[
              { href: '/components/badges-tags', label: 'Badges & Tags', description: 'Use for status cells — Verified, Pending, Active.' },
              { href: '/components/cards', label: 'Cards', description: 'Alternative for single-record display rather than a table row.' },
            ]} />
          </PageContent>
        </TabPanel>

        {/* ── STYLE ─────────────────────────────────────────────────────────── */}
        <TabPanel id="style">
          <PageContent>
            <Section title="Sizing & spacing">
              <SpecTable rows={[
                { property: 'Header height',    value: '40px',           token: 'py-2.5' },
                { property: 'Row height',       value: '48px',           token: 'py-3' },
                { property: 'Cell padding',     value: '16px horizontal',token: 'px-4' },
                { property: 'Header font size', value: '12px / 600',     token: 'text-xs font-semibold' },
                { property: 'Cell font size',   value: '14px / 400',     token: 'text-sm' },
                { property: 'Border radius',    value: '8px',            token: 'rounded-lg' },
              ]} />
            </Section>

            <Section title="Colors">
              <ColorRow label="Header background" hex="#F7F8F8" role="Grey 50 — separates header from data rows" />
              <ColorRow label="Hover background" hex="#F7F8F8" role="Grey 50 — subtle row hover" border />
              <ColorRow label="Selected row" hex="#EFF6FF" role="Blue 50 — selected / highlighted row" border />
              <ColorRow label="Row divider" hex="#EDEEF1" role="Grey 100 — horizontal rule between rows" border />
              <ColorRow label="Table border" hex="#EDEEF1" role="Grey 100 — outer container border" border />
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── CODE ──────────────────────────────────────────────────────────── */}
        <TabPanel id="code">
          <PageContent>
            <Section title="Standard table">
              <Preview label="Live preview">
                <TableDemo />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
                {tableSnippet}
              </pre>
            </Section>

            <Section title="Empty state">
              <Preview label="Live preview">
                <EmptyTable />
              </Preview>
              <pre className="mt-4 bg-[#0D1117] text-[#E2E8F0] text-sm font-mono rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre">
                {emptySnippet}
              </pre>
            </Section>
          </PageContent>
        </TabPanel>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────────── */}
        <TabPanel id="accessibility">
          <PageContent>
            <Section title="ARIA requirements">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <A11yRow check='scope="col"'>
                  Add <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">scope="col"</code> to every <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;th&gt;</code> element so assistive technology can associate header cells with data cells across rows.
                </A11yRow>
                <A11yRow check='role="grid"'>
                  Use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">role="grid"</code> on the <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;table&gt;</code> when rows are interactive (selectable or clickable) to signal a composite widget to screen readers.
                </A11yRow>
                <A11yRow check="aria-sort">
                  On sortable column headers, set <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-sort="ascending"</code> or <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">"descending"</code> to reflect the active sort order. Use <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">"none"</code> for unsorted columns.
                </A11yRow>
                <A11yRow check="aria-selected">
                  Set <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">aria-selected="true"</code> on <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#1F2430] px-1 py-0.5 rounded">&lt;tr&gt;</code> elements when row selection is supported. Pair with a visible selected background (#EFF6FF).
                </A11yRow>
              </div>
            </Section>

            <Section title="Keyboard navigation">
              <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#111827]">
                <KeyRow keys={['Tab']} action="Move focus between interactive elements: column sort buttons, checkboxes, row action menus." />
                <KeyRow keys={['Enter']} action="Activate a focused sort button or open a row's detail view." />
                <KeyRow keys={['Space']} action="Toggle checkbox selection on the focused row." />
                <KeyRow keys={['↑', '↓']} action="Navigate between rows when the table has role='grid' and row focus management is implemented." />
              </div>
            </Section>

            <Section title="Contrast">
              <SpecTable rows={[
                { property: 'Header text on Grey 50',   value: '#505867 on #F7F8F8', token: '4.9:1 ✓ AA' },
                { property: 'Cell text on white',       value: '#1F2430 on #FFFFFF',  token: '15.3:1 ✓ AAA' },
                { property: 'Muted cell on white',      value: '#505867 on #FFFFFF',  token: '7.0:1 ✓ AA' },
                { property: 'Active badge on green/10', value: '#22C55E on #DCFCE7',  token: '3.0:1 — use bold text' },
              ]} />
            </Section>
          </PageContent>
        </TabPanel>
      </ComponentTabs>
    </div>
  )
}
