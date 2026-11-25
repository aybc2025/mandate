import { useOutletContext } from 'react-router-dom'
import { useTimelineFilter } from '../hooks/useTimelineFilter'
import { longDate } from '../lib/format'
import TagFilter from '../components/timeline/TagFilter'
import TimelineEntry from '../components/timeline/TimelineEntry'

export default function TimelinePage() {
  const data = useOutletContext()
  const { tags, tag, setTag, entries, isNew } = useTimelineFilter(data.timeline, data.updated)

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10">
      <h1 className="font-display text-title font-bold">Timeline</h1>
      <p className="mt-1 text-muted">
        Every development since election day on {longDate(data.results.electionDate)}, newest first.
      </p>
      <div className="mt-4">
        <TagFilter tags={tags} active={tag} onChange={setTag} />
      </div>
      <ol className="mt-5">
        {entries.map((t) => (
          <TimelineEntry key={t.id} entry={t} partyById={data.partyById} isNew={isNew(t)} />
        ))}
      </ol>
      {entries.length === 0 && <p className="py-8 text-muted">No events with this topic yet.</p>}
    </div>
  )
}
