import { NextFunction, Request, Response } from 'express';
import { validateAccessToken } from '../service/token-service';

export interface RequestWithUser extends Request {
  user: any;
}

export const auth = async (expressRequest: Request, res: Response, next: NextFunction) => {
  const req = expressRequest as RequestWithUser;
  const authorization = req.get('Authorization');

  try {
    if (!authorization) {
      return res.status(401).send({ error: 'Токена доступа не верный' });
    }

    const accessToken = authorization.split(' ')[0];

    if (!accessToken) {
      return res.status(401).send({ error: 'Токена доступа не верный 1' });
    }

    const tokenUser = validateAccessToken(accessToken);

    if (!tokenUser) {
      return res.status(401).send({ error: 'Пользователь не авторизован' });
    }

    req.user = tokenUser;

    return next();
  } catch (e) {
    return res.status(401).send({ error: 'Пользователь не авторизован' });
  }
};
