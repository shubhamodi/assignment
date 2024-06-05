import { errorResponse } from '../responses.js';
export const errorHandler = (error, req, res, next) => {
    const { statusCode, message } = error;
    return errorResponse(req, res, statusCode, message, error);
}