import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';
import { ListLink } from './ListLink.type';
import LinkController from '../controllers/link';

const linkDefs = gql`
  input LinkInput {
    text: String
    link: String
  }

  type Link {
    _id: ID
    text: String
    link: String
    listLink: ListLink
  }
`;

const linkResolvers = {
  Link: {
    listLink: LinkController.listLink,
  },
};

export interface Link extends WithId {
  text: string;
  link: string;
  listLink: ListLink;
}

export interface LinkSchema extends Document, Omit<Link, '_id' | 'listLink'> {
  listLink: Schema.Types.ObjectId;
}

export { linkDefs, linkResolvers };
