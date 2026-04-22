import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import AppLayout from '@/app/components-lib/layout/AppLayout'
import VideoCard from '@/app/components-lib/ui/VideoCard'
import Tag from '@/app/components-lib/ui/Tag'

// ── Exact Figma building-block shapes (SVG paths exported directly from Aurora DS Figma file)
// Colors and paths are permanent — no expiry.

// Foundations strip — #D9EAFF (light blue), 264×132
function FoundationsIcons() {
  return (
    <svg width="264" height="132" viewBox="0 0 264 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 21.9779L22 -0.02211H132V109.978L110 131.978H0L0 21.9779Z" fill="#D9EAFF"/>
      <path d="M154 -0.0220947L132 21.9779V131.978H176L198 109.978V-0.0220947H154Z" fill="#D9EAFF"/>
      <path d="M220 -0.0220947L198 21.9779V131.978H242L264 109.978V-0.0220947H220Z" fill="#D9EAFF"/>
    </svg>
  )
}

// Components strip — #BBDAFF (medium blue), 264×132
function ComponentsIcons() {
  return (
    <svg width="264" height="132" viewBox="0 0 264 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 -0.0220947L-7.62939e-06 21.9779V131.978H44L66 109.978V-0.0220947H22Z" fill="#BBDAFF"/>
      <path d="M66 21.9779L88 -0.02211H198V109.978L176 131.978H66V21.9779Z" fill="#BBDAFF"/>
      <path d="M220 -0.0220947L198 21.9779V131.978H242L264 109.978V-0.0220947H220Z" fill="#BBDAFF"/>
    </svg>
  )
}

// Patterns strip — #8CC4FF (stronger blue), 264×132
function PatternsIcons() {
  return (
    <svg width="264" height="132" viewBox="0 0 264 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 -0.0220947L-7.62939e-06 21.9779V131.978H44L66 109.978V-0.0220947H22Z" fill="#8CC4FF"/>
      <path d="M88 -0.0220947L66 21.9779V131.978H110L132 109.978V-0.0220947H88Z" fill="#8CC4FF"/>
      <path d="M132 21.9779L154 -0.02211H264V109.978L242 131.978H132V21.9779Z" fill="#8CC4FF"/>
    </svg>
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
        <Tag label="v1.0 · In progress" system="default" style="outline" size="small" showCount={false} showRemove={false} />

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
              <div className="absolute left-0 top-0 transition-all duration-500 ease-in-out group-hover:left-full group-hover:-translate-x-full">
                <FoundationsIcons />
              </div>
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
              <div className="absolute left-0 top-0 transition-all duration-500 ease-in-out group-hover:left-full group-hover:-translate-x-full">
                <ComponentsIcons />
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/patterns/data-visualization"
          className="bg-white dark:bg-[#111827] border border-[#EDEEF1] dark:border-[#1F2430] rounded-lg px-4 py-4
            hover:border-[#1258F8] hover:shadow-[0_4px_16px_rgba(18,88,248,0.10)] transition-all duration-200 group"
        >
          <div className="flex flex-col gap-4 h-[170px] items-start">
            <p className="text-[16px] font-semibold text-[#111827] dark:text-white group-hover:text-[#1258F8] transition-colors shrink-0">
              Patterns
            </p>
            <div className="flex-1 relative w-full overflow-hidden min-h-0">
              <div className="absolute left-0 top-0 transition-all duration-500 ease-in-out group-hover:left-full group-hover:-translate-x-full">
                <PatternsIcons />
              </div>
            </div>
          </div>
        </Link>

      </section>

    </AppLayout>
  )
}
