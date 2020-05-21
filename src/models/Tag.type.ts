import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';
import { Post } from './Post.type';

const tagDefs = gql`
  type Tag {
    _id: ID
    text: String
    slug: String
    posts: [Post]
  }
`;

export interface Tag extends WithId {
  text: string;
  link: string;
  posts: Post[];
}

export interface TagSchema extends Document, Omit<Tag, '_id' |'posts'> {
  posts: Schema.Types.ObjectId[];
}

export { tagDefs };
