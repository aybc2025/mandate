const label = (t) => (t === 'all' ? 'All events' : t[0].toUpperCase() + t.slice(1))

export default function TagFilter({ tags, active, onChange }) {
  return (
    <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
      {['all', ...tags].map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={active === t}
          onClick={() => onChange(t)}
          className={`min-h-11 rounded-full border px-4 text-meta font-semibold ${
            active === t ? 'border-flag bg-flag text-onband' : 'border-line bg-panel text-ink hover:border-accent'
          }`}
        >
          {label(t)}
        </button>
      ))}
    </div>
  )
}
