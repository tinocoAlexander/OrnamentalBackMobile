import Joi from 'joi';

export const sensorDataSchema = Joi.object({
  temperature: Joi.number()
    .min(-50).max(100) 
    .required(),

  humidity: Joi.number()
    .min(0).max(100)
    .required(),

  timestamp: Joi.number()
    .required()
});
