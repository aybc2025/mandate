import { useMemo } from 'react'
import { hemicycleLayout } from '../../lib/hemicycleLayout'
import SeatLegend from './SeatLegend'
import { MAJORITY } from '../../constants'

const W = 400
const R = 192
const CX = W / 2
const DOT = R * 0.044
const CY = R + DOT + 2
const H = CY + 2

// 120-seat Knesset chart. Seats of `highlight` parties are solid; the rest are faint.
// Parties in `tentative` (a subset of `highlight`) are drawn as rings: agreed to sign, not yet signed.
export default function Hemicycle({ partyById, highlight, tentative = [], total, caption, legend }) {
  const seats = useMemo(() => hemicycleLayout(partyById), [partyById])
  const on = useMemo(() => new Set(highlight), [highlight])
  const ring = useMemo(() => new Set(tentative.filter((id) => on.has(id))), [tentative, on])
  const agreedSeats = [...ring].reduce((sum, id) => sum + (partyById[id]?.seats ?? 0), 0)
  const split = agreedSeats > 0 ? `${total - agreedSeats} signed + ${agreedSeats} agreed to sign` : ''
  const summary = `${caption}: ${total} of 120 seats${split ? ` (${split})` : ''}, ${total >= MAJORITY ? 'a majority' : `${MAJORITY - total} short of ${MAJORITY}`}.`

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={summary}>
        {seats.map((s, i) => {
          const color = partyById[s.partyId]?.color ?? '#999999'
          const agreed = ring.has(s.partyId)
          return (
            <circle
              key={i}
              className="seat"
              cx={(CX + s.x * R).toFixed(1)}
              cy={(CY - s.y * R).toFixed(1)}
              r={agreed ? DOT - 0.7 : DOT}
              fill={color}
              fillOpacity={agreed ? 0.3 : on.has(s.partyId) ? 1 : 0.16}
              stroke={agreed ? color : 'none'}
              strokeWidth={agreed ? 1.4 : 0}
            />
          )
        })}
        <text
          x={CX}
          y={CY - R * 0.08}
          textAnchor="middle"
          className="tabular fill-ink font-display font-black"
          fontSize={R * 0.27}
        >
          {total}
        </text>
      </svg>
      <figcaption className="mt-1 text-center text-meta font-bold text-ink">
        {caption}: {total} of 120 ·{' '}
        <span className={total >= MAJORITY ? 'text-reach' : 'text-signal'}>
          {total >= MAJORITY ? 'a majority' : `${MAJORITY - total} short of ${MAJORITY}`}
        </span>
      </figcaption>
      {split && (
        <p className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-label text-ink">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-3 rounded-full bg-ink" />
            {total - agreedSeats} signed
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-3 rounded-full border-2 border-ink bg-ink/30" />
            {agreedSeats} agreed to sign
          </span>
        </p>
      )}
      {legend && <SeatLegend partyById={partyById} highlight={on} onlyActive={legend === 'active'} />}
    </figure>
  )
}
