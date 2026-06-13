import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

export async function getReports() {
  const response = await api.get('/reports');
  return response.data.reports;
}

export async function getReportCompanies() {
  const response = await api.get('/reports/companies');
  return response.data.companies;
}

export async function uploadReports(formData) {
  const response = await api.post('/reports/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data.report;
}

export async function deleteReport(id) {
  await api.delete(`/reports/${id}`);
}
