const toneClasses = {
  blue: {
    idle: 'bg-blue-50 text-blue-700 shadow-blue-100/70',
    active: 'bg-blue-600 text-white shadow-blue-300/80 ring-blue-300'
  },
  green: {
    idle: 'bg-emerald-50 text-emerald-700 shadow-emerald-100/70',
    active: 'bg-emerald-600 text-white shadow-emerald-300/80 ring-emerald-300'
  },
  yellow: {
    idle: 'bg-amber-50 text-amber-700 shadow-amber-100/70',
    active: 'bg-amber-500 text-white shadow-amber-300/80 ring-amber-300'
  },
  red: {
    idle: 'bg-rose-50 text-rose-700 shadow-rose-100/70',
    active: 'bg-rose-600 text-white shadow-rose-300/80 ring-rose-300'
  },
  purple: {
    idle: 'bg-purple-50 text-purple-700 shadow-purple-100/70',
    active: 'bg-purple-600 text-white shadow-purple-300/80 ring-purple-300'
  }
};

function ComplianceStatsCard({
  value,
  label,
  tone = 'blue',
  active = false,
  onClick
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-20 flex-col items-center justify-center rounded-xl px-4 py-3 text-center shadow-md transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-violet-200 ${
        active ? `${toneClasses[tone].active} ring-2 ring-offset-2` : toneClasses[tone].idle
      }`}
    >
      <strong className="text-2xl font-bold leading-none">{value}</strong>
      <span className="mt-2 text-[11px] font-semibold">{label}</span>
    </button>
  );
}

export default ComplianceStatsCard;
