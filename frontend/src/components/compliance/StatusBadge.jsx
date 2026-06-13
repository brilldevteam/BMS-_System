const badgeStyles = {
  Active: 'bg-emerald-100 text-emerald-700',
  Inactive: 'bg-rose-100 text-rose-700',
  Pending: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-rose-100 text-rose-700',
  EDD: 'border border-violet-300 bg-violet-50 text-violet-700',
  SDD: 'border border-slate-300 bg-white text-slate-700',
  Select: 'border border-slate-300 bg-white text-slate-700'
};

function StatusBadge({ value }) {
  return (
    <span
      className={`inline-flex min-w-12 items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${badgeStyles[value] || 'bg-slate-100 text-slate-700'}`}
    >
      {value}
    </span>
  );
}

export default StatusBadge;
