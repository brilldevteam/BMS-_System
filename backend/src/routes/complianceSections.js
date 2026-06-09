import { Router } from 'express';
import prisma from '../lib/prisma.js';

const router = Router();

function mapSection(section) {
  return {
    id: section.id,
    title: section.title,
    description: section.description,
    type: section.type,
    userId: section.userId,
    documents: section.documents || [],
    createdAt: section.createdAt.toISOString(),
    updatedAt: section.updatedAt.toISOString()
  };
}

router.get('/', async (request, response) => {
  try {
    const sections = await prisma.complianceSection.findMany({
      where: request.query.userId ? { userId: String(request.query.userId) } : undefined,
      include: { documents: true },
      orderBy: { createdAt: 'desc' }
    });

    response.status(200).json({ sections: sections.map(mapSection) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to load compliance sections.' });
  }
});

router.post('/', async (request, response) => {
  const { userId, title, description = '', type = 'custom' } = request.body;

  if (!userId || !title) {
    response.status(400).json({ message: 'User and section title are required.' });
    return;
  }

  try {
    const section = await prisma.complianceSection.create({
      data: {
        userId,
        title: title.trim(),
        description,
        type
      },
      include: { documents: true }
    });

    response.status(201).json({ section: mapSection(section) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to create compliance section.' });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const section = await prisma.complianceSection.update({
      where: { id: request.params.id },
      data: {
        title: request.body.title,
        description: request.body.description,
        type: request.body.type
      },
      include: { documents: true }
    });

    response.status(200).json({ section: mapSection(section) });
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Compliance section not found.' });
      return;
    }

    response.status(500).json({ message: 'Failed to update compliance section.' });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    await prisma.complianceSection.delete({ where: { id: request.params.id } });
    response.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Compliance section not found.' });
      return;
    }

    response.status(500).json({ message: 'Failed to delete compliance section.' });
  }
});

export default router;
