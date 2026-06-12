export default class AppError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
