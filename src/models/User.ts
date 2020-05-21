import mongoose, { Schema } from 'mongoose';
import { UserSchema } from './User.type';

const userSchema = new Schema<UserSchema>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

userSchema.post('remove', (doc: UserSchema) => {
  const Comment = mongoose.model('Comment');
  Comment.remove({ _id: { $in: doc.comments } }).exec();
});

const UserModel = mongoose.model<UserSchema>('User', userSchema);
export default UserModel;
