import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import backupRoutes from './routes/backupRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'SE2026' });
});

app.use('/api/backup', backupRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
});

app.listen(port, () => {
  console.log(`SE2026 server running on http://localhost:${port}`);
});
