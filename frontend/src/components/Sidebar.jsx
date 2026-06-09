const workspaceMenus = {
  dashboard: ['Overview', 'Jobs', 'Clients', 'Users', 'Reports'],
  compliance: [
    'KYC Management',
    'BRA Management',
    'Staff Management',
    'Screening Records',
    'Monitoring'
  ],
  resourceCenter: ['Templates', 'Guidelines', 'Documents', 'Knowledge Base'],
  documentLibrary: [
    'Archived Documents',
    'Document History',
    'Search & Filter',
    'Client-wise Archive'
  ]
};

function Sidebar({ workspaceKey, workspaceTitle, accent }) {
  const menuItems = workspaceMenus[workspaceKey] || [];

  return (
    <aside className="border-b border-slate-200/80 bg-white/90 px-4 py-4 shadow-sm backdrop-blur lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} text-base font-bold text-white shadow-lg ${accent.shadow}`}
        >
          B
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Newoon BMS
          </p>
          <h2 className="text-lg font-bold text-slate-900">{workspaceTitle}</h2>
        </div>
      </div>

      <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-9 lg:flex-col lg:overflow-visible lg:pb-0">
        {menuItems.map((item, index) => (
          <a
            key={item}
            href="#"
            className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition ${
              index === 0
                ? `${accent.activeBg} ${accent.text} shadow-sm`
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
