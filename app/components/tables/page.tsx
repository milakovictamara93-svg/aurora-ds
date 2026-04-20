'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Table, { ColumnDef, BadgeVariant } from '@/app/components-lib/ui/Table'
import {
  ComponentTabs, TabBar, TabPanel,
  Section, SpecTable, A11yRow, KeyRow,
  Preview, Annotation,
  UseList, DontUseList, DoCard, DontCard,
  RelatedComponents,
} from '@/app/components-lib/ui/ComponentTabs'

// ── Demo data ─────────────────────────────────────────────────────────────────

interface Building {
  id: number
  name: string
  location: string
  type: string
  status: 'Active' | 'Pending' | 'Inactive' | 'Review'
  energy: string
  intensity: string
  nabers: string
  manager: string
}

const BUILDINGS: Building[] = [
  { id: 1,  name: 'Scaler HQ',         location: 'Sydney',    type: 'Office',     status: 'Active',   energy: '1,240 MWh', intensity: '82 kWh/m²',  nabers: '5.5 Stars', manager: 'A. Nguyen' },
  { id: 2,  name: 'Meridian Tower',    location: 'Melbourne', type: 'Office',     status: 'Active',   energy: '2,810 MWh', intensity: '108 kWh/m²', nabers: '4.5 Stars', manager: 'B. Chen' },
  { id: 3,  name: 'West End Plaza',    location: 'Brisbane',  type: 'Retail',     status: 'Pending',  energy: '640 MWh',   intensity: '71 kWh/m²',  nabers: '—',         manager: 'C. Park' },
  { id: 4,  name: 'Harbor View',       location: 'Perth',     type: 'Mixed',      status: 'Active',   energy: '3,100 MWh', intensity: '124 kWh/m²', nabers: '4.0 Stars', manager: 'D. Patel' },
  { id: 5,  name: 'Central Square',    location: 'Adelaide',  type: 'Office',     status: 'Inactive', energy: '—',         intensity: '—',           nabers: '3.0 Stars', manager: 'E. Smith' },
  { id: 6,  name: 'North Point',       location: 'Sydney',    type: 'Industrial', status: 'Active',   energy: '4,420 MWh', intensity: '148 kWh/m²', nabers: '—',         manager: 'F. Lee' },
  { id: 7,  name: 'Southgate',         location: 'Canberra',  type: 'Office',     status: 'Review',   energy: '980 MWh',   intensity: '91 kWh/m²',  nabers: '4.5 Stars', manager: 'G. Wilson' },
  { id: 8,  name: 'Riverside Complex', location: 'Hobart',    type: 'Mixed',      status: 'Active',   energy: '760 MWh',   intensity: '68 kWh/m²',  nabers: '5.0 Stars', manager: 'H. Brown' },
  { id: 9,  name: 'City Gate',         location: 'Darwin',    type: 'Retail',     status: 'Pending',  energy: '320 MWh',   intensity: '55 kWh/m²',  nabers: '—',         manager: 'I. Taylor' },
  { id: 10, name: 'Pinnacle Park',     location: 'Melbourne', type: 'Office',     status: 'Active',   energy: '2,100 MWh', intensity: '99 kWh/m²',  nabers: '5.0 Stars', manager: 'J. Moore' },
  { id: 11, name: 'Eastern Hub',       location: 'Sydney',    type: 'Industrial', status: 'Active',   energy: '5,800 MWh', intensity: '162 kWh/m²', nabers: '—',         manager: 'K. Davis' },
  { id: 12, name: 'Horizon Centre',    location: 'Brisbane',  type: 'Office',     status: 'Inactive', energy: '—',         intensity: '—',           nabers: '3.5 Stars', manager: 'L. Evans' },
]

const STATUS_BADGE: Record<Building['status'], BadgeVariant> = {
  Active:   'green',
  Pending:  'yellow',
  Inactive: 'grey',
  Review:   'purple',
}

// ── Column definitions ────────────────────────────────────────────────────────

