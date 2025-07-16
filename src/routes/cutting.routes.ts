import { Router } from 'express';
import { generateCuttingPath } from '../controllers/cutting.controller';

const router = Router();

router.post('/:id/generate', generateCuttingPath);

export default router;
