import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmptyJobsState from '../components/jobs-management/EmptyJobsState.jsx';
import JobActionModal from '../components/jobs-management/JobActionModal.jsx';
import JobsFilters from '../components/jobs-management/JobsFilters.jsx';
import JobsHeader from '../components/jobs-management/JobsHeader.jsx';
import JobsStats from '../components/jobs-management/JobsStats.jsx';
import JobsTable from '../components/jobs-management/JobsTable.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { getServices } from '../services/servicesApi.js';
import { getUsers } from '../services/userManagementApi.js';
import {
  cancelJob,
  deleteJob,
  getJobs,
  updateJob
} from '../services/jobsApi.js';

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
  const location = useLocation();
  const navigate = useNavigate();
  const createdJob = location.state?.createdJob;
  const [jobs, setJobs] = useState(createdJob ? [createdJob] : []);
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || ''
  );
  const [modal, setModal] = useState({ mode: null, job: null });
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState('');
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([getJobs(), getServices(), getUsers()])
      .then(([data, servicesData, usersData]) => {
        setJobs((currentJobs) => {
          const jobsById = new Map(
            [...currentJobs, ...data].map((job) => [job.id, job])
          );
          return Array.from(jobsById.values());
        });
        setServices(servicesData);
        setUsers(usersData);
        setError('');
      })
      .catch(() => {
        setError('Unable to load jobs. Make sure the backend is running.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!location.state) {
      return;
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

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

  const replaceJob = (updatedJob) => {
    setJobs((current) =>
      current.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  const openEditJob = (job) => {
    setActionError('');
    setModal({ mode: 'edit', job });
  };

  const handleAction = async (action, job) => {
    setActionError('');

    if (action === 'edit') {
      openEditJob(job);
      return;
    }

    if (action === 'cancel') {
      const confirmed = window.confirm(`Cancel job ${job.jobNumber}?`);

      if (!confirmed) {
        return;
      }

      try {
        const updatedJob = await cancelJob(job.id);
        replaceJob(updatedJob);
        setSuccessMessage(`Job ${job.jobNumber} was cancelled.`);
      } catch (cancelError) {
        setError(
          cancelError.response?.data?.message || 'Unable to cancel this job.'
        );
      }
      return;
    }

    setModal({ mode: action, job });
  };

  const saveJob = async ({ values, files }) => {
    setIsSaving(true);
    setActionError('');

    try {
      const formData = new FormData();
      [
        'jobNumber',
        'serviceType',
        'assignedPerson',
        'jobDetails',
        'specialDescription',
        'clientName',
        'email',
        'startingPoint',
        'ckNumber',
        'contactNumber',
        'address'
      ].forEach((field) => formData.append(field, values[field] || ''));

      if (files.proposalDocument) {
        formData.append('proposalDocument', files.proposalDocument);
      }
      if (files.idDocument) {
        formData.append('idDocument', files.idDocument);
      }
      files.otherDocuments.forEach((file) =>
        formData.append('otherDocuments', file)
      );

      const updatedJob = await updateJob(values.id, formData);
      replaceJob(updatedJob);
      setModal({ mode: null, job: null });
      setSuccessMessage(`Job ${updatedJob.jobNumber} was updated.`);
    } catch (updateError) {
      setActionError(
        updateError.response?.data?.message || 'Unable to update this job.'
      );
    } finally {
      setIsSaving(false);
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

          {successMessage ? (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
              <span>{successMessage}</span>
              <button
                type="button"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                onClick={() => setSuccessMessage('')}
              >
                Dismiss
              </button>
            </div>
          ) : null}

          {isLoading ? (
            <section className="rounded-xl bg-white px-6 py-16 text-center shadow-md shadow-slate-200/80">
              <p className="text-sm font-medium text-slate-500">Loading jobs...</p>
            </section>
          ) : visibleJobs.length > 0 ? (
            <JobsTable
              jobs={visibleJobs}
              onAction={handleAction}
              onEditJob={openEditJob}
              onDeleteJob={removeJob}
            />
          ) : (
            <EmptyJobsState hasFilters={Boolean(hasFilters)} />
          )}
        </div>
      </main>

      <JobActionModal
        job={modal.job}
        mode={modal.mode}
        onClose={() => {
          setModal({ mode: null, job: null });
          setActionError('');
        }}
        onSave={saveJob}
        onEdit={() => openEditJob(modal.job)}
        onCancelJob={async () => {
          const job = modal.job;
          setModal({ mode: null, job: null });
          await handleAction('cancel', job);
        }}
        services={services}
        users={users}
        isSaving={isSaving}
        error={actionError}
      />
    </DashboardLayout>
  );
}

export default AllJobs;
