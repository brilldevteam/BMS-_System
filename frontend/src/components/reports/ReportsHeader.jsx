import AppIcon from '../icons/AppIcon.jsx';

function ReportsHeader({ onAddDocuments }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-md shadow-slate-200/80 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 3H14L18 7V21H7Z" />
              <path d="M14 3V8H18" />
              <path d="M10 13H15" />
              <path d="M10 17H14" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-normal text-slate-950">
              Financial Statements
            </h1>
            <p className="mt-1 text-sm font-normal leading-6 text-slate-600">
              Upload and manage annual financial statement documents. Maximum 3
              documents per year.
            </p>
          </div>
        </div>

        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
          type="button"
          onClick={onAddDocuments}
        >
          <AppIcon name="upload" className="h-4 w-4" />
          Add Documents
        </button>
      </div>
    </section>
  );
}

export default ReportsHeader;
