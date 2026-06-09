import MainLayout from '../layouts/MainLayout.jsx';

const accent = {
  gradient: 'from-orange-500 to-red-600',
  text: 'text-orange-700',
  activeBg: 'bg-orange-50',
  shadow: 'shadow-orange-500/25'
};

function ResourceCenter() {
  return (
    <MainLayout
      workspaceKey="resourceCenter"
      title="Resource Center"
      subtitle="Documentation & Guidelines"
      accent={accent}
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
          Placeholder
        </p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          Resource Center workspace
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          This area will later contain templates, guidelines, documents, and
          knowledge base content. The screen is only a layout placeholder.
        </p>
      </div>
    </MainLayout>
  );
}

export default ResourceCenter;
