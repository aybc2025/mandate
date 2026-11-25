import { useOutletContext } from 'react-router-dom'
import { useCountdown } from '../hooks/useCountdown'
import { EXPLAINERS } from '../content/system'
import ProcessSteps from '../components/system/ProcessSteps'
import ExplainerBlock from '../components/system/ExplainerBlock'

export default function SystemPage() {
  const data = useOutletContext()
  const countdown = useCountdown(data.mandate, data.phase)
  const { turnout, threshold } = data.results

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <h1 className="font-display text-title font-bold">How Israel forms a government</h1>
      <p className="mt-2 max-w-prose">
        Israel elects one 120-seat chamber, the Knesset, by nationwide proportional representation. No party has ever
        won a majority alone, so every government is a coalition that must win a confidence vote. In this election
        turnout was <span className="tabular">{turnout}%</span> and lists needed{' '}
        <span className="tabular">{threshold}%</span> of the vote to win seats.
      </p>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <section aria-labelledby="steps">
          <h2 id="steps" className="mb-3 font-display text-heading font-bold">From election to government</h2>
          <ProcessSteps countdown={countdown} />
        </section>
        <section aria-label="Key ideas" className="grid gap-6">
          {EXPLAINERS.map((e) => (
            <ExplainerBlock key={e.title} {...e} />
          ))}
        </section>
      </div>
    </div>
  )
}
