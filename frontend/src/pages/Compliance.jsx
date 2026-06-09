import MainLayout from '../layouts/MainLayout.jsx';

const accent = {
  gradient: 'from-purple-600 to-indigo-600',
  text: 'text-purple-700',
  activeBg: 'bg-purple-50',
  shadow: 'shadow-purple-500/25'
};

function Compliance() {
  return (
    <MainLayout
      workspaceKey="compliance"
      title="Compliance"
      subtitle="Regulatory & Risk Management"
      accent={accent}
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
          Placeholder
        </p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          Compliance workspace
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          This area will later contain KYC, BRA, staff management, screening
          records, and monitoring. No compliance logic has been added yet.
        </p>
      </div>
    </MainLayout>
  );
}

export default Compliance;
