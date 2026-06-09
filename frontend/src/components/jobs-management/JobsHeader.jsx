import { Link } from 'react-router-dom';
import AppIcon from '../icons/AppIcon.jsx';

function JobsHeader({ jobs, onExport }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <AppIcon name="briefcase" className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-normal text-blue-700 sm:text-3xl">
              Admin - Job Management
            </h1>
            <p className="mt-1 text-sm font-normal text-slate-600">
              Manage and monitor all job submissions across the platform
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm shadow-slate-200/70 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
          to="/dashboard/create-job"
        >
          <AppIcon name="plusSquare" className="h-4 w-4" />
          Create Job
        </Link>
        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={onExport}
          disabled={jobs.length === 0}
        >
          <AppIcon name="download" className="h-4 w-4" />
          Export Data
        </button>
      </div>
    </div>
  );
}

export default JobsHeader;
