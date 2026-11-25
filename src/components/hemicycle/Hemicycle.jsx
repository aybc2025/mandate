import { useMemo } from 'react'
import { hemicycleLayout } from '../../lib/hemicycleLayout'
import { MAJORITY } from '../../constants'

const W = 400
const R = 192
const CX = W / 2
const DOT = R * 0.044
const CY = R + DOT + 2
const H = CY + 2

// 120-seat Knesset chart. Seats of `highlight` parties are solid; the rest are faint.
export default function Hemicycle({ partyById, highlight, total, caption }) {
  const seats = useMemo(() => hemicycleLayout(partyById), [partyById])
  const on = useMemo(() => new Set(highlight), [highlight])
  const summary = `${caption}: ${total} of 120 seats, ${total >= MAJORITY ? 'a majority' : `${MAJORITY - total} short of ${MAJORITY}`}.`

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={summary}>
        {seats.map((s, i) => {
          const color = partyById[s.partyId]?.color ?? '#999999'
          return (
            <circle
              key={i}
              className="seat"
              cx={(CX + s.x * R).toFixed(1)}
              cy={(CY - s.y * R).toFixed(1)}
              r={DOT}
              fill={color}
              fillOpacity={on.has(s.partyId) ? 1 : 0.16}
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
    </figure>
  )
}
