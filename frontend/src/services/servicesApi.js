import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

export async function getServices() {
  const response = await api.get('/services');
  return response.data.services;
}

export async function createService(service) {
  const response = await api.post('/services', service);
  return response.data.service;
}

export async function updateService(id, service) {
  const response = await api.put(`/services/${id}`, service);
  return response.data.service;
}

export async function deleteService(id) {
  await api.delete(`/services/${id}`);
}
