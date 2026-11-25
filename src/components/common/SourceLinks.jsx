const safe = (url) => {
  try {
    return new URL(url).protocol === 'https:'
  } catch {
    return false
  }
}

export default function SourceLinks({ sources }) {
  const list = sources.filter((s) => safe(s.url))
  if (!list.length) return null
  return (
    <p className="text-label text-muted">
      Sources:{' '}
      {list.map((s, i) => (
        <span key={s.url}>
          {i > 0 && ', '}
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
            {s.name}
          </a>
        </span>
      ))}
    </p>
  )
}
