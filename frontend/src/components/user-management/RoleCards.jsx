function RoleCards({ roles, onDeleteRole }) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-950">Roles</h2>
        <p className="mt-1 text-xs font-normal text-slate-500">
          A list of all roles and their permissions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <article
            key={role.id}
            className="rounded-xl bg-white p-4 shadow-md shadow-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3L19 6V11C19 15.5 16.2 18.6 12 20C7.8 18.6 5 15.5 5 11V6L12 3Z" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-sm font-medium text-slate-950">{role.name}</h3>
                  <p className="mt-2 text-xs text-slate-500">Users: {role.userCount || 0}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Permissions: {role.permissions?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  className="rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-violet-700"
                  type="button"
                  aria-label={`Edit ${role.name}`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20H21" />
                    <path d="M16.5 3.5A2.1 2.1 0 0 1 19.5 6.5L7 19L3 20L4 16Z" />
                  </svg>
                </button>
                <button
                  className="rounded-md p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  type="button"
                  aria-label={`Delete ${role.name}`}
                  onClick={() => onDeleteRole(role.id)}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6H21" />
                    <path d="M8 6V4H16V6" />
                    <path d="M6 6L7 21H17L18 6" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RoleCards;
