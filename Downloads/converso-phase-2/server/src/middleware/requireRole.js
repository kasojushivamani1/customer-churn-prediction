import { ApiError } from '../utils/ApiError.js';

/** Route guard: the signed-in user (req.user, from loadUser) must hold `role`. */
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user?.roles?.includes(role)) {
      return next(new ApiError(403, `This action requires the "${role}" role.`, 'FORBIDDEN_ROLE'));
    }
    next();
  };
}
