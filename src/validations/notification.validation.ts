import Joi from 'joi';

export const notificationSchema = Joi.object({
  type: Joi.string().valid('obstacle', 'maintenance', 'session_complete', 'error', 'connection').required(),
  title: Joi.string().required(),
  message: Joi.string().required(),
  timestamp: Joi.number().required(),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium')
});
