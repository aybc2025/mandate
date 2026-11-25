import { inkOn } from '../../lib/format'

// Initials in party colour. Leader photos are deliberately not used (see CLAUDE.md).
export default function PartyAvatar({ party, size = 'size-11' }) {
  return (
    <span
      aria-hidden="true"
      className={`grid ${size} flex-none place-items-center rounded-full font-display text-meta font-bold`}
      style={{ background: party.color, color: inkOn(party.color) }}
    >
      {party.leader.initials}
    </span>
  )
}
