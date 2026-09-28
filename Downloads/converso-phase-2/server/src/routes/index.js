import { Router } from 'express';
import healthRoutes from '../modules/health/health.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/users/users.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Later phases mount their module router here, for example:
//   router.use('/partners', partnerRoutes);  // Phase 4
//   router.use('/bookings', bookingRoutes);  // Phase 5

export default router;
