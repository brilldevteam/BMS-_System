const permissionColumns = [
  { key: 'companyDetails', label: 'Company Details', type: 'dual' },
  { key: 'directorDetails', label: 'Director Details', type: 'dual' },
  { key: 'secretaryDetails', label: 'Secretary Details', type: 'dual' },
  { key: 'shareholderDetails', label: 'Shareholder Details', type: 'dual' },
  { key: 'sefDetails', label: 'SEF Details', type: 'dual' },
  { key: 'signedKyc', label: 'Signed KYC', type: 'dual' },
  { key: 'paymentDetails', label: 'Payment Details', type: 'dual' },
  { key: 'auditedFinancial', label: 'Audited Financial', type: 'dual' },
  { key: 'kycLmro', label: 'KYC LMRO', type: 'single' },
  { key: 'kycDmlro', label: 'KYC DMLRO', type: 'single' },
  { key: 'kycCeo', label: 'KYC CEO', type: 'single' },
  { key: 'braLmro', label: 'BRA LMRO', type: 'single' },
  { key: 'braCeo', label: 'BRA CEO', type: 'single' },
  { key: 'resources', label: 'Resources', type: 'single', highlight: true },
  { key: 'documentManagement', label: 'Document Management', type: 'single' },
  { key: 'renewalManagement', label: 'Renewal Management', type: 'single' },
  { key: 'complianceManagement', label: 'Compliance Management', type: 'single' },
  { key: 'requestService', label: 'Request Service', type: 'single' },
  { key: 'userManagement', label: 'User Management', type: 'single' },
  { key: 'operationManagement', label: 'Operation Management', type: 'single' },
  { key: 'accountManagement', label: 'Account Management', type: 'single', highlight: true }
];

function PermissionCheckbox({ checked, accent = 'accent-blue-600', onChange }) {
  return (
    <input
      className={`h-3.5 w-3.5 rounded border-slate-300 ${accent} focus:ring-blue-500`}
      type="checkbox"
      checked={Boolean(checked)}
      onChange={onChange}
    />
  );
}

function PermissionChecks({ permission, type, highlight, onToggle }) {
  if (type === 'single') {
    return (
      <div className="flex min-w-16 justify-center">
        <PermissionCheckbox
          checked={permission?.enabled}
          accent={highlight ? 'accent-orange-600' : 'accent-blue-600'}
          onChange={() => onToggle('enabled')}
        />
      </div>
    );
  }

  return (
    <div className="flex min-w-24 items-center gap-2">
      <label className="flex items-center gap-1 text-[11px] text-slate-500">
        <PermissionCheckbox
          checked={permission?.edit}
          onChange={() => onToggle('edit')}
        />
        Edit
      </label>
      <label className="flex items-center gap-1 text-[11px] text-slate-500">
        <PermissionCheckbox
          checked={permission?.view}
          onChange={() => onToggle('view')}
        />
        View
      </label>
    </div>
  );
}

function UsersPermissionTable({ users, onTogglePermission }) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-950">Users</h2>
        <p className="mt-1 text-xs font-normal text-slate-500">
          A list of all users and their assigned roles and permissions
        </p>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-md shadow-slate-200/80">
        <div className="overflow-x-auto">
          <table className="min-w-[2900px] divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="sticky left-0 z-10 bg-slate-50 px-4 py-4 text-left text-[11px] font-medium uppercase tracking-[0.1em] text-slate-500">
                  User
                </th>
                <th className="sticky left-[180px] z-10 bg-slate-50 px-4 py-4 text-left text-[11px] font-medium uppercase tracking-[0.1em] text-slate-500">
                  Role
                </th>
                {permissionColumns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-4 text-left text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500 ${
                      column.highlight ? 'bg-amber-50' : ''
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-violet-50/40">
                  <td className="sticky left-0 z-10 w-[180px] bg-white px-4 py-4 text-sm font-medium text-slate-900">
                    {user.name}
                  </td>
                  <td className="sticky left-[180px] z-10 w-[190px] bg-white px-4 py-4">
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                      {user.role}
                    </span>
                  </td>
                  {permissionColumns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-4 ${column.highlight ? 'bg-amber-50/70' : ''}`}
                    >
                      <PermissionChecks
                        permission={user.permissions?.[column.key]}
                        type={column.type}
                        highlight={column.highlight}
                        onToggle={(permissionKey) =>
                          onTogglePermission(user.id, column.key, permissionKey, column.type)
                        }
                      />
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <button
                      className="rounded-md p-2 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"
                      type="button"
                      aria-label={`Remove ${user.name}`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6H21" />
                        <path d="M8 6V4H16V6" />
                        <path d="M6 6L7 21H17L18 6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default UsersPermissionTable;
