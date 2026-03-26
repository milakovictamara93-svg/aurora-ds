'use client'

// Hero background from Figma — dark starfield texture + blue hard-light overlay.
// Asset URL valid for 7 days; replace with /hero-bg.png in /public for production.
const HERO_BG = 'https://www.figma.com/api/mcp/asset/4da0ef12-f470-47d0-96d2-663d84231f70'

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
}

export default function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="relative flex flex-col justify-between gap-6 p-8 rounded-[8px] overflow-hidden" style={{ minHeight: '200px' }}>
      {/* Figma: image + #1258f8 hard-light overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[8px]"
          src={HERO_BG}
        />
        <div className="absolute inset-0 bg-[#1258f8] mix-blend-hard-light rounded-[8px]" />
      </div>

      {/* Title + description */}
      <div className="relative flex flex-col gap-2">
        <h1
          className="font-bold text-white leading-[1.4]"
          style={{ fontSize: '40px' }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="text-[#EDEEF1] leading-[1.45]"
            style={{ fontSize: '18px', letterSpacing: '0.27px' }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Badge / breadcrumb pill — sits at bottom of hero */}
      {badge && (
        <div className="relative">
          <span
            className="inline-flex items-center px-3 rounded-full font-medium text-[#173691] bg-[#d9eaff]"
            style={{ fontSize: '14px', height: '28px', letterSpacing: '0.21px' }}
          >
            {badge}
          </span>
        </div>
      )}
    </div>
  )
}
