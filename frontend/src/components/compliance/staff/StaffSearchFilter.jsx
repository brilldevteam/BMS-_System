import { Search } from 'lucide-react';

function StaffSearchFilter({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  roles,
  visibleCount,
  totalCount
}) {
  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search staff members..."
            className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={selectedRole}
            onChange={(event) => onRoleChange(event.target.value)}
            className="h-12 min-w-56 rounded-lg border-2 border-emerald-500 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:ring-4 focus:ring-emerald-100"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <p className="text-xs font-medium text-slate-500">
            Showing <span className="text-emerald-600">{visibleCount}</span> of{' '}
            {totalCount} staff members
          </p>
        </div>
      </div>
    </section>
  );
}

export default StaffSearchFilter;
