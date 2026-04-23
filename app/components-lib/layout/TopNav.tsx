'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const navLinks = [
  { href: '/foundations/colors', label: 'Foundations' },
  { href: '/components/buttons', label: 'Components' },
  { href: '/patterns/esg-data', label: 'Patterns' },
]

export default function TopNav() {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  function toggleDark() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const isActive = (href: string) => pathname.startsWith('/' + href.split('/')[1])

  return (
    <header className="sticky top-0 z-50 h-[60px] bg-token-primary border-b border-token flex items-center px-6">
      <div className="flex items-center justify-between w-full max-w-container mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Scaler home">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm select-none">S</span>
          </div>
          <span className="font-bold text-base text-token-primary tracking-tight">
            Scaler <span className="text-blue-600">DS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-4 py-2 rounded text-sm font-medium transition-colors',
                isActive(href)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                  : 'text-token-secondary hover:text-token-primary hover:bg-token-tertiary'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center rounded text-token-secondary hover:text-token-primary hover:bg-token-tertiary transition-colors"
          >
            {dark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded text-token-secondary hover:bg-token-tertiary"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-token-primary border-b border-token px-6 py-4 flex flex-col gap-1 shadow-level-3">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                'px-4 py-3 rounded text-sm font-medium transition-colors',
                isActive(href)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                  : 'text-token-secondary hover:text-token-primary hover:bg-token-tertiary'
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
