import { ValidationChain, body } from 'express-validator';
import { Priority } from '../enum/Priority';
import { Status } from '../enum/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory')
    .isString()
    .withMessage('The date needs to be a valid date format'),

  body('description')
    .trim()
    .isString()
    .withMessage('Description needs to be in text format'),

  body('priority')
    .trim()
    .isIn(Object.values(Priority))
    .withMessage('Priority can only be normal, high or low'),

  body('status')
    .trim()
    .isIn(Object.values(Status))
    .withMessage('Status can only be todo, in progress or completed'),
];
