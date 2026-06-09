import ServiceCard from './ServiceCard.jsx';

function ServicesGrid({ services, onEditService, onDeleteService }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onEdit={onEditService}
          onDelete={onDeleteService}
        />
      ))}
    </section>
  );
}

export default ServicesGrid;
