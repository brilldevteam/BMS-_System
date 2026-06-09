import FileUploadBox from './FileUploadBox.jsx';
import SectionShell from './SectionShell.jsx';

function DocumentsSection({ documents, fileErrors, onFileChange }) {
  return (
    <SectionShell
      title={
        <span>
          Documents
          <span className="ml-1 text-[11px] font-normal text-slate-500">
            (All documents are optional)
          </span>
        </span>
      }
      icon={
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3H14L18 7V21H7Z" />
          <path d="M14 3V8H18" />
        </svg>
      }
    >
      <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-700">
        Both proposal and ID documents are optional. You can upload either supporting documents if needed. Larger images will be automatically compressed.
      </div>

      <div className="space-y-4">
        <FileUploadBox
          label="Proposal Document"
          optional
          files={documents.proposalDocument}
          onChange={(files) => onFileChange('proposalDocument', files)}
        />
        <FileUploadBox
          label="ID Document"
          optional
          files={documents.idDocument}
          onChange={(files) => onFileChange('idDocument', files)}
        />
        <FileUploadBox
          label="Other Documents"
          optional
          multiple
          files={documents.otherDocuments}
          onChange={(files) => onFileChange('otherDocuments', files)}
        />
      </div>

      {fileErrors ? <p className="mt-3 text-xs font-medium text-rose-600">{fileErrors}</p> : null}
    </SectionShell>
  );
}

export default DocumentsSection;
