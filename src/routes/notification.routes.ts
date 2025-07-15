import { Router } from 'express';
import {
  create,
  list,
  read,
  remove,
  removeAll
} from '../controllers/notification.controller';

const router = Router();

router.post('/', create);
router.get('/', list);
router.patch('/:id/read', read);
router.delete('/:id', remove);
router.delete('/', removeAll);

export default router;
