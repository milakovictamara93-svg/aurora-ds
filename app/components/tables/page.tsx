'use client'

import { useState } from 'react'
import Table, { ColumnDef, BadgeVariant } from '@/app/components-lib/ui/Table'
import {
  ComponentPageLayout, TitleBlock, SectionWrapper,
  WhenToUse, DecisionTree, RequiredPairings, ForbiddenRefuse,
  AccessibilityList, Code,
} from '@/app/components-lib/ui/ComponentPage'
import { SpecTable } from '@/app/components-lib/ui/ComponentTabs'
import Tag from '@/app/components-lib/ui/Tag'

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
  { id: 1,  name: 'Scaler HQ',         location: 'Sydney',    type: 'Office',     status: 'Active',   energy: '1,240 MWh', intensity: '82 kWh/m\u00B2',  nabers: '5.5 Stars', manager: 'A. Nguyen' },
  { id: 2,  name: 'Meridian Tower',    location: 'Melbourne', type: 'Office',     status: 'Active',   energy: '2,810 MWh', intensity: '108 kWh/m\u00B2', nabers: '4.5 Stars', manager: 'B. Chen' },
  { id: 3,  name: 'West End Plaza',    location: 'Brisbane',  type: 'Retail',     status: 'Pending',  energy: '640 MWh',   intensity: '71 kWh/m\u00B2',  nabers: '\u2014',         manager: 'C. Park' },
  { id: 4,  name: 'Harbor View',       location: 'Perth',     type: 'Mixed',      status: 'Active',   energy: '3,100 MWh', intensity: '124 kWh/m\u00B2', nabers: '4.0 Stars', manager: 'D. Patel' },
  { id: 5,  name: 'Central Square',    location: 'Adelaide',  type: 'Office',     status: 'Inactive', energy: '\u2014',         intensity: '\u2014',           nabers: '3.0 Stars', manager: 'E. Smith' },
  { id: 6,  name: 'North Point',       location: 'Sydney',    type: 'Industrial', status: 'Active',   energy: '4,420 MWh', intensity: '148 kWh/m\u00B2', nabers: '\u2014',         manager: 'F. Lee' },
  { id: 7,  name: 'Southgate',         location: 'Canberra',  type: 'Office',     status: 'Review',   energy: '980 MWh',   intensity: '91 kWh/m\u00B2',  nabers: '4.5 Stars', manager: 'G. Wilson' },
  { id: 8,  name: 'Riverside Complex', location: 'Hobart',    type: 'Mixed',      status: 'Active',   energy: '760 MWh',   intensity: '68 kWh/m\u00B2',  nabers: '5.0 Stars', manager: 'H. Brown' },
  { id: 9,  name: 'City Gate',         location: 'Darwin',    type: 'Retail',     status: 'Pending',  energy: '320 MWh',   intensity: '55 kWh/m\u00B2',  nabers: '\u2014',         manager: 'I. Taylor' },
  { id: 10, name: 'Pinnacle Park',     location: 'Melbourne', type: 'Office',     status: 'Active',   energy: '2,100 MWh', intensity: '99 kWh/m\u00B2',  nabers: '5.0 Stars', manager: 'J. Moore' },
  { id: 11, name: 'Eastern Hub',       location: 'Sydney',    type: 'Industrial', status: 'Active',   energy: '5,800 MWh', intensity: '162 kWh/m\u00B2', nabers: '\u2014',         manager: 'K. Davis' },
  { id: 12, name: 'Horizon Centre',    location: 'Brisbane',  type: 'Office',     status: 'Inactive', energy: '\u2014',         intensity: '\u2014',           nabers: '3.5 Stars', manager: 'L. Evans' },
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
    accessor: r => r.intensity === '\u2014' ? '\u2014' : r.intensity.split(' ')[0],
    accessorSecondary: r => r.intensity.includes('kWh') ? 'kWh/m\u00B2' : '',
  },
  { key: 'nabers',   label: 'NABERS',  sortable: true, width: 'min-w-[100px]' },
  { key: 'manager',  label: 'Manager', sortable: true, width: 'min-w-[110px]' },
  { key: '_toolbar', label: 'Actions',  type: 'toolbar', width: 'w-24' },
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

