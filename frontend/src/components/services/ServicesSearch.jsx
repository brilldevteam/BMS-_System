function ServicesSearch({ searchValue, onSearchChange }) {
  return (
    <section className="mb-5 rounded-xl bg-white p-4 shadow-md shadow-slate-200/80">
      <label className="relative block">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 21L16.65 16.65" />
            <circle cx="11" cy="11" r="7" />
          </svg>
        </span>
        <input
          className="h-11 w-full rounded-md border border-slate-300 bg-white pl-11 pr-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          placeholder="Search services by name or description..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
    </section>
  );
}

export default ServicesSearch;
