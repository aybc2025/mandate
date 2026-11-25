import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../routes'
import NavIcon from './NavIcon'

// Phone navigation. No animation: tab switches happen dozens of times a session.
export default function TabBar() {
  return (
    <nav aria-label="Main" className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-panel md:hidden">
      <ul className="grid grid-cols-5">
        {ROUTES.map((r) => (
          <li key={r.path}>
            <NavLink
              to={r.path}
              end={r.path === '/'}
              className={({ isActive }) =>
                `flex min-h-16 flex-col items-center justify-center gap-0.5 text-label font-semibold ${
                  isActive ? 'text-accent' : 'text-muted'
                }`
              }
            >
              <NavIcon name={r.icon} />
              {r.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
