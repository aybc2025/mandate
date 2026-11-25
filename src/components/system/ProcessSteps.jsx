import { STEPS } from '../../content/system'

// The formation process as an ordered sequence, with "we are here" on the live step.
export default function ProcessSteps({ countdown }) {
  return (
    <ol className="overflow-hidden rounded-card border border-line">
      {STEPS.map((s) => {
        const here = s.id === countdown.stepId
        return (
          <li
            key={s.id}
            aria-current={here ? 'step' : undefined}
            className={`grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-line p-4 last:border-b-0 ${
              here ? 'border-s-4 border-s-signal bg-panel' : 'bg-surface'
            }`}
          >
            <span className="font-display text-heading font-bold text-accent">{s.when}</span>
            <span className="text-meta">
              {s.text}
              {here && countdown.dayOf && countdown.active && (
                <strong className="mt-1 block text-ink">
                  We are here: day {countdown.dayOf} of {countdown.totalDays}.
                </strong>
              )}
              {here && !countdown.active && <strong className="mt-1 block text-ink">We are here.</strong>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
