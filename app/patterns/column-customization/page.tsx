'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Modal from '@/app/components-lib/ui/Modal'
import { MagnifyingGlassIcon, TableCellsIcon } from '@heroicons/react/20/solid'

// ── Column data ────────────────────────────────────────────────────────────────

interface ColItem {
  id:    string
  label: string
}

interface ColGroup {
  id:    string
  label: string
  items: ColItem[]
}

const COLUMN_GROUPS: ColGroup[] = [
  {
    id: 'asset-details',
    label: 'Asset details',
    items: [
      { id: 'client-id',    label: 'Client ID' },
      { id: 'asset-name',   label: 'Asset name' },
      { id: 'location',     label: 'Location' },
      { id: 'asset-type',   label: 'Asset type' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: [
      { id: 'data-completeness', label: 'Data completeness' },
      { id: 'data-coverage',     label: 'Data coverage' },
    ],
  },
  {
    id: 'intensity',
    label: 'Intensity',
    items: [
      { id: 'energy-intensity', label: 'Energy intensity' },
      { id: 'ghg-intensity',    label: 'GHG intensity' },
      { id: 'water-intensity',  label: 'Water intensity' },
    ],
  },
  {
    id: 'consumption',
    label: 'Consumption',
    items: [
      { id: 'energy',       label: 'Energy' },
      { id: 'ghg',          label: 'GHG emissions' },
      { id: 'water',        label: 'Water' },
      { id: 'waste',        label: 'Waste' },
    ],
  },
  {
    id: 'year-stranded',
    label: 'Year stranded',
    items: [
      { id: 'ys-energy',  label: 'Year stranded after measures (Energy)' },
      { id: 'ys-crrem',   label: 'Year stranded (CRREM 1.5°C, CO2)' },
    ],
  },
  {
    id: 'like-for-like',
    label: 'Like-for-like',
    items: [
      { id: 'lfl-energy', label: 'Energy' },
      { id: 'lfl-ghg',    label: 'GHG' },
    ],
  },
  {
    id: 'rating',
    label: 'Rating',
    items: [
      { id: 'rating-energy', label: 'Energy' },
      { id: 'rating-epc',    label: 'Cox. area energy rating' },
    ],
  },
  {
    id: 'certifications',
    label: 'Certifications',
    items: [
      { id: 'cert-operational',     label: 'Operational' },
      { id: 'cert-design',          label: 'Design/construction' },
      { id: 'cert-ops-area',        label: 'Cox. area operational certificate' },
      { id: 'cert-design-area',     label: 'Cox. area design/construction certificate' },
    ],
  },
]

// Default: all columns selected
const DEFAULT_SELECTION: Record<string, string[]> = Object.fromEntries(
  COLUMN_GROUPS.map(g => [g.id, g.items.map(i => i.id)])
)

// Total column count
const TOTAL_COLS = COLUMN_GROUPS.reduce((sum, g) => sum + g.items.length, 0)

// ── Column section wrapper (mirrors FilterSection) ─────────────────────────────

function ColumnSection({
  title,
  onClear,
  children,
}: {
  title:    string
  onClear:  () => void
  children: React.ReactNode
}) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="text-[14px] font-semibold text-[#111827] dark:text-white">{title}</p>
        <button
          onClick={onClear}
          className="text-[13px] font-medium text-[#1258F8] hover:text-[#1146E4] transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="pt-3">{children}</div>
    </div>
  )
}

// ── Panel content (rendered inside drawer) ────────────────────────────────────

