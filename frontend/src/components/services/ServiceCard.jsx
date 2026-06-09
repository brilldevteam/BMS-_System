function ServiceCard({ service, onEdit, onDelete }) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950">{service.title}</h2>
          <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            service.status === 'Active'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {service.status}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="rounded-md p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-700"
            type="button"
            aria-label={`Edit ${service.title}`}
            onClick={() => onEdit(service)}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20H21" />
              <path d="M16.5 3.5A2.1 2.1 0 0 1 19.5 6.5L7 19L3 20L4 16Z" />
            </svg>
          </button>
          <button
            className="rounded-md p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
            type="button"
            aria-label={`Delete ${service.title}`}
            onClick={() => onDelete(service.id)}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6H21" />
              <path d="M8 6V4H16V6" />
              <path d="M6 6L7 21H17L18 6" />
            </svg>
          </button>
        </div>
      </div>

      <p className="mt-4 min-h-12 text-sm leading-6 text-slate-600">{service.description}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>Jobs: {service.jobAssignmentCount || 0}</span>
        <span>Usage: {service.usageCount || 0}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
          {service.category}
        </span>
        {service.departments.map((department) => (
          <span key={department} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            {department}
          </span>
        ))}
      </div>
    </article>
  );
}

export default ServiceCard;
