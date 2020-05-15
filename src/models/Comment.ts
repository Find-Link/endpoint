import mongoose, { Schema, Document } from 'mongoose';

interface Comment extends Document {
  content: string;
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

commentSchema.post('save', (doc: Comment) => {
  const User = mongoose.model('User');
  User.findByIdAndUpdate(doc.user, { $push: { comment: doc._id } }).exec();
});

commentSchema.post('remove', (doc: Comment) => {
  const User = mongoose.model('User');
  User.findByIdAndUpdate(doc.user, { $pull: { comment: doc._id } }).exec();
});

const comment = mongoose.model<Comment>('Comment', commentSchema);
export default comment;
