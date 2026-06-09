function EmptyState({ onUpload }) {
  return (
    <section className="rounded-xl bg-white px-6 py-16 text-center shadow-md shadow-slate-200/80">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3H14L18 7V21H7Z" />
          <path d="M14 3V8H18" />
        </svg>
      </div>
      <h2 className="mt-6 text-sm font-semibold text-slate-950">
        No documents found
      </h2>
      <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-slate-500">
        Get started by uploading your first financial statements.
      </p>
      <button
        className="mt-7 inline-flex h-10 items-center justify-center rounded-md bg-violet-600 px-5 text-xs font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
        type="button"
        onClick={onUpload}
      >
        Upload Documents
      </button>
    </section>
  );
}

export default EmptyState;
