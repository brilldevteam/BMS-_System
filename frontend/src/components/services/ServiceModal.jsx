import { useEffect, useState } from 'react';
import FieldLabel from '../common/FieldLabel.jsx';

const roleOptions = [
  'Admin',
  'External Parties',
  'Business Development',
  'Compliance Management',
  'Accounting',
  'Operation Management',
  'Sss',
  'MLRO',
  'CEO',
  'DMLRO',
  'Customer',
  'AML Supervisor',
  'Senior Executive Function'
];

const emptyValues = {
  title: '',
  description: '',
  status: 'Active',
  assignedRoles: []
};

function ServiceModal({ isOpen, service, isSaving, onClose, onSave }) {
  const [values, setValues] = useState(emptyValues);
  const [error, setError] = useState('');

  useEffect(() => {
    if (service) {
      setValues({
        title: service.title || '',
        description: service.description || '',
        status: service.status || 'Active',
        assignedRoles: service.assignedRoles || service.departments || []
      });
      return;
    }

    setValues(emptyValues);
  }, [service, isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateField = (event) => {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const toggleRole = (role) => {
    setValues((current) => {
      const exists = current.assignedRoles.includes(role);

      return {
        ...current,
        assignedRoles: exists
          ? current.assignedRoles.filter((item) => item !== role)
          : [...current.assignedRoles, role]
      };
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (!values.title.trim() || !values.description.trim()) {
      setError('Service name and description are required.');
      return;
    }

    await onSave({
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
      category: values.assignedRoles[0] || 'General',
      departments: values.assignedRoles,
      assignedRoles: values.assignedRoles,
      usageCount: Number(service?.usageCount || 0)
    });

    setError('');
  };

  return (
    <div className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-5">
          <button
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950"
            type="button"
            onClick={onClose}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19L5 12L12 5" />
            </svg>
            Back
          </button>
          <h2 className="text-3xl font-semibold tracking-normal text-violet-700">
            {service ? 'Edit Service' : 'Add New Service'}
          </h2>
        </div>

        <form className="rounded-xl bg-white p-8 shadow-xl shadow-slate-200/80" onSubmit={submitForm}>
          <div className="space-y-6">
            <label className="block">
              <FieldLabel required className="text-sm">Service Name</FieldLabel>
              <input
                className="mt-3 h-12 w-full rounded-md border border-slate-300 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                name="title"
                placeholder="Enter service name"
                value={values.title}
                onChange={updateField}
              />
            </label>

            <label className="block">
              <FieldLabel required className="text-sm">Description</FieldLabel>
              <textarea
                className="mt-3 min-h-32 w-full resize-y rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                name="description"
                placeholder="Describe the service..."
                value={values.description}
                onChange={updateField}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-900">Status</span>
              <select
                className="mt-3 h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                name="status"
                value={values.status}
                onChange={updateField}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-violet-700" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 19C16 16.8 14.2 15 12 15H7C4.8 15 3 16.8 3 19" />
                  <circle cx="9.5" cy="8" r="4" />
                  <path d="M17 11H21" />
                  <path d="M19 9V13" />
                </svg>
                <h3 className="text-base font-medium text-slate-950">Assigned Roles</h3>
              </div>
              <p className="mb-4 text-xs text-slate-500">
                Select the roles that can access this service
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roleOptions.map((role) => {
                  const selected = values.assignedRoles.includes(role);

                  return (
                    <button
                      key={role}
                      className={`flex h-12 items-center justify-between rounded-lg border px-4 text-left text-sm font-medium transition ${
                        selected
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                      type="button"
                      onClick={() => toggleRole(role)}
                    >
                      <span>{role}</span>
                      {selected ? (
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {values.assignedRoles.length > 0 ? (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-normal text-slate-500">Selected:</span>
                  {values.assignedRoles.map((role) => (
                    <button
                      key={role}
                      className="inline-flex h-7 items-center gap-2 rounded-full bg-blue-50 px-3 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                      type="button"
                      onClick={() => toggleRole(role)}
                    >
                      {role}
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18" />
                        <path d="M6 6L18 18" />
                      </svg>
                    </button>
                  ))}
                </div>
              ) : null}
            </section>
          </div>

          {error ? <p className="mt-5 text-sm font-medium text-rose-600">{error}</p> : null}

          <div className="mt-10 flex justify-end gap-5">
            <button
              className="h-11 rounded-md px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="h-11 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-7 text-sm font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:opacity-60"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : service ? 'Save Changes' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceModal;
