import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import AppLayout from '@/components/layout/AppLayout'
import VideoCard from '@/components/ui/VideoCard'

// ── Figma building-block assets (light-blue geometric shapes) ─────────────────
// These decorate the three section cards. URLs expire in 7 days from generation.
const BB1 = 'https://www.figma.com/api/mcp/asset/ac49f527-7869-4c0a-93ff-6c6f4a9694dc'
const BB2 = 'https://www.figma.com/api/mcp/asset/fd698b92-3b69-4a5f-a428-b7cc642a74d6'
const BB3 = 'https://www.figma.com/api/mcp/asset/84728999-2d0a-495c-a507-679d9b86af0b'
const BB4 = 'https://www.figma.com/api/mcp/asset/42d528db-ac45-4013-881f-a9cbdac04d37'
const BB5 = 'https://www.figma.com/api/mcp/asset/025481b8-4020-4cf6-b021-861556c823fa'
const BB6 = 'https://www.figma.com/api/mcp/asset/c4c4d98b-498c-4601-b803-3221295d2149'

// ── Section card building-block configs ───────────────────────────────────────
//   Each item: { src, w (px), transform }
type BBItem = { src: string; w: number; tf?: string }

const FOUNDATIONS_BLOCKS: BBItem[] = [
  { src: BB2, w: 132, tf: 'rotate(-90deg)' },
  { src: BB1, w: 66,  tf: 'scaleX(-1)' },
  { src: BB1, w: 66,  tf: 'scaleX(-1)' },
]

const COMPONENTS_BLOCKS: BBItem[] = [
  { src: BB3, w: 66,  tf: 'scaleX(-1)' },
  { src: BB4, w: 132, tf: 'rotate(-90deg)' },
  { src: BB3, w: 66,  tf: 'scaleX(-1)' },
]

const PATTERNS_BLOCKS: BBItem[] = [
  { src: BB5, w: 66,  tf: 'scaleX(-1)' },
  { src: BB5, w: 66,  tf: 'scaleX(-1)' },
  { src: BB6, w: 132, tf: 'rotate(-90deg)' },
]

// ── Small helper: building-block image strip ──────────────────────────────────
function BlockStrip({ items }: { items: BBItem[] }) {
  return (
    <div className="absolute left-0 top-0 flex items-start h-[132px] transition-all duration-500 ease-in-out group-hover:left-full group-hover:-translate-x-full">
      {items.map((item, i) => (
        <div
          key={i}
          className="shrink-0 h-[132px]"
          style={{ width: item.w, transform: item.tf }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt="" className="w-full h-full object-fill" />
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
