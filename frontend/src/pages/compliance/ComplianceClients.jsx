import { useMemo, useState } from 'react';
import { ArrowLeft, Download, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ComplianceClientTable from '../../components/compliance/ComplianceClientTable.jsx';
import ComplianceStatsCard from '../../components/compliance/ComplianceStatsCard.jsx';

const stats = [
  { value: 219, label: 'Total Clients', tone: 'blue' },
  { value: 175, label: 'Active', tone: 'green' },
  { value: 0, label: 'Pending', tone: 'yellow' },
  { value: 44, label: 'Inactive', tone: 'red' },
  { value: 9, label: 'EDD Clients', tone: 'purple' }
];

const headlineTotals = {
  'Total Clients': 219,
  Active: 175,
  Pending: 0,
  Inactive: 44,
  'EDD Clients': 9
};

const primaryClients = [
  {
    code: '219',
    initial: 'M',
    name: 'MORPHEUS Creative Marketing LLC',
    crNumber: 'CR5.88',
    cddType: 'EDD',
    status: 'Active',
    riskLevel: 'Medium',
    latestReview: 'Jun 02, 2026'
  },
  {
    code: '218',
    initial: 'L',
    name: 'Legacy Holdings LLC',
    crNumber: '01703',
    cddType: 'SDD',
    status: 'Inactive',
    riskLevel: 'Low',
    latestReview: 'Apr 01, 2026'
  },
  {
    code: '217',
    initial: 'R',
    name: 'REVOTECH LLC',
    crNumber: '04114',
    cddType: 'SDD',
    status: 'Active',
    riskLevel: 'Low',
    latestReview: 'May 25, 2026'
  },
  {
    code: '216',
    initial: 'L',
    name: 'Legacy Assets LLC',
    crNumber: '02156',
    cddType: 'SDD',
    status: 'Inactive',
    riskLevel: 'Low',
    latestReview: 'Apr 03, 2026'
  },
  {
    code: '215',
    initial: 'F',
    name: 'Frutini Holding LLC',
    crNumber: 'CR5.36',
    cddType: 'SDD',
    status: 'Inactive',
    riskLevel: 'Low',
    latestReview: 'Apr 03, 2026'
  },
  {
    code: '214',
    initial: 'Q',
    name: 'Qbot Sukuk LLC',
    crNumber: '02128',
    cddType: 'SDD',
    status: 'Inactive',
    riskLevel: 'Low',
    latestReview: 'Apr 13, 2026'
  },
  {
    code: '213',
    initial: 'M',
    name: 'Malitan Investment LLC',
    crNumber: '01865',
    cddType: 'Select',
    status: 'Inactive',
    riskLevel: 'High',
    latestReview: 'Jun 02, 2026'
  },
  {
    code: '212',
    initial: 'I',
    name: 'Iraqi Global LLC',
    crNumber: '03555',
    cddType: 'SDD',
    status: 'Inactive',
    riskLevel: 'Low',
    latestReview: 'Apr 01, 2026'
  },
  {
    code: '211',
    initial: 'F',
    name: 'Frutini Global SPC LLC',
    crNumber: '02535',
    cddType: 'SDD',
    status: 'Inactive',
    riskLevel: 'Low',
    latestReview: 'Apr 03, 2026'
  },
  {
    code: '210',
    initial: 'H',
    name: 'HCP Technologies LLC',
    crNumber: '04156',
    cddType: 'SDD',
    status: 'Inactive',
    riskLevel: 'Low',
    latestReview: 'Apr 01, 2026'
  }
];

const additionalClients = [
  ['209', 'A', 'Apex Corporate Services LLC', '03982', 'EDD', 'Active', 'High', 'May 28, 2026'],
  ['208', 'N', 'Nexora Advisory LLC', '02847', 'SDD', 'Active', 'Low', 'May 26, 2026'],
  ['207', 'B', 'Blue Peak Holdings LLC', '03215', 'EDD', 'Active', 'Medium', 'May 22, 2026'],
  ['206', 'O', 'Orion Business Solutions LLC', '04691', 'SDD', 'Active', 'Low', 'May 20, 2026'],
  ['205', 'C', 'Crestline Ventures LLC', '05120', 'EDD', 'Active', 'High', 'May 18, 2026'],
  ['204', 'S', 'Summit Gulf Trading LLC', '04408', 'SDD', 'Active', 'Low', 'May 15, 2026'],
  ['203', 'V', 'Vertex Consulting SPC', '03774', 'EDD', 'Active', 'Medium', 'May 12, 2026'],
  ['202', 'P', 'Prime Axis Management LLC', '02963', 'SDD', 'Active', 'Low', 'May 10, 2026'],
  ['201', 'G', 'Global Bridge Partners LLC', '04832', 'EDD', 'Active', 'High', 'May 08, 2026'],
  ['200', 'E', 'Elevate Capital Services LLC', '05241', 'SDD', 'Active', 'Low', 'May 05, 2026'],
  ['199', 'A', 'Ardent Commercial LLC', '02681', 'EDD', 'Active', 'Medium', 'May 03, 2026'],
  ['198', 'S', 'Silverline Corporate LLC', '03179', 'SDD', 'Active', 'Low', 'Apr 29, 2026'],
  ['197', 'N', 'Northstar Advisory LLC', '04367', 'EDD', 'Active', 'High', 'Apr 27, 2026'],
  ['196', 'M', 'Meridian Business Group LLC', '03454', 'SDD', 'Active', 'Low', 'Apr 24, 2026'],
  ['195', 'H', 'Horizon Fiduciary Services LLC', '04770', 'EDD', 'Active', 'Medium', 'Apr 22, 2026'],
  ['194', 'C', 'Corestone Management LLC', '03811', 'SDD', 'Active', 'Low', 'Apr 20, 2026'],
  ['193', 'P', 'Pioneer Assets LLC', '02446', 'SDD', 'Inactive', 'Low', 'Apr 18, 2026'],
  ['192', 'D', 'Delta Crest Investments LLC', '04205', 'SDD', 'Inactive', 'Medium', 'Apr 15, 2026'],
  ['191', 'R', 'Redwood Global LLC', '03660', 'SDD', 'Inactive', 'Low', 'Apr 12, 2026'],
  ['190', 'T', 'Trident Corporate Services LLC', '04918', 'SDD', 'Inactive', 'Low', 'Apr 10, 2026']
].map(
  ([code, initial, name, crNumber, cddType, status, riskLevel, latestReview]) => ({
    code,
    initial,
    name,
    crNumber,
    cddType,
    status,
    riskLevel,
    latestReview
  })
);

const clients = [...primaryClients, ...additionalClients];
const clientsPerPage = 10;

function escapeCsvValue(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

function ComplianceClients() {
  const [activeFilter, setActiveFilter] = useState('Total Clients');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = useMemo(() => {
    let matchingClients = clients;

    if (activeFilter === 'Active' || activeFilter === 'Inactive') {
      matchingClients = clients.filter((client) => client.status === activeFilter);
    }

    if (activeFilter === 'Pending') {
      matchingClients = clients.filter((client) => client.status === 'Pending');
    }

    if (activeFilter === 'EDD Clients') {
      matchingClients = clients.filter((client) => client.cddType === 'EDD');
    }

    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return matchingClients;
    }

    return matchingClients.filter((client) =>
      [client.code, client.name, client.crNumber, client.cddType, client.status]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [activeFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredClients.length / clientsPerPage));
  const pageStartIndex = (currentPage - 1) * clientsPerPage;
  const visibleClients = filteredClients.slice(
    pageStartIndex,
    pageStartIndex + clientsPerPage
  );
  const headlineTotal = searchTerm
    ? filteredClients.length
    : headlineTotals[activeFilter];

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const updateSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const exportClients = () => {
    if (filteredClients.length === 0) {
      return;
    }

    const headers = [
      'Client Code',
      'Client Name',
      'CR No',
      'CDD Type',
      'Status',
      'Risk Level',
      'Latest Review'
    ];
    const rows = filteredClients.map((client) => [
      client.code,
      client.name,
      client.crNumber,
      client.cddType,
      client.status,
      client.riskLevel,
      client.latestReview
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(','))
      .join('\r\n');
    const blob = new Blob([`\uFEFF${csv}`], {
      type: 'text/csv;charset=utf-8'
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filterName = activeFilter.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    link.href = downloadUrl;
    link.download = `compliance-clients-${filterName}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <main className="min-h-screen bg-[#f3f6ff] text-slate-950">
      <section className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 px-5 py-11 text-center text-white shadow-lg shadow-violet-200/60 sm:py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 shadow-lg shadow-purple-950/10 ring-1 ring-white/15">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Compliance Clients
          </h1>
          <p className="mt-3 max-w-3xl text-xs font-medium leading-5 text-white/90 sm:text-sm">
            Comprehensive client compliance management with KYC verification, risk
            screening, and ongoing monitoring
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 py-7 sm:px-6 lg:px-8">
        <Link
          to="/compliance-management"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 text-xs font-semibold text-blue-700 shadow-md shadow-blue-100/80 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Compliance
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white bg-white shadow-xl shadow-slate-300/60">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={updateSearch}
                  placeholder="Search clients, person details, company info..."
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </label>
              <button
                type="button"
                onClick={exportClients}
                disabled={filteredClients.length === 0}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-xs font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat) => (
                <ComplianceStatsCard
                  key={stat.label}
                  {...stat}
                  active={activeFilter === stat.label}
                  onClick={() => selectFilter(stat.label)}
                />
              ))}
            </div>
          </div>

          <ComplianceClientTable
            clients={visibleClients}
            activeFilter={activeFilter}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={headlineTotal}
            pageStart={pageStartIndex + 1}
            pageEnd={pageStartIndex + visibleClients.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </main>
  );
}

export default ComplianceClients;
