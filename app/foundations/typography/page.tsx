import PageHeader from '@/app/components-lib/ui/PageHeader'

// ── Type scale data (source of truth — mirrors Figma node 22:8058) ────────────

const HEADING_WEIGHTS = [
  { label: 'Regular',  class: 'font-normal',   value: 400 },
  { label: 'Medium',   class: 'font-medium',    value: 500 },
  { label: 'SemiBold', class: 'font-semibold',  value: 600 },
  { label: 'Bold',     class: 'font-bold',      value: 700 },
]

const PARAGRAPH_WEIGHTS = [
  { label: 'Regular', class: 'font-normal',  value: 400 },
  { label: 'Medium',  class: 'font-medium',  value: 500 },
  { label: 'Bold',    class: 'font-bold',    value: 700 },
]

const HEADINGS = [
  {
    name: 'Heading 1',
    token: 'text-3xl',
    size: 28,
    lineHeight: '140%',
    letterSpacing: '0%',
    paraSpacing: '0px',
    tailwind: 'text-[28px] leading-[140%]',
    sample: 'Heading H1',
  },
  {
    name: 'Heading 2',
    token: 'text-2xl',
    size: 24,
    lineHeight: '140%',
    letterSpacing: '0%',
    paraSpacing: '0px',
    tailwind: 'text-[24px] leading-[140%]',
    sample: 'Heading H2',
  },
  {
    name: 'Heading 3',
    token: 'text-xl',
    size: 20,
    lineHeight: '140%',
    letterSpacing: '0%',
    paraSpacing: '0px',
    tailwind: 'text-[20px] leading-[140%]',
    sample: 'Heading H3',
  },
]

const PARAGRAPHS = [
  {
    name: 'Paragraph XLarge',
    token: 'text-xl',
    size: 21,
    lineHeight: '145%',
    letterSpacing: '1.5%',
    paraSpacing: '0px',
    tailwind: 'text-[21px] leading-[145%] tracking-[0.015em]',
    sample: 'Create a design playbook that outlines the department\'s expectations, best practices.',
  },
  {
    name: 'Paragraph Large',
    token: 'text-lg',
    size: 18,
    lineHeight: '145%',
    letterSpacing: '1.5%',
    paraSpacing: '0px',
    tailwind: 'text-[18px] leading-[145%] tracking-[0.015em]',
    sample: 'Create a design playbook that outlines the department\'s expectations, best practices.',
  },
  {
    name: 'Paragraph Medium',
    token: 'text-base',
    size: 16,
    lineHeight: '145%',
    letterSpacing: '1.5%',
    paraSpacing: '0px',
    tailwind: 'text-[16px] leading-[145%] tracking-[0.015em]',
    sample: 'Create a design playbook that outlines the department\'s expectations, best practices.',
  },
  {
    name: 'Paragraph Small',
    token: 'text-sm',
    size: 14,
    lineHeight: '145%',
    letterSpacing: '1.5%',
    paraSpacing: '0px',
    tailwind: 'text-[14px] leading-[145%] tracking-[0.015em]',
    sample: 'Create a design playbook that outlines the department\'s expectations, best practices.',
  },
  {
    name: 'Paragraph XSmall',
    token: 'text-xs',
    size: 12,
    lineHeight: '145%',
    letterSpacing: '1.5%',
    paraSpacing: '0px',
    tailwind: 'text-[12px] leading-[145%] tracking-[0.015em]',
    sample: 'Create a design playbook that outlines the department\'s expectations, best practices.',
  },
  {
    name: 'Paragraph XXSmall',
    token: 'text-[11px]',
    size: 11,
    lineHeight: '145%',
    letterSpacing: '0%',
    paraSpacing: '0px',
    tailwind: 'text-[11px] leading-[145%]',
    sample: 'Create a design playbook that outlines the department\'s expectations, best practices.',
  },
  {
    name: 'Paragraph Caption',
    token: 'text-sm',
    size: 14,
    lineHeight: '100%',
    letterSpacing: '16%',
    paraSpacing: '0px',
    tailwind: 'text-[14px] leading-[100%] tracking-[0.16em] uppercase',
    sample: 'Create a design playbook that outlines the department\'s expectations, best practices.',
    uppercase: true,
  },
]

