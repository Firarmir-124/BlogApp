import { model, Schema } from 'mongoose';
import { UserTokenType } from '../types';

const UserTokenSchema = new Schema<UserTokenType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const UserToken = model('UserToken', UserTokenSchema);

export default UserToken;
