import { Schema, Document } from 'mongoose';
import { gql } from 'apollo-server';
import { sourceDefs } from './Source.type';
import { tagDefs } from './Tag.type';
import { WithId } from '../services/utils';

const postDefs = gql`
  ${tagDefs}
  ${sourceDefs}

  input AddPostInput {
    title: String
    thumbnail: Upload
    description: String
    listLinks: [ListLinkInput]
    sources: [SourceInput]
    tags: [String]
    category: String
  }

  type Post {
    _id: ID
    title: String
    thumbnail: String
    description: String
    listLinks: [ListLink]
    sources: [Source]
    tags: [Tag]
    category: String
    comments: [Comment]
  }
`;

export interface Post extends WithId {
  title: string;
  thumbnail: string;
  description: string;
  listLinks: string[];
  sources: string[];
  tags: string[];
  category: 'movie' | 'game' | 'application' |'manga';
  comments: string[];
}

export interface PostModel extends Document, Omit<Post, '_id' | 'comments'> {
  comments: Schema.Types.ObjectId[];
}

export { postDefs };
