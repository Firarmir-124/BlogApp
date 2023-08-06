import UserToken from '../model/UserToken';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserDtoType } from '../types';

export const generateToken = (payload: UserDtoType) => {
  const accessToken = jwt.sign(payload, config.token.accessKey, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, config.token.refreshKey, { expiresIn: '30d' });

  return {
    refreshToken,
    accessToken,
  };
};

export const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, config.token.accessKey);
  } catch (e) {
    return null;
  }
};

export const validateRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, config.token.refreshKey);
  } catch (e) {
    return null;
  }
};

export const saveToken = async (refreshToken: string, idUser: any) => {
  const tokenUser = await UserToken.findOne({ userId: idUser });

  if (tokenUser) {
    tokenUser.token = refreshToken;
    return tokenUser.save();
  }

  return await UserToken.create({
    userId: idUser,
    token: refreshToken,
  });
};

export const removeToken = async (refreshToken: string) => {
  return UserToken.deleteOne({ token: refreshToken });
};

export const findToken = async (refreshToken: string) => {
  return UserToken.findOne({ token: refreshToken });
};
