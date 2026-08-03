'use client'

import { useState, useCallback } from 'react'
import {
  ComponentPageLayout,
  TitleBlock,
  SectionWrapper,
  WhenToUse,
  RequiredPairings,
  ForbiddenRefuse,
  Code,
} from '@/app/components-lib/ui/ComponentPage'

const TOTAL = '07'

// ── Drag handle icon ──────────────────────────────────────────────────────────

function GripIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="3"  cy="2"  r="1.5" />
      <circle cx="9"  cy="2"  r="1.5" />
      <circle cx="3"  cy="6"  r="1.5" />
      <circle cx="9"  cy="6"  r="1.5" />
      <circle cx="3"  cy="10" r="1.5" />
      <circle cx="9"  cy="10" r="1.5" />
    </svg>
  )
}

// ── Static state cards (for visual guide) ─────────────────────────────────────

function StateCard({
  label,
  state,
}: {
  label: string
  state: 'default' | 'dragging' | 'over' | 'dropped'
}) {
  const isDragging = state === 'dragging'
  const isOver     = state === 'over'
  const isDropped  = state === 'dropped'

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">{label}</p>
      <div
        className={[
          'flex items-center gap-3 px-4 py-3.5 rounded-lg border transition-all',
          isDragging ? 'bg-white dark:bg-[#111827] border-[#EDEEF1] dark:border-[#1F2430] shadow-lg rotate-[1.5deg] opacity-90' : '',
          isOver     ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/10 border-[#1258F8]' : '',
          isDropped  ? 'bg-white dark:bg-[#111827] border-[#1258F8] ring-2 ring-[#1258F8]/30' : '',
          !isDragging && !isOver && !isDropped
            ? 'bg-white dark:bg-[#111827] border-[#EDEEF1] dark:border-[#1F2430]'
            : '',
        ].join(' ')}
      >
        <GripIcon
          className={[
            isDragging ? 'text-[#505867] dark:text-[#9CA3AF]' : '',
            isOver     ? 'text-[#1258F8]' : '',
            isDropped  ? 'text-[#1258F8]' : '',
            !isDragging && !isOver && !isDropped ? 'text-[#D7DAE0] dark:text-[#374151]' : '',
          ].join(' ')}
        />
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-snug">Title</p>
          <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-snug">Optional subtitle</p>
        </div>
      </div>
    </div>
  )
}

// ── Interactive list reorder demo ─────────────────────────────────────────────

interface DragItem {
  id: string
  title: string
  subtitle: string
}

const INITIAL_ITEMS: DragItem[] = [
  { id: '1', title: 'Energy monitoring',     subtitle: 'Track consumption across all sites' },
  { id: '2', title: 'GHG emissions',         subtitle: 'Scope 1, 2 and 3 reporting' },
  { id: '3', title: 'Water usage',           subtitle: 'Consumption and discharge tracking' },
  { id: '4', title: 'Waste management',      subtitle: 'Diversion rate and recycling data' },
  { id: '5', title: 'Data quality checks',   subtitle: 'Readiness, coverage and reliability' },
]

