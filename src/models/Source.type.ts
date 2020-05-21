import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';
import { Post } from './Post.type';

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

export interface Source extends WithId {
  text: string;
  link: string;
  posts: Post[];
}

export interface SourceSchema extends Document, Omit<Source, '_id' | 'posts'> {
  posts: Schema.Types.ObjectId[];
}

export { sourceDefs };
