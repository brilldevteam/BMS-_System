import AppIcon from '../icons/AppIcon.jsx';

function JobsFilters({ filters, onChange }) {
  const updateFilter = (event) => {
    onChange({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  return (
    <section className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_160px_160px]">
        <label className="relative block">
          <AppIcon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            name="search"
            placeholder="Search by Job Number, Job ID, Client, Service Type, Email..."
            value={filters.search}
            onChange={updateFilter}
          />
        </label>

        <select
          className="h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm font-normal outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          name="status"
          value={filters.status}
          onChange={updateFilter}
        >
          <option value="all">All Jobs</option>
          <option value="created">Created</option>
          <option value="approved">Approved</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          className="h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm font-normal outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          name="sort"
          value={filters.sort}
          onChange={updateFilter}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="client">Client Name</option>
          <option value="service">Service Type</option>
        </select>
      </div>
    </section>
  );
}

export default JobsFilters;
