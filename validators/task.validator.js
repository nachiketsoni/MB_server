import Joi from "joi";


export const createTask = {
  body: {
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
      status: Joi.string().valid('pending', 'completed').optional(),
      priority: Joi.string().valid('high', 'medium', 'low').required(),
      due_date: Joi.date().required(),
  },
  params: {},
  query: {},
  files: {},
};


export const updateTask = {
  body: {
    title: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    status: Joi.string().valid('pending', 'completed').optional(),
    priority: Joi.string().valid('high', 'medium', 'low').optional(),
    due_date: Joi.date().optional(),
  },
  params: {
    id: Joi.string().hex().length(24).required().messages({
      'string.length': 'Task ID must be a valid MongoDB ObjectId'
    }),
  },
  query: {},
  files: {},
};
