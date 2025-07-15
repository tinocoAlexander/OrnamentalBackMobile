import { Router } from 'express';
import {
  startSession,
  getSessions,
  updateSessionPath,
  updateSessionStatus,
  getSessionById,
  deleteSession
} from '../controllers/session.controller';

import { validateBody } from '../middlewares/validate.middleware';
import Joi from 'joi';
import { positionSchema, phaseSchema, statusSchema } from '../validations/session.validation';

const router = Router();

router.post('/start', startSession);
router.get('/', getSessions);

router.patch(
  '/:id/path',
  validateBody(
    Joi.object({
      position: positionSchema.required(),
      phase: phaseSchema.required()
    })
  ),
  updateSessionPath
);

router.patch(
  '/:id/status',
  validateBody(
    Joi.object({
      status: statusSchema.required()
    })
  ),
  updateSessionStatus
);

router.get('/:id', getSessionById);
router.delete('/:id', deleteSession);

export default router;
