import { Model, model, Schema } from 'mongoose';
import { UserType } from '../types';
import config from '../config';
import bcrypt from 'bcrypt';

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
}

type UserModel = Model<UserType, object, IUserMethods>;

const UserSchema = new Schema<UserType, UserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

export default User;
