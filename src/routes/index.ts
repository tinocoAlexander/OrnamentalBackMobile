import { Router } from 'express';
import sessionRoutes from './session.routes';
import notificationRoutes from './notification.routes';
import sensorRoutes from './sensor.routes';
import cuttingRoutes from './cutting.routes';

const router = Router();

router.use('/sessions', sessionRoutes);
router.use('/notifications', notificationRoutes);
router.use('/sensors', sensorRoutes);
router.use('/cutting', cuttingRoutes);

export default router;
