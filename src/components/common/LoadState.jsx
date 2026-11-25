import Skeleton from './Skeleton'

// First-visit loading skeleton, or a hard error when no copy is available at all.
export default function LoadState({ status, onRetry }) {
  if (status === 'error') {
    return (
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-display text-title font-bold">Today’s update couldn’t load</h1>
        <p className="mt-3 text-muted">Check your connection, then try again.</p>
        <button
          type="button"
          onClick={onRetry}
          className="press mt-6 min-h-11 rounded-card bg-flag px-5 font-bold text-onband"
        >
          Try again
        </button>
      </section>
    )
  }
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="bg-band px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <Skeleton className="h-4 w-40 opacity-30" />
          <Skeleton className="h-10 w-full max-w-lg opacity-30" />
          <Skeleton className="h-10 w-2/3 max-w-md opacity-30" />
          <Skeleton className="h-20 w-full max-w-xl opacity-30" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 md:px-8">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  )
}
