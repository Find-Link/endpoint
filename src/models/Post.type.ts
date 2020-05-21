import { Schema, Document } from 'mongoose';
import { gql } from 'apollo-server';
import { sourceDefs, Source } from './Source.type';
import { tagDefs, Tag } from './Tag.type';
import { WithId } from '../services/utils';
import { ListLink } from './ListLink.type';

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
  listLinks: ListLink[];
  sources: Source[];
  tags: Tag[];
  category: 'movie' | 'game' | 'application' |'manga';
  comments: Comment[];
}

export interface PostSchema extends Document, Omit<Post, '_id' | 'listLinks' | 'sources' | 'tags' | 'comments'> {
  listLinks: Schema.Types.ObjectId[];
  sources: Schema.Types.ObjectId[];
  tags: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
}

export { postDefs };
