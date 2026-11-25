export default function WatchList({ items }) {
  return (
    <section aria-labelledby="watch" className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h2 id="watch" className="font-display text-heading font-bold">What to watch next</h2>
        <ul className="mt-3 max-w-prose list-disc space-y-2 ps-5">
          {items.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
