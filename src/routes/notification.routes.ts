import { Router } from 'express';
import {
  create,
  list,
  read,
  remove,
  removeAll
} from '../controllers/notification.controller';

import { validateBody } from '../middlewares/validate.middleware';
import { notificationSchema } from '../validations/notification.validation';

const router = Router();

router.post('/', validateBody(notificationSchema), create);
router.get('/', list);
router.patch('/:id/read', read);
router.delete('/:id', remove);
router.delete('/', removeAll);

export default router;
