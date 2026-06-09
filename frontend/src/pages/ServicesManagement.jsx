import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceModal from '../components/services/ServiceModal.jsx';
import ServicesGrid from '../components/services/ServicesGrid.jsx';
import ServicesHeader from '../components/services/ServicesHeader.jsx';
import ServicesSearch from '../components/services/ServicesSearch.jsx';
import ServicesStats from '../components/services/ServicesStats.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import {
  createService,
  deleteService,
  getServices,
  updateService
} from '../services/servicesApi.js';

function ServicesManagement() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(() => setError('Unable to load services. Make sure the backend is running.'));
  }, []);

  const filteredServices = useMemo(() => {
    const search = searchValue.toLowerCase();

    return services.filter((service) => {
      if (!search) {
        return true;
      }

      return (
        service.title.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search)
      );
    });
  }, [searchValue, services]);

  const openCreateModal = () => {
    navigate('/dashboard/services/add');
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const handleSaveService = async (servicePayload) => {
    setIsSaving(true);
    setError('');

    try {
      if (selectedService) {
        const updatedService = await updateService(selectedService.id, servicePayload);
        setServices((currentServices) =>
          currentServices.map((service) =>
            service.id === updatedService.id ? updatedService : service
          )
        );
      } else {
        const service = await createService(servicePayload);
        setServices((currentServices) => [service, ...currentServices]);
      }

      closeModal();
    } catch {
      setError('Unable to save service. Please check the form and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);
      setServices((currentServices) =>
        currentServices.filter((service) => service.id !== id)
      );
    } catch {
      setError('Unable to delete service. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8">
        <ServicesHeader onAddService={openCreateModal} />
        <ServicesStats services={services} />
        <ServicesSearch searchValue={searchValue} onSearchChange={setSearchValue} />

        {error ? (
          <div className="mb-5 rounded-lg border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <ServicesGrid
          services={filteredServices}
          onEditService={openEditModal}
          onDeleteService={handleDeleteService}
        />

        <ServiceModal
          isOpen={isModalOpen}
          service={selectedService}
          isSaving={isSaving}
          onClose={closeModal}
          onSave={handleSaveService}
        />
      </main>
    </DashboardLayout>
  );
}

export default ServicesManagement;
