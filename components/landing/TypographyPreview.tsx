const typeScale = [
  { label: 'H1 — Display', size: '28px', weight: 'Bold 700', sample: 'Sustainable reporting, simplified.', className: 'text-3xl font-bold' },
  { label: 'H2 — Section heading', size: '24px', weight: 'SemiBold 600', sample: 'ESG data overview', className: 'text-2xl font-semibold' },
  { label: 'H3 — Subsection', size: '20px', weight: 'SemiBold 600', sample: 'Energy consumption metrics', className: 'text-xl font-semibold' },
  { label: 'Body XL', size: '21px', weight: 'Regular 400', sample: 'Track your sustainability performance across all ESG categories.', className: 'text-xl' },
  { label: 'Body L', size: '18px', weight: 'Regular 400', sample: 'Monitor energy usage, GHG emissions, water consumption, and waste generation.', className: 'text-lg' },
  { label: 'Body M — Default', size: '16px', weight: 'Regular 400', sample: 'Upload your ESG data, review collected information, and generate audit-ready reports with a single click.', className: 'text-base' },
  { label: 'Body S', size: '14px', weight: 'Regular 400', sample: 'Last updated 14 March 2026 · 3 data sources connected · NABERS certified', className: 'text-sm' },
  { label: 'Caption', size: '12px', weight: 'Medium 500', sample: 'DATA SOURCE · VERIFIED · Q4 2025', className: 'text-xs font-medium tracking-widest uppercase' },
]

export default function TypographyPreview() {
  return (
    <div className="divide-y divide-token rounded-xl border border-token overflow-hidden bg-token-primary">
      {typeScale.map(({ label, size, weight, sample, className }) => (
        <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-4 p-6">
          <div className="sm:w-48 shrink-0">
            <p className="text-xs font-semibold text-token-muted">{label}</p>
            <p className="text-xs text-token-muted mt-0.5">{size} · {weight}</p>
          </div>
          <p className={`${className} text-token-primary flex-1`}>{sample}</p>
        </div>
      ))}
    </div>
  )
}
