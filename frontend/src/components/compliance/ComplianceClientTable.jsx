import { ChevronLeft, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';

const avatarTones = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-indigo-100 text-indigo-700',
  'bg-fuchsia-100 text-fuchsia-700'
];

function PaginationButton({
  children,
  active = false,
  disabled = false,
  label,
  onClick
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs font-semibold transition ${
        active
          ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200'
          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
      } disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300`}
    >
      {children}
    </button>
  );
}

function ComplianceClientTable({
  clients,
  activeFilter = 'All',
  currentPage,
  totalPages,
  totalCount,
  pageStart,
  pageEnd,
  onPageChange
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse text-left">
          <thead>
            <tr className="border-y border-slate-200 bg-slate-50/80 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              <th className="px-5 py-4">Client Code</th>
              <th className="px-5 py-4">Client Name</th>
              <th className="px-5 py-4">CR No</th>
              <th className="px-5 py-4">CDD Type</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Risk Level</th>
              <th className="px-5 py-4">Latest Review</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {clients.map((client, index) => (
              <tr
                key={client.code}
                className="bg-white text-[11px] text-slate-600 transition hover:bg-blue-50/40"
              >
                <td className="px-5 py-4 font-semibold text-slate-800">{client.code}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${avatarTones[index % avatarTones.length]}`}
                    >
                      {client.initial}
                    </span>
                    <span className="font-semibold text-slate-900">{client.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 font-medium text-slate-700">{client.crNumber}</td>
                <td className="px-5 py-4">
                  <StatusBadge value={client.cddType} />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge value={client.status} />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge value={client.riskLevel} />
                </td>
                <td className="px-5 py-4 whitespace-nowrap">{client.latestReview}</td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    className="whitespace-nowrap font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {clients.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-14 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    No {activeFilter.toLowerCase()} clients found
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    There are no matching clients in the static sample data.
                  </p>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-medium text-slate-500">
          Showing{' '}
          <span className="font-semibold text-slate-800">
            {clients.length === 0 ? 0 : `${pageStart}-${pageEnd}`}
          </span>{' '}
          of <span className="font-semibold text-slate-800">{totalCount}</span>{' '}
          clients
        </p>

        {clients.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <PaginationButton
              disabled={currentPage === 1}
              label="Previous page"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <PaginationButton
                  key={pageNumber}
                  active={currentPage === pageNumber}
                  label={`Page ${pageNumber}`}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </PaginationButton>
              )
            )}
            <PaginationButton
              disabled={currentPage === totalPages}
              label="Next page"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationButton>
            <span className="ml-1 text-xs font-medium text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        ) : null}
      </footer>
    </>
  );
}

export default ComplianceClientTable;
