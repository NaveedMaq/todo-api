import { Router } from 'express';
import { createValidator } from './task.validator';
import { taskController } from './task.controller';

export const taskRouter: Router = Router();

taskRouter.get('/tasks', taskController.getAll);

taskRouter.post('/tasks', createValidator, taskController.create);
