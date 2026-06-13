import { useEffect, useState } from 'react';
import AppIcon from '../icons/AppIcon.jsx';

function Detail({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-slate-800">
        {value || 'Not provided'}
      </p>
    </div>
  );
}

function JobActionModal({
  job,
  mode,
  onClose,
  onSave,
  onEdit,
  onCancelJob,
  services,
  users,
  isSaving,
  error
}) {
  const [values, setValues] = useState(job);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [files, setFiles] = useState({
    proposalDocument: null,
    idDocument: null,
    otherDocuments: []
  });

  useEffect(() => {
    setValues(job);
    setSelectedUsers(
      (job?.assignedPerson || '')
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean)
    );
    setFiles({
      proposalDocument: null,
      idDocument: null,
      otherDocuments: []
    });
  }, [job, mode]);

  if (!job || !mode) {
    return null;
  }

  const titles = {
    details: 'Job Details',
    edit: 'Edit Job',
    client: 'Client Profile'
  };

  const updateField = (event) => {
    setValues((current) => ({
      ...(current || job),
      [event.target.name]: event.target.value
    }));
  };

  const submitEdit = (event) => {
    event.preventDefault();
    onSave({
      values: {
        ...(values || job),
        assignedPerson: selectedUsers.join(', ')
      },
      files
    });
  };

  const toggleUser = (name) => {
    setSelectedUsers((current) =>
      current.includes(name)
        ? current.filter((userName) => userName !== name)
        : [...current, name]
    );
  };

  const editInputClass =
    'mt-2 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100';
  const formValues = values || job;

  const documents = job
    ? [
        job.documents?.proposalDocument,
        job.documents?.idDocument,
        ...(job.documents?.otherDocuments || [])
      ].filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6">
      <div className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl ${
        mode === 'details' ? 'max-w-3xl sm:p-8' : 'max-w-2xl'
      }`}>
        <div className={`flex items-center justify-between gap-4 ${
          mode === 'details' ? '' : 'border-b border-slate-100 pb-4'
        }`}>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-slate-950">{titles[mode]}</h2>
              {mode === 'details' ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  <span>#</span>
                  {job.jobNumber}
                </span>
              ) : null}
            </div>
            {mode === 'details' ? (
              <div className="mt-3 space-y-1 text-sm text-slate-500">
                <p>Job Number: {job.jobNumber}</p>
                <p className="break-all">Job ID: {job.id}</p>
              </div>
            ) : (
              <p className="mt-1 text-xs text-slate-500">#{job.jobNumber}</p>
            )}
          </div>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
            aria-label="Close"
          >
            <AppIcon name="close" className="h-4 w-4" />
          </button>
        </div>

        {mode === 'details' ? (
          <>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <section className="rounded-xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-700">
                  Client Information
                </h3>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p className="font-medium text-slate-800">{job.clientName}</p>
                  <p>{job.email}</p>
                  <p className="pt-1">Starting Point: {job.startingPoint || 'Not provided'}</p>
                  <p>CR Number: {job.ckNumber || 'Not provided'}</p>
                </div>
              </section>

              <section className="rounded-xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-700">
                  Service Details
                </h3>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p className="font-medium text-slate-800">{job.serviceType}</p>
                  <p>Assigned to: {job.assignedPerson || 'Unassigned'}</p>
                  <p>Status: {job.status || 'Created'}</p>
                </div>
              </section>

              <section className="rounded-xl bg-slate-50 p-5 sm:col-span-2">
                <h3 className="text-sm font-semibold text-slate-700">
                  Job Description
                </h3>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {job.jobDetails || 'No job description available'}
                </p>
                {job.specialDescription ? (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-500">
                    {job.specialDescription}
                  </p>
                ) : null}
              </section>

              <section className="rounded-xl bg-slate-50 p-5 sm:col-span-2">
                <h3 className="text-sm font-semibold text-slate-700">Documents</h3>
                {documents.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {documents.map((document) => (
                      <div
                        key={document.id}
                        className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm text-slate-700"
                      >
                        <AppIcon name="report" className="h-4 w-4 text-blue-600" />
                        <span className="min-w-0 truncate">{document.originalName}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">No documents available</p>
                )}
              </section>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
                onClick={onEdit}
              >
                <AppIcon name="edit" className="h-4 w-4" />
                Edit Job
              </button>
              <button
                type="button"
                disabled={job.status === 'Cancelled'}
                className="h-11 rounded-lg bg-slate-700 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={onCancelJob}
              >
                {job.status === 'Cancelled' ? 'Job Cancelled' : 'Cancel Job'}
              </button>
              <button
                type="button"
                className="h-11 rounded-lg bg-slate-100 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </>
        ) : null}

        {mode === 'client' ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Detail label="Client Name" value={job.clientName} />
            <Detail label="Email" value={job.email} />
            <Detail label="Contact Number" value={job.contactNumber} />
            <Detail label="CK Number" value={job.ckNumber} />
            <div className="sm:col-span-2">
              <Detail label="Address" value={job.address} />
            </div>
          </div>
        ) : null}

        {mode === 'edit' ? (
          <form className="mt-5" onSubmit={submitEdit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-slate-700">Job Number *</span>
                <input name="jobNumber" value={formValues.jobNumber || ''} onChange={updateField} required className={editInputClass} />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-700">Service Type *</span>
                <select name="serviceType" value={formValues.serviceType || ''} onChange={updateField} required className={editInputClass}>
                  <option value="">Select service type</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-slate-700">
                  Assigned Person (Optional)
                </span>
                <select
                  value=""
                  onChange={(event) => {
                    if (event.target.value && !selectedUsers.includes(event.target.value)) {
                      setSelectedUsers((current) => [...current, event.target.value]);
                    }
                  }}
                  className={editInputClass}
                >
                  <option value="">Select assigned person</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </label>

              <fieldset className="sm:col-span-2">
                <legend className="text-xs font-medium text-slate-700">
                  Assigned Users for This Service (Optional)
                </legend>
                <div className="mt-2 max-h-36 space-y-2 overflow-y-auto rounded-lg border border-slate-300 p-3">
                  {users.map((user) => (
                    <label key={user.id} className="flex items-center gap-3 text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.name)}
                        onChange={() => toggleUser(user.name)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium">{user.name}</span>
                      <span className="text-slate-400">({user.role || user.department})</span>
                    </label>
                  ))}
                </div>
                <p className="mt-1 text-right text-[11px] font-medium text-blue-600">
                  {selectedUsers.length} selected
                </p>
              </fieldset>

              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-slate-700">Job Details</span>
                <textarea
                  name="jobDetails"
                  value={formValues.jobDetails || ''}
                  onChange={updateField}
                  required
                  className="mt-2 min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-slate-700">
                  Special Description
                </span>
                <textarea
                  name="specialDescription"
                  value={formValues.specialDescription || ''}
                  onChange={updateField}
                  className="mt-2 min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              {[
                ['clientName', 'Client Name *', true],
                ['email', 'Email *', true],
                ['startingPoint', 'Starting Point *', true],
                ['ckNumber', 'CR Number', false],
                ['contactNumber', 'Contact Number', false],
                ['address', 'Address', false]
              ].map(([name, label, required]) => (
                <label key={name} className={`block ${name === 'address' ? 'sm:col-span-2' : ''}`}>
                  <span className="text-xs font-medium text-slate-700">{label}</span>
                  <input name={name} value={formValues[name] || ''} onChange={updateField} required={required} className={editInputClass} />
                </label>
              ))}

              <section className="border-t border-slate-200 pt-5 sm:col-span-2">
                <h3 className="text-sm font-semibold text-slate-800">
                  Update Documents (Optional)
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    ['proposalDocument', 'Proposal Document'],
                    ['idDocument', 'ID Document']
                  ].map(([name, label]) => (
                    <label key={name} className="block">
                      <span className="text-xs font-medium text-slate-700">{label}</span>
                      <span className="mt-2 flex min-h-16 cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 px-3 text-center text-xs text-slate-500 hover:bg-blue-50">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(event) => setFiles((current) => ({
                            ...current,
                            [name]: event.target.files?.[0] || null
                          }))}
                        />
                        {files[name]?.name || `Upload new ${label.toLowerCase()}`}
                      </span>
                    </label>
                  ))}
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-slate-700">Other Documents</span>
                    <span className="mt-2 flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 px-3 text-center text-xs text-slate-500 hover:bg-blue-50">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="sr-only"
                        onChange={(event) => setFiles((current) => ({
                          ...current,
                          otherDocuments: Array.from(event.target.files || [])
                        }))}
                      />
                      <AppIcon name="upload" className="mb-2 h-5 w-5" />
                      {files.otherDocuments.length > 0
                        ? files.otherDocuments.map((file) => file.name).join(', ')
                        : 'Click to upload additional documents'}
                    </span>
                  </label>
                </div>
              </section>
            </div>

            {error ? <p className="mt-4 text-sm font-medium text-rose-600">{error}</p> : null}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="h-10 rounded-lg bg-slate-100 px-5 text-sm font-medium text-slate-700"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white disabled:opacity-60"
              >
                {isSaving ? 'Updating...' : 'Update Job'}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default JobActionModal;
