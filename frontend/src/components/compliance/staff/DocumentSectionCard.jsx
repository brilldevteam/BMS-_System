import {
  ChevronUp,
  FileText,
  FolderOpen,
  GraduationCap,
  IdCard,
  MonitorCheck,
  Upload,
  UserRoundCheck
} from 'lucide-react';
import { useState } from 'react';
import DocumentItem from './DocumentItem.jsx';

const sectionStyles = {
  'kyc-sheet': {
    card: 'bg-blue-50 border-blue-100',
    icon: 'bg-blue-600 text-white',
    empty: 'text-blue-300',
    iconComponent: IdCard
  },
  'screening-records': {
    card: 'bg-emerald-50 border-emerald-100',
    icon: 'bg-emerald-600 text-white',
    empty: 'text-emerald-300',
    iconComponent: UserRoundCheck
  },
  'ongoing-monitoring': {
    card: 'bg-purple-50 border-purple-100',
    icon: 'bg-purple-600 text-white',
    empty: 'text-purple-300',
    iconComponent: MonitorCheck
  },
  'educational-certificates': {
    card: 'bg-cyan-50 border-cyan-100',
    icon: 'bg-cyan-600 text-white',
    empty: 'text-cyan-300',
    iconComponent: GraduationCap
  },
  'employment-documents': {
    card: 'bg-teal-50 border-teal-100',
    icon: 'bg-teal-600 text-white',
    empty: 'text-teal-300',
    iconComponent: FolderOpen
  },
  'personal-documents': {
    card: 'bg-emerald-50 border-emerald-100',
    icon: 'bg-cyan-600 text-white',
    empty: 'text-emerald-300',
    iconComponent: FileText
  },
  default: {
    card: 'bg-cyan-50 border-cyan-100',
    icon: 'bg-cyan-600 text-white',
    empty: 'text-cyan-300',
    iconComponent: FolderOpen
  }
};

function DocumentSectionCard({ section }) {
  const [isOpen, setIsOpen] = useState(true);
  const styles = sectionStyles[section.id] ?? sectionStyles.default;
  const Icon = styles.iconComponent;

  return (
    <article
      className={`rounded-xl border p-4 shadow-sm transition duration-300 ${styles.card}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
            <Icon className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">{section.title}</h3>
              {section.custom ? (
                <span className="rounded-full bg-fuchsia-100 px-2 py-0.5 text-[10px] font-bold text-fuchsia-700">
                  Custom
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-[11px] font-medium leading-5 text-slate-600">
              {section.description}
            </p>
            <p className="mt-1 text-[11px] font-semibold text-slate-500">
              {section.documents.length} documents
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <Upload className="h-3 w-3" />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
            aria-label={isOpen ? 'Collapse section' : 'Expand section'}
          >
            <ChevronUp
              className={`h-3.5 w-3.5 transition ${isOpen ? '' : 'rotate-180'}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {section.documents.length > 0 ? (
            <div className="space-y-3">
              {section.documents.map((document) => (
                <DocumentItem key={document.id} document={document} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-32 flex-col items-center justify-center rounded-lg text-center">
              <FileText className={`h-8 w-8 ${styles.empty}`} />
              <p className="mt-3 text-xs font-semibold text-slate-500">
                No documents uploaded yet
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                Click "Upload" to add documents
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default DocumentSectionCard;
