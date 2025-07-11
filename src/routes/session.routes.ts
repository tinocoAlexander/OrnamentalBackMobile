import { Router } from 'express';
import {
  startSession,
  getSessions,
  updateSessionPath,
  updateSessionStatus,
  getSessionById,
  deleteSession
} from '../controllers/session.controller';

const router = Router();

router.post('/start', startSession);
router.get('/', getSessions);
router.patch('/:id/path', updateSessionPath);
router.patch('/:id/status', updateSessionStatus);
router.get('/:id', getSessionById);
router.delete('/:id', deleteSession);

export default router;
