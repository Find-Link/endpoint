import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';

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

export interface Link extends WithId {
  text: string;
  link: string;
  listLink: string;
}

export interface LinkModel extends Document, Omit<Link, '_id' | 'listLink'> {
  listLink: Schema.Types.ObjectId;
}

export { linkDefs };
