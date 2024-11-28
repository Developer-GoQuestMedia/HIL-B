// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
const router = express.Router();
router.use('/auth', routes.auth);
router.use('/admin', routes.admin);
router.use('/series', routes.series);
router.use('/episodes', routes.episodes);
router.use('/dialogues', routes.dialogues);
router.use('/artist', routes.artist);
router.use('/director', routes.director);

app.use('/api/v1', router);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI);

export default app;