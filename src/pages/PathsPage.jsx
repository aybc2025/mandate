import { useOutletContext } from 'react-router-dom'
import { useSelectedPath } from '../hooks/useSelectedPath'
import Hemicycle from '../components/hemicycle/Hemicycle'
import CoalitionBuilder from '../components/paths/CoalitionBuilder'
import PathCard from '../components/paths/PathCard'

export default function PathsPage() {
  const data = useOutletContext()
  const { paths, selected, select, custom, toggleParty, clearCustom, startFrom } = useSelectedPath(data)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <h1 className="font-display text-title font-bold">Paths to 61</h1>
      <p className="mt-1 text-muted">Tap a combination to light up its seats, or build your own below.</p>
      <div className="mt-5 grid gap-6 md:grid-cols-2 md:items-start">
        <div className="sticky top-0 z-10 -mx-4 border-b border-line bg-bg px-4 pb-3 pt-2 md:top-20 md:mx-0 md:rounded-card md:border md:p-4">
          <Hemicycle
            partyById={data.partyById}
            highlight={selected.parties}
            total={selected.total}
            caption={selected.name}
            legend="active"
          />
        </div>
        <ul className="grid gap-3">
          {paths.map((p) => (
            <li key={p.id}>
              <PathCard path={p} partyById={data.partyById} selected={p.id === selected.id} onSelect={select} />
            </li>
          ))}
          <li>
            <CoalitionBuilder
              partyById={data.partyById}
              custom={custom}
              active={selected.id === custom.id}
              base={selected.id === custom.id ? null : selected}
              onToggle={toggleParty}
              onClear={clearCustom}
              onStartFrom={startFrom}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
