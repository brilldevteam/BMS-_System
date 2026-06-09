import { useEffect, useState } from 'react';
import AddUserForm from '../components/user-management/AddUserForm.jsx';
import CreateRoleForm from '../components/user-management/CreateRoleForm.jsx';
import RoleCards from '../components/user-management/RoleCards.jsx';
import SignaturesPanel from '../components/user-management/SignaturesPanel.jsx';
import UserManagementHeader from '../components/user-management/UserManagementHeader.jsx';
import UserManagementTabs from '../components/user-management/UserManagementTabs.jsx';
import UsersPermissionTable from '../components/user-management/UsersPermissionTable.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import {
  createUser,
  createRole,
  deleteRole,
  getRoles,
  getUsers,
  updateUserPermissions
} from '../services/userManagementApi.js';

function UserManagement() {
  const [activeTab, setActiveTab] = useState('Create Role');
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUserSaving, setIsUserSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getRoles(), getUsers()])
      .then(([rolesData, usersData]) => {
        setRoles(rolesData);
        setUsers(usersData);
      })
      .catch(() => {
        setError('Unable to load user management data. Make sure the backend is running.');
      });
  }, []);

  const handleCreateRole = async (rolePayload) => {
    setIsSaving(true);
    setError('');

    try {
      const role = await createRole(rolePayload);
      setRoles((currentRoles) => [role, ...currentRoles]);
    } catch {
      setError('Unable to create role. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id);
      setRoles((currentRoles) => currentRoles.filter((role) => role.id !== id));
    } catch {
      setError('Unable to delete role. Please try again.');
    }
  };

  const handleCreateUser = async (userPayload) => {
    setIsUserSaving(true);
    setError('');

    try {
      const user = await createUser(userPayload);
      setUsers((currentUsers) => [...currentUsers, user]);
      setRoles((currentRoles) =>
        currentRoles.map((role) =>
          role.name === user.role
            ? { ...role, userCount: Number(role.userCount || 0) + 1 }
            : role
        )
      );
    } catch {
      setError('Unable to add user. Please check the details and try again.');
    } finally {
      setIsUserSaving(false);
    }
  };

  const handleTogglePermission = async (userId, columnKey, permissionKey, type) => {
    const user = users.find((item) => item.id === userId);

    if (!user) {
      return;
    }

    const currentPermission = user.permissions?.[columnKey] || {};
    const nextPermission =
      type === 'single'
        ? { enabled: !currentPermission.enabled }
        : {
            edit: Boolean(currentPermission.edit),
            view: Boolean(currentPermission.view),
            [permissionKey]: !currentPermission[permissionKey]
          };
    const nextPermissions = {
      ...(user.permissions || {}),
      [columnKey]: nextPermission
    };

    setUsers((currentUsers) =>
      currentUsers.map((item) =>
        item.id === userId ? { ...item, permissions: nextPermissions } : item
      )
    );
    setError('');

    try {
      const updatedUser = await updateUserPermissions(userId, nextPermissions);
      setUsers((currentUsers) =>
        currentUsers.map((item) => (item.id === userId ? updatedUser : item))
      );
    } catch {
      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === userId ? { ...item, permissions: user.permissions } : item
        )
      );
      setError('Unable to update permission. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8">
        <UserManagementHeader />
        <UserManagementTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {error ? (
          <div className="mb-5 rounded-lg border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        {activeTab === 'Create Role' ? (
          <>
            <CreateRoleForm onCreateRole={handleCreateRole} isSaving={isSaving} />
            <RoleCards roles={roles} onDeleteRole={handleDeleteRole} />
            <UsersPermissionTable
              users={users}
              onTogglePermission={handleTogglePermission}
            />
          </>
        ) : null}

        {activeTab === 'Add User' ? (
          <>
            <AddUserForm
              roles={roles}
              onCreateUser={handleCreateUser}
              isSaving={isUserSaving}
            />
            <RoleCards roles={roles} onDeleteRole={handleDeleteRole} />
            <UsersPermissionTable
              users={users}
              onTogglePermission={handleTogglePermission}
            />
          </>
        ) : null}

        {activeTab === 'Signatures' ? (
          <>
            <SignaturesPanel users={users} />
            <RoleCards roles={roles} onDeleteRole={handleDeleteRole} />
            <UsersPermissionTable
              users={users}
              onTogglePermission={handleTogglePermission}
            />
          </>
        ) : null}
      </main>
    </DashboardLayout>
  );
}

export default UserManagement;
