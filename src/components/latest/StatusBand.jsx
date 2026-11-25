import { longDate, checkedTime } from '../../lib/format'
import Countdown from '../common/Countdown'

// The flag-blue hero: today's headline, summary and key figures. `children` is the seat chart.
export default function StatusBand({ data, countdown, children }) {
  return (
    <section className="bg-band text-onband" aria-labelledby="headline">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-6 md:grid-cols-2 md:items-center md:px-8 md:py-14">
        <div>
          <p className="text-meta font-semibold opacity-85">
            Updated {longDate(data.updated)}
            <span className="sr-only">. </span>
            <span className="block text-label font-normal opacity-85">Checked {checkedTime(data.checkedAt)} Israel time</span>
          </p>
          <h1 id="headline" className="mt-3 font-display text-display font-black">
            {data.status.headline}
          </h1>
          <p className="mt-4 max-w-prose text-body opacity-95">{data.status.summary}</p>
          <Countdown countdown={countdown} mandate={data.mandate} phase={data.phase} />
        </div>
        <div className="rounded-card bg-panel p-4">{children}</div>
      </div>
    </section>
  )
}
