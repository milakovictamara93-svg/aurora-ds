import PageHeader from '@/app/components-lib/ui/PageHeader'

const radii = [
  { value: '2px', label: 'sm', usage: 'Tags, badges, chips', class: 'rounded-sm' },
  { value: '4px', label: 'default', usage: 'Inputs, small buttons, table cells', class: 'rounded' },
  { value: '6px', label: 'md', usage: 'Cards, medium components', class: 'rounded-md' },
  { value: '8px', label: 'lg', usage: 'Large buttons, panels, dropdowns', class: 'rounded-lg' },
  { value: '12px', label: 'xl', usage: 'Modal containers, feature cards', class: 'rounded-xl' },
  { value: '16px', label: '2xl', usage: 'Large cards, hero sections', class: 'rounded-2xl' },
]

const shadows = [
  { level: 1, label: 'Subtle', css: '0 1px 2px rgba(0,0,0,0.05)', usage: 'Hover states, subtle depth on flat elements', token: 'shadow-level-1' },
  { level: 2, label: 'Low', css: '0 2px 4px rgba(0,0,0,0.08)', usage: 'Cards, dropdowns, inactive overlays', token: 'shadow-level-2' },
  { level: 3, label: 'Medium', css: '0 4px 8px rgba(0,0,0,0.12)', usage: 'Floating elements, popovers, tooltips', token: 'shadow-level-3' },
  { level: 4, label: 'High', css: '0 8px 16px rgba(0,0,0,0.16)', usage: 'Sticky elements, important overlays', token: 'shadow-level-4' },
  { level: 5, label: 'Modal', css: '0 16px 32px rgba(0,0,0,0.20)', usage: 'Modals, critical dialogs, full-screen panels', token: 'shadow-level-5' },
]

export default function BordersShadowsPage() {
  return (
    <div>
      <PageHeader
        title="Borders & Shadows"
        description="Approved border radius values and elevation shadow scale."
        badge="Foundations"
      />

      {/* Border radius */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Border radius</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {radii.map(({ value, label, usage, class: cls }) => (
          <div key={value} className="p-6 border border-token bg-token-primary rounded-xl">
            <div className={`w-16 h-16 bg-sky-100 dark:bg-sky-900/40 border-2 border-sky-400 mb-4 ${cls}`} />
            <p className="text-base font-semibold text-token-primary">{value}</p>
            <p className="text-xs font-mono text-sky-600 mb-2">rounded-{label}</p>
            <p className="text-xs text-token-muted">{usage}</p>
          </div>
        ))}
      </div>

      {/* Shadows */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Shadow scale</h2>
      <div className="space-y-4">
        {shadows.map(({ level, label, css, usage, token }) => (
          <div key={level} className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-xl border border-token bg-token-primary">
            <div
              className="w-20 h-20 rounded-lg bg-token-primary shrink-0 border border-token"
              style={{ boxShadow: css }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-base font-semibold text-token-primary">Level {level} — {label}</p>
                <code className="text-xs font-mono text-sky-600 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded">
                  {token}
                </code>
              </div>
              <p className="text-xs font-mono text-token-muted mb-1">{css}</p>
              <p className="text-sm text-token-secondary">{usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
