import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../controllers/user';

export interface UserModel extends Document, Omit<User, 'comments'> {
  comments: Schema.Types.ObjectId[];
}

const userSchema = new Schema<UserModel>({
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

userSchema.post('remove', (doc: UserModel) => {
  const Comment = mongoose.model('Comment');
  Comment.remove({ _id: { $in: doc.comments } }).exec();
});

const user = mongoose.model<UserModel>('User', userSchema);
export default user;
