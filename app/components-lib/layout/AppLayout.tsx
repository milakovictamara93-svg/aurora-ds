import AppSidebar from './AppSidebar'
import Footer from '@/components/ui/Footer'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F8F8] dark:bg-[#111827] page-grid-bg">
      <AppSidebar />
      {/* ml-[264px] = 24px sidebar margin + 240px sidebar panel */}
      <div className="ml-[264px] flex flex-col min-h-screen">
        <div className="flex-1 px-8 pt-8 pb-16">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}
