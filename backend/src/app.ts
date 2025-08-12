import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authRoutes } from './routes/auth.routes';
import { contentRoutes } from './routes/content.routes';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/contents', contentRoutes);
