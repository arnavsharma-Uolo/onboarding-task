import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import build_response from './response/MessageResponse';
import { CustomError } from './error/custom.error';
import mongoose from 'mongoose';

interface UserRequest extends Request {
  user?: any;
}
// eslint-disable-next-line no-unused-vars
type ControllerFunction = (req: UserRequest, res: Response, next: NextFunction) => Promise<void>;

export const controllerWrapper = (fn: ControllerFunction): ControllerFunction => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: Error | any) {
      if (error instanceof CustomError) {
        res.status(error.status).json(build_response(false, error.message, error.err_message, null));
      } else if (error instanceof ZodError) {
        let errorMessages = error.message;
        errorMessages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
        res.status(400).json(build_response(false, 'Invalid Payload', errorMessages, null, null));
      } else if (error instanceof mongoose.Error.CastError) {
        res.status(400).json(build_response(false, 'Bad Request', 'Invalid ID format.', null));
      } else {
        next(error);
      }
    }
  };
};