// ── Demo columns for row action examples ─────────────────────────────────────

const ICON_ONLY_COLS: ColumnDef<Building>[] = [
  { key: 'name', label: 'Building', sortable: true },
  { key: 'type', label: 'Type' },
  {
    key: 'status', label: 'Status', type: 'badge',
    accessor: r => r.status,
    badgeVariant: r => STATUS_BADGE[r.status],
  },
  { key: '_toolbar', label: 'Actions', type: 'toolbar', width: 'w-24' },
]

const TEXT_ACTION_COLS: ColumnDef<Building>[] = [
  { key: 'name', label: 'Building' },
  { key: 'type', label: 'Type' },
  {
    key: '_action', label: 'Actions', type: 'actions', align: 'right',
    render: () => (
      <a href="#" className="text-[13px] text-[#1258F8] underline underline-offset-2 hover:text-[#1146E4] transition-colors">
        Reassign audit
      </a>
    ),
  },
]

const BULK_COLS: ColumnDef<Building>[] = [
  { key: 'name', label: 'Building' },
  { key: 'type', label: 'Type' },
  { key: 'energy', label: 'Energy', align: 'right' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

const TOTAL = '09'

export default function TablePage() {
  const [selected, setSelected] = useState<(string | number)[]>([])
  const [bulkSelected, setBulkSelected] = useState<(string | number)[]>([1, 2])

  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Table"
        description="Displays structured data in rows and columns. Supports sorting, row selection, pagination, inline actions, and skeleton loading."
      />

      {/* ── 01 When to use ──────────────────────────────────────────────────── */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use, when not to use">
        <WhenToUse
          doItems={[
            <>Structured datasets with multiple comparable attributes</>,
            <>ESG data: buildings, meters, certifications, surveys</>,
            <>Admin views, audit logs, data exports</>,
            <>When users need to sort, filter, or bulk-act on rows</>,
          ]}
          dontItems={[
            <>Small datasets that fit better in cards or a list</>,
            <>Single-column content: use a plain list</>,
            <>Deeply nested hierarchies: use a tree view</>,
            <>As a substitute for a form layout</>,
          ]}
        />
      </SectionWrapper>

      {/* ── 02 Decision tree ────────────────────────────────────────────────── */}
      <SectionWrapper id="decision-tree" num="02" total={TOTAL} title="Decision tree against neighbours">
        <DecisionTree rows={[
          { intent: 'Display rows of structured data', use: <Code>Table</Code>, not: <Code>Card</Code> },
          { intent: 'Display unstructured content items', use: <Code>Card</Code>, not: <Code>Table</Code> },
          { intent: 'Show a single record detail', use: <Code>Drawer</Code>, not: <Code>Table</Code> },
          { intent: 'Show summary KPIs', use: <Code>Mini dashboard</Code>, not: <Code>Table</Code> },
        ]} />
      </SectionWrapper>

      {/* ── 03 Variants ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="variants" num="03" total={TOTAL} title="Variants">

        <div className="space-y-8">
          {/* Default */}
          <div>
            <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-1">Default</p>
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Sortable columns, badge cells, text+details, text+suffix, and hover-reveal toolbar actions.
            </p>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <Table columns={FULL_COLS} data={BUILDINGS.slice(0, 6)} label="Buildings" />
            </div>
          </div>

          {/* With selection */}
          <div>
            <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-1">With selection and action bar</p>
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Enable <Code>selectable</Code> to add checkboxes. When rows are selected a floating action bar appears below the table.
            </p>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
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
            </div>
          </div>

          {/* With pagination */}
          <div>
            <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-1">With pagination</p>
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <Code>pagination</Code> to add a footer with page controls and a per-page size selector.
            </p>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <Table
                columns={SIMPLE_COLS}
                data={BUILDINGS}
                pagination
                pageSize={5}
                pageSizeOptions={[5, 10, 25]}
                label="Buildings paginated"
              />
            </div>
          </div>

          {/* Loading state */}
          <div>
            <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-1">Loading state</p>
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              Set <Code>loading</Code> to render animated skeleton rows while data is fetched.
            </p>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <Table columns={SIMPLE_COLS} data={[]} loading skeletonRows={5} label="Loading" />
            </div>
          </div>

          {/* Empty state */}
          <div>
            <p className="text-[14px] font-medium text-[#111827] dark:text-white mb-1">Empty state</p>
            <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-4">
              When <Code>data</Code> is empty the table shows a centered empty state with title and description.
            </p>
            <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
              <Table
                columns={SIMPLE_COLS}
                data={[]}
                emptyTitle="No buildings found"
                emptyDescription="Try adjusting your search or filter criteria."
                label="Empty table"
              />
            </div>
          </div>
        </div>

      </SectionWrapper>

      {/* ── 04 API ──────────────────────────────────────────────────────────── */}
      <SectionWrapper id="api" num="04" total={TOTAL} title="API">
        <SpecTable rows={[
          { property: 'columns',           value: 'ColumnDef<T>[]',         token: 'required -- column definitions' },
          { property: 'data',              value: 'T[] (must have id)',      token: 'required -- row records' },
          { property: 'selectable',        value: 'boolean',                token: 'default false -- adds checkboxes' },
          { property: 'selectedIds',       value: '(string | number)[]',    token: 'controlled selection state' },
          { property: 'onSelectionChange', value: '(ids) => void',          token: 'fires on selection change' },
          { property: 'actions',           value: 'TableAction[]',          token: 'floating action bar items ({ label, onClick })' },
          { property: 'pagination',        value: 'boolean',                token: 'default false' },
          { property: 'pageSize',          value: 'number',                 token: 'default 10' },
          { property: 'pageSizeOptions',   value: 'number[]',               token: 'default [10, 25, 50]' },
          { property: 'loading',           value: 'boolean',                token: 'default false -- skeleton rows' },
          { property: 'skeletonRows',      value: 'number',                 token: 'default 8' },
          { property: 'emptyTitle',        value: 'string',                 token: "default 'No data'" },
          { property: 'emptyDescription',  value: 'string',                 token: 'shown below empty title' },
          { property: 'label',             value: 'string',                 token: 'aria-label for the table element' },
        ]} />
      </SectionWrapper>

      {/* ── 05 ColumnDef shape ──────────────────────────────────────────────── */}
      <SectionWrapper id="column-def" num="05" total={TOTAL} title="ColumnDef shape">
        <SpecTable rows={[
          { property: 'key',               value: 'string',                                   token: 'required -- unique id / data key' },
          { property: 'label',             value: 'string',                                   token: 'required -- header text' },
          { property: 'type',              value: '"text" | "text-suffix" | "text-details" | "badge" | "toolbar" | "actions" | "custom"', token: 'default "text"' },
          { property: 'sortable',          value: 'boolean',                                  token: 'click header to sort asc > desc > off' },
          { property: 'width',             value: 'string',                                   token: 'Tailwind class e.g. "min-w-[120px]"' },
          { property: 'align',             value: '"left" | "right" | "center"',              token: 'default "left"' },
          { property: 'accessor',          value: '(row: T) => ReactNode',                    token: 'custom primary value' },
          { property: 'accessorSecondary', value: '(row: T) => string',                       token: 'suffix text or details line' },
          { property: 'badgeVariant',      value: '(row: T) => BadgeVariant',                 token: 'resolves badge colour per row' },
          { property: 'render',            value: '(row: T) => ReactNode',                    token: 'full custom renderer for actions/custom cells' },
        ]} />
      </SectionWrapper>

      {/* ── 06 Required pairings ────────────────────────────────────────────── */}
      <SectionWrapper id="required-pairings" num="06" total={TOTAL} title="Required pairings">
        <RequiredPairings rules={[
          <>Every column needs a header label. No unlabelled columns.</>,
          <>Sortable columns show a sort indicator (arrow). Default sort must be applied on load.</>,
          <>Row selection requires a checkbox column as the first column.</>,
          <>Empty state: show a message and optional action when no rows match filters.</>,
        ]} />
      </SectionWrapper>

      {/* ── 07 Row action formats ────────────────────────────────────────────── */}
      <SectionWrapper id="row-actions" num="07" total={TOTAL} title="Row action formats">
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed mb-6">
          Three formats exist for row-level actions. Default to icon-only toolbar. Text-only actions are strongly discouraged.
        </p>

        {/* ── Visual examples ── */}
        <div className="space-y-8 mb-8">

          {/* Icon-only example */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag system="success" size="small" label="Preferred" showCount={false} showRemove={false} />
              <p className="text-[14px] font-medium text-[#111827] dark:text-white">Icon-only (hover-reveal toolbar)</p>
            </div>
            <Table
              columns={ICON_ONLY_COLS}
              data={BUILDINGS.slice(0, 3)}
              label="Icon-only row actions demo"
            />
            <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mt-2">
              Hover any row to reveal the edit, delete, and overflow menu icons.
            </p>
          </div>

          {/* Icon + label example */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag system="default" size="small" label="Required for bulk" showCount={false} showRemove={false} />
              <p className="text-[14px] font-medium text-[#111827] dark:text-white">Icon + label (floating action bar)</p>
            </div>
            <Table
              columns={BULK_COLS}
              data={BUILDINGS.slice(0, 3)}
              selectable
              selectedIds={bulkSelected}
              onSelectionChange={setBulkSelected}
              actions={[
                { label: 'Export',  onClick: () => {} },
                { label: 'Archive', onClick: () => {} },
                { label: 'Delete',  onClick: () => {} },
              ]}
              label="Icon + label row actions demo"
            />
            <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mt-2">
              Select rows to trigger the floating action bar with icon + label buttons.
            </p>
          </div>

          {/* Text-only example (discouraged) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag system="error" size="small" label="Discouraged" showCount={false} showRemove={false} />
              <p className="text-[14px] font-medium text-[#111827] dark:text-white">Text-only (last resort)</p>
            </div>
            <Table
              columns={TEXT_ACTION_COLS}
              data={BUILDINGS.slice(0, 2)}
              label="Text-only row actions demo"
            />
            <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] mt-2">
              Only use when no recognizable icon exists for the action. Must use brand color link styling.
            </p>
          </div>

        </div>

        <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden text-[13px]">
          <div className="grid grid-cols-[140px_1fr_1fr] gap-px bg-[#EDEEF1] dark:bg-[#1F2430]">
            <div className="bg-[#F7F8F8] dark:bg-[#0D1117] px-3 py-2.5 font-semibold text-[11px] text-[#505867] dark:text-[#9CA3AF]">Format</div>
            <div className="bg-[#F7F8F8] dark:bg-[#0D1117] px-3 py-2.5 font-semibold text-[11px] text-[#505867] dark:text-[#9CA3AF]">When to use</div>
            <div className="bg-[#F7F8F8] dark:bg-[#0D1117] px-3 py-2.5 font-semibold text-[11px] text-[#505867] dark:text-[#9CA3AF]">Rules</div>

            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 font-medium text-[#1F2430] dark:text-white">Icon-only</div>
            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Default for individual row actions. Standard operations users perform frequently: edit, delete, view, download.</div>
            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Max 2-3 visible icons. Hover-reveal with keyboard accessibility (visible on row focus). Must have aria-label. Use 20px icons. Include overflow menu (ellipsis) when 3+ actions exist.</div>

            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 font-medium text-[#1F2430] dark:text-white">Icon + label</div>
            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Bulk actions on selected rows (floating action bar). Also use when an icon alone would be ambiguous for the action.</div>
            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Always pair icon with text label. This is the required format for the floating action bar.</div>

            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 font-medium text-[#1F2430] dark:text-white">Text-only</div>
            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Last resort only. Reserved for domain-specific actions where no recognizable icon exists (e.g. "Reassign audit").</div>
            <div className="bg-white dark:bg-[#0D1117] px-3 py-2.5 text-[#505867] dark:text-[#9CA3AF]">Avoid unless absolutely necessary. One per row maximum. Must use link styling (brand color, underline on hover). Never mix with icon-only toolbar in the same row.</div>
          </div>
        </div>

        <div className="mt-6">
          <RequiredPairings rules={[
            <>Default to icon-only toolbar for individual row actions.</>,
            <>Use icon + label in the floating action bar for bulk operations.</>,
            <>Put destructive actions in overflow menu or behind confirmation.</>,
            <>Ensure hover-reveal actions are keyboard accessible (visible on focus).</>,
            <>Provide aria-label on every icon-only button.</>,
          ]} />
        </div>

        <div className="mt-6">
          <ForbiddenRefuse rules={[
            { rule: <>Use text-only actions when a standard icon exists (edit, delete, view, download, copy, share).</>, response: <>"Use icon-only toolbar. These actions have universally recognized icons."</> },
            { rule: <>Mix text-only and icon-only actions in the same row.</>, response: <>"Pick one format per row. Mixing creates visual inconsistency."</> },
            { rule: <>Show more than 3 action icons without an overflow menu.</>, response: <>"Collapse additional actions into an ellipsis overflow menu."</> },
            { rule: <>Use text-only as a default action format.</>, response: <>"Text-only is a last resort. Default to icon-only toolbar."</> },
          ]} />
        </div>
      </SectionWrapper>

      {/* ── 08 Forbidden and refuse ─────────────────────────────────────────── */}
      <SectionWrapper id="forbidden" num="08" total={TOTAL} title="Forbidden and refuse">
        <ForbiddenRefuse rules={[
          { rule: <>Render a table without column headers.</>, response: <>"Column headers are required for accessibility and comprehension."</> },
          { rule: <>Use a table for layout purposes.</>, response: <>"Tables are for data. Use CSS grid or flex for layout."</> },
          { rule: <>Nest interactive tables inside tables.</>, response: <>"Use a Drawer or expandable row for detail views."</> },
        ]} />
      </SectionWrapper>

      {/* ── 08 Accessibility ────────────────────────────────────────────────── */}
      <SectionWrapper id="accessibility" num="09" total={TOTAL} title="Accessibility">
        <AccessibilityList items={[
          { key: 'Role', value: <>Native <Code>&lt;table&gt;</Code> with <Code>&lt;thead&gt;</Code>, <Code>&lt;tbody&gt;</Code>, <Code>&lt;th scope="col"&gt;</Code>.</> },
          { key: 'Sorting', value: <><Code>aria-sort="ascending|descending|none"</Code> on sortable column headers.</> },
          { key: 'Selection', value: <>Checkboxes with <Code>aria-label</Code> describing the row they select.</> },
          { key: 'Keyboard', value: <><Code>Tab</Code> moves between interactive elements. <Code>Enter</Code> or <Code>Space</Code> activates sort headers, checkboxes, and pagination controls.</> },
          { key: 'Focus', value: <>Visible focus ring on all interactive elements. 3:1 minimum contrast against surrounding surface.</> },
          { key: 'Pagination', value: <><Code>aria-current="page"</Code> on the active page button. Arrow keys navigate between page buttons.</> },
          { key: 'Contrast', value: <>All text meets WCAG AA (4.5:1) against row backgrounds in both light and dark modes.</> },
        ]} />
      </SectionWrapper>

    </ComponentPageLayout>
  )
}
