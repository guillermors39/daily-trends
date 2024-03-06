import Joi from 'joi';

export const body = () =>
  Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    date: Joi.date().required(),
    authors: Joi.array().items(Joi.string()).required().min(1),
    location: Joi.string().required(),
  });

export const params = () =>
  Joi.object({
    uuid: Joi.string().uuid().required(),
  });
