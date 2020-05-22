import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';
import { Post } from './Post.type';
import { Link } from './Link.type';
import ListLinkController from '../controllers/listLink';

const listLinkDefs = gql`
  input ListLinkInput {
    title: String
    links: [LinkInput]
  }

  type ListLink {
    _id: ID
    title: String
    links: [Link]
  }
`;

const listLinkResolvers = {
  ListLink: {
    links: ListLinkController.links,
  },
};

export interface ListLink extends WithId {
  title: string;
  links: Link[];
  post: Post;
}

export interface ListLinkSchema extends Document, Omit<ListLink, '_id' | 'links' | 'post'>{
  links: Schema.Types.ObjectId[];
  post: Schema.Types.ObjectId;
}

export { listLinkDefs, listLinkResolvers };
