import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8F8] dark:bg-[#111827]">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#111827] dark:text-white mb-2">Page not found</h2>
        <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mb-4">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-flex h-9 px-4 items-center rounded bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
