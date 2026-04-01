import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Loading Spinner — node 169:1443
// Sizes: small (12px) · medium (16px)
// Implemented as a CSS border-based spinning arc using Tailwind's animate-spin

export type SpinnerSize = 'sm' | 'md' | 'lg'

const SIZES: Record<SpinnerSize, string> = {
  sm: 'w-3 h-3 border-[1.5px]',   // 12px — Figma "small"
  md: 'w-4 h-4 border-2',          // 16px — Figma "medium"
  lg: 'w-5 h-5 border-2',          // 20px — extra size for button contexts
}

export default function Spinner({
  size = 'md',
  className,
}: {
  size?: SpinnerSize
  className?: string
}) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        'rounded-full animate-spin shrink-0',
        'border-[#D7DAE0] dark:border-white/20',
        'border-t-[#1258F8] dark:border-t-[#2295FF]',
        SIZES[size],
        className
      )}
    />
  )
}
