import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';

function MainLayout({ children, workspaceKey, title, subtitle, accent }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Sidebar
        workspaceKey={workspaceKey}
        workspaceTitle={title}
        accent={accent}
      />

      <div className="lg:pl-72">
        <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <Topbar title={title} subtitle={subtitle} accent={accent} />
          <section className="flex-1 rounded-3xl border border-white bg-white/90 p-6 shadow-sm shadow-slate-200/80 sm:p-8">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
