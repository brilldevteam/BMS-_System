import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

export async function getRoles() {
  const response = await api.get('/roles');
  return response.data.roles;
}

export async function createRole(role) {
  const response = await api.post('/roles', role);
  return response.data.role;
}

export async function updateRole(id, role) {
  const response = await api.put(`/roles/${id}`, role);
  return response.data.role;
}

export async function deleteRole(id) {
  await api.delete(`/roles/${id}`);
}

export async function getUsers() {
  const response = await api.get('/users');
  return response.data.users;
}

export async function createUser(user) {
  const response = await api.post('/users', user);
  return response.data.user;
}

export async function updateUserPermissions(userId, permissions) {
  const response = await api.put(`/users/${userId}/permissions`, { permissions });
  return response.data.user;
}
