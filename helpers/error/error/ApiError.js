import { slackPublishMessage } from "../../config/slack";

export default class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = "", errorFields = {}) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errorFields;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
