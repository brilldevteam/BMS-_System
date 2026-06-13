import {
  Download,
  Filter,
  Search,
  Sparkles,
  UsersRound
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

function MyRoleClients() {
  return (
    <DashboardLayout>
      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 px-7 py-8 text-white shadow-lg shadow-violet-200/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/10">
              <UsersRound className="h-8 w-8" />
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">My Role Clients</h1>
              <p className="mt-2 text-sm text-violet-100">
                Clients related to your role: <strong className="text-white">admin</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex h-14 items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5">
              <Sparkles className="h-5 w-5 text-amber-200" />
              <span className="text-2xl font-semibold">0</span>
              <span className="text-sm text-violet-100">clients</span>
            </div>
            <button
              type="button"
              disabled
              className="inline-flex h-14 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 text-sm font-semibold text-white/45"
            >
              <Download className="h-5 w-5" />
              Export
            </button>
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70">
          <div className="flex flex-col gap-4 lg:flex-row">
            <label className="relative block flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search by name, email, or location..."
                className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Filter clients"
              >
                <Filter className="h-5 w-5" />
              </button>
              <select
                className="h-14 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                defaultValue="latest"
                aria-label="Sort clients"
              >
                <option value="latest">Latest Activity</option>
                <option value="name">Client Name</option>
                <option value="oldest">Oldest Activity</option>
              </select>
            </div>
          </div>
        </section>

        <section className="mt-7 flex min-h-[435px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="max-w-xl">
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <UsersRound className="h-11 w-11" />
            </span>
            <h2 className="mt-7 text-2xl font-semibold text-slate-950">
              No Clients Found
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-500">
              There are no clients associated with services assigned to your role yet.
            </p>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}

export default MyRoleClients;
