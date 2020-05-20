import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';

const sourceDefs = gql`
  input SourceInput {
    text: String
    link: String
  }

  type Source {
    _id: ID
    text: String
    link: String
    posts: [Post]
  }
`;

export interface SourceModel extends Document {
  text: string;
  link: string;
  post: Schema.Types.ObjectId[];
}

export { sourceDefs };
