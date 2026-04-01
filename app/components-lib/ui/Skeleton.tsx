import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────
// Figma: Skeleton — node 3292:39168
// Animation: Wave (shimmer sweep) · Pulse (opacity) · None
// Base colour: rgba(109,120,138,0.2) — Figma --background/primary/ghost
// Shimmer colour: rgba(215,218,224,0.4) — Figma --background/disabled/ghost

export type SkeletonAnimation = 'wave' | 'pulse' | 'none'

export default function Skeleton({
  animation = 'wave',
  width,
  height = '1rem',
  rounded = '4px',
  className,
}: {
  animation?: SkeletonAnimation
  /** CSS value e.g. '200px', '100%'. Defaults to '100%'. */
  width?: string | number
  /** CSS value e.g. '16px', '1.5rem'. Defaults to '1rem'. */
  height?: string | number
  /** Border radius. Defaults to '4px'. Use 'full' for circles. */
  rounded?: string
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'relative overflow-hidden',
        'bg-grey-500/20 dark:bg-white/10',
        animation === 'pulse' && 'animate-aurora-pulse',
        className
      )}
      style={{
        width: width ?? '100%',
        height,
        borderRadius: rounded === 'full' ? '9999px' : rounded,
      }}
    >
      {animation === 'wave' && (
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-grey-200/50 to-transparent animate-shimmer dark:via-white/10"
        />
      )}
    </div>
  )
}
