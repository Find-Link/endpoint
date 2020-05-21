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
}

export interface ListLinkModel extends Document, Omit<ListLink, '_id' | 'links'>{
  links: Schema.Types.ObjectId[];
}

export { listLinkDefs };
