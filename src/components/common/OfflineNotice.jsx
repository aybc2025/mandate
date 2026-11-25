import { longDate } from '../../lib/format'

export default function OfflineNotice({ updated, onRetry }) {
  return (
    <div role="status" className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-meta md:px-8">
        <span>
          <b>You’re offline.</b> Showing the update from {longDate(updated)}.
        </span>
        <button type="button" onClick={onRetry} className="min-h-11 font-bold text-accent underline">
          Try again
        </button>
      </div>
    </div>
  )
}
