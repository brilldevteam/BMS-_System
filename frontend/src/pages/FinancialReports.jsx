import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../components/reports/EmptyState.jsx';
import ReportsFilters from '../components/reports/ReportsFilters.jsx';
import ReportsHeader from '../components/reports/ReportsHeader.jsx';
import ReportsTable from '../components/reports/ReportsTable.jsx';
import StatsCards from '../components/reports/StatsCards.jsx';
import UploadModal from '../components/reports/UploadModal.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import {
  deleteReport,
  getReportCompanies,
  getReports,
  uploadReports
} from '../services/reportsApi.js';

const defaultFilters = {
  search: '',
  company: '',
  year: '',
  fileType: '',
  sort: 'newest',
  fromDate: '',
  toDate: ''
};

function FinancialReports() {
  const [reports, setReports] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getReports(), getReportCompanies()])
      .then(([nextReports, nextCompanies]) => {
        setReports(nextReports);
        setCompanies(nextCompanies);
      })
      .catch(() => setError('Unable to load reports. Make sure the backend is running.'));
  }, []);

  const filteredReports = useMemo(() => {
    return reports
      .filter((report) => {
        const searchValue = filters.search.toLowerCase();
        const matchesSearch =
          !searchValue ||
          report.company.toLowerCase().includes(searchValue) ||
          report.description.toLowerCase().includes(searchValue);
        const matchesCompany = !filters.company || report.company === filters.company;
        const matchesYear = !filters.year || String(report.year) === filters.year;
        const matchesFileType =
          !filters.fileType ||
          report.files.some((file) => {
            const name = file.originalName.toLowerCase();

            if (filters.fileType === 'pdf') {
              return name.endsWith('.pdf');
            }

            if (filters.fileType === 'doc') {
              return name.endsWith('.doc') || name.endsWith('.docx');
            }

            if (filters.fileType === 'xls') {
              return name.endsWith('.xls') || name.endsWith('.xlsx');
            }

            if (filters.fileType === 'image') {
              return name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png');
            }

            return true;
          });
        const uploadedTime = new Date(report.uploadedAt).getTime();
        const matchesFromDate =
          !filters.fromDate || uploadedTime >= new Date(filters.fromDate).getTime();
        const matchesToDate =
          !filters.toDate || uploadedTime <= new Date(filters.toDate).getTime() + 24 * 60 * 60 * 1000;

        return (
          matchesSearch &&
          matchesCompany &&
          matchesYear &&
          matchesFileType &&
          matchesFromDate &&
          matchesToDate
        );
      })
      .sort((first, second) => {
        if (filters.sort === 'oldest') {
          return new Date(first.uploadedAt) - new Date(second.uploadedAt);
        }

        if (filters.sort === 'company') {
          return first.company.localeCompare(second.company);
        }

        if (filters.sort === 'year') {
          return Number(second.year) - Number(first.year);
        }

        return new Date(second.uploadedAt) - new Date(first.uploadedAt);
      });
  }, [filters, reports]);

  const handleUpload = async (values, files) => {
    const formData = new FormData();
    formData.append('companyId', values.companyId);
    formData.append('year', values.year);
    formData.append('description', values.description || '');
    files.forEach((file) => formData.append('files', file));

    setIsUploading(true);
    setError('');

    try {
      const report = await uploadReports(formData);
      setReports((currentReports) => [report, ...currentReports]);
      setFilters(defaultFilters);
    } catch (uploadError) {
      setError(
        uploadError.response?.data?.message ||
          'Upload failed. Please check the file type, file size, and backend server.'
      );
      throw uploadError;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteReport(id);
    setReports((currentReports) => currentReports.filter((report) => report.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-3">
            <div className="text-violet-600">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 18V13" />
                <path d="M12 18V8" />
                <path d="M17 18V5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-950">Reports</h1>
              <p className="mt-1 text-xs font-normal text-slate-600">
                Manage financial statements, tax returns, and other important documents
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] gap-7 overflow-x-auto">
          <button className="border-b-2 border-violet-600 px-1 py-4 text-xs font-medium text-violet-700">
            Financial Statements
          </button>
          <button className="px-1 py-4 text-xs font-normal text-slate-400">
            Other Reports <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-600">Coming Soon</span>
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] space-y-6 bg-slate-50 px-4 py-7 sm:px-6 lg:px-8">
        <ReportsHeader onAddDocuments={() => setIsModalOpen(true)} />

        <StatsCards reports={reports} />

        <ReportsFilters
          companies={companies}
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(defaultFilters)}
        />

        {error ? (
          <div className="rounded-lg border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        {filteredReports.length > 0 ? (
          <ReportsTable reports={filteredReports} onDelete={handleDelete} />
        ) : (
          <EmptyState onUpload={() => setIsModalOpen(true)} />
        )}

        <UploadModal
          companies={companies}
          isOpen={isModalOpen}
          isUploading={isUploading}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
        />
      </main>
    </DashboardLayout>
  );
}

export default FinancialReports;
