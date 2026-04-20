'use client'

import { useState } from 'react'
import AppSidebar from './AppSidebar'
import Footer from '@/app/components-lib/ui/Footer'
import AuroraIcon from '@/app/components-lib/ui/AuroraIcon'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F7F8F8] dark:bg-[#111827] page-grid-bg">
      <AppSidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />

      {/* Mobile top bar — hidden on lg+ where the sidebar is always visible */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 z-20 bg-white dark:bg-[#0D1117] border-b border-[#EDEEF1] dark:border-[#1F2430] flex items-center px-4 gap-3">
        <button
          onClick={() => setMobileNavOpen(true)}
          className="p-1.5 rounded-md text-[#505867] hover:text-[#111827] hover:bg-[#F7F8F8] dark:text-[#9CA3AF] dark:hover:text-white dark:hover:bg-white/5 transition-colors"
          aria-label="Open navigation"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <AuroraIcon className="w-6 h-6 text-[#1258F8]" />
          <p className="text-[14px] leading-snug">
            <strong className="font-bold text-[#111827] dark:text-white">Aurora</strong>
            <span className="font-normal text-[#505867] dark:text-[#9CA3AF]"> Design System</span>
          </p>
        </Link>
      </div>

      {/* Main content — offset by sidebar on desktop, offset by top bar on mobile */}
      <div className="lg:ml-[264px] flex flex-col min-h-screen">
        <div className="flex-1 px-4 pt-[72px] pb-16 lg:px-8 lg:pt-8">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}
