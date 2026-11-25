import SeatBar from './SeatBar'

export default function PathCard({ path, partyById, selected, onSelect }) {
  const names = path.parties.map((id) => partyById[id]?.name ?? id).join(' + ')
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(path.id)}
      className={`press block w-full rounded-card border bg-panel p-4 text-start ${
        selected ? 'border-accent ring-2 ring-accent ring-inset' : 'border-line hover:border-accent'
      }`}
    >
      <span className="flex items-baseline gap-2">
        <span className={`tabular font-display text-figure font-black ${path.reaches ? 'text-reach' : 'text-signal'}`}>
          {path.total}
        </span>
        <span className="text-body font-bold">{path.name}</span>
      </span>
      <SeatBar total={path.total} />
      {names && <span className="block text-label text-muted">{names}</span>}
      <span className="mt-1 block text-meta text-muted">{path.note}</span>
    </button>
  )
}
