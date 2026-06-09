import SectionShell from './SectionShell.jsx';
import FieldLabel from '../common/FieldLabel.jsx';

function TextField({ label, name, value, onChange, error, required = false, optional = false, type = 'text', placeholder }) {
  return (
    <label className="block">
      <FieldLabel required={required} optional={optional}>{label}</FieldLabel>
      <input
        className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? <p className="mt-2 text-xs font-medium text-rose-600">{error}</p> : null}
    </label>
  );
}

function ClientInformationSection({ values, errors, onChange }) {
  return (
    <SectionShell
      title="Client Information"
      icon={
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21V5H20V21" />
          <path d="M8 9H16" />
          <path d="M8 13H16" />
        </svg>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField label="Client Name" name="clientName" value={values.clientName} onChange={onChange} error={errors.clientName} required placeholder="Enter client's full name" />
        <TextField label="Email Address" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} required placeholder="Enter client's email address" />
        <TextField label="Starting Point" name="startingPoint" value={values.startingPoint} onChange={onChange} error={errors.startingPoint} required placeholder="Enter the starting location" />
        <TextField label="CK Number" name="ckNumber" value={values.ckNumber} onChange={onChange} optional placeholder="Enter CK number" />
        <TextField label="Contact Number" name="contactNumber" value={values.contactNumber} onChange={onChange} optional placeholder="Enter contact number" />
        <TextField label="Address" name="address" value={values.address} onChange={onChange} optional placeholder="Enter client address" />
      </div>
    </SectionShell>
  );
}

export default ClientInformationSection;
