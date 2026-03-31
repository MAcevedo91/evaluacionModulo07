import { Router } from 'express';
import studentRoutes from './student.routes.js';
import labRoutes from './lab.routes.js';

const router = Router();

router.use('/students', studentRoutes);
router.use('/labs', labRoutes);

export default router;
