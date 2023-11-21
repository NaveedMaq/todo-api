import { Request, Response } from 'express';
import { AppDataSource } from '../..';
import { Task } from './task.entity';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

class TaskController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const allTasks: Task[] = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });

      return res.json(allTasks).status(200);
    } catch (_errors) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Create a new instance of a task
    const newTask = new Task();

    // Add the required properties to the Task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    // Add the new task to the database
    try {
      const createdTask: Task =
        await AppDataSource.getRepository(Task).save(newTask);

      return res.json(createdTask).status(201);
    } catch (_errors) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });

      if (!task)
        return res
          .json({ error: 'The task with given ID does not exist' })
          .status(404);

      const updatedTask: UpdateResult = await AppDataSource.getRepository(
        Task,
      ).update(req.body.id, plainToInstance(Task, { status: req.body.status }));

      return res.json(updatedTask).status(203);
    } catch (_errors) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }
}

export const taskController = new TaskController();
