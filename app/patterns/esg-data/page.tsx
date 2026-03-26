import PageHeader from '@/app/components-lib/ui/PageHeader'
import { BoltIcon, FireIcon, BeakerIcon, TrashIcon, ShieldCheckIcon, UserGroupIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

const aspects = [
  {
    name: 'Energy',
    icon: BoltIcon,
    spectrum: 'Red',
    base: '#FF455F',
    bg: 'bg-energy-50',
    border: 'border-energy-200',
    accent: 'bg-energy-500',
    text: 'text-energy-700',
    tokenBase: '--energy-500',
    unit: 'MWh',
    value: '1,240',
    trend: -8.3,
    desc: 'Electricity and gas consumption across the portfolio.',
  },
  {
    name: 'GHG emissions',
    icon: FireIcon,
    spectrum: 'Orange',
    base: '#FFB246',
    bg: 'bg-ghg-50',
    border: 'border-ghg-200',
    accent: 'bg-ghg-400',
    text: 'text-ghg-800',
    tokenBase: '--ghg-300',
    unit: 'tCO₂e',
    value: '342',
    trend: +2.1,
    desc: 'Scope 1, 2, and 3 greenhouse gas emissions.',
  },
  {
    name: 'Water',
    icon: BeakerIcon,
    spectrum: 'Cyan',
    base: '#1FD7EE',
    bg: 'bg-water-50',
    border: 'border-water-200',
    accent: 'bg-water-400',
    text: 'text-water-700',
    tokenBase: '--water-400',
    unit: 'kL',
    value: '8,420',
    trend: -12.6,
    desc: 'Potable water consumption and recycled water use.',
  },
  {
    name: 'Waste',
    icon: TrashIcon,
    spectrum: 'Teal',
    base: '#65A289',
    bg: 'bg-waste-50',
    border: 'border-waste-200',
    accent: 'bg-waste-400',
    text: 'text-waste-700',
    tokenBase: '--waste-400',
    unit: 't',
    value: '14.2',
    trend: +0.5,
    desc: 'General waste, recycling, and organic streams.',
  },
  {
    name: 'Certifications',
    icon: ShieldCheckIcon,
    spectrum: 'Blue',
    base: '#4E81E3',
    bg: 'bg-certifications-50',
    border: 'border-certifications-200',
    accent: 'bg-certifications-500',
    text: 'text-certifications-700',
    tokenBase: '--certifications-500',
    unit: 'active',
    value: '7',
    trend: null,
    desc: 'NABERS, Green Star, and other certification ratings.',
  },
  {
    name: 'Tenant engagement',
    icon: UserGroupIcon,
    spectrum: 'Warm orange',
    base: '#F4A043',
    bg: 'bg-engagement-50',
    border: 'border-engagement-200',
    accent: 'bg-engagement-400',
    text: 'text-engagement-800',
    tokenBase: '--engagement-400',
    unit: '% response',
    value: '78',
    trend: +5.2,
    desc: 'Survey responses, engagement rate, and initiatives.',
  },
  {
    name: 'ESG Risk',
    icon: ExclamationCircleIcon,
    spectrum: 'Green',
    base: '#0DBC82',
    bg: 'bg-esg-risk-50',
    border: 'border-esg-risk-200',
    accent: 'bg-esg-risk-500',
    text: 'text-esg-risk-700',
    tokenBase: '--esg-risk-500',
    unit: 'score',
    value: '24',
    trend: -3.1,
    desc: 'Physical and transition risk scoring across the portfolio.',
  },
]

export default function ESGDataPage() {
  return (
    <div>
      <PageHeader
        title="ESG data"
        description="How to display Energy, GHG, Water, Waste, Certifications, Engagement, and ESG Risk data with the correct aspect colors."
        badge="Patterns"
      />

      {/* Spectrum overview */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Aspect color map</h2>
      <div className="overflow-x-auto rounded-xl border border-token mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-token-secondary border-b border-token">
              {['Aspect', 'Spectrum', 'Base token', 'Base hex', 'Use for'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-token-muted uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-token bg-token-primary">
            {aspects.map(a => (
              <tr key={a.name} className="hover:bg-token-secondary transition-colors">
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold ${a.bg} ${a.text}`}>
                    <a.icon className="w-4 h-4" />
                    {a.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-token-secondary">{a.spectrum}</td>
                <td className="px-4 py-3 font-mono text-xs text-sky-600">{a.tokenBase}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded" style={{ background: a.base }} />
                    <span className="font-mono text-xs text-token-secondary">{a.base}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-token-secondary text-xs">{a.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Metric cards */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Metric card pattern</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {aspects.map(a => (
          <div key={a.name} className={`rounded-lg border ${a.border} bg-token-primary overflow-hidden`}>
            <div className={`h-1 ${a.accent}`} />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <a.icon className={`w-5 h-5 ${a.text}`} />
                <p className={`text-xs font-semibold uppercase tracking-widest ${a.text}`}>{a.name}</p>
              </div>
              <p className="text-3xl font-bold text-token-primary">
                {a.value}
                <span className="text-base font-normal text-token-muted ml-1">{a.unit}</span>
              </p>
              {a.trend !== null && (
                <div className="flex items-center gap-1 mt-2">
                  {a.trend < 0
                    ? <ArrowTrendingDownIcon className="w-4 h-4 text-success-500" />
                    : <ArrowTrendingUpIcon className="w-4 h-4 text-error-400" />
                  }
                  <p className={`text-sm font-medium ${a.trend < 0 ? 'text-success-600' : 'text-error-500'}`}>
                    {a.trend > 0 ? '+' : ''}{a.trend}% vs Q3
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rules */}
      <h2 className="text-xl font-semibold text-token-primary mb-4">Rules</h2>
      <div className="p-6 rounded-xl border border-token bg-token-primary">
        <ul className="space-y-3 text-sm text-token-secondary">
          <li className="flex items-start gap-2">
            <span className="text-sky-500 font-bold shrink-0">1.</span>
            <span>Always use the designated spectrum for each ESG category. Never mix spectrums (e.g. don't use Energy red for Water data).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-500 font-bold shrink-0">2.</span>
            <span>Use the accent strip (1px top border using base color) on metric cards to reinforce category identity.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-500 font-bold shrink-0">3.</span>
            <span>Trends: green (success) = improvement/reduction, red (error) = increase/deterioration. Context-dependent — a water increase is bad, but an engagement increase is good.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-500 font-bold shrink-0">4.</span>
            <span>Always show the unit alongside the value. Use the correct scientific notation (MWh, tCO₂e, kL, t).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-500 font-bold shrink-0">5.</span>
            <span>Include the reporting period on all metric displays. Never show orphaned numbers without context.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
