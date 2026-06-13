import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

export async function getJobs() {
  const response = await api.get('/jobs');
  return response.data.jobs;
}

export async function createJob(formData) {
  const response = await api.post('/jobs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data.job;
}

export async function updateJob(jobId, data) {
  const response = await api.put(`/jobs/${jobId}`, data, {
    headers: data instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }
      : undefined
  });
  return response.data.job;
}

export async function cancelJob(jobId) {
  const response = await api.patch(`/jobs/${jobId}/status`, {
    status: 'Cancelled'
  });
  return response.data.job;
}

export async function deleteJob(jobId) {
  await api.delete(`/jobs/${jobId}`);
}
