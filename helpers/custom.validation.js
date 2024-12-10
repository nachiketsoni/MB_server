import Joi from "joi";
import _ from "lodash";
import mongoose from "mongoose";
import httpStatus from "http-status";
import { BadRequestError } from "./error/badRequestError";
import { errorResponse } from ".";

export const mongodbIdValidator = (value, helpers) => {
  if (value != ',' && !value.includes('{') && !mongoose.isValidObjectId(value)) {
    return helpers.message(`please use valid id`);
  }
  return value;
};

export const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["params", "query", "body", "files"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false, dateFormat: "utc" })
    .validate(object);

  if (error) {
    let error_messages = {}, errorMessage = '';
    error.details.map(item => {
      let message = item.message.replace(/"/g, '');
      error_messages[item.context.key] = message;
      errorMessage = `${errorMessage != '' ? `${errorMessage}, ` : errorMessage}${message}`;
    })
    return errorResponse(req, res, httpStatus.NOT_ACCEPTABLE, errorMessage.toString(), {}, error_messages);
  }
  Object.assign(req, value);
  return next();
};