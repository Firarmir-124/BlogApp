import mongoose, { Types } from 'mongoose';

export interface BlogType {
  name: string;
  content: string;
  user: string;
  image: string | null;
  createAt: string | null;
}

export interface UserType {
  email: string;
  password: string;
  role: string;
}

export interface UserTypeFull {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: string;
}

export interface UserTokenType {
  userId: Types.ObjectId;
  token: string;
}

export interface UserDtoType {
  _id: mongoose.Types.ObjectId;
  email: string;
}

export interface GlobalErrorAuth {
  error: string | null;
  field: string | null;
  anotherError: any | null;
}
