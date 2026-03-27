import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PageHeader from '@/app/components-lib/ui/PageHeader'

// ── Border radius scale (mirrors tailwind.config.ts) ─────────────────────────
const RADII = [
  { token: 'rounded-sm',   value: '2px',    label: 'sm',      usage: 'Tags, badges, chips, inline code' },
  { token: 'rounded',      value: '4px',    label: 'default', usage: 'Inputs, small buttons, table cells, dropdowns' },
  { token: 'rounded-md',   value: '6px',    label: 'md',      usage: 'Medium buttons, select menus' },
  { token: 'rounded-lg',   value: '8px',    label: 'lg',      usage: 'Cards, panels, popovers, sidebars' },
  { token: 'rounded-xl',   value: '12px',   label: 'xl',      usage: 'Modal containers, feature cards' },
  { token: 'rounded-2xl',  value: '16px',   label: '2xl',     usage: 'Large cards, hero sections, sheet overlays' },
  { token: 'rounded-full', value: '9999px', label: 'full',    usage: 'Avatars, pill badges, toggle tracks' },
]

// ── Shadow elevation scale (mirrors tailwind.config.ts) ───────────────────────
const SHADOWS = [
  {
    level: 1,
    label: 'Subtle',
    token: 'shadow-level-1',
    css: '0 1px 2px rgba(0,0,0,0.05)',
    usage: 'Hover states, very subtle lift on flat cards',
  },
  {
    level: 2,
    label: 'Low',
    token: 'shadow-level-2',
    css: '0 2px 4px rgba(0,0,0,0.08)',
    usage: 'Default card elevation, inactive dropdowns',
  },
  {
    level: 3,
    label: 'Medium',
    token: 'shadow-level-3',
    css: '0 4px 8px rgba(0,0,0,0.12)',
    usage: 'Floating elements, popovers, tooltips, date pickers',
  },
  {
    level: 4,
    label: 'High',
    token: 'shadow-level-4',
    css: '0 8px 16px rgba(0,0,0,0.16)',
    usage: 'Sticky headers, important overlays, command palettes',
  },
  {
    level: 5,
    label: 'Modal',
    token: 'shadow-level-5',
    css: '0 16px 32px rgba(0,0,0,0.20)',
    usage: 'Modals, dialogs, full-screen panels',
  },
]