const FULL_COLS: ColumnDef<Building>[] = [
  {
    key: 'name', label: 'Building', sortable: true, width: 'min-w-[160px]',
    type: 'text-details',
    accessor: r => r.name,
    accessorSecondary: r => r.location,
  },
  { key: 'type',    label: 'Type',    sortable: true },
  {
    key: 'status', label: 'Status', sortable: true, type: 'badge',
    accessor: r => r.status,
    badgeVariant: r => STATUS_BADGE[r.status],
  },
  {
    key: 'energy', label: 'Energy', sortable: true, align: 'right', width: 'min-w-[110px]',
    accessor: r => r.energy,
  },
  {
    key: 'intensity', label: 'Intensity', sortable: true, align: 'right', width: 'min-w-[120px]',
    type: 'text-suffix',
    accessor: r => r.intensity === '—' ? '—' : r.intensity.split(' ')[0],
    accessorSecondary: r => r.intensity.includes('kWh') ? 'kWh/m²' : '',
  },
  { key: 'nabers',   label: 'NABERS',  sortable: true, width: 'min-w-[100px]' },
  { key: 'manager',  label: 'Manager', sortable: true, width: 'min-w-[110px]' },
  { key: '_toolbar', label: '',        type: 'toolbar', width: 'w-24' },
]

