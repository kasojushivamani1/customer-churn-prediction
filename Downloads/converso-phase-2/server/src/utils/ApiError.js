/** An error that is safe to show to API clients. */
export class ApiError extends Error {
  constructor(statusCode, message, code) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}
