import { firebaseAuth } from '../config/firebaseAdmin.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Verifies the Firebase ID token on `Authorization: Bearer <token>` and attaches the
 * decoded token as `req.authUser` ({ uid, email, name, picture, ... }). This proves who
 * the caller is; it does not load our own User document (see loadUser for that).
 */
export async function verifyFirebaseToken(req, res, next) {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Missing or malformed Authorization header.', 'UNAUTHENTICATED'));
  }

  try {
    req.authUser = await firebaseAuth.verifyIdToken(token);
    next();
  } catch {
    next(new ApiError(401, 'Your session has expired. Please sign in again.', 'INVALID_TOKEN'));
  }
}
