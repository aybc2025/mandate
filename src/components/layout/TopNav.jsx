import { NavLink, Link } from 'react-router-dom'
import { ROUTES } from '../../routes'

// Desktop/tablet navigation (≥768px). The phone uses TabBar.
export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 hidden border-b border-line bg-bg md:block">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-8">
        <Link to="/" className="font-display text-heading font-bold">
          Mandate
        </Link>
        <nav aria-label="Main" className="flex gap-1">
          {ROUTES.map((r) => (
            <NavLink
              key={r.path}
              to={r.path}
              end={r.path === '/'}
              className={({ isActive }) =>
                `flex min-h-14 items-center border-b-2 px-3 text-meta font-semibold ${
                  isActive ? 'border-accent text-accent' : 'border-transparent text-ink hover:text-accent'
                }`
              }
            >
              {r.longLabel ?? r.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
