'use client'

import { useState, useRef, useEffect } from 'react'
import PageHeader from '@/app/components-lib/ui/PageHeader'
import { FunnelIcon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

// ── Filter chip ───────────────────────────────────────────────────────────────

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#EEF6FF] dark:bg-[#1258F8]/15 border border-[#A8C8F8] dark:border-[#1258F8]/40 text-[12px] font-medium text-[#1146E4] dark:text-[#60A5FA]">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="ml-0.5 hover:text-[#1258F8] transition-colors"
      >
        <XMarkIcon className="w-3 h-3" />
      </button>
    </span>
  )
}

// ── Filter bar demo ───────────────────────────────────────────────────────────

const INITIAL_CHIPS = ['Energy', 'Jan 2024', 'Score > 80', 'Certified only', 'Water', 'GHG scope 1']

function FilterBarDemo() {
  const [chips, setChips] = useState(INITIAL_CHIPS)

  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <div className="px-4 py-2 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <span className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF]">Filter bar with active chips</span>
      </div>
      <div className="p-4 bg-white dark:bg-[#0D1117]">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter trigger */}
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#1F2430] text-[13px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:border-[#1258F8] hover:text-[#1258F8] transition-colors">
            <FunnelIcon className="w-4 h-4" />
            Filter
          </button>

          {/* Active chips */}
          {chips.map(c => (
            <FilterChip
              key={c}
              label={c}
              onRemove={() => setChips(prev => prev.filter(x => x !== c))}
            />
          ))}

          {/* Clear all */}
          {chips.length > 0 && (
            <button
              onClick={() => setChips([])}
              className="text-[12px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors ml-1"
            >
              Clear all
            </button>
          )}

          {chips.length === 0 && (
            <button
              onClick={() => setChips(INITIAL_CHIPS)}
              className="text-[12px] font-medium text-[#1258F8] hover:text-[#1146E4] transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Histogram bar (sparkline) ─────────────────────────────────────────────────

function MiniHistogram() {
  const bars = [3, 6, 10, 15, 22, 28, 19, 12, 7, 4]
  const max = Math.max(...bars)
  return (
    <div className="flex items-end gap-[2px] h-8">
      {bars.map((v, i) => (
        <div
          key={i}
          className="flex-1 bg-[#1258F8]/30 rounded-sm"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  )
}

// ── Filter panel demo ─────────────────────────────────────────────────────────

function FilterPanelDemo() {
  const [dateMode, setDateMode]         = useState<'time' | 'both' | 'area'>('both')
  const [scoreMin, setScoreMin]         = useState('20')
  const [scoreMax, setScoreMax]         = useState('100')
  const [selected, setSelected]         = useState<string[]>(['Energy', 'Water'])
  const [search, setSearch]             = useState('')
  const [radio, setRadio]               = useState('all')

  const CHECKBOXES = ['Energy', 'Water', 'GHG', 'Waste', 'Certifications', 'Engagement', 'ESG Risk']
  const RADIOS     = [{ value: 'all', label: 'All assets' }, { value: 'certified', label: 'Certified only' }, { value: 'flagged', label: 'Flagged' }]

  const filtered = CHECKBOXES.filter(c => c.toLowerCase().includes(search.toLowerCase()))
  const allChecked = filtered.every(c => selected.includes(c))

  function toggleAll() {
    if (allChecked) setSelected(prev => prev.filter(c => !filtered.includes(c)))
    else setSelected(prev => Array.from(new Set([...prev, ...filtered])))
  }

  function toggle(c: string) {
    setSelected(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  return (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <div className="px-4 py-2 bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <span className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF]">Filter panel — all filter types</span>
      </div>

      <div className="bg-white dark:bg-[#0D1117] divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">

        {/* Date range filter */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#111827] dark:text-white">Date range</p>
            <button className="text-[12px] text-[#1258F8] hover:text-[#1146E4] font-medium transition-colors">Clear</button>
          </div>
          {/* Toggle */}
          <div className="inline-flex rounded-md border border-[#D7DAE0] dark:border-[#1F2430] overflow-hidden mb-3 text-[12px]">
            {(['time', 'both', 'area'] as const).map(m => (
              <button
                key={m}
                onClick={() => setDateMode(m)}
                className={[
                  'px-3 py-1.5 font-medium capitalize transition-colors',
                  dateMode === m
                    ? 'bg-[#1258F8] text-white'
                    : 'bg-white dark:bg-[#111827] text-[#505867] dark:text-[#9CA3AF] hover:bg-[#F7F8F8] dark:hover:bg-[#1F2430]',
                ].join(' ')}
              >
                {m === 'time' ? 'Time' : m === 'both' ? 'Both' : 'Area'}
              </button>
            ))}
          </div>
          {(dateMode === 'time' || dateMode === 'both') && (
            <div className="flex gap-2 mb-2">
              <div className="flex-1">
                <p className="text-[11px] text-[#9CA3AF] mb-1">From</p>
                <input type="date" defaultValue="2024-01-01" className="w-full px-2 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[12px] text-[#111827] dark:text-white focus:outline-none focus:border-[#1258F8]" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-[#9CA3AF] mb-1">To</p>
                <input type="date" defaultValue="2024-12-31" className="w-full px-2 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[12px] text-[#111827] dark:text-white focus:outline-none focus:border-[#1258F8]" />
              </div>
            </div>
          )}
          {(dateMode === 'area' || dateMode === 'both') && (
            <div className="mt-2">
              <p className="text-[11px] text-[#9CA3AF] mb-1">Area</p>
              <select className="w-full px-2 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[12px] text-[#111827] dark:text-white focus:outline-none focus:border-[#1258F8]">
                <option>All regions</option>
                <option>Europe</option>
                <option>Americas</option>
                <option>Asia Pacific</option>
              </select>
            </div>
          )}
        </div>

        {/* Histogram range filter */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#111827] dark:text-white">ESG score</p>
            <button className="text-[12px] text-[#1258F8] hover:text-[#1146E4] font-medium transition-colors">Clear</button>
          </div>
          <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mb-2">Distribution of scores across portfolio</p>
          <MiniHistogram />
          <div className="flex gap-2 mt-3">
            <div className="flex-1">
              <p className="text-[11px] text-[#9CA3AF] mb-1">Minimum</p>
              <input
                type="number" value={scoreMin} min={0} max={100}
                onChange={e => setScoreMin(e.target.value)}
                className="w-full px-2 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[12px] text-[#111827] dark:text-white focus:outline-none focus:border-[#1258F8]"
              />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-[#9CA3AF] mb-1">Maximum</p>
              <input
                type="number" value={scoreMax} min={0} max={100}
                onChange={e => setScoreMax(e.target.value)}
                className="w-full px-2 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[12px] text-[#111827] dark:text-white focus:outline-none focus:border-[#1258F8]"
              />
            </div>
          </div>
        </div>

        {/* Multi-select checkboxes */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#111827] dark:text-white">Aspect categories</p>
            <button className="text-[12px] text-[#1258F8] hover:text-[#1146E4] font-medium transition-colors">Clear</button>
          </div>
          {/* Search */}
          <div className="relative mb-2">
            <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 rounded-md border border-[#D7DAE0] dark:border-[#1F2430] bg-white dark:bg-[#111827] text-[12px] text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#1258F8]"
            />
          </div>
          {/* Select all */}
          <label className="flex items-center gap-2 px-1 py-1 cursor-pointer group mb-1">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={toggleAll}
              className="w-3.5 h-3.5 rounded border-[#D7DAE0] accent-[#1258F8]"
            />
            <span className="text-[12px] font-semibold text-[#111827] dark:text-white">Select all</span>
          </label>
          <div className="flex flex-col gap-0.5 pl-1 max-h-40 overflow-y-auto">
            {filtered.map(c => (
              <label key={c} className="flex items-center gap-2 py-0.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(c)}
                  onChange={() => toggle(c)}
                  className="w-3.5 h-3.5 rounded border-[#D7DAE0] accent-[#1258F8]"
                />
                <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">{c}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Radio group */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#111827] dark:text-white">Asset type</p>
            <button className="text-[12px] text-[#1258F8] hover:text-[#1146E4] font-medium transition-colors">Clear</button>
          </div>
          <div className="flex flex-col gap-1.5">
            {RADIOS.map(r => (
              <label key={r.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="asset-type"
                  value={r.value}
                  checked={radio === r.value}
                  onChange={() => setRadio(r.value)}
                  className="w-3.5 h-3.5 border-[#D7DAE0] accent-[#1258F8]"
                />
                <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF]">{r.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-4 py-3 flex items-center justify-between bg-[#F7F8F8] dark:bg-[#0D1117]">
          <button className="text-[13px] font-medium text-[#505867] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors">
            Reset
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-md text-[13px] font-medium bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#1F2430] text-[#505867] dark:text-[#9CA3AF] hover:border-[#9CA3AF] transition-colors">
              Cancel
            </button>
            <button className="px-4 py-1.5 rounded-md text-[13px] font-medium bg-[#1258F8] text-white hover:bg-[#1146E4] transition-colors">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Rules grid ────────────────────────────────────────────────────────────────

function RuleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] p-4 bg-white dark:bg-[#0D1117]">
      <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">{title}</p>
      <p className="text-[13px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{children}</p>
    </div>
  )
}

// ── Spec row ──────────────────────────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
      <span className="text-[13px] text-[#505867] dark:text-[#9CA3AF] w-40 shrink-0">{label}</span>
      <span className="text-[13px] text-[#111827] dark:text-white">{value}</span>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FilteringPage() {
  return (
    <div>
      <PageHeader
        title="Filtering"
        description="Patterns for filtering tabular and list data — from a compact filter bar with active chips to a full slide-in panel with multiple filter types."
        badge="Patterns"
      />

      <div className="mt-8 flex flex-col gap-12">

        {/* Filter bar */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">Filter bar</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            The filter bar sits above a data table or list. It shows a "Filter" trigger button and active filter chips. Clicking a chip's × removes that filter; "Clear all" resets everything.
          </p>
          <FilterBarDemo />
        </section>

        {/* Filter chip anatomy */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">Filter chip anatomy</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            Each active filter is shown as a chip. Chips use a blue tint to signal they are active and modifying the view.
          </p>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            <SpecRow label="Background" value="#EEF6FF — Blue 50 tint" />
            <SpecRow label="Border" value="#A8C8F8 — Blue 300" />
            <SpecRow label="Text" value="#1146E4 — Blue 700" />
            <SpecRow label="Font size" value="12px / medium" />
            <SpecRow label="Padding" value="4px 8px" />
            <SpecRow label="Border radius" value="6px" />
            <SpecRow label="Dismiss icon" value="x-mark 12px, same color" />
            <SpecRow label="'Clear all' position" value="After last chip, same row" />
          </div>
        </section>

        {/* Filter panel */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-1">Filter panel</h2>
          <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-5 leading-relaxed">
            The filter panel is a sidebar that slides in from the right. It contains sections for each filterable dimension. Each section has a "Clear" link. The footer has "Reset", "Cancel", and "Apply" actions.
          </p>
          <FilterPanelDemo />
        </section>

        {/* Filter types */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Filter section types</h2>
          <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
            <SpecRow label="Date range" value="Time / Both / Area toggle, then min–max date inputs. Use 'Both' as default for most ESG data which has temporal and spatial dimensions." />
            <SpecRow label="Histogram range" value="Bar chart showing distribution, then numeric min–max inputs. Use when the range shape helps users understand the data spread." />
            <SpecRow label="Select (single)" value="Dropdown with a single value. Use for mutually exclusive categories like region or status." />
            <SpecRow label="Multi-select" value="Checklist with optional search and 'Select all'. Use for aspect categories, tags, or any additive multi-value filter." />
            <SpecRow label="Radio group" value="Mutually exclusive options with no dropdown. Use when there are ≤ 5 choices that don't need search." />
          </div>
        </section>

        {/* Rules */}
        <section>
          <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-3">Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RuleCard title="Always show active state in the bar">
              Every active filter must appear as a chip in the filter bar. If no filters are active, show only the "Filter" button — never show an empty chip row.
            </RuleCard>
            <RuleCard title="Clear per-section, not just globally">
              Each filter section in the panel must have its own "Clear" link so users can reset one dimension without losing others.
            </RuleCard>
            <RuleCard title="Apply is required for complex panels">
              For panels with ≥ 3 filter sections, require an explicit "Apply" to avoid triggering multiple rapid fetches as the user adjusts values.
            </RuleCard>
            <RuleCard title="Chips must reflect applied state, not draft">
              Chips in the bar reflect applied filters only. Draft changes inside the panel (before "Apply") do not update chips.
            </RuleCard>
            <RuleCard title="Use histogram when distribution matters">
              Show the histogram bar chart in range filters only when the shape of the data helps users choose min/max meaningfully. For arbitrary ranges, use plain inputs.
            </RuleCard>
          </div>
        </section>

      </div>
    </div>
  )
}
