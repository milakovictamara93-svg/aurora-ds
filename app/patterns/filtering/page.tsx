'use client'

import { useState } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import Tag from '@/app/components-lib/ui/Tag'
import Slider from '@/app/components-lib/ui/Slider'
import Modal from '@/app/components-lib/ui/Modal'
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

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

const DEFAULT_STATE: FilterState = {
  dateMode:   'both',
  dateFrom:   '2024-01-01',
  dateTo:     '2024-12-31',
  area:       '',
  scoreRange: [20, 100],
  aspects:    ['Energy', 'Water'],
  assetType:  'all',
}

const ASPECT_OPTIONS = ['Energy', 'Water', 'GHG', 'Waste', 'Certifications', 'Engagement', 'ESG Risk']
const ASSET_TYPES    = [
  { value: 'all',       label: 'All assets' },
  { value: 'certified', label: 'Certified only' },
  { value: 'flagged',   label: 'Flagged' },
]

// ── Shared input style ────────────────────────────────────────────────────────

const inputCls = 'w-full px-2 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[13px] text-[#111827] dark:text-white focus:outline-none focus:border-[#1258F8] transition-colors'

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
        <div className="inline-flex rounded-md border border-[#D7DAE0] dark:border-[#1F2430] overflow-hidden mb-3 text-[13px]">
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
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <p className="text-[11px] text-[#9CA3AF] mb-1">From</p>
              <input type="date" value={draft.dateFrom}
                onChange={e => setDraft(prev => ({ ...prev, dateFrom: e.target.value }))}
                className={inputCls} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-[#9CA3AF] mb-1">To</p>
              <input type="date" value={draft.dateTo}
                onChange={e => setDraft(prev => ({ ...prev, dateTo: e.target.value }))}
                className={inputCls} />
            </div>
          </div>
        )}

        {(draft.dateMode === 'area' || draft.dateMode === 'both') && (
          <div className={draft.dateMode === 'both' ? 'mt-2' : ''}>
            <p className="text-[11px] text-[#9CA3AF] mb-1">Area</p>
            <select value={draft.area}
              onChange={e => setDraft(prev => ({ ...prev, area: e.target.value }))}
              className={inputCls}>
              <option value="">All regions</option>
              <option value="eu">Europe</option>
              <option value="am">Americas</option>
              <option value="ap">Asia Pacific</option>
            </select>
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
            <p className="text-[11px] text-[#9CA3AF] mb-1">Minimum</p>
            <input
              type="number" value={draft.scoreRange[0]} min={0} max={draft.scoreRange[1]}
              onChange={e => {
                const v = Math.min(Number(e.target.value), draft.scoreRange[1])
                setDraft(prev => ({ ...prev, scoreRange: [v, prev.scoreRange[1]] }))
              }}
              className={inputCls}
            />
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-[#9CA3AF] mb-1">Maximum</p>
            <input
              type="number" value={draft.scoreRange[1]} min={draft.scoreRange[0]} max={100}
              onChange={e => {
                const v = Math.max(Number(e.target.value), draft.scoreRange[0])
                setDraft(prev => ({ ...prev, scoreRange: [prev.scoreRange[0], v] }))
              }}
              className={inputCls}
            />
          </div>
        </div>
      </FilterSection>

      {/* Aspect categories multi-select */}
      <FilterSection
        title="Aspect categories"
        onClear={() => setDraft(prev => ({ ...prev, aspects: [] }))}
      >
        <div className="relative mb-2">
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
          <input
            type="text" placeholder="Search…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[13px] text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#1258F8]"
          />
        </div>
        <label className="flex items-center gap-2 px-1 py-1 cursor-pointer mb-1">
          <input type="checkbox" checked={allChecked} onChange={toggleAll}
            className="w-3.5 h-3.5 rounded border-[#D7DAE0] accent-[#1258F8]" />
          <span className="text-[13px] font-semibold text-[#111827] dark:text-white">Select all</span>
        </label>
        <div className="flex flex-col gap-0.5 pl-1 max-h-44 overflow-y-auto">
          {filtered.map(c => (
            <label key={c} className="flex items-center gap-2 py-0.5 cursor-pointer">
              <input type="checkbox" checked={draft.aspects.includes(c)} onChange={() => toggleAspect(c)}
                className="w-3.5 h-3.5 rounded border-[#D7DAE0] accent-[#1258F8]" />
              <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{c}</span>
            </label>
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
            <label key={r.value} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="asset-type-draft" value={r.value}
                checked={draft.assetType === r.value}
                onChange={() => setDraft(prev => ({ ...prev, assetType: r.value }))}
                className="w-3.5 h-3.5 border-[#D7DAE0] accent-[#1258F8]" />
              <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF]">{r.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Reset all — inside scrollable body */}
      <div className="pt-4">
        <button
          onClick={() => setDraft(DEFAULT_STATE)}
          className="text-[13px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors"
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
              'inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-[13px] font-medium border transition-colors',
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
              className="text-[13px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors ml-1"
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FilteringPage() {
  return (
    <div>
      <PageHeader
        title="Filtering"
        description="Patterns for filtering tabular and list data — a filter bar with active Tag chips, and a Drawer panel with sections for each filter type."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-12">

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">Filter bar + drawer</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            The filter bar shows active filters as <strong className="font-semibold text-[#111827] dark:text-white">Tag</strong> chips. The "Filter" button opens a <strong className="font-semibold text-[#111827] dark:text-white">Modal (drawer)</strong> with sections for each filter type. Applying closes the drawer and updates the chips.
          </p>
          <FilterBarDemo />
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Filter chip specs</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            <SpecRow label="Component" value="Tag — system='default', style='filled', showCount=false, showRemove=true" />
            <SpecRow label="Height" value="28px (medium size)" />
            <SpecRow label="Background" value="blue-100 (#D9EAFF)" />
            <SpecRow label="Text" value="blue-900 (#173691)" />
            <SpecRow label="Remove icon" value="× at 20px, same text color" />
            <SpecRow label="'Clear all' position" value="After last chip, same row — plain text button" />
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Filter section types</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            <SpecRow label="Date range" value="Time / Both / Area toggle, then date inputs. 'Both' is default for ESG data with temporal + spatial dimensions." />
            <SpecRow label="Histogram range" value="RangeHistogram bars (colored by selection) + Slider (range mode) + min/max numeric inputs. Bars in range = blue-600, bars outside = grey-200." />
            <SpecRow label="Multi-select" value="Search input + 'Select all' checkbox + item list. Each Clear resets that section's selection to empty." />
            <SpecRow label="Radio group" value="Mutually exclusive options. Clear resets to the default (first) option." />
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RuleCard title="Chips reflect applied state only">
              Filter chips in the bar show applied filters — not the draft inside the open drawer. Changes only become chips after pressing "Apply".
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
        </section>

      </div>
    </div>
  )
}
