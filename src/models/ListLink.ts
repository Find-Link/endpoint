import mongoose, { Schema } from 'mongoose';
import { ListLinkModel } from './ListLink.type';

const listLinkSchema = new Schema<ListLinkModel>({
  title: {
    type: String,
    required: true,
  },
  links: [{
    type: Schema.Types.ObjectId,
    ref: 'Link',
  }],
});

listLinkSchema.post('remove', (doc: ListLinkModel) => {
  const Link = mongoose.model('Link');
  Link.remove({ _id: { $in: doc.links } }).exec();
});

const listLink = mongoose.model<ListLinkModel>('ListLink', listLinkSchema);
export default listLink;
