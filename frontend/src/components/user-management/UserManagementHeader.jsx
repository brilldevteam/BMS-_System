function UserManagementHeader() {
  return (
    <section className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-500/20">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3L19 6V11C19 15.5 16.2 18.6 12 20C7.8 18.6 5 15.5 5 11V6L12 3Z" />
            <path d="M9.5 11.5L11.25 13.25L15 9.5" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-slate-950">
            User Management
          </h1>
          <p className="mt-1 text-sm font-normal text-slate-600">
            Manage user roles and permissions for your organization
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span>22 Users</span>
        <span>13 Roles</span>
      </div>
    </section>
  );
}

export default UserManagementHeader;
