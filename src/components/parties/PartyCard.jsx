import PartyAvatar from './PartyAvatar'
import { dealStatus } from '../../lib/deals'

// Short status tag derived from data: who holds the mandate / has signed / has agreed to sign.
const tagFor = (party, data) => {
  if (data.mandate.partyId === party.id) return 'holds the mandate'
  const deal = dealStatus(party.id, data)
  if (deal === 'signed') return 'signed'
  if (deal === 'agreed') return 'agreed to sign'
  return null
}

export default function PartyCard({ party, data, onOpen }) {
  const tag = tagFor(party, data)
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(party.id)}
        className="press grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-card border border-line bg-panel p-3 text-start hover:border-accent"
      >
        <PartyAvatar party={party} />
        <span>
          <span className="block font-bold">{party.name}</span>
          <span className="block text-label text-muted">
            {party.leader.name}
            {tag && <> · {tag}</>}
          </span>
        </span>
        <span className="tabular font-display text-title font-black">{party.seats}</span>
      </button>
    </li>
  )
}