function ListReorderDemo() {
  const [items,    setItems]   = useState<DragItem[]>(INITIAL_ITEMS)
  const [dragging, setDragging] = useState<string | null>(null)
  const [over,     setOver]     = useState<string | null>(null)
  const [dropped,  setDropped]  = useState<string | null>(null)

  const handleDragStart = useCallback((id: string) => {
    setDragging(id)
    setDropped(null)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (id !== dragging) setOver(id)
  }, [dragging])

  const handleDrop = useCallback((targetId: string) => {
    if (!dragging || dragging === targetId) {
      setDragging(null)
      setOver(null)
      return
    }
    setItems(prev => {
      const from = prev.findIndex(i => i.id === dragging)
      const to   = prev.findIndex(i => i.id === targetId)
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    setDropped(dragging)
    setDragging(null)
    setOver(null)
    setTimeout(() => setDropped(null), 800)
  }, [dragging])

  const handleDragEnd = useCallback(() => {
    setDragging(null)
    setOver(null)
  }, [])

  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <div className="px-4 py-3 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="text-[14px] font-semibold text-[#1F2430] dark:text-white">Drag to reorder</p>
        <p className="text-[12px] text-[#9CA3AF] mt-0.5">Grab the handle on the left to move items</p>
      </div>
      <div className="p-4 flex flex-col gap-2 bg-white dark:bg-[#111827]">
        {items.map((item) => {
          const isDragging = dragging === item.id
          const isOver     = over     === item.id
          const isDropped  = dropped  === item.id
          return (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDrop={() => handleDrop(item.id)}
              onDragEnd={handleDragEnd}
              className={[
                'group flex items-center gap-3 px-4 py-3.5 rounded-lg border select-none transition-all duration-150',
                isDragging ? 'opacity-40 border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]' : '',
                isOver && !isDragging ? 'border-[#1258F8] bg-[#EEF6FF] dark:bg-[#1258F8]/10 scale-[1.01]' : '',
                isDropped ? 'border-[#1258F8] ring-2 ring-[#1258F8]/20 bg-white dark:bg-[#111827]' : '',
                !isDragging && !isOver && !isDropped
                  ? 'border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] hover:border-[#D7DAE0] dark:hover:border-[#374151] hover:shadow-sm'
                  : '',
              ].join(' ')}
            >
              {/* Drag handle */}
              <div className="cursor-grab active:cursor-grabbing shrink-0 p-1 -ml-1 rounded">
                <GripIcon
                  className={[
                    'transition-colors duration-150',
                    isOver || isDropped
                      ? 'text-[#1258F8]'
                      : 'text-[#D7DAE0] dark:text-[#374151] group-hover:text-[#9CA3AF] dark:group-hover:text-[#6B7280]',
                  ].join(' ')}
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-[#111827] dark:text-white leading-snug">{item.title}</p>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-snug">{item.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Interactive table column reorder demo ─────────────────────────────────────

const INITIAL_COLUMNS = [
  { id: 'name',    header: 'Asset name',  required: true  },
  { id: 'type',    header: 'Type',        required: false },
  { id: 'eui',     header: 'EUI',         required: false },
  { id: 'ghg',     header: 'GHG',         required: false },
  { id: 'status',  header: 'Status',      required: false },
]

const ROWS = [
  ['180 George St', 'Office',    '142 kWh', '28 tCO₂e', '●'],
  ['1 Bligh St',    'Office',    '168 kWh', '34 tCO₂e', '●'],
  ['Collins Sq',    'Mixed use', '124 kWh', '21 tCO₂e', '●'],
  ['333 George St', 'Retail',    '195 kWh', '41 tCO₂e', '●'],
]

function TableColumnReorderDemo() {
  const [columns,   setColumns]   = useState(INITIAL_COLUMNS)
  const [dragging,  setDragging]  = useState<string | null>(null)
  const [over,      setOver]      = useState<string | null>(null)
  const [dropped,   setDropped]   = useState<string | null>(null)

  function handleDragStart(id: string) {
    setDragging(id)
    setDropped(null)
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault()
    if (id !== dragging) setOver(id)
  }

  function handleDrop(targetId: string) {
    if (!dragging || dragging === targetId) {
      setDragging(null); setOver(null); return
    }
    setColumns(prev => {
      const from = prev.findIndex(c => c.id === dragging)
      const to   = prev.findIndex(c => c.id === targetId)
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    setDropped(dragging)
    setDragging(null)
    setOver(null)
    setTimeout(() => setDropped(null), 800)
  }

  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <div className="px-4 py-3 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <p className="text-[14px] font-semibold text-[#1F2430] dark:text-white">Drag to reorder columns</p>
        <p className="text-[12px] text-[#9CA3AF] mt-0.5">Grab the handle in a column header to move it</p>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-[#111827]">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-[#EDEEF1] dark:border-[#1F2430]">
              {columns.map(col => {
                const isDragging = dragging === col.id
                const isOver     = over     === col.id
                const isDropped  = dropped  === col.id
                return (
                  <th
                    key={col.id}
                    draggable
                    onDragStart={() => handleDragStart(col.id)}
                    onDragOver={(e) => handleDragOver(e, col.id)}
                    onDrop={() => handleDrop(col.id)}
                    onDragEnd={() => { setDragging(null); setOver(null) }}
                    className={[
                      'group text-left px-4 py-3 font-semibold text-[#505867] dark:text-[#9CA3AF] select-none transition-all duration-150 cursor-default',
                      isDragging ? 'opacity-40 bg-[#F7F8F8] dark:bg-[#1F2430]' : '',
                      isOver && !isDragging ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/10 border-l-2 border-l-[#1258F8] text-[#1258F8]' : '',
                      isDropped ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/10 text-[#1258F8]' : '',
                      !isDragging && !isOver && !isDropped ? 'bg-[#F7F8F8] dark:bg-[#0D1117] hover:bg-[#EDEEF1] dark:hover:bg-[#1F2430]' : '',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-2">
                      <GripIcon
                        className={[
                          'cursor-grab active:cursor-grabbing shrink-0 transition-colors duration-150',
                          isOver || isDropped
                            ? 'text-[#1258F8]'
                            : 'text-[#D7DAE0] dark:text-[#374151] group-hover:text-[#9CA3AF]',
                        ].join(' ')}
                      />
                      <span>{col.header}</span>
                      {col.required && <span className="text-[#F87171]">*</span>}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
            {ROWS.map((row, ri) => (
              <tr key={ri} className="hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430] transition-colors">
                {columns.map((col) => {
                  const colIdx = INITIAL_COLUMNS.findIndex(c => c.id === col.id)
                  const isOver    = over    === col.id
                  const isDropped = dropped === col.id
                  return (
                    <td
                      key={col.id}
                      onDragOver={(e) => handleDragOver(e, col.id)}
                      onDrop={() => handleDrop(col.id)}
                      className={[
                        'px-4 py-2.5 text-[#505867] dark:text-[#9CA3AF] transition-all duration-150',
                        isOver && dragging !== col.id ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/10 border-l-2 border-l-[#1258F8]' : '',
                        isDropped ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/10' : '',
                      ].join(' ')}
                    >
                      {colIdx >= 0 ? row[colIdx] : '\u2014'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DragDropPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Drag and drop"
        description="Reorder lists and table columns by dragging. A grip handle signals the affordance; brand blue confirms the drop target and landed position."
      />

      {/* 01 — When to use */}
      <SectionWrapper id="when-to-use" num="01" total={TOTAL} title="When to use" description="Decide whether drag and drop is the right interaction for the task.">
        <WhenToUse
          doItems={[
            'The user needs to reorder a short list (sidebar sections, dashboard widgets, priority queues)',
            'Column order in a data table is user-configurable',
            'The sequence directly affects output (report section order, pipeline stages)',
            'Items have a visible grip handle and the list contains fewer than ~20 items',
          ]}
          dontItems={[
            'The list is longer than 20 items. Use a "move to position" input or arrow buttons instead',
            'Items are sorted by a data attribute (date, name, value). Sorting controls are the right pattern',
            'The reorder has no persistent effect. Do not add drag if the order resets on reload',
            'Touch is the primary input. Native drag events are unreliable on mobile; use tap-and-hold with arrow buttons',
          ]}
        />
      </SectionWrapper>

      {/* 02 — Item states */}
      <SectionWrapper id="item-states" num="02" total={TOTAL} title="Item states" description="Four distinct visual states communicate each phase of the interaction.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StateCard label="Default"  state="default"  />
          <StateCard label="Dragging" state="dragging" />
          <StateCard label="Over target" state="over"  />
          <StateCard label="Dropped"  state="dropped"  />
        </div>

        {/* Step labels */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { step: '1', title: 'Pick up',     body: 'User grabs the handle. The item\'s slot fades to 40% \u2014 a placeholder that shows where it came from.' },
            { step: '2', title: 'Drag over',   body: 'While hovering a valid drop target, that slot gets a blue border + tint, and the grip icon turns blue.' },
            { step: '3', title: 'Drop',        body: 'On release, the item lands in the new position with a brief blue ring that fades after 800 ms.' },
          ].map(({ step, title, body }) => (
            <div key={step} className="flex gap-3 p-4 rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827]">
              <span className="w-5 h-5 rounded-full bg-[#1258F8] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {step}
              </span>
              <div>
                <p className="text-[14px] font-semibold text-[#111827] dark:text-white mb-0.5">{title}</p>
                <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 03 — List reorder */}
      <SectionWrapper id="list-reorder" num="03" total={TOTAL} title="List reorder" description="Use for ordered lists, sidebar sections, or any sequence where users control priority.">
        <ListReorderDemo />
      </SectionWrapper>

      {/* 04 — Table column reorder */}
      <SectionWrapper id="table-column-reorder" num="04" total={TOTAL} title="Table column reorder" description="Column headers carry the grip handle. The active column highlights with a left border indicator and tinted cells below.">
        <TableColumnReorderDemo />
      </SectionWrapper>

      {/* 05 — Rules */}
      <SectionWrapper id="rules" num="05" total={TOTAL} title="Rules" description="Required pairings for every drag-and-drop implementation.">
        <RequiredPairings
          rules={[
            <>Always show a <Code>GripIcon</Code> drag handle on the left edge. Never make the entire surface draggable without a visible affordance.</>,
            <>Reduce the dragged item to 40% opacity in its original slot to show the ghost placeholder. The floating copy gets an elevated shadow.</>,
            <>Highlight the drop zone with <Code>border-[#1258F8]</Code> + <Code>bg-[#EEF6FF]</Code>. For table columns, add a 2px left border in brand blue.</>,
            <>Confirm the drop with <Code>ring-2 ring-[#1258F8]/20</Code> for ~800 ms before removing the ring. No toast needed.</>,
            <>Support keyboard reordering: Arrow keys move, Space confirms, Escape cancels. Announce position changes with <Code>aria-live</Code>.</>,
          ]}
        />
      </SectionWrapper>

      {/* 06 — Forbidden */}
      <SectionWrapper id="forbidden" num="06" total={TOTAL} title="Forbidden" description="Patterns that break usability or accessibility. Do not ship these.">
        <ForbiddenRefuse
          rules={[
            {
              rule: 'Making the entire row/card the drag target without a grip handle',
              response: 'Users cannot select text, click links, or interact with controls inside the item. Always scope drag to the handle element only.',
            },
            {
              rule: 'Drag and drop as the only reorder mechanism (no keyboard alternative)',
              response: 'Screen readers and keyboard users are locked out. Provide arrow-key reordering on the focused handle.',
            },
            {
              rule: 'Using drag and drop on lists longer than 20 items',
              response: 'Long-distance drags are error-prone and exhausting. Use a "move to position" number input or explicit up/down buttons.',
            },
            {
              rule: 'Allowing drag on mobile without a tap-and-hold fallback',
              response: 'Native HTML drag events do not fire reliably on touch devices. Either disable drag on mobile or implement pointer-event-based reordering.',
            },
            {
              rule: 'Dropping without any visual confirmation',
              response: 'The user has no proof the action succeeded. Always flash the landed item with the brand-blue ring for 800 ms.',
            },
          ]}
        />
      </SectionWrapper>

      {/* 07 — Accessibility */}
      <SectionWrapper id="accessibility" num="07" total={TOTAL} title="Accessibility" description="Keyboard and screen reader requirements for drag-and-drop patterns.">
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
          {[
            { key: 'Role', value: <>Each draggable item must have <Code>role="listitem"</Code> inside a <Code>role="list"</Code> container.</> },
            { key: 'Grab state', value: <>Set <Code>aria-grabbed="true"</Code> on the item being dragged and <Code>aria-grabbed="false"</Code> on all others.</> },
            { key: 'Live region', value: <>Announce position changes with an <Code>aria-live="assertive"</Code> region, e.g. "Energy monitoring moved to position 3 of 5."</> },
            { key: 'Keyboard', value: 'Focus the grip handle with Tab. Arrow Up/Down moves the item. Space/Enter confirms. Escape cancels and restores original order.' },
            { key: 'Focus management', value: 'After a drop, return focus to the grip handle of the moved item in its new position.' },
          ].map((item, i, arr) => (
            <div key={i} className="flex gap-4 p-5">
              <span className="text-[#1258F8] font-bold text-sm shrink-0 w-20">{item.key}</span>
              <p className="text-sm text-[#505867] dark:text-[#9CA3AF]">{item.value}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
