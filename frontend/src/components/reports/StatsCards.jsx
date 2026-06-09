const cards = [
  { title: 'Total Documents', key: 'documents', icon: 'file', tone: 'bg-blue-100 text-blue-600' },
  { title: 'Total Files', key: 'files', icon: 'folder', tone: 'bg-emerald-100 text-emerald-600' },
  { title: 'Companies', key: 'companies', icon: 'bars', tone: 'bg-violet-100 text-violet-600' },
  { title: 'Recent (7 days)', key: 'recent', icon: 'calendar', tone: 'bg-orange-100 text-orange-600' }
];

function CardIcon({ name }) {
  const commonProps = {
    className: 'h-6 w-6',
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };

  const paths = {
    file: (
      <>
        <path d="M7 3H14L18 7V21H7Z" />
        <path d="M14 3V8H18" />
      </>
    ),
    folder: (
      <>
        <path d="M4 7H10L12 9H20V19H4Z" />
        <path d="M4 7V19" />
      </>
    ),
    bars: (
      <>
        <path d="M7 18V13" />
        <path d="M12 18V8" />
        <path d="M17 18V5" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3V6" />
        <path d="M17 3V6" />
        <path d="M4 8H20" />
        <path d="M5 5H19V20H5Z" />
      </>
    )
  };

  return <svg {...commonProps}>{paths[name]}</svg>;
}

function StatsCards({ reports }) {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const stats = {
    documents: reports.length,
    files: reports.reduce((total, report) => total + report.files.length, 0),
    companies: new Set(reports.map((report) => report.company)).size,
    recent: reports.filter((report) => new Date(report.uploadedAt).getTime() >= sevenDaysAgo).length
  };

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.key}
          className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-normal text-slate-800">{card.title}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {stats[card.key]}
              </p>
            </div>
            <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.tone}`}>
              <CardIcon name={card.icon} />
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}

export default StatsCards;
