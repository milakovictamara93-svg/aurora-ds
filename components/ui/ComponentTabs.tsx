'use client'

import { useState, createContext, useContext } from 'react'

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
  return <div>{children}</div>
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
        <h2 className="text-[20px] font-semibold text-[#1F2430] dark:text-white mb-2 leading-[1.4]">
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
    <div className="rounded-[8px] border border-[#16a34a] dark:border-[#16a34a]/40 bg-[#f0fdf5] dark:bg-[#052e14]/30 overflow-hidden">
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
    <div className="flex flex-col gap-1.5">
      <div className="h-7 flex items-center justify-center rounded bg-[#1258F8] px-3">
        <span className="text-[11px] font-semibold text-white">Primary</span>
      </div>
      <div className="h-7 flex items-center justify-center rounded border border-[#1258F8] px-3">
        <span className="text-[11px] font-semibold text-[#1258F8]">Secondary</span>
      </div>
      <div className="h-7 flex items-center justify-center rounded border border-[#D7DAE0] dark:border-[#374151] px-3">
        <span className="text-[11px] font-semibold text-[#505867] dark:text-[#9CA3AF]">Tertiary</span>
      </div>
    </div>
  ),
  '/components/inputs': (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium text-[#1F2430] dark:text-white">Label</span>
        <div className="h-7 flex items-center px-2.5 rounded border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#0D1117]">
          <span className="text-[11px] text-[#1F2430] dark:text-white">Value</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium text-[#1F2430] dark:text-white">Email</span>
        <div className="h-7 flex items-center px-2.5 rounded border border-[#D7DAE0] dark:border-[#374151] bg-white dark:bg-[#0D1117]">
          <span className="text-[11px] text-[#8C96A4]">placeholder@email.com</span>
        </div>
      </div>
    </div>
  ),
  '/components/badges-tags': (
    <div className="flex flex-wrap gap-1.5">
      {([
        { label: 'Default', bg: '#D9EAFF', fg: '#173691' },
        { label: 'Success', bg: '#DCFCE7', fg: '#166534' },
        { label: 'Error',   bg: '#FEE2E2', fg: '#991B1B' },
        { label: 'Warning', bg: '#FFEDD5', fg: '#9A3412' },
        { label: 'AI',      bg: '#EDE9FE', fg: '#4C1D95' },
      ] as {label:string;bg:string;fg:string}[]).map(({ label, bg, fg }) => (
        <span key={label} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: bg, color: fg }}>
          {label}
        </span>
      ))}
    </div>
  ),
  '/components/cards': (
    <div className="rounded-md border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden">
      <div className="px-3 py-2 border-b border-[#EDEEF1] dark:border-[#1F2430] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#111827] dark:text-white">Card title</span>
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#DCFCE7] text-[#166534]">Active</span>
      </div>
      <div className="px-3 py-2">
        <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">Card body content goes here.</span>
      </div>
    </div>
  ),
  '/components/tables': (
    <div className="rounded-md border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden">
      <div className="grid grid-cols-3 bg-[#F7F8F8] dark:bg-[#1F2430] px-2 py-1.5 border-b border-[#EDEEF1] dark:border-[#1F2430]">
        {['Name', 'Status', 'Score'].map(h => (
          <span key={h} className="text-[9px] font-semibold text-[#505867] dark:text-[#9CA3AF] uppercase tracking-wide">{h}</span>
        ))}
      </div>
      {[['Scaler HQ', 'Active', '92'], ['Tower B', 'Pending', '74']].map(([name, status, score]) => (
        <div key={name} className="grid grid-cols-3 px-2 py-1.5 border-b border-[#EDEEF1] dark:border-[#1F2430] last:border-0">
          <span className="text-[10px] text-[#111827] dark:text-white">{name}</span>
          <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">{status}</span>
          <span className="text-[10px] text-[#111827] dark:text-white">{score}</span>
        </div>
      ))}
    </div>
  ),
  '/components/modals': (
    <div className="rounded-md border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] overflow-hidden shadow-sm">
      <div className="px-3 py-2 border-b border-[#EDEEF1] dark:border-[#1F2430]">
        <span className="text-[11px] font-semibold text-[#111827] dark:text-white">Confirm action</span>
      </div>
      <div className="px-3 py-2">
        <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">Are you sure you want to proceed?</span>
      </div>
      <div className="px-3 py-2 flex gap-2 justify-end border-t border-[#EDEEF1] dark:border-[#1F2430]">
        <div className="h-5 px-2 flex items-center rounded border border-[#D7DAE0] dark:border-[#374151]">
          <span className="text-[9px] font-medium text-[#505867] dark:text-[#9CA3AF]">Cancel</span>
        </div>
        <div className="h-5 px-2 flex items-center rounded bg-[#1258F8]">
          <span className="text-[9px] font-medium text-white">Confirm</span>
        </div>
      </div>
    </div>
  ),
  '/components/toasts': (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-2 px-3 py-2 rounded-md bg-[#111827] dark:bg-[#1F2430]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1 shrink-0" />
        <span className="text-[10px] text-white">Changes saved successfully.</span>
      </div>
      <div className="flex items-start gap-2 px-3 py-2 rounded-md bg-[#111827] dark:bg-[#1F2430]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#F87171] mt-1 shrink-0" />
        <span className="text-[10px] text-white">Something went wrong.</span>
      </div>
    </div>
  ),
  '/components/navigation': (
    <div className="flex flex-col gap-0.5">
      {['Overview', 'Components', 'Patterns', 'Foundations'].map((item, i) => (
        <div key={item} className={`px-2 py-1.5 rounded text-[10px] font-medium ${i === 1 ? 'bg-[#D9EAFF] text-[#1258F8]' : 'text-[#505867] dark:text-[#9CA3AF]'}`}>
          {item}
        </div>
      ))}
    </div>
  ),
  '/foundations/typography': (
    <div className="flex flex-col gap-1">
      <span className="text-[18px] font-bold text-[#111827] dark:text-white leading-tight">Heading</span>
      <span className="text-[13px] font-semibold text-[#111827] dark:text-white">Subheading</span>
      <span className="text-[11px] text-[#505867] dark:text-[#9CA3AF]">Body text — 16px / 145%</span>
      <span className="text-[10px] text-[#8C96A4]">Caption — 12px</span>
    </div>
  ),
  '/patterns/esg-data': (
    <div className="flex flex-wrap gap-1.5">
      {([
        { label: 'Energy',  bg: '#FFE2E4', fg: '#C80831' },
        { label: 'GHG',     bg: '#FFD188', fg: '#B73306' },
        { label: 'Water',   bg: '#A5F5FC', fg: '#0E7790' },
        { label: 'Waste',   bg: '#BEDCCD', fg: '#285446' },
      ] as {label:string;bg:string;fg:string}[]).map(({ label, bg, fg }) => (
        <span key={label} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: bg, color: fg }}>
          {label}
        </span>
      ))}
    </div>
  ),
  '/patterns/empty-states': (
    <div className="flex flex-col items-center gap-1.5 py-1">
      <div className="w-8 h-8 rounded-full bg-[#F7F8F8] dark:bg-[#1F2430] flex items-center justify-center">
        <div className="w-4 h-4 rounded border-2 border-[#D7DAE0] dark:border-[#374151]" />
      </div>
      <span className="text-[10px] font-medium text-[#111827] dark:text-white">No data yet</span>
      <span className="text-[9px] text-[#8C96A4] text-center">Add your first item to get started.</span>
    </div>
  ),
  '/patterns/accessibility': (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
        <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">AA 4.5:1 contrast</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2295FF]" />
        <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">Focus ring visible</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#653FFF]" />
        <span className="text-[10px] text-[#505867] dark:text-[#9CA3AF]">Keyboard navigable</span>
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
    <section className="rounded-[8px] overflow-hidden related-grid-bg">
      <div className="p-8">
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
