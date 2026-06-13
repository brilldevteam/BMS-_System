import ComplianceRoleCard from '../../components/compliance/ComplianceRoleCard.jsx';
import ComplianceRolesTopBar from '../../components/compliance/ComplianceRolesTopBar.jsx';
import { complianceRoles } from '../../data/complianceRoles.js';
import { complianceStaff } from '../../data/complianceStaff.js';

function ComplianceRoles() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ComplianceRolesTopBar />

      <section className="mx-auto max-w-[1290px] px-5 py-9 sm:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-normal text-slate-950">
            Compliance Roles
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Select a role to view staff members and their documents
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {complianceRoles.map((role) => (
            <ComplianceRoleCard
              key={role.id}
              {...role}
              memberCount={
                complianceStaff.filter((staff) => staff.role === role.title).length
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ComplianceRoles;
