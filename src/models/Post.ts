import mongoose, { Schema, Document } from 'mongoose';
import Comment from './Comment';

interface Post extends Document {
  title: string;
  description: string;
  sources: string[];
  tags: string[];
  comments: Schema.Types.ObjectId[];
}

const postSchema = new Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sources: [{
    type: String,
    required: true,
  }],
  tags: [{
    type: String,
    required: true,
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

postSchema.post('remove', (doc: Post) => {
  Comment.remove({ _id: { $in: doc.comments } }).exec();
});

const post = mongoose.model<Post>('Post', postSchema);
export default post;
