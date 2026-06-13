import path from 'node:path';
import fs from 'node:fs';
import { Router } from 'express';
import multer from 'multer';
import prisma from '../lib/prisma.js';

const router = Router();
const storageRoot = path.resolve('..', 'uploads', 'jobs');

fs.mkdirSync(storageRoot, { recursive: true });

const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (_request, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new Error('Unsupported file type'));
      return;
    }

    callback(null, true);
  }
});

const uploadFields = upload.fields([
  { name: 'proposalDocument', maxCount: 1 },
  { name: 'idDocument', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 10 }
]);

function removeUploadedFiles(files = {}) {
  Object.values(files)
    .flat()
    .forEach((file) => {
      if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
}

function mapDocument(document) {
  return {
    id: document.id,
    originalName: document.originalName,
    filename: document.fileName,
    mimetype: document.fileType,
    size: document.fileSize,
    path: document.filePath
  };
}

function mapJob(job) {
  const documents = job.documents || [];
  const proposalDocument = documents.find((document) => document.category === 'proposalDocument');
  const idDocument = documents.find((document) => document.category === 'idDocument');

  return {
    id: job.id,
    jobNumber: job.jobNumber,
    serviceType: job.serviceType,
    assignedPerson: job.assignedPerson,
    jobDetails: job.jobDetails,
    specialDescription: job.specialDescription || '',
    clientName: job.clientName,
    email: job.email,
    startingPoint: job.startingPoint,
    ckNumber: job.ckNumber || '',
    contactNumber: job.contactNumber || '',
    address: job.address || '',
    status: job.status,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
    documents: {
      proposalDocument: proposalDocument ? mapDocument(proposalDocument) : null,
      idDocument: idDocument ? mapDocument(idDocument) : null,
      otherDocuments: documents
        .filter((document) => document.category === 'otherDocuments')
        .map(mapDocument)
    }
  };
}

function documentCreate(file, category) {
  if (!file) {
    return null;
  }

  return {
    fileName: file.filename,
    originalName: file.originalname,
    fileType: file.mimetype,
    fileSize: file.size,
    filePath: file.path,
    uploadedBy: 'IT Team',
    category
  };
}

router.get('/', async (_request, response) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { documents: true },
      orderBy: { createdAt: 'desc' }
    });

    response.status(200).json({ jobs: jobs.map(mapJob) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to load jobs.' });
  }
});

router.post('/', uploadFields, async (request, response) => {
  const {
    jobNumber,
    serviceType,
    assignedPerson,
    jobDetails,
    specialDescription,
    clientName,
    email,
    startingPoint,
    ckNumber,
    contactNumber,
    address
  } = request.body;

  if (!jobNumber || !serviceType || !assignedPerson || !jobDetails || !clientName || !email || !startingPoint) {
    removeUploadedFiles(request.files);
    response.status(400).json({ message: 'Missing required job fields.' });
    return;
  }

  try {
    const files = request.files || {};
    const service = await prisma.service.findFirst({ where: { title: serviceType } });
    const assignedUser = await prisma.user.findFirst({ where: { fullName: assignedPerson } });
    const documentInputs = [
      documentCreate(files.proposalDocument?.[0], 'proposalDocument'),
      documentCreate(files.idDocument?.[0], 'idDocument'),
      ...(files.otherDocuments || []).map((file) => documentCreate(file, 'otherDocuments'))
    ].filter(Boolean);

    const job = await prisma.job.create({
      data: {
        jobNumber: jobNumber.trim(),
        serviceType: serviceType.trim(),
        assignedPerson: assignedPerson.trim(),
        jobDetails: jobDetails.trim(),
        specialDescription: specialDescription?.trim() || '',
        clientName: clientName.trim(),
        email: email.trim(),
        startingPoint: startingPoint.trim(),
        ckNumber: ckNumber?.trim() || '',
        contactNumber: contactNumber?.trim() || '',
        address: address?.trim() || '',
        serviceId: service?.id,
        assignedUserId: assignedUser?.id,
        documents: {
          create: documentInputs
        }
      },
      include: { documents: true }
    });

    response.status(201).json({ job: mapJob(job) });
  } catch (error) {
    removeUploadedFiles(request.files);

    if (error.code === 'P2002') {
      response.status(409).json({ message: 'Job number already exists.' });
      return;
    }

    console.error('Failed to create job:', error);
    response.status(500).json({ message: 'Failed to create job.' });
  }
});

