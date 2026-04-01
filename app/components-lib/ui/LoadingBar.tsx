import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Loading Bar — node 3752:41015
// Sizes: small (4px) · medium (8px)
// value undefined → indeterminate animated bar
// value 0–100     → determinate fill

export type LoadingBarSize = 'sm' | 'md'

export default function LoadingBar({
  value,
  size = 'sm',
  className,
}: {
  /** 0–100 for determinate. Omit for indeterminate animated bar. */
  value?: number
  size?: LoadingBarSize
  className?: string
}) {
  const indeterminate = value === undefined

  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={clsx(
        'relative overflow-hidden rounded-[4px]',
        'bg-grey-100 dark:bg-grey-900',
        size === 'md' ? 'h-2' : 'h-1',
        className
      )}
    >
      {indeterminate ? (
        <div className="absolute top-0 bottom-0 w-2/5 bg-blue-600 rounded-[4px] animate-loading-bar" />
      ) : (
        <div
          className="h-full bg-blue-600 rounded-[4px] transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      )}
    </div>
  )
}
