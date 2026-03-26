import PageHeader from '@/components/ui/PageHeader'

const spacingScale = [
  { value: 4, unit: 1, label: '4px', usage: 'Icon gaps, tight element spacing' },
  { value: 8, unit: 2, label: '8px', usage: 'Icon-to-label, compact internal padding' },
  { value: 12, unit: 3, label: '12px', usage: 'Small component padding' },
  { value: 16, unit: 4, label: '16px', usage: 'Default component padding, form inputs' },
  { value: 20, unit: 5, label: '20px', usage: 'Medium gaps, list items' },
  { value: 24, unit: 6, label: '24px', usage: 'Card padding, section gaps' },
  { value: 32, unit: 8, label: '32px', usage: 'Large section spacing' },
  { value: 40, unit: 10, label: '40px', usage: 'Page section gaps' },
  { value: 48, unit: 12, label: '48px', usage: 'Major section separators' },
  { value: 64, unit: 16, label: '64px', usage: 'Page layout spacing' },
  { value: 80, unit: 20, label: '80px', usage: 'Large breakpoint spacing' },
  { value: 96, unit: 24, label: '96px', usage: 'Hero/feature sections' },
]

const breakpoints = [
  { name: 'Mobile', range: '375px – 767px', cols: '4 columns', gutter: '16px', margin: '16px' },
  { name: 'Tablet', range: '768px – 1023px', cols: '8 columns', gutter: '16px', margin: '16px' },
  { name: 'Desktop', range: '1024px+', cols: '12 columns', gutter: '24px', margin: '24px' },
  { name: 'Wide', range: '1440px+', cols: '12 columns', gutter: '24px', margin: '24px' },
]

export default function SpacingPage() {
  return (
    <div>
      <PageHeader
        title="Spacing"
        description="All spacing uses a 4px base unit. Every value in the system is a multiple of 4."
        badge="Foundations"
      />

      {/* Scale */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Spacing scale</h2>
      <div className="space-y-2 mb-12">
        {spacingScale.map(({ value, unit, label, usage }) => (
          <div key={value} className="flex items-center gap-4 p-4 rounded-lg border border-token bg-token-primary">
            <div className="w-16 shrink-0 text-right">
              <span className="text-sm font-mono font-semibold text-token-primary">{label}</span>
              <p className="text-xs text-token-muted">{unit}u</p>
            </div>
            <div
              className="bg-sky-400 rounded shrink-0"
              style={{ width: `${Math.min(value * 4, 384)}px`, height: '16px' }}
            />
            <p className="text-sm text-token-secondary">{usage}</p>
          </div>
        ))}
      </div>

      {/* Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          { title: 'Component padding', values: ['8px', '12px', '16px', '24px'], desc: 'Internal component padding' },
          { title: 'Section gaps', values: ['24px', '32px', '40px'], desc: 'Between component groups' },
          { title: 'Card padding', values: ['24px'], desc: 'Default card content padding' },
        ].map(({ title, values, desc }) => (
          <div key={title} className="p-6 rounded-xl border border-token bg-token-primary">
            <h3 className="text-base font-semibold text-token-primary mb-1">{title}</h3>
            <p className="text-xs text-token-muted mb-3">{desc}</p>
            <div className="flex flex-wrap gap-2">
              {values.map(v => (
                <span key={v} className="text-sm font-mono font-semibold px-2.5 py-1 rounded bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                  {v}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Grid system & breakpoints</h2>
      <div className="overflow-x-auto rounded-xl border border-token">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-token-secondary border-b border-token">
              <th className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">Breakpoint</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">Range</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">Columns</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">Gutter</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-token bg-token-primary">
            {breakpoints.map(({ name, range, cols, gutter, margin }) => (
              <tr key={name} className="hover:bg-token-secondary transition-colors">
                <td className="px-4 py-3 font-semibold text-token-primary">{name}</td>
                <td className="px-4 py-3 font-mono text-token-secondary">{range}</td>
                <td className="px-4 py-3 text-token-secondary">{cols}</td>
                <td className="px-4 py-3 font-mono text-token-secondary">{gutter}</td>
                <td className="px-4 py-3 font-mono text-token-secondary">{margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
