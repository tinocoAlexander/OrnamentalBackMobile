import Joi from 'joi';

export const positionSchema = Joi.object({
  x: Joi.number().required(),
  y: Joi.number().required(),
  timestamp: Joi.number().required(),
});

export const phaseSchema = Joi.string().valid('mapping', 'cutting').required();

export const statusSchema = Joi.string().valid(
  'mapping', 'cutting', 'completed', 'interrupted', 'mapping_completed'
).required();