export default function BordersShadowsPage() {
  return (
    <div>
      <PageHeader
        title="Borders & Shadows"
        description="All border radius values must come from the approved scale. Shadow levels define a consistent elevation system — from subtle hover depth to full modal lift."
        badge="Foundations"
      />

      {/* ── Border radius ──────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Border radius</h2>
        </div>

        <div className="rounded-xl border border-token overflow-hidden bg-token-primary">
          {/* Header */}
          <div className="grid grid-cols-[120px_100px_160px_1fr] gap-4 px-6 py-3 border-b border-token bg-token-secondary">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Token</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Value</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Preview</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Usage</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-token">
            {RADII.map(({ token, value, label, usage }) => (
              <div key={token} className="grid grid-cols-[120px_100px_160px_1fr] gap-4 items-center px-6 py-4">
                <code className="text-[13px] font-mono text-blue-600 dark:text-blue-400">{token}</code>
                <span className="text-[14px] font-mono text-token-secondary">{value}</span>
                <div
                  className="w-12 h-12 bg-blue-100 dark:bg-blue-950/40 border-2 border-blue-300 dark:border-blue-700"
                  style={{ borderRadius: value === '9999px' ? '9999px' : value }}
                />
                <span className="text-[13px] text-token-secondary">{usage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shadow elevation ───────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Shadow scale</h2>
        </div>

        <div className="rounded-xl border border-token overflow-hidden bg-token-primary">
          {/* Header */}
          <div className="grid grid-cols-[80px_100px_180px_1fr] gap-4 px-6 py-3 border-b border-token bg-token-secondary">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Level</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Name</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Token</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Usage</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-token">
            {SHADOWS.map(({ level, label, token, css, usage }) => (
              <div key={level} className="grid grid-cols-[80px_100px_180px_1fr] gap-4 items-center px-6 py-5">
                {/* Shadow preview box */}
                <div
                  className="w-10 h-10 rounded-lg bg-white dark:bg-grey-800 border border-token"
                  style={{ boxShadow: css }}
                />
                <span className="text-[14px] font-medium text-token-primary">{label}</span>
                <code className="text-[13px] font-mono text-blue-600 dark:text-blue-400">{token}</code>
                <span className="text-[13px] text-token-secondary">{usage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CSS value table */}
        <div className="mt-6 rounded-xl border border-token overflow-hidden bg-token-primary">
          <div className="grid grid-cols-[120px_1fr] gap-4 px-6 py-3 border-b border-token bg-token-secondary">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">Token</span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-token-muted">CSS value</span>
          </div>
          <div className="divide-y divide-token">
            {SHADOWS.map(({ token, css }) => (
              <div key={token} className="grid grid-cols-[120px_1fr] gap-4 items-center px-6 py-3">
                <code className="text-[13px] font-mono text-blue-600 dark:text-blue-400">{token}</code>
                <code className="text-[13px] font-mono text-token-secondary">{css}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rules ──────────────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[140%] font-semibold text-token-primary">Rules</h2>
        </div>

        <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">
          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Border radius rules</h3>
            <ul className="space-y-2.5 text-sm text-token-secondary">
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" />
                <span>Always pick the nearest value from the approved scale: 2px, 4px, 6px, 8px, 12px, 16px, 9999px</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" />
                <span>Use <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">rounded-full</code> only for circular shapes — avatars, pill badges, toggle tracks</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XMarkIcon className="w-4 h-4 text-error-600 shrink-0 mt-px" />
                <span>Never use arbitrary values like <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">rounded-[3px]</code> or <code className="font-mono text-xs bg-token-secondary px-1 py-0.5 rounded">rounded-[5px]</code></span>
              </li>
              <li className="flex items-start gap-2.5">
                <XMarkIcon className="w-4 h-4 text-error-600 shrink-0 mt-px" />
                <span>Never mix different radius values within the same component — all four corners must use the same token</span>
              </li>
            </ul>
          </div>

          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Shadow rules</h3>
            <ul className="space-y-2.5 text-sm text-token-secondary">
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" />
                <span>Use the lowest level that communicates the right depth — prefer Level 1–2 for most UI surfaces</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-success-600 shrink-0 mt-px" />
                <span>Increase elevation on interaction — e.g. a card can lift from Level 2 to Level 3 on hover</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XMarkIcon className="w-4 h-4 text-error-600 shrink-0 mt-px" />
                <span>Never write custom box-shadow values — always use a level token</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XMarkIcon className="w-4 h-4 text-error-600 shrink-0 mt-px" />
                <span>Never use colored or inset shadows — elevation shadows are greyscale only</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XMarkIcon className="w-4 h-4 text-error-600 shrink-0 mt-px" />
                <span>Avoid shadows in dark mode surfaces — use borders or background contrast instead</span>
              </li>
            </ul>
          </div>

          <div className="p-6">
            <h3 className="text-[14px] font-semibold text-token-primary mb-4">Component mapping</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Inputs, tags, badges', radius: '4px (rounded)', shadow: 'None' },
                { label: 'Buttons', radius: '6–8px (rounded-md / lg)', shadow: 'None or Level 1 on hover' },
                { label: 'Cards', radius: '8px (rounded-lg)', shadow: 'Level 2' },
                { label: 'Dropdowns, popovers', radius: '8px (rounded-lg)', shadow: 'Level 3' },
                { label: 'Modals, dialogs', radius: '12px (rounded-xl)', shadow: 'Level 5' },
                { label: 'Avatars', radius: '9999px (rounded-full)', shadow: 'None' },
              ].map(({ label, radius, shadow }) => (
                <div key={label} className="p-4 rounded-lg bg-token-secondary border border-token">
                  <p className="text-[13px] font-semibold text-token-primary mb-2">{label}</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] text-token-secondary">
                      <span className="font-medium text-token-primary">Radius:</span> {radius}
                    </span>
                    <span className="text-[12px] text-token-secondary">
                      <span className="font-medium text-token-primary">Shadow:</span> {shadow}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
