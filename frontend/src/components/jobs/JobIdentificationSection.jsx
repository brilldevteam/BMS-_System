import SectionShell from './SectionShell.jsx';
import FieldLabel from '../common/FieldLabel.jsx';

function JobIdentificationSection({ values, errors, onChange }) {
  return (
    <SectionShell
      title="Job Identification"
      icon={
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3H17V21H7Z" />
          <path d="M10 8H14" />
          <path d="M10 12H14" />
        </svg>
      }
    >
      <label className="block">
        <FieldLabel required>Job Number</FieldLabel>
        <input
          className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          name="jobNumber"
          placeholder="Enter unique job number e.g., JOB-2024-001"
          value={values.jobNumber}
          onChange={onChange}
        />
      </label>
      <p className="mt-2 text-xs text-slate-500">Use letters, numbers, and hyphens only.</p>
      {errors.jobNumber ? <p className="mt-2 text-xs font-medium text-rose-600">{errors.jobNumber}</p> : null}
    </SectionShell>
  );
}

export default JobIdentificationSection;
