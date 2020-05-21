import mongoose, { Schema } from 'mongoose';
import { CommentSchema } from './Comment.type';

const commentSchema = new Schema<CommentSchema>({
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

commentSchema.post('save', (doc: CommentSchema) => {
  const User = mongoose.model('User');
  User.findByIdAndUpdate(doc.user, { $push: { comment: doc._id } }).exec();
});

commentSchema.post('remove', (doc: CommentSchema) => {
  const User = mongoose.model('User');
  User.findByIdAndUpdate(doc.user, { $pull: { comment: doc._id } }).exec();
});

const CommentModel = mongoose.model<CommentSchema>('Comment', commentSchema);
export default CommentModel;
