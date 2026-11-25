import { SEAT_ORDER } from '../../constants'

// Colour key for the chart. Parties outside the highlighted set are shown faded
// (legend "all") or left out (legend "active"), mirroring the seats themselves.
export default function SeatLegend({ partyById, highlight, onlyActive = false }) {
  const items = SEAT_ORDER.map((id) => partyById[id])
    .filter(Boolean)
    .filter((p) => !onlyActive || highlight.has(p.id))
  return (
    <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-label text-ink">
      {items.map((p) => {
        const active = highlight.has(p.id)
        return (
          <li key={p.id} className={`flex items-center gap-1.5 whitespace-nowrap ${active ? '' : 'opacity-50'}`}>
            <span aria-hidden="true" className="size-3 rounded-full ring-1 ring-line" style={{ background: p.color }} />
            {p.name.replace(/\s*\(.*\)$/, '')} <span className="tabular text-muted">{p.seats}</span>
          </li>
        )
      })}
    </ul>
  )
}
