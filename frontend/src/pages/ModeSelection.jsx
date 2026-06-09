import WorkspaceCard from '../components/WorkspaceCard.jsx';

const workspaces = [
  {
    title: 'Dashboard',
    subtitle: 'Business Analytics & Operations',
    description:
      'Access comprehensive business metrics, financial reports, and operational management tools',
    features: [
      'Real-time Analytics',
      'Financial Reports',
      'User Management',
      'Business Operations'
    ],
    buttonLabel: 'Enter Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    background: 'bg-gradient-to-br from-sky-50 to-cyan-50',
    shadow: 'shadow-sky-200/70',
    accent: {
      gradient: 'from-blue-600 to-cyan-600',
      text: 'text-blue-700',
      featureBg: 'bg-blue-100',
      iconShadow: 'shadow-blue-500/25',
      focus: 'focus:ring-blue-200'
    }
  },
  {
    title: 'Compliance',
    subtitle: 'Regulatory & Risk Management',
    description:
      'Comprehensive compliance management with KYC, BRA, and regulatory adherence tools',
    features: [
      'Staff Management',
      'Client Compliance',
      'Risk Assessment',
      'Org Structure'
    ],
    buttonLabel: 'Enter Compliance',
    href: '/compliance-management',
    icon: 'compliance',
    background: 'bg-gradient-to-br from-violet-50 to-fuchsia-50',
    shadow: 'shadow-purple-200/70',
    accent: {
      gradient: 'from-purple-600 to-indigo-600',
      text: 'text-purple-700',
      featureBg: 'bg-purple-100',
      iconShadow: 'shadow-purple-500/25',
      focus: 'focus:ring-purple-200'
    }
  },
  {
    title: 'Resource Center',
    subtitle: 'Documentation & Guidelines',
    description:
      'Access compliance documentation, regulatory guidelines, templates, and knowledge base',
    features: ['Templates', 'Guidelines', 'Documents', 'Knowledge Base'],
    buttonLabel: 'Enter Resource Center',
    href: '/resource-center',
    icon: 'resource',
    background: 'bg-gradient-to-br from-orange-50 to-red-50',
    shadow: 'shadow-orange-200/70',
    accent: {
      gradient: 'from-orange-500 to-red-600',
      text: 'text-orange-700',
      featureBg: 'bg-orange-100',
      iconShadow: 'shadow-orange-500/25',
      focus: 'focus:ring-orange-200'
    }
  },
  {
    title: 'Document Library',
    subtitle: 'Archive & Document History',
    description:
      'Access archived documents, view document history, and retrieve past versions - retained for 10 years',
    features: [
      'Archived Documents',
      'Document History',
      'Search & Filter',
      'Client-wise Archive'
    ],
    buttonLabel: 'Enter Document Library',
    href: '/document-library',
    icon: 'library',
    background: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    shadow: 'shadow-emerald-200/70',
    accent: {
      gradient: 'from-emerald-500 to-teal-600',
      text: 'text-emerald-700',
      featureBg: 'bg-emerald-100',
      iconShadow: 'shadow-emerald-500/25',
      focus: 'focus:ring-emerald-200'
    }
  }
];

function SparklesIcon() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M12 3L13.7 8.3L19 10L13.7 11.7L12 17L10.3 11.7L5 10L10.3 8.3Z" />
      <path d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2Z" />
      <path d="M5 3L5.7 4.8L7.5 5.5L5.7 6.2L5 8L4.3 6.2L2.5 5.5L4.3 4.8Z" />
    </svg>
  );
}

function ModeSelection() {
  return (
    <main className="min-h-screen bg-white px-5 py-10 text-slate-950 sm:px-8 lg:py-12">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-[70px] w-[70px] items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-purple-300/50">
            <SparklesIcon />
          </div>
          <h1 className="mt-7 text-5xl font-extrabold leading-none tracking-normal text-[#23225f] sm:text-6xl">
            Welcome Back
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
            Choose your workspace to continue with your business operations
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.title} {...workspace} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ModeSelection;
