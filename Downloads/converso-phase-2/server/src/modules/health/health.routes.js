import { Router } from 'express';
import mongoose from 'mongoose';
import { env } from '../../config/env.js';

const router = Router();

const DB_STATES = ['disconnected', 'connected', 'connecting', 'disconnecting'];

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'converso-api',
    environment: env.NODE_ENV,
    uptimeSeconds: Math.round(process.uptime()),
    database: DB_STATES[mongoose.connection.readyState] ?? 'unknown',
  });
});

export default router;
