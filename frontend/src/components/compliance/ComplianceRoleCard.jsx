import {
  ArrowRight,
  BadgeDollarSign,
  IdCard,
  Scale,
  ShieldCheck,
  Trophy,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  shield: ShieldCheck,
  scale: Scale,
  idCard: IdCard,
  finance: BadgeDollarSign,
  trophy: Trophy,
  user: User
};

const accentClasses = {
  purple: 'bg-violet-600 shadow-violet-500/25',
  green: 'bg-emerald-600 shadow-emerald-500/25',
  blue: 'bg-blue-600 shadow-blue-500/25',
  pink: 'bg-pink-600 shadow-pink-500/25',
  orange: 'bg-orange-600 shadow-orange-500/25',
  gray: 'bg-slate-600 shadow-slate-500/25'
};

function ComplianceRoleCard({
  id,
  title,
  subtitle,
  memberCount,
  icon,
  accent
}) {
  const Icon = iconMap[icon];
  const membersLabel = `${memberCount} ${memberCount === 1 ? 'member' : 'members'}`;

  return (
    <article className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
        {memberCount}
      </span>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-lg ${accentClasses[accent]}`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-xl font-bold leading-tight tracking-normal text-slate-950">
        {title}
      </h2>
      <p className="mt-3 text-sm font-medium text-slate-600">{subtitle}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs font-medium text-slate-500">{membersLabel}</p>
        <Link
          to={`/compliance-management/staff/${id}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
        >
          View Staff
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default ComplianceRoleCard;
