import httpStatus from "http-status";
import { errorResponse } from "../helpers";
import ApiError from "../helpers/error/ApiError";

export const errorConverter = (err, req, res, next) => {
  let error;
  error = err;
  let errorStatus = error instanceof ApiError;
  if (!errorStatus === false) {
    const { statusCode } = error;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  res.locals.errorMessage = err.message;
  return errorResponse(req, res, statusCode, message, err);
};
