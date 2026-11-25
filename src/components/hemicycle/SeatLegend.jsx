import { SEAT_ORDER } from '../../constants'

export default function SeatLegend({ partyById }) {
  return (
    <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-label text-ink">
      {SEAT_ORDER.map((id) => partyById[id]).filter(Boolean).map((p) => (
        <li key={p.id} className="flex items-center gap-1.5 whitespace-nowrap">
          <span aria-hidden="true" className="size-3 rounded-full" style={{ background: p.color }} />
          {p.name.replace(/\s*\(.*\)$/, '')} <span className="tabular text-muted">{p.seats}</span>
        </li>
      ))}
    </ul>
  )
}
