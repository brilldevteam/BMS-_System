import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddSectionModal from '../../components/compliance/staff/AddSectionModal.jsx';
import StaffDirectoryTable from '../../components/compliance/staff/StaffDirectoryTable.jsx';
import StaffDirectoryTopBar from '../../components/compliance/staff/StaffDirectoryTopBar.jsx';
import StaffSearchFilter from '../../components/compliance/staff/StaffSearchFilter.jsx';
import { complianceRoles } from '../../data/complianceRoles.js';
import { complianceStaff } from '../../data/complianceStaff.js';

function ComplianceStaffDirectory() {
  const { roleId = 'admin' } = useParams();
  const role = complianceRoles.find((item) => item.id === roleId);
  const roleTitle = role?.title ?? 'admin';
  const [staffRecords, setStaffRecords] = useState(complianceStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(roleTitle);
  const [expandedStaffId, setExpandedStaffId] = useState(null);
  const [modalStaff, setModalStaff] = useState(null);

  const roles = useMemo(
    () => complianceRoles.map((item) => item.title),
    []
  );

  useEffect(() => {
    setSelectedRole(roleTitle);
    setExpandedStaffId(null);
    setModalStaff(null);
  }, [roleTitle]);

  const filteredStaff = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return staffRecords.filter((staff) => {
      const matchesRole = selectedRole === 'all' || staff.role === selectedRole;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [staff.name, staff.email, staff.department, staff.role].some((value) =>
          value.toLowerCase().includes(normalizedSearch)
        );

      return matchesRole && matchesSearch;
    });
  }, [searchTerm, selectedRole, staffRecords]);

  const handleToggleView = (staffId) => {
    setExpandedStaffId((current) => (current === staffId ? null : staffId));
  };

  const handleAddSection = ({ title, description }) => {
    if (!modalStaff) {
      return;
    }

    const sectionId = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${Date.now()}`;

    setStaffRecords((currentStaff) =>
      currentStaff.map((staff) =>
        staff.id === modalStaff.id
          ? {
              ...staff,
              documentSections: [
                ...staff.documentSections,
                {
                  id: sectionId,
                  title,
                  description,
                  custom: true,
                  documents: []
                }
              ]
            }
          : staff
      )
    );
    setExpandedStaffId(modalStaff.id);
    setModalStaff(null);
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <StaffDirectoryTopBar roleTitle={roleTitle} />

      <section className="mx-auto max-w-[1290px] px-5 py-8 sm:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-normal text-slate-950">
            {roleTitle} Staff
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Manage documents for {roleTitle} team members
          </p>
        </div>

        <StaffSearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          roles={roles}
          visibleCount={25}
          totalCount={23}
        />

        <StaffDirectoryTable
          staff={filteredStaff}
          expandedStaffId={expandedStaffId}
          onToggleView={handleToggleView}
          onAddClick={setModalStaff}
        />
      </section>

      {modalStaff ? (
        <AddSectionModal
          staff={modalStaff}
          onClose={() => setModalStaff(null)}
          onAddSection={handleAddSection}
        />
      ) : null}
    </main>
  );
}

export default ComplianceStaffDirectory;
