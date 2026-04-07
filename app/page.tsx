import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import AppLayout from '@/app/components-lib/layout/AppLayout'
import VideoCard from '@/app/components-lib/ui/VideoCard'

// ── Exact Figma building-block shapes (paths from Figma export, brand color applied) ──
const BRAND = '#2295FF'

// BB1 — 125×250 portrait, one chamfered-corner shape
function BB1Svg() {
  return (
    <svg width="125" height="250" viewBox="0 0 125 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.6527 0L1.40071e-05 41.6527V249.916H83.3055L124.958 208.264V0H41.6527Z" fill={BRAND}/>
    </svg>
  )
}

// BB2 — 250×250 square, one chamfered-corner shape
function BB2Svg() {
  return (
    <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 41.6528L41.6527 2.80142e-05L249.916 2.80142e-05L249.916 208.264L208.264 249.916H0L0 41.6528Z" fill={BRAND}/>
    </svg>
  )
}

// BB3 — 250×250, two-part shape
function BB3Svg() {
  return (
    <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M124.999 249.997H62.5L0 187.497V0H124.998L124.999 249.997Z" fill={BRAND}/>
      <path d="M250 62.5H249.997V249.997H125.003L125.002 0H187.5L250 62.5Z" fill={BRAND}/>
    </svg>
  )
}

// BB4 — 168×84 wide landscape, one chamfered shape
function BB4Svg() {
  return (
    <svg width="168" height="84" viewBox="0 0 168 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M167.988 41.9971L167.989 83.9951H41.9971L0.000976562 41.998L0 0H125.992L167.988 41.9971Z" fill={BRAND}/>
    </svg>
  )
}

// BB5 — 168×126, two-part shape
function BB5Svg() {
  return (
    <svg width="168" height="126" viewBox="0 0 168 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M83.9951 125.992H41.9971L0.000976562 83.9951L0 0H83.9951V125.992Z" fill={BRAND}/>
      <path d="M125.995 0.000976562L167.992 41.998H167.989V125.992H83.998L83.9971 0L125.995 0.000976562Z" fill={BRAND}/>
    </svg>
  )
}

// BB6 — 84×168 tall, two-part shape
function BB6Svg() {
  return (
    <svg width="84" height="168" viewBox="0 0 84 168" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M83.9951 125.992L41.998 167.989L0 167.99V83.9951H83.9951V125.992Z" fill={BRAND}/>
      <path d="M83.9951 83.9922H0V41.9941H0.00390625L41.9971 0.000976562L83.9951 0V83.9922Z" fill={BRAND}/>
    </svg>
  )
}

// ── Section card building-block configs ───────────────────────────────────────
type BBItem = { el: React.ReactNode; w: number; tf?: string }

const FOUNDATIONS_BLOCKS: BBItem[] = [
  { el: <BB2Svg />, w: 132, tf: 'rotate(-90deg)' },
  { el: <BB1Svg />, w: 66,  tf: 'scaleX(-1)' },
  { el: <BB1Svg />, w: 66,  tf: 'scaleX(-1)' },
]

const COMPONENTS_BLOCKS: BBItem[] = [
  { el: <BB3Svg />, w: 66,  tf: 'scaleX(-1)' },
  { el: <BB4Svg />, w: 132, tf: 'rotate(-90deg)' },
  { el: <BB3Svg />, w: 66,  tf: 'scaleX(-1)' },
]

const PATTERNS_BLOCKS: BBItem[] = [
  { el: <BB5Svg />, w: 66,  tf: 'scaleX(-1)' },
  { el: <BB5Svg />, w: 66,  tf: 'scaleX(-1)' },
  { el: <BB6Svg />, w: 132, tf: 'rotate(-90deg)' },
]

