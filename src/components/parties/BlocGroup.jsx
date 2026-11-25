import PartyCard from './PartyCard'

export default function BlocGroup({ label, parties, data, onOpen }) {
  const seats = parties.reduce((s, p) => s + p.seats, 0)
  return (
    <section aria-label={label}>
      <h2 className="mb-2 text-meta font-semibold text-muted">
        {label}, <span className="tabular">{seats}</span> seats
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {parties.map((p) => (
          <PartyCard key={p.id} party={p} data={data} onOpen={onOpen} />
        ))}
      </ul>
    </section>
  )
}
