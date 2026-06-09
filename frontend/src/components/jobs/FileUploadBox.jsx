import FieldLabel from '../common/FieldLabel.jsx';

function FileUploadBox({ label, optional = false, multiple = false, files, onChange }) {
  const fileList = multiple ? files || [] : files ? [files] : [];
  const uploadLabel = `${label.toLowerCase()}${optional ? ' (optional)' : ''}`;

  return (
    <label className="block">
      <FieldLabel optional={optional}>{label}</FieldLabel>
      <div className="mt-2 flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-4 py-3 text-center text-xs text-slate-500 transition hover:border-violet-300 hover:bg-violet-50/40">
        <input
          className="sr-only"
          type="file"
          multiple={multiple}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(event) => onChange(event.target.files)}
        />
        {fileList.length > 0 ? (
          <span className="text-slate-700">
            {fileList.map((file) => file.name).join(', ')}
          </span>
        ) : (
          <span>Click to upload {uploadLabel}</span>
        )}
      </div>
    </label>
  );
}

export default FileUploadBox;
