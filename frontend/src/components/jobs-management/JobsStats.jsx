import AppIcon from '../icons/AppIcon.jsx';

const cardTheme = {
  total: 'bg-blue-600 text-white shadow-blue-500/20',
  approved: 'bg-emerald-500 text-white shadow-emerald-500/20',
  cancelled: 'bg-slate-600 text-white shadow-slate-500/20'
};

function StatCard({ icon, label, value, tone }) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200">
      <div className="flex items-center gap-4">
        <span className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-md ${cardTheme[tone]}`}>
          <AppIcon name={icon} className="h-7 w-7" />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-3xl font-semibold tracking-normal text-slate-950">
            {value}
          </p>
        </div>
      </div>
    </article>
  );
}

function JobsStats({ jobs }) {
  const approved = jobs.filter((job) => job.status?.toLowerCase() === 'approved').length;
  const cancelled = jobs.filter((job) => job.status?.toLowerCase() === 'cancelled').length;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <StatCard icon="clients" label="Total Jobs" value={jobs.length} tone="total" />
      <StatCard icon="check" label="Approved" value={approved} tone="approved" />
      <StatCard icon="blocked" label="Cancelled" value={cancelled} tone="cancelled" />
    </section>
  );
}

export default JobsStats;
