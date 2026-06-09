import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddService from './pages/AddService.jsx';
import AllJobs from './pages/AllJobs.jsx';
import AddStaffDocument from './pages/compliance/AddStaffDocument.jsx';
import Compliance from './pages/Compliance.jsx';
import ComplianceClient from './pages/compliance/ComplianceClient.jsx';
import ComplianceManagement from './pages/compliance/ComplianceManagement.jsx';
import ComplianceRoles from './pages/compliance/ComplianceRoles.jsx';
import ComplianceStaffDirectory from './pages/compliance/ComplianceStaffDirectory.jsx';
import OrganizationalStructure from './pages/compliance/OrganizationalStructure.jsx';
import ViewStaffDocuments from './pages/compliance/ViewStaffDocuments.jsx';
import CreateJob from './pages/CreateJob.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DocumentLibrary from './pages/DocumentLibrary.jsx';
import FinancialReports from './pages/FinancialReports.jsx';
import ModeSelection from './pages/ModeSelection.jsx';
import ResourceCenter from './pages/ResourceCenter.jsx';
import ServicesManagement from './pages/ServicesManagement.jsx';
import UserManagement from './pages/UserManagement.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mode-selection" element={<ModeSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/financial-reports" element={<FinancialReports />} />
        <Route path="/dashboard/user-management" element={<UserManagement />} />
        <Route path="/dashboard/services" element={<ServicesManagement />} />
        <Route path="/dashboard/services/add" element={<AddService />} />
        <Route path="/dashboard/create-job" element={<CreateJob />} />
        <Route path="/dashboard/all-jobs" element={<AllJobs />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/compliance-management" element={<ComplianceManagement />} />
        <Route path="/compliance-management/staff" element={<ComplianceRoles />} />
        <Route
          path="/compliance-management/staff/:roleId"
          element={<ComplianceStaffDirectory />}
        />
        <Route
          path="/compliance-management/staff/:roleId/:staffId/add-document"
          element={<AddStaffDocument />}
        />
        <Route
          path="/compliance-management/staff/:roleId/:staffId/documents"
          element={<ViewStaffDocuments />}
        />
        <Route path="/compliance-management/client" element={<ComplianceClient />} />
        <Route
          path="/compliance-management/structure"
          element={<OrganizationalStructure />}
        />
        <Route path="/resource-center" element={<ResourceCenter />} />
        <Route path="/document-library" element={<DocumentLibrary />} />
        <Route
          path="*"
          element={
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950">
              <h1 className="text-center text-3xl font-semibold tracking-normal sm:text-4xl">
                BMS Business Management System
              </h1>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
