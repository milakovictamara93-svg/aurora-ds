'use client'

import { useState } from 'react'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface ColorSwatchProps {
  name: string
  hex: string
  token?: string
  textColor?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  showWCAG?: boolean
}

function getContrastRatio(hex: string): { onWhite: number; onBlack: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  const onWhite = (1.05) / (L + 0.05)
  const onBlack = (L + 0.05) / 0.05
  return { onWhite, onBlack }
}

function WCAGBadge({ ratio, label }: { ratio: number; label: string }) {
  const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail'
  const color = ratio >= 4.5 ? 'bg-success-100 text-success-700' : ratio >= 3 ? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'
  return (
    <span className={clsx('text-xs font-medium px-1.5 py-0.5 rounded', color)}>
      {label}: {level} {ratio.toFixed(1)}:1
    </span>
  )
}

export default function ColorSwatch({ name, hex, token, textColor, size = 'md', showWCAG }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const contrast = showWCAG ? getContrastRatio(hex) : null
  const autoText = textColor ?? (contrast && contrast.onWhite < 3 ? 'light' : 'dark')

  const sizeClasses = {
    sm: 'h-12',
    md: 'h-20',
    lg: 'h-28',
  }

  return (
    <div className="rounded-lg overflow-hidden border border-token shadow-level-1 group">
      <button
        className={clsx(
          'w-full relative flex items-end p-3 transition-opacity cursor-pointer',
          sizeClasses[size]
        )}
        style={{ backgroundColor: hex }}
        onClick={() => copy(hex)}
        aria-label={`Copy ${name} hex ${hex}`}
        title={`Click to copy ${hex}`}
      >
        <span className={clsx(
          'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity',
          autoText === 'light' ? 'text-white' : 'text-grey-900'
        )}>
          {copied
            ? <CheckIcon className="w-4 h-4" />
            : <ClipboardIcon className="w-4 h-4" />
          }
        </span>
        <span className={clsx(
          'text-xs font-medium font-mono opacity-80',
          autoText === 'light' ? 'text-white' : 'text-grey-900'
        )}>
          {copied ? 'Copied!' : hex}
        </span>
      </button>
      <div className="bg-token-primary px-3 py-2">
        <p className="text-sm font-medium text-token-primary">{name}</p>
        {token && (
          <button
            onClick={() => copy(token)}
            className="text-xs text-token-muted hover:text-sky-500 font-mono transition-colors mt-0.5 block text-left"
            title={`Click to copy token ${token}`}
          >
            {token}
          </button>
        )}
        {showWCAG && contrast && (
          <div className="flex flex-wrap gap-1 mt-2">
            <WCAGBadge ratio={contrast.onWhite} label="on white" />
            <WCAGBadge ratio={contrast.onBlack} label="on black" />
          </div>
        )}
      </div>
    </div>
  )
}
