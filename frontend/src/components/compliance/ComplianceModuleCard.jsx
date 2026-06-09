import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const accentClasses = {
  green: {
    card: 'from-emerald-50 to-teal-50 border-emerald-100 shadow-emerald-200/70',
    icon: 'bg-emerald-600 shadow-emerald-600/25',
    status: 'bg-emerald-100/80 text-slate-700'
  },
  purple: {
    card: 'from-violet-50 to-purple-50 border-violet-100 shadow-purple-200/70',
    icon: 'bg-violet-600 shadow-violet-600/25',
    status: 'bg-violet-100/80 text-slate-700'
  },
  orange: {
    card: 'from-orange-50 to-amber-50 border-orange-100 shadow-orange-200/70',
    icon: 'bg-orange-600 shadow-orange-600/25',
    status: 'bg-orange-100/80 text-slate-700'
  }
};

function ComplianceModuleCard({
  title,
  status,
  description,
  href,
  icon: Icon,
  accent = 'purple'
}) {
  const styles = accentClasses[accent];

  return (
    <Link
      to={href}
      className={`group relative flex min-h-[270px] flex-col overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-violet-100 ${styles.card}`}
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${styles.status}`}
      />
      <div className="relative flex items-start justify-between gap-6">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg ${styles.icon}`}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div className="min-w-[9.5rem] pt-1 text-right">
          <p className="text-xs font-medium text-slate-600">Status</p>
          <p className="mt-2 text-base font-bold leading-snug text-slate-900">
            {status}
          </p>
        </div>
      </div>

      <div className="relative mt-8 flex flex-1 flex-col">
        <h2 className="text-2xl font-bold leading-tight tracking-normal text-slate-900">
          {title}
        </h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
          {description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-slate-700 transition group-hover:text-violet-700">
          Explore Module
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default ComplianceModuleCard;
