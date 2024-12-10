import Joi from "joi";

export const loginUser  = {
  body: {
    email: Joi.string().trim(true).allow('').optional(),
    password: Joi.string().trim(true).allow('').optional(),
  },
  params : {},
  query : {},
  files : {},
};
export const createUser = {
  body: {
    name: Joi.string().trim(true).allow('').optional(),
    email: Joi.string().trim(true).allow('').optional(),
    password: Joi.string().trim(true).allow('').optional(),
  },
  params : {},
  query : {},
  files : {},
};
export const updateUser = {
  body: {
    name: Joi.string().trim(true).allow('').optional(),
    email: Joi.string().trim(true).allow('').optional(),
    password: Joi.string().trim(true).allow('').optional(),
  },
  params : {id: Joi.string().alphanum().required()},
  query : {},
  files : {},
};
