import Sidebar from './Sidebar'
import Breadcrumbs from './Breadcrumbs'

interface NavItem { href: string; label: string }

interface SectionLayoutProps {
  children: React.ReactNode
  sidebarItems: NavItem[]
  section: string
}

export default function SectionLayout({ children, sidebarItems, section }: SectionLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-60px)] max-w-container mx-auto px-6">
      <Sidebar items={sidebarItems} section={section} />
      <div className="flex-1 min-w-0 py-8 lg:pl-8">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  )
}
