import { Router } from 'express';
import {
  create,
  latest,
  all,
  clear,
  stream
} from '../controllers/sensor.controller';

import { validateBody } from '../middlewares/validate.middleware';
import { sensorDataSchema } from '../validations/sensor.validation';

const router = Router();

router.post('/', validateBody(sensorDataSchema), create);
router.get('/latest', latest);
router.get('/stream', stream);
router.get('/', all);
router.delete('/', clear);

export default router;
