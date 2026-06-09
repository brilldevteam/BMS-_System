import { useState } from 'react';
import FieldLabel from '../common/FieldLabel.jsx';

function AddUserForm({ roles, onCreateUser, isSaving }) {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');

  const updateField = (event) => {
    setFormValues((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (!formValues.name || !formValues.email || !formValues.password || !formValues.role) {
      setError('Please complete all fields.');
      return;
    }

    await onCreateUser(formValues);
    setFormValues({
      name: '',
      email: '',
      password: '',
      role: ''
    });
    setError('');
  };

  return (
    <form className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80" onSubmit={submitForm}>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 19C16 16.8 14.2 15 12 15H7C4.8 15 3 16.8 3 19" />
            <circle cx="9.5" cy="8" r="4" />
            <path d="M19 8V14" />
            <path d="M16 11H22" />
          </svg>
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Add User</h2>
          <p className="mt-1 text-xs text-slate-500">Create a user and assign a role.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <FieldLabel required>Full Name</FieldLabel>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            name="name"
            placeholder="Enter full name"
            value={formValues.name}
            onChange={updateField}
          />
        </label>

        <label className="block">
          <FieldLabel required>Email Address</FieldLabel>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            name="email"
            placeholder="Enter email address"
            type="email"
            value={formValues.email}
            onChange={updateField}
          />
        </label>

        <label className="block md:col-span-2">
          <FieldLabel required>Password</FieldLabel>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            name="password"
            placeholder="Enter password"
            type="password"
            value={formValues.password}
            onChange={updateField}
          />
        </label>

        <label className="block md:col-span-2">
          <FieldLabel required>Role</FieldLabel>
          <select
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-normal outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            name="role"
            value={formValues.role}
            onChange={updateField}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-rose-600">{error}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs font-normal text-emerald-700">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17L4 12" />
          </svg>
          User will receive login credentials via email
        </p>
        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSaving}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5V19" />
            <path d="M5 12H19" />
          </svg>
          {isSaving ? 'Adding...' : 'Add User'}
        </button>
      </div>
    </form>
  );
}

export default AddUserForm;
