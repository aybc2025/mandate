import { useCallback, useEffect, useMemo, useState } from 'react'
import { DATA_URL } from '../constants'

// Loads the daily content file. The service worker serves it network-first, so
// when offline this still resolves from the cached copy; `offline` tells the UI
// to say it may be out of date.
export function useCoalitionData() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [offline, setOffline] = useState(typeof navigator !== 'undefined' && !navigator.onLine)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let alive = true
    setStatus((s) => (s === 'ready' ? s : 'loading'))
    fetch(DATA_URL, { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d) => {
        if (!alive) return
        setData(d)
        setStatus('ready')
      })
      .catch(() => alive && setStatus((s) => (s === 'ready' ? s : 'error')))
    return () => {
      alive = false
    }
  }, [attempt])

  useEffect(() => {
    const on = () => {
      setOffline(false)
      setAttempt((a) => a + 1)
    }
    const off = () => setOffline(true)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  const retry = useCallback(() => setAttempt((a) => a + 1), [])

  const derived = useMemo(() => {
    if (!data) return null
    const partyById = Object.fromEntries(data.parties.map((p) => [p.id, p]))
    const timeline = [...data.timeline].sort((a, b) => b.date.localeCompare(a.date))
    return { ...data, partyById, timeline }
  }, [data])

  return { data: derived, status, offline, retry }
}
