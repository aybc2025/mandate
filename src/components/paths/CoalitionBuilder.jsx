import { BLOCS, SEAT_ORDER } from '../../constants'
import SeatBar from './SeatBar'

const btn = 'press rounded-full border border-line px-3 py-1.5 text-meta enabled:hover:border-accent disabled:opacity-50'

// Pick any parties and see whether they reach 61. Party colour is a dot only, never text.
// `base` is the ready-made path currently shown (if any), which can be copied in to tweak.
export default function CoalitionBuilder({ partyById, custom, active, base, onToggle, onClear, onStartFrom }) {
  const chosen = new Set(custom.parties)
  const ordered = SEAT_ORDER.map((id) => partyById[id]).filter(Boolean)

  return (
    <section
      aria-labelledby="builder-title"
      className={`rounded-card border bg-panel p-4 ${active ? 'border-accent ring-2 ring-accent ring-inset' : 'border-line'}`}
    >
      <h2 id="builder-title" className="text-body font-bold">
        Build your own coalition
      </h2>
      <p className="text-meta text-muted">Pick parties to see whether they reach 61.</p>

      <div className="mt-2 flex items-baseline gap-2" aria-live="polite">
        <span className={`tabular font-display text-figure font-black ${custom.reaches ? 'text-reach' : 'text-signal'}`}>
          {custom.total}
        </span>
        <span className="text-meta font-bold">{custom.reaches ? 'a majority' : `${custom.short} short of 61`}</span>
      </div>
      <SeatBar total={custom.total} />

      {BLOCS.map((bloc) => {
        const items = ordered.filter((p) => p.bloc === bloc.id)
        if (!items.length) return null
        return (
          <fieldset key={bloc.id} className="mt-3 min-w-0 border-0 p-0">
            <legend className="mb-1 p-0 text-label font-bold text-muted">{bloc.label}</legend>
            <div className="flex flex-wrap gap-2">
              {items.map((p) => {
                const on = chosen.has(p.id)
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onToggle(p.id)}
                    className={`press flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-meta ${
                      on ? 'border-accent bg-surface font-bold ring-2 ring-accent ring-inset' : 'border-line bg-bg hover:border-accent'
                    }`}
                  >
                    <span aria-hidden="true" className="size-3 rounded-full ring-1 ring-line" style={{ background: p.color }} />
                    {p.name.replace(/\s*\(.*\)$/, '')}
                    <span className="tabular text-muted">{p.seats}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        )
      })}

      <div className="mt-4 flex flex-wrap gap-2">
        {base && (
          <button type="button" className={btn} onClick={() => onStartFrom(base.parties)}>
            Start from “{base.name}”
          </button>
        )}
        <button type="button" className={btn} onClick={onClear} disabled={!custom.parties.length}>
          Clear
        </button>
      </div>
    </section>
  )
}
