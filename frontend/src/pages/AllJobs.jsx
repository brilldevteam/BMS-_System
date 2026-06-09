import { useEffect, useMemo, useState } from 'react';
import EmptyJobsState from '../components/jobs-management/EmptyJobsState.jsx';
import JobsFilters from '../components/jobs-management/JobsFilters.jsx';
import JobsHeader from '../components/jobs-management/JobsHeader.jsx';
import JobsStats from '../components/jobs-management/JobsStats.jsx';
import JobsTable from '../components/jobs-management/JobsTable.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { deleteJob, getJobs } from '../services/jobsApi.js';

const initialFilters = {
  search: '',
  status: 'all',
  sort: 'newest'
};

function toSearchText(job) {
  return [
    job.jobNumber,
    job.id,
    job.clientName,
    job.email,
    job.serviceType,
    job.assignedPerson,
    job.startingPoint,
    job.status
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function makeCsv(jobs) {
  const headers = [
    'Job Number',
    'Service Type',
    'Assigned Person',
    'Client Name',
    'Email',
    'Starting Point',
    'Status',
    'Created At'
  ];

  const rows = jobs.map((job) => [
    job.jobNumber,
    job.serviceType,
    job.assignedPerson,
    job.clientName,
    job.email,
    job.startingPoint,
    job.status,
    job.createdAt
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell || '').replaceAll('"', '""')}"`).join(','))
    .join('\n');
}

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getJobs()
      .then((data) => {
        setJobs(data);
        setError('');
      })
      .catch(() => {
        setError('Unable to load jobs. Make sure the backend is running.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleJobs = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return jobs
      .filter((job) => (filters.status === 'all' ? true : job.status?.toLowerCase() === filters.status))
      .filter((job) => (search ? toSearchText(job).includes(search) : true))
      .sort((first, second) => {
        if (filters.sort === 'oldest') {
          return new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime();
        }

        if (filters.sort === 'client') {
          return (first.clientName || '').localeCompare(second.clientName || '');
        }

        if (filters.sort === 'service') {
          return (first.serviceType || '').localeCompare(second.serviceType || '');
        }

        return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
      });
  }, [filters, jobs]);

  const hasFilters = filters.search.trim() || filters.status !== 'all';

  const exportJobs = () => {
    const blob = new Blob([makeCsv(visibleJobs)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bms-jobs.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeJob = async (job) => {
    const confirmed = window.confirm(`Delete job ${job.jobNumber}?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteJob(job.id);
      setJobs((current) => current.filter((item) => item.id !== job.id));
    } catch {
      setError('Unable to delete this job. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <JobsHeader jobs={visibleJobs} onExport={exportJobs} />
          <JobsStats jobs={jobs} />
          <JobsFilters filters={filters} onChange={setFilters} />

          {error ? (
            <div className="rounded-xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <section className="rounded-xl bg-white px-6 py-16 text-center shadow-md shadow-slate-200/80">
              <p className="text-sm font-medium text-slate-500">Loading jobs...</p>
            </section>
          ) : visibleJobs.length > 0 ? (
            <JobsTable jobs={visibleJobs} onDeleteJob={removeJob} />
          ) : (
            <EmptyJobsState hasFilters={Boolean(hasFilters)} />
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}

export default AllJobs;
