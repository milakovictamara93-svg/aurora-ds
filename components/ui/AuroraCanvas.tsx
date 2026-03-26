'use client'

import { useEffect, useRef } from 'react'

export type AuroraCanvasMode = 'outward' | 'inward'

/**
 * Draws a closed smooth curve through the given points using cubic bezier
 * segments derived from Catmull-Rom splines.
 */
function smoothCurve(
  ctx: CanvasRenderingContext2D,
  pts: [number, number][],
  tension = 0.38
) {
  const n = pts.length
  ctx.beginPath()

  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]

    const cp1x = p1[0] + (p2[0] - p0[0]) * tension / 3
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension / 3
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension / 3
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension / 3

    if (i === 0) ctx.moveTo(p1[0], p1[1])
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2[0], p2[1])
  }

  ctx.closePath()
}

/**
 * Generate the 8 polar control points of the morphing Aurora star
 * (4 arm tips + 4 concave valleys), then render via smoothCurve.
 *
 * mode='outward'  → arms stretch outward, livelier rotation, expansive feel
 * mode='inward'   → valleys deepen, calmer rotation, convergent feel
 */
function drawMorphingStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  scale: number,
  mode: AuroraCanvasMode
) {
  // Slow global rotation — different speed per card
  const rotSpeed = mode === 'outward' ? 0.0022 : 0.0014
  const rot = t * rotSpeed

  const pts: [number, number][] = []
  const N = 4 // 4 arms → 8 points

  for (let i = 0; i < 2 * N; i++) {
    const base = (i * Math.PI / N) - Math.PI / 2 + rot
    const isTip = i % 2 === 0
    const ph = i * 0.71

    let r: number

    if (isTip) {
      // Arm tips: primary oscillation + harmonic
      if (mode === 'outward') {
        r = scale * (
          1.00
          + 0.13 * Math.sin(t * 0.0068 + ph)
          + 0.07 * Math.sin(t * 0.0121 + ph * 1.73)
          + 0.04 * Math.cos(t * 0.0195 + ph * 0.9)
        )
      } else {
        r = scale * (
          1.00
          + 0.08 * Math.cos(t * 0.0052 + ph)
          + 0.05 * Math.sin(t * 0.0097 + ph * 1.5)
          + 0.03 * Math.sin(t * 0.0163 + ph * 2.1)
        )
      }
    } else {
      // Concave valleys: inward-outward breathing
      if (mode === 'outward') {
        r = scale * 0.22 * (
          1.00
          + 0.18 * Math.cos(t * 0.0081 + ph)
          + 0.09 * Math.sin(t * 0.0143 + ph * 1.4)
        )
      } else {
        // inward: valleys pull deeper
        r = scale * 0.22 * (
          1.00
          + 0.22 * Math.sin(t * 0.0063 + ph)
          + 0.11 * Math.cos(t * 0.0118 + ph * 1.6)
          + 0.06 * Math.sin(t * 0.0189 + ph * 0.8)
        )
      }
    }

    // Per-point subtle angular drift — creates the "flowing" quality
    const drift = 0.048 * Math.sin(t * 0.0038 + i * 1.13)

    pts.push([
      cx + Math.cos(base + drift) * r,
      cy + Math.sin(base + drift) * r,
    ])
  }

  smoothCurve(ctx, pts, 0.40)
}

export default function AuroraCanvas({ mode }: { mode: AuroraCanvasMode }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0

    function resize() {
      el!.width = el!.offsetWidth
      el!.height = el!.offsetHeight
    }

    function frame() {
      const w = el!.width
      const h = el!.height
      ctx!.clearRect(0, 0, w, h)

      const scale = Math.min(w, h) * 0.30

      drawMorphingStar(ctx!, w / 2, h / 2, t, scale, mode)

      // White fill — the one and only element
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.88)'
      ctx!.fill()

      t++
      raf = requestAnimationFrame(frame)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [mode])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
