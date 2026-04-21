'use client'

import { useState, createContext, useContext } from 'react'
import Tag from './Tag'
import Toast from './Toast'
import Banner from './Banner'
import { SimpleCard } from './Card'
import Breadcrumbs from './Breadcrumbs'

// ── Context ───────────────────────────────────────────────────────────────────
const TabCtx = createContext<{ active: string; set: (t: string) => void }>({
  active: 'usage', set: () => {},
})

// ── Root ──────────────────────────────────────────────────────────────────────
export function ComponentTabs({
  children,
  defaultTab = 'usage',
}: {
  children: React.ReactNode
  defaultTab?: string
}) {
  const [active, set] = useState(defaultTab)
  return (
    <TabCtx.Provider value={{ active, set }}>
      <div>{children}</div>
    </TabCtx.Provider>
  )
}

// ── Tab bar ───────────────────────────────────────────────────────────────────
// Figma: 2px border-b on container (grey), active tab has 2px blue border-b
const TAB_LABELS: Record<string, string> = {
  usage:         'Usage',
  style:         'Style',
  code:          'Code',
  accessibility: 'Accessibility',
}

export function TabBar({ tabs = ['usage', 'style', 'code', 'accessibility'] }: { tabs?: string[] }) {
  const { active, set } = useContext(TabCtx)
  // Outer div handles horizontal scroll; inner div owns the bottom border so
  // the tabs' -mb-[2px] trick isn't clipped by overflow-x:auto
  return (
    <div className="mt-12 overflow-x-auto">
      <div className="flex border-b-2 border-[#D7DAE0] dark:border-[#1F2430] min-w-max">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => set(t)}
            className={[
              'flex items-center gap-2 h-8 px-3 text-[14px] font-medium border-b-2 -mb-[2px] transition-colors whitespace-nowrap rounded-tl-[4px] rounded-tr-[4px]',
              active === t
                ? 'border-[#1258F8] text-[#111827] dark:text-white dark:border-[#2295FF]'
                : 'border-transparent text-[#505867] dark:text-[#6B7280] hover:text-[#111827] dark:hover:text-white',
            ].join(' ')}
          >
            {TAB_LABELS[t] ?? t}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Panel ─────────────────────────────────────────────────────────────────────
export function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const { active } = useContext(TabCtx)
  if (active !== id) return null
  return <div className="pt-8">{children}</div>
}

// ── PageContent ────────────────────────────────────────────────────────────────
// Full-width wrapper — no max-width constraint (Figma: full-width layout)
export function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10">
      {children}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Section({
  title,
  description,
  children,
  className = '',
}: {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`mb-10 ${className}`}>
      {title && (
        <h2 className="text-[20px] font-bold text-[#111827] dark:text-white mb-2 leading-[1.4]">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mb-4">{description}</p>
      )}
      {children}
    </section>
  )
}

