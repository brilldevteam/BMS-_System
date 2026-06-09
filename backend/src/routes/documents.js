import fs from 'node:fs';
import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import prisma from '../lib/prisma.js';

const router = Router();
const storageRoot = path.resolve('..', 'uploads', 'documents');

fs.mkdirSync(storageRoot, { recursive: true });

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
    fileSize: 50 * 1024 * 1024
  }
});

function mapDocument(document) {
  return {
    id: document.id,
    fileName: document.fileName,
    originalName: document.originalName,
    fileType: document.fileType,
    fileSize: document.fileSize,
    filePath: document.filePath,
    uploadedBy: document.uploadedBy,
    uploadedByUserId: document.uploadedByUserId,
    jobId: document.jobId,
    complianceSectionId: document.complianceSectionId,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString()
  };
}

router.get('/', async (request, response) => {
  try {
    const documents = await prisma.document.findMany({
      where: {
        jobId: request.query.jobId ? String(request.query.jobId) : undefined,
        complianceSectionId: request.query.complianceSectionId
          ? String(request.query.complianceSectionId)
          : undefined
      },
      orderBy: { createdAt: 'desc' }
    });

    response.status(200).json({ documents: documents.map(mapDocument) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to load documents.' });
  }
});

router.post('/upload', upload.single('file'), async (request, response) => {
  if (!request.file) {
    response.status(400).json({ message: 'A file is required.' });
    return;
  }

  try {
    const document = await prisma.document.create({
      data: {
        fileName: request.file.filename,
        originalName: request.file.originalname,
        fileType: request.file.mimetype,
        fileSize: request.file.size,
        filePath: request.file.path,
        uploadedBy: request.body.uploadedBy || 'IT Team',
        uploadedByUserId: request.body.uploadedByUserId || undefined,
        jobId: request.body.jobId || undefined,
        complianceSectionId: request.body.complianceSectionId || undefined,
        category: request.body.category || undefined
      }
    });

    response.status(201).json({ document: mapDocument(document) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to upload document.' });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const document = await prisma.document.findUnique({ where: { id: request.params.id } });

    if (!document) {
      response.status(404).json({ message: 'Document not found.' });
      return;
    }

    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await prisma.document.delete({ where: { id: request.params.id } });
    response.status(204).send();
  } catch (error) {
    response.status(500).json({ message: 'Failed to delete document.' });
  }
});

export default router;
