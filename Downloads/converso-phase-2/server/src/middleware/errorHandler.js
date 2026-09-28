import { env } from '../config/env.js';

// Express identifies error handlers by their four arguments, so `next` must stay.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode ?? 500;

  if (statusCode >= 500) console.error(err);

  const hideDetails = statusCode >= 500 && env.NODE_ENV === 'production';

  res.status(statusCode).json({
    error: {
      message: hideDetails ? 'Something went wrong on our side.' : err.message,
      code: err.code,
    },
  });
}
