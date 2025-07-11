import { Router } from 'express';
import { getEsp32Data } from '../controllers/esp32.controller';

const router = Router();

router.get('/data', getEsp32Data);

export default router;