router.put('/:id', uploadFields, async (request, response) => {
  const {
    jobNumber,
    serviceType,
    assignedPerson,
    jobDetails,
    specialDescription,
    clientName,
    email,
    startingPoint,
    ckNumber,
    contactNumber,
    address
  } = request.body;

  if (!jobNumber || !serviceType || !jobDetails || !clientName || !email || !startingPoint) {
    removeUploadedFiles(request.files);
    response.status(400).json({ message: 'Missing required job fields.' });
    return;
  }

  try {
    const files = request.files || {};
    const service = await prisma.service.findFirst({
      where: { title: serviceType.trim() }
    });
    const primaryAssignedPerson = assignedPerson?.split(',')[0].trim();
    const assignedUser = primaryAssignedPerson
      ? await prisma.user.findFirst({
          where: { fullName: primaryAssignedPerson }
        })
      : null;
    const replacementCategories = [
      files.proposalDocument?.length ? 'proposalDocument' : null,
      files.idDocument?.length ? 'idDocument' : null
    ].filter(Boolean);
    const documentInputs = [
      documentCreate(files.proposalDocument?.[0], 'proposalDocument'),
      documentCreate(files.idDocument?.[0], 'idDocument'),
      ...(files.otherDocuments || []).map((file) =>
        documentCreate(file, 'otherDocuments')
      )
    ].filter(Boolean);

    const job = await prisma.$transaction(async (transaction) => {
      if (replacementCategories.length > 0) {
        const replacedDocuments = await transaction.document.findMany({
          where: {
            jobId: request.params.id,
            category: { in: replacementCategories }
          }
        });

        await transaction.document.deleteMany({
          where: {
            jobId: request.params.id,
            category: { in: replacementCategories }
          }
        });

        replacedDocuments.forEach((document) => {
          if (fs.existsSync(document.filePath)) {
            fs.unlinkSync(document.filePath);
          }
        });
      }

      return transaction.job.update({
        where: { id: request.params.id },
        data: {
          jobNumber: jobNumber.trim(),
          serviceType: serviceType.trim(),
          assignedPerson: assignedPerson?.trim() || null,
          jobDetails: jobDetails.trim(),
          specialDescription: specialDescription?.trim() || '',
          clientName: clientName.trim(),
          email: email.trim(),
          startingPoint: startingPoint.trim(),
          ckNumber: ckNumber?.trim() || '',
          contactNumber: contactNumber?.trim() || '',
          address: address?.trim() || '',
          serviceId: service?.id || null,
          assignedUserId: assignedUser?.id || null,
          documents: { create: documentInputs }
        },
        include: { documents: true }
      });
    });

    response.status(200).json({ job: mapJob(job) });
  } catch (error) {
    removeUploadedFiles(request.files);

    if (error.code === 'P2002') {
      response.status(409).json({ message: 'Job number already exists.' });
      return;
    }

    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Job not found.' });
      return;
    }

    console.error('Failed to update job:', error);
    response.status(500).json({ message: 'Failed to update job.' });
  }
});

router.patch('/:id/status', async (request, response) => {
  const allowedStatuses = new Set(['Created', 'In Progress', 'Approved', 'Cancelled']);

  if (!allowedStatuses.has(request.body.status)) {
    response.status(400).json({ message: 'Invalid job status.' });
    return;
  }

  try {
    const job = await prisma.job.update({
      where: { id: request.params.id },
      data: { status: request.body.status },
      include: { documents: true }
    });

    response.status(200).json({ job: mapJob(job) });
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Job not found.' });
      return;
    }

    console.error('Failed to update job status:', error);
    response.status(500).json({ message: 'Failed to update job status.' });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    await prisma.job.delete({ where: { id: request.params.id } });
    response.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Job not found.' });
      return;
    }

    response.status(500).json({ message: 'Failed to delete job.' });
  }
});

export default router;
