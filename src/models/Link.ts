import mongoose, { Schema } from 'mongoose';
import { LinkModel } from './Link.type';

const linkSchema = new Schema<LinkModel>({
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

linkSchema.post('save', (doc: LinkModel) => {
  const ListLink = mongoose.model('ListLink');
  ListLink.findByIdAndUpdate(doc.listLink, { $push: { links: doc._id } }).exec();
});

linkSchema.post('remove', (doc: LinkModel) => {
  const ListLink = mongoose.model('ListLink');
  ListLink.findByIdAndUpdate(doc.listLink, { $pull: { links: doc._id } }).exec();
});

const listLink = mongoose.model<LinkModel>('Link', linkSchema);
export default listLink;
