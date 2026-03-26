import PageHeader from '@/components/ui/PageHeader'
import CodeBlock from '@/components/ui/CodeBlock'

const typeStyles = [
  {
    label: 'H1 — Display',
    size: 28, lh: '140%', ls: '0', weight: '700 (Bold)',
    className: 'text-3xl font-bold',
    sample: 'Sustainable reporting for the built environment.',
    usage: 'Page titles, hero headlines, modal titles',
    token: 'text-3xl font-bold',
  },
  {
    label: 'H2 — Section heading',
    size: 24, lh: '140%', ls: '0', weight: '600 (SemiBold)',
    className: 'text-2xl font-semibold',
    sample: 'ESG data overview',
    usage: 'Section headers, card group titles',
    token: 'text-2xl font-semibold',
  },
  {
    label: 'H3 — Subsection',
    size: 20, lh: '140%', ls: '0', weight: '600 (SemiBold)',
    className: 'text-xl font-semibold',
    sample: 'Energy consumption metrics',
    usage: 'Subsection headers, sidebar section labels',
    token: 'text-xl font-semibold',
  },
  {
    label: 'Body XL',
    size: 21, lh: '145%', ls: '1.5%', weight: '400 (Regular)',
    className: 'text-xl',
    sample: 'Track your sustainability performance across all ESG categories with real-time data.',
    usage: 'Lead paragraphs, feature descriptions',
    token: 'text-xl',
  },
  {
    label: 'Body L',
    size: 18, lh: '145%', ls: '1.5%', weight: '400 (Regular)',
    className: 'text-lg',
    sample: 'Monitor energy usage, GHG emissions, water consumption, and waste generation in a single dashboard.',
    usage: 'Secondary body text, callouts',
    token: 'text-lg',
  },
  {
    label: 'Body M — Default',
    size: 16, lh: '145%', ls: '1.5%', weight: '400 (Regular)',
    className: 'text-base',
    sample: 'Upload your ESG data, review collected information, and generate audit-ready reports with a single click. All data is encrypted at rest and in transit.',
    usage: 'Default body text, descriptions, help text',
    token: 'text-base',
  },
  {
    label: 'Body S',
    size: 14, lh: '145%', ls: '1.5%', weight: '400 (Regular)',
    className: 'text-sm',
    sample: 'Last updated 14 March 2026 · 3 data sources connected · NABERS certified · Reporting period: FY2025',
    usage: 'Secondary information, metadata, captions',
    token: 'text-sm',
  },
  {
    label: 'Body XS',
    size: 12, lh: '145%', ls: '1.5%', weight: '400 (Regular)',
    className: 'text-xs',
    sample: 'Data verified by auditor on 1 March 2026. Reference number: SCL-2025-00142.',
    usage: 'Fine print, legal text, timestamps',
    token: 'text-xs',
  },
  {
    label: 'Caption',
    size: 12, lh: '120%', ls: '16%', weight: '500 (Medium)',
    className: 'text-xs font-medium tracking-widest uppercase',
    sample: 'DATA SOURCE · VERIFIED · Q4 2025',
    usage: 'Labels, category names, table headers',
    token: 'text-xs font-medium tracking-widest uppercase',
  },
]

const weightRows = [
  { label: 'Regular', weight: 400, class: 'font-normal' },
  { label: 'Medium', weight: 500, class: 'font-medium' },
  { label: 'SemiBold', weight: 600, class: 'font-semibold' },
  { label: 'Bold', weight: 700, class: 'font-bold' },
]

const importCode = `import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
})

// Apply to <body>
<body className={\`\${manrope.variable} font-sans\`}>`

export default function TypographyPage() {
  return (
    <div>
      <PageHeader
        title="Typography"
        description="Manrope is the sole typeface across all Scaler interfaces. The full type scale — rendered at real sizes below."
        badge="Foundations"
      />

      {/* Font info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-6 rounded-xl border border-token bg-token-primary">
          <h2 className="text-base font-semibold text-token-primary mb-3">Font family</h2>
          <p className="text-3xl font-bold text-token-primary mb-1">Inter</p>
          <p className="text-sm text-token-secondary mb-3">Sans-serif · Variable font · Google Fonts</p>
          <div className="flex flex-wrap gap-2">
            {weightRows.map(r => (
              <span key={r.weight} className={`text-sm ${r.class} text-token-secondary`}>
                {r.weight} {r.label}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-xl border border-token bg-token-primary">
          <h2 className="text-base font-semibold text-token-primary mb-3">Rules</h2>
          <ul className="space-y-1.5 text-sm text-token-secondary">
            <li>→ Minimum body size: <strong className="text-token-primary">16px</strong></li>
            <li>→ Body line height: <strong className="text-token-primary">145%</strong></li>
            <li>→ Heading line height: <strong className="text-token-primary">140%</strong></li>
            <li>→ Letter spacing (body): <strong className="text-token-primary">1.5%</strong></li>
            <li>→ <strong className="text-token-primary">Sentence case</strong> everywhere — no all caps, no italics</li>
            <li>→ <strong className="text-token-primary">Bold only</strong> for emphasis — no underlines</li>
          </ul>
        </div>
      </div>

      {/* Type scale */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Type scale</h2>
      <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary mb-10">
        {typeStyles.map(({ label, size, lh, ls, weight, className, sample, usage, token }) => (
          <div key={label} className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-xs font-semibold text-token-muted">{label}</p>
                <p className="text-xs text-token-muted mt-0.5">
                  {size}px · {lh} line height · {ls} letter-spacing · {weight}
                </p>
              </div>
              <code className="text-xs font-mono text-sky-600 bg-sky-50 dark:bg-sky-950/40 px-2 py-1 rounded">
                {token}
              </code>
            </div>
            <p className={`${className} text-token-primary mb-2`}>{sample}</p>
            <p className="text-xs text-token-muted">Used for: {usage}</p>
          </div>
        ))}
      </div>

      {/* Weight showcase */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Weight showcase</h2>
      <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary mb-10">
        {weightRows.map(({ label, weight, class: cls }) => (
          <div key={weight} className="flex items-center gap-6 p-6">
            <div className="w-24 shrink-0">
              <p className="text-xs font-semibold text-token-muted">{label}</p>
              <p className="text-xs text-token-muted">{weight}</p>
            </div>
            <p className={`text-xl ${cls} text-token-primary`}>
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        ))}
      </div>

      {/* Implementation */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Implementation</h2>
      <CodeBlock code={importCode} language="tsx" title="Loading Manrope in Next.js" />
    </div>
  )
}
