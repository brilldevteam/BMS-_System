import { ArrowLeft, Grid2X2, Home, LogOut, Shield, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function ComplianceTopBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/mode-selection')}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-100 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-violet-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="hidden h-7 w-px bg-slate-200 sm:block" />
          <Link
            to="/mode-selection"
            className="hidden items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-violet-700 md:inline-flex"
          >
            <Grid2X2 className="h-4 w-4" />
            Mode Selection
          </Link>
        </div>

        <Link
          to="/compliance-management"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
          aria-label="Compliance Hub"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-300/50">
            <Shield className="h-5 w-5" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-base font-bold text-slate-950">
              Compliance Hub
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              Management System
            </span>
          </span>
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-3">
          <Link
            to="/dashboard"
            className="hidden items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-violet-700 lg:inline-flex"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="hidden items-center gap-2 text-sm font-medium text-slate-800 sm:flex">
            <UserCircle className="h-5 w-5 text-slate-500" />
            IT Team
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default ComplianceTopBar;
