import { useOutletContext } from 'react-router-dom'
import { usePartySheet } from '../hooks/usePartySheet'
import { BLOCS } from '../constants'
import BlocGroup from '../components/parties/BlocGroup'
import PartySheet from '../components/parties/PartySheet'

export default function PartiesPage() {
  const data = useOutletContext()
  const { party, open, close } = usePartySheet(data.partyById)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <h1 className="font-display text-title font-bold">Parties &amp; leaders</h1>
      <p className="mt-1 text-muted">
        {data.parties.length} lists won seats in the 26th Knesset. Tap one for its leader and latest position.
      </p>
      <div className="mt-6 grid gap-8">
        {BLOCS.map((b) => (
          <BlocGroup
            key={b.id}
            label={b.label}
            parties={data.parties.filter((p) => p.bloc === b.id).sort((x, y) => y.seats - x.seats)}
            data={data}
            onOpen={open}
          />
        ))}
      </div>
      <PartySheet party={party} timeline={data.timeline} onClose={close} />
    </div>
  )
}
