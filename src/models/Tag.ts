import mongoose, { Schema } from 'mongoose';
import { TagModel } from './Tag.type';

const tagSchema = new Schema<TagModel>({
  text: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

const tag = mongoose.model<TagModel>('Tag', tagSchema);
export default tag;
