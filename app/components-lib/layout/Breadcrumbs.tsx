'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

const labels: Record<string, string> = {
  foundations: 'Foundations',
  components: 'Components',
  patterns: 'Patterns',
  colors: 'Colors',
  typography: 'Typography',
  spacing: 'Spacing',
  icons: 'Icons',
  'borders-shadows': 'Borders & Shadows',
  buttons: 'Buttons',
  inputs: 'Inputs',
  cards: 'Cards',
  tables: 'Tables',
  modals: 'Modals',
  toasts: 'Toasts',
  'badges-tags': 'Badges & Tags',
  navigation: 'Navigation',
  'esg-data': 'ESG Data',
  'data-visualization': 'Data Visualization',
  'empty-states': 'Empty States',
  'loading-states': 'Loading States',
  'brand-voice': 'Brand Voice',
  accessibility: 'Accessibility',
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const crumbs = segments.map((seg, i) => ({
    href: '/' + segments.slice(0, i + 1).join('/'),
    label: labels[seg] ?? seg,
  }))

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-token-muted mb-6">
      <Link href="/" className="hover:text-token-secondary transition-colors">
        Home
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
          {i === crumbs.length - 1 ? (
            <span className="text-token-primary font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link href={crumb.href} className="hover:text-token-secondary transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
