'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8F8] dark:bg-[#111827]">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#111827] dark:text-white mb-2">Something went wrong</h2>
        <p className="text-sm text-[#505867] dark:text-[#9CA3AF] mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="h-9 px-4 rounded bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
