import { UsersRound } from 'lucide-react';
import { Fragment } from 'react';
import StaffDocumentsExpanded from './StaffDocumentsExpanded.jsx';
import StaffTableRow from './StaffTableRow.jsx';

function StaffDirectoryTable({
  staff,
  expandedStaffId,
  onToggleView,
  onAddClick
}) {
  return (
    <section className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80">
      <div className="flex items-center justify-between gap-4 bg-slate-600 px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <UsersRound className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-bold">Compliance Staff Directory</h2>
            <p className="text-[11px] font-medium text-white/85">
              Staff Management System
            </p>
          </div>
        </div>
        <p className="text-[11px] font-bold text-white">Professional View</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1060px] border-collapse text-left">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
              <th className="px-6 py-4">Staff Member</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Sections</th>
              <th className="px-6 py-4">Documents</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) => (
              <Fragment key={staffMember.id}>
                <StaffTableRow
                  staff={staffMember}
                  isExpanded={expandedStaffId === staffMember.id}
                  onToggleView={onToggleView}
                  onAddClick={onAddClick}
                />
                {expandedStaffId === staffMember.id ? (
                  <tr>
                    <td colSpan="6" className="p-0">
                      <StaffDocumentsExpanded staff={staffMember} />
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StaffDirectoryTable;
