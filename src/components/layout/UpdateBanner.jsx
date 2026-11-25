import { useRegisterSW } from 'virtual:pwa-register/react'

// Shown when a new build of the app is ready. New daily content does not need
// this — coalition.json is fetched network-first on every visit.
export default function UpdateBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, reg) {
      if (reg) setInterval(() => reg.update(), 60 * 60 * 1000)
    },
  })

  if (!needRefresh) return null
  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-20 z-40 mx-auto flex max-w-md items-center justify-between gap-3 rounded-card bg-ink px-4 py-3 text-meta text-bg shadow-raised md:bottom-6"
    >
      <span>A new version of Mandate is ready.</span>
      <span className="flex gap-2">
        <button type="button" onClick={() => setNeedRefresh(false)} className="min-h-11 px-2 font-semibold">
          Later
        </button>
        <button
          type="button"
          onClick={() => updateServiceWorker(true)}
          className="press min-h-11 rounded-card bg-bg px-3 font-bold text-ink"
        >
          Refresh
        </button>
      </span>
    </div>
  )
}
