import { Router } from 'express';
import { StudentController } from '../controller/Student.controller.js';

const router = Router();

router.post('/', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.findById);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);
router.delete('/:id/permanent', StudentController.forceDeleteStudent);
router.patch('/:id/restore', StudentController.restoreStudent);

export default router