function ColumnPanelContent({
  draft,
  setDraft,
}: {
  draft:    Record<string, string[]>
  setDraft: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}) {
  const [search, setSearch] = useState('')

  const q = search.toLowerCase()

  // Filter groups/items by search query
  const visibleGroups = useMemo(() =>
    COLUMN_GROUPS
      .map(g => ({
        ...g,
        items: g.items.filter(i => i.label.toLowerCase().includes(q)),
      }))
      .filter(g => g.items.length > 0),
    [q]
  )

  const allSelected = COLUMN_GROUPS.every(g =>
    g.items.every(i => draft[g.id]?.includes(i.id))
  )

  function selectAll() {
    setDraft(Object.fromEntries(
      COLUMN_GROUPS.map(g => [g.id, g.items.map(i => i.id)])
    ))
  }

  function deselectAll() {
    setDraft(Object.fromEntries(COLUMN_GROUPS.map(g => [g.id, []])))
  }

  function toggle(groupId: string, itemId: string) {
    setDraft(prev => {
      const current = prev[groupId] ?? []
      return {
        ...prev,
        [groupId]: current.includes(itemId)
          ? current.filter(x => x !== itemId)
          : [...current, itemId],
      }
    })
  }

  return (
    <div>
      {/* Global header row: search + select all */}
      <div className="flex items-center gap-2 mb-1">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search columns…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[13px] text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#1258F8] transition-colors"
          />
        </div>
        <button
          onClick={allSelected ? deselectAll : selectAll}
          className="text-[13px] font-medium text-[#1258F8] hover:text-[#1146E4] transition-colors whitespace-nowrap"
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>

      {/* Groups */}
      <div className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
        {visibleGroups.map(group => (
          <ColumnSection
            key={group.id}
            title={group.label}
            onClear={() => setDraft(prev => ({ ...prev, [group.id]: [] }))}
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {group.items.map(item => {
                const checked = (draft[group.id] ?? []).includes(item.id)
                return (
                  <label key={item.id} className="flex items-start gap-2 py-0.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(group.id, item.id)}
                      className="mt-[2px] w-3.5 h-3.5 rounded border-[#D7DAE0] accent-[#1258F8] shrink-0"
                    />
                    <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-snug">{item.label}</span>
                  </label>
                )
              })}
            </div>
          </ColumnSection>
        ))}

        {visibleGroups.length === 0 && (
          <p className="py-8 text-center text-[13px] text-[#C4C9D4] dark:text-[#3F4654]">No columns match &quot;{search}&quot;</p>
        )}
      </div>
    </div>
  )
}

// ── Column customizer demo ─────────────────────────────────────────────────────

