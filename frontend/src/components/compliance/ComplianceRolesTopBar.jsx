import { ArrowLeft, Bell, Home, UsersRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function ComplianceRolesTopBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1290px] items-center justify-between gap-4 px-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/compliance-management')}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-100 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <Link
          to="/compliance-management/staff"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
          aria-label="Compliance Roles"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/25">
            <UsersRound className="h-5 w-5" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-base font-bold text-slate-950">
              Compliance Roles
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              Select Role to View Staff
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-7">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <Link
            to="/dashboard"
            className="hidden items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-emerald-700 sm:inline-flex"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}

export default ComplianceRolesTopBar;
