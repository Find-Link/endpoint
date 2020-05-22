import mongoose, { Schema } from 'mongoose';
// @ts-ignore
import slug from 'mongoose-slug-updater';

import { PostSchema } from './Post.type';

mongoose.plugin(slug);

const postSchema = new Schema<PostSchema>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  listLinks: [{
    type: Schema.Types.ObjectId,
    ref: 'ListLink',
  }],
  sources: [{
    type: Schema.Types.ObjectId,
    ref: 'Source',
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  category: {
    type: String,
    required: true,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

postSchema.post('remove', (doc: PostSchema) => {
  const ListLink = mongoose.model('ListLink');
  const Source = mongoose.model('Source');
  const Tag = mongoose.model('Tag');
  const Comment = mongoose.model('Comment');

  ListLink.remove({ _id: { $in: doc.listLinks } }).exec();
  Source.findByIdAndUpdate({ _id: { $in: doc.sources } }, { $pull: { posts: doc._id } }).exec();
  Tag.findByIdAndUpdate({ _id: { $in: doc.tags } }, { $pull: { posts: doc._id } }).exec();
  Comment.remove({ _id: { $in: doc.comments } }).exec();
});

const PostModel = mongoose.model<PostSchema>('Post', postSchema);
export default PostModel;
