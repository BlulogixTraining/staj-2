import { Router } from 'express';
import { createTask, getAllTasks, getTasksByUser, updateTaskStatus, deleteTask } from '../controllers/task.controller';
import { authorize } from '../middleware/authorize';

const router = Router();

// Admin can create, view, and delete tasks
router.post('/create', authorize(['admin', 'manager']), createTask);
router.get('/', authorize(['admin', 'manager', 'salesman']), getAllTasks);
router.get('/user/:user_id', authorize(['manager', 'salesman']), getTasksByUser);
router.put('/:task_id/status', authorize(['manager']), updateTaskStatus);
router.delete('/:task_id', authorize(['admin']), deleteTask);

export default router;
