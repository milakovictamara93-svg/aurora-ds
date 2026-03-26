'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface NavItem {
  href: string
  label: string
}

interface SidebarProps {
  items: NavItem[]
  section: string
}

export default function Sidebar({ items, section }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0">
      <div className="sticky top-[60px] pt-8 pb-8 pr-6 overflow-y-auto max-h-[calc(100vh-60px)]">
        <p className="text-xs font-semibold text-token-muted uppercase tracking-widest mb-4 px-3">
          {section}
        </p>
        <nav className="flex flex-col gap-0.5" aria-label={`${section} navigation`}>
          {items.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-3 py-2 rounded text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400'
                  : 'text-token-secondary hover:text-token-primary hover:bg-token-tertiary'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
