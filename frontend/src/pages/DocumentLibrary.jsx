import MainLayout from '../layouts/MainLayout.jsx';

const accent = {
  gradient: 'from-emerald-500 to-teal-600',
  text: 'text-emerald-700',
  activeBg: 'bg-emerald-50',
  shadow: 'shadow-emerald-500/25'
};

function DocumentLibrary() {
  return (
    <MainLayout
      workspaceKey="documentLibrary"
      title="Document Library"
      subtitle="Archive & Document History"
      accent={accent}
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
          Placeholder
        </p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          Document Library workspace
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          This area will later contain archived documents, document history,
          search, filtering, and client-wise archive views.
        </p>
      </div>
    </MainLayout>
  );
}

export default DocumentLibrary;
