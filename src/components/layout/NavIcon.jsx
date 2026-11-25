// One 24px stroke grid for all navigation icons.
const PATHS = {
  latest: (
    <>
      <path d="M3 20h18M5 20a7 7 0 0 1 14 0" />
      <circle cx="12" cy="9" r="2" />
    </>
  ),
  paths: <path d="M4 19V5M4 19h16M8 15l4-4 3 3 5-6" />,
  timeline: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  system: <path d="M4 6h16M4 12h10M4 18h7" />,
  parties: (
    <>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16.5" cy="10" r="2.5" />
      <path d="M3 19a6 6 0 0 1 12 0M14 19a4 4 0 0 1 7 0" />
    </>
  ),
}

export default function NavIcon({ name, className = 'size-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
