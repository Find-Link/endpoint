import mongoose, { Schema } from 'mongoose';
import { SourceSchema } from './Source.type';

const sourceSchema = new Schema<SourceSchema>({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

sourceSchema.post('remove', (doc: SourceSchema) => {
  const Post = mongoose.model('Post');
  Post.updateMany({
    _id: {
      $in: doc.posts,
    },
  }, { $pull: { sources: doc._id } }).exec();
});

const SourceModel = mongoose.model<SourceSchema>('Source', sourceSchema);
export default SourceModel;
