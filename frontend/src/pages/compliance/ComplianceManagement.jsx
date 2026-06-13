import { Building2, ShieldCheck, UsersRound } from 'lucide-react';
import ComplianceHero from '../../components/compliance/ComplianceHero.jsx';
import ComplianceModuleCard from '../../components/compliance/ComplianceModuleCard.jsx';
import ComplianceStatusBadge from '../../components/compliance/ComplianceStatusBadge.jsx';
import ComplianceTopBar from '../../components/compliance/ComplianceTopBar.jsx';

const modules = [
  {
    title: 'Compliance Staff',
    status: '23 Team Members',
    description:
      'Manage compliance team members, roles, responsibilities, and performance tracking.',
    href: '/compliance-management/staff',
    icon: UsersRound,
    accent: 'green'
  },
  {
    title: 'Compliance Client',
    status: '175 Active Clients',
    description:
      'Client onboarding, KYC processes, risk assessments, and ongoing compliance monitoring.',
    href: '/compliance/clients',
    icon: ShieldCheck,
    accent: 'purple'
  },
  {
    title: 'Organizational Structure',
    status: 'Structure Documents',
    description:
      'Manage organizational structure documents, charts, and related compliance documentation.',
    href: '/compliance/organizational-structure',
    icon: Building2,
    accent: 'orange'
  }
];

function ComplianceManagement() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ComplianceTopBar />
      <div className="mx-auto max-w-[1880px] px-4 py-6 sm:px-6 lg:px-8">
        <ComplianceHero />

        <section className="mx-auto mt-9 grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-3">
          {modules.map((module) => (
            <ComplianceModuleCard key={module.title} {...module} />
          ))}
        </section>

        <div className="mt-12 flex justify-center">
          <ComplianceStatusBadge />
        </div>
      </div>
    </main>
  );
}

export default ComplianceManagement;
