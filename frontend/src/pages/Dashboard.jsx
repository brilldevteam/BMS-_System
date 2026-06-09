import ActivityCard from '../components/dashboard/ActivityCard.jsx';
import ChartCard from '../components/dashboard/ChartCard.jsx';
import ExpiringDocsCard from '../components/dashboard/ExpiringDocsCard.jsx';
import StatsCard from '../components/dashboard/StatsCard.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

const stats = [
  {
    title: 'Total Jobs',
    value: '128',
    hint: '+12% from last month',
    icon: 'jobs',
    tone: { bg: 'bg-blue-100', text: 'text-blue-700' }
  },
  {
    title: 'Total Users',
    value: '46',
    hint: '+4 active this week',
    icon: 'users',
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
    value: '84%',
    hint: '+6% improvement',
    icon: 'rate',
    tone: { bg: 'bg-indigo-100', text: 'text-indigo-700' }
  }
];

function Dashboard() {
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

          <section className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <ChartCard
                title="Job Trends"
                subtitle="Monthly job movement placeholder"
                type="line"
              />
            </div>
            <ChartCard
              title="Task Completion"
              subtitle="Weekly completion placeholder"
              type="bars"
            />
            <ChartCard
              title="Service Distribution"
              subtitle="Service mix placeholder"
              type="donut"
            />
          </section>

          <section className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
            <ActivityCard />
            <ExpiringDocsCard />
          </section>
        </main>
    </DashboardLayout>
  );
}

export default Dashboard;
