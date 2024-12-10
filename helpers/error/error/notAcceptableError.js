import httpStatus from "http-status";
import ApiError from "./ApiError";

export class NotAcceptableError extends ApiError {
  constructor(message, errorFields = [], errorMessages = {}) {
    super(httpStatus.NOT_ACCEPTABLE, message, false, "", errorMessages);
    this.errorFields = errorFields;
    this.errorMessages = errorMessages;
  }
}
