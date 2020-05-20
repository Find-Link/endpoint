import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';

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

export interface LinkModel extends Document {
  text: string;
  link: string;
  listLink: Schema.Types.ObjectId;
}

export { linkDefs };
