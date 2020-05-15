import { Schema, Document } from 'mongoose';
import { gql } from 'apollo-server';

const postDefs = gql`
  type Post {
    _id: ID
    thumbnail: String
    title: String
    description: String
    listLinks: [ListLink]
    sources: [String]
    tags: [String]
    comments: [Comment]
  }
`;

export interface Post {
  thumbnail: string;
  title: string;
  description: string;
  listLinks: string[];
  sources: string[];
  tags: string[];
  comments: string[];
}

export interface PostModel extends Document, Omit<Post, 'comments'> {
  comments: Schema.Types.ObjectId[];
}

export { postDefs };
