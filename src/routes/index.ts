import { Router } from 'express';
import sessionRoutes from './session.routes';
import esp32Routes from './esp32.routes';
import notificationRoutes from './notification.routes';
import sensorRoutes from './sensor.routes';

const router = Router();

router.use('/sessions', sessionRoutes);
router.use('/esp32', esp32Routes);
router.use('/notifications', notificationRoutes);
router.use('/sensors', sensorRoutes);

export default router;