const SIMPLE_COLS: ColumnDef<Building>[] = [
  { key: 'name',     label: 'Building', sortable: true },
  { key: 'location', label: 'Location', sortable: true },
  { key: 'type',     label: 'Type',     sortable: true },
  {
    key: 'status', label: 'Status', type: 'badge',
    accessor: r => r.status,
    badgeVariant: r => STATUS_BADGE[r.status],
  },
  { key: 'energy', label: 'Energy', align: 'right' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TablesPage() {
  const [selected, setSelected] = useState<(string | number)[]>([])

  return (
    <div>
      <PageHeader
        title="Table"
        description="Displays structured data in rows and columns. Supports sorting, row selection, pagination, inline actions, and skeleton loading."
        badge="Components"
      />

      <ComponentTabs>
        <TabBar />

        {/* ── USAGE ── */}
        <TabPanel id="usage">

          <Section title="Default">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Sortable columns, badge cells, text+details, text+suffix, and hover-reveal toolbar actions.
            </p>
            <Preview>
              <Table columns={FULL_COLS} data={BUILDINGS.slice(0, 6)} label="Buildings" />
            </Preview>
          </Section>

          <Section title="With selection and action bar">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Enable <code className="font-mono text-[13px] text-[#1258F8]">selectable</code> to add checkboxes. When rows are selected a floating action bar appears below the table.
            </p>
            <Preview>
              <Table
                columns={SIMPLE_COLS}
                data={BUILDINGS.slice(0, 6)}
                selectable
                selectedIds={selected}
                onSelectionChange={setSelected}
                actions={[
                  { label: 'Export',  onClick: () => {} },
                  { label: 'Archive', onClick: () => {} },
                  { label: 'Delete',  onClick: () => {} },
                ]}
                label="Buildings with selection"
              />
            </Preview>
            <Annotation>Select rows to trigger the floating action bar. Use "Select all" to extend selection to all records.</Annotation>
          </Section>

          <Section title="With pagination">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="font-mono text-[13px] text-[#1258F8]">pagination</code> to add a footer with page controls and a per-page size selector.
            </p>
            <Preview>
              <Table
                columns={SIMPLE_COLS}
                data={BUILDINGS}
                pagination
                pageSize={5}
                pageSizeOptions={[5, 10, 25]}
                label="Buildings paginated"
              />
            </Preview>
          </Section>

          <Section title="Loading state">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <code className="font-mono text-[13px] text-[#1258F8]">loading</code> to render animated skeleton rows while data is fetched.
            </p>
            <Preview>
              <Table columns={SIMPLE_COLS} data={[]} loading skeletonRows={5} label="Loading" />
            </Preview>
          </Section>

          <Section title="Empty state">
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              When <code className="font-mono text-[13px] text-[#1258F8]">data</code> is empty the table shows a centered empty state with title and description.
            </p>
            <Preview>
              <Table
                columns={SIMPLE_COLS}
                data={[]}
                emptyTitle="No buildings found"
                emptyDescription="Try adjusting your search or filter criteria."
                label="Empty table"
              />
            </Preview>
          </Section>

          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <DoCard>
              <UseList items={[
                'Structured datasets with multiple comparable attributes',
                'ESG data — buildings, meters, certifications, surveys',
                'Admin views, audit logs, data exports',
                'When users need to sort, filter, or bulk-act on rows',
              ]} />
            </DoCard>
            <DontCard>
              <DontUseList items={[
                'Small datasets that fit better in cards or a list',
                'Single-column content — use a plain list',
                'Deeply nested hierarchies — use a tree view',
                'As a substitute for a form layout',
              ]} />
            </DontCard>
          </div>

        </TabPanel>

        {/* ── SPECS ── */}
        <TabPanel id="specs">

          <Section title="Props">
            <SpecTable rows={[
              { property: 'columns',           value: 'ColumnDef<T>[]',         token: 'required — column definitions' },
              { property: 'data',              value: 'T[] (must have id)',      token: 'required — row records' },
              { property: 'selectable',        value: 'boolean',                token: 'default false — adds checkboxes' },
              { property: 'selectedIds',       value: '(string | number)[]',    token: 'controlled selection state' },
              { property: 'onSelectionChange', value: '(ids) => void',          token: 'fires on selection change' },
              { property: 'actions',           value: 'TableAction[]',          token: 'floating action bar items ({ label, onClick })' },
              { property: 'pagination',        value: 'boolean',                token: 'default false' },
              { property: 'pageSize',          value: 'number',                 token: 'default 10' },
              { property: 'pageSizeOptions',   value: 'number[]',               token: 'default [10, 25, 50]' },
              { property: 'loading',           value: 'boolean',                token: 'default false — skeleton rows' },
              { property: 'skeletonRows',      value: 'number',                 token: 'default 8' },
              { property: 'emptyTitle',        value: 'string',                 token: "default 'No data'" },
              { property: 'emptyDescription',  value: 'string',                 token: 'shown below empty title' },
              { property: 'label',             value: 'string',                 token: 'aria-label for the table element' },
            ]} />
          </Section>

          <Section title="ColumnDef shape">
            <SpecTable rows={[
              { property: 'key',               value: 'string',                                   token: 'required — unique id / data key' },
              { property: 'label',             value: 'string',                                   token: 'required — header text' },
              { property: 'type',              value: '"text" | "text-suffix" | "text-details" | "badge" | "toolbar" | "actions" | "custom"', token: 'default "text"' },
              { property: 'sortable',          value: 'boolean',                                  token: 'click header to sort asc → desc → off' },
              { property: 'width',             value: 'string',                                   token: 'Tailwind class e.g. "min-w-[120px]"' },
              { property: 'align',             value: '"left" | "right" | "center"',              token: 'default "left"' },
              { property: 'accessor',          value: '(row: T) => ReactNode',                    token: 'custom primary value' },
              { property: 'accessorSecondary', value: '(row: T) => string',                       token: 'suffix text or details line' },
              { property: 'badgeVariant',      value: '(row: T) => BadgeVariant',                 token: 'resolves badge colour per row' },
              { property: 'render',            value: '(row: T) => ReactNode',                    token: 'full custom renderer for actions/custom cells' },
            ]} />
          </Section>

          <Section title="Cell types">
            <SpecTable rows={[
              { property: 'text',         value: 'Plain truncated text',                              token: 'default' },
              { property: 'text-suffix',  value: 'Primary value + smaller muted suffix',              token: 'e.g. "82" + "kWh/m²"' },
              { property: 'text-details', value: 'Stacked primary + smaller muted second line',       token: 'e.g. building name + city' },
              { property: 'badge',        value: 'Colour pill — blue/green/red/yellow/grey/purple',   token: 'use badgeVariant resolver' },
              { property: 'toolbar',      value: 'Edit / Delete / More — appear on row hover only',   token: 'no config needed' },
              { property: 'actions',      value: 'Custom buttons or links',                           token: 'use render prop' },
              { property: 'custom',       value: 'Arbitrary React node',                              token: 'use render prop' },
            ]} />
          </Section>

          <Section title="Spacing & sizing">
            <SpecTable rows={[
              { property: 'Row height (single)',   value: '32px',                    token: 'py-2.5 px-3' },
              { property: 'Header height',         value: '32px',                    token: 'py-2.5 px-3' },
              { property: 'Header font',           value: '11px · semibold · caps',  token: 'text-[11px] font-semibold tracking-wide uppercase' },
              { property: 'Cell font',             value: '13px · regular',          token: 'text-[13px]' },
              { property: 'Pagination bar',        value: '40px',                    token: 'py-2.5' },
              { property: 'Border radius',         value: '8px',                     token: 'rounded-lg' },
            ]} />
          </Section>

          <Section title="Colors">
            <SpecTable rows={[
              { property: 'Header bg',         value: '#F7F8F8 · #0D1117 (dark)',   token: 'grey-50' },
              { property: 'Header text',       value: '#505867 · #9CA3AF (dark)',   token: 'grey-600' },
              { property: 'Row bg',            value: '#FFFFFF · #0D1117 (dark)',   token: 'white' },
              { property: 'Row hover',         value: '#F7F8F8 · white/3 (dark)',   token: 'grey-50' },
              { property: 'Row selected',      value: '#EEF6FF · white/5 (dark)',   token: 'blue-50' },
              { property: 'Row divider',       value: '#EDEEF1 · #1F2430 (dark)',   token: 'grey-100' },
              { property: 'Sort icon active',  value: '#1258F8',                    token: 'blue-600' },
              { property: 'Skeleton bar',      value: '#EDEEF1 · #1F2430 (dark)',   token: 'grey-100' },
              { property: 'Active page btn',   value: '#1258F8 bg · white text',    token: 'blue-600' },
            ]} />
          </Section>

        </TabPanel>

        {/* ── ACCESSIBILITY ── */}
        <TabPanel id="accessibility">

          <Section title="ARIA & semantics">
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <A11yRow check="<table>">Native HTML table — screen readers announce row/column counts automatically</A11yRow>
              <A11yRow check="aria-label">Set via the label prop — identifies the table to assistive technology</A11yRow>
              <A11yRow check='scope="col"'>Applied to every {'<th>'} — links header to its column for screen readers</A11yRow>
              <A11yRow check="aria-sort">Set on sortable headers — announces ascending, descending, or none</A11yRow>
              <A11yRow check="aria-current=page">Applied to the active pagination button</A11yRow>
              <A11yRow check="Checkbox labels">Each row checkbox has a unique aria-label; header checkbox is labelled "Select all rows"</A11yRow>
              <A11yRow check="Indeterminate">Header checkbox uses the indeterminate state when only some rows are selected</A11yRow>
            </div>
          </Section>

          <Section title="Keyboard interaction">
            <div className="flex flex-col gap-2">
              <KeyRow keys={['Tab']}            action="Move focus between checkboxes, sort headers, and pagination controls" />
              <KeyRow keys={['Enter', 'Space']} action="Toggle checkbox, activate sort header, change page" />
              <KeyRow keys={['←', '→']}         action="Navigate between pagination page buttons" />
            </div>
          </Section>

        </TabPanel>

      </ComponentTabs>

      <RelatedComponents
        items={[
          { href: '/components/badges-tags',    label: 'Tags & Indicators', description: 'Badge component used in status cells' },
          { href: '/components/inputs/search',  label: 'Search input',      description: 'Pair with a table for filterable data' },
          { href: '/components/modals',         label: 'Modal',             description: 'For edit/confirm actions triggered from rows' },
        ]}
      />
    </div>
  )
}
