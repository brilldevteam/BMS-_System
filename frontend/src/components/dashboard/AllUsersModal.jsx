import { CalendarDays, UsersRound, X } from 'lucide-react';

function formatJoinedDate(value) {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(new Date(value));
}

function AllUsersModal({ users, isLoading, error, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6">
      <section className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-6 text-white">
          <div>
            <h2 className="text-2xl font-semibold">All Users</h2>
            <p className="mt-1 text-sm text-blue-100">System registered users</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-white/15"
            aria-label="Close all users"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto bg-white p-6">
          {isLoading ? (
            <p className="py-16 text-center text-sm font-medium text-slate-500">
              Loading team members...
            </p>
          ) : null}

          {error ? (
            <p className="rounded-xl bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
              {error}
            </p>
          ) : null}

          {!isLoading && !error && users.length === 0 ? (
            <p className="py-16 text-center text-sm font-medium text-slate-500">
              No users found.
            </p>
          ) : null}

          {!isLoading && !error
            ? users.map((user) => (
                <article
                  key={user.id}
                  className="flex flex-col gap-4 rounded-xl bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {user.fullName || user.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <UsersRound className="h-4 w-4" />
                        Role: {user.role || 'Unassigned'}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        Joined: {formatJoinedDate(user.createdAt)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`w-fit rounded-full px-4 py-1.5 text-xs font-semibold ${
                      user.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {user.status || 'Active'}
                  </span>
                </article>
              ))
            : null}
        </div>

        <footer className="flex items-center justify-between border-t border-slate-200 bg-white px-7 py-4">
          <p className="text-sm text-slate-500">Total: {users.length} users</p>
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}

export default AllUsersModal;
