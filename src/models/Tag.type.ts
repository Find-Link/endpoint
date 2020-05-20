import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';

const tagDefs = gql`
  type Tag {
    _id: ID
    text: String
    slug: String
    posts: [Post]
  }
`;

export interface TagModel extends Document {
  text: string;
  link: string;
  posts: Schema.Types.ObjectId[];
}

export { tagDefs };
