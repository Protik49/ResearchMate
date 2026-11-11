import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import facultyRouter from './routes/faculty.js';
import savedRouter from './routes/saved.js';
import updatesRouter from './routes/updates.js';
import examsRouter from './routes/exams.js';
import contactRouter from './routes/contact.js';
import analyticsRouter from './routes/analytics.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'faculty-portal-api', timestamp: new Date() });
});

// API routes
app.use('/api/faculty', facultyRouter);
app.use('/api/saved', savedRouter);
app.use('/api/updates', updatesRouter);
app.use('/api/exams', examsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Faculty portal API running on http://localhost:${PORT}`);
});
