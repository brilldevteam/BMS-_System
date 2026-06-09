import AppIcon from '../icons/AppIcon.jsx';

function formatDate(value) {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(new Date(value));
}

function statusClass(status = 'Created') {
  const normalized = status.toLowerCase();

  if (normalized === 'approved') {
    return 'bg-emerald-50 text-emerald-700';
  }

  if (normalized === 'cancelled') {
    return 'bg-slate-100 text-slate-700';
  }

  return 'bg-blue-50 text-blue-700';
}

const actionButtons = [
  { label: 'View job', icon: 'eye', color: 'text-slate-500 hover:bg-slate-100 hover:text-slate-800' },
  { label: 'Edit job', icon: 'edit', color: 'text-blue-600 hover:bg-blue-50 hover:text-blue-700' },
  { label: 'Assign user', icon: 'userCircle', color: 'text-violet-600 hover:bg-violet-50 hover:text-violet-700' },
  { label: 'Cancel job', icon: 'blocked', color: 'text-slate-600 hover:bg-slate-100 hover:text-slate-800' }
];

function JobsTable({ jobs, onDeleteJob }) {
  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-md shadow-slate-200/80">
      <div className="overflow-x-auto">
        <table className="min-w-[1240px] w-full border-collapse text-left">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
              <th className="px-6 py-4">Job Details</th>
              <th className="px-6 py-4">Service Type</th>
              <th className="px-6 py-4">Assigned To</th>
              <th className="px-6 py-4">Client Info</th>
              <th className="px-6 py-4">Documents</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {jobs.map((job) => {
              const documentsCount =
                (job.documents?.proposalDocument ? 1 : 0) +
                (job.documents?.idDocument ? 1 : 0) +
                (job.documents?.otherDocuments?.length || 0);

              return (
                <tr key={job.id} className="align-top transition hover:bg-blue-50/30">
                  <td className="px-6 py-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      <span>#</span>
                      {job.jobNumber}
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-950">{job.jobNumber}</p>
                    <p className="mt-1 max-w-[220px] truncate text-xs font-normal text-slate-500">
                      ID: {job.id}
                    </p>
                    <p className="mt-1 text-xs font-normal text-slate-400">
                      {job.startingPoint || 'No starting point'}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="max-w-[260px] text-sm font-normal leading-6 text-slate-950">
                      {job.serviceType}
                    </p>
                    {job.jobDetails ? (
                      <p className="mt-1 max-w-[260px] truncate text-xs font-normal text-slate-500">
                        {job.jobDetails}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-950">
                      {job.assignedPerson || 'Unassigned'}
                    </p>
                    <p className="mt-1 text-xs font-normal text-blue-600">Assigned user</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="max-w-[180px] truncate text-sm font-medium text-slate-950">
                      {job.clientName}
                    </p>
                    <p className="mt-1 max-w-[180px] truncate text-xs font-normal text-slate-500">
                      {job.email}
                    </p>
                    {job.ckNumber ? (
                      <p className="mt-1 text-xs font-normal text-slate-400">CK: {job.ckNumber}</p>
                    ) : null}
                  </td>
                  <td className="px-6 py-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      <AppIcon name="report" className="h-4 w-4" />
                      {documentsCount} files
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClass(job.status)}`}>
                      {job.status || 'Created'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-normal text-slate-600">
                      <AppIcon name="calendar" className="h-4 w-4 text-slate-400" />
                      {formatDate(job.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      {actionButtons.map((action) => (
                        <button
                          key={action.label}
                          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${action.color}`}
                          type="button"
                          title={action.label}
                          aria-label={action.label}
                        >
                          <AppIcon name={action.icon} className="h-4 w-4" />
                        </button>
                      ))}
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
                        type="button"
                        title="Delete job"
                        aria-label="Delete job"
                        onClick={() => onDeleteJob(job)}
                      >
                        <AppIcon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default JobsTable;
