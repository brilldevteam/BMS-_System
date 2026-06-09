import FieldLabel from '../common/FieldLabel.jsx';

const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png'];
const maxFileSize = 50 * 1024 * 1024;

function validateFiles(incomingFiles, existingCount) {
  const errors = [];
  const files = [];

  if (existingCount + incomingFiles.length > 3) {
    errors.push('You can upload a maximum of 3 files.');
  }

  incomingFiles.forEach((file) => {
    const extension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      errors.push(`${file.name} is not an allowed file type.`);
      return;
    }

    if (file.size > maxFileSize) {
      errors.push(`${file.name} is larger than 50MB.`);
      return;
    }

    files.push(file);
  });

  return { files: errors.length > 0 ? [] : files, errors };
}

function FileUploadZone({ files, onFilesChange, error }) {
  const handleFiles = (fileList) => {
    const incomingFiles = Array.from(fileList);
    const result = validateFiles(incomingFiles, files.length);

    if (result.errors.length > 0) {
      onFilesChange(files, result.errors.join(' '));
      return;
    }

    onFilesChange([...files, ...result.files], '');
  };

  const removeFile = (fileName) => {
    onFilesChange(files.filter((file) => file.name !== fileName), '');
  };

  return (
    <div>
      <FieldLabel required>
        Documents
        <span className="ml-1 text-[11px] font-normal text-slate-500">
          (Max 3 files)
        </span>
      </FieldLabel>
      <label
        className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center transition hover:border-violet-300 hover:bg-violet-50/40"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
      >
        <input
          className="sr-only"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          onChange={(event) => handleFiles(event.target.files)}
        />
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4" />
            <path d="M7 9L12 4L17 9" />
            <path d="M5 20H19" />
          </svg>
        </span>
        <span className="mt-4 text-sm font-medium text-slate-900">
          Drag files here or click to browse
        </span>
        <span className="mt-2 text-xs font-normal text-slate-500">
          PDF, DOC, DOCX, XLS, XLSX, JPG, PNG files only. Max 50MB each.
        </span>
      </label>

      {error ? <p className="mt-3 text-xs font-medium text-rose-600">{error}</p> : null}

      {files.length > 0 ? (
        <div className="mt-4 space-y-3">
          {files.map((file) => (
            <div key={file.name} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
                <p className="text-xs font-normal text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                className="rounded-md px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                type="button"
                onClick={() => removeFile(file.name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FileUploadZone;
