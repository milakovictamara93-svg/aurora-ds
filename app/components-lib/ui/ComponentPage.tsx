'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'

// ── TOC Context ──────────────────────────────────────────────────────────────
// Sections register themselves here so the TOC can render dynamically.

type TocEntry = { id: string; num: string; label: string }

const TocCtx = createContext<{
  entries: TocEntry[]
  register: (entry: TocEntry) => void
  activeId: string
}>({ entries: [], register: () => {}, activeId: '' })

// ── ComponentPageLayout ──────────────────────────────────────────────────────
// Wraps the full page: main content + sticky right TOC.

export function ComponentPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [entries, setEntries] = useState<TocEntry[]>([])
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  function register(entry: TocEntry) {
    setEntries(prev => {
      if (prev.find(e => e.id === entry.id)) return prev
      return [...prev, entry].sort((a, b) => a.num.localeCompare(b.num))
    })
  }

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (ioEntries) => {
        const visible = ioEntries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    return () => observerRef.current?.disconnect()
  }, [])

  // Observe sections as they register
  useEffect(() => {
    const obs = observerRef.current
    if (!obs) return

    obs.disconnect()
    entries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
  }, [entries])

  return (
    <TocCtx.Provider value={{ entries, register, activeId }}>
      <div className="flex gap-12">
        {/* Main content */}
        <div className="flex-1 min-w-0 pb-24">
          {children}
        </div>

        {/* Sticky TOC — matches left sidebar visual weight */}
        <TableOfContents />
      </div>
    </TocCtx.Provider>
  )
}

// ── TableOfContents ──────────────────────────────────────────────────────────

