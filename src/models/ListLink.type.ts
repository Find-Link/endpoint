import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';

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

export interface ListLink extends WithId {
  title: string;
  links: string[];
  post: string;
}

export interface ListLinkModel extends Document, Omit<ListLink, '_id' | 'links' | 'post'>{
  links: Schema.Types.ObjectId[];
  post: Schema.Types.ObjectId;
}

export { listLinkDefs };
