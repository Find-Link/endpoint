import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  comments: Schema.Types.ObjectId[];
}

const userSchema = new Schema<User>({
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

userSchema.post('remove', (doc: User) => {
  const Comment = mongoose.model('Comment');
  Comment.remove({ _id: { $in: doc.comments } }).exec();
});

const user = mongoose.model<User>('User', userSchema);
export default user;
