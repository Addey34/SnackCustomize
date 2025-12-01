import cors from 'cors';
import dotenv from 'dotenv';
import type { Application } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import { CONFIG } from './config/constants.js';
import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import settingsRoutes from './routes/settingRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/users', userRoutes);
app.get('/ping', (req, res) => res.send('Hello World!'));

const PORT = CONFIG.PORT || 5000;

mongoose
  .connect(CONFIG.MONGO_URI || '')
  .then(() => {
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
