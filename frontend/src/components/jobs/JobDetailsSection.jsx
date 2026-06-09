import SectionShell from './SectionShell.jsx';
import FieldLabel from '../common/FieldLabel.jsx';

function JobDetailsSection({ values, errors, users, onChange }) {
  return (
    <SectionShell
      title="Job Details"
      icon={
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 19C16 16.8 14.2 15 12 15H7C4.8 15 3 16.8 3 19" />
          <circle cx="9.5" cy="8" r="4" />
        </svg>
      }
    >
      <div className="space-y-4">
        <label className="block">
          <FieldLabel required>Assign Person</FieldLabel>
          <select className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100" name="assignedPerson" value={values.assignedPerson} onChange={onChange}>
            <option value="">Select an assigned person</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>
          {errors.assignedPerson ? <p className="mt-2 text-xs font-medium text-rose-600">{errors.assignedPerson}</p> : null}
        </label>

        <label className="block">
          <FieldLabel required>Job Details</FieldLabel>
          <textarea className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100" name="jobDetails" placeholder="Enter detailed job requirements and specifications..." value={values.jobDetails} onChange={onChange} />
          {errors.jobDetails ? <p className="mt-2 text-xs font-medium text-rose-600">{errors.jobDetails}</p> : null}
        </label>

        <label className="block">
          <FieldLabel optional>Special Description</FieldLabel>
          <textarea className="mt-2 min-h-20 w-full resize-y rounded-md border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100" name="specialDescription" placeholder="Add any special instructions or additional information..." value={values.specialDescription} onChange={onChange} />
        </label>
      </div>
    </SectionShell>
  );
}

export default JobDetailsSection;
