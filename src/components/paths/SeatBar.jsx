import { KNESSET_SEATS, MAJORITY } from '../../constants'

// Total vs the 61 line. Purely visual; the number beside it carries the meaning.
export default function SeatBar({ total }) {
  return (
    <div aria-hidden="true" className="relative my-2 h-2.5 rounded-full bg-surface">
      <div className="absolute inset-y-0 start-0 rounded-full bg-accent" style={{ width: `${(total / KNESSET_SEATS) * 100}%` }} />
      <div className="absolute -inset-y-1 w-0.5 bg-signal" style={{ insetInlineStart: `${(MAJORITY / KNESSET_SEATS) * 100}%` }} />
    </div>
  )
}
