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

const SourceModel = mongoose.model<SourceSchema>('Source', sourceSchema);
export default SourceModel;