// ── SpecTable ─────────────────────────────────────────────────────────────────
export function SpecTable({ rows }: { rows: { property: string; value: string; token?: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
            {['Property', 'Value', 'Token / variable'].map(h => (
              <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
          {rows.map(r => (
            <tr key={r.property} className="hover:bg-[#F7F8F8] dark:hover:bg-[#0D1117]/60 transition-colors">
              <td className="px-4 py-2.5 font-medium text-[#1F2430] dark:text-white">{r.property}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-[#505867] dark:text-[#9CA3AF]">{r.value}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-[#1258F8] dark:text-[#2295FF]">{r.token ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── ColorRow ─────────────────────────────────────────────────────────────────
export function ColorRow({ label, hex, role, border }: { label: string; hex: string; role: string; border?: boolean }) {
  return (
    <div className={`flex items-center gap-4 py-3 ${border ? 'border-t border-[#EDEEF1] dark:border-[#1F2430]' : ''}`}>
      <span className="w-8 h-8 rounded-lg shrink-0 border border-black/10" style={{ background: hex }} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#1F2430] dark:text-white">{label}</p>
        <p className="text-xs text-[#505867] dark:text-[#9CA3AF]">{role}</p>
      </div>
      <code className="text-xs font-mono text-[#505867] dark:text-[#9CA3AF] shrink-0">{hex}</code>
    </div>
  )
}

// ── DoCard ────────────────────────────────────────────────────────────────────
// Figma: green border #16a34a, header bg #f0fdf5, body bg white, check-circle icon
export function DoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-[#16a34a] dark:border-[#16a34a]/40 bg-white dark:bg-[#0D1117] overflow-hidden">
      <div className="flex items-center gap-2 h-[38px] pl-4 bg-[#f0fdf5] dark:bg-[#052e14]/50 border-b border-[#16a34a] dark:border-[#16a34a]/40">
        {/* HeroIcons solid check-circle */}
        <svg className="w-6 h-6 text-[#16a34a] dark:text-[#4ade80] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
        </svg>
        <span className="text-[16px] font-bold text-[#111827] dark:text-white">Do</span>
      </div>
      <div className="bg-white dark:bg-[#0D1117] p-4 text-sm text-[#505867] dark:text-[#9CA3AF]">{children}</div>
    </div>
  )
}

// ── DontCard ──────────────────────────────────────────────────────────────────
// Figma: red border #dc2626, header bg #fef2f2, body bg white, x-circle icon
export function DontCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-[#dc2626] dark:border-[#dc2626]/40 bg-[rgba(248,113,113,0.05)] dark:bg-[#450a0a]/30 overflow-hidden">
      <div className="flex items-center gap-2 h-[38px] pl-4 bg-[#fef2f2] dark:bg-[#450a0a]/50 border-b border-[#dc2626] dark:border-[#dc2626]/40">
        {/* HeroIcons solid x-circle */}
        <svg className="w-6 h-6 text-[#dc2626] dark:text-[#f87171] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
        </svg>
        <span className="text-[16px] font-bold text-[#111827] dark:text-white">Don't</span>
      </div>
      <div className="bg-white dark:bg-[#0D1117] p-4 text-sm text-[#505867] dark:text-[#9CA3AF]">{children}</div>
    </div>
  )
}

// ── A11yRow ───────────────────────────────────────────────────────────────────
export function A11yRow({ check, children }: { check: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 px-4 py-4 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
      <code className="text-xs font-mono bg-[#F7F8F8] dark:bg-[#0D1117] text-[#1258F8] dark:text-[#2295FF] px-2 py-1 rounded self-start shrink-0 whitespace-nowrap">
        {check}
      </code>
      <p className="text-sm text-[#505867] dark:text-[#9CA3AF] leading-relaxed">{children}</p>
    </div>
  )
}

// ── KeyRow ────────────────────────────────────────────────────────────────────
export function KeyRow({ keys, action }: { keys: string[]; action: string }) {
  return (
    <div className="flex items-start gap-4 px-4 py-3 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-b-0">
      <div className="flex items-center gap-1 shrink-0">
        {keys.map((k, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-xs text-[#D7DAE0] mx-0.5">/</span>}
            <kbd className="inline-flex items-center px-2 py-1 rounded border border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117] text-xs font-mono text-[#1F2430] dark:text-white font-medium shadow-sm">
              {k}
            </kbd>
          </span>
        ))}
      </div>
      <p className="text-sm text-[#505867] dark:text-[#9CA3AF]">{action}</p>
    </div>
  )
}

// ── Preview ───────────────────────────────────────────────────────────────────
export function Preview({ label, children, bg = 'default' }: {
  label?: string
  children: React.ReactNode
  bg?: 'default' | 'dark' | 'subtle'
}) {
  const bgClass = bg === 'dark'
    ? 'bg-[#1F2430]'
    : bg === 'subtle'
    ? 'bg-[#F7F8F8] dark:bg-[#0D1117]'
    : 'bg-white dark:bg-[#111827]'

  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430]">
      {label && (
        <div className="px-4 py-2 border-b border-[#EDEEF1] dark:border-[#1F2430] bg-[#F7F8F8] dark:bg-[#0D1117] rounded-t-lg">
          <span className="text-xs font-semibold text-[#505867] dark:text-[#6B7280]">{label}</span>
        </div>
      )}
      <div className={`p-6 flex flex-wrap gap-3 items-center relative rounded-b-lg ${label ? '' : 'rounded-lg'} ${bgClass}`}>
        {children}
      </div>
    </div>
  )
}

// ── Annotation ────────────────────────────────────────────────────────────────
export function Annotation({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-[#505867] dark:text-[#9CA3AF] mt-2 flex items-start gap-1.5">
      <svg className="w-3.5 h-3.5 text-[#D7DAE0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
      {children}
    </p>
  )
}

// ── UseList ───────────────────────────────────────────────────────────────────
export function UseList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 max-w-[800px]">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[16px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">
          <span className="mt-0.5 text-[#1258F8] dark:text-[#2295FF] font-bold shrink-0 text-base leading-snug">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ── DontUseList ───────────────────────────────────────────────────────────────
export function DontUseList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 max-w-[800px]">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[16px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45]">
          <span className="mt-0.5 text-[#dc2626] font-bold shrink-0 text-base leading-snug">✕</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ── VariantRow ────────────────────────────────────────────────────────────────
export function VariantRow({
  preview,
  name,
  description,
  last = false,
}: {
  preview: React.ReactNode
  name: string
  description: string
  last?: boolean
}) {
  return (
    <div className={`flex items-center ${last ? '' : 'border-b border-[#EDEEF1] dark:border-[#1F2430]'}`}>
      {/* Preview column: min-w so content never wraps; relative so dropdowns can escape */}
      <div className="min-w-[200px] w-[200px] shrink-0 flex items-center justify-start px-4 py-4 border-r border-[#EDEEF1] dark:border-[#1F2430] relative">
        <div className="whitespace-nowrap">{preview}</div>
      </div>
      <div className="flex-1 px-6 py-4 min-w-0">
        <p className="text-[16px] font-semibold text-[#111827] dark:text-white mb-0.5">{name}</p>
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF]">{description}</p>
      </div>
    </div>
  )
}

// ── VariantTable ──────────────────────────────────────────────────────────────
export function VariantTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117]">
      {children}
    </div>
  )
}

// ── StatesTable ───────────────────────────────────────────────────────────────
export function StatesTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: { label: string; cells: React.ReactNode[] }[]
}) {
  return (
    <div className="overflow-x-auto rounded-[8px] border border-[#EDEEF1] dark:border-[#1F2430]">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-wider w-[120px]">
              Variant
            </th>
            {columns.map(col => (
              <th key={col} className="px-4 py-2.5 text-xs font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-wider text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430] bg-white dark:bg-[#111827]">
          {rows.map(row => (
            <tr key={row.label} className="hover:bg-[#F7F8F8] dark:hover:bg-[#0D1117]/40 transition-colors">
              <td className="px-4 py-4 text-xs font-mono text-[#505867] dark:text-[#6B7280] whitespace-nowrap min-w-[100px]">
                {row.label}
              </td>
              {row.cells.map((cell, i) => (
                <td key={i} className="px-4 py-4 text-center align-middle whitespace-nowrap min-w-[90px]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── RelatedComponents preview registry ────────────────────────────────────────
const RELATED_PREVIEWS: Record<string, React.ReactNode> = {
  '/components/buttons': (
    <div className="flex flex-col gap-2">
      {/* Primary */}
      <div className="h-8 flex items-center justify-center gap-1.5 rounded bg-[#1258F8] px-4">
        <span className="text-[12px] font-semibold text-white">Save changes</span>
      </div>
      {/* Secondary */}
      <div className="h-8 flex items-center justify-center gap-1.5 rounded border border-[#1258F8] px-4">
        <span className="text-[12px] font-semibold text-[#1258F8]">Export</span>
      </div>
      {/* Tertiary */}
      <div className="h-8 flex items-center justify-center gap-1.5 rounded border border-[#D7DAE0] dark:border-[#374151] px-4">
        <span className="text-[12px] font-semibold text-[#505867] dark:text-[#9CA3AF]">Cancel</span>
      </div>
    </div>
  ),
  '/components/inputs': (
    <div className="flex flex-col gap-3">
      {/* Default with value */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold text-[#1F2430] dark:text-white">Building name</span>
        <div className="h-8 flex items-center px-2.5 rounded border border-[#1258F8] bg-white dark:bg-[#0D1117] ring-2 ring-[#1258F8]/20">
          <span className="text-[11px] text-[#1F2430] dark:text-white">Scaler HQ</span>
        </div>
        <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">Enter a unique identifier</span>
      </div>
      {/* Error state */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold text-[#1F2430] dark:text-white">Email address</span>
        <div className="h-8 flex items-center px-2.5 rounded border border-[#EF4444] bg-white dark:bg-[#0D1117]">
          <span className="text-[11px] text-[#8C96A4]">name@example</span>
        </div>
        <span className="text-[10px] text-[#EF4444]">Enter a valid email address</span>
      </div>
    </div>
  ),
  '/components/controls': (
    <div className="flex flex-col gap-2.5">
      {/* Toggle on */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-4 rounded-full bg-[#1258F8] relative shrink-0">
          <span className="absolute top-[1px] right-[1.5px] bottom-[1px] w-[14px] rounded-full bg-white shadow-sm" />
        </div>
        <span className="text-[11px] text-[#1F2430] dark:text-white">Notifications on</span>
      </div>
      {/* Checkbox checked */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-[2px] bg-[#1258F8] border-[1.5px] border-[#1258F8] shrink-0">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-[11px] text-[#1F2430] dark:text-white">Accept terms</span>
      </div>
      {/* Radio selected */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border-2 border-[#1258F8] bg-white dark:bg-[#111827] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1258F8]" />
        </span>
        <span className="text-[11px] text-[#1F2430] dark:text-white">Monthly billing</span>
      </div>
      {/* Toggle off */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-4 rounded-full bg-[#D7DAE0] dark:bg-[#374151] relative shrink-0">
          <span className="absolute top-[1px] left-[1.5px] bottom-[1px] w-[14px] rounded-full bg-white shadow-sm" />
        </div>
        <span className="text-[11px] text-[#505867] dark:text-[#9CA3AF]">Dark mode off</span>
      </div>
    </div>
  ),
  '/components/badges-tags': (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        <Tag label="Default" system="default"  style="filled" size="small" showCount={false} showRemove={false} />
        <Tag label="Success" system="success"  style="filled" size="small" showCount={false} showRemove={false} />
        <Tag label="Error"   system="error"    style="filled" size="small" showCount={false} showRemove={false} />
        <Tag label="Warning" system="warning"  style="filled" size="small" showCount={false} showRemove={false} />
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Tag label="Default"  system="default"       style="outline"    size="small" showCount={false} showRemove={false} />
        <Tag label="Projected" system="missing-info" style="projected"  size="small" showCount={false} showRemove={false} />
      </div>
    </div>
  ),
  '/components/cards': (
    <div className="flex flex-col gap-2 w-full">
      <SimpleCard title="Scaler HQ" subtitle="Sydney · Office" />
      <div className="flex flex-col gap-1.5 text-[11px] bg-white dark:bg-[#111827] rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] px-3 py-2.5">
        <div className="flex items-center justify-between font-semibold text-[#111827] dark:text-white text-[12px]">
          <span>180 George St</span>
          <Tag label="88%" system="error" style="filled" size="small" showCount={false} showRemove={false} />
        </div>
        <div className="flex items-center justify-between text-[#505867] dark:text-[#9CA3AF]">
          <span>Energy use intensity</span><span className="font-medium text-[#111827] dark:text-white">142 kWh/m²</span>
        </div>
        <div className="h-2 rounded flex overflow-hidden mt-1">
          {[['#d76513',16],['#22C55E',25],['#ffb246',25],['#ed113a',19],['#2295FF',15]].map(([c,w],i)=>(
            <div key={i} style={{width:`${w}%`,backgroundColor:String(c)}} />
          ))}
        </div>
      </div>
    </div>
  ),
  '/components/data-points': (
    <div className="flex flex-col gap-3">
      {/* DataTrend positive */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#DCFCE7] flex-shrink-0">
          <svg className="w-3 h-3 text-[#16A34A]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
        </span>
        <span className="text-[13px] font-bold text-[#16A34A]">+12.4%</span>
      </div>
      {/* DataArrow indicator spectrum */}
      <div className="flex gap-1">
        {['#22C55E','#4ADE80','#EAB308','#F97316','#EF4444','#D1D5DB'].map((bg, i) => (
          <span key={i} className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
            <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414L7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" clipRule="evenodd" /></svg>
          </span>
        ))}
      </div>
      {/* DataCompletion */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-[18px] font-bold" style={{ color: '#EA580C' }}>68%</span>
        <span className="text-[10px] text-[#505867]">Complete</span>
        <span className="inline-flex items-center h-4 px-1.5 rounded-full text-[9px] font-medium" style={{ background: '#FEF2F2', color: '#B91C1C' }}>2 Alerts</span>
      </div>
    </div>
  ),
  '/components/tables': (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <div className="grid grid-cols-3 bg-[#F7F8F8] dark:bg-[#1F2430] px-3 py-1.5 border-b border-[#EDEEF1] dark:border-[#1F2430]">
        {['Building', 'Status', 'Score'].map(h => (
          <span key={h} className="text-[9px] font-semibold text-[#505867] dark:text-[#9CA3AF]">{h}</span>
        ))}
      </div>
      {([
        { name: 'Scaler HQ', status: 'Active'  as const, score: '92' },
        { name: 'Tower B',   status: 'Pending' as const, score: '74' },
        { name: 'West Wing', status: 'Inactive' as const, score: '—' },
      ]).map(({ name, status, score }) => (
        <div key={name} className="grid grid-cols-3 items-center px-3 py-1.5 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-0">
          <span className="text-[10px] font-medium text-[#111827] dark:text-white">{name}</span>
          <Tag
            label={status}
            system={status === 'Active' ? 'success' : status === 'Pending' ? 'warning' : 'disabled'}
            size="small" showCount={false} showRemove={false}
          />
          <span className="text-[10px] text-[#111827] dark:text-white">{score}</span>
        </div>
      ))}
    </div>
  ),
  '/components/modals': (
    <div className="rounded-xl border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] overflow-hidden shadow-level-3">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div>
          <p className="text-[12px] font-bold text-[#111827] dark:text-white">Delete building?</p>
          <p className="text-[10px] text-[#505867] dark:text-[#9CA3AF] mt-0.5">This action cannot be undone.</p>
        </div>
        <div className="w-5 h-5 flex items-center justify-center text-[#505867] dark:text-[#9CA3AF]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      {/* Body */}
      <div className="px-4 py-3">
        <p className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">All associated ESG data will be permanently removed from your account.</p>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-[10px] font-medium text-[#EF4444]">Delete</span>
        <div className="flex items-center gap-1.5">
          <div className="h-6 px-2.5 flex items-center rounded border border-[#D7DAE0] dark:border-[#374151]">
            <span className="text-[10px] font-medium text-[#111827] dark:text-white">Cancel</span>
          </div>
          <div className="h-6 px-2.5 flex items-center rounded bg-[#1258F8]">
            <span className="text-[10px] font-medium text-white">Confirm</span>
          </div>
        </div>
      </div>
    </div>
  ),
  '/components/banner': (
    <div className="flex flex-col gap-1.5">
      <Banner type="system"  variant="error"   label="Connection error — retry required" />
      <Banner type="regular" variant="success" label="Report submitted" description="Your ESG data has been saved." />
    </div>
  ),
  '/components/toasts': (
    <div className="flex flex-col gap-1.5">
      <Toast variant="success" label="Changes saved"        description="Your data has been updated." />
      <Toast variant="error"   label="Something went wrong" description="Please try again." />
    </div>
  ),
  '/components/tabs': (
    <div className="flex flex-col gap-3">
      {/* Primary tabs */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wide text-[#9CA3AF] dark:text-[#505867] mb-1.5">Primary</p>
        <div className="flex items-end border-b border-[#EDEEF1] dark:border-[#1F2430]">
          {['Energy', 'GHG', 'Water'].map((label, i) => (
            <div
              key={label}
              className={`px-2.5 h-7 flex items-center text-[11px] font-medium rounded-tl rounded-tr whitespace-nowrap ${
                i === 0
                  ? 'bg-white dark:bg-[#111827] text-[#111827] dark:text-white -mb-px border border-[#EDEEF1] dark:border-[#1F2430] border-b-white dark:border-b-[#111827]'
                  : 'text-[#505867] dark:text-[#9CA3AF]'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      {/* Secondary tabs */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wide text-[#9CA3AF] dark:text-[#505867] mb-1.5">Secondary</p>
        <div className="flex items-center">
          {['YoY', 'MoM', 'YTD', 'Custom'].map((label, i) => (
            <div
              key={label}
              className={`px-2.5 h-7 flex items-center text-[11px] font-medium rounded-tl rounded-tr border-b-2 whitespace-nowrap ${
                i === 0
                  ? 'border-[#1258F8] text-[#111827] dark:text-white'
                  : 'border-[#D7DAE0] dark:border-[#374151] text-[#505867] dark:text-[#9CA3AF]'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  '/components/tooltip': (
    <div className="flex flex-col gap-3 py-2">
      {/* Basic tooltip */}
      <div className="flex items-end justify-center gap-0 relative">
        <div className="relative max-w-[160px] bg-white dark:bg-[#111827] border border-[#D7DAE0] dark:border-[#374151] rounded-lg shadow-md px-3 py-2 mb-6">
          <span className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45 bg-white dark:bg-[#111827] border-b border-r border-[#D7DAE0] dark:border-[#374151]" />
          <p className="text-[11px] font-semibold text-[#111827] dark:text-white mb-0.5">Scope 1</p>
          <p className="text-[10px] text-[#505867] dark:text-[#9CA3AF] leading-snug">Direct GHG emissions</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="h-7 px-3 rounded border border-[#D7DAE0] dark:border-[#374151] flex items-center gap-1.5 text-[11px] text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>
          Scope 1
        </div>
      </div>
    </div>
  ),
  '/components/navigation': (
    <div className="flex flex-col gap-0.5">
      <div className="px-2 py-1.5 rounded text-[10px] font-medium text-[#505867] dark:text-[#9CA3AF]">Overview</div>
      <div className="px-2 py-1.5 rounded bg-[#D9EAFF] text-[10px] font-semibold text-[#1258F8]">Components</div>
      <div className="px-2 py-1.5 rounded text-[10px] font-medium text-[#505867] dark:text-[#9CA3AF]">Patterns</div>
      <div className="px-2 py-1.5 rounded text-[10px] font-medium text-[#505867] dark:text-[#9CA3AF]">Foundations</div>
    </div>
  ),
  '/components/button-group': (
    <div className="flex flex-col gap-2">
      <div className="flex rounded border border-[#D7DAE0] dark:border-[#374151] overflow-hidden w-fit">
        {['Day', 'Week', 'Month'].map((label, i) => (
          <div
            key={label}
            className={`h-8 px-3 flex items-center text-[11px] font-semibold border-r border-[#D7DAE0] dark:border-[#374151] last:border-0 ${i === 1 ? 'bg-[#1258F8] text-white' : 'text-[#505867] dark:text-[#9CA3AF] bg-white dark:bg-[#111827]'}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {(['Export', 'Share', 'Archive'] as const).map((label, i) => (
          <div key={label} className={`h-7 px-2.5 flex items-center rounded text-[10px] font-semibold border ${i === 0 ? 'bg-[#1258F8] text-white border-[#1258F8]' : 'text-[#505867] dark:text-[#9CA3AF] border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#111827]'}`}>
            {label}
          </div>
        ))}
      </div>
    </div>
  ),
  '/foundations/typography': (
    <div className="flex flex-col gap-1.5">
      <span className="text-[18px] font-bold text-[#111827] dark:text-white leading-tight">Display heading</span>
      <span className="text-[14px] font-semibold text-[#111827] dark:text-white">Section subheading</span>
      <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF] leading-relaxed">Body — 16px, 145% line-height, Manrope</span>
      <span className="text-[10px] text-[#8C96A4] tracking-wide">CAPTION · LABEL · 12PX</span>
    </div>
  ),
  '/patterns/esg-data': (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap gap-1">
        {([
          { label: 'Energy', bg: '#FFE2E4', fg: '#C80831' },
          { label: 'GHG',    bg: '#FFD188', fg: '#B73306' },
          { label: 'Water',  bg: '#A5F5FC', fg: '#0E7790' },
          { label: 'Waste',  bg: '#BEDCCD', fg: '#285446' },
        ] as {label:string;bg:string;fg:string}[]).map(({ label, bg, fg }) => (
          <span key={label} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ background: bg, color: fg }}>
            {label}
          </span>
        ))}
      </div>
      {/* Mini data bar chart */}
      <div className="flex items-end gap-1 h-10 mt-1">
        {[60, 85, 45, 70, 92, 55].map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i % 2 === 0 ? '#2295FF' : '#D9EAFF' }} />
        ))}
      </div>
    </div>
  ),
  '/patterns/empty-states': (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="w-10 h-10 rounded-full bg-[#F7F8F8] dark:bg-[#1F2430] flex items-center justify-center">
        <svg className="w-5 h-5 text-[#D7DAE0] dark:text-[#374151]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
        </svg>
      </div>
      <span className="text-[11px] font-semibold text-[#111827] dark:text-white">No data yet</span>
      <span className="text-[10px] text-[#8C96A4] text-center leading-tight">Add your first item<br/>to get started.</span>
      <div className="h-6 px-3 flex items-center rounded bg-[#1258F8] mt-0.5">
        <span className="text-[10px] font-semibold text-white">Add item</span>
      </div>
    </div>
  ),
  '/components/breadcrumbs': (
    <div className="flex flex-col gap-2">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Breadcrumbs' },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: 'APAC', href: '/portfolio/apac' },
          { label: '180 George St', href: '/portfolio/apac/180-george' },
          { label: 'Energy' },
        ]}
      />
    </div>
  ),
  '/patterns/accessibility': (
    <div className="flex flex-col gap-2">
      {/* Contrast example */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded flex items-center justify-center bg-[#111827]">
          <span className="text-[8px] font-bold text-white">Aa</span>
        </div>
        <div className="flex-1 h-1.5 rounded-full bg-[#EDEEF1] dark:bg-[#1F2430]">
          <div className="h-1.5 rounded-full bg-[#22C55E] w-[90%]" />
        </div>
        <span className="text-[9px] font-semibold text-[#22C55E]">AAA</span>
      </div>
      {/* Focus ring */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded border-2 border-[#1258F8] ring-2 ring-[#1258F8]/30 bg-white dark:bg-[#111827]" />
        <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">Focus ring visible</span>
      </div>
      {/* Keyboard */}
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#1F2430]">
          <span className="text-[9px] font-mono text-[#505867] dark:text-[#9CA3AF]">Tab</span>
        </span>
        <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">Keyboard nav</span>
      </div>
    </div>
  ),
}

// ── RelatedComponents ─────────────────────────────────────────────────────────
export function RelatedComponents({
  items,
}: {
  items: { href: string; label: string; description: string }[]
}) {
  return (
    <section className="rounded-[8px] overflow-hidden">
      <div className="py-8">
        <h2 className="text-[24px] font-semibold text-[#111827] dark:text-white mb-8 leading-[1.4]">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ href, label, description }) => {
            const preview = RELATED_PREVIEWS[href]
            return (
              <a
                key={href}
                href={href}
                className="group block px-4 py-4 rounded-[8px] border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#111827] hover:border-[#1258F8] dark:hover:border-[#2295FF] transition-colors"
              >
                <p className="text-[16px] font-semibold text-[#111827] dark:text-white group-hover:text-[#1258F8] dark:group-hover:text-[#2295FF] transition-colors mb-1">
                  {label}
                </p>
                <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mb-4">{description}</p>
                {preview && (
                  <div className="pointer-events-none select-none">
                    {preview}
                  </div>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
