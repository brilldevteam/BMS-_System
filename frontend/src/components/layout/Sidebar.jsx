import { NavLink } from 'react-router-dom';
import AppIcon from '../icons/AppIcon.jsx';

const sidebarGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
      { label: 'Financial report', href: '/dashboard/financial-reports', icon: 'report' }
    ]
  },
  {
    label: 'Role Based',
    items: [{ label: 'My Role Clients', href: '#', icon: 'clients' }]
  },
  {
    label: 'Management',
    items: [{ label: 'User Management', href: '/dashboard/user-management', icon: 'users' }]
  },
  {
    label: 'Administration',
    items: [
      { label: 'Create Job', href: '/dashboard/create-job', icon: 'job' },
      { label: 'All Jobs', href: '/dashboard/all-jobs', icon: 'briefcase' }
    ]
  },
  {
    label: 'Compliance Management',
    items: [
      { label: 'Compliance Management', href: '#', icon: 'shield' },
      { label: 'BRA Management', href: '#', icon: 'risk' },
      { label: 'KYC Management', href: '#', icon: 'kyc' },
      { label: 'Resource Center', href: '/resource-center', icon: 'resource' }
    ]
  },
  {
    label: 'Services',
    items: [
      { label: 'All Services', href: '/dashboard/services', icon: 'services' },
      { label: 'Add Service', href: '/dashboard/services/add', icon: 'plusSquare' }
    ]
  },
  {
    label: 'Operation Management',
    items: []
  }
];

function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-72 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-lg font-semibold text-white shadow-md shadow-violet-500/20">
          N
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Newoon
          </p>
          <h1 className="text-lg font-semibold text-slate-900">BMS System</h1>
        </div>
      </div>

      <nav className="mt-5 flex gap-3 overflow-x-auto pb-2 lg:mt-8 lg:flex-col lg:gap-6 lg:overflow-visible lg:pb-0">
        {sidebarGroups.map((group) => (
          <div key={group.label} className="min-w-[210px] lg:min-w-0">
            <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              {group.label}
            </p>
            {group.items.length > 0 ? (
              <div className="space-y-1">
                {group.items.map((item) => {
                  return (
                    <NavLink
                      key={item.label}
                      to={item.href}
                      className={({ isActive }) => {
                        const active = item.href !== '#' && isActive;

                        return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal transition ${
                          active
                            ? 'bg-blue-50 text-blue-700 shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                        }`;
                      }}
                    >
                      {({ isActive }) => (
                        <>
                          <AppIcon
                            name={item.icon}
                            className={`h-[18px] w-[18px] ${
                              item.href !== '#' && isActive ? 'text-blue-700' : 'text-slate-400'
                            }`}
                          />
                          <span>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 px-3 py-3 text-sm font-normal text-slate-400">
                Placeholder section
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-6 rounded-xl bg-violet-50 p-4 shadow-sm lg:mt-8">
        <p className="text-sm font-medium text-slate-900">Need Help?</p>
        <div className="mt-1 flex items-center gap-2 text-sm leading-5 text-slate-600">
          <AppIcon name="help" className="h-4 w-4 text-violet-600" />
          <span>Contact support team</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
