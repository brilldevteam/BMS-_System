import { ArrowLeft, Bell, Home, UsersRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function StaffDirectoryTopBar({ roleTitle = 'admin' }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1290px] items-center justify-between gap-4 px-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/compliance-management/staff')}
          className="inline-flex h-8 items-center gap-2 rounded-md bg-slate-100 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Roles
        </button>

        <Link
          to="/compliance-management/staff"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
          aria-label={`${roleTitle} Staff`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-500/25">
            <UsersRound className="h-4.5 w-4.5" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-slate-950">
              {roleTitle} Staff
            </span>
            <span className="block text-[10px] font-medium text-slate-500">
              Staff Document Management
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <Link
            to="/dashboard"
            className="hidden items-center gap-2 text-xs font-semibold text-slate-700 transition hover:text-emerald-700 sm:inline-flex"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}

export default StaffDirectoryTopBar;
