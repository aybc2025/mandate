import { useEffect, useMemo, useRef, useState } from 'react'
import { STORAGE_LAST_SEEN } from '../constants'

const readLastSeen = () => {
  try {
    return localStorage.getItem(STORAGE_LAST_SEEN)
  } catch {
    return null
  }
}

// Tag filter for the timeline, plus a "new since your last visit" marker.
export function useTimelineFilter(timeline, updated) {
  const [tag, setTag] = useState('all')
  const lastSeen = useRef(readLastSeen())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LAST_SEEN, updated)
    } catch {
      /* storage unavailable: the marker simply doesn't show */
    }
  }, [updated])

  const tags = useMemo(() => {
    const counts = new Map()
    timeline.forEach((t) => t.tags.forEach((g) => counts.set(g, (counts.get(g) ?? 0) + 1)))
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([g]) => g)
  }, [timeline])

  const entries = useMemo(
    () => (tag === 'all' ? timeline : timeline.filter((t) => t.tags.includes(tag))),
    [timeline, tag],
  )

  const isNew = (entry) => Boolean(lastSeen.current) && entry.date > lastSeen.current

  return { tags, tag, setTag, entries, isNew }
}
