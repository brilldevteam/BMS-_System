import { Link } from 'react-router-dom';
import AppIcon from '../icons/AppIcon.jsx';

function EmptyJobsState({ hasFilters }) {
  return (
    <section className="rounded-xl bg-white px-6 py-16 text-center shadow-md shadow-slate-200/80">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <AppIcon name="briefcase" className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-lg font-semibold text-slate-950">
        {hasFilters ? 'No matching jobs found' : 'No jobs created yet'}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm font-normal leading-6 text-slate-500">
        {hasFilters
          ? 'Try adjusting the search, status, or sorting options to find the job you need.'
          : 'Create your first job assignment and it will appear here for tracking and review.'}
      </p>
      {!hasFilters ? (
        <Link
          className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition hover:-translate-y-0.5"
          to="/dashboard/create-job"
        >
          <AppIcon name="plusSquare" className="h-4 w-4" />
          Create Job
        </Link>
      ) : null}
    </section>
  );
}

export default EmptyJobsState;
