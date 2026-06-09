import cors from 'cors';
import express from 'express';
import complianceSectionsRouter from './routes/complianceSections.js';
import documentsRouter from './routes/documents.js';
import jobsRouter from './routes/jobs.js';
import reportsRouter from './routes/reports.js';
import servicesRouter from './routes/services.js';
import userManagementRouter from './routes/userManagement.js';

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: clientOrigin,
    credentials: true
  })
);
app.use(express.json());

app.use('/api/jobs', jobsRouter);
app.use('/api/compliance-sections', complianceSectionsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/services', servicesRouter);
app.use('/api', userManagementRouter);

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'bms-backend'
  });
});

export default app;
