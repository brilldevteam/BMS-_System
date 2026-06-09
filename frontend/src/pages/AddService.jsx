import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceModal from '../components/services/ServiceModal.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { createService } from '../services/servicesApi.js';

function AddService() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const closePage = () => {
    navigate('/dashboard/services');
  };

  const handleSave = async (servicePayload) => {
    setIsSaving(true);
    setError('');

    try {
      await createService(servicePayload);
      closePage();
    } catch {
      setError('Unable to create service. Please check the form and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      {error ? (
        <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
            {error}
          </div>
        </div>
      ) : null}

      <ServiceModal
        isOpen
        isSaving={isSaving}
        onClose={closePage}
        onSave={handleSave}
      />
    </DashboardLayout>
  );
}

export default AddService;
