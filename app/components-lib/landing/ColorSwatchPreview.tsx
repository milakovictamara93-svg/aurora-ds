'use client'

import ColorSwatch from '@/app/components-lib/ui/ColorSwatch'

const previewColors = [
  // Brand
  { name: 'Sky 500', hex: '#2295FF', token: '--brand-sky-500' },
  { name: 'Sky 300', hex: '#8ED5FF', token: '--sky-300' },
  { name: 'Emerald 300', hex: '#43F9C2', token: '--brand-emerald-300' },
  { name: 'Blue 600', hex: '#1258F8', token: '--brand-blue-600' },
  // Greys
  { name: 'Grey 950', hex: '#111827', token: '--grey-950' },
  { name: 'Grey 900', hex: '#1F2430', token: '--grey-900' },
  { name: 'Grey 600', hex: '#505867', token: '--grey-600' },
  { name: 'Grey 200', hex: '#D7DAE0', token: '--grey-200' },
  { name: 'Grey 100', hex: '#EDEEF1', token: '--grey-100' },
  { name: 'Grey 50', hex: '#F7F8F8', token: '--grey-50' },
  // ESG
  { name: 'Energy 500', hex: '#FF455F', token: '--energy-500' },
  { name: 'GHG 300', hex: '#FFB246', token: '--ghg-300' },
  { name: 'Water 400', hex: '#1FD7EE', token: '--water-400' },
  { name: 'ESG Risk 500', hex: '#0DBC82', token: '--esg-risk-500' },
  { name: 'Waste 400', hex: '#65A289', token: '--waste-400' },
  // Semantic
  { name: 'Error 400', hex: '#F87171', token: '--color-error' },
  { name: 'Warning 400', hex: '#FB7D3C', token: '--color-warning' },
  { name: 'Success 500', hex: '#22C55E', token: '--color-success' },
  { name: 'AI 500', hex: '#653FFF', token: '--color-ai' },
]

export default function ColorSwatchPreview() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      {previewColors.map(c => (
        <ColorSwatch key={c.hex} name={c.name} hex={c.hex} token={c.token} size="sm" />
      ))}
    </div>
  )
}
