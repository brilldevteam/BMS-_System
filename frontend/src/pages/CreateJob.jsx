import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientInformationSection from '../components/jobs/ClientInformationSection.jsx';
import CreateJobHeader from '../components/jobs/CreateJobHeader.jsx';
import DocumentsSection from '../components/jobs/DocumentsSection.jsx';
import JobDetailsSection from '../components/jobs/JobDetailsSection.jsx';
import JobIdentificationSection from '../components/jobs/JobIdentificationSection.jsx';
import ServiceInformationSection from '../components/jobs/ServiceInformationSection.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { createJob } from '../services/jobsApi.js';
import { getServices } from '../services/servicesApi.js';
import { getUsers } from '../services/userManagementApi.js';

const initialValues = {
  jobNumber: '',
  serviceType: '',
  assignedPerson: '',
  jobDetails: '',
  specialDescription: '',
  clientName: '',
  email: '',
  startingPoint: '',
  ckNumber: '',
  contactNumber: '',
  address: ''
};

const initialDocuments = {
  proposalDocument: null,
  idDocument: null,
  otherDocuments: []
};

const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
const maxFileSize = 10 * 1024 * 1024;

function CreateJob() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [documents, setDocuments] = useState(initialDocuments);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([getServices(), getUsers()])
      .then(([servicesData, usersData]) => {
        setServices(servicesData);
        setUsers(usersData);
      })
      .catch(() => {
        setSubmitError('Unable to load services or users. Make sure the backend is running.');
      });
  }, []);

  const updateField = (event) => {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const validateFiles = (files) => {
    for (const file of files) {
      const extension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        return `${file.name} is not an allowed file type.`;
      }

      if (file.size > maxFileSize) {
        return `${file.name} is larger than 10MB.`;
      }
    }

    return '';
  };

  const updateFiles = (field, fileList) => {
    const incomingFiles = Array.from(fileList || []);
    const error = validateFiles(incomingFiles);

    if (error) {
      setFileError(error);
      return;
    }

    setFileError('');
    setDocuments((current) => ({
      ...current,
      [field]: field === 'otherDocuments' ? incomingFiles : incomingFiles[0] || null
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!values.jobNumber.trim()) {
      nextErrors.jobNumber = 'Job number is required.';
    } else if (!/^[a-zA-Z0-9-]+$/.test(values.jobNumber)) {
      nextErrors.jobNumber = 'Use letters, numbers, and hyphens only.';
    }

    if (!values.serviceType) {
      nextErrors.serviceType = 'Service type is required.';
    }

    if (!values.assignedPerson) {
      nextErrors.assignedPerson = 'Assign person is required.';
    }

    if (!values.jobDetails.trim()) {
      nextErrors.jobDetails = 'Job details are required.';
    }

    if (!values.clientName.trim()) {
      nextErrors.clientName = 'Client name is required.';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!values.startingPoint.trim()) {
      nextErrors.startingPoint = 'Starting point is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (!validateForm() || fileError) {
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (documents.proposalDocument) {
      formData.append('proposalDocument', documents.proposalDocument);
    }

    if (documents.idDocument) {
      formData.append('idDocument', documents.idDocument);
    }

    documents.otherDocuments.forEach((file) => {
      formData.append('otherDocuments', file);
    });

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const createdJob = await createJob(formData);
      setValues(initialValues);
      setDocuments(initialDocuments);
      setErrors({});
      navigate('/dashboard/all-jobs', {
        state: {
          createdJob,
          message: `Job ${createdJob.jobNumber} was created successfully.`
        }
      });
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          'Unable to create job. Please check the form and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-3xl px-4 py-7 sm:px-6 lg:px-8">
        <form className="rounded-xl bg-white p-6 shadow-xl shadow-slate-200/80" onSubmit={submitForm}>
          <CreateJobHeader />

          <div className="space-y-5">
            <JobIdentificationSection values={values} errors={errors} onChange={updateField} />
            <ServiceInformationSection values={values} errors={errors} services={services} onChange={updateField} />
            <DocumentsSection documents={documents} fileErrors={fileError} onFileChange={updateFiles} />
            <JobDetailsSection values={values} errors={errors} users={users} onChange={updateField} />
            <ClientInformationSection values={values} errors={errors} onChange={updateField} />
          </div>

          {submitError ? (
            <p className="mt-5 text-sm font-medium text-rose-600">{submitError}</p>
          ) : null}

          <div className="mt-7 flex justify-end gap-4">
            <button
              className="h-10 rounded-md px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              type="button"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              className="h-10 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-sm font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </form>
      </main>
    </DashboardLayout>
  );
}

export default CreateJob;
