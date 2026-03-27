import PageHeader from '@/app/components-lib/ui/PageHeader'

// ── Spacing scale (source of truth — mirrors Figma node 46:39706) ─────────────
// Base unit: 4px. Every value is a multiple of 4. No exceptions.

const SCALE = [
  { name: '1',  size: 4   },
  { name: '2',  size: 8   },
  { name: '3',  size: 12  },
  { name: '4',  size: 16  },
  { name: '5',  size: 20  },
  { name: '6',  size: 24  },
  { name: '8',  size: 32  },
  { name: '10', size: 40  },
  { name: '12', size: 48  },
  { name: '16', size: 64  },
  { name: '20', size: 80  },
  { name: '24', size: 96  },
  { name: '32', size: 128 },
]

// Max bar width in px (128px maps to this)
const MAX_BAR = 320

export default function SpacingPage() {
  return (
    <div>
      <PageHeader
        title="Spacings"
        description="All spacing uses a 4px base unit. Every gap, padding, and margin across the entire system must be a multiple of 4 — no exceptions."
        badge="Foundations"
      />

      {/* ── Scale table ───────────────────────────────────────────────────── */}
      <div className="mt-12">
        <div className="rounded-xl border border-token overflow-hidden bg-token-primary">
          {/* Header */}
          <div className="grid grid-cols-[80px_100px_1fr] gap-4 px-6 py-3 border-b border-token bg-token-secondary">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Name</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Size</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Visual</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-token">
            {SCALE.map(({ name, size }) => {
              const barWidth = Math.round((size / 128) * MAX_BAR)
              return (
                <div key={name} className="grid grid-cols-[80px_100px_1fr] gap-4 items-center px-6 py-4">
                  <span className="text-[14px] font-medium text-token-primary">{name}</span>
                  <span className="text-[14px] font-mono text-token-secondary">{size}px</span>
                  <div
                    className="bg-blue-200 dark:bg-blue-900 rounded"
                    style={{ width: `${Math.max(barWidth, 4)}px`, height: `${Math.min(size, 24)}px` }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Rules ─────────────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Rules</h2>
        </div>

        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">
          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Base unit</h3>
            <p className="text-sm text-token-secondary mb-4">
              All spacing, padding, margin, gap, and layout values must be a multiple of <strong className="text-token-primary font-semibold">4px</strong>. This applies to every element across the entire system — components, layouts, icons, and typography.
            </p>
            <div className="flex flex-wrap gap-2">
              {SCALE.map(({ size }) => (
                <span key={size} className="text-[13px] font-mono font-medium px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">
                  {size}px
                </span>
              ))}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Common applications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Component padding', values: ['8px', '12px', '16px', '24px'], note: 'Internal padding inside components' },
                { label: 'Section gaps',      values: ['24px', '32px', '40px', '48px'], note: 'Between groups of components' },
                { label: 'Page layout',       values: ['48px', '64px', '80px', '96px'], note: 'Major page-level spacing' },
              ].map(({ label, values, note }) => (
                <div key={label}>
                  <p className="text-[13px] font-semibold text-token-primary mb-1">{label}</p>
                  <p className="text-[12px] text-token-muted mb-3">{note}</p>
                  <div className="flex flex-wrap gap-2">
                    {values.map(v => (
                      <span key={v} className="text-[12px] font-mono font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">What to avoid</h3>
            <ul className="space-y-2.5 text-sm text-token-secondary">
              <li className="flex items-start gap-2.5">
                <span className="text-error-600 font-bold shrink-0 w-5 mt-px">✗</span>
                <span>Any value not in the scale — 3px, 5px, 7px, 10px, 15px, etc. are not valid</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-error-600 font-bold shrink-0 w-5 mt-px">✗</span>
                <span>Arbitrary pixel values in code — always reference a scale token (e.g. <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">p-4</code> not <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">p-[15px]</code>)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-error-600 font-bold shrink-0 w-5 mt-px">✗</span>
                <span>Border radius values outside the approved set — use 4px, 8px, 12px, 16px only (no 3px, 5px, etc.)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
