function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium'
  }).format(new Date(date));
}

function ReportsTable({ reports, onDelete }) {
  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-md shadow-slate-200/80">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Uploaded Reports</h2>
        <p className="mt-1 text-sm font-normal text-slate-500">
          Financial statement records stored in PostgreSQL.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              {['Company', 'Year', 'Description', 'Files', 'Upload Date', ''].map((heading) => (
                <th key={heading} className="px-5 py-4 text-left text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr key={report.id} className="transition hover:bg-purple-50/40">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">{report.company}</td>
                <td className="px-5 py-4 text-sm font-normal text-slate-600">{report.year}</td>
                <td className="max-w-sm px-5 py-4 text-sm text-slate-600">{report.description || 'No description'}</td>
                <td className="px-5 py-4 text-sm font-medium text-violet-700">{report.files.length}</td>
                <td className="px-5 py-4 text-sm font-normal text-slate-600">{formatDate(report.uploadedAt)}</td>
                <td className="px-5 py-4 text-right">
                  <button
                    className="rounded-md border border-rose-100 px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                    type="button"
                    onClick={() => onDelete(report.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ReportsTable;
