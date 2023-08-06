import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from './auth';
import { ValidationError } from '../dtos/UserDto';

export const permit = (...roles: string[]) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as RequestWithUser;

    if (!req.user) {
      return res.status(401).send(ValidationError(null, '', 'Пользователь не авторизован'));
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send(ValidationError(null, '', 'Запрещено'));
    }

    return next();
  };
};
