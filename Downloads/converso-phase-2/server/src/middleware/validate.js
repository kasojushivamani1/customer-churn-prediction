import { ApiError } from '../utils/ApiError.js';

/** Parses req.body against a zod schema, replacing it with the parsed (typed) value. */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Invalid request body.';
      return next(new ApiError(400, message, 'VALIDATION_ERROR'));
    }

    req.body = result.data;
    next();
  };
}
