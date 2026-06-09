import { FolderOpen } from 'lucide-react';
import DocumentSectionCard from './DocumentSectionCard.jsx';

function StaffDocumentsExpanded({ staff }) {
  return (
    <div className="bg-slate-50 px-6 py-5">
      <div className="mb-4 flex items-center gap-2">
        <FolderOpen className="h-4 w-4 text-emerald-600" />
        <h3 className="text-sm font-bold text-slate-900">
          Document Sections for {staff.name}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {staff.documentSections.map((section) => (
          <DocumentSectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

export default StaffDocumentsExpanded;
