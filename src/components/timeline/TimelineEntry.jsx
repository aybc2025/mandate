import { Link } from 'react-router-dom'
import { shortDate } from '../../lib/format'
import SourceLinks from '../common/SourceLinks'

export default function TimelineEntry({ entry, partyById, isNew = false }) {
  return (
    <li className="grid gap-1 border-t border-line py-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
      <time dateTime={entry.date} className="tabular whitespace-nowrap font-display text-heading font-bold text-accent">
        {shortDate(entry.date)}
      </time>
      <div>
        <h3 className="font-display text-heading font-bold">
          {entry.title}
          {isNew && (
            <span className="ms-2 inline-block rounded-full bg-flag px-2 align-middle font-sans text-label font-bold text-onband">
              New
            </span>
          )}
        </h3>
        <p className="mt-1 max-w-prose">{entry.text}</p>
        {entry.parties.length > 0 && (
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-label">
            {entry.parties.map((id) => (
              <Link key={id} to={`/parties/${id}`} className="font-semibold text-accent underline">
                {partyById[id]?.name ?? id}
              </Link>
            ))}
          </p>
        )}
        <div className="mt-2">
          <SourceLinks sources={entry.sources} />
        </div>
      </div>
    </li>
  )
}
