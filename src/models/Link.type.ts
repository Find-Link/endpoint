import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';

const linkDefs = gql`
  type Link {
    _id: ID
    text: String
    listLink: ListLink
  }
`;

export interface LinkModel extends Document {
  text: string;
  link: string;
  listLink: Schema.Types.ObjectId;
}

export { linkDefs };
