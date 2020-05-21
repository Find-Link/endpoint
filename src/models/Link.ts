import mongoose, { Schema } from 'mongoose';
import { LinkSchema } from './Link.type';

const linkSchema = new Schema<LinkSchema>({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  listLink: {
    type: Schema.Types.ObjectId,
    ref: 'ListLink',
  },
});

linkSchema.post('save', (doc: LinkSchema) => {
  const ListLink = mongoose.model('ListLink');
  ListLink.findByIdAndUpdate(doc.listLink, { $push: { links: doc._id } }).exec();
});

linkSchema.post('remove', (doc: LinkSchema) => {
  const ListLink = mongoose.model('ListLink');
  ListLink.findByIdAndUpdate(doc.listLink, { $pull: { links: doc._id } }).exec();
});

const LinkModel = mongoose.model<LinkSchema>('Link', linkSchema);
export default LinkModel;
