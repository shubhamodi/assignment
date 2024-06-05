import httpStatus from 'http-status';

export class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = "", additionalData = null) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.additionalData = additionalData;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }