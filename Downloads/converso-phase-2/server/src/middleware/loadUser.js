import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Loads the User document matching req.authUser.uid and attaches it as req.user.
 * Must run after verifyFirebaseToken. Routes under /users rely on the account already
 * existing (created by POST /auth/sync right after first sign-in).
 */
export async function loadUser(req, res, next) {
  const user = await User.findOne({ firebaseUid: req.authUser.uid });

  if (!user) {
    return next(
      new ApiError(404, 'Account not found. Call /auth/sync first.', 'USER_NOT_SYNCED'),
    );
  }

  req.user = user;
  next();
}
