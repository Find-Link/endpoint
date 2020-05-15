import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';

const listLinkDefs = gql`
  type ListLink {
    _id: ID
    title: String
    links: [Link]
  }
`;

export interface ListLinkModel extends Document {
  title: string;
  links: Schema.Types.ObjectId[];
}

export { listLinkDefs };