function TableOfContents() {
  const { entries, activeId } = useContext(TocCtx)

  if (entries.length === 0) return null

  return (
    <aside className="hidden xl:block w-[220px] shrink-0">
      <div className="sticky top-8 max-h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-[#0D1117] rounded-lg px-4 py-5">
        <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#C4C9D4] dark:text-[#3F4654] mb-3">
          On this page
        </p>
        <ol className="flex flex-col gap-0">
          {entries.map(({ id, num, label }) => {
            const active = activeId === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={[
                    'flex items-center gap-2.5 py-1.5 pl-3 border-l-2 text-[14px] transition-colors',
                    active
                      ? 'border-[#111827] dark:border-white text-[#111827] dark:text-white font-medium'
                      : 'border-transparent text-[#505867] dark:text-[#6B7280] hover:text-[#111827] dark:hover:text-white',
                  ].join(' ')}
                >
                  <span className="font-mono text-[10px] text-[#C4C9D4] dark:text-[#3F4654] w-3 shrink-0">
                    {num}
                  </span>
                  <span className="truncate">{label}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </aside>
  )
}

// ── TitleBlock ────────────────────────────────────────────────────────────────

export function TitleBlock({
  title,
  description,
  covers,
  status,
  since,
}: {
  title: string
  description: string
  covers?: string
  status?: 'stable' | 'beta' | 'deprecated'
  since?: string
}) {
  const dotColor =
    status === 'stable' ? 'bg-[#16a34a]' :
    status === 'beta' ? 'bg-[#d97706]' :
    'bg-[#dc2626]'

  const showMeta = status || since

  return (
    <div className="mb-12">
      <h1 className="text-[20px] font-semibold text-[#111827] dark:text-white leading-[1.1] tracking-[-0.02em] mb-3">
        {title}
      </h1>
      <p className="text-[16px] text-[#505867] dark:text-[#9CA3AF] leading-[1.5] max-w-[640px]">
        {description}
      </p>
      {covers && (
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mt-3 max-w-[640px]"
          dangerouslySetInnerHTML={{ __html: covers }}
        />
      )}
      {showMeta && (
        <div className="flex flex-wrap gap-2 items-center mt-6">
          {status && (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 border border-[#EDEEF1] dark:border-[#1F2430] rounded-full bg-white dark:bg-[#0D1117] text-[#111827] dark:text-white">
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )}
          {since && (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 border border-[#EDEEF1] dark:border-[#1F2430] rounded-full bg-white dark:bg-[#0D1117]">
              <span className="text-[#505867] dark:text-[#9CA3AF]">since</span>
              <span className="text-[#111827] dark:text-white">{since}</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// ── SectionWrapper ───────────────────────────────────────────────────────────
// Numbered section with border-top divider, auto-registers with TOC.

export function SectionWrapper({
  id,
  num,
  total,
  title,
  description,
  children,
}: {
  id: string
  num: string
  total: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  const { register } = useContext(TocCtx)
  const registered = useRef(false)

  useEffect(() => {
    if (!registered.current) {
      register({ id, num, label: title })
      registered.current = true
    }
  }, [id, num, title, register])

  return (
    <section
      id={id}
      className="scroll-mt-8 mt-16 pt-8 border-t border-[#EDEEF1] dark:border-[#1F2430]"
    >
      <span className="font-mono text-[12px] text-[#C4C9D4] dark:text-[#3F4654] tracking-[0.04em] mb-2 block">
        {num} / {total}
      </span>
      <h2 className="text-[20px] font-semibold text-[#111827] dark:text-white tracking-[-0.015em] mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-[14px] text-[#505867] dark:text-[#9CA3AF] mb-6">
          {description}
        </p>
      )}
      {children}
    </section>
  )
}

// ── WhenToUse ────────────────────────────────────────────────────────────────
// Two-card grid: do / don't.

export function WhenToUse({
  doItems,
  dontItems,
  doLabel = 'Use when',
  dontLabel = 'Do not use when',
}: {
  doItems: React.ReactNode[]
  dontItems: React.ReactNode[]
  doLabel?: string
  dontLabel?: string
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-5">
        <div className="flex items-center gap-2 font-semibold text-[14px] text-[#111827] dark:text-white mb-3">
          <span className="text-[#16a34a] font-bold">&#10003;</span>
          {doLabel}
        </div>
        <ul className="flex flex-col gap-1.5 pl-5 text-[14px] text-[#505867] dark:text-[#9CA3AF] list-disc marker:text-[#D7DAE0] dark:marker:text-[#374151]">
          {doItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-5">
        <div className="flex items-center gap-2 font-semibold text-[14px] text-[#111827] dark:text-white mb-3">
          <span className="text-[#dc2626] font-bold">&#10005;</span>
          {dontLabel}
        </div>
        <ul className="flex flex-col gap-1.5 pl-5 text-[14px] text-[#505867] dark:text-[#9CA3AF] list-disc marker:text-[#D7DAE0] dark:marker:text-[#374151]">
          {dontItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

// ── DecisionTree ─────────────────────────────────────────────────────────────
// 3-col table: intent / use / not.

export function DecisionTree({
  rows,
}: {
  rows: { intent: string; use: React.ReactNode; not: React.ReactNode }[]
}) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] overflow-hidden bg-white dark:bg-[#0D1117]">
      <table className="w-full text-[14px] border-collapse">
        <thead>
          <tr className="bg-[#F7F8F8] dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430]">
            <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]" style={{ width: '50%' }}>
              If the user wants to...
            </th>
            <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">
              Use
            </th>
            <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-[#505867] dark:text-[#6B7280] uppercase tracking-[0.06em]">
              Not
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EDEEF1] dark:divide-[#1F2430]">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[#F7F8F8] dark:hover:bg-[#0D1117]/60 transition-colors">
              <td className="px-4 py-3 text-[#111827] dark:text-white">{row.intent}</td>
              <td className="px-4 py-3">{row.use}</td>
              <td className="px-4 py-3 text-[#505867] dark:text-[#9CA3AF]">{row.not}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── RequiredPairings ─────────────────────────────────────────────────────────

export function RequiredPairings({
  rules,
}: {
  rules: React.ReactNode[]
}) {
  return (
    <div className="border-l-[3px] border-[#166534] bg-[#f0fdf4] dark:bg-[#052e14]/30 rounded-r-lg py-3.5 px-4">
      <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#166534] mb-2.5">
        Required
      </p>
      <ul className="flex flex-col gap-0 text-[14px]">
        {rules.map((rule, i) => (
          <li
            key={i}
            className={[
              'relative pl-6 py-2',
              i < rules.length - 1 ? 'border-b border-black/[0.06] dark:border-white/[0.06]' : '',
            ].join(' ')}
          >
            <span className="absolute left-0 top-2 text-[#166534] font-bold">&#10003;</span>
            <span className="text-[#111827] dark:text-[#D1D5DB]">{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── ForbiddenRefuse ──────────────────────────────────────────────────────────

export function ForbiddenRefuse({
  rules,
}: {
  rules: { rule: React.ReactNode; response: React.ReactNode }[]
}) {
  return (
    <div className="border-l-[3px] border-[#dc2626] bg-[#fef2f2] dark:bg-[#450a0a]/30 rounded-r-lg py-3.5 px-4">
      <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#dc2626] mb-2.5">
        Refuse
      </p>
      <ul className="flex flex-col gap-0 text-[14px]">
        {rules.map((item, i) => (
          <li
            key={i}
            className={[
              'relative pl-6 py-2',
              i < rules.length - 1 ? 'border-b border-black/[0.06] dark:border-white/[0.06]' : '',
            ].join(' ')}
          >
            <span className="absolute left-0 top-2 text-[#dc2626] font-bold">&#10005;</span>
            <div>
              <span className="text-[#111827] dark:text-[#D1D5DB]">{item.rule}</span>
              <p className="mt-1.5 text-[14px] italic text-[#505867] dark:text-[#9CA3AF]">
                {item.response}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── AccessibilityList ────────────────────────────────────────────────────────

export function AccessibilityList({
  items,
}: {
  items: { key: string; value: React.ReactNode }[]
}) {
  return (
    <ul className="flex flex-col gap-0 text-[14px]">
      {items.map(({ key, value }, i) => (
        <li
          key={i}
          className={[
            'grid grid-cols-[140px_1fr] gap-4 py-2.5',
            i < items.length - 1 ? 'border-b border-[#EDEEF1] dark:border-[#1F2430]' : '',
          ].join(' ')}
        >
          <span className="font-mono text-[12px] text-[#505867] dark:text-[#6B7280]">{key}</span>
          <span className="text-[#505867] dark:text-[#9CA3AF]">{value}</span>
        </li>
      ))}
    </ul>
  )
}

// ── AnatomyBlock ─────────────────────────────────────────────────────────────

export function AnatomyBlock({
  diagram,
  annotations,
}: {
  diagram: React.ReactNode
  annotations: { num: string; label: string; description: React.ReactNode }[]
}) {
  return (
    <div className="rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-8 mb-6">
      <div className="flex items-center justify-center mb-8">
        {diagram}
      </div>
      <div className="flex flex-col gap-1">
        {annotations.map(({ num, label, description }) => (
          <div key={num} className="grid grid-cols-[24px_140px_1fr] gap-3 py-1.5 text-[14px]">
            <span className="font-mono text-[10px] text-[#C4C9D4] dark:text-[#3F4654] bg-[#F7F8F8] dark:bg-[#1F2430] rounded text-center leading-[18px] h-[18px]">
              {num}
            </span>
            <span className="font-mono text-[12px] text-[#111827] dark:text-white">{label}</span>
            <span className="text-[#505867] dark:text-[#9CA3AF]">{description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── CanonicalExample ─────────────────────────────────────────────────────────

export function CanonicalExample({
  filename,
  code,
}: {
  filename: string
  code: string
}) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-[#F7F8F8] dark:bg-[#0D1117] border border-[#EDEEF1] dark:border-[#1F2430] border-b-0 rounded-t-lg px-4 py-2">
        <span className="font-mono text-[12px] text-[#505867] dark:text-[#6B7280]">{filename}</span>
        <button
          onClick={handleCopy}
          className="text-[12px] text-[#505867] dark:text-[#6B7280] hover:text-[#111827] dark:hover:text-white transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] rounded-b-lg p-5 overflow-x-auto font-mono text-[14px] leading-[1.6] text-[#111827] dark:text-[#D1D5DB]">
        {code}
      </pre>
    </div>
  )
}

// ── RelatedGrid ──────────────────────────────────────────────────────────────

export function RelatedGrid({
  items,
}: {
  items: { href: string; name: string; description: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map(({ href, name, description }) => (
        <a
          key={href}
          href={href}
          className="block rounded-lg border border-[#EDEEF1] dark:border-[#1F2430] bg-white dark:bg-[#0D1117] p-4 hover:border-[#D7DAE0] dark:hover:border-[#374151] transition-colors"
        >
          <p className="font-mono text-[14px] font-medium text-[#111827] dark:text-white">{name}</p>
          <p className="text-[12px] text-[#505867] dark:text-[#9CA3AF] mt-0.5">{description}</p>
        </a>
      ))}
    </div>
  )
}

// ── TodoSection ──────────────────────────────────────────────────────────────
// Placeholder for sections that don't have content yet.

export function TodoSection({ label }: { label?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[#D7DAE0] dark:border-[#374151] bg-[#F7F8F8] dark:bg-[#0D1117] py-8 px-6 text-center">
      <p className="text-[14px] text-[#C4C9D4] dark:text-[#3F4654]">
        {label ?? 'Content coming in a follow-up PR.'}
      </p>
    </div>
  )
}

// ── Inline code helper ───────────────────────────────────────────────────────

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[14px] bg-[#F7F8F8] dark:bg-[#1F2430] text-[#111827] dark:text-white px-1.5 py-0.5 rounded">
      {children}
    </code>
  )
}

// ── PageFooter ───────────────────────────────────────────────────────────────

export function PageFooter({ lastUpdated, version }: { lastUpdated?: string; version?: string }) {
  return (
    <div className="mt-24 pt-6 border-t border-[#EDEEF1] dark:border-[#1F2430] flex items-center justify-between text-[14px] text-[#505867] dark:text-[#9CA3AF]">
      <div className="flex items-center gap-3">
        <a href="#" className="hover:text-[#111827] dark:hover:text-white underline transition-colors">Edit this page on GitHub</a>
        <span className="text-[#D7DAE0] dark:text-[#374151]">|</span>
        <a href="#" className="hover:text-[#111827] dark:hover:text-white underline transition-colors">Report an issue</a>
      </div>
      {(lastUpdated || version) && (
        <span>
          {lastUpdated && `Last updated ${lastUpdated}`}
          {lastUpdated && version && ' · '}
          {version && `v${version}`}
        </span>
      )}
    </div>
  )
}
