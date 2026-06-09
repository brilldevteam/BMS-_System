import { useMemo, useState } from 'react';
import PermissionGroup from './PermissionGroup.jsx';
import FieldLabel from '../common/FieldLabel.jsx';

const permissionGroups = [
  {
    title: 'Client Management',
    items: [
      { id: 'companyDetails', label: 'Company Details', type: 'dual' },
      { id: 'directorDetails', label: 'Director Details', type: 'dual' },
      { id: 'secretaryDetails', label: 'Secretary Details', type: 'dual' },
      { id: 'shareholderDetails', label: 'Shareholder Details', type: 'dual' },
      { id: 'sefDetails', label: 'SEF Details', type: 'dual' },
      { id: 'signedKyc', label: 'Signed KYC', type: 'dual' },
      { id: 'paymentDetails', label: 'Payment Details', type: 'dual' },
      { id: 'auditedFinancial', label: 'Audited Financial', type: 'dual' }
    ]
  },
  {
    title: 'KYC Management',
    items: [
      { id: 'amlSupervisorInitialUpload', label: 'AML Supervisor (Initial Document Upload)' },
      { id: 'mlroLevel2KycSigning', label: 'MLRO (Level 2 KYC Signing)' },
      { id: 'dmlroLevel1KycSigning', label: 'DMLRO (Level 1 KYC Signing)' },
      { id: 'ceoFinalKycSigning', label: 'CEO (Final KYC Signing)' }
    ]
  },
  {
    title: 'BRA Management',
    items: [
      { id: 'mlroLevel1BraApproval', label: 'MLRO (Level 1 BRA Approval)' },
      { id: 'dmlroLevel2BraApproval', label: 'DMLRO (Level 2 BRA Approval)' },
      { id: 'ceoFinalBraApproval', label: 'CEO (Final BRA Approval)' }
    ]
  },
  {
    title: 'Compliance Resources',
    items: [
      { id: 'manageResources', label: 'Manage Resources (Upload, Edit, Delete documents/links)' }
    ]
  },
  {
    title: 'Additional Permissions',
    items: [
      { id: 'documentManagement', label: 'Document Management' },
      { id: 'renewalManagement', label: 'Renewal Management' },
      { id: 'complianceManagement', label: 'Compliance Management' },
      { id: 'requestService', label: 'Request Service' },
      { id: 'userManagement', label: 'User Management' },
      { id: 'operationManagement', label: 'Operation Management' },
      { id: 'accountManagement', label: 'Account Management' }
    ]
  }
];

function CreateRoleForm({ onCreateRole, isSaving }) {
  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [error, setError] = useState('');

  const permissions = useMemo(
    () => Object.keys(selectedPermissions).filter((key) => selectedPermissions[key]),
    [selectedPermissions]
  );

  const togglePermission = (permissionKey) => {
    setSelectedPermissions((current) => ({
      ...current,
      [permissionKey]: !current[permissionKey]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!roleName.trim()) {
      setError('Role name is required.');
      return;
    }

    await onCreateRole({
      name: roleName.trim(),
      permissions
    });

    setRoleName('');
    setSelectedPermissions({});
    setError('');
  };

  return (
    <form className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80" onSubmit={handleSubmit}>
      <label className="block">
        <FieldLabel required className="text-sm">Role Name</FieldLabel>
        <input
          className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          placeholder="Enter role name"
          value={roleName}
          onChange={(event) => setRoleName(event.target.value)}
        />
      </label>

      {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}

      <div className="mt-6">
        <h2 className="mb-4 text-sm font-medium text-slate-900">Permissions</h2>
        <div className="space-y-5">
          {permissionGroups.map((group) => (
            <PermissionGroup
              key={group.title}
              group={group}
              selectedPermissions={selectedPermissions}
              onToggle={togglePermission}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="h-10 rounded-md bg-violet-600 px-5 text-sm font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? 'Creating...' : 'Create Role'}
        </button>
      </div>
    </form>
  );
}

export default CreateRoleForm;
