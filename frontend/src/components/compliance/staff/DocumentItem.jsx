import { Edit3, Eye, FileText, Trash2 } from 'lucide-react';

function DocumentItem({ document }) {
  return (
    <div className="rounded-lg border border-white/80 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-slate-800">
              {document.fileName}
            </p>
            <p className="mt-1 text-[11px] font-medium text-slate-500">
              {document.category}
            </p>
            <p className="mt-1 text-[10px] font-medium text-slate-400">
              {document.date} <span className="px-1">.</span>
              {document.uploadedBy} <span className="px-1">.</span>
              {document.size}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="text-blue-500 transition hover:text-blue-700" aria-label="View document">
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button type="button" className="text-emerald-500 transition hover:text-emerald-700" aria-label="Edit document">
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button type="button" className="text-red-400 transition hover:text-red-600" aria-label="Delete document">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentItem;
