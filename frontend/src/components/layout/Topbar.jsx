import { Link } from 'react-router-dom';

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M21 21L16.65 16.65" />
      <circle cx="11" cy="11" r="7" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M18 8A6 6 0 0 0 6 8C6 15 3 16 3 16H21S18 15 18 8" />
      <path d="M13.73 21A2 2 0 0 1 10.27 21" />
    </svg>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-slate-50/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="relative block max-w-2xl flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-12 pr-4 text-sm font-normal text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            placeholder="Search jobs, clients, reports..."
            type="search"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/mode-selection"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
          >
            Modes
          </Link>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-slate-950"
            type="button"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <div className="flex h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-medium text-white">
              NB
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-5 text-slate-900">
                Newoon Admin
              </p>
              <p className="text-xs font-normal text-slate-400">Admin User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
