import { Router } from 'express';
import { LabController } from '../controller/Lab.controller.js';

const router = Router();

router.post('/', LabController.createLab);
router.get('/', LabController.getAllLabs);
router.get('/:id', LabController.findById);
router.put('/:id', LabController.updateLab);
router.delete('/:id', LabController.deleteLab);
router.delete('/:id/permanent', LabController.forceDeleteLab);
router.patch('/:id/restore', LabController.restoreLab);
router.post('/:id/students', LabController.assignStudents);

export default router;
