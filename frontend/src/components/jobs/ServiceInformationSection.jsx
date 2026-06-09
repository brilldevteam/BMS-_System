import SectionShell from './SectionShell.jsx';
import FieldLabel from '../common/FieldLabel.jsx';

function ServiceInformationSection({ values, errors, services, onChange }) {
  return (
    <SectionShell
      title="Service Information"
      icon={
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7H20" />
          <path d="M6 3H18V21H6Z" />
        </svg>
      }
    >
      <label className="block">
        <FieldLabel required>Service Type</FieldLabel>
        <select
          className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          name="serviceType"
          value={values.serviceType}
          onChange={onChange}
        >
          <option value="">Select a service type</option>
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </label>
      {errors.serviceType ? <p className="mt-2 text-xs font-medium text-rose-600">{errors.serviceType}</p> : null}
    </SectionShell>
  );
}

export default ServiceInformationSection;
