import mongoose, { Schema } from 'mongoose';
import { TagSchema } from './Tag.type';

const tagSchema = new Schema<TagSchema>({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

const TagModel = mongoose.model<TagSchema>('Tag', tagSchema);
export default TagModel;
