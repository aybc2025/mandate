export default function ExplainerBlock({ title, body }) {
  return (
    <article>
      <h3 className="font-display text-heading font-bold">{title}</h3>
      <p className="mt-1 max-w-prose">{body}</p>
    </article>
  )
}
