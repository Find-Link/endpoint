import mongoose, { Schema } from 'mongoose';
import { ListLinkSchema } from './ListLink.type';

const listLinkSchema = new Schema<ListLinkSchema>({
  title: {
    type: String,
    required: true,
  },
  links: [{
    type: Schema.Types.ObjectId,
    ref: 'Link',
  }],
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
});

listLinkSchema.post('save', (doc: ListLinkSchema) => {
  const Post = mongoose.model('Post');
  Post.findByIdAndUpdate(doc.post, { $push: { listLinks: doc._id } }).exec();
});

listLinkSchema.post('remove', (doc: ListLinkSchema) => {
  const Link = mongoose.model('Link');
  Link.remove({ _id: { $in: doc.links } }).exec();
});

const ListLinkModel = mongoose.model<ListLinkSchema>('ListLink', listLinkSchema);
export default ListLinkModel;
