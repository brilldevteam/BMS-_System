import mockCompanies from '../../data/mockCompanies.js';

function ReportsFilters({ filters, onChange, onClear }) {
  const updateFilter = (event) => {
    onChange({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  return (
    <section className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-slate-600" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5H20L13 13V19L11 20V13Z" />
          </svg>
          <h2 className="text-sm font-medium text-slate-950">Filters & Search</h2>
        </div>
        <button
          className="text-xs font-medium text-violet-700 transition hover:text-violet-900"
          type="button"
          onClick={onClear}
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="block xl:col-span-2">
          <span className="mb-2 block text-xs font-normal text-slate-900">Search</span>
          <input
            className="filter-select"
            name="search"
            placeholder="Search companies, descriptions..."
            value={filters.search}
            onChange={updateFilter}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-normal text-slate-900">Company</span>
          <select className="filter-select" name="company" value={filters.company} onChange={updateFilter}>
            <option value="">All Companies</option>
            {mockCompanies.map((company) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-normal text-slate-900">Year</span>
          <select className="filter-select" name="year" value={filters.year} onChange={updateFilter}>
            <option value="">All Years</option>
            {['2026', '2025', '2024', '2023', '2022'].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-normal text-slate-900">File Type</span>
          <select className="filter-select" name="fileType" value={filters.fileType} onChange={updateFilter}>
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="doc">DOC / DOCX</option>
            <option value="xls">XLS / XLSX</option>
            <option value="image">JPG / PNG</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-normal text-slate-900">Sort By</span>
          <select className="filter-select" name="sort" value={filters.sort} onChange={updateFilter}>
            <option value="newest">Last Updated</option>
            <option value="oldest">Oldest first</option>
            <option value="company">Company name</option>
            <option value="year">Year</option>
          </select>
        </label>

        <label className="block xl:col-span-2">
          <span className="mb-2 block text-xs font-normal text-slate-900">From Date</span>
          <input className="filter-select" name="fromDate" type="date" value={filters.fromDate} onChange={updateFilter} />
        </label>

        <label className="block xl:col-span-2">
          <span className="mb-2 block text-xs font-normal text-slate-900">To Date</span>
          <input className="filter-select" name="toDate" type="date" value={filters.toDate} onChange={updateFilter} />
        </label>
      </div>
    </section>
  );
}

export default ReportsFilters;
