import mongoose, { Schema, Document } from 'mongoose';
import { Comment } from '../controllers/comment';

export interface CommentModel extends Document, Omit<Comment, 'user' | 'post'> {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

const commentSchema = new Schema<Comment>({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

commentSchema.post('save', (doc: CommentModel) => {
  const User = mongoose.model('User');
  User.findByIdAndUpdate(doc.user, { $push: { comment: doc._id } }).exec();
});

commentSchema.post('remove', (doc: CommentModel) => {
  const User = mongoose.model('User');
  User.findByIdAndUpdate(doc.user, { $pull: { comment: doc._id } }).exec();
});

const comment = mongoose.model<CommentModel>('Comment', commentSchema);
export default comment;
