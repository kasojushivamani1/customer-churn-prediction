import { Router } from 'express';
import { verifyFirebaseToken } from '../../middleware/verifyFirebaseToken.js';
import { syncUser } from './auth.controller.js';

const router = Router();

// Called once right after Firebase sign-in/sign-up, and safe to call again any time:
// it creates the account on first call and simply returns it on later calls.
router.post('/sync', verifyFirebaseToken, syncUser);

export default router;
