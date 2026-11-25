import { shortDate } from '../../lib/format'
import { PHASE_LABELS } from '../../constants'

// Key figures under the hero headline. Lives on the flag-blue band.
export default function Countdown({ countdown, mandate, phase }) {
  if (!countdown.active) {
    return <p className="mt-5 font-display text-heading font-bold">{PHASE_LABELS[phase]}</p>
  }
  const figures = [
    { value: countdown.daysLeft, label: `days left to ${shortDate(countdown.deadline)}`, urgent: true },
    phase !== 'extended' && mandate.extendedDeadline
      ? { value: shortDate(mandate.extendedDeadline), label: 'latest with extension' }
      : null,
    { value: 61, label: 'seats for a majority' },
  ].filter(Boolean)

  return (
    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
      {figures.map((f) => (
        <div key={f.label} className="flex flex-col-reverse">
          <dt className="text-label opacity-85">{f.label}</dt>
          <dd className={`tabular m-0 font-display text-figure font-black ${f.urgent ? 'text-deadline' : ''}`}>
            {f.value}
          </dd>
        </div>
      ))}
      <div className="flex flex-col-reverse">
        <dt className="text-label opacity-85">holds the mandate</dt>
        <dd className="m-0 font-display text-heading font-bold leading-none">{mandate.holder}</dd>
      </div>
    </dl>
  )
}
