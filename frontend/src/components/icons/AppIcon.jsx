const iconPaths = {
  dashboard: (
    <>
      <path d="M4 13H10V20H4Z" />
      <path d="M14 4H20V20H14Z" />
      <path d="M4 4H10V9H4Z" />
    </>
  ),
  report: (
    <>
      <path d="M7 3H14L18 7V21H7Z" />
      <path d="M14 3V8H18" />
      <path d="M10 13H15" />
      <path d="M10 17H14" />
    </>
  ),
  clients: (
    <>
      <path d="M16 19C16 16.8 14.2 15 12 15H7C4.8 15 3 16.8 3 19" />
      <circle cx="9.5" cy="8" r="4" />
      <path d="M20 18V16C20 14.6 19.2 13.4 18 12.8" />
    </>
  ),
  users: (
    <>
      <path d="M16 19C16 16.8 14.2 15 12 15H7C4.8 15 3 16.8 3 19" />
      <circle cx="9.5" cy="8" r="4" />
      <path d="M19 8V14" />
      <path d="M16 11H22" />
    </>
  ),
  job: (
    <>
      <path d="M6 7H18V20H6Z" />
      <path d="M9 7V5H15V7" />
      <path d="M9 12H15" />
      <path d="M9 16H13" />
    </>
  ),
  briefcase: (
    <>
      <path d="M4 8H20V19H4Z" />
      <path d="M9 8V6H15V8" />
      <path d="M4 13H20" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3L19 6V11C19 15.5 16.2 18.6 12 20C7.8 18.6 5 15.5 5 11V6L12 3Z" />
      <path d="M9.5 11.5L11.25 13.25L15 9.5" />
    </>
  ),
  risk: (
    <>
      <path d="M12 3L21 19H3Z" />
      <path d="M12 9V13" />
      <path d="M12 17H12.01" />
    </>
  ),
  kyc: (
    <>
      <path d="M7 4H17V20H7Z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M9 16C9.6 14.8 10.7 14 12 14C13.3 14 14.4 14.8 15 16" />
    </>
  ),
  resource: (
    <>
      <path d="M5 4H19V20H5Z" />
      <path d="M9 4V20" />
      <path d="M12 8H16" />
      <path d="M12 12H16" />
    </>
  ),
  services: (
    <>
      <path d="M4 7H20" />
      <path d="M6 3H18V21H6Z" />
      <path d="M9 12H15" />
      <path d="M9 16H13" />
    </>
  ),
  plusSquare: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M12 8V16" />
      <path d="M8 12H16" />
    </>
  ),
  activity: (
    <>
      <path d="M4 13H8L10 7L14 17L16 13H20" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="M7 9L12 4L17 9" />
      <path d="M5 20H19" />
    </>
  ),
  close: (
    <>
      <path d="M18 6L6 18" />
      <path d="M6 6L18 18" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9A2.7 2.7 0 0 1 12 7.5C13.7 7.5 15 8.6 15 10.1C15 11.7 13.7 12.5 12.6 13.1C12.1 13.4 12 13.7 12 14.3" />
      <path d="M12 17H12.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16.2 16.2" />
    </>
  ),
  download: (
    <>
      <path d="M12 4V16" />
      <path d="M7 11L12 16L17 11" />
      <path d="M5 20H19" />
    </>
  ),
  check: (
    <>
      <path d="M20 6L9 17L4 12" />
    </>
  ),
  blocked: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M7.5 7.5L16.5 16.5" />
    </>
  ),
  calendar: (
    <>
      <path d="M7 3V6" />
      <path d="M17 3V6" />
      <path d="M4 8H20" />
      <path d="M5 5H19V20H5Z" />
    </>
  ),
  eye: (
    <>
      <path d="M3 12C5.2 7.8 8.2 6 12 6C15.8 6 18.8 7.8 21 12C18.8 16.2 15.8 18 12 18C8.2 18 5.2 16.2 3 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20H8L18.5 9.5C19.3 8.7 19.3 7.4 18.5 6.6L17.4 5.5C16.6 4.7 15.3 4.7 14.5 5.5L4 16Z" />
      <path d="M13.5 6.5L17.5 10.5" />
    </>
  ),
  userCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="9" r="3" />
      <path d="M7.5 18C8.4 15.8 10 14.7 12 14.7C14 14.7 15.6 15.8 16.5 18" />
    </>
  ),
  trash: (
    <>
      <path d="M5 7H19" />
      <path d="M10 11V17" />
      <path d="M14 11V17" />
      <path d="M7 7L8 20H16L17 7" />
      <path d="M9 7V4H15V7" />
    </>
  )
};

function AppIcon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      {iconPaths[name]}
    </svg>
  );
}

export default AppIcon;
