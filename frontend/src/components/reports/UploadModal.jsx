import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppIcon from '../icons/AppIcon.jsx';
import FieldLabel from '../common/FieldLabel.jsx';
import mockCompanies from '../../data/mockCompanies.js';
import FileUploadZone from './FileUploadZone.jsx';

function UploadModal({ isOpen, isUploading, onClose, onUpload }) {
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      company: '',
      year: new Date().getFullYear(),
      description: ''
    }
  });

  if (!isOpen) {
    return null;
  }

  const closeModal = () => {
    reset();
    setFiles([]);
    setFileError('');
    onClose();
  };

  const submitForm = async (values) => {
    if (files.length === 0) {
      setFileError('Please add at least one file.');
      return;
    }

    await onUpload(values, files);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6">
      <div className="max-h-[92vh] w-full max-w-[640px] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl shadow-slate-950/20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4" />
                <path d="M7 9L12 4L17 9" />
                <path d="M5 20H19" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-slate-900">
              Upload Financial Statements
            </h2>
          </div>
          <button
            className="rounded-md px-2 py-1 text-lg font-normal text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            type="button"
            onClick={closeModal}
            aria-label="Close upload modal"
          >
            <AppIcon name="close" className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <FieldLabel required>Company</FieldLabel>
              <select
                className="form-field mt-2"
                {...register('company', { required: 'Company is required' })}
              >
                <option value="">Select company</option>
                {mockCompanies.map((company) => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
              {errors.company ? <span className="form-error">{errors.company.message}</span> : null}
            </label>

            <label className="block">
              <FieldLabel required>Year</FieldLabel>
              <input
                className="form-field mt-2"
                type="number"
                min="2000"
                max="2100"
                {...register('year', { required: 'Year is required' })}
              />
              {errors.year ? <span className="form-error">{errors.year.message}</span> : null}
            </label>
          </div>

          <label className="block">
            <FieldLabel required>Description</FieldLabel>
            <textarea
              className="form-field mt-2 min-h-28 resize-none"
              placeholder="Add a short description"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description ? <span className="form-error">{errors.description.message}</span> : null}
          </label>

          <FileUploadZone
            files={files}
            error={fileError}
            onFilesChange={(nextFiles, nextError) => {
              setFiles(nextFiles);
              setFileError(nextError);
            }}
          />

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              className="h-10 rounded-md bg-slate-100 px-5 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="h-10 rounded-md bg-violet-600 px-5 text-xs font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Documents'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
