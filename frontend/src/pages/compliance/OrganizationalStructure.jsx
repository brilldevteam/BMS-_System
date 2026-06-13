import {
  ArrowLeft,
  Building2,
  FolderPlus,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyDocumentState from '../../components/compliance/EmptyDocumentState.jsx';

function OrganizationalStructure() {
  return (
    <main className="min-h-screen bg-[#fbfcfe] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid min-h-20 max-w-[1520px] grid-cols-2 items-center gap-4 px-5 py-3 sm:px-8 lg:grid-cols-3">
          <Link
            to="/compliance-management"
            className="inline-flex h-11 w-fit items-center gap-3 rounded-xl bg-slate-100 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <Link
            to="/compliance/organizational-structure"
            className="order-3 col-span-2 flex items-center justify-center gap-4 lg:order-none lg:col-span-1"
            aria-label="Organizational Structure"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-200/80">
              <Building2 className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-semibold text-slate-800 sm:text-xl">
                Organizational Structure
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-500">
                Document Management
              </span>
            </span>
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-self-end gap-3 text-sm font-medium text-slate-700 transition hover:text-orange-600"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1520px] px-5 py-10 sm:px-8 lg:py-12">
        <section className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Organizational Structure Documents
            </h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Manage your organization&apos;s structural documents
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-14 w-fit shrink-0 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-7 text-base font-semibold text-white shadow-lg shadow-orange-200/80 transition hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100"
          >
            <FolderPlus className="h-5 w-5" />
            Add New Structure
          </button>
        </section>

        <EmptyDocumentState />
      </div>
    </main>
  );
}

export default OrganizationalStructure;
