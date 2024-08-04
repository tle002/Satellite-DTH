import { NextFunction, Request, Response } from "express";

import Joi from "joi";

export const validateRegistration = (req:Request, res:Response, next:NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{5,30}$/)
      .required(),
    mobile_number: Joi.string().pattern(/^\d{10}$/),
    cPassword: Joi.string()
      .pattern(/^[a-zA-Z0-9]{5,30}$/)
      .required(),
    role: Joi.string(),
    active: Joi.boolean(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    console.error(error);
     res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  return next();
};

export const validateLogin = (req:Request, res:Response, next:NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{5,30}$/)
      .required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
     res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  return next();
};






