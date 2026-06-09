const tabs = [
  {
    label: 'Create Role',
    icon: (
      <>
        <path d="M12 3L19 6V11C19 15.5 16.2 18.6 12 20C7.8 18.6 5 15.5 5 11V6L12 3Z" />
        <path d="M12 8V14" />
        <path d="M9 11H15" />
      </>
    )
  },
  {
    label: 'Add User',
    icon: (
      <>
        <path d="M16 19C16 16.8 14.2 15 12 15H7C4.8 15 3 16.8 3 19" />
        <circle cx="9.5" cy="8" r="4" />
        <path d="M19 8V14" />
        <path d="M16 11H22" />
      </>
    )
  },
  {
    label: 'Signatures',
    icon: (
      <>
        <path d="M12 20H21" />
        <path d="M16.5 3.5A2.1 2.1 0 0 1 19.5 6.5L7 19L3 20L4 16Z" />
      </>
    )
  }
];

function UserManagementTabs({ activeTab, onTabChange }) {
  return (
    <div className="mb-5 flex gap-3 overflow-x-auto rounded-xl bg-white/60 p-1.5 shadow-sm shadow-slate-200/70">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex h-10 items-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium transition ${
            activeTab === tab.label
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20'
              : 'text-slate-500 hover:bg-white hover:text-violet-700'
          }`}
          type="button"
          onClick={() => onTabChange(tab.label)}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          >
            {tab.icon}
          </svg>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default UserManagementTabs;
