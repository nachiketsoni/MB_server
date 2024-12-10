import Joi from "joi";

export const getWithPagination = {
  query: {
    limit: Joi.number().integer().min(1).default(10),
    currentPage: Joi.number().integer().min(0).default(0),
    sort: Joi.object()
      .pattern(Joi.string(), Joi.number().valid(1, -1))
      .default({ _id: -1 }),
  },
  params: {},
  body: {},
  files: {},
};
export const get = {
    body : {},
    params : {id: Joi.string().alphanum().required()},
    query : {},
    files : {},
  };
  