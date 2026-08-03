'use client'

import { useState } from 'react'
import {
  ComponentPageLayout,
  TitleBlock,
  SectionWrapper,
  WhenToUse,
  RequiredPairings,
  ForbiddenRefuse,
  Code,
} from '@/app/components-lib/ui/ComponentPage'
import Tag from '@/app/components-lib/ui/Tag'
import Slider from '@/app/components-lib/ui/Slider'
import Modal from '@/app/components-lib/ui/Modal'
import InputSearch from '@/app/components-lib/ui/InputSearch'
import InputSelect from '@/app/components-lib/ui/InputSelect'
import InputText from '@/app/components-lib/ui/InputText'
import InputDate from '@/app/components-lib/ui/InputDate'
import type { DateRange } from '@/app/components-lib/ui/InputDate'
import Checkbox from '@/app/components-lib/ui/Checkbox'
import Radio from '@/app/components-lib/ui/Radio'
import { FunnelIcon } from '@heroicons/react/20/solid'

const TOTAL = '07'

// ── Filter section wrapper (matches Figma 5120:145942) ────────────────────────

function FilterSection({
  title,
  onClear,
  children,
}: {
  title: string
  onClear: () => void
  children: React.ReactNode
}) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[14px] font-semibold text-[#111827] dark:text-white">{title}</p>
        <button
          onClick={onClear}
          className="text-[14px] font-medium text-[#1258F8] hover:text-[#1146E4] transition-colors"
        >
          Clear
        </button>
      </div>
      <div>{children}</div>
    </div>
  )
}

// ── Histogram bars (colored by range) ─────────────────────────────────────────

const BARS = [3, 6, 10, 15, 22, 28, 19, 12, 7, 4]
const MAX_BAR = Math.max(...BARS)

function RangeHistogram({ range }: { range: [number, number] }) {
  return (
    <div className="flex items-end gap-[2px] h-10 mb-3">
      {BARS.map((v, i) => {
        const bucketMin = i * 10
        const bucketMax = (i + 1) * 10
        const inRange = bucketMax > range[0] && bucketMin < range[1]
        return (
          <div
            key={i}
            className={[
              'flex-1 rounded-sm transition-colors',
              inRange ? 'bg-[#1258F8]' : 'bg-[#D7DAE0] dark:bg-[#374151]',
            ].join(' ')}
            style={{ height: `${(v / MAX_BAR) * 100}%` }}
          />
        )
      })}
    </div>
  )
}

// ── Filter state (shared between bar and panel) ────────────────────────────────

interface FilterState {
  dateMode:   'time' | 'both' | 'area'
  dateFrom:   string
  dateTo:     string
  area:       string
  scoreRange: [number, number]
  aspects:    string[]
  assetType:  string
}

// Empty = no filters applied (no chips shown)
const DEFAULT_STATE: FilterState = {
  dateMode:   'both',
  dateFrom:   '2024-01-01',
  dateTo:     '2024-12-31',
  area:       '',
  scoreRange: [0, 100],
  aspects:    [],
  assetType:  'all',
}

const ASPECT_OPTIONS = ['Energy', 'Water', 'GHG', 'Waste', 'Certifications', 'Engagement', 'ESG Risk']
const ASSET_TYPES    = [
  { value: 'all',       label: 'All assets' },
  { value: 'certified', label: 'Certified only' },
  { value: 'flagged',   label: 'Flagged' },
]

// ── Filter panel content (rendered inside drawer) ─────────────────────────────

