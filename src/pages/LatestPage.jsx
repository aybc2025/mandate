import { Link, useOutletContext } from 'react-router-dom'
import { useCountdown } from '../hooks/useCountdown'
import { tally } from '../lib/seatMath'
import StatusBand from '../components/latest/StatusBand'
import WatchList from '../components/latest/WatchList'
import Hemicycle from '../components/hemicycle/Hemicycle'
import TimelineEntry from '../components/timeline/TimelineEntry'

export default function LatestPage() {
  const data = useOutletContext()
  const countdown = useCountdown(data.mandate, data.phase)
  const signed = tally(data.signed, data.partyById)

  return (
    <>
      <StatusBand data={data} countdown={countdown}>
        <Hemicycle
          partyById={data.partyById}
          highlight={data.signed}
          total={signed.total}
          caption={`Signed to ${data.mandate.holder.split(' ').at(-1)} so far`}
          legend="all"
        />
        <p className="mt-3 text-center">
          <Link to="/paths" className="min-h-11 text-meta font-bold text-accent underline">
            See every path to 61
          </Link>
        </p>
      </StatusBand>
      <WatchList items={data.status.watch} />
      <section aria-labelledby="recent" className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h2 id="recent" className="font-display text-title font-bold">Latest developments</h2>
        <ol className="mt-4">
          {data.timeline.slice(0, 3).map((t) => (
            <TimelineEntry key={t.id} entry={t} partyById={data.partyById} />
          ))}
        </ol>
        <Link to="/timeline" className="mt-2 inline-flex min-h-11 items-center font-bold text-accent underline">
          Full timeline since election day
        </Link>
      </section>
    </>
  )
}
