const statusClasses = {
  Complete: 'bg-emerald-100 text-emerald-700',
  Incomplete: 'bg-amber-100 text-amber-700',
  'No Documents': 'bg-red-100 text-red-700'
};

function StaffStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
}

export default StaffStatusBadge;
