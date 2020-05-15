import mongoose, { Schema, Document } from 'mongoose';
import { Post } from '../controllers/post';

export interface PostModel extends Document, Omit<Post, 'comments'> {
  comments: Schema.Types.ObjectId[];
}

const postSchema = new Schema<PostModel>({
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

postSchema.post('remove', (doc: PostModel) => {
  const Comment = mongoose.model('Comment');
  Comment.remove({ _id: { $in: doc.comments } }).exec();
});

const post = mongoose.model<PostModel>('Post', postSchema);
export default post;
