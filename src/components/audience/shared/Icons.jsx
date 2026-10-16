export const IC = {
  pay: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M3 10.5h18M7 15h3" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </>
  ),
  tool: <path d="M14.5 6.5a4 4 0 005 5L10 21a2.1 2.1 0 01-3-3z" />,
  chat: <path d="M4 5h16v11H10l-5 4v-4H4z" />,
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 0112 0v5l1.5 2h-15z" />
      <path d="M10 21h4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  phone: <path d="M6 3h4l1.5 4.5-2 1.5a11 11 0 006 6l1.5-2L21 14.5V18a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" />,
  building: (
    <>
      <path d="M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M2 21h20" />
      <path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2M11 21v-3h2v3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5L12 3l9 7.5M5 9v12h14V9M9 21v-7h6v7" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export function Ic({ n }) {
  return (
    <svg
      className="ic"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {IC[n]}
    </svg>
  );
}

export default Ic;
