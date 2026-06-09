import { Router } from 'express';
import prisma from '../lib/prisma.js';

const router = Router();

function mapService(service) {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    status: service.status,
    category: service.category,
    departments: service.departments,
    assignedRoles: service.assignedRoles,
    usageCount: service.usageCount,
    jobAssignmentCount: service._count?.jobs || 0,
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString()
  };
}

router.get('/', async (_request, response) => {
  try {
    const services = await prisma.service.findMany({
      include: { _count: { select: { jobs: true } } },
      orderBy: { createdAt: 'desc' }
    });

    response.status(200).json({ services: services.map(mapService) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to load services.' });
  }
});

router.post('/', async (request, response) => {
  const {
    title,
    description,
    status = 'Active',
    category,
    departments = [],
    assignedRoles = [],
    usageCount = 0
  } = request.body;

  if (!title || !description || !category) {
    response.status(400).json({ message: 'Title, description, and category are required.' });
    return;
  }

  try {
    const service = await prisma.service.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        status,
        category: category.trim(),
        departments: Array.isArray(departments) ? departments : [],
        assignedRoles: Array.isArray(assignedRoles) ? assignedRoles : [],
        usageCount: Number(usageCount || 0)
      },
      include: { _count: { select: { jobs: true } } }
    });

    response.status(201).json({ service: mapService(service) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to create service.' });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const service = await prisma.service.update({
      where: { id: request.params.id },
      data: request.body,
      include: { _count: { select: { jobs: true } } }
    });

    response.status(200).json({ service: mapService(service) });
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Service not found.' });
      return;
    }

    response.status(500).json({ message: 'Failed to update service.' });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    await prisma.service.delete({ where: { id: request.params.id } });
    response.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Service not found.' });
      return;
    }

    response.status(500).json({ message: 'Failed to delete service.' });
  }
});

export default router;
