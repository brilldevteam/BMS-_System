function ServicesHeader({ onAddService }) {
  return (
    <section className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-500/20">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7H20" />
            <path d="M6 3H18V21H6Z" />
            <path d="M9 11H15" />
            <path d="M9 15H14" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-slate-950">
            Services Management
          </h1>
          <p className="mt-1 text-sm font-normal text-slate-600">
            Manage and organize your service offerings
          </p>
        </div>
      </div>

      <button
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5"
        type="button"
        onClick={onAddService}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5V19" />
          <path d="M5 12H19" />
        </svg>
        Add New Service
      </button>
    </section>
  );
}

export default ServicesHeader;