function ColumnCustomizerDemo() {
  const [applied, setApplied] = useState<Record<string, string[]>>(DEFAULT_SELECTION)
  const [draft,   setDraft]   = useState<Record<string, string[]>>(DEFAULT_SELECTION)
  const [open,    setOpen]    = useState(false)

  const selectedCount = Object.values(applied).reduce((sum, ids) => sum + ids.length, 0)
  const hiddenCount   = TOTAL_COLS - selectedCount
  const isCustomised  = hiddenCount > 0

  function openDrawer() {
    setDraft(applied)
    setOpen(true)
  }

  function apply() {
    setApplied(draft)
    setOpen(false)
  }

  // Build mock table columns from applied state
  const visibleColumns = COLUMN_GROUPS.flatMap(g =>
    g.items.filter(i => (applied[g.id] ?? []).includes(i.id))
  )

  return (
    <>
      <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
        <div className="px-4 py-2 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
          <span className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF]">
            Column customizer — click "Customize" to open the drawer
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-[#0D1117]">
          {/* Toolbar row */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">
              {selectedCount} of {TOTAL_COLS} columns visible
              {isCustomised && (
                <span className="ml-1 text-[#1258F8]">({hiddenCount} hidden)</span>
              )}
            </p>
            <button
              onClick={openDrawer}
              className={[
                'inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-[13px] font-medium border transition-colors',
                isCustomised
                  ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/15 border-[#1258F8] text-[#1258F8]'
                  : 'bg-white dark:bg-[#111827] border-[#D7DAE0] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] hover:border-[#1258F8] hover:text-[#1258F8]',
              ].join(' ')}
            >
              <TableCellsIcon className="w-4 h-4" />
              Customize
            </button>
          </div>

          {/* Mock table header showing active columns */}
          <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead className="bg-[#F7F8F8] dark:bg-[#111827] border-b border-[#EDEEF1] dark:border-[#1F2430]">
                  <tr>
                    {visibleColumns.slice(0, 8).map(col => (
                      <th key={col.id} className="px-3 py-2 text-left font-semibold text-[#505867] dark:text-[#9CA3AF] whitespace-nowrap">
                        {col.label}
                      </th>
                    ))}
                    {visibleColumns.length > 8 && (
                      <th className="px-3 py-2 text-left font-semibold text-[#9CA3AF] dark:text-[#3F4654] whitespace-nowrap">
                        +{visibleColumns.length - 8} more
                      </th>
                    )}
                    {visibleColumns.length === 0 && (
                      <th className="px-3 py-2 text-left text-[#C4C9D4] dark:text-[#3F4654]">
                        No columns selected
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#0D1117]">
                  {['Asset A', 'Asset B', 'Asset C'].map(row => (
                    <tr key={row} className="hover:bg-[#F7F8F8] dark:hover:bg-[#111827] transition-colors">
                      {visibleColumns.slice(0, 8).map((col, ci) => (
                        <td key={col.id} className="px-3 py-2 text-[#505867] dark:text-[#9CA3AF] whitespace-nowrap">
                          {ci === 0 ? row : '—'}
                        </td>
                      ))}
                      {visibleColumns.length > 8 && <td className="px-3 py-2" />}
                      {visibleColumns.length === 0 && <td className="px-3 py-2 text-[#C4C9D4]">—</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        type="drawer"
        title="Customize view"
        secondaryLabel="Cancel"
        secondaryAction={() => setOpen(false)}
        primaryLabel="Apply"
        primaryAction={apply}
      >
        <ColumnPanelContent draft={draft} setDraft={setDraft} />
      </Modal>
    </>
  )
}

// ── Spec row ──────────────────────────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
      <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF] w-44 shrink-0">{label}</span>
      <span className="text-[13px] text-[#111827] dark:text-white">{value}</span>
    </div>
  )
}

function RuleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
      <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{title}</p>
      <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{children}</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ColumnCustomizationPage() {
  return (
    <div>
      <PageHeader
        title="Column customization"
        description="Patterns for letting users control which table columns are visible — a Customize button that opens a Drawer with grouped checkbox lists, search, and per-group clear controls."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-12">

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">Customize view drawer</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            The <strong className="font-semibold text-[#111827] dark:text-white">Customize</strong> button opens a <strong className="font-semibold text-[#111827] dark:text-white">Modal (drawer)</strong> listing all available columns grouped by category. Each group has a "Clear" link. A global search filters across all groups. Changes take effect only when "Apply" is pressed.
          </p>
          <ColumnCustomizerDemo />
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Behaviour specs</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            <SpecRow label="Trigger button" value="'Customize' with TableCells icon. Gets blue-tinted active state when any columns are hidden." />
            <SpecRow label="Draft vs applied" value="Drawer works on a draft copy. Cancel discards changes; Apply saves them and updates the table." />
            <SpecRow label="Select all / Deselect all" value="Global toggle at top of panel selects or clears every column across all groups." />
            <SpecRow label="Per-group Clear" value="Deselects all items in that group only, without touching other groups." />
            <SpecRow label="Search" value="Filters all group items in real time. Groups with no matching items are hidden." />
            <SpecRow label="Checkbox grid" value="2-column grid within each group to maximise density for long lists." />
            <SpecRow label="Default state" value="All columns selected. Users hide columns, not show them — opt-out model." />
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Column layout specs</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            <SpecRow label="Drawer width" value="480px max (from Modal drawer)" />
            <SpecRow label="Section header" value="14px semibold + 'Clear' text button right-aligned + border-b separator" />
            <SpecRow label="Checkbox size" value="14×14px, accent-blue-600" />
            <SpecRow label="Item label" value="13px regular, grey-600" />
            <SpecRow label="Grid gap" value="16px column gap, 4px row gap" />
            <SpecRow label="Section gap" value="16px top/bottom padding, divided by border-[#EDEEF1]" />
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RuleCard title="Opt-out, not opt-in">
              All columns are visible by default. Users remove columns they don't need. This avoids an empty table on first use.
            </RuleCard>
            <RuleCard title="Persist selection">
              Save the column selection to localStorage or user preferences so it survives page refreshes. Don't reset on every load.
            </RuleCard>
            <RuleCard title="Apply is required">
              Column changes are staged in a draft state. The table only updates when the user presses Apply — prevents accidental mid-edit reflows.
            </RuleCard>
            <RuleCard title="Group by data domain">
              Group columns by their data category (Intensity, Consumption, Certifications…) matching the structure users know from reports — not alphabetically.
            </RuleCard>
            <RuleCard title="Customize button signals state">
              When any columns are hidden, give the button a blue-tinted bg and border so users know the view is customised. Mirrors the active state of the Filter button.
            </RuleCard>
            <RuleCard title="Search does not filter applied state">
              Searching inside the drawer filters which options are visible, but does not remove already-selected columns from the applied state.
            </RuleCard>
          </div>
        </section>

      </div>
    </div>
  )
}
