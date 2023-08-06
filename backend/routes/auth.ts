import express from 'express';
import User from '../model/User';
import { findToken, removeToken, validateRefreshToken } from '../service/token-service';
import { auth } from '../middleware/auth';
import { controlToken, ValidationError, ValidationErrorAry } from '../dtos/UserDto';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { permit } from '../middleware/permit';

const authRouter = express.Router();

authRouter.post('/', ValidationErrorAry, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).send(ValidationError(errors.array()));
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send(ValidationError(null, 'email', `Пользователь с такой ${email} уже существует`));
    }

    const createUser = await User.create({
      email: email,
      password: password,
    });

    const userDto = await controlToken(createUser, res);

    return res.send({ ...userDto.tokens, user: { ...userDto.userDto } });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(ValidationError(null, '', 'Что-то пошло не так', e));
    }
    return next(e);
  }
});

authRouter.post('/login', ValidationErrorAry, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(ValidationError(errors.array()));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send(ValidationError(null, 'email', `Пользователь с такой почтой ${email} не найден`));
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
      return res.status(400).send(ValidationError(null, 'password', 'Ввведен не верный пароль !'));
    }

    const userDto = await controlToken(user, res);

    return res.send({ ...userDto.tokens, user: { ...userDto.userDto } });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(ValidationError(null, '', 'Что-то пошло не так', e));
    }
    return next(e);
  }
});

authRouter.get('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).send(ValidationError(null, '', 'Токен доступа не действительный'));
    }

    const user = await validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);

    if (!user || !tokenFromDb) {
      return res.status(401).send(ValidationError(null, '', 'Пользователь не авторизован'));
    }

    const userDate = await User.findById({ _id: tokenFromDb.userId });

    if (!userDate) {
      return res.status(400).send(ValidationError(null, '', 'Пользователь не найден'));
    }

    const userDto = await controlToken(userDate, res);

    return res.send({ ...userDto.tokens, user: { ...userDto.userDto } });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(ValidationError(null, '', 'Что-то пошло не так'));
    } else {
      return next(e);
    }
  }
});

authRouter.get('/getUser', auth, permit('admin'), async (req, res, next) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (e) {
    return next(e);
  }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    const { refreshToken } = await req.cookies;

    const token = await removeToken(refreshToken);

    if (token.deletedCount === 0) {
      return res.status(400).send(ValidationError(null, '', 'Что-то пошло не так'));
    }
    res.clearCookie('refreshToken');
    return res.send(token);
  } catch (e) {
    return next(e);
  }
});

export default authRouter;