// ── Small helper: building-block strip ───────────────────────────────────────
function BlockStrip({ items }: { items: BBItem[] }) {
  return (
    <div className="absolute left-0 top-0 flex items-start h-[132px] transition-all duration-500 ease-in-out group-hover:left-full group-hover:-translate-x-full">
      {items.map((item, i) => (
        <div
          key={i}
          className="shrink-0 h-[132px]"
          style={{ width: item.w, transform: item.tf }}
        >
          {item.el}
        </div>
      ))}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <AppLayout>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — centered, no background
      ══════════════════════════════════════════════════════════════════ */}
      <section className="flex flex-col items-center justify-center gap-6 min-h-[320px] p-8 text-center">
        {/* Version badge */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[rgba(109,120,138,0.2)] dark:border-white/10 text-[11px] font-medium text-[#505867] dark:text-[#9CA3AF]">
          v1.0 · In progress
        </div>

        {/* H1 */}
        <h1 className="text-[40px] font-bold text-[#111827] dark:text-white leading-[1.2] tracking-tight">
          Aurora Design System
        </h1>

        {/* Subtitle */}
        <p className="text-[18px] text-[#505867] dark:text-[#9CA3AF] leading-[1.45] tracking-[0.27px]">
          Systematic design, scalable results.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <Link
            href="/foundations/colors"
            className="inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-[#D7DAE0] dark:border-[#374151] text-[14px] font-medium text-[#111827] dark:text-white hover:bg-[#F7F8F8] dark:hover:bg-white/5 transition-colors"
          >
            View foundations
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link
            href="/components/buttons"
            className="inline-flex items-center gap-2 h-8 px-3 rounded-lg bg-[#1258F8] text-[14px] font-medium text-white hover:bg-[#1146E4] transition-colors"
          >
            Browse components
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHY AURORA — text left, animated blue card right
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: text */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[32px] font-bold text-[#111827] dark:text-white leading-[1.15] tracking-[-0.5px]">
            Why Aurora?
          </h2>
          <p className="text-[15px] font-semibold text-[#505867] dark:text-[#9CA3AF] leading-[1.7]">
            Built for the complexity of ESG data
          </p>
          <p className="text-[15px] text-[#505867] dark:text-[#9CA3AF] leading-[1.7]">
            Real estate sustainability data is dense, technical, and consequential.
            Aurora was built specifically for this challenge — a design system that
            makes complex information clear, actionable, and trustworthy.
          </p>
          <ul className="list-disc ml-[22px] text-[15px] text-[#505867] dark:text-[#9CA3AF] leading-[1.7]">
            <li>
              <strong className="font-semibold text-[#111827] dark:text-white">
                Consistency at scale
              </strong>
              {' '}— One system across 25,000+ buildings. Every screen feels intentional.
            </li>
            <li>
              <strong className="font-semibold text-[#111827] dark:text-white">
                Accessible by default
              </strong>
              {' '}— WCAG AA built in from the start — not bolted on at the end.
            </li>
            <li>
              <strong className="font-semibold text-[#111827] dark:text-white">
                Designed for decisions
              </strong>
              {' '}— High-stakes data needs clear hierarchy. Aurora makes sure it lands.
            </li>
          </ul>
        </div>

        {/* Right: video card */}
        <VideoCard />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          THREE SECTION CARDS — Foundations · Components · Patterns
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">

        <Link
          href="/foundations/colors"
          className="bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg px-4 py-4
            hover:border-[#1258F8] hover:shadow-[0_4px_16px_rgba(18,88,248,0.10)] transition-all duration-200 group"
        >
          <div className="flex flex-col gap-4 h-[170px] items-start">
            <p className="text-[16px] font-semibold text-[#111827] dark:text-white group-hover:text-[#1258F8] transition-colors shrink-0">
              Foundations
            </p>
            <div className="flex-1 relative w-full overflow-hidden min-h-0">
              <BlockStrip items={FOUNDATIONS_BLOCKS} />
            </div>
          </div>
        </Link>

        <Link
          href="/components/buttons"
          className="bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg px-4 py-4
            hover:border-[#1258F8] hover:shadow-[0_4px_16px_rgba(18,88,248,0.10)] transition-all duration-200 group"
        >
          <div className="flex flex-col gap-4 h-[170px] items-start">
            <p className="text-[16px] font-semibold text-[#111827] dark:text-white group-hover:text-[#1258F8] transition-colors shrink-0">
              Components
            </p>
            <div className="flex-1 relative w-full overflow-hidden min-h-0">
              <BlockStrip items={COMPONENTS_BLOCKS} />
            </div>
          </div>
        </Link>

        <Link
          href="/patterns/esg-data"
          className="bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg px-4 py-4
            hover:border-[#1258F8] hover:shadow-[0_4px_16px_rgba(18,88,248,0.10)] transition-all duration-200 group"
        >
          <div className="flex flex-col gap-4 h-[170px] items-start">
            <p className="text-[16px] font-semibold text-[#111827] dark:text-white group-hover:text-[#1258F8] transition-colors shrink-0">
              Patterns
            </p>
            <div className="flex-1 relative w-full overflow-hidden min-h-0">
              <BlockStrip items={PATTERNS_BLOCKS} />
            </div>
          </div>
        </Link>

      </section>

    </AppLayout>
  )
}
