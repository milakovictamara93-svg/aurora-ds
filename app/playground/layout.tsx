'use client'

import { useEffect } from 'react'

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  // Force light mode for playground to avoid hydration mismatches
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden bg-grey-50">
      {children}
    </div>
  )
}