// ── Spec pill ─────────────────────────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-widest font-semibold text-token-muted">{label}</span>
      <span className="text-[13px] text-token-secondary">{value}</span>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TypographyPage() {
  return (
    <div>
      <PageHeader
        title="Typography"
        description="Inter is the sole typeface across all Aurora interfaces. All sizes, weights, and spacing values below are the single source of truth — pulled directly from Figma."
        badge="Foundations"
      />

      {/* ── Headings ─────────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Headings</h2>
          <p className="text-sm text-token-secondary mt-1">
            Three heading levels — each available in Regular, Medium, SemiBold, and Bold.
            Letter spacing is always 0% for headings.
          </p>
        </div>

        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">
          {HEADINGS.map(h => (
            <div key={h.name} className="p-6 flex flex-col gap-5">
              {/* Specs */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] font-semibold text-token-primary">{h.name}</p>
                  <div className="flex flex-wrap gap-5 mt-2">
                    <SpecRow label="Font" value="Inter" />
                    <SpecRow label="Size" value={`${h.size}px`} />
                    <SpecRow label="Line height" value={h.lineHeight} />
                    <SpecRow label="Letter spacing" value={h.letterSpacing} />
                    <SpecRow label="Para spacing" value={h.paraSpacing} />
                    <SpecRow label="Weights" value="Regular · Medium · SemiBold · Bold" />
                  </div>
                </div>
                <code className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded shrink-0">
                  {h.tailwind}
                </code>
              </div>
              {/* Weight previews */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {HEADING_WEIGHTS.map(w => (
                  <div key={w.value} className="rounded-lg border border-token bg-token-secondary p-4">
                    <p className={`${h.tailwind} ${w.class} text-token-primary`}>{h.sample}</p>
                    <p className="text-[11px] text-token-muted mt-2">{w.label} · {w.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Paragraphs ───────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Paragraphs</h2>
          <p className="text-sm text-token-secondary mt-1">
            Seven paragraph scales from XLarge (21px) down to Caption (14px). Body text uses 1.5% letter spacing and 145% line height throughout.
          </p>
        </div>

        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">
          {PARAGRAPHS.map(p => (
            <div key={p.name} className="p-6 flex flex-col gap-5">
              {/* Specs */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] font-semibold text-token-primary">{p.name}</p>
                  <div className="flex flex-wrap gap-5 mt-2">
                    <SpecRow label="Font" value="Inter" />
                    <SpecRow label="Size" value={`${p.size}px`} />
                    <SpecRow label="Line height" value={p.lineHeight} />
                    <SpecRow label="Letter spacing" value={p.letterSpacing} />
                    <SpecRow label="Para spacing" value={p.paraSpacing} />
                    <SpecRow label="Weights" value="Regular · Medium · Bold" />
                  </div>
                </div>
                <code className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded shrink-0">
                  {p.tailwind}
                </code>
              </div>
              {/* Weight previews */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PARAGRAPH_WEIGHTS.map(w => (
                  <div key={w.value} className="rounded-lg border border-token bg-token-secondary p-4">
                    <p className={`${p.tailwind} ${w.class} text-token-primary`}>{p.sample}</p>
                    <p className="text-[11px] text-token-muted mt-2">{w.label} · {w.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rules ────────────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Rules</h2>
        </div>

        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">

          {/* Capitalization */}
          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Capitalization</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-token-muted mb-3">By element</p>
                <ul className="space-y-2.5 text-sm text-token-secondary">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[13px] text-token-muted shrink-0 w-5 mt-px">→</span>
                    <span><strong className="text-token-primary font-semibold">Navigation</strong> (side nav, top nav, tabs) — Title Case</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[13px] text-token-muted shrink-0 w-5 mt-px">→</span>
                    <span><strong className="text-token-primary font-semibold">Titles, headings, descriptions, body text</strong> — Sentence case</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[13px] text-token-muted shrink-0 w-5 mt-px">→</span>
                    <span><strong className="text-token-primary font-semibold">CTAs and buttons</strong> — Sentence case (e.g., "Save changes", not "Save Changes")</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[13px] text-token-muted shrink-0 w-5 mt-px">→</span>
                    <span><strong className="text-token-primary font-semibold">Acronyms</strong> — uppercase only when widely recognised (e.g., NABERS, ESG, GHG)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[13px] text-token-muted shrink-0 w-5 mt-px">→</span>
                    <span><strong className="text-token-primary font-semibold">Caption style</strong> — uppercase via CSS text-transform, never typed in caps</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-token-muted mb-3">What to avoid</p>
                <ul className="space-y-2.5 text-sm text-token-secondary">
                  <li className="flex items-start gap-2.5">
                    <span className="text-error-600 font-bold shrink-0 w-5 mt-px">✗</span>
                    <span>All caps for body text or headings — reduces readability</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-error-600 font-bold shrink-0 w-5 mt-px">✗</span>
                    <span>Title case for body copy or button labels</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-error-600 font-bold shrink-0 w-5 mt-px">✗</span>
                    <span>Italics — not part of the type system</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-error-600 font-bold shrink-0 w-5 mt-px">✗</span>
                    <span>Underlines for emphasis — reserved for links only</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Examples */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-success-200 dark:border-success-900 bg-success-50 dark:bg-success-950/30 p-4">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-success-700 dark:text-success-500 mb-2">Do</p>
                <p className="text-sm text-token-primary font-medium mb-1">Save changes</p>
                <p className="text-sm text-token-primary mb-1">Review your ESG data before submitting.</p>
                <p className="text-sm text-token-primary">Energy · GHG · Water</p>
              </div>
              <div className="rounded-lg border border-error-200 dark:border-error-900 bg-error-50 dark:bg-error-950/30 p-4">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-error-700 dark:text-error-500 mb-2">Don&apos;t</p>
                <p className="text-sm text-token-primary font-medium mb-1">Save Changes</p>
                <p className="text-sm text-token-primary mb-1">REVIEW YOUR ESG DATA BEFORE SUBMITTING.</p>
                <p className="text-sm text-token-primary italic">Energy · GHG · Water</p>
              </div>
            </div>
          </div>

          {/* Emphasis */}
          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Emphasis & hierarchy</h3>
            <ul className="space-y-2.5 text-sm text-token-secondary">
              <li className="flex items-start gap-2.5">
                <span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span>
                <span><strong className="text-token-primary font-semibold">Bold only</strong> for emphasis — never italic, never underline</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span>
                <span>Minimum body text size: <strong className="text-token-primary font-semibold">16px</strong> (Paragraph Medium)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span>
                <span>Default body text colour: <strong className="text-token-primary font-semibold">Grey 600 (#505867)</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-success-600 font-bold shrink-0 w-5 mt-px">✓</span>
                <span>WCAG AA minimum: <strong className="text-token-primary font-semibold">4.5:1</strong> contrast for body text, <strong className="text-token-primary font-semibold">3:1</strong> for large text</span>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  )
}
