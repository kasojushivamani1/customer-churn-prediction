import { Router } from 'express';
import { verifyFirebaseToken } from '../../middleware/verifyFirebaseToken.js';
import { loadUser } from '../../middleware/loadUser.js';
import { validate } from '../../middleware/validate.js';
import { addRoleSchema, updateMeSchema } from './users.schemas.js';
import { addRole, getMe, updateMe } from './users.controller.js';

const router = Router();

router.use(verifyFirebaseToken, loadUser);

router.get('/me', getMe);
router.patch('/me', validate(updateMeSchema), updateMe);

// Onboarding calls this once to become a seeker or a Practice Partner. A user can hold
// both roles over time; this only ever adds a role, never removes one.
router.post('/me/roles', validate(addRoleSchema), addRole);

export default router;
