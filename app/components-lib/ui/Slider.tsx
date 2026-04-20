'use client'

import { useCallback, useRef, useState } from 'react'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface SliderProps {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step between values */
  step?: number
  /** Single value (controlled) */
  value?: number
  /** Range values [low, high] (controlled) */
  rangeValue?: [number, number]
  /** Default single value (uncontrolled) */
  defaultValue?: number
  /** Default range values (uncontrolled) */
  defaultRangeValue?: [number, number]
  /** Called on change for single slider */
  onChange?: (value: number) => void
  /** Called on change for range slider */
  onRangeChange?: (value: [number, number]) => void
  /** Show min/max labels at track ends */
  showLabels?: boolean
  /** Show current value tooltip above thumb */
  showValue?: boolean
  /** Range mode — two thumbs */
  range?: boolean
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Disabled */
  disabled?: boolean
  className?: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

function pct(val: number, min: number, max: number) {
  return ((val - min) / (max - min)) * 100
}

function snapToStep(val: number, min: number, step: number) {
  return Math.round((val - min) / step) * step + min
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  rangeValue: controlledRange,
  defaultValue,
  defaultRangeValue,
  onChange,
  onRangeChange,
  showLabels = true,
  showValue = false,
  range = false,
  orientation = 'horizontal',
  disabled = false,
  className,
}: SliderProps) {
  const isVertical = orientation === 'vertical'

  // ── State ──────────────────────────────────────────────────────────────────
  const [internalSingle, setInternalSingle] = useState(defaultValue ?? min)
  const [internalRange, setInternalRange] = useState<[number, number]>(
    defaultRangeValue ?? [min, max]
  )

  const singleVal = controlledValue ?? internalSingle
  const [lo, hi] = controlledRange ?? internalRange

  // ── Drag logic ─────────────────────────────────────────────────────────────
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<'single' | 'lo' | 'hi' | null>(null)

  const valueFromPointer = useCallback(
    (clientX: number, clientY: number): number => {
      const el = trackRef.current
      if (!el) return min
      const rect = el.getBoundingClientRect()
      let ratio: number
      if (isVertical) {
        ratio = 1 - (clientY - rect.top) / rect.height
      } else {
        ratio = (clientX - rect.left) / rect.width
      }
      const raw = min + clamp(ratio, 0, 1) * (max - min)
      return clamp(snapToStep(raw, min, step), min, max)
    },
    [min, max, step, isVertical]
  )

  const handlePointerDown = (
    e: React.PointerEvent,
    thumb: 'single' | 'lo' | 'hi'
  ) => {
    if (disabled) return
    e.preventDefault()
    dragging.current = thumb
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || disabled) return
    const val = valueFromPointer(e.clientX, e.clientY)
    if (dragging.current === 'single') {
      setInternalSingle(val)
      onChange?.(val)
    } else if (dragging.current === 'lo') {
      const next: [number, number] = [Math.min(val, hi), hi]
      setInternalRange(next)
      onRangeChange?.(next)
    } else {
      const next: [number, number] = [lo, Math.max(val, lo)]
      setInternalRange(next)
      onRangeChange?.(next)
    }
  }

  const handlePointerUp = () => {
    dragging.current = null
  }

  // Track click (not on thumb)
  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled) return
    const val = valueFromPointer(e.clientX, e.clientY)
    if (!range) {
      setInternalSingle(val)
      onChange?.(val)
    } else {
      // Move whichever thumb is closer
      const distLo = Math.abs(val - lo)
      const distHi = Math.abs(val - hi)
      if (distLo <= distHi) {
        const next: [number, number] = [Math.min(val, hi), hi]
        setInternalRange(next)
        onRangeChange?.(next)
      } else {
        const next: [number, number] = [lo, Math.max(val, lo)]
        setInternalRange(next)
        onRangeChange?.(next)
      }
    }
  }

  // ── Percentages ───────────────────────────────────────────────────────────
  const singlePct = pct(singleVal, min, max)
  const loPct     = pct(lo, min, max)
  const hiPct     = pct(hi, min, max)

  // ── Render ─────────────────────────────────────────────────────────────────
  const THUMB_SIZE = 16
  const TRACK_W    = isVertical ? 240 : undefined // px height for vertical

  const trackFill = range
    ? isVertical
      ? { bottom: `${loPct}%`, top: `${100 - hiPct}%` }
      : { left: `${loPct}%`, right: `${100 - hiPct}%` }
    : isVertical
    ? { bottom: 0, top: `${100 - singlePct}%` }
    : { left: 0, right: `${100 - singlePct}%` }

  function Thumb({
    position,
    value,
    thumb,
    label,
  }: {
    position: number
    value: number
    thumb: 'single' | 'lo' | 'hi'
    label: string
  }) {
    const pos = isVertical
      ? { bottom: `${position}%`, left: '50%', transform: 'translate(-50%, 50%)' }
      : { left: `${position}%`, top: '50%', transform: 'translate(-50%, -50%)' }

    return (
      <div
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        style={{ position: 'absolute', ...pos, width: THUMB_SIZE, height: THUMB_SIZE }}
        className={clsx(
          'rounded-full border-2 bg-white transition-shadow z-10',
          disabled
            ? 'border-[#D7DAE0] cursor-not-allowed'
            : 'border-[#1258F8] cursor-grab active:cursor-grabbing shadow-[0_0_0_0_rgba(18,88,248,0)] hover:shadow-[0_0_0_4px_rgba(18,88,248,0.15)] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(18,88,248,0.25)]'
        )}
        onPointerDown={e => handlePointerDown(e, thumb)}
        onKeyDown={e => {
          if (disabled) return
          const delta = e.shiftKey ? step * 10 : step
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault()
            if (thumb === 'single') {
              const next = clamp(snapToStep(singleVal + delta, min, step), min, max)
              setInternalSingle(next); onChange?.(next)
            } else if (thumb === 'lo') {
              const next: [number, number] = [clamp(snapToStep(lo + delta, min, step), min, hi), hi]
              setInternalRange(next); onRangeChange?.(next)
            } else {
              const next: [number, number] = [lo, clamp(snapToStep(hi + delta, min, step), lo, max)]
              setInternalRange(next); onRangeChange?.(next)
            }
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault()
            if (thumb === 'single') {
              const next = clamp(snapToStep(singleVal - delta, min, step), min, max)
              setInternalSingle(next); onChange?.(next)
            } else if (thumb === 'lo') {
              const next: [number, number] = [clamp(snapToStep(lo - delta, min, step), min, hi), hi]
              setInternalRange(next); onRangeChange?.(next)
            } else {
              const next: [number, number] = [lo, clamp(snapToStep(hi - delta, min, step), lo, max)]
              setInternalRange(next); onRangeChange?.(next)
            }
          }
        }}
      >
        {showValue && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-[#111827] dark:bg-[#1F2430] text-white text-[11px] font-medium pointer-events-none select-none">
            {value}
          </div>
        )}
      </div>
    )
  }

  const containerClass = isVertical
    ? clsx('flex items-center gap-3', className)
    : clsx('flex items-center gap-3', className)

  const trackContainer = (
    <div
      ref={trackRef}
      className={clsx(
        'relative select-none',
        isVertical ? 'w-[2px] flex-shrink-0' : 'h-[2px] flex-1',
        disabled ? 'opacity-50' : 'cursor-pointer'
      )}
      style={isVertical ? { height: TRACK_W } : undefined}
      onClick={handleTrackClick}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Track background */}
      <div className="absolute inset-0 rounded-full bg-[#D7DAE0] dark:bg-[#374151]" />

      {/* Filled portion */}
      <div
        className={clsx(
          'absolute rounded-full',
          disabled ? 'bg-[#D7DAE0] dark:bg-[#374151]' : 'bg-[#1258F8]'
        )}
        style={{ ...trackFill, ...(isVertical ? { left: 0, right: 0 } : { top: 0, bottom: 0 }) }}
      />

      {/* Thumb(s) */}
      {range ? (
        <>
          <Thumb position={loPct} value={lo} thumb="lo" label="Minimum value" />
          <Thumb position={hiPct} value={hi} thumb="hi" label="Maximum value" />
        </>
      ) : (
        <Thumb position={singlePct} value={singleVal} thumb="single" label="Value" />
      )}
    </div>
  )

  if (isVertical) {
    return (
      <div className={clsx('inline-flex items-start gap-2', className)}>
        {showLabels && (
          <div className="flex flex-col justify-between text-[12px] text-[#505867] dark:text-[#9CA3AF] select-none" style={{ height: TRACK_W }}>
            <span>{max}</span>
            <span>{min}</span>
          </div>
        )}
        <div className="relative flex justify-center" style={{ height: TRACK_W, width: 20 }}>
          {trackContainer}
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {showLabels && (
        <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF] tabular-nums select-none w-6 text-right shrink-0">
          {min}
        </span>
      )}
      {trackContainer}
      {showLabels && (
        <span className="text-[12px] text-[#505867] dark:text-[#9CA3AF] tabular-nums select-none w-8 shrink-0">
          {range ? hi : singleVal}
        </span>
      )}
    </div>
  )
}
