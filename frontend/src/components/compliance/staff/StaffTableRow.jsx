import { Eye, EyeOff, FilePlus2, ShieldCheck } from 'lucide-react';
import StaffStatusBadge from './StaffStatusBadge.jsx';

function StaffTableRow({ staff, isExpanded, onToggleView, onAddClick }) {
  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50/70">
      <td className="min-w-[280px] px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate text-sm font-bold text-slate-950">
                {staff.name}
              </span>
              {staff.level ? (
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">
                  {staff.level}
                </span>
              ) : null}
            </span>
            <span className="block truncate text-xs font-medium text-slate-500">
              {staff.email}
            </span>
            <span className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {staff.department}
            </span>
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex rounded-md border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">
          {staff.role}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-100 px-2 text-xs font-bold text-blue-700">
          {staff.documentSections.length}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-purple-100 px-2 text-xs font-bold text-purple-700">
          {staff.documentSections.reduce(
            (total, section) => total + section.documents.length,
            0
          )}
        </span>
      </td>
      <td className="px-6 py-4">
        <StaffStatusBadge status={staff.status} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAddClick(staff)}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-emerald-100 px-3 text-xs font-bold text-emerald-700 transition hover:bg-emerald-200"
          >
            <FilePlus2 className="h-3.5 w-3.5" />
            Add
          </button>
          <button
            type="button"
            onClick={() => onToggleView(staff.id)}
            className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-bold transition ${
              isExpanded
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {isExpanded ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
            {isExpanded ? 'Hide' : 'View'}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StaffTableRow;