function FilterPanelContent({
  filters,
  draft,
  setDraft,
}: {
  filters: FilterState
  draft: FilterState
  setDraft: React.Dispatch<React.SetStateAction<FilterState>>
}) {
  const [search, setSearch] = useState('')

  const filtered = ASPECT_OPTIONS.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  )
  const allChecked = filtered.every(c => draft.aspects.includes(c))

  function toggleAspect(c: string) {
    setDraft(prev => ({
      ...prev,
      aspects: prev.aspects.includes(c)
        ? prev.aspects.filter(x => x !== c)
        : [...prev.aspects, c],
    }))
  }

  function toggleAll() {
    setDraft(prev => ({
      ...prev,
      aspects: allChecked
        ? prev.aspects.filter(c => !filtered.includes(c))
        : Array.from(new Set([...prev.aspects, ...filtered])),
    }))
  }

  return (
    <div className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">

      {/* Date range */}
      <FilterSection
        title="Date range"
        onClear={() => setDraft(prev => ({
          ...prev,
          dateMode: 'both',
          dateFrom: DEFAULT_STATE.dateFrom,
          dateTo:   DEFAULT_STATE.dateTo,
          area:     '',
        }))}
      >
        <div className="inline-flex rounded-md border border-[#D7DAE0] dark:border-[#1F2430] overflow-hidden mb-3 text-[14px]">
          {(['time', 'both', 'area'] as const).map(m => (
            <button
              key={m}
              onClick={() => setDraft(prev => ({ ...prev, dateMode: m }))}
              className={[
                'px-3 py-1.5 font-medium capitalize transition-colors',
                draft.dateMode === m
                  ? 'bg-[#1258F8] text-white'
                  : 'bg-white dark:bg-[#111827] text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430]',
              ].join(' ')}
            >
              {m === 'time' ? 'Time' : m === 'both' ? 'Both' : 'Area'}
            </button>
          ))}
        </div>

        {(draft.dateMode === 'time' || draft.dateMode === 'both') && (
          <div className="mb-2">
            <InputDate
              label="Date range"
              value={{ start: draft.dateFrom, end: draft.dateTo }}
              onChange={(v: DateRange | null) => {
                if (v) setDraft(prev => ({ ...prev, dateFrom: v.start, dateTo: v.end }))
              }}
            />
          </div>
        )}

        {(draft.dateMode === 'area' || draft.dateMode === 'both') && (
          <div className={draft.dateMode === 'both' ? 'mt-2' : ''}>
            <InputSelect
              label="Area"
              options={[
                { value: '',   label: 'All regions' },
                { value: 'eu', label: 'Europe' },
                { value: 'am', label: 'Americas' },
                { value: 'ap', label: 'Asia Pacific' },
              ]}
              value={draft.area}
              onChange={v => setDraft(prev => ({ ...prev, area: v }))}
            />
          </div>
        )}
      </FilterSection>

      {/* ESG score range with Slider */}
      <FilterSection
        title="ESG score"
        onClear={() => setDraft(prev => ({ ...prev, scoreRange: [0, 100] }))}
      >
        <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-3">
          Distribution across portfolio
        </p>
        <RangeHistogram range={draft.scoreRange} />
        <Slider
          range
          min={0}
          max={100}
          step={5}
          rangeValue={draft.scoreRange}
          onRangeChange={r => setDraft(prev => ({ ...prev, scoreRange: r }))}
          showLabels={false}
        />
        <div className="flex gap-2 mt-3">
          <div className="flex-1">
            <InputText
              label="Minimum"
              type="number"
              value={String(draft.scoreRange[0])}
              min={0}
              max={draft.scoreRange[1]}
              onChange={e => {
                const v = Math.min(Number(e.target.value), draft.scoreRange[1])
                setDraft(prev => ({ ...prev, scoreRange: [v, prev.scoreRange[1]] }))
              }}
            />
          </div>
          <div className="flex-1">
            <InputText
              label="Maximum"
              type="number"
              value={String(draft.scoreRange[1])}
              min={draft.scoreRange[0]}
              max={100}
              onChange={e => {
                const v = Math.max(Number(e.target.value), draft.scoreRange[0])
                setDraft(prev => ({ ...prev, scoreRange: [prev.scoreRange[0], v] }))
              }}
            />
          </div>
        </div>
      </FilterSection>

      {/* Aspect categories multi-select */}
      <FilterSection
        title="Aspect categories"
        onClear={() => setDraft(prev => ({ ...prev, aspects: [] }))}
      >
        <div className="mb-2">
          <InputSearch
            placeholder="Search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            clearable={!!search}
            onClear={() => setSearch('')}
          />
        </div>
        <div className="mb-1">
          <Checkbox
            label="Select all"
            checked={allChecked}
            state={allChecked ? 'checked' : filtered.some(c => draft.aspects.includes(c)) ? 'indeterminate' : 'unchecked'}
            onChange={() => toggleAll()}
          />
        </div>
        <div className="flex flex-col gap-0.5 pl-1 max-h-44 overflow-y-auto">
          {filtered.map(c => (
            <Checkbox
              key={c}
              label={c}
              checked={draft.aspects.includes(c)}
              onChange={() => toggleAspect(c)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Asset type radio */}
      <FilterSection
        title="Asset type"
        onClear={() => setDraft(prev => ({ ...prev, assetType: 'all' }))}
      >
        <div className="flex flex-col gap-2">
          {ASSET_TYPES.map(r => (
            <Radio
              key={r.value}
              label={r.label}
              checked={draft.assetType === r.value}
              onChange={() => setDraft(prev => ({ ...prev, assetType: r.value }))}
            />
          ))}
        </div>
      </FilterSection>

      {/* Reset all — inside scrollable body */}
      <div className="pt-4">
        <button
          onClick={() => setDraft(DEFAULT_STATE)}
          className="text-[14px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors"
        >
          Reset all filters
        </button>
      </div>

    </div>
  )
}

// ── Active chips derived from filter state ─────────────────────────────────────

function chipsFromFilters(f: FilterState): { key: string; label: string }[] {
  const chips: { key: string; label: string }[] = []
  if (f.dateMode !== 'both' || f.dateFrom !== DEFAULT_STATE.dateFrom || f.dateTo !== DEFAULT_STATE.dateTo) {
    chips.push({ key: 'date', label: `${f.dateFrom} – ${f.dateTo}` })
  }
  if (f.area) chips.push({ key: 'area', label: f.area })
  if (f.scoreRange[0] !== 0 || f.scoreRange[1] !== 100) {
    chips.push({ key: 'score', label: `Score ${f.scoreRange[0]}–${f.scoreRange[1]}` })
  }
  f.aspects.forEach(a => chips.push({ key: `aspect-${a}`, label: a }))
  if (f.assetType !== 'all') {
    chips.push({ key: 'type', label: ASSET_TYPES.find(x => x.value === f.assetType)?.label ?? f.assetType })
  }
  return chips
}

// ── Filter bar demo ───────────────────────────────────────────────────────────

function FilterBarDemo() {
  const [applied, setApplied] = useState<FilterState>(DEFAULT_STATE)
  const [draft,   setDraft]   = useState<FilterState>(DEFAULT_STATE)
  const [open,    setOpen]    = useState(false)

  const chips = chipsFromFilters(applied)
  const isActive = chips.length > 0

  function openDrawer() {
    setDraft(applied)   // sync draft to current applied state
    setOpen(true)
  }

  function apply() {
    setApplied(draft)
    setOpen(false)
  }

  function removeChip(key: string) {
    setApplied(prev => {
      if (key === 'date')  return { ...prev, dateFrom: DEFAULT_STATE.dateFrom, dateTo: DEFAULT_STATE.dateTo, dateMode: 'both' }
      if (key === 'area')  return { ...prev, area: '' }
      if (key === 'score') return { ...prev, scoreRange: [0, 100] }
      if (key === 'type')  return { ...prev, assetType: 'all' }
      if (key.startsWith('aspect-')) {
        const a = key.slice(7)
        return { ...prev, aspects: prev.aspects.filter(x => x !== a) }
      }
      return prev
    })
  }

  return (
    <>
      <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
        <div className="px-4 py-2 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
          <span className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF]">
            Filter bar — click "Filter" to open the drawer
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-[#0D1117] flex flex-wrap items-center gap-2">

          {/* Filter trigger button */}
          <button
            onClick={openDrawer}
            className={[
              'inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-[14px] font-medium border transition-colors',
              isActive
                ? 'bg-[#EEF6FF] dark:bg-[#1258F8]/15 border-[#1258F8] text-[#1258F8]'
                : 'bg-white dark:bg-[#111827] border-[#D7DAE0] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] hover:border-[#1258F8] hover:text-[#1258F8]',
            ].join(' ')}
          >
            <FunnelIcon className="w-4 h-4" />
            Filter
          </button>

          {/* Active chips using Tag component */}
          {chips.map(c => (
            <Tag
              key={c.key}
              system="default"
              style="filled"
              size="medium"
              label={c.label}
              showCount={false}
              showRemove
              onRemove={() => removeChip(c.key)}
            />
          ))}

          {/* Clear all */}
          {chips.length > 0 && (
            <button
              onClick={() => setApplied(DEFAULT_STATE)}
              className="text-[14px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors ml-1"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Drawer — uses existing Modal component */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        type="drawer"
        title="Filters"
        secondaryLabel="Cancel"
        secondaryAction={() => setOpen(false)}
        primaryLabel="Apply"
        primaryAction={apply}
      >
        <FilterPanelContent filters={applied} draft={draft} setDraft={setDraft} />
      </Modal>
    </>
  )
}

// ── Spec row ──────────────────────────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
      <span className="text-[14px] text-[#505867] dark:text-[#9CA3AF] w-44 shrink-0">{label}</span>
      <span className="text-[14px] text-[#111827] dark:text-white">{value}</span>
    </div>
  )
}

function RuleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
      <p className="text-[14px] font-semibold text-[#111827] dark:text-white mb-2">{title}</p>
      <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{children}</p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FilteringPage() {
  return (
    <ComponentPageLayout>
      <TitleBlock
        title="Filtering"
        description="Patterns for filtering tabular and list data -- a filter bar with active Tag chips, and a Drawer panel with sections for each filter type."
      />

      {/* 01 — When to use */}
      <SectionWrapper
        id="when-to-use"
        num="01"
        total={TOTAL}
        title="When to use"
        description="Decide whether the filter bar + drawer pattern is the right fit."
      >
        <WhenToUse
          doItems={[
            <>Tables or lists with more than three filterable dimensions (date, score, category, type).</>,
            <>ESG portfolio views where users slice data by aspect, region, and time period simultaneously.</>,
            <>Any view where applied filters must remain visible as removable chips so the user always knows what is active.</>,
            <>Dashboards where filter state is shared across multiple cards or charts on the same page.</>,
          ]}
          dontItems={[
            <>Simple single-dimension filtering -- use an inline dropdown or segmented control instead.</>,
            <>Search-only flows where the user types a query. Use <Code>InputSearch</Code> standalone.</>,
            <>Sorting controls. Sorting is not filtering; keep them as separate interactions.</>,
            <>Fewer than 10 items in the list. Filtering adds cognitive overhead that is not worth it at small scale.</>,
          ]}
        />
      </SectionWrapper>

      {/* 02 — Filter bar + drawer */}
      <SectionWrapper
        id="filter-bar-drawer"
        num="02"
        total={TOTAL}
        title="Filter bar + drawer"
        description="The filter bar shows active filters as Tag chips. The &quot;Filter&quot; button opens a Modal (drawer) with sections for each filter type. Applying closes the drawer and updates the chips."
      >
        <FilterBarDemo />
      </SectionWrapper>

      {/* 03 — Filter chip specs */}
      <SectionWrapper
        id="filter-chip-specs"
        num="03"
        total={TOTAL}
        title="Filter chip specs"
      >
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
          <SpecRow label="Component" value="Tag — system='default', style='filled', showCount=false, showRemove=true" />
          <SpecRow label="Height" value="28px (medium size)" />
          <SpecRow label="Background" value="blue-100 (#D9EAFF)" />
          <SpecRow label="Text" value="blue-900 (#173691)" />
          <SpecRow label="Remove icon" value="x at 20px, same text color" />
          <SpecRow label="'Clear all' position" value="After last chip, same row — plain text button" />
        </div>
      </SectionWrapper>

      {/* 04 — Filter section types */}
      <SectionWrapper
        id="filter-section-types"
        num="04"
        total={TOTAL}
        title="Filter section types"
      >
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
          <SpecRow label="Date range" value="Time / Both / Area toggle, then date inputs. 'Both' is default for ESG data with temporal + spatial dimensions." />
          <SpecRow label="Histogram range" value="RangeHistogram bars (colored by selection) + Slider (range mode) + min/max numeric inputs. Bars in range = blue-600, bars outside = grey-200." />
          <SpecRow label="Multi-select" value="Search input + 'Select all' checkbox + item list. Each Clear resets that section's selection to empty." />
          <SpecRow label="Radio group" value="Mutually exclusive options. Clear resets to the default (first) option." />
        </div>
      </SectionWrapper>

      {/* 05 — Rules */}
      <SectionWrapper
        id="rules"
        num="05"
        total={TOTAL}
        title="Rules"
        description="Required behavior for all filter implementations."
      >
        <RequiredPairings
          rules={[
            <>Filter chips in the bar reflect <strong>applied state only</strong>. Changes inside the open drawer do not become chips until the user presses "Apply".</>,
            <>Every filter section must include its own <strong>"Clear" link</strong> that resets only that section without touching others.</>,
            <>When any filters are applied, the Filter button must switch to an <strong>active state</strong> (blue-tinted background, filled funnel icon) so users can tell data is filtered at a glance.</>,
            <>Use <Code>Modal type=&quot;drawer&quot;</Code> for the filter panel. It slides in from the right and uses the standard footer actions (Cancel / Apply).</>,
            <>In range filters, histogram bars inside the selected range are <strong>blue-600</strong>. Bars outside the range are <strong>grey-200</strong>.</>,
            <>A global <strong>"Clear all"</strong> text button must appear inline after the last chip when any filters are active.</>,
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <RuleCard title="Chips reflect applied state only">
            Filter chips in the bar show applied filters -- not the draft inside the open drawer. Changes only become chips after pressing "Apply".
          </RuleCard>
          <RuleCard title="Each section has its own Clear">
            Every filter section must have a "Clear" link that resets only that section, without touching others.
          </RuleCard>
          <RuleCard title="Filter button shows active state">
            When any filters are applied, the Filter button gets a blue-tinted background and filled funnel icon to signal the data is filtered.
          </RuleCard>
          <RuleCard title="Drawer, not inline panel">
            Use Modal type='drawer' for the filter panel. It slides in from the right and uses the existing footer actions (Cancel / Apply).
          </RuleCard>
          <RuleCard title="Histogram coloring follows range">
            In range filters, histogram bars inside [min, max] are blue-600. Bars outside are grey-200. This helps users understand what data they're including.
          </RuleCard>
        </div>
      </SectionWrapper>

      {/* 06 — Forbidden */}
      <SectionWrapper
        id="forbidden"
        num="06"
        total={TOTAL}
        title="Forbidden"
        description="Patterns that break filtering UX or create confusion."
      >
        <ForbiddenRefuse
          rules={[
            {
              rule: <>Do not apply filters automatically as the user changes values inside the drawer.</>,
              response: <>Immediate application removes the ability to undo before committing. Always require an explicit "Apply" action.</>,
            },
            {
              rule: <>Do not hide the active filter count or chips behind a collapsed state.</>,
              response: <>Users must see what filters are active at all times. If chip space overflows, wrap to a second row -- never truncate or hide behind a "+N more" badge.</>,
            },
            {
              rule: <>Do not mix sorting controls into the filter drawer.</>,
              response: <>Sorting and filtering are separate concerns. Sort controls belong in the table header or a dedicated sort dropdown, not inside the filter panel.</>,
            },
            {
              rule: <>Do not use inline filter dropdowns as a replacement when three or more filter dimensions exist.</>,
              response: <>Inline dropdowns do not scale. Beyond two dimensions, always use the drawer pattern to keep the toolbar manageable.</>,
            },
            {
              rule: <>Do not reset all filters when the user removes a single chip.</>,
              response: <>Each chip removal must only clear that specific filter. The "Clear all" button is the only way to reset everything at once.</>,
            },
          ]}
        />
      </SectionWrapper>

      {/* 07 — Accessibility */}
      <SectionWrapper
        id="accessibility"
        num="07"
        total={TOTAL}
        title="Accessibility"
        description="Keyboard and screen reader requirements for the filtering pattern."
      >
        <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
          <SpecRow label="Filter button" value="role='button', aria-expanded reflects drawer state, aria-haspopup='dialog'" />
          <SpecRow label="Drawer" value="role='dialog', aria-modal='true', focus trapped while open" />
          <SpecRow label="Chips" value="Each chip is a button with aria-label describing the filter and 'remove' action" />
          <SpecRow label="Keyboard" value="Tab through chips, Enter/Space to remove. Escape closes the drawer without applying." />
          <SpecRow label="Live region" value="Announce 'N filters applied' to screen readers when the user clicks Apply" />
        </div>
      </SectionWrapper>
    </ComponentPageLayout>
  )
}
