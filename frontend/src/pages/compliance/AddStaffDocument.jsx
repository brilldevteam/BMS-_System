import { useParams } from 'react-router-dom';
import StaffDirectoryTopBar from '../../components/compliance/staff/StaffDirectoryTopBar.jsx';
import { complianceRoles } from '../../data/complianceRoles.js';

function AddStaffDocument() {
  const { roleId = 'admin' } = useParams();
  const role = complianceRoles.find((item) => item.id === roleId);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <StaffDirectoryTopBar roleTitle={role?.title ?? 'admin'} />
      <section className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold tracking-normal text-slate-900">
          Add Staff Document Coming Soon
        </h1>
      </section>
    </main>
  );
}

export default AddStaffDocument;
