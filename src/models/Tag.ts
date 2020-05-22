import mongoose, { Schema } from 'mongoose';
// @ts-ignore
import slug from 'mongoose-slug-updater';

import { TagSchema } from './Tag.type';

mongoose.plugin(slug);

const tagSchema = new Schema<TagSchema>({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    slug: 'text',
    unique: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

tagSchema.post('remove', (doc: TagSchema) => {
  const Post = mongoose.model('Post');
  Post.updateMany({
    _id: {
      $in: doc.posts,
    },
  }, { $pull: { tags: doc._id } }).exec();
});

const TagModel = mongoose.model<TagSchema>('Tag', tagSchema);
export default TagModel;
