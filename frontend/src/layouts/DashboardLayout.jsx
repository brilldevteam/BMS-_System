import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Sidebar />

      <div className="lg:pl-72">
        <Topbar />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
