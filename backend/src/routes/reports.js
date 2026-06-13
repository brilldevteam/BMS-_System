import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { Prisma } from '@prisma/client';
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
    destination: (_request, _file, callback) => callback(null, storageRoot),
    filename: (_request, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${randomUUID()}${extension}`);
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 3
  },
  fileFilter: (_request, file, callback) => {
    callback(
      allowedMimeTypes.has(file.mimetype) ? null : new Error('Unsupported file type'),
      allowedMimeTypes.has(file.mimetype)
    );
  }
});

function removeUploadedFiles(files = []) {
  files.forEach((file) => {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  });
}

function mapReport(statement) {
  return {
    id: statement.id,
    company: statement.company.name,
    companyId: statement.companyId,
    year: statement.year,
    description: statement.description || '',
    uploadedAt: statement.createdAt.toISOString(),
    files: statement.files.map((file) => ({
      id: file.id,
      originalName: file.originalName,
      filename: file.storedName,
      mimetype: file.fileType,
      size: Number(file.fileSize || 0),
      path: file.filePath
    }))
  };
}

router.get('/companies', async (_request, response) => {
  try {
    const companies = await prisma.company.findMany({ orderBy: { name: 'asc' } });
    response.status(200).json({ companies });
  } catch (error) {
    console.error('Failed to load report companies:', error);
    response.status(500).json({ message: 'Failed to load companies.' });
  }
});

router.get('/', async (_request, response) => {
  try {
    const statements = await prisma.financialStatement.findMany({
      include: {
        company: true,
        files: { orderBy: { uploadedAt: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    response.status(200).json({ reports: statements.map(mapReport) });
  } catch (error) {
    console.error('Failed to load reports:', error);
    response.status(500).json({ message: 'Failed to load reports.' });
  }
});

router.post('/upload', upload.array('files', 3), async (request, response) => {
  const companyId = Number(request.body.companyId);
  const year = Number(request.body.year);
  const description = request.body.description?.trim() || null;

  if (!Number.isInteger(companyId) || !Number.isInteger(year)) {
    removeUploadedFiles(request.files);
    response.status(400).json({ message: 'A valid company and year are required.' });
    return;
  }

  if (!request.files?.length) {
    response.status(400).json({ message: 'At least one file is required.' });
    return;
  }

  try {
    const statement = await prisma.$transaction(async (transaction) => {
      const company = await transaction.company.findUnique({ where: { id: companyId } });

      if (!company) {
        throw new Error('COMPANY_NOT_FOUND');
      }

      return transaction.financialStatement.create({
        data: {
          companyId,
          year,
          description,
          files: {
            create: request.files.map((file) => ({
              originalName: file.originalname,
              storedName: file.filename,
              filePath: file.path,
              fileType: file.mimetype,
              fileSize: BigInt(file.size)
            }))
          }
        },
        include: { company: true, files: true }
      });
    });

    response.status(201).json({ report: mapReport(statement) });
  } catch (error) {
    removeUploadedFiles(request.files);

    if (error.message === 'COMPANY_NOT_FOUND') {
      response.status(400).json({ message: 'The selected company does not exist.' });
      return;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      response.status(409).json({
        message: 'A financial statement already exists for this company and year.'
      });
      return;
    }

    console.error('Failed to upload report:', error);
    response.status(500).json({ message: 'Failed to upload report.' });
  }
});

router.delete('/:id', async (request, response) => {
  const statementId = Number(request.params.id);

  if (!Number.isInteger(statementId)) {
    response.status(400).json({ message: 'Invalid report id.' });
    return;
  }

  try {
    const statement = await prisma.financialStatement.findUnique({
      where: { id: statementId },
      include: { files: true }
    });

    if (!statement) {
      response.status(404).json({ message: 'Report not found.' });
      return;
    }

    await prisma.financialStatement.delete({ where: { id: statementId } });
    statement.files.forEach((file) => {
      if (fs.existsSync(file.filePath)) {
        fs.unlinkSync(file.filePath);
      }
    });

    response.status(204).send();
  } catch (error) {
    console.error('Failed to delete report:', error);
    response.status(500).json({ message: 'Failed to delete report.' });
  }
});

export default router;
