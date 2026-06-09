import AppIcon from '../icons/AppIcon.jsx';

const statConfig = [
  { label: 'Total Services', key: 'total', tone: 'bg-blue-100 text-blue-700', icon: 'services' },
  { label: 'Active Services', key: 'active', tone: 'bg-emerald-100 text-emerald-700', icon: 'shield' },
  { label: 'Total Usage', key: 'usage', tone: 'bg-violet-100 text-violet-700', icon: 'activity' }
];

function ServicesStats({ services }) {
  const stats = {
    total: services.length,
    active: services.filter((service) => service.status === 'Active').length,
    usage: services.reduce((total, service) => total + Number(service.usageCount || 0), 0)
  };

  return (
    <section className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
      {statConfig.map((stat) => (
        <article key={stat.key} className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-normal text-slate-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">{stats[stat.key]}</p>
            </div>
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.tone}`}>
              <AppIcon name={stat.icon} className="h-5 w-5" />
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}

export default ServicesStats;
