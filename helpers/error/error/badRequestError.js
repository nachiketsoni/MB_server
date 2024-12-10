import httpStatus from "http-status";
import ApiError from "./ApiError";

export class BadRequestError extends ApiError {
  constructor(message, errorFields = [],errorMessages = []) {
    super(httpStatus.BAD_REQUEST, message, false);
    this.errorFields = errorFields;
    this.errorMessages = errorMessages;
  }
}
