import mongoose, { Schema } from 'mongoose';
import { SourceModel } from './Source.type';

const sourceSchema = new Schema<SourceModel>({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

const source = mongoose.model<SourceModel>('Source', sourceSchema);
export default source;
