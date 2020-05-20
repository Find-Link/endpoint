import { Schema, Document } from 'mongoose';
import { gql } from 'apollo-server';
import { sourceDefs } from './Source.type';

const tagDefs = gql`
  type Tag {
    tag: String
    slug: String
  }
`;

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
    category: String;
  }

  type Post {
    _id: ID
    title: String
    thumbnail: String
    description: String
    listLinks: [ListLink]
    sources: [Source]
    tags: [Tag]
    category: String;
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
  category: string;
  comments: string[];
}

export interface PostModel extends Document, Omit<Post, 'comments'> {
  comments: Schema.Types.ObjectId[];
}

export { postDefs };
