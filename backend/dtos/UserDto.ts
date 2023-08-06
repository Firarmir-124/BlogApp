import { GlobalErrorAuth, UserTypeFull } from '../types';
import { body } from 'express-validator';
import { generateToken, saveToken } from '../service/token-service';
import { Response } from 'express';

interface TypeError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const UserDto = (obj: UserTypeFull) => {
  return {
    _id: obj._id,
    email: obj.email,
    role: obj.role,
  };
};

export const ValidationErrorAry = [
  body('email')
    .isEmail()
    .withMessage('Введена не верная почта')
    .isLength({ min: 1 })
    .withMessage('Почта не должна быть меньше одного символа')
    .notEmpty()
    .withMessage('Поле email не должно быть пустым'),
  body('password')
    .isLength({ min: 3, max: 30 })
    .withMessage('Пароль должен быть не меньше 3 символов и не больше 30')
    .notEmpty()
    .withMessage('Пароль не может быть пустым'),
];

export const ValidationError = (errors?: any, fil?: string, err?: string, anotErr?: any) => {
  const validationErrors: GlobalErrorAuth[] = [];

  if (Array.isArray(errors) && errors !== undefined) {
    validationErrors.push(
      ...errors.map((item: TypeError) => {
        return { error: item.msg, field: item.path, anotherError: undefined };
      }),
    );
  } else {
    const obj = {
      field: fil || null,
      error: err || null,
      anotherError: anotErr || null,
    };

    validationErrors.push(obj);
  }
  return validationErrors;
};

export const controlToken = async (obj: any, res: Response) => {
  const userDto = UserDto(obj);
  const tokens = generateToken({ ...userDto });
  await res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  await saveToken(tokens.refreshToken, userDto._id);

  return {
    userDto,
    tokens,
  };
};
