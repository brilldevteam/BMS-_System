import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import multer from 'multer';
import prisma from '../lib/prisma.js';

const router = Router();
const storageRoot = path.resolve('..', 'uploads', 'reports');

fs.mkdirSync(storageRoot, { recursive: true });

const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png'
]);

const upload = multer({
  storage: multer.diskStorage({
    destination: (_request, _file, callback) => {
      callback(null, storageRoot);
    },
    filename: (_request, file, callback) => {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-');
      callback(null, `${Date.now()}-${safeName}`);
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 3
  },
  fileFilter: (_request, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new Error('Unsupported file type'));
      return;
    }

    callback(null, true);
  }
});

function mapReportDocument(document) {
  return {
    id: document.id,
    originalName: document.originalName,
    filename: document.fileName,
    mimetype: document.fileType,
    size: document.fileSize,
    path: document.filePath
  };
}

function groupReports(documents) {
  const groups = new Map();

  documents.forEach((document) => {
    const key = document.reportGroupId || document.id;

    if (!groups.has(key)) {
      groups.set(key, {
        id: key,
        company: document.reportCompany,
        year: document.reportYear,
        description: document.reportDescription || '',
        uploadedAt: document.createdAt.toISOString(),
        files: []
      });
    }

    groups.get(key).files.push(mapReportDocument(document));
  });

  return Array.from(groups.values()).sort(
    (first, second) => new Date(second.uploadedAt) - new Date(first.uploadedAt)
  );
}

router.get('/', async (_request, response) => {
  try {
    const documents = await prisma.document.findMany({
      where: { reportGroupId: { not: null } },
      orderBy: { createdAt: 'desc' }
    });

    response.status(200).json({ reports: groupReports(documents) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to load reports.' });
  }
});

router.post('/upload', upload.array('files', 3), async (request, response) => {
  const { company, year, description } = request.body;

  if (!company || !year) {
    response.status(400).json({ message: 'Company and year are required.' });
    return;
  }

  if (!request.files || request.files.length === 0) {
    response.status(400).json({ message: 'At least one file is required.' });
    return;
  }

  try {
    const reportGroupId = randomUUID();
    const documents = await prisma.document.createManyAndReturn({
      data: request.files.map((file) => ({
        fileName: file.filename,
        originalName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        filePath: file.path,
        uploadedBy: 'IT Team',
        category: 'financial-report',
        reportGroupId,
        reportCompany: company,
        reportYear: year,
        reportDescription: description || ''
      }))
    });

    const [report] = groupReports(documents);
    response.status(201).json({ report });
  } catch (error) {
    response.status(500).json({ message: 'Failed to upload report.' });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const documents = await prisma.document.findMany({
      where: { reportGroupId: request.params.id }
    });

    if (documents.length === 0) {
      response.status(404).json({ message: 'Report not found.' });
      return;
    }

    documents.forEach((document) => {
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }
    });

    await prisma.document.deleteMany({
      where: { reportGroupId: request.params.id }
    });

    response.status(204).send();
  } catch (error) {
    response.status(500).json({ message: 'Failed to delete report.' });
  }
});

export default router;
