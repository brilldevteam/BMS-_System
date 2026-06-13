import { useEffect, useState } from 'react';
import ActivityCard from '../components/dashboard/ActivityCard.jsx';
import AllUsersModal from '../components/dashboard/AllUsersModal.jsx';
import ChartCard from '../components/dashboard/ChartCard.jsx';
import ExpiringDocsCard from '../components/dashboard/ExpiringDocsCard.jsx';
import StatsCard from '../components/dashboard/StatsCard.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { getJobs } from '../services/jobsApi.js';
import { getUsers } from '../services/userManagementApi.js';

const taskCompletionData = {
  all: [
    { label: 'Week 1', completed: 18, pending: 5 },
    { label: 'Week 2', completed: 24, pending: 7 },
    { label: 'Week 3', completed: 21, pending: 4 },
    { label: 'Week 4', completed: 27, pending: 6 }
  ],
  registration: [
    { label: 'Week 1', completed: 7, pending: 2 },
    { label: 'Week 2', completed: 10, pending: 3 },
    { label: 'Week 3', completed: 8, pending: 1 },
    { label: 'Week 4', completed: 12, pending: 2 }
  ],
  filing: [
    { label: 'Week 1', completed: 6, pending: 2 },
    { label: 'Week 2', completed: 8, pending: 2 },
    { label: 'Week 3', completed: 9, pending: 2 },
    { label: 'Week 4', completed: 8, pending: 3 }
  ],
  licensing: [
    { label: 'Week 1', completed: 5, pending: 1 },
    { label: 'Week 2', completed: 6, pending: 2 },
    { label: 'Week 3', completed: 4, pending: 1 },
    { label: 'Week 4', completed: 7, pending: 1 }
  ]
};

const taskFilterOptions = [
  { value: 'all', label: 'All Tasks' },
  { value: 'registration', label: 'Registration' },
  { value: 'filing', label: 'Filing' },
  { value: 'licensing', label: 'Licensing' }
];

function Dashboard() {
  const [taskFilter, setTaskFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');

  const loadUsers = async () => {
    setIsUsersLoading(true);
    setUsersError('');

    try {
      setUsers(await getUsers());
    } catch {
      setUsersError('Unable to load team members. Make sure the backend is running.');
    } finally {
      setIsUsersLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    getJobs()
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setIsJobsLoading(false));
  }, []);

  const openUsers = () => {
    setIsUsersOpen(true);
  };

  const approvedJobs = jobs.filter(
    (job) => job.status?.toLowerCase() === 'approved'
  ).length;
  const completionRate =
    jobs.length > 0 ? Math.round((approvedJobs / jobs.length) * 100) : 0;

  const stats = [
    {
      title: 'Total Jobs',
      value: isJobsLoading ? '...' : jobs.length,
      hint: 'View all jobs',
      icon: 'jobs',
      href: '/dashboard/all-jobs',
      tone: { bg: 'bg-blue-100', text: 'text-blue-700' }
    },
    {
      title: 'Total Users',
      value: isUsersLoading ? '...' : users.length,
      hint: 'View all team members',
      icon: 'users',
      onClick: openUsers,
      tone: { bg: 'bg-violet-100', text: 'text-violet-700' }
    },
    {
      title: 'Online Users',
      value: '18',
      hint: 'Currently available',
      icon: 'online',
      tone: { bg: 'bg-emerald-100', text: 'text-emerald-700' }
    },
    {
      title: 'Completion Rate',
      value: isJobsLoading ? '...' : `${completionRate}%`,
      hint: `${approvedJobs} of ${jobs.length} jobs approved`,
      icon: 'rate',
      href: '/dashboard/all-jobs',
      tone: { bg: 'bg-indigo-100', text: 'text-indigo-700' }
    }
  ];

  return (
    <DashboardLayout>
        <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
          <section className="mb-6 rounded-xl bg-white p-6 shadow-md shadow-slate-200/80 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-600">
                  Business Operations
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
                  Dashboard Overview
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  Welcome back. Monitor jobs, users, completion progress, and key
                  operational alerts from one clean workspace.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
                <div className="rounded-lg bg-violet-50 p-4">
                  <p className="text-xs font-normal text-violet-700">Active Workflows</p>
                  <p className="mt-2 text-2xl font-semibold text-violet-900">24</p>
                </div>
                <div className="rounded-lg bg-sky-50 p-4">
                  <p className="text-xs font-normal text-sky-700">Pending Reviews</p>
                  <p className="mt-2 text-2xl font-semibold text-sky-900">9</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </section>

          <section className="mt-6 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-2">
            <ChartCard
              title="Job Trends"
              type="line"
              trendLabel="+15.3% vs last period"
            />
            <ChartCard
              title="Task Completion"
              subtitle="Weekly completion by task type"
              type="task-completion"
              taskCompletionData={taskCompletionData[taskFilter]}
              filter={{
                label: 'Filter task completion',
                value: taskFilter,
                options: taskFilterOptions,
                onChange: setTaskFilter
              }}
            />
          </section>

          <section className="mt-6 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
            <ChartCard
              title="Service Distribution"
              subtitle="Service mix placeholder"
              type="donut"
            />
            <ActivityCard />
            <ExpiringDocsCard />
          </section>
        </main>

        {isUsersOpen ? (
          <AllUsersModal
            users={users}
            isLoading={isUsersLoading}
            error={usersError}
            onClose={() => setIsUsersOpen(false)}
          />
        ) : null}
    </DashboardLayout>
  );
}

export default Dashboard;